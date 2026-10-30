import React, { useState, useEffect } from 'react';

export function NinaSprite({ size = 70, onClick, mood = 'happy' }) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size * 1.35}px`,
        position: 'relative',
        cursor: 'pointer',
        animation: 'floatingMascot 3.2s infinite ease-in-out',
        filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.22))'
      }}
    >
      <svg viewBox="0 0 100 135" width="100%" height="100%">
        <defs>
          {/* Hair Gradient */}
          <linearGradient id="ninaHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C2410C" />
            <stop offset="60%" stopColor="#9A3412" />
            <stop offset="100%" stopColor="#7C2D12" />
          </linearGradient>
          {/* Skin Gradient */}
          <linearGradient id="ninaSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="100%" stopColor="#FED7AA" />
          </linearGradient>
          {/* Apron 3D Gradient */}
          <linearGradient id="ninaApron" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="60%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>
          {/* Contact shadow */}
          <radialGradient id="charShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
        </defs>

        {/* 3D Contact Shadow on Floor */}
        <ellipse cx="50" cy="128" rx="26" ry="6" fill="url(#charShadow)" />

        {/* Back Hair & Low Buns */}
        <circle cx="26" cy="42" r="14" fill="url(#ninaHair)" />
        <circle cx="74" cy="42" r="14" fill="url(#ninaHair)" />
        <ellipse cx="50" cy="50" rx="30" ry="24" fill="#7C2D12" />

        {/* Body & Clothes */}
        {/* White shirt */}
        <path d="M34 68 L66 68 L70 95 L30 95 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        {/* Apron */}
        <path d="M36 74 L64 74 L68 112 L32 112 Z" fill="url(#ninaApron)" />
        {/* Apron Straps */}
        <path d="M38 68 L42 82 M62 68 L58 82" stroke="#E11D48" strokeWidth="3" strokeLinecap="round" />
        {/* Cat Paw Print on Apron Pocket */}
        <rect x="42" y="88" width="16" height="14" rx="3" fill="#FFE4E6" />
        <ellipse cx="50" cy="97" rx="3.5" ry="2.5" fill="#E11D48" />
        <circle cx="47" cy="93" r="1.2" fill="#E11D48" />
        <circle cx="50" cy="92" r="1.2" fill="#E11D48" />
        <circle cx="53" cy="93" r="1.2" fill="#E11D48" />

        {/* Legs / Skirt */}
        <path d="M34 112 L66 112 L68 120 L32 120 Z" fill="#475569" />
        <ellipse cx="43" cy="124" rx="5" ry="3.5" fill="#1E293B" />
        <ellipse cx="57" cy="124" rx="5" ry="3.5" fill="#1E293B" />

        {/* Arms holding coffee cup */}
        <path d="M34 78 Q24 92 38 98" stroke="#FED7AA" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M66 78 Q76 92 62 98" stroke="#FED7AA" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Coffee Cup in hands */}
        <rect x="44" y="94" width="12" height="11" rx="2" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <ellipse cx="50" cy="94" rx="6" ry="2" fill="#78350F" />
        <path d="M56 97 Q60 99 56 102" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />

        {/* Neck */}
        <rect x="46" y="60" width="8" height="10" rx="3" fill="#FED7AA" />

        {/* Face */}
        <ellipse cx="50" cy="42" rx="22" ry="20" fill="url(#ninaSkin)" />

        {/* Cheeks Blush */}
        <ellipse cx="36" cy="46" rx="4" ry="2.5" fill="#FB7185" opacity="0.65" />
        <ellipse cx="64" cy="46" rx="4" ry="2.5" fill="#FB7185" opacity="0.65" />

        {/* Eyes */}
        {isBlinking ? (
          <>
            <path d="M36 40 Q40 43 44 40" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M56 40 Q60 43 64 40" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            <ellipse cx="40" cy="38" rx="4.5" ry="5.5" fill="#451A03" />
            <ellipse cx="60" cy="38" rx="4.5" ry="5.5" fill="#451A03" />
            {/* Luminous Specular Highlights */}
            <circle cx="41.5" cy="36" r="2" fill="#FFFFFF" />
            <circle cx="39" cy="40.5" r="1" fill="#FFFFFF" />
            <circle cx="61.5" cy="36" r="2" fill="#FFFFFF" />
            <circle cx="59" cy="40.5" r="1" fill="#FFFFFF" />
            {/* Eyelashes */}
            <path d="M35 34 Q40 32 45 35" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M55 35 Q60 32 65 34" stroke="#7C2D12" strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* Cute Smile */}
        <path d="M47 48 Q50 51 53 48" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Front Hair Bangs with 3D Volume */}
        <path d="M28 36 C32 18 68 18 72 36 C66 26 58 26 50 32 C42 26 34 26 28 36 Z" fill="url(#ninaHair)" />
        <path d="M28 36 C24 44 26 56 30 58 C32 48 32 38 34 34 Z" fill="url(#ninaHair)" />
        <path d="M72 36 C76 44 74 56 70 58 C68 48 68 38 66 34 Z" fill="url(#ninaHair)" />

        {/* Barista Cute Bow / Ribbon on Hair */}
        <g transform="translate(64, 20)">
          <polygon points="-5,-4 -5,4 0,0" fill="#FB7185" />
          <polygon points="5,-4 5,4 0,0" fill="#FB7185" />
          <circle cx="0" cy="0" r="2" fill="#E11D48" />
        </g>
      </svg>
    </div>
  );
}
