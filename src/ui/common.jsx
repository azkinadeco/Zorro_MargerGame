import { useEffect } from 'react';
import { ItemArt, Paw } from '../art/ItemArt';
import { sfx } from '../game/audio';

const O = '#5b3a29';

export function Icon({ name, size = 22, className = '' }) {
  const p = { width: size, height: size, viewBox: '0 0 40 40', className: `ico ${className}`, 'aria-hidden': true };
  switch (name) {
    case 'coin':
      return (
        <svg {...p}>
          <circle cx="20" cy="20" r="16" fill="#ffc531" stroke={O} strokeWidth="2.5" />
          <circle cx="20" cy="20" r="11" fill="#ffd95e" stroke="#e0a21a" strokeWidth="2" />
          <Paw x={20} y={20.5} s={0.82} c="#e0a21a" />
        </svg>
      );
    case 'gem':
      return (
        <svg {...p}>
          <path d="M7 15 l6 -8 h14 l6 8 l-13 19z" fill="#b07cf5" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M7 15 h26 M14 7 l6 8 l6 -8 M20 15 v19" fill="none" stroke={O} strokeWidth="1.4" opacity="0.6" />
          <path d="M12 14 l3 -4" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'energy':
      return (
        <svg {...p}>
          <path d="M23 3 l-14 20 h9 l-4 15 l16 -21 h-10z" fill="#ffd23f" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case 'star':
      return (
        <svg {...p}>
          <path d="M20 3 l5 10.5 l11.5 1.5 l-8.5 8 l2.2 11.5 l-10.2 -5.6 l-10.2 5.6 l2.2 -11.5 l-8.5 -8 l11.5 -1.5z" fill="#ffd23f" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case 'xp':
      return (
        <svg {...p}>
          <path d="M20 3 l5 10.5 l11.5 1.5 l-8.5 8 l2.2 11.5 l-10.2 -5.6 l-10.2 5.6 l2.2 -11.5 l-8.5 -8 l11.5 -1.5z" fill="#7fc8f0" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case 'home':
      return (
        <svg {...p}>
          <path d="M5 19 l15 -13 l15 13 v15 q0 2 -2 2 h-26 q-2 0 -2 -2z" fill="#ffb3c9" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M3 20 l17 -15 l17 15" fill="none" stroke="#e34f4f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="16" y="24" width="8" height="12" rx="2" fill="#a46a3c" stroke={O} strokeWidth="2" />
        </svg>
      );
    case 'play':
      return (
        <svg {...p}>
          <path d="M12 6 l22 14 l-22 14z" fill="#fff" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case 'box':
      return (
        <svg {...p}>
          <rect x="5" y="12" width="30" height="23" rx="3" fill="#d9a36a" stroke={O} strokeWidth="2.5" />
          <path d="M3 12 h34 l-3 -6 h-28z" fill="#e9bf86" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="15" y="18" width="10" height="5" rx="2" fill="#fffaf2" stroke={O} strokeWidth="2" />
        </svg>
      );
    case 'gift':
      return (
        <svg {...p}>
          <rect x="7" y="16" width="26" height="19" rx="3" fill="#ff9ab8" stroke={O} strokeWidth="2.5" />
          <rect x="5" y="11" width="30" height="7" rx="2" fill="#ffb3c9" stroke={O} strokeWidth="2.5" />
          <rect x="17.5" y="11" width="5" height="24" fill="#ffd23f" stroke={O} strokeWidth="2" />
          <path d="M20 11 q-9 -10 -11 -3 q1 4 11 3 q10 1 11 -3 q-2 -7 -11 3z" fill="#ffd23f" stroke={O} strokeWidth="2" />
        </svg>
      );
    case 'quest':
      return (
        <svg {...p}>
          <rect x="7" y="5" width="26" height="31" rx="4" fill="#fffaf2" stroke={O} strokeWidth="2.5" />
          <rect x="13" y="2" width="14" height="7" rx="3" fill="#6fbfa8" stroke={O} strokeWidth="2.2" />
          <path d="M12 17 l3 3 l5 -6 M12 27 l3 3 l5 -6" fill="none" stroke="#5fae4a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M23 18 h6 M23 28 h6" stroke={O} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'shop':
      return (
        <svg {...p}>
          <rect x="6" y="16" width="28" height="20" rx="2" fill="#fffaf2" stroke={O} strokeWidth="2.5" />
          <path d="M4 16 l3 -10 h26 l3 10 q-4 4 -8 0 q-4 4 -8 0 q-4 4 -8 0 q-4 4 -8 0z" fill="#f27ea0" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="16" y="24" width="8" height="12" rx="1" fill="#8fd3c0" stroke={O} strokeWidth="2" />
        </svg>
      );
    case 'book':
      return (
        <svg {...p}>
          <path d="M5 8 q8 -3 15 2 q7 -5 15 -2 v25 q-8 -3 -15 2 q-7 -5 -15 -2z" fill="#9fd3e6" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M20 10 v25" stroke={O} strokeWidth="2.2" />
          <Paw x={12} y={20} s={0.6} c="#fff" />
        </svg>
      );
    case 'gear':
      return (
        <svg {...p}>
          <path d="M17 3 h6 l1 5 l4 2 l4 -3 l4 4 l-3 4 l2 4 l5 1 v6 l-5 1 l-2 4 l3 4 l-4 4 l-4 -3 l-4 2 l-1 5 h-6 l-1 -5 l-4 -2 l-4 3 l-4 -4 l3 -4 l-2 -4 l-5 -1 v-6 l5 -1 l2 -4 l-3 -4 l4 -4 l4 3 l4 -2z" fill="#c8d2db" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
          <circle cx="20" cy="20" r="6" fill="#fffaf2" stroke={O} strokeWidth="2.2" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...p}>
          <rect x="5" y="8" width="30" height="27" rx="4" fill="#fffaf2" stroke={O} strokeWidth="2.5" />
          <path d="M5 16 h30" stroke={O} strokeWidth="2.5" />
          <rect x="5" y="8" width="30" height="8" rx="3" fill="#e34f4f" stroke={O} strokeWidth="2.5" />
          <path d="M13 4 v7 M27 4 v7" stroke={O} strokeWidth="2.5" strokeLinecap="round" />
          <Paw x={20} y={26} s={0.75} c="#f27ea0" />
        </svg>
      );
    case 'close':
      return (
        <svg {...p}>
          <path d="M11 11 l18 18 M29 11 l-18 18" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );
    case 'arrowL':
      return (
        <svg {...p}>
          <path d="M25 8 l-12 12 l12 12" fill="none" stroke={O} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'arrowR':
      return (
        <svg {...p}>
          <path d="M15 8 l12 12 l-12 12" fill="none" stroke={O} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'check':
      return (
        <svg {...p}>
          <circle cx="20" cy="20" r="16" fill="#5fae4a" stroke="#fff" strokeWidth="3" />
          <path d="M12 20 l6 6 l10 -12" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...p}>
          <path d="M12 18 v-5 q0 -8 8 -8 q8 0 8 8 v5" fill="none" stroke={O} strokeWidth="3" />
          <rect x="8" y="17" width="24" height="19" rx="4" fill="#ffc531" stroke={O} strokeWidth="2.5" />
          <circle cx="20" cy="26" r="3" fill={O} />
        </svg>
      );
    case 'cat':
      return (
        <svg {...p}>
          <path d="M8 18 L7 5 L16 12 h8 L33 5 L32 18 q4 6 1 12 q-4 7 -13 7 q-9 0 -13 -7 q-3 -6 1 -12z" fill="#2f2a2b" stroke={O} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M13 24 q7 -6 14 0 q3 6 -1 10 q-6 3 -12 0 q-4 -4 -1 -10z" fill="#fffaf2" />
          <circle cx="14.5" cy="20" r="2.2" fill="#9ccc65" />
          <circle cx="25.5" cy="20" r="2.2" fill="#9ccc65" />
          <path d="M18.5 26 h3 l-1.5 1.6z" fill="#f27e8e" />
          <path d="M9 9 l3 3 M31 9 l-3 3" stroke="#f6b3bf" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'heart':
      return (
        <svg {...p}>
          <path d="M20 35 q-16 -10 -16 -21 q0 -8 8 -8 q5 0 8 5 q3 -5 8 -5 q8 0 8 8 q0 11 -16 21z" fill="#f27ea0" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M10 12 q2 -3 5 -2" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'heartEmpty':
      return (
        <svg {...p}>
          <path d="M20 35 q-16 -10 -16 -21 q0 -8 8 -8 q5 0 8 5 q3 -5 8 -5 q8 0 8 8 q0 11 -16 21z" fill="#ead6bd" stroke={O} strokeWidth="2.5" strokeLinejoin="round" opacity="0.7" />
        </svg>
      );
    case 'photo':
      return (
        <svg {...p}>
          <rect x="5" y="9" width="30" height="24" rx="3" fill="#fffaf2" stroke={O} strokeWidth="2.5" />
          <path d="M8 29 l8 -9 l6 6 l4 -4 l7 7" fill="#9fd77a" stroke={O} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="27" cy="16" r="3" fill="#ffd23f" stroke={O} strokeWidth="1.8" />
        </svg>
      );
    case 'crown':
      return (
        <svg {...p}>
          <path d="M5 30 l2 -18 l8 8 l5 -12 l5 12 l8 -8 l2 18z" fill="#ffd23f" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="20" cy="24" r="2.5" fill="#e34f4f" />
        </svg>
      );
    case 'swap':
      return (
        <svg {...p}>
          <path d="M8 15 h20 l-5 -5 M32 25 h-20 l5 5" fill="none" stroke={O} strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'tent':
      return (
        <svg {...p}>
          <path d="M20 4 l15 14 v17 h-30 v-17z" fill="#fffaf2" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M5 18 l15 -14 l15 14 q-4 3 -7.5 0 q-3.75 3 -7.5 0 q-3.75 3 -7.5 0 q-3.5 3 -7.5 0z" fill="#f27ea0" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M14 35 q6 -14 12 0" fill="#e34f4f" stroke={O} strokeWidth="2.2" />
          <path d="M20 4 v-2 l6 2 l-6 2" fill="#ffd23f" stroke={O} strokeWidth="1.6" />
        </svg>
      );
    case 'trophy':
      return (
        <svg {...p}>
          <path d="M11 5 h18 v8 q0 10 -9 12 q-9 -2 -9 -12z" fill="#ffd23f" stroke={O} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M11 8 h-5 q0 8 7 9 M29 8 h5 q0 8 -7 9" fill="none" stroke={O} strokeWidth="2.5" />
          <path d="M17 25 h6 v5 h-6z M12 30 h16 v5 h-16z" fill="#c98a52" stroke={O} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M15 9 v6" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...p}>
          <rect x="5" y="5" width="13" height="13" rx="4" fill="#f27ea0" stroke={O} strokeWidth="2.4" />
          <rect x="22" y="5" width="13" height="13" rx="4" fill="#ffd23f" stroke={O} strokeWidth="2.4" />
          <rect x="5" y="22" width="13" height="13" rx="4" fill="#6fbfa8" stroke={O} strokeWidth="2.4" />
          <rect x="22" y="22" width="13" height="13" rx="4" fill="#9fd3e6" stroke={O} strokeWidth="2.4" />
          <path d="M28.5 25 v7 M25 28.5 h7" stroke={O} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case 'wheel':
      return (
        <svg {...p}>
          <circle cx="20" cy="21" r="15" fill="#fff3c4" stroke={O} strokeWidth="2.5" />
          <path d="M20 21 L20 6 A15 15 0 0 1 33 13.5z M20 21 L33 28.5 A15 15 0 0 1 20 36z M20 21 L7 28.5 A15 15 0 0 1 7 13.5z" fill="#f27ea0" stroke={O} strokeWidth="1.6" />
          <circle cx="20" cy="21" r="4" fill="#ffd23f" stroke={O} strokeWidth="2" />
          <path d="M16 2 h8 l-4 6z" fill="#e34f4f" stroke={O} strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case 'sell':
      return <Icon name="coin" size={size} className={className} />;
    default:
      return null;
  }
}

export function Btn({ children, color = 'green', className = '', onClick, disabled, small, ...rest }) {
  return (
    <button
      type="button"
      className={`btn btn-${color} ${small ? 'btn-sm' : ''} ${className}`}
      disabled={disabled}
      onClick={(e) => {
        sfx('tap');
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Price({ coins, gems }) {
  return (
    <span className="price">
      {coins ? (
        <>
          <Icon name="coin" size={18} /> {coins}
        </>
      ) : null}
      {gems ? (
        <>
          <Icon name="gem" size={18} /> {gems}
        </>
      ) : null}
    </span>
  );
}

export function RewardChips({ r }) {
  return (
    <span className="reward-chips">
      {r.coins ? (
        <span className="chip">
          <Icon name="coin" size={18} />
          {r.coins}
        </span>
      ) : null}
      {r.gems ? (
        <span className="chip">
          <Icon name="gem" size={18} />
          {r.gems}
        </span>
      ) : null}
      {r.energy ? (
        <span className="chip">
          <Icon name="energy" size={18} />
          {r.energy}
        </span>
      ) : null}
      {r.xp ? (
        <span className="chip">
          <Icon name="xp" size={18} />
          {r.xp}
        </span>
      ) : null}
      {r.item ? (
        <span className="chip chip-item">
          <ItemArt id={r.item} />
        </span>
      ) : null}
    </span>
  );
}

export function Modal({ title, onClose, children, className = '', color = 'cream' }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="modal-back" onPointerDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className={`modal modal-${color} ${className}`} role="dialog" aria-label={title}>
        {title && (
          <div className="modal-title">
            <span>{title}</span>
          </div>
        )}
        {onClose && (
          <button type="button" className="modal-close" aria-label="Tutup" onClick={() => (sfx('tap'), onClose())}>
            <Icon name="close" size={20} />
          </button>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export function Bar({ value, max, className = '' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`bar ${className}`}>
      <div className="bar-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function fmtTime(ms) {
  const s = Math.ceil(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}j ${m}m`;
  return `${m}:${String(sec).padStart(2, '0')}`;
}
