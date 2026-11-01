import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SPEAKERS } from '../game/areas';
import { bus } from '../game/useGame';
import { Icon } from './common';
import { ItemArt, Sparkle } from '../art/ItemArt';
import { item } from '../game/items';
import { sfx } from '../game/audio';

// ---------------------------------------------------------------- dialogue
export function Dialogue({ lines, onDone }) {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0);
  const line = lines[i];
  const text = line[1];
  useEffect(() => {
    setShown(0);
    const id = setInterval(() => setShown((n) => (n >= text.length ? (clearInterval(id), n) : n + 2)), 22);
    if (line[0] !== 'nina') sfx('meow');
    return () => clearInterval(id);
  }, [i, text, line]);
  const next = () => {
    if (shown < text.length) {
      setShown(text.length);
      return;
    }
    sfx('tap');
    if (i + 1 < lines.length) setI(i + 1);
    else onDone();
  };
  const sp = SPEAKERS[line[0]];
  const left = line[0] === 'nina';
  return (
    <div className="dialogue-back" onClick={next}>
      <div className={`dialogue ${left ? 'left' : 'right'}`}>
        <div className="dialogue-portrait" key={line[0]}>
          <img src={sp.img} alt={sp.name} draggable="false" />
        </div>
        <div className="dialogue-box">
          <b className="dialogue-name">{sp.name}</b>
          <p>{text.slice(0, shown)}</p>
          <span className="dialogue-next">▼</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- tutorial
export function Tutorial({ target, text, dragTo, pos, soft }) {
  const [rect, setRect] = useState(null);
  const [rect2, setRect2] = useState(null);
  useLayoutEffect(() => {
    let raf;
    const loop = () => {
      const el = target ? document.querySelector(target) : null;
      const r = el?.getBoundingClientRect();
      setRect((old) => (r && (!old || old.x !== r.x || old.y !== r.y || old.width !== r.width) ? { x: r.x, y: r.y, width: r.width, height: r.height } : r ? old : null));
      const el2 = dragTo ? document.querySelector(dragTo) : null;
      const r2 = el2?.getBoundingClientRect();
      setRect2((old) => (r2 && (!old || old.x !== r2.x || old.y !== r2.y) ? { x: r2.x, y: r2.y, width: r2.width, height: r2.height } : r2 ? old : null));
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [target, dragTo]);
  const pad = 6;
  const below = pos ? pos === 'bottom' : rect ? rect.y < window.innerHeight * 0.5 : false;
  return (
    <div className="tut">
      {rect && (
        <div className={`tut-hole ${soft ? 'soft' : ''}`} style={{ left: rect.x - pad, top: rect.y - pad, width: rect.width + pad * 2, height: rect.height + pad * 2 }} />
      )}
      {rect && (
        <div
          className={`tut-hand ${dragTo && rect2 ? 'drag' : 'tap'}`}
          style={{
            left: rect.x + rect.width / 2,
            top: rect.y + rect.height / 2,
            '--tx': rect2 ? `${rect2.x + rect2.width / 2 - (rect.x + rect.width / 2)}px` : '0px',
            '--ty': rect2 ? `${rect2.y + rect2.height / 2 - (rect.y + rect.height / 2)}px` : '0px',
          }}
        >
          <svg viewBox="0 0 40 48" width="44" height="52">
            <path
              d="M14 4 q4 -3 7 0 v16 l2 -1 q4 -2 6 1 l1 1 q4 -2 6 2 q4 -1 5 3 v10 q0 10 -10 12 h-8 q-6 0 -10 -6 l-9 -12 q-2 -4 2 -6 q3 -1 6 2 l2 2z"
              fill="#fff"
              stroke="#5b3a29"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      {text && (
        <div className={`tut-text ${below ? 'bottom' : 'top'}`}>
          <img src="/ui/nina_avatar.png" alt="" />
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------- fx
let fxId = 1;
const HUD_ICON = { coins: 'coin', gems: 'gem', energy: 'energy', xp: 'xp' };

function rectOf(sel) {
  const el = document.querySelector(sel);
  return el ? el.getBoundingClientRect() : null;
}

function center(r) {
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

function Flyer({ f, onEnd }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const dx = f.to.x - f.from.x;
    const dy = f.to.y - f.from.y;
    const mx = dx * 0.3 + (f.spread || 0);
    const my = dy * 0.3 - 60;
    const anim = el.animate(
      [
        { transform: `translate(0px,0px) scale(${f.s0 || 0.6})`, opacity: 0 },
        { transform: `translate(${(f.spread || 0) * 0.6}px,${-20}px) scale(1)`, opacity: 1, offset: 0.2 },
        { transform: `translate(${mx}px,${my}px) scale(1)`, opacity: 1, offset: 0.5 },
        { transform: `translate(${dx}px,${dy}px) scale(${f.s1 || 0.6})`, opacity: 1 },
      ],
      { duration: f.dur || 750, delay: f.delay || 0, easing: 'cubic-bezier(.5,0,.6,1)', fill: 'both' },
    );
    anim.onfinish = () => onEnd(f);
    return () => anim.cancel();
  }, [f, onEnd]);
  return (
    <div ref={ref} className="flyer" style={{ left: f.from.x - f.size / 2, top: f.from.y - f.size / 2, width: f.size, height: f.size }}>
      {f.icon ? <Icon name={f.icon} size={f.size} /> : <ItemArt id={f.item} />}
    </div>
  );
}

function Burst({ b, onEnd }) {
  useEffect(() => {
    const id = setTimeout(() => onEnd(b), b.big ? 1200 : 700);
    return () => clearTimeout(id);
  }, [b, onEnd]);
  const n = b.big ? 14 : 8;
  return (
    <div className={`burst ${b.big ? 'big' : ''} ${b.kind || ''}`} style={{ left: b.x, top: b.y }}>
      <div className="burst-ring" />
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="burst-p" style={{ '--a': `${(360 / n) * i + (b.seed || 0)}deg`, '--d': `${(b.big ? 90 : 38) + (i % 3) * 10}px` }}>
          <svg viewBox="-8 -8 16 16" width="14" height="14">
            <Sparkle x={0} y={0} s={1} c={i % 2 ? '#ffd23f' : '#fff'} />
          </svg>
        </span>
      ))}
    </div>
  );
}

export function FX() {
  const [flyers, setFlyers] = useState([]);
  const [bursts, setBursts] = useState([]);
  const [floats, setFloats] = useState([]);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const bump = (kind) => {
      const el = document.querySelector(`[data-hud="${kind}"]`);
      if (!el) return;
      el.classList.remove('bump');
      void el.offsetWidth;
      el.classList.add('bump');
    };
    const sourceRect = (from) => {
      if (!from) return null;
      if (from.idx !== undefined) return rectOf(`[data-cell="${from.idx}"]`);
      if (from.order) return rectOf(`[data-order="${from.order}"]`);
      return null;
    };
    const addToast = (t) => {
      const id = fxId++;
      setToasts((x) => [...x.slice(-2), { id, ...t }]);
      setTimeout(() => setToasts((x) => x.filter((y) => y.id !== id)), t.ms || 2600);
    };
    return bus.on(({ t, d }) => {
      if (t === 'gain') {
        const target = rectOf(`[data-hud="${d.kind}"]`);
        if (!target) return;
        let src = sourceRect(d.from);
        if (!src) src = { left: window.innerWidth / 2 - 20, top: window.innerHeight / 2 - 20, width: 40, height: 40 };
        const from = center(src);
        const to = center(target);
        const count = Math.max(1, Math.min(6, Math.ceil(d.amount / (d.kind === 'coins' ? 8 : d.kind === 'xp' ? 6 : 4))));
        const add = Array.from({ length: count }, (_, i) => ({
          id: fxId++,
          icon: HUD_ICON[d.kind],
          kind: d.kind,
          from,
          to,
          size: 28,
          delay: i * 70 + (d.from?.order ? 250 : 0),
          spread: (i - count / 2) * 14,
          last: i === count - 1,
        }));
        setFlyers((x) => [...x, ...add]);
        const fid = fxId++;
        setFloats((x) => [...x, { id: fid, x: from.x, y: from.y - 10, text: `+${d.amount}`, kind: d.kind }]);
        setTimeout(() => setFloats((x) => x.filter((y) => y.id !== fid)), 1100);
      } else if (t === 'serve') {
        const card = rectOf(`[data-order="${d.order.uid}"]`);
        if (!card) return;
        const to = center(card);
        const add = d.cells
          .map((c, i) => {
            const r = rectOf(`[data-cell="${c.idx}"]`);
            if (!r) return null;
            return { id: fxId++, item: c.id, from: center(r), to, size: r.width * 0.9, delay: i * 80, dur: 520, s0: 1, s1: 0.4 };
          })
          .filter(Boolean);
        setFlyers((x) => [...x, ...add]);
        const cr = card;
        setTimeout(() => setBursts((x) => [...x, { id: fxId++, x: cr.left + cr.width / 2, y: cr.top + cr.height / 2, big: true }]), 520);
        sfx('serve');
      } else if (t === 'merge' || t === 'unbox' || t === 'freeWeb' || t === 'popBubble' || t === 'chestOpen' || t === 'collect') {
        const r = rectOf(`[data-cell="${d.idx}"]`);
        if (!r) return;
        const c = center(r);
        setBursts((x) => [...x, { id: fxId++, x: c.x, y: c.y, kind: t, seed: Math.random() * 40 }]);
      } else if (t === 'task') {
        setBursts((x) => [...x, { id: fxId++, x: window.innerWidth / 2, y: window.innerHeight * 0.45, big: true }]);
      } else if (t === 'toast') {
        addToast({ text: d.text });
      } else if (t === 'discover') {
        addToast({ text: `Resep baru: ${item(d.id).name}!`, item: d.id });
      } else if (t === 'needGems') {
        addToast({ text: 'Permata tidak cukup.' });
      } else if (t === 'needCoins') {
        addToast({ text: d?.need ? `Butuh ${d.need} koin lagi. Sajikan pesanan!` : 'Koin tidak cukup.' });
      } else if (t === 'bought') {
        addToast({ text: 'Dibeli! Ambil di tombol Hadiah di papan.', item: d.id });
      } else if (t === 'bump') {
        bump(d.kind);
      }
    });
  }, []);

  const endFlyer = useCallback((f) => {
    setFlyers((x) => x.filter((y) => y.id !== f.id));
    if (f.kind) {
      const el = document.querySelector(`[data-hud="${f.kind}"]`);
      if (el) {
        el.classList.remove('bump');
        void el.offsetWidth;
        el.classList.add('bump');
      }
      if (f.kind === 'coins' && f.last) sfx('coin');
    }
  }, []);
  const endBurst = useCallback((b) => setBursts((x) => x.filter((y) => y.id !== b.id)), []);

  return (
    <div className="fx">
      {bursts.map((b) => (
        <Burst key={b.id} b={b} onEnd={endBurst} />
      ))}
      {flyers.map((f) => (
        <Flyer key={f.id} f={f} onEnd={endFlyer} />
      ))}
      {floats.map((f) => (
        <div key={f.id} className={`float-text ${f.kind}`} style={{ left: f.x, top: f.y }}>
          {f.text}
        </div>
      ))}
      <div className="toasts">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            {t.item && (
              <span className="toast-art">
                <ItemArt id={t.item} />
              </span>
            )}
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}
