import { useMemo, useRef, useState } from 'react';
import { useGameCtx } from '../game/useGame';
import { Modal, Btn, Icon, Bar, fmtTime } from './common';
import { CatFigure } from '../art/CostumeArt';
import { RESIDENTS } from '../game/areas';
import { finishCare, careReadyIn } from '../game/engine';
import { useNow } from './TopBar';
import { sfx, vibrate } from '../game/audio';

const PET_GOAL = 1800; // px of rubbing to fill the purr meter

// Mud spots placed over the cat's body (percent of stage)
function makeSpots(cat) {
  const seeds = { zorro: [[52, 58], [64, 70], [40, 74], [72, 48], [30, 66], [58, 82]], loki: [[44, 44], [56, 60], [40, 72], [60, 80], [50, 30], [34, 56]], thor: [[44, 46], [58, 58], [38, 70], [56, 80], [48, 30], [64, 40]] };
  return (seeds[cat] || seeds.loki).map(([x, y], i) => ({ id: i, x, y, hp: 100 }));
}

function CareStage({ cat, mode, outfit, onDone }) {
  const stage = useRef(null);
  const last = useRef(null);
  const [rub, setRub] = useState(0);
  const [spots, setSpots] = useState(() => makeSpots(cat));
  const [fx, setFx] = useState([]);
  const [done, setDone] = useState(false);
  const fxId = useRef(0);
  const purrTick = useRef(0);

  const addFx = (x, y, kind) => {
    const id = fxId.current++;
    setFx((f) => [...f.slice(-14), { id, x, y, kind }]);
    setTimeout(() => setFx((f) => f.filter((p) => p.id !== id)), 900);
  };

  const move = (e) => {
    if (done || !last.current) return;
    const r = stage.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const d = Math.hypot(x - last.current.x, y - last.current.y);
    last.current = { x, y };
    if (d < 1) return;
    if (mode === 'pet') {
      setRub((v) => {
        const nv = Math.min(PET_GOAL, v + d);
        if (Math.floor(nv / 260) > Math.floor(v / 260)) {
          addFx(x, y, 'heart');
          sfx('meow');
        }
        if (nv >= PET_GOAL && !done) {
          setDone(true);
          setTimeout(onDone, 500);
        }
        return nv;
      });
      purrTick.current += d;
      if (purrTick.current > 120) {
        purrTick.current = 0;
        vibrate(true, 6);
      }
    } else {
      const px = (x / r.width) * 100;
      const py = (y / r.height) * 100;
      setSpots((sp) => {
        let changed = false;
        const next = sp.map((s) => {
          if (s.hp <= 0) return s;
          if (Math.hypot(px - s.x, py - s.y) < 11) {
            changed = true;
            const hp = s.hp - d * 0.9;
            if (hp <= 0) {
              sfx('pop');
              addFx(x, y, 'spark');
            }
            return { ...s, hp };
          }
          return s;
        });
        if (changed && Math.random() < 0.35) addFx(x, y, 'bubble');
        if (changed && next.every((s) => s.hp <= 0) && !done) {
          setDone(true);
          setTimeout(onDone, 600);
        }
        return changed ? next : sp;
      });
    }
  };

  const left = spots.filter((s) => s.hp > 0).length;

  return (
    <>
      <div
        ref={stage}
        className={`care-stage ${mode} ${done ? 'done' : ''}`}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture?.(e.pointerId);
          const r = stage.current.getBoundingClientRect();
          last.current = { x: e.clientX - r.left, y: e.clientY - r.top };
        }}
        onPointerMove={move}
        onPointerUp={() => (last.current = null)}
        onPointerCancel={() => (last.current = null)}
      >
        <CatFigure cat={cat} outfit={outfit} className={`care-cat ${mode === 'pet' && rub > 0 && !done ? 'purring' : ''}`} />
        {mode === 'groom' &&
          spots.map((s) =>
            s.hp > 0 ? <span key={s.id} className="mud" style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: 0.25 + (s.hp / 100) * 0.75, transform: `translate(-50%,-50%) scale(${0.6 + (s.hp / 100) * 0.4})` }} /> : null,
          )}
        {fx.map((f) => (
          <span key={f.id} className={`care-fx ${f.kind}`} style={{ left: f.x, top: f.y }}>
            {f.kind === 'heart' ? '♥' : f.kind === 'spark' ? '✦' : ''}
          </span>
        ))}
        {done && <div className="care-done">{mode === 'pet' ? 'Purrrr… ♥' : 'Bersih dan wangi! ✨'}</div>}
      </div>
      {mode === 'pet' ? (
        <div className="care-meter">
          <Icon name="heart" size={22} />
          <Bar value={rub} max={PET_GOAL} className="bar-pink" />
        </div>
      ) : (
        <p className="center muted">{left > 0 ? `Gosok ${left} noda lumpur sampai hilang!` : 'Semua bersih!'}</p>
      )}
    </>
  );
}

export function CareModal({ onClose, initialCat }) {
  const { state, act } = useGameCtx();
  const now = useNow();
  const cats = state.residents.filter((c) => RESIDENTS[c]);
  const [cat, setCat] = useState(initialCat && cats.includes(initialCat) ? initialCat : cats[0]);
  const [mode, setMode] = useState(null);
  const [round, setRound] = useState(0);
  const outfit = state.wardrobe?.outfit?.[cat];
  const waitPet = careReadyIn(state, cat, 'pet', now);
  const waitGroom = careReadyIn(state, cat, 'groom', now);

  const finish = () => {
    act(finishCare, cat, mode);
    sfx('task');
    setTimeout(() => setMode(null), 1400);
  };

  return (
    <Modal title="Rawat Kucing" onClose={onClose} className="care">
      <div className="tabs">
        {cats.map((c) => (
          <button type="button" key={c} className={`tab ${c === cat ? 'on' : ''}`} disabled={!!mode} onClick={() => (sfx('meow'), setCat(c))}>
            {RESIDENTS[c].name}
            {careReadyIn(state, c, 'pet', now) === 0 || careReadyIn(state, c, 'groom', now) === 0 ? <i className="badge dot">!</i> : null}
          </button>
        ))}
      </div>
      {mode ? (
        <CareStage key={cat + mode + round} cat={cat} mode={mode} outfit={outfit} onDone={finish} />
      ) : (
        <>
          <div className="care-stage idle">
            <CatFigure cat={cat} outfit={outfit} className="care-cat" />
          </div>
          <div className="care-actions">
            <div className="care-card">
              <b>Elus & Manja</b>
              <small>Usap kucing sampai mendengkur. +energi, +kasih sayang</small>
              <Btn small color={waitPet ? 'grey' : 'pink'} disabled={waitPet > 0} onClick={() => (setMode('pet'), setRound((r) => r + 1))}>
                {waitPet ? fmtTime(waitPet) : 'Elus'}
              </Btn>
            </div>
            <div className="care-card">
              <b>Salon Spa</b>
              <small>Gosok noda lumpur sampai bersih. +koin, +kasih sayang</small>
              <Btn small color={waitGroom ? 'grey' : 'blue'} disabled={waitGroom > 0} onClick={() => (setMode('groom'), setRound((r) => r + 1))}>
                {waitGroom ? fmtTime(waitGroom) : 'Mandikan'}
              </Btn>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
}

export function careReady(state) {
  return state.residents.some((c) => RESIDENTS[c] && (careReadyIn(state, c, 'pet') === 0 || careReadyIn(state, c, 'groom') === 0));
}
