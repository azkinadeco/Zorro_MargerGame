import { ANCHORS } from '../game/costumes';
import { RESIDENTS } from '../game/areas';

const O = '#4a3328';

const HATS = {
  chef: (
    <>
      <circle cx="30" cy="32" r="18" fill="#fff" />
      <circle cx="70" cy="32" r="18" fill="#fff" />
      <circle cx="50" cy="24" r="22" fill="#fff" />
      <rect x="26" y="40" width="48" height="24" rx="4" fill="#fff" />
      <path d="M32 46 v14 M44 46 v14 M56 46 v14 M68 46 v14" stroke="#e6e0d8" strokeWidth="3" />
    </>
  ),
  party: (
    <>
      <path d="M50 6 L24 66 h52z" fill="#f27ea0" />
      <path d="M38 34 l20 8 M32 50 l32 10 M44 20 l12 6" stroke="#fff" strokeWidth="5" />
      <circle cx="50" cy="8" r="7" fill="#ffd23f" />
      <path d="M24 66 h52" stroke={O} strokeWidth="4" />
    </>
  ),
  flower: (
    <>
      <path d="M8 62 q42 -16 84 0" fill="none" stroke="#5fae4a" strokeWidth="6" />
      {[[14, 58, '#f27ea0'], [30, 52, '#ffd23f'], [50, 49, '#9b7bea'], [70, 52, '#f27ea0'], [86, 58, '#ffd23f']].map(([x, y, c], i) => (
        <g key={i}>
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={x + Math.cos((a * Math.PI) / 180) * 6} cy={y + Math.sin((a * Math.PI) / 180) * 6} r="5.5" fill={c} />
          ))}
          <circle cx={x} cy={y} r="4" fill="#fff" />
        </g>
      ))}
    </>
  ),
  beret: (
    <>
      <ellipse cx="54" cy="50" rx="40" ry="16" fill="#e34f4f" transform="rotate(-10 54 50)" />
      <path d="M58 34 l2 -10" stroke={O} strokeWidth="5" />
      <path d="M26 54 q24 10 54 -6" fill="none" stroke="#c13e3e" strokeWidth="3" />
    </>
  ),
  crown: (
    <>
      <path d="M14 64 l4 -40 l18 18 l14 -30 l14 30 l18 -18 l4 40z" fill="#ffd23f" />
      <circle cx="50" cy="50" r="6" fill="#e34f4f" />
      <circle cx="30" cy="54" r="4" fill="#4f8fc0" />
      <circle cx="70" cy="54" r="4" fill="#4f8fc0" />
      <circle cx="50" cy="12" r="4" fill="#fff3b0" />
    </>
  ),
};

const FACES = {
  glasses: (
    <g fill="rgba(200,230,255,0.25)" strokeWidth="5">
      <circle cx="26" cy="20" r="16" />
      <circle cx="74" cy="20" r="16" />
      <path d="M42 18 q8 -6 16 0" fill="none" />
    </g>
  ),
  mask: (
    <>
      <path d="M2 18 q24 -16 48 -4 q24 -12 48 4 q-6 18 -26 18 q-14 0 -22 -10 q-8 10 -22 10 q-20 0 -26 -18z" fill="#1f1a1c" />
      <ellipse cx="27" cy="20" rx="10" ry="6" fill="#fff" opacity="0.15" stroke="none" />
      <ellipse cx="73" cy="20" rx="10" ry="6" fill="#fff" opacity="0.15" stroke="none" />
      <path d="M2 18 l-2 -8 M98 18 l2 -8" strokeWidth="4" />
    </>
  ),
  hearts: (
    <>
      {[26, 74].map((x) => (
        <path key={x} d={`M${x} 36 q-20 -12 -18 -24 q2 -8 10 -8 q6 0 8 6 q2 -6 8 -6 q8 0 10 8 q2 12 -18 24z`} fill="#f27ea0" />
      ))}
      <path d="M44 16 q6 -4 12 0" fill="none" strokeWidth="4" />
    </>
  ),
};

const NECKS = {
  bowtie: (
    <>
      <path d="M50 20 L24 6 v28z M50 20 L76 6 v28z" fill="#e34f4f" />
      <rect x="43" y="13" width="14" height="14" rx="4" fill="#c13e3e" />
    </>
  ),
  bell: (
    <>
      <path d="M8 10 q42 18 84 0 v8 q-42 18 -84 0z" fill="#4f8fc0" />
      <circle cx="50" cy="32" r="11" fill="#ffd23f" />
      <path d="M41 32 h18" strokeWidth="2.5" />
      <circle cx="50" cy="38" r="2.5" fill={O} />
    </>
  ),
  scarf: (
    <>
      <path d="M6 8 q44 20 88 0 v12 q-44 20 -88 0z" fill="#9b7bea" />
      <path d="M62 24 l8 26 l-14 0 l-4 -24z" fill="#9b7bea" />
      <path d="M20 14 v10 M36 18 v10 M52 19 v10 M68 18 v10 M84 14 v10" stroke="#c7b5f2" strokeWidth="3" />
    </>
  ),
  cape: (
    <>
      <path d="M4 10 q-4 30 -2 40 h22 q-2 -18 6 -30z M96 10 q4 30 2 40 h-22 q2 -18 -6 -30z" fill="#e34f4f" />
      <path d="M6 8 q44 18 88 0 v8 q-44 18 -88 0z" fill="#ffd23f" />
      <circle cx="50" cy="20" r="6" fill="#ffd23f" />
    </>
  ),
};

const VB = { hat: '0 0 100 70', face: '0 0 100 40', neck: '0 0 100 50' };
const SHIFT = { hat: 'translate(-50%, -88%)', face: 'translate(-50%, -50%)', neck: 'translate(-50%, -25%)' };
const ART = { hat: HATS, face: FACES, neck: NECKS };

function Piece({ cat, slot, id }) {
  const a = ANCHORS[cat]?.[slot];
  const art = ART[slot][id];
  if (!a || !art) return null;
  return (
    <svg viewBox={VB[slot]} className={`costume costume-${slot}`} style={{ left: `${a.x}%`, top: `${a.y}%`, width: `${a.w}%`, transform: SHIFT[slot] }} aria-hidden="true">
      <g stroke={O} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {art}
      </g>
    </svg>
  );
}

// A resident cat image with its outfit layered on top.
export function CatFigure({ cat, outfit, className = '' }) {
  const r = RESIDENTS[cat];
  return (
    <span className={`cat-fig ${className}`}>
      <img src={r.img} alt={r.name} draggable="false" />
      {outfit?.neck && <Piece cat={cat} slot="neck" id={outfit.neck} />}
      {outfit?.face && <Piece cat={cat} slot="face" id={outfit.face} />}
      {outfit?.hat && <Piece cat={cat} slot="hat" id={outfit.hat} />}
    </span>
  );
}

export function CostumeIcon({ slot, id }) {
  return (
    <svg viewBox={VB[slot]} className="costume-icon" aria-hidden="true">
      <g stroke={O} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {ART[slot][id]}
      </g>
    </svg>
  );
}
