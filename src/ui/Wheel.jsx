import { useEffect, useRef, useState } from 'react';
import { useGameCtx } from '../game/useGame';
import { Modal, Btn, Icon, RewardChips } from './common';
import { ItemArt } from '../art/ItemArt';
import { WHEEL, WHEEL_EXTRA_COST, WHEEL_EXTRA_MAX } from '../game/meta';
import { spinWheel, claimWheel, wheelState } from '../game/engine';
import { sfx, vibrate } from '../game/audio';

const N = WHEEL.length;
const SLICE = 360 / N;

function sliceIcon(r) {
  if (r.item) return { item: r.item };
  if (r.coins) return { icon: 'coin', n: r.coins };
  if (r.gems) return { icon: 'gem', n: r.gems };
  return { icon: 'energy', n: r.energy };
}

function WheelFace() {
  const R = 100;
  const pt = (deg, r) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [R + r * Math.cos(a), R + r * Math.sin(a)];
  };
  return (
    <svg viewBox="0 0 200 200" className="wheel-face">
      {WHEEL.map((s, i) => {
        const a0 = i * SLICE - SLICE / 2;
        const a1 = a0 + SLICE;
        const [x0, y0] = pt(a0, 96);
        const [x1, y1] = pt(a1, 96);
        const [cx, cy] = pt(i * SLICE, 64);
        const ic = sliceIcon(s.r);
        return (
          <g key={i}>
            <path d={`M100 100 L${x0} ${y0} A96 96 0 0 1 ${x1} ${y1}Z`} fill={s.color} stroke="#5b3a29" strokeWidth="2" />
            <g transform={`rotate(${i * SLICE} ${cx} ${cy})`}>
              {ic.item ? (
                <svg x={cx - 17} y={cy - 22} width="34" height="34" viewBox="0 0 100 100" overflow="visible">
                  <ItemArt id={ic.item} className="" />
                </svg>
              ) : (
                <svg x={cx - 13} y={cy - 22} width="26" height="26" viewBox="0 0 40 40">
                  <Icon name={ic.icon} size={40} />
                </svg>
              )}
              {ic.n && (
                <text x={cx} y={cy + 18} textAnchor="middle" className="wheel-num">
                  {ic.n}
                </text>
              )}
            </g>
            {s.jackpot && <circle cx={pt(i * SLICE, 88)[0]} cy={pt(i * SLICE, 88)[1]} r="3" fill="#ffd23f" stroke="#5b3a29" strokeWidth="1" />}
          </g>
        );
      })}
      <circle cx="100" cy="100" r="96" fill="none" stroke="#5b3a29" strokeWidth="5" />
      {Array.from({ length: N }, (_, i) => {
        const [x, y] = pt(i * SLICE - SLICE / 2, 96);
        return <circle key={i} cx={x} cy={y} r="4" fill="#ffd23f" stroke="#5b3a29" strokeWidth="1.5" />;
      })}
    </svg>
  );
}

export function WheelModal({ onClose }) {
  const { state, act, ref } = useGameCtx();
  const w = wheelState(state);
  const [rot, setRot] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState(null);
  const ticker = useRef(null);

  useEffect(() => () => clearInterval(ticker.current), []);

  const spin = () => {
    if (spinning) return;
    const idx = act(spinWheel);
    if (idx === null || idx === undefined) return;
    setWon(null);
    setSpinning(true);
    sfx('whoosh');
    const jitter = (Math.random() - 0.5) * SLICE * 0.6;
    const target = -(idx * SLICE) + jitter;
    const base = rot - (rot % 360);
    setRot(base + 360 * 6 + (((target % 360) + 360) % 360));
    let n = 0;
    clearInterval(ticker.current);
    ticker.current = setInterval(() => {
      n++;
      sfx('tap');
      if (n > 26) clearInterval(ticker.current);
    }, 120 + n * 6);
  };

  const done = () => {
    if (!spinning) return;
    clearInterval(ticker.current);
    setSpinning(false);
    const p = ref.current.wheel?.pending;
    if (p !== null && p !== undefined) {
      setWon(WHEEL[p]);
      act(claimWheel);
      sfx('task');
      vibrate(state.settings.vibe, 40);
    }
  };

  const hasPending = w.pending !== null && w.pending !== undefined && !spinning;
  const canExtra = !w.free && w.extra < WHEEL_EXTRA_MAX;

  return (
    <Modal title="Roda Keberuntungan" onClose={spinning ? undefined : onClose} className="wheel-modal">
      <div className="wheel-wrap">
        <div className="wheel-pointer" />
        <div className="wheel" style={{ transform: `rotate(${rot}deg)` }} onTransitionEnd={done}>
          <WheelFace />
        </div>
        <button type="button" className="wheel-hub" onClick={spin} disabled={spinning}>
          <img src="/ui/zorro_avatar.png" alt="" />
        </button>
      </div>
      {won && (
        <div className="wheel-won">
          <b>{won.jackpot ? 'JACKPOT!' : 'Kamu dapat:'}</b>
          <RewardChips r={won.r} />
        </div>
      )}
      {hasPending ? (
        <Btn color="green" className="big" onClick={() => (act(claimWheel), sfx('task'))}>
          Ambil hadiah tertunda
        </Btn>
      ) : w.free ? (
        <Btn color="green" className="big" disabled={spinning} onClick={spin}>
          Putar Gratis!
        </Btn>
      ) : canExtra ? (
        <Btn color="purple" className="big" disabled={spinning} onClick={spin}>
          Putar lagi <Icon name="gem" size={20} /> {WHEEL_EXTRA_COST}
        </Btn>
      ) : (
        <p className="center muted">Putaran hari ini habis. Kembali besok!</p>
      )}
      <p className="muted center small">1 putaran gratis setiap hari · maks. {WHEEL_EXTRA_MAX} putaran tambahan</p>
    </Modal>
  );
}

export function wheelReady(state) {
  return wheelState(state).free;
}
