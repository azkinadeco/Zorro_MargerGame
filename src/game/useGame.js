import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { newGame, tick, ensureGenerators, ensurePets } from './engine';
import { dayKey } from './quests';
import { ENERGY_MAX, ENERGY_REGEN_MS } from './config';

// ---------------------------------------------------------------- event bus
const listeners = new Set();
export const bus = {
  on(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  emit(ev) {
    for (const fn of listeners) fn(ev);
  },
};

// --------------------------------------------------------------------- save
const KEY = 'zorro-cat-cafe-save-v2';

export function loadGame() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (s?.v !== 2 || !Array.isArray(s.board)) return null;
    const fresh = newGame();
    // forward-compatible: fill any missing keys
    for (const k of Object.keys(fresh)) if (s[k] === undefined) s[k] = fresh[k];
    s.settings = { ...fresh.settings, ...s.settings };
    s.shop = { ...fresh.shop, ...s.shop };
    ensureGenerators(s);
    ensurePets(s);
    return s;
  } catch {
    return null;
  }
}

export function saveGame(s) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* storage full or blocked: keep playing */
  }
}

export function wipeSave() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}

export function hasSave() {
  try {
    return !!localStorage.getItem(KEY);
  } catch {
    return false;
  }
}

// --------------------------------------------------------------------- hook
const GameCtx = createContext(null);
export const GameProvider = GameCtx.Provider;
export const useGameCtx = () => useContext(GameCtx);

export function useGameState() {
  const [state, setState] = useState(() => {
    const s = loadGame() || newGame();
    tick(s, Date.now(), () => {});
    return s;
  });
  const ref = useRef(state);

  const act = useCallback((fn, ...args) => {
    const draft = structuredClone(ref.current);
    const events = [];
    const result = fn(draft, ...args, (t, d) => events.push({ t, d }));
    ref.current = draft;
    setState(draft);
    for (const e of events) bus.emit(e);
    return result;
  }, []);

  const replace = useCallback((s) => {
    ref.current = s;
    setState(s);
  }, []);

  // clock: energy regen, bubble expiry, daily reset
  useEffect(() => {
    const id = setInterval(() => {
      const cur = ref.current;
      const now = Date.now();
      const needs =
        (cur.energy < ENERGY_MAX && now - cur.energyTs >= ENERGY_REGEN_MS) ||
        cur.board.some((c) => c?.bubble && c.bubble < now) ||
        cur.quests?.day !== dayKey(now);
      if (needs) act(tick, now);
    }, 1000);
    return () => clearInterval(id);
  }, [act]);

  // debounced autosave
  useEffect(() => {
    const id = setTimeout(() => saveGame(state), 400);
    return () => clearTimeout(id);
  }, [state]);

  useEffect(() => {
    const flush = () => saveGame(ref.current);
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', flush);
    };
  }, []);

  return { state, act, replace, ref };
}
