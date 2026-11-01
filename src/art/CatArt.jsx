// Parametric cartoon cat portraits used for café customers.
import { memo } from 'react';
import { CUSTOMERS } from '../game/config';

const O = '#4a3328';

function CatFace({ cat, mood = 'wait' }) {
  const { fur, fur2, fur3, pattern, eye, acc, accColor } = cat;
  const inner = '#f6b3bf';
  const happy = mood === 'happy';
  const earL = 'M22 44 L18 8 L46 28 Z';
  const earR = 'M78 44 L82 8 L54 28 Z';
  return (
    <g stroke={O} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      {/* body / shoulders */}
      <path d="M18 100 q2 -26 32 -26 q30 0 32 26z" fill={pattern === 'tuxedo' ? fur : fur} />
      {pattern === 'tuxedo' && <path d="M38 100 q0 -18 12 -22 q12 4 12 22z" fill={fur2} stroke="none" />}
      {/* ears */}
      <path d={earL} fill={pattern === 'siamese' ? fur2 : pattern === 'calico' ? fur2 : fur} />
      <path d={earR} fill={pattern === 'calico' ? fur3 : pattern === 'siamese' ? fur2 : fur} />
      <path d="M25 38 L23 16 L39 29 Z M75 38 L77 16 L61 29 Z" fill={inner} stroke="none" />
      {/* head */}
      <ellipse cx="50" cy="52" rx="36" ry="30" fill={fur} />
      {/* patterns, clipped by drawing inside head bounds */}
      {pattern === 'tabby' && (
        <g fill="none" stroke={fur2} strokeWidth="3.4">
          <path d="M42 24 q2 7 0 12 M50 23 v13 M58 24 q-2 7 0 12" />
          <path d="M16 48 q6 1 9 4 M15 56 q6 0 9 2 M84 48 q-6 1 -9 4 M85 56 q-6 0 -9 2" />
        </g>
      )}
      {pattern === 'calico' && (
        <g stroke="none">
          <path d="M16 48 q2 -22 26 -26 q2 14 -8 22 q-10 8 -18 4z" fill={fur2} />
          <path d="M84 46 q-4 -20 -24 -24 q-2 12 6 20 q8 6 18 4z" fill={fur3} />
        </g>
      )}
      {pattern === 'siamese' && <ellipse cx="50" cy="62" rx="16" ry="13" fill={fur2} stroke="none" opacity="0.85" />}
      {pattern === 'tuxedo' && <path d="M30 70 q4 -20 20 -20 q16 0 20 20 q-20 12 -40 0z" fill={fur2} stroke="none" />}
      <ellipse cx="50" cy="52" rx="36" ry="30" fill="none" />
      {/* eyes */}
      {happy ? (
        <g fill="none" strokeWidth="3.2">
          <path d="M30 52 q6 -7 12 0" />
          <path d="M58 52 q6 -7 12 0" />
        </g>
      ) : (
        <g>
          <ellipse cx="36" cy="51" rx="6.5" ry="7.5" fill={eye} />
          <ellipse cx="64" cy="51" rx="6.5" ry="7.5" fill={eye} />
          <ellipse cx="36" cy="52" rx="3" ry="5.5" fill="#1f1714" stroke="none" />
          <ellipse cx="64" cy="52" rx="3" ry="5.5" fill="#1f1714" stroke="none" />
          <circle cx="38.2" cy="48" r="2" fill="#fff" stroke="none" />
          <circle cx="66.2" cy="48" r="2" fill="#fff" stroke="none" />
        </g>
      )}
      {/* nose & mouth */}
      <path d="M46.5 60 h7 l-3.5 3.6z" fill="#f27e8e" strokeWidth="2" />
      <path d={happy ? 'M50 64 q-5 7 -10 1 M50 64 q5 7 10 1' : 'M50 64 q-4 4 -8 1 M50 64 q4 4 8 1'} fill="none" strokeWidth="2.4" />
      {/* whiskers */}
      <g strokeWidth="1.6" fill="none" opacity="0.7">
        <path d="M24 60 h-14 M25 64 l-13 4 M76 60 h14 M75 64 l13 4" />
      </g>
      {/* blush */}
      <ellipse cx="27" cy="62" rx="5" ry="3" fill="#f27e8e" stroke="none" opacity={happy ? 0.6 : 0.3} />
      <ellipse cx="73" cy="62" rx="5" ry="3" fill="#f27e8e" stroke="none" opacity={happy ? 0.6 : 0.3} />
      {/* accessories */}
      {acc === 'bow' && (
        <g transform="translate(70 26) rotate(20)">
          <path d="M0 0 l-12 -8 v16z M0 0 l12 -8 v16z" fill={accColor} />
          <circle cx="0" cy="0" r="3.6" fill={accColor} />
        </g>
      )}
      {acc === 'flower' && (
        <g transform="translate(28 28)" stroke="none">
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 5} cy={Math.sin((a * Math.PI) / 180) * 5} r="4.2" fill={accColor} stroke={O} strokeWidth="1.6" />
          ))}
          <circle r="3.2" fill="#fff" stroke={O} strokeWidth="1.6" />
        </g>
      )}
      {acc === 'glasses' && (
        <g fill="none" strokeWidth="2.6" stroke={accColor}>
          <circle cx="36" cy="51" r="10" />
          <circle cx="64" cy="51" r="10" />
          <path d="M46 50 q4 -3 8 0" />
        </g>
      )}
      {acc === 'scarf' && (
        <g>
          <path d="M22 80 q28 12 56 0 l-2 10 q-26 10 -52 0z" fill={accColor} />
          <path d="M60 86 l6 14 h-10z" fill={accColor} />
        </g>
      )}
      {acc === 'hat' && (
        <g>
          <ellipse cx="50" cy="24" rx="22" ry="5" fill={accColor} />
          <path d="M36 24 q0 -16 14 -16 q14 0 14 16z" fill={accColor} />
          <path d="M36 20 h28" stroke="#fff" strokeWidth="3" />
        </g>
      )}
    </g>
  );
}

function CatArtImpl({ id, mood, className = 'cat-art' }) {
  const cat = CUSTOMERS.find((c) => c.id === id) || CUSTOMERS[0];
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <CatFace cat={cat} mood={mood} />
    </svg>
  );
}

export const CatArt = memo(CatArtImpl);
