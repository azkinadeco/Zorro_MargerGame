// ============================================================================
// Hand-built SVG illustrations for every item. viewBox 0 0 100 100.
// Root <g> carries the outline stroke, highlights opt out with stroke="none".
// ============================================================================
import { memo } from 'react';

const O = '#5b3a29';
const HL = { fill: '#fff', stroke: 'none', opacity: 0.55 };
const SH = { fill: '#000', stroke: 'none', opacity: 0.12 };

const Shadow = ({ w = 30, y = 90 }) => <ellipse cx="50" cy={y} rx={w} ry="5" fill="#5b3a29" opacity="0.16" stroke="none" />;
const Steam = ({ x = 50, y = 22 }) => (
  <g fill="none" stroke="#fff" strokeWidth="3" opacity="0.85" className="art-steam">
    <path d={`M${x - 8} ${y} q-4 -6 0 -11 q4 -5 0 -10`} />
    <path d={`M${x + 4} ${y + 2} q-4 -6 0 -11 q4 -5 0 -10`} />
  </g>
);
const Sparkle = ({ x, y, s = 1, c = '#fff' }) => (
  <path d={`M${x} ${y - 7 * s} Q${x + 1.2 * s} ${y - 1.2 * s} ${x + 7 * s} ${y} Q${x + 1.2 * s} ${y + 1.2 * s} ${x} ${y + 7 * s} Q${x - 1.2 * s} ${y + 1.2 * s} ${x - 7 * s} ${y} Q${x - 1.2 * s} ${y - 1.2 * s} ${x} ${y - 7 * s}Z`} fill={c} stroke="none" />
);
const Paw = ({ x, y, s = 1, c = O }) => (
  <g fill={c} stroke="none">
    <ellipse cx={x} cy={y + 2 * s} rx={4.2 * s} ry={3.5 * s} />
    <circle cx={x - 4.6 * s} cy={y - 2.4 * s} r={1.7 * s} />
    <circle cx={x - 1.6 * s} cy={y - 4.6 * s} r={1.7 * s} />
    <circle cx={x + 1.6 * s} cy={y - 4.6 * s} r={1.7 * s} />
    <circle cx={x + 4.6 * s} cy={y - 2.4 * s} r={1.7 * s} />
  </g>
);

// ------------------------------------------------------------------ COFFEE
const coffee = {
  1: () => (
    <>
      <Shadow w={26} />
      <g transform="rotate(-25 38 55)">
        <ellipse cx="38" cy="55" rx="15" ry="21" fill="#8a5233" />
        <path d="M38 35 q-7 20 0 40" fill="none" strokeWidth="3" />
        <ellipse cx="32" cy="46" rx="4" ry="7" {...HL} />
      </g>
      <g transform="rotate(22 64 58)">
        <ellipse cx="64" cy="58" rx="15" ry="21" fill="#6e3f25" />
        <path d="M64 38 q7 20 0 40" fill="none" strokeWidth="3" />
        <ellipse cx="58" cy="49" rx="4" ry="7" {...HL} />
      </g>
    </>
  ),
  2: () => (
    <>
      <Shadow w={32} />
      <ellipse cx="50" cy="80" rx="34" ry="9" fill="#fdf3e6" />
      <path d="M72 52 q14 0 12 12 q-2 10 -14 8" fill="none" strokeWidth="5" />
      <path d="M72 52 q14 0 12 12 q-2 10 -14 8" fill="none" stroke="#fdf3e6" strokeWidth="1.6" />
      <path d="M26 46 h48 l-4 24 q-2 9 -12 9 h-16 q-10 0 -12 -9z" fill="#fdf3e6" />
      <ellipse cx="50" cy="46" rx="24" ry="6.5" fill="#5a2f19" />
      <ellipse cx="44" cy="45" rx="9" ry="2" fill="#c98a52" stroke="none" opacity="0.8" />
      <path d="M31 54 q2 14 8 18" fill="none" stroke="#fff" strokeWidth="3" opacity="0.8" />
      <Steam x={52} y={34} />
    </>
  ),
  3: () => (
    <>
      <Shadow w={28} />
      <path d="M70 40 q16 0 15 15 q-1 14 -16 13" fill="none" strokeWidth="6" />
      <path d="M70 40 q16 0 15 15 q-1 14 -16 13" fill="none" stroke="#6fbfa8" strokeWidth="2" />
      <path d="M26 32 h46 v42 q0 13 -13 13 h-20 q-13 0 -13 -13z" fill="#6fbfa8" />
      <path d="M60 32 h12 v42 q0 13 -13 13 h-2 q8 -4 8 -13z" {...SH} />
      <ellipse cx="49" cy="32" rx="23" ry="6" fill="#4a2716" />
      <Paw x={49} y={58} s={1.3} c="#fff" />
      <path d="M32 40 v28" stroke="#fff" strokeWidth="4" opacity="0.6" fill="none" />
      <Steam x={50} y={22} />
    </>
  ),
  4: () => (
    <>
      <Shadow w={24} />
      <path d="M30 24 h40 l-5 62 q-1 4 -5 4 h-20 q-4 0 -5 -4z" fill="#f2e7da" />
      <path d="M33.6 62 h32.8 l-1.4 24 q-1 4 -5 4 h-20 q-4 0 -5 -4z" fill="#8a5233" stroke="none" />
      <path d="M32.4 46 h35.2 l-1.2 16 h-32.8z" fill="#d9a46f" stroke="none" />
      <path d="M31.4 33 h37.2 l-1 13 h-35.2z" fill="#fffaf2" stroke="none" />
      <path d="M30 24 h40 l-5 62 q-1 4 -5 4 h-20 q-4 0 -5 -4z" fill="none" />
      <ellipse cx="50" cy="24" rx="20" ry="4.5" fill="#fffaf2" />
      <path d="M36 30 l3 52" stroke="#fff" strokeWidth="3.5" opacity="0.7" fill="none" />
      <path d="M44 22 q6 -6 12 0" fill="none" stroke="#d9a46f" strokeWidth="2.5" />
      <rect x="30" y="52" width="40" height="12" rx="2" fill="#c98a52" />
      <Paw x={50} y={58.5} s={0.75} c="#fff" />
    </>
  ),
  5: () => (
    <>
      <Shadow w={36} />
      <ellipse cx="50" cy="56" rx="40" ry="34" fill="#fdf3e6" />
      <ellipse cx="50" cy="60" rx="31" ry="26" {...SH} />
      <path d="M84 40 q12 -2 10 10 q-1 6 -9 6" fill="none" strokeWidth="6" />
      <path d="M84 40 q12 -2 10 10 q-1 6 -9 6" fill="none" stroke="#fdf3e6" strokeWidth="2" />
      <circle cx="50" cy="52" r="29" fill="#fff8ef" />
      <circle cx="50" cy="52" r="23" fill="#9a5d36" />
      {/* latte art cat */}
      <path d="M36 58 q-1 -14 4 -20 l3 -7 l5 7 h4 l5 -7 l3 7 q5 6 4 20 q-14 8 -28 0z" fill="#fff4e4" stroke="none" />
      <circle cx="44.5" cy="51" r="2" fill="#9a5d36" stroke="none" />
      <circle cx="55.5" cy="51" r="2" fill="#9a5d36" stroke="none" />
      <path d="M48 56 l2 2 l2 -2z" fill="#e88c8c" stroke="none" />
      <path d="M36 32 q-6 6 -5 14" stroke="#fff" strokeWidth="3" opacity="0.6" fill="none" />
    </>
  ),
  6: () => (
    <>
      <Shadow w={26} />
      <path d="M70 46 q14 0 13 13 q-1 12 -14 11" fill="none" strokeWidth="6" />
      <path d="M70 46 q14 0 13 13 q-1 12 -14 11" fill="none" stroke="#e9dccd" strokeWidth="2" />
      <path d="M28 42 h44 l-4 38 q-1 8 -9 8 h-18 q-8 0 -9 -8z" fill="#7b4426" />
      <path d="M30 48 h40" stroke="#c98a52" strokeWidth="3" fill="none" opacity="0.8" />
      <path d="M26 42 q-4 -8 6 -11 q-1 -11 12 -11 q6 -9 14 -2 q12 -2 12 10 q10 3 4 14z" fill="#fffaf2" />
      <path d="M36 30 q8 4 14 -2 q6 6 14 2 M40 37 q10 5 22 0" fill="none" stroke="#7b4426" strokeWidth="3" />
      <circle cx="56" cy="16" r="5" fill="#e34f4f" />
      <path d="M57 11 q2 -6 7 -7" fill="none" strokeWidth="2.4" />
      <circle cx="54.5" cy="14.5" r="1.4" {...HL} />
      <path d="M34 54 v24" stroke="#fff" strokeWidth="3" opacity="0.35" fill="none" />
    </>
  ),
  7: () => (
    <>
      <Shadow w={22} />
      <path d="M57 4 l-6 40" stroke={O} strokeWidth="7" fill="none" />
      <path d="M57 4 l-6 40" stroke="#f27ea0" strokeWidth="3.5" fill="none" strokeDasharray="4 4" />
      <path d="M30 40 h40 l-5 46 q-1 4 -5 4 h-20 q-4 0 -5 -4z" fill="#ead8c0" />
      <path d="M31.5 52 q9 5 18 0 q9 -5 18 0 M33 66 q8 5 16 0 q8 -5 16 0" fill="none" stroke="#c97a2b" strokeWidth="3" />
      <path d="M36 44 l3 40" stroke="#fff" strokeWidth="3" opacity="0.7" fill="none" />
      <path d="M27 40 q-3 -8 8 -9 q2 -10 15 -9 q13 -1 15 9 q11 1 8 9z" fill="#fffaf2" />
      <path d="M33 33 q6 4 10 0 q6 5 12 0 q5 4 10 0" fill="none" stroke="#c97a2b" strokeWidth="2.6" />
      <rect x="27" y="38" width="46" height="6" rx="3" fill="#fffaf2" />
    </>
  ),
  8: () => (
    <>
      <Shadow w={40} y={88} />
      <ellipse cx="50" cy="78" rx="44" ry="13" fill="#c98a52" />
      <ellipse cx="50" cy="76" rx="38" ry="9" fill="#e0a46a" stroke="none" />
      {/* tuxedo cat mug */}
      <path d="M58 46 q12 0 11 11 q-1 10 -12 9" fill="none" strokeWidth="6" />
      <path d="M58 46 q12 0 11 11 q-1 10 -12 9" fill="none" stroke="#2f2a2b" strokeWidth="2" />
      <path d="M22 30 l4 -12 l8 9 h14 l8 -9 l4 12 v36 q0 10 -10 10 h-18 q-10 0 -10 -10z" fill="#2f2a2b" />
      <path d="M30 50 q11 -8 22 0 q4 12 -2 22 h-18 q-6 -10 -2 -22z" fill="#fffaf2" stroke="none" />
      <circle cx="33" cy="44" r="3" fill="#9ccc65" stroke="none" />
      <circle cx="51" cy="44" r="3" fill="#9ccc65" stroke="none" />
      <circle cx="33.6" cy="43.2" r="1" fill="#fff" stroke="none" />
      <circle cx="51.6" cy="43.2" r="1" fill="#fff" stroke="none" />
      <path d="M40 52 l2 2 l2 -2z" fill="#f2a0a0" stroke="none" />
      <ellipse cx="42" cy="30" rx="16" ry="3.5" fill="#6e3f25" />
      {/* cookie */}
      <circle cx="78" cy="70" r="11" fill="#e0a050" />
      <circle cx="74" cy="67" r="2" fill="#5a2f19" stroke="none" />
      <circle cx="81" cy="72" r="2" fill="#5a2f19" stroke="none" />
      <circle cx="79" cy="64" r="1.6" fill="#5a2f19" stroke="none" />
      <path d="M44 22 q-4 -6 0 -11 M50 22 q-4 -6 0 -11" fill="none" stroke="#fff" strokeWidth="3" opacity="0.85" />
      <Sparkle x={86} y={26} s={1.1} c="#ffd23f" />
    </>
  ),
};

