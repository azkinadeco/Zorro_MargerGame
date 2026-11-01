import { useLayoutEffect, useRef, useState } from 'react';
import { useGameCtx } from '../game/useGame';
import { Btn, Icon, Price, RewardChips, fmtTime } from './common';
import { ItemArt } from '../art/ItemArt';
import { SPOTS, SPOT_MAX, spotTime, upgradeCost } from '../game/village';
import { spotState, collectSpot, upgradeSpot } from '../game/engine';
import { useNow } from './TopBar';
import { sfx } from '../game/audio';

const RATIO = 1376 / 768;

function GiftIcon({ g }) {
  if (g.items) return <ItemArt id={g.items[0]} />;
  const k = g.coins ? 'coin' : g.gems ? 'gem' : 'energy';
  return <Icon name={k} size={30} />;
}

export function villageReady(state, now = Date.now()) {
  return SPOTS.some((sp) => {
    const st = spotState(state, sp.id, now);
    return st.lv > 0 && st.ready;
  });
}

export function VillageView({ onClose }) {
  const { state, act } = useGameCtx();
  const now = useNow();
  const scroll = useRef(null);
  const [h, setH] = useState(500);
  const [sel, setSel] = useState(null);
  const w = Math.round(h * RATIO);

  useLayoutEffect(() => {
    const el = scroll.current;
    const m = () => setH(el.clientHeight);
    m();
    const ro = new ResizeObserver(m);
    ro.observe(el);
    el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
    return () => ro.disconnect();
  }, []);

  const spot = sel ? SPOTS.find((x) => x.id === sel) : null;
  const st = spot ? spotState(state, spot.id, now) : null;
  const readyCount = SPOTS.filter((sp) => {
    const x = spotState(state, sp.id, now);
    return x.lv > 0 && x.ready;
  }).length;

  const collectAll = () => {
    let n = 0;
    for (const sp of SPOTS) {
      const x = spotState(state, sp.id, now);
      if (x.lv > 0 && x.ready && act(collectSpot, sp.id)) n++;
    }
    if (n) sfx('task');
  };

  return (
    <div className="village">
      <div className="village-head">
        <button type="button" className="area-arrow" onClick={() => (sfx('tap'), onClose())} aria-label="Kembali">
          <Icon name="arrowL" size={22} />
        </button>
        <div className="area-title">
          <b>Peta Desa</b>
          <small>Tetangga mengirim bahan & hadiah</small>
        </div>
        <Btn small color={readyCount ? 'green' : 'grey'} disabled={!readyCount} onClick={collectAll}>
          Ambil semua{readyCount ? ` (${readyCount})` : ''}
        </Btn>
      </div>
      <div className="room-scroll" ref={scroll}>
        <div className="village-map" style={{ width: w, height: h }}>
          {SPOTS.map((sp) => {
            const x = spotState(state, sp.id, now);
            const g = sp.gives(Math.max(1, x.lv));
            const locked = x.lv === 0;
            return (
              <button
                type="button"
                key={sp.id}
                className={`pin ${locked ? 'locked' : x.ready ? 'ready' : ''} ${sel === sp.id ? 'on' : ''}`}
                style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
                onClick={() => {
                  sfx('select');
                  if (!locked && x.ready) {
                    act(collectSpot, sp.id);
                    sfx('task');
                  }
                  setSel(sp.id);
                }}
              >
                <span className="pin-bubble">{locked ? <Icon name="lock" size={22} /> : <GiftIcon g={g} />}</span>
                <span className="pin-label">{locked ? `Lv ${sp.level}` : x.ready ? 'Ambil!' : fmtTime(x.left)}</span>
              </button>
            );
          })}
        </div>
      </div>
      {spot && (
        <div className="spot-sheet">
          <button type="button" className="sheet-close" onClick={() => setSel(null)} aria-label="Tutup">
            <Icon name="close" size={16} />
          </button>
          <b>{spot.name}</b>
          <small className="muted">{spot.desc}</small>
          {st.lv === 0 ? (
            <p className="warn">Terbuka di level {spot.level}.</p>
          ) : (
            <>
              <div className="spot-row">
                <span className="spot-stars">
                  {Array.from({ length: SPOT_MAX }, (_, i) => (
                    <Icon key={i} name="star" size={16} className={i < st.lv ? '' : 'dim-ico'} />
                  ))}
                </span>
                <span className="spot-give">
                  Kirim <RewardChips r={spot.gives(st.lv).items ? {} : spot.gives(st.lv)} />
                  {spot.gives(st.lv).items?.map((id, i) => (
                    <span key={i} className="chip chip-item">
                      <ItemArt id={id} />
                    </span>
                  ))}
                  tiap {fmtTime(spotTime(spot, st.lv))}
                </span>
              </div>
              {st.lv < SPOT_MAX ? (
                <Btn small color="orange" onClick={() => act(upgradeSpot, spot.id) && sfx('task')}>
                  Tingkatkan ke Lv {st.lv + 1} <Price coins={upgradeCost(st.lv)} />
                </Btn>
              ) : (
                <p className="muted center">Level maksimal!</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
