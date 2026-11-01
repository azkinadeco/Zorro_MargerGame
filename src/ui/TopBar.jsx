import { useEffect, useState } from 'react';
import { Icon, fmtTime } from './common';
import { xpForLevel, ENERGY_MAX } from '../game/config';
import { energyNextIn } from '../game/engine';
import { useGameCtx } from '../game/useGame';

function useNow(ms = 1000) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}

export function TopBar({ onOpen }) {
  const { state } = useGameCtx();
  const now = useNow();
  const need = xpForLevel(state.level);
  const pct = Math.min(100, (state.xp / need) * 100);
  const next = energyNextIn(state, now);
  return (
    <header className="topbar">
      <button type="button" className="hud hud-level" data-hud="xp" onClick={() => onOpen('level')} aria-label="Level">
        <span className="lvl-star">
          <Icon name="star" size={40} />
          <b>{state.level}</b>
        </span>
        <span className="lvl-bar">
          <span className="lvl-fill" style={{ width: `${pct}%` }} />
          <small>
            {state.xp}/{need}
          </small>
        </span>
      </button>
      <button type="button" className="hud hud-pill" data-hud="energy" onClick={() => onOpen('energy')} aria-label="Energi">
        <Icon name="energy" size={26} />
        <span className="hud-val">
          {state.energy}
          {state.energy < ENERGY_MAX && <small className="hud-timer">{fmtTime(next)}</small>}
        </span>
        <span className="hud-plus">+</span>
      </button>
      <button type="button" className="hud hud-pill" data-hud="coins" onClick={() => onOpen('shop')} aria-label="Koin">
        <Icon name="coin" size={26} />
        <span className="hud-val">{state.coins}</span>
      </button>
      <button type="button" className="hud hud-pill" data-hud="gems" onClick={() => onOpen('shop')} aria-label="Permata">
        <Icon name="gem" size={26} />
        <span className="hud-val">{state.gems}</span>
        <span className="hud-plus">+</span>
      </button>
    </header>
  );
}

export { useNow };