// ------------------------------------------------------------------- BREAD
const bread = {
  1: () => (
    <>
      <Shadow w={28} />
      <ellipse cx="74" cy="86" rx="10" ry="3" fill="#fff" stroke="none" />
      <path d="M28 36 q-6 26 -2 46 q24 8 48 0 q4 -20 -2 -46 q-22 -6 -44 0z" fill="#f1dcb5" />
      <path d="M28 36 q22 6 44 0 l-4 -10 q-18 6 -36 0z" fill="#e5c690" />
      <path d="M38 26 q-2 -10 4 -12 q8 4 16 0 q6 2 4 12" fill="#f1dcb5" />
      <path d="M44 26 q6 -4 12 0" fill="none" stroke="#c4914d" strokeWidth="3" />
      <rect x="35" y="48" width="30" height="22" rx="5" fill="#fffaf2" />
      <path d="M50 66 v-14 M50 56 l-5 -4 M50 56 l5 -4 M50 61 l-5 -4 M50 61 l5 -4" fill="none" stroke="#d99a4e" strokeWidth="2.4" />
      <path d="M31 44 q-3 18 0 32" stroke="#fff" strokeWidth="3" opacity="0.6" fill="none" />
    </>
  ),
  2: () => (
    <>
      <Shadow w={34} />
      <path d="M16 74 q-6 -24 18 -34 q16 -10 32 -2 q24 6 20 30 q-2 12 -34 12 q-32 0 -36 -6z" fill="#f8e6c6" />
      <path d="M28 54 q12 -8 26 -2 M46 66 q12 -6 22 0" fill="none" stroke="#e2c08c" strokeWidth="3" />
      <ellipse cx="38" cy="48" rx="8" ry="4" {...HL} />
      <g fill="#fff" stroke="none" opacity="0.9">
        <circle cx="60" cy="44" r="1.6" />
        <circle cx="66" cy="50" r="1.2" />
        <circle cx="30" cy="66" r="1.4" />
        <circle cx="72" cy="62" r="1.3" />
      </g>
    </>
  ),
  3: () => (
    <>
      <Shadow w={34} />
      <path d="M14 70 q0 -38 36 -38 q36 0 36 38 q0 10 -36 10 q-36 0 -36 -10z" fill="#df9a45" />
      <path d="M14 70 q0 10 36 10 q36 0 36 -10 q-2 6 -36 6 q-34 0 -36 -6z" fill="#b8722b" />
      <path d="M36 44 q14 10 28 0 M30 56 q20 12 40 0" fill="none" stroke="#9c5a20" strokeWidth="3" />
      <ellipse cx="34" cy="46" rx="9" ry="5" {...HL} transform="rotate(-25 34 46)" />
      <g fill="#fff3d8" stroke="none">
        <ellipse cx="50" cy="40" rx="1.6" ry="2.6" />
        <ellipse cx="58" cy="48" rx="1.6" ry="2.6" transform="rotate(30 58 48)" />
        <ellipse cx="44" cy="51" rx="1.6" ry="2.6" transform="rotate(-30 44 51)" />
        <ellipse cx="66" cy="60" rx="1.6" ry="2.6" />
      </g>
    </>
  ),
  4: () => (
    <>
      <Shadow w={38} />
      <path d="M8 66 q4 -16 18 -18 l6 22 q-14 6 -24 -4z" fill="#e7a24f" />
      <path d="M92 66 q-4 -16 -18 -18 l-6 22 q14 6 24 -4z" fill="#e7a24f" />
      <path d="M24 48 q8 -14 20 -16 l6 40 q-12 4 -20 -2z" fill="#eaa955" />
      <path d="M76 48 q-8 -14 -20 -16 l-6 40 q12 4 20 -2z" fill="#eaa955" />
      <path d="M40 34 q10 -6 20 0 l-2 40 q-8 3 -16 0z" fill="#f0b765" />
      <path d="M44 40 q6 -3 12 0" fill="none" stroke="#fff" strokeWidth="3" opacity="0.7" />
      <path d="M28 52 q4 -6 10 -9 M64 46 q4 2 8 6" fill="none" stroke="#fff" strokeWidth="2.6" opacity="0.6" />
    </>
  ),
  5: () => (
    <>
      <Shadow w={34} />
      <path d="M20 40 l2 -24 l18 12 q10 -3 20 0 l18 -12 l2 24 q10 14 2 30 q-12 16 -32 16 q-20 0 -32 -16 q-8 -16 2 -30z" fill="#e39a48" />
      <path d="M26 24 l10 8 l-8 4z M74 24 l-10 8 l8 4z" fill="#f6c58a" stroke="none" />
      <path d="M22 70 q12 16 28 16 q16 0 28 -16" fill="none" stroke="#b8722b" strokeWidth="4" opacity="0.6" />
      <ellipse cx="38" cy="54" rx="4.5" ry="5.5" fill="#4a2716" stroke="none" />
      <ellipse cx="62" cy="54" rx="4.5" ry="5.5" fill="#4a2716" stroke="none" />
      <circle cx="39.4" cy="52.4" r="1.6" fill="#fff" stroke="none" />
      <circle cx="63.4" cy="52.4" r="1.6" fill="#fff" stroke="none" />
      <path d="M47 62 h6 l-3 3z" fill="#4a2716" stroke="none" />
      <path d="M50 65 q-3 4 -7 2 M50 65 q3 4 7 2" fill="none" stroke="#4a2716" strokeWidth="2" />
      <path d="M30 62 h-12 M30 66 l-11 3 M70 62 h12 M70 66 l11 3" fill="none" stroke="#4a2716" strokeWidth="1.8" />
      <ellipse cx="32" cy="42" rx="8" ry="4" {...HL} transform="rotate(-30 32 42)" />
      <circle cx="30" cy="62" r="4" fill="#f27e7e" stroke="none" opacity="0.45" />
      <circle cx="70" cy="62" r="4" fill="#f27e7e" stroke="none" opacity="0.45" />
    </>
  ),
  6: () => (
    <>
      <Shadow w={40} />
      <path d="M30 34 l26 -26 q6 -3 8 3 l-22 30z" fill="#e6a650" />
      <path d="M36 32 l4 3 M44 24 l4 3 M52 16 l4 3" fill="none" stroke="#b8722b" strokeWidth="2.4" />
      <path d="M50 46 q2 -18 18 -18 q16 0 18 18z" fill="#df9a45" />
      <path d="M16 46 q2 -14 14 -14 q12 0 14 14z" fill="#f0b765" />
      <path d="M10 46 h80 l-8 34 q-2 8 -10 8 h-44 q-8 0 -10 -8z" fill="#c98a52" />
      <path d="M14 58 h72 M16 70 h68" fill="none" stroke="#9c6136" strokeWidth="3" />
      <path d="M22 46 v40 M36 46 v42 M50 46 v42 M64 46 v42 M78 46 v40" fill="none" stroke="#9c6136" strokeWidth="2" opacity="0.6" />
      <path d="M8 46 h84 l-4 -6 l-12 8 l-12 -8 l-12 8 l-12 -8 l-12 8 l-12 -8z" fill="#e34f4f" />
      <path d="M20 40 l12 8 l12 -8 M56 40 l12 8 l12 -8" fill="none" stroke="#fff" strokeWidth="2" opacity="0.8" />
    </>
  ),
};

// -------------------------------------------------------------------- CAKE
const cake = {
  1: () => (
    <>
      <Shadow w={24} />
      <path d="M50 88 q-30 -14 -28 -40 q2 -14 28 -14 q26 0 28 14 q2 26 -28 40z" fill="#e8394b" />
      <path d="M34 42 q-6 16 4 30" fill="none" stroke="#fff" strokeWidth="3.5" opacity="0.55" />
      <g fill="#ffe08a" stroke="none">
        <ellipse cx="42" cy="48" rx="1.4" ry="2.2" />
        <ellipse cx="56" cy="46" rx="1.4" ry="2.2" />
        <ellipse cx="50" cy="58" rx="1.4" ry="2.2" />
        <ellipse cx="62" cy="58" rx="1.4" ry="2.2" />
        <ellipse cx="40" cy="62" rx="1.4" ry="2.2" />
        <ellipse cx="54" cy="70" rx="1.4" ry="2.2" />
        <ellipse cx="46" cy="76" rx="1.4" ry="2.2" />
      </g>
      <path d="M50 36 l-16 -6 l10 -4 l-4 -10 l10 7 l10 -7 l-4 10 l10 4z" fill="#5fae4a" />
      <path d="M50 26 q2 -10 8 -14" fill="none" strokeWidth="3" />
    </>
  ),
  2: () => (
    <>
      <Shadow w={26} />
      <path d="M26 54 h48 l-7 30 q-1 4 -5 4 h-24 q-4 0 -5 -4z" fill="#fff" />
      <path d="M34 54 l3 34 M44 54 l1 34 M56 54 l-1 34 M66 54 l-3 34" fill="none" stroke="#f27ea0" strokeWidth="4" />
      <path d="M26 54 h48 l-7 30 q-1 4 -5 4 h-24 q-4 0 -5 -4z" fill="none" />
      <path d="M22 54 q-6 -10 6 -14 q-2 -12 12 -12 q4 -12 20 -6 q14 0 10 14 q12 4 8 18z" fill="#ffb3c9" />
      <path d="M30 42 q10 6 22 0 M38 30 q8 4 16 -2" fill="none" stroke="#f27ea0" strokeWidth="3" />
      <ellipse cx="34" cy="38" rx="5" ry="3" {...HL} />
      <circle cx="54" cy="14" r="7" fill="#e34f4f" />
      <circle cx="51.5" cy="11.5" r="2" {...HL} />
      <path d="M55 7 q4 -6 10 -5" fill="none" strokeWidth="2.4" />
      <g stroke="none">
        <rect x="40" y="44" width="5" height="2" rx="1" fill="#6fbfa8" transform="rotate(30 42 45)" />
        <rect x="58" y="40" width="5" height="2" rx="1" fill="#ffd23f" transform="rotate(-30 60 41)" />
        <rect x="48" y="48" width="5" height="2" rx="1" fill="#9b7bea" />
      </g>
    </>
  ),
  3: () => (
    <>
      <Shadow w={36} />
      <ellipse cx="50" cy="56" rx="38" ry="30" fill="#e0a050" />
      <path d="M14 52 q2 -26 36 -26 q34 0 36 26 q-4 8 -10 4 q-6 8 -12 2 q-6 8 -14 2 q-8 6 -14 -2 q-6 6 -12 -2 q-6 4 -10 -4z" fill="#ff9ab8" />
      <ellipse cx="50" cy="52" rx="11" ry="7" fill="#fdf3e6" />
      <ellipse cx="50" cy="52" rx="11" ry="7" fill="none" />
      <g stroke="none">
        <rect x="26" y="38" width="7" height="2.6" rx="1.3" fill="#fff" transform="rotate(-20 29 39)" />
        <rect x="64" y="36" width="7" height="2.6" rx="1.3" fill="#6fbfa8" transform="rotate(25 67 37)" />
        <rect x="40" y="34" width="7" height="2.6" rx="1.3" fill="#ffd23f" transform="rotate(10 43 35)" />
        <rect x="70" y="50" width="7" height="2.6" rx="1.3" fill="#9b7bea" transform="rotate(-40 73 51)" />
        <rect x="22" y="50" width="7" height="2.6" rx="1.3" fill="#4f8fc0" transform="rotate(50 25 51)" />
        <rect x="56" y="64" width="7" height="2.6" rx="1.3" fill="#fff" transform="rotate(-15 59 65)" />
        <rect x="34" y="62" width="7" height="2.6" rx="1.3" fill="#ffd23f" transform="rotate(30 37 63)" />
      </g>
      <ellipse cx="30" cy="34" rx="7" ry="3.5" {...HL} transform="rotate(-25 30 34)" />
    </>
  ),
  4: () => (
    <>
      <Shadow w={36} />
      <path d="M14 56 l58 -24 l16 18 v24 l-74 12z" fill="#fff4dc" />
      <path d="M14 56 l74 -6 v24 l-74 12z" fill="#f7d58d" />
      <path d="M14 68 l74 -6" fill="none" stroke="#fff" strokeWidth="5" />
      <path d="M14 68 l74 -6" fill="none" stroke="#f6b7c8" strokeWidth="2.5" />
      <path d="M14 56 l74 -6 v24 l-74 12z" fill="none" />
      <path d="M14 56 l58 -24 l16 18z" fill="#ffb3c9" />
      <path d="M14 56 q4 6 8 0 q4 6 8 0 q4 6 8 -1 q4 6 8 -1 q4 6 8 -1 q4 6 8 -1 q4 6 8 -1 q4 6 8 -1 q4 6 8 -1" fill="#ffb3c9" />
      <path d="M58 30 q-8 -14 4 -16 q12 2 4 16z" fill="#e8394b" transform="rotate(-15 62 24)" />
      <path d="M60 16 l-4 -4 M60 16 l4 -5" fill="none" stroke="#5fae4a" strokeWidth="3" />
      <ellipse cx="40" cy="44" rx="8" ry="2.5" {...HL} transform="rotate(-22 40 44)" />
    </>
  ),
  5: () => (
    <>
      <Shadow w={40} />
      <ellipse cx="50" cy="82" rx="40" ry="9" fill="#cfe9f2" />
      <path d="M14 46 v30 q0 8 36 8 q36 0 36 -8 v-30z" fill="#fffaf2" />
      <path d="M14 60 q36 10 72 0" fill="none" stroke="#f6b7c8" strokeWidth="4" />
      <ellipse cx="50" cy="46" rx="36" ry="10" fill="#ffb3c9" />
      <path d="M14 46 q0 10 6 10 q4 0 4 -6 q2 10 8 10 q6 0 6 -8 q4 10 12 10 q8 0 10 -10 q2 8 8 8 q6 0 6 -10 q2 6 6 6 q6 0 6 -10" fill="#ffb3c9" />
      {[26, 40, 54, 68].map((x, i) => (
        <g key={i}>
          <path d={`M${x} ${40 - (i % 2) * 4} q-6 -10 3 -12 q9 2 3 12z`} fill="#e8394b" />
          <path d={`M${x + 1} ${28 - (i % 2) * 4} l-3 -3 M${x + 1} ${28 - (i % 2) * 4} l3 -4`} fill="none" stroke="#5fae4a" strokeWidth="2.4" />
        </g>
      ))}
      <path d="M20 64 v12" stroke="#fff" strokeWidth="3.5" opacity="0.8" fill="none" />
    </>
  ),
  6: () => (
    <>
      <Shadow w={40} />
      <path d="M30 88 h40 l-6 -6 h-28z" fill="#cfe9f2" />
      <path d="M16 56 v24 q0 6 34 6 q34 0 34 -6 v-24z" fill="#ffb3c9" />
      <ellipse cx="50" cy="56" rx="34" ry="8" fill="#ffd0dd" />
      <path d="M16 70 q34 8 68 0" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="1 6" />
      <path d="M28 30 v24 q0 5 22 5 q22 0 22 -5 v-24z" fill="#fffaf2" />
      <ellipse cx="50" cy="30" rx="22" ry="6" fill="#fff" />
      <path d="M28 30 q4 8 8 0 q4 8 8 0 q4 8 8 0 q4 8 8 0 q4 8 8 0" fill="#fff" />
      <path d="M28 44 q22 6 44 0" fill="none" stroke="#f6b7c8" strokeWidth="3" />
      <path d="M45 24 q-6 -12 5 -14 q11 2 5 14z" fill="#e8394b" />
      <path d="M50 10 l-3 -4 M50 10 l3 -4" fill="none" stroke="#5fae4a" strokeWidth="2.4" />
      <g stroke="none" fill="#fff">
        <circle cx="24" cy="66" r="2" />
        <circle cx="36" cy="70" r="2" />
        <circle cx="64" cy="70" r="2" />
        <circle cx="76" cy="66" r="2" />
      </g>
      <Sparkle x={82} y={30} s={0.9} c="#ffd23f" />
    </>
  ),
  7: () => (
    <>
      <Shadow w={42} />
      <ellipse cx="50" cy="84" rx="42" ry="8" fill="#cfe9f2" />
      <path d="M12 54 v24 q0 6 38 6 q38 0 38 -6 v-24z" fill="#9b7bea" />
      <ellipse cx="50" cy="54" rx="38" ry="8" fill="#b9a2f2" />
      <path d="M12 66 q38 8 76 0" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="2 6" />
      <path d="M24 26 l4 -10 l10 8 h24 l10 -8 l4 10 v26 q0 6 -26 6 q-26 0 -26 -6z" fill="#fffaf2" />
      <path d="M28 18 l6 6 l-6 2z M72 18 l-6 6 l6 2z" fill="#ffb3c9" stroke="none" />
      <ellipse cx="40" cy="38" rx="3" ry="3.6" fill="#4a2716" stroke="none" />
      <ellipse cx="60" cy="38" rx="3" ry="3.6" fill="#4a2716" stroke="none" />
      <path d="M48 44 h4 l-2 2z" fill="#f27ea0" stroke="none" />
      <path d="M50 46 q-3 3 -6 1 M50 46 q3 3 6 1" fill="none" stroke="#4a2716" strokeWidth="1.8" />
      <circle cx="33" cy="45" r="3.4" fill="#f27e7e" opacity="0.4" stroke="none" />
      <circle cx="67" cy="45" r="3.4" fill="#f27e7e" opacity="0.4" stroke="none" />
      {/* crown */}
      <path d="M36 14 l4 -10 l6 7 l4 -9 l4 9 l6 -7 l4 10z" fill="#ffd23f" />
      <circle cx="50" cy="10" r="2" fill="#e8394b" stroke="none" />
      <Sparkle x={16} y={36} s={1} c="#ffd23f" />
      <Sparkle x={86} y={28} s={0.8} c="#fff" />
    </>
  ),
};

// --------------------------------------------------------------------- TEA
const tea = {
  1: () => (
    <>
      <Shadow w={26} />
      <path d="M50 88 q2 -30 -6 -58" fill="none" strokeWidth="4" stroke="#6b4a2b" />
      <path d="M48 46 q-30 -6 -30 -28 q24 0 30 28z" fill="#7cc05a" />
      <path d="M48 46 q-14 -14 -24 -24" fill="none" strokeWidth="2.4" stroke="#4d8a35" />
      <path d="M50 60 q30 -2 34 -26 q-26 -2 -34 26z" fill="#5fae4a" />
      <path d="M50 60 q14 -12 28 -22" fill="none" strokeWidth="2.4" stroke="#3f7f2e" />
      <path d="M44 32 q-4 -16 6 -26 q8 12 -6 26z" fill="#9fd77a" />
      <ellipse cx="30" cy="26" rx="5" ry="2.4" {...HL} transform="rotate(30 30 26)" />
    </>
  ),
  2: () => (
    <>
      <Shadow w={36} />
      <ellipse cx="50" cy="80" rx="38" ry="9" fill="#fff" />
      <ellipse cx="50" cy="79" rx="26" ry="5" fill="#cfe9f2" stroke="none" />
      <path d="M76 50 q14 0 12 12 q-2 10 -16 8" fill="none" strokeWidth="6" />
      <path d="M76 50 q14 0 12 12 q-2 10 -16 8" fill="none" stroke="#fff" strokeWidth="2" />
      <path d="M20 46 h60 q-2 30 -30 32 q-28 -2 -30 -32z" fill="#fff" />
      <ellipse cx="50" cy="46" rx="30" ry="7" fill="#d98a33" />
      <ellipse cx="42" cy="45" rx="10" ry="2" fill="#f2b45e" stroke="none" />
      <g stroke="none">
        <circle cx="34" cy="60" r="3.4" fill="#f27ea0" />
        <circle cx="50" cy="66" r="3.4" fill="#9b7bea" />
        <circle cx="66" cy="60" r="3.4" fill="#f27ea0" />
        <circle cx="42" cy="58" r="1.6" fill="#7cc05a" />
        <circle cx="58" cy="58" r="1.6" fill="#7cc05a" />
      </g>
      <Steam x={52} y={34} />
    </>
  ),
  3: () => (
    <>
      <Shadow w={24} />
      <path d="M58 6 l-8 44" stroke={O} strokeWidth="6" fill="none" />
      <path d="M58 6 l-8 44" stroke="#6fbfa8" strokeWidth="2.6" fill="none" />
      <path d="M28 30 h44 l-6 54 q-1 4 -5 4 h-22 q-4 0 -5 -4z" fill="#ecf5f6" />
      <path d="M30 42 h40 l-4.6 42 q-1 4 -5 4 h-20.8 q-4 0 -5 -4z" fill="#d7a978" stroke="none" />
      <path d="M30 42 q10 6 20 0 q10 -6 20 0" fill="#f3dfc4" stroke="none" />
      <rect x="36" y="46" width="12" height="12" rx="3" fill="#fff" opacity="0.7" transform="rotate(12 42 52)" />
      <rect x="52" y="52" width="11" height="11" rx="3" fill="#fff" opacity="0.7" transform="rotate(-10 57 57)" />
      <path d="M28 30 h44 l-6 54 q-1 4 -5 4 h-22 q-4 0 -5 -4z" fill="none" />
      <path d="M34 36 l4 46" stroke="#fff" strokeWidth="3" opacity="0.8" fill="none" />
    </>
  ),
  4: () => (
    <>
      <Shadow w={24} />
      <path d="M54 2 l-4 40" stroke={O} strokeWidth="10" fill="none" />
      <path d="M54 2 l-4 40" stroke="#f27ea0" strokeWidth="6" fill="none" />
      <path d="M28 34 h44 l-6 50 q-1 4 -5 4 h-22 q-4 0 -5 -4z" fill="#e4c39b" />
      <g fill="#3a2a25" stroke="none">
        {[[38, 80], [46, 82], [54, 82], [62, 80], [42, 74], [50, 76], [58, 74], [36, 72], [64, 72], [47, 69], [55, 69]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.4" />
        ))}
      </g>
      <g fill="#fff" stroke="none" opacity="0.5">
        <circle cx="45" cy="73" r="1" />
        <circle cx="53" cy="75" r="1" />
        <circle cx="37" cy="79" r="1" />
      </g>
      <path d="M28 34 h44 l-6 50 q-1 4 -5 4 h-22 q-4 0 -5 -4z" fill="none" />
      <path d="M24 34 q0 -16 26 -16 q26 0 26 16z" fill="#f4fbfc" opacity="0.9" />
      <rect x="24" y="32" width="52" height="6" rx="3" fill="#f4fbfc" />
      <path d="M33 42 l4 36" stroke="#fff" strokeWidth="3" opacity="0.8" fill="none" />
      <Paw x={50} y={54} s={0.9} c="#fff" />
    </>
  ),
  5: () => (
    <>
      <Shadow w={30} />
      <path d="M72 46 q14 0 13 13 q-1 12 -14 11" fill="none" strokeWidth="6" />
      <path d="M72 46 q14 0 13 13 q-1 12 -14 11" fill="none" stroke="#fdf3e6" strokeWidth="2" />
      <path d="M22 42 h56 l-4 34 q-2 12 -14 12 h-20 q-12 0 -14 -12z" fill="#fdf3e6" />
      <ellipse cx="50" cy="42" rx="28" ry="9" fill="#8cc06a" />
      <path d="M50 48 q-12 -3 -12 -8 q8 -2 12 8 q4 -10 12 -8 q0 5 -12 8z M50 48 v-12" fill="#f7fbe9" stroke="#f7fbe9" strokeWidth="1.6" />
      <path d="M28 52 q2 18 10 26" stroke="#fff" strokeWidth="3" opacity="0.7" fill="none" />
      <rect x="40" y="60" width="20" height="10" rx="5" fill="#8cc06a" />
      <Steam x={50} y={30} />
    </>
  ),
  6: () => (
    <>
      <Shadow w={42} />
      {/* teapot */}
      <path d="M14 52 q-12 -8 -8 -18 l6 2 q-2 8 8 12z" fill="#9fd3e6" />
      <path d="M62 48 q14 -4 12 12 q-2 12 -14 10" fill="none" strokeWidth="6" />
      <path d="M62 48 q14 -4 12 12 q-2 12 -14 10" fill="none" stroke="#9fd3e6" strokeWidth="2" />
      <path d="M14 56 q0 -24 26 -24 q26 0 26 24 q0 22 -26 22 q-26 0 -26 -22z" fill="#9fd3e6" />
      <path d="M22 34 q18 -8 36 0" fill="#7fbcd2" />
      <ellipse cx="40" cy="32" rx="16" ry="4" fill="#7fbcd2" />
      <circle cx="40" cy="24" r="4.5" fill="#ffd23f" />
      <g stroke="none">
        <circle cx="30" cy="56" r="4" fill="#f27ea0" />
        <circle cx="40" cy="62" r="4" fill="#fff" />
        <circle cx="50" cy="56" r="4" fill="#f27ea0" />
        <circle cx="35" cy="66" r="1.8" fill="#7cc05a" />
        <circle cx="46" cy="50" r="1.8" fill="#7cc05a" />
      </g>
      <path d="M20 48 q-2 10 2 18" stroke="#fff" strokeWidth="3" opacity="0.7" fill="none" />
      {/* cup */}
      <ellipse cx="78" cy="84" rx="18" ry="5" fill="#fff" />
      <path d="M64 70 h28 q-2 14 -14 14 q-12 0 -14 -14z" fill="#fff" />
      <ellipse cx="78" cy="70" rx="14" ry="4" fill="#d98a33" />
      <circle cx="78" cy="78" r="2.4" fill="#f27ea0" stroke="none" />
    </>
  ),
};

// ------------------------------------------------------------------- TREAT
const Fish = ({ x, y, s = 1, c = '#7fb6dd', c2 = '#5a95c4', r = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
    <path d="M14 0 l12 -10 q-2 10 0 20z" fill={c2} />
    <path d="M-24 0 q16 -18 40 0 q-24 18 -40 0z" fill={c} />
    <path d="M-6 -11 q6 -8 12 -2z" fill={c2} />
    <path d="M-2 -4 q4 4 0 8 M4 -4 q4 4 0 8" fill="none" strokeWidth="1.6" opacity="0.5" />
    <circle cx="-14" cy="-2" r="2.6" fill="#fff" />
    <circle cx="-14" cy="-2" r="1.2" fill={O} stroke="none" />
    <path d="M-20 -4 q8 -6 16 -4" stroke="#fff" strokeWidth="2" opacity="0.6" fill="none" />
  </g>
);
const treat = {
  1: () => (
    <>
      <Shadow w={30} />
      <Fish x={44} y={36} s={0.62} c="#c9d6df" c2="#9aaab6" r={-12} />
      <Fish x={58} y={56} s={0.62} c="#c9d6df" c2="#9aaab6" r={8} />
      <Fish x={40} y={74} s={0.62} c="#c9d6df" c2="#9aaab6" r={-4} />
    </>
  ),
  2: () => (
    <>
      <Shadow w={38} />
      <Fish x={50} y={54} s={1.5} r={-8} />
    </>
  ),
  3: () => (
    <>
      <Shadow w={34} />
      <path d="M18 34 v38 q0 10 32 10 q32 0 32 -10 v-38z" fill="#c8d2db" />
      <path d="M18 44 q32 10 64 0 v22 q-32 10 -64 0z" fill="#4f8fc0" />
      <Fish x={50} y={56} s={0.8} c="#ffd08a" c2="#f0a64a" />
      <ellipse cx="50" cy="34" rx="32" ry="9" fill="#e4eaef" />
      <ellipse cx="50" cy="34" rx="24" ry="5.5" fill="none" strokeWidth="2.4" opacity="0.6" />
      <path d="M58 30 q8 -6 14 0 q-6 6 -14 0z" fill="#c8d2db" />
      <path d="M24 46 v24" stroke="#fff" strokeWidth="3" opacity="0.6" fill="none" />
    </>
  ),
  4: () => (
    <>
      <Shadow w={36} />
      <path d="M16 62 q0 -14 14 -14 h40 q14 0 14 14 v6 q0 12 -14 12 h-40 q-14 0 -14 -12z" fill="#fffaf2" />
      <g fill="#fff" stroke="none" opacity="0.9">
        <ellipse cx="26" cy="70" rx="2.4" ry="1.4" />
        <ellipse cx="40" cy="74" rx="2.4" ry="1.4" />
        <ellipse cx="58" cy="72" rx="2.4" ry="1.4" />
        <ellipse cx="72" cy="70" rx="2.4" ry="1.4" />
      </g>
      <path d="M12 52 q2 -18 22 -22 h34 q22 2 22 20 q-2 8 -10 6 l-58 2 q-10 2 -10 -6z" fill="#ff8a5c" />
      <path d="M24 42 l10 12 M38 36 l10 16 M54 34 l10 18 M70 36 l8 14" fill="none" stroke="#fff" strokeWidth="3.2" opacity="0.75" />
      <rect x="44" y="40" width="12" height="40" rx="2" fill="#2f4a35" />
      <path d="M47 44 v32" stroke="#4e7a5a" strokeWidth="2" opacity="0.8" fill="none" />
    </>
  ),
  5: () => (
    <>
      <Shadow w={36} />
      <path d="M50 14 q6 0 10 6 l26 50 q4 12 -10 14 h-52 q-14 -2 -10 -14 l26 -50 q4 -6 10 -6z" fill="#fffaf2" />
      <path d="M30 32 l-4 -14 l12 8z M70 32 l4 -14 l-12 8z" fill="#fffaf2" />
      <path d="M28 22 l2 6 l4 -2z M72 22 l-2 6 l-4 -2z" fill="#ffb3c9" stroke="none" />
      <rect x="28" y="62" width="44" height="22" rx="3" fill="#2f4a35" />
      <path d="M32 66 h36" stroke="#4e7a5a" strokeWidth="2" fill="none" opacity="0.8" />
      <ellipse cx="42" cy="44" rx="2.8" ry="3.4" fill="#4a2716" stroke="none" />
      <ellipse cx="58" cy="44" rx="2.8" ry="3.4" fill="#4a2716" stroke="none" />
      <path d="M48 50 h4 l-2 2z" fill="#f27ea0" stroke="none" />
      <circle cx="36" cy="51" r="3" fill="#f27e7e" opacity="0.45" stroke="none" />
      <circle cx="64" cy="51" r="3" fill="#f27e7e" opacity="0.45" stroke="none" />
      <path d="M40 24 q-4 6 -6 14" stroke="#fff" strokeWidth="3" opacity="0.8" fill="none" />
    </>
  ),
  6: () => (
    <>
      <Shadow w={42} />
      <rect x="8" y="30" width="84" height="56" rx="10" fill="#e34f4f" />
      <rect x="14" y="36" width="72" height="44" rx="6" fill="#2f2a2b" />
      <rect x="16" y="38" width="36" height="40" rx="4" fill="#fffaf2" />
      {/* rice cat */}
      <path d="M22 56 l2 -10 l6 6 h8 l6 -6 l2 10 q2 14 -12 16 q-14 -2 -12 -16z" fill="#fff" stroke={O} strokeWidth="2.4" />
      <circle cx="30" cy="58" r="1.6" fill={O} stroke="none" />
      <circle cx="38" cy="58" r="1.6" fill={O} stroke="none" />
      <path d="M33 62 h2 l-1 1z" fill="#f27ea0" stroke="none" />
      <rect x="54" y="38" width="30" height="18" rx="4" fill="#fbe38a" />
      <path d="M60 38 v18 M68 38 v18 M76 38 v18" stroke="#e8b84a" strokeWidth="2" fill="none" />
      <rect x="54" y="58" width="30" height="20" rx="4" fill="#ff8a5c" />
      <circle cx="62" cy="66" r="5" fill="#5fae4a" />
      <circle cx="72" cy="70" r="5" fill="#7cc05a" />
      <circle cx="78" cy="63" r="3" fill="#e8394b" />
      <path d="M8 40 q2 -10 10 -10" stroke="#fff" strokeWidth="3" opacity="0.6" fill="none" />
    </>
  ),
};

// -------------------------------------------------------------- GENERATORS
const LV = {
  1: { trim: '#c98a52', glow: null },
  2: { trim: '#b8c4cf', glow: null },
  3: { trim: '#ffd23f', glow: '#fff3b0' },
};

const gens = {
  gencoffee: (lv) => (
    <>
      <Shadow w={38} />
      <rect x="16" y="14" width="68" height="18" rx="8" fill={lv === 3 ? '#ffd23f' : '#f27ea0'} />
      <rect x="20" y="28" width="60" height="58" rx="8" fill={lv === 2 ? '#8fb7d9' : '#8fd3c0'} />
      <rect x="26" y="36" width="48" height="10" rx="4" fill={LV[lv].trim} />
      <circle cx="68" cy="22" r="6" fill="#fffaf2" />
      <path d="M68 22 l3 -3" stroke={O} strokeWidth="2" />
      <rect x="40" y="46" width="20" height="8" rx="2" fill="#5b5b66" />
      <rect x="28" y="56" width="44" height="26" rx="5" fill="#3d4a52" />
      <path d="M40 60 h20 l-2 14 q-1 4 -8 4 q-7 0 -8 -4z" fill="#fffaf2" />
      <ellipse cx="50" cy="60" rx="10" ry="2.4" fill="#6e3f25" />
      <path d="M46 54 v4 M54 54 v4" stroke="#6e3f25" strokeWidth="2" />
      <rect x="24" y="84" width="52" height="5" rx="2.5" fill={LV[lv].trim} />
      <path d="M26 34 v44" stroke="#fff" strokeWidth="3.5" opacity="0.5" fill="none" />
      <Paw x={34} y={23} s={0.7} c="#fff" />
    </>
  ),
  genbread: (lv) => (
    <>
      <Shadow w={40} />
      <rect x="12" y="20" width="76" height="66" rx="12" fill={lv === 2 ? '#ffd0dd' : lv === 3 ? '#fff0c2' : '#f6e3c8'} />
      <rect x="12" y="20" width="76" height="16" rx="8" fill={lv === 2 ? '#f27ea0' : '#e34f4f'} />
      <circle cx="26" cy="28" r="4" fill="#fffaf2" />
      <circle cx="40" cy="28" r="4" fill="#fffaf2" />
      <rect x="54" y="25" width="26" height="6" rx="3" fill={LV[lv].trim} />
      <rect x="20" y="42" width="60" height="36" rx="8" fill="#5b3a29" />
      <rect x="24" y="46" width="52" height="28" rx="6" fill="#ffb347" />
      <rect x="24" y="46" width="52" height="28" rx="6" fill="#ffe08a" opacity="0.5" stroke="none" />
      <path d="M32 66 q0 -12 12 -12 q12 0 12 12z" fill="#df9a45" />
      <path d="M52 66 q0 -10 10 -10 q10 0 10 10z" fill="#e7a24f" />
      <path d="M28 50 l8 0" stroke="#fff" strokeWidth="3" opacity="0.7" />
      <rect x="18" y="86" width="12" height="4" rx="2" fill={O} />
      <rect x="70" y="86" width="12" height="4" rx="2" fill={O} />
    </>
  ),
  gencake: (lv) => (
    <>
      <Shadow w={38} />
      <path d="M38 88 h24 l-4 -10 h-16z" fill={LV[lv].trim} />
      <ellipse cx="50" cy="78" rx="34" ry="6" fill={LV[lv].trim} />
      <path d="M30 70 v-14 q0 -4 20 -4 q20 0 20 4 v14 q0 4 -20 4 q-20 0 -20 -4z" fill="#ffb3c9" />
      <ellipse cx="50" cy="56" rx="20" ry="4" fill="#fffaf2" />
      <path d="M44 52 q-6 -10 4 -12 q10 2 4 12z" fill="#e8394b" />
      <path d="M18 76 q-4 -58 32 -60 q36 2 32 60" fill="#dff4fb" opacity="0.55" />
      <path d="M18 76 q-4 -58 32 -60 q36 2 32 60" fill="none" />
      <circle cx="50" cy="13" r="5" fill={LV[lv].trim} />
      <path d="M28 64 q-2 -28 12 -38" stroke="#fff" strokeWidth="4" opacity="0.8" fill="none" />
    </>
  ),
  gentea: (lv) => (
    <>
      <Shadow w={40} />
      <path d="M18 54 q-14 -10 -10 -24 l7 2 q-2 10 10 16z" fill={lv === 2 ? '#c7b5f2' : '#f6c58a'} />
      <path d="M70 46 q18 -4 16 16 q-2 16 -18 12" fill="none" strokeWidth="7" />
      <path d="M70 46 q18 -4 16 16 q-2 16 -18 12" fill="none" stroke={lv === 2 ? '#c7b5f2' : '#f6c58a'} strokeWidth="2.6" />
      <path d="M16 60 q0 -30 32 -30 q32 0 32 30 q0 28 -32 28 q-32 0 -32 -28z" fill={lv === 2 ? '#c7b5f2' : '#f6c58a'} />
      <path d="M22 32 q26 -12 52 0" fill={LV[lv].trim} />
      <ellipse cx="48" cy="30" rx="20" ry="5" fill={LV[lv].trim} />
      <circle cx="48" cy="20" r="6" fill={LV[lv].trim} />
      <path d="M18 62 q30 10 60 0" fill="none" stroke={LV[lv].trim} strokeWidth="4" />
      <g stroke="none">
        <circle cx="34" cy="50" r="4" fill="#fff" />
        <circle cx="48" cy="46" r="4" fill="#f27ea0" />
        <circle cx="62" cy="50" r="4" fill="#fff" />
      </g>
      <path d="M24 52 q-2 12 4 22" stroke="#fff" strokeWidth="3.5" opacity="0.6" fill="none" />
    </>
  ),
  gentreat: (lv) => (
    <>
      <Shadow w={40} />
      <g transform="rotate(-20 36 30)">
        <path d="M30 40 l-6 -20 q6 -4 12 0 l-6 20z" fill="#5a95c4" />
      </g>
      <g transform="rotate(25 64 28)">
        <path d="M64 40 l-6 -20 q6 -4 12 0 l-6 20z" fill="#ff8a5c" />
      </g>
      <path d="M46 40 l-4 -22 q8 -4 14 0 l-4 22z" fill="#c9d6df" />
      <path d="M10 42 h80 l-8 38 q-2 8 -10 8 h-44 q-8 0 -10 -8z" fill="#d9a36a" />
      <path d="M14 56 h72 M16 70 h68" fill="none" stroke="#a8743f" strokeWidth="3" />
      <path d="M26 42 v44 M42 42 v46 M58 42 v46 M74 42 v44" fill="none" stroke="#a8743f" strokeWidth="2" opacity="0.7" />
      <rect x="6" y="36" width="88" height="10" rx="5" fill={LV[lv].trim === '#c98a52' ? '#4f8fc0' : LV[lv].trim} />
      <path d="M20 36 q30 -22 60 0" fill="none" strokeWidth="5" />
      <path d="M20 36 q30 -22 60 0" fill="none" stroke="#d9a36a" strokeWidth="2" />
    </>
  ),
};

// ------------------------------------------------------------------ REWARDS
const Coin = ({ x, y, r = 14 }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill="#ffc531" />
    <circle cx={x} cy={y} r={r * 0.72} fill="#ffd95e" stroke="#e0a21a" strokeWidth="2" />
    <Paw x={x} y={y + 0.5} s={r / 14} c="#e0a21a" />
    <path d={`M${x - r * 0.6} ${y - r * 0.4} q${r * 0.3} ${-r * 0.4} ${r * 0.7} ${-r * 0.5}`} stroke="#fff" strokeWidth="2.5" opacity="0.8" fill="none" />
  </g>
);
const coin = {
  1: () => (
    <>
      <Shadow w={24} />
      <Coin x={50} y={52} r={28} />
    </>
  ),
  2: () => (
    <>
      <Shadow w={34} />
      <ellipse cx="40" cy="78" rx="24" ry="8" fill="#e0a21a" />
      <ellipse cx="40" cy="72" rx="24" ry="8" fill="#ffc531" />
      <ellipse cx="40" cy="64" rx="24" ry="8" fill="#e0a21a" />
      <ellipse cx="40" cy="58" rx="24" ry="8" fill="#ffc531" />
      <Coin x={64} y={58} r={20} />
      <Coin x={36} y={38} r={18} />
    </>
  ),
  3: () => (
    <>
      <Shadow w={34} />
      <path d="M34 30 q-24 16 -18 42 q4 16 34 16 q30 0 34 -16 q6 -26 -18 -42z" fill="#a46a3c" />
      <path d="M34 30 q-6 -10 2 -16 l6 6 l8 -8 l8 8 l6 -6 q8 6 2 16z" fill="#a46a3c" />
      <path d="M32 30 h36" strokeWidth="4" stroke="#e34f4f" fill="none" />
      <Coin x={50} y={62} r={17} />
      <path d="M24 50 q-4 12 0 22" stroke="#fff" strokeWidth="3" opacity="0.4" fill="none" />
    </>
  ),
  4: () => (
    <>
      <Shadow w={42} />
      <path d="M10 48 h80 v32 q0 6 -6 6 h-68 q-6 0 -6 -6z" fill="#a46a3c" />
      <Coin x={30} y={40} r={13} />
      <Coin x={70} y={40} r={13} />
      <Coin x={50} y={34} r={15} />
      <path d="M10 48 h80 l-6 -28 q-34 -10 -68 0z" fill="#a46a3c" opacity="0" />
      <rect x="8" y="46" width="84" height="10" rx="3" fill="#ffc531" />
      <rect x="42" y="56" width="16" height="16" rx="3" fill="#ffc531" />
      <circle cx="50" cy="63" r="3" fill={O} stroke="none" />
      <path d="M16 62 v18 M84 62 v18" stroke="#ffc531" strokeWidth="5" />
      <Sparkle x={84} y={22} s={1.2} c="#fff3b0" />
    </>
  ),
};

const Bolt = ({ x = 50, y = 50, s = 1 }) => (
  <path transform={`translate(${x} ${y}) scale(${s})`} d="M4 -26 l-18 30 h12 l-6 24 l22 -32 h-13z" fill="#ffd23f" />
);
const energy = {
  1: () => (
    <>
      <Shadow w={22} />
      <Bolt x={48} y={50} s={1.4} />
      <path d="M44 22 l-10 18" stroke="#fff" strokeWidth="3" opacity="0.8" />
    </>
  ),
  2: () => (
    <>
      <Shadow w={24} />
      <rect x="40" y="10" width="20" height="12" rx="3" fill="#e34f4f" />
      <path d="M38 22 h24 v8 q14 8 14 24 v26 q0 8 -8 8 h-36 q-8 0 -8 -8 v-26 q0 -16 14 -24z" fill="#bfe8f2" />
      <path d="M26 54 h48 v26 q0 8 -8 8 h-32 q-8 0 -8 -8z" fill="#ffd23f" opacity="0.6" stroke="none" />
      <Bolt x={50} y={62} s={0.75} />
      <path d="M32 44 v32" stroke="#fff" strokeWidth="3.5" opacity="0.7" />
    </>
  ),
  3: () => (
    <>
      <Shadow w={32} />
      <circle cx="50" cy="56" r="40" fill="#fff3b0" opacity="0.5" stroke="none" />
      <rect x="22" y="14" width="56" height="14" rx="5" fill="#9b7bea" />
      <path d="M24 28 h52 v46 q0 12 -12 12 h-28 q-12 0 -12 -12z" fill="#e3f6fb" />
      <path d="M26 46 h48 v28 q0 10 -10 10 h-28 q-10 0 -10 -10z" fill="#ffd23f" stroke="none" opacity="0.8" />
      <Bolt x={50} y={58} s={0.9} />
      <path d="M30 34 v40" stroke="#fff" strokeWidth="4" opacity="0.8" />
    </>
  ),
  4: () => (
    <>
      <Shadow w={36} />
      <rect x="40" y="10" width="20" height="10" rx="3" fill="#8a8f99" />
      <rect x="22" y="18" width="56" height="70" rx="10" fill="#5fae4a" />
      <rect x="28" y="24" width="44" height="58" rx="6" fill="#9fd77a" />
      <Bolt x={50} y={54} s={1} />
      <path d="M30 28 v48" stroke="#fff" strokeWidth="4" opacity="0.6" />
      <Sparkle x={84} y={20} s={1} c="#fff3b0" />
    </>
  ),
};

const gem = {
  1: () => (
    <>
      <Shadow w={22} />
      <path d="M32 40 l10 -14 h16 l10 14 l-18 34z" fill="#c38cf5" />
      <path d="M32 40 h36 M42 26 l8 14 l8 -14 M50 40 v34" fill="none" strokeWidth="2" opacity="0.7" />
      <path d="M38 38 l6 -8" stroke="#fff" strokeWidth="3" opacity="0.9" />
    </>
  ),
  2: () => (
    <>
      <Shadow w={30} />
      <path d="M20 40 l14 -20 h32 l14 20 l-30 46z" fill="#a66cf0" />
      <path d="M20 40 h60 l-30 46z" fill="#8f52e3" stroke="none" opacity="0.6" />
      <path d="M20 40 l14 -20 h32 l14 20 l-30 46z" fill="none" />
      <path d="M20 40 h60 M34 20 l8 20 l8 -20 l8 20 l8 -20 M42 40 l8 46 l8 -46" fill="none" strokeWidth="2" opacity="0.7" />
      <path d="M28 38 l8 -12" stroke="#fff" strokeWidth="3.5" opacity="0.9" />
      <Sparkle x={78} y={22} s={0.9} />
    </>
  ),
  3: () => (
    <>
      <Shadow w={38} />
      <path d="M22 84 l-4 -30 l10 -14 l10 14 l-4 30z" fill="#e58ce0" />
      <path d="M66 84 l-4 -26 l10 -14 l10 14 l-4 26z" fill="#7fc8f0" />
      <path d="M38 86 l-6 -46 l18 -30 l18 30 l-6 46z" fill="#b07cf5" />
      <path d="M32 40 h36 M50 10 v76" fill="none" strokeWidth="2" opacity="0.6" />
      <path d="M42 36 l6 -14" stroke="#fff" strokeWidth="3.5" opacity="0.9" />
      <Sparkle x={20} y={24} s={1} />
      <Sparkle x={84} y={30} s={0.8} />
    </>
  ),
};

const chest = {
  1: () => (
    <>
      <Shadow w={30} />
      <rect x="22" y="44" width="56" height="42" rx="5" fill="#ff9ab8" />
      <rect x="18" y="34" width="64" height="14" rx="4" fill="#ffb3c9" />
      <rect x="45" y="34" width="10" height="52" fill="#ffd23f" />
      <path d="M50 34 q-18 -20 -22 -6 q2 8 22 6 q20 2 22 -6 q-4 -14 -22 6z" fill="#ffd23f" />
      <path d="M26 52 v26" stroke="#fff" strokeWidth="3" opacity="0.6" />
    </>
  ),
  2: () => (
    <>
      <Shadow w={38} />
      <rect x="14" y="40" width="72" height="48" rx="6" fill="#6fa8dc" />
      <rect x="10" y="28" width="80" height="16" rx="5" fill="#8fc0ea" />
      <rect x="44" y="28" width="12" height="60" fill="#ffd23f" />
      <path d="M50 28 q-22 -24 -28 -6 q2 10 28 6 q26 4 28 -6 q-6 -18 -28 6z" fill="#ffd23f" />
      <circle cx="50" cy="28" r="5" fill="#ffc531" />
      <path d="M18 48 v32" stroke="#fff" strokeWidth="3" opacity="0.6" />
      <Sparkle x={84} y={14} s={0.9} c="#fff3b0" />
    </>
  ),
  3: () => (
    <>
      <Shadow w={42} />
      <path d="M10 48 q0 -28 40 -28 q40 0 40 28z" fill="#a46a3c" />
      <path d="M30 22 v26 M70 22 v26" stroke="#ffc531" strokeWidth="6" />
      <rect x="10" y="48" width="80" height="38" rx="5" fill="#8a5233" />
      <path d="M30 48 v38 M70 48 v38" stroke="#ffc531" strokeWidth="6" />
      <rect x="8" y="44" width="84" height="8" rx="3" fill="#ffc531" />
      <rect x="42" y="52" width="16" height="18" rx="3" fill="#ffd95e" />
      <circle cx="50" cy="60" r="3" fill={O} stroke="none" />
      <Sparkle x={86} y={20} s={1.2} c="#fff3b0" />
      <Sparkle x={14} y={26} s={0.8} c="#fff3b0" />
    </>
  ),
};

// ---------------------------------------------------------------- OVERLAYS
export function BoxArt() {
  return (
    <svg viewBox="0 0 100 100" className="art">
      <g stroke={O} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <rect x="10" y="16" width="80" height="72" rx="8" fill="#d9a36a" />
        <path d="M10 40 h80" fill="none" opacity="0.5" />
        <rect x="40" y="16" width="20" height="72" fill="#e9bf86" />
        <path d="M14 22 v60" stroke="#fff" opacity="0.35" strokeWidth="4" />
        <text x="50" y="72" fontSize="26" fontWeight="900" textAnchor="middle" fill="#a8743f" stroke="none" fontFamily="Fredoka, sans-serif">?</text>
      </g>
    </svg>
  );
}

export function WebArt() {
  return (
    <svg viewBox="0 0 100 100" className="art web-art">
      <g fill="none" stroke="#fff" strokeWidth="2.2" opacity="0.95">
        <path d="M0 0 L100 100 M100 0 L0 100 M50 0 V100 M0 50 H100" />
        <path d="M50 22 Q62 30 70 30 Q72 40 78 50 Q72 60 70 70 Q60 72 50 78 Q40 72 30 70 Q28 60 22 50 Q28 40 30 30 Q40 30 50 22Z" />
        <path d="M50 6 Q70 18 82 18 Q84 34 94 50 Q84 66 82 82 Q66 84 50 94 Q34 84 18 82 Q16 66 6 50 Q16 34 18 18 Q34 16 50 6Z" />
      </g>
    </svg>
  );
}

const ART = { coffee, bread, cake, tea, treat, coin, energy, gem, chest };

function ItemArtImpl({ id, className = 'art' }) {
  const [chain, t] = id.split('_');
  const tier = Number(t);
  let content = null;
  if (chain.startsWith('gen')) content = gens[chain]?.(tier);
  else content = ART[chain]?.[tier]?.();
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g stroke={O} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {content}
      </g>
    </svg>
  );
}

export const ItemArt = memo(ItemArtImpl);
export { Paw, Sparkle };
