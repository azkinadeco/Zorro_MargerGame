import React, { useState } from 'react';

export function CatSprite({
  type = 'zorro', // 'zorro' | 'thor' | 'loki'
  pose = 'outdoor',
  size = 72,
  accessoryId = null,
  isPurring = false,
  className = '',
  onClick
}) {
  const [photoMode, setPhotoMode] = useState(false);

  // Render photo cutout mode if toggled
  if (photoMode) {
    let photoSrc = '/cats/zorro_outdoor.jpeg';
    if (type === 'thor') photoSrc = '/cats/thor.jpeg';
    else if (type === 'loki') photoSrc = '/cats/loki.jpeg';
    else if (pose === 'indoor') photoSrc = '/cats/zorro_indoor.jpeg';

    return (
      <div
        onClick={onClick}
        className={className}
        style={{
          width: `${size * 1.3}px`,
          height: `${size * 1.3}px`,
          position: 'relative',
          cursor: 'pointer',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #FFFFFF',
          boxShadow: '0 6px 16px rgba(0,0,0,0.25)',
          animation: isPurring ? 'purrShake 0.2s infinite' : 'bounceSoft 3s infinite ease-in-out'
        }}
      >
        <img
          src={photoSrc}
          alt={type}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    );
  }

  // --- 3D THOR SPRITE (Curious Tabby Kitten from Thor.jpeg) ---
  if (type === 'thor') {
    return (
      <div
        onClick={onClick}
        className={className}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          cursor: 'pointer',
          filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.2))',
          animation: isPurring ? 'purrShake 0.18s infinite' : 'bounceSoft 2.8s infinite ease-in-out'
        }}
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <radialGradient id="thorShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <linearGradient id="thorBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C4B5A5" />
              <stop offset="50%" stopColor="#9C9080" />
              <stop offset="100%" stopColor="#6E6252" />
            </linearGradient>
            <linearGradient id="thorHead" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#BDB0A0" />
              <stop offset="60%" stopColor="#8C8070" />
              <stop offset="100%" stopColor="#5E5345" />
            </linearGradient>
          </defs>

          {/* 3D Contact Shadow */}
          <ellipse cx="50" cy="88" rx="30" ry="7" fill="url(#thorShadow)" />

          {/* Body */}
          <ellipse cx="50" cy="62" rx="26" ry="24" fill="url(#thorBody)" />
          {/* Tabby 3D Back Stripes */}
          <path d="M30 55 Q50 63 70 55 M28 65 Q50 73 72 65 M34 76 Q50 82 66 76" stroke="#443B2F" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8" />
          
          {/* Fluffy White Chest */}
          <path d="M36 48 C34 72 66 72 64 48 C58 62 42 62 36 48 Z" fill="#FFFFFF" />

          {/* Front Paws with 3D Mittens */}
          <ellipse cx="40" cy="83" rx="7.5" ry="5.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          <ellipse cx="60" cy="83" rx="7.5" ry="5.5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          {/* Cute pink paw bean hints */}
          <circle cx="39" cy="84" r="1.2" fill="#FDA4AF" />
          <circle cx="42" cy="84" r="1.2" fill="#FDA4AF" />
          <circle cx="59" cy="84" r="1.2" fill="#FDA4AF" />
          <circle cx="62" cy="84" r="1.2" fill="#FDA4AF" />

          {/* Thor Collar Accessory */}
          {accessoryId === 'thor_bell' && (
            <g>
              <path d="M38 56 Q50 64 62 56" stroke="#EF4444" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <circle cx="50" cy="62" r="4.5" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
              <circle cx="49" cy="61" r="1.2" fill="#FEF08A" />
            </g>
          )}

          {/* Head */}
          <circle cx="50" cy="38" r="23" fill="url(#thorHead)" />
          {/* Tabby M-Marking on Forehead */}
          <path d="M42 21 L46 29 L50 22 L54 29 L58 21" stroke="#3D3428" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          
          {/* Ears with inner 3D depth */}
          <polygon points="30,24 24,7 40,16" fill="#6E6252" />
          <polygon points="32,22 27,11 38,17" fill="#FED7AA" />
          <polygon points="70,24 76,7 60,16" fill="#6E6252" />
          <polygon points="68,22 73,11 62,17" fill="#FED7AA" />

          {/* White Muzzle */}
          <ellipse cx="50" cy="46" rx="12" ry="7.5" fill="#FFFFFF" />

          {/* Luminous Eyes looking up with 3D Depth */}
          <ellipse cx="40" cy="35" rx="6" ry="6.5" fill="#15803D" />
          <ellipse cx="60" cy="35" rx="6" ry="6.5" fill="#15803D" />
          <ellipse cx="40" cy="35" rx="4.5" ry="5.5" fill="#1E293B" />
          <ellipse cx="60" cy="35" rx="4.5" ry="5.5" fill="#1E293B" />
          {/* Double Specular Highlights */}
          <circle cx="42" cy="33" r="2.2" fill="#FFFFFF" />
          <circle cx="39" cy="37" r="1" fill="#FFFFFF" />
          <circle cx="62" cy="33" r="2.2" fill="#FFFFFF" />
          <circle cx="59" cy="37" r="1" fill="#FFFFFF" />

          {/* Nose & Mouth */}
          <polygon points="48,42 52,42 50,44.5" fill="#FB7185" />
          <path d="M46 45 Q50 48 54 45" stroke="#786D5E" strokeWidth="1.5" fill="none" />
          {/* Long Whiskers */}
          <line x1="42" y1="44" x2="20" y2="41" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="42" y1="46" x2="18" y2="47" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="58" y1="44" x2="80" y2="41" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="58" y1="46" x2="82" y2="47" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />

          {/* Thor Accessories */}
          {accessoryId === 'thor_ribbon' && (
            <g transform="translate(26, 12)">
              <ellipse cx="0" cy="0" rx="6" ry="3.5" transform="rotate(-30)" fill="#F43F5E" />
              <ellipse cx="9" cy="0" rx="6" ry="3.5" transform="rotate(30)" fill="#F43F5E" />
              <circle cx="4.5" cy="0" r="2.5" fill="#BE123C" />
            </g>
          )}
          {accessoryId === 'thor_sailor' && (
            <g transform="translate(50, 15)">
              <ellipse cx="0" cy="0" rx="15" ry="4.5" fill="#1E3A8A" />
              <path d="M-11 0 C-11 -12 11 -12 11 0 Z" fill="#FFFFFF" />
              <circle cx="0" cy="-6" r="2.8" fill="#EF4444" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // --- 3D LOKI SPRITE (Fluffy Lion Orange Cat from Loki.jpeg) ---
  if (type === 'loki') {
    return (
      <div
        onClick={onClick}
        className={className}
        style={{
          width: `${size * 1.08}px`,
          height: `${size * 1.08}px`,
          cursor: 'pointer',
          filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.22))',
          animation: isPurring ? 'purrShake 0.18s infinite' : 'bounceSoft 3.2s infinite ease-in-out'
        }}
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <radialGradient id="lokiShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(0,0,0,0.35)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <linearGradient id="lokiOrange" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDBA74" />
              <stop offset="40%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
            <linearGradient id="lokiMane" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* 3D Contact Shadow */}
          <ellipse cx="50" cy="88" rx="34" ry="8" fill="url(#lokiShadow)" />

          {/* Fluffy Tail swaying */}
          <path d="M72 75 Q94 78 88 52 Q84 42 74 58" stroke="url(#lokiOrange)" strokeWidth="13" strokeLinecap="round" fill="none" />
          <ellipse cx="88" cy="48" rx="6" ry="6" fill="#FED7AA" />

          {/* Body */}
          <ellipse cx="50" cy="63" rx="28" ry="24" fill="url(#lokiOrange)" />
          {/* White Underbelly */}
          <path d="M30 46 C24 80 76 80 70 46 C64 66 36 66 30 46 Z" fill="#FFF7ED" />

          {/* Paws */}
          <ellipse cx="38" cy="84" rx="7.5" ry="6" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1" />
          <ellipse cx="62" cy="84" rx="7.5" ry="6" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1" />

          {/* Giant Fluffy Lion Mane around Neck (Unique feature of Loki.jpeg!) */}
          <g>
            {[-36, -24, -12, 0, 12, 24, 36].map((deg, i) => (
              <ellipse
                key={i}
                cx={50 + Math.sin(deg * Math.PI / 180) * 26}
                cy={48 + Math.cos(deg * Math.PI / 180) * 14}
                rx="12"
                ry="9"
                fill="url(#lokiMane)"
                transform={`rotate(${deg * 0.4} 50 48)`}
              />
            ))}
          </g>

          {/* Loki Scarf Accessory */}
          {accessoryId === 'loki_scarf' && (
            <g>
              <path d="M32 50 Q50 59 68 50" stroke="#DC2626" strokeWidth="6.5" fill="none" strokeLinecap="round" />
              <path d="M58 54 L64 74" stroke="#DC2626" strokeWidth="5.5" strokeLinecap="round" />
            </g>
          )}

          {/* Head */}
          <circle cx="50" cy="38" r="24" fill="url(#lokiOrange)" />
          
          {/* Ears with inner tufts */}
          <polygon points="28,24 22,6 40,16" fill="#EA580C" />
          <polygon points="30,22 26,11 37,17" fill="#FED7AA" />
          <polygon points="72,24 78,6 60,16" fill="#EA580C" />
          <polygon points="70,22 74,11 63,17" fill="#FED7AA" />

          {/* White Mane Chest Bib */}
          <polygon points="46,18 50,44 54,18" fill="#FFFFFF" />
          <ellipse cx="50" cy="45" rx="12" ry="7.5" fill="#FFFFFF" />

          {/* Eyes (Golden Amber with 3D Depth) */}
          <ellipse cx="38" cy="34" rx="5" ry="5.5" fill="#B45309" />
          <ellipse cx="62" cy="34" rx="5" ry="5.5" fill="#B45309" />
          <ellipse cx="38" cy="34" rx="3.5" ry="4.5" fill="#451A03" />
          <ellipse cx="62" cy="34" rx="3.5" ry="4.5" fill="#451A03" />
          {/* Highlights */}
          <circle cx="39.5" cy="32" r="1.8" fill="#FFFFFF" />
          <circle cx="63.5" cy="32" r="1.8" fill="#FFFFFF" />

          {/* Nose & Mouth */}
          <polygon points="48,41 52,41 50,43.5" fill="#EA580C" />
          <path d="M46 45 Q50 48 54 45" stroke="#9A3412" strokeWidth="1.5" fill="none" />
          {/* Whiskers */}
          <line x1="42" y1="44" x2="16" y2="40" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="42" y1="46" x2="14" y2="46" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="58" y1="44" x2="84" y2="40" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="58" y1="46" x2="86" y2="46" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

          {/* Loki Accessories */}
          {accessoryId === 'loki_sunglasses' && (
            <g transform="translate(0, -2)">
              <ellipse cx="38" cy="35" rx="9" ry="6" fill="#18181B" stroke="#000000" strokeWidth="1" />
              <ellipse cx="62" cy="35" rx="9" ry="6" fill="#18181B" stroke="#000000" strokeWidth="1" />
              <line x1="47" y1="35" x2="53" y2="35" stroke="#18181B" strokeWidth="2.5" />
              <path d="M32 33 L44 37" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
              <path d="M56 33 L68 37" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6" />
            </g>
          )}
          {accessoryId === 'loki_flower' && (
            <g transform="translate(50, 16)">
              {[-16, -8, 0, 8, 16].map((offset, i) => (
                <circle key={i} cx={offset} cy={Math.abs(offset) * 0.3} r="4.5" fill="#F472B6" stroke="#FDA4AF" strokeWidth="1" />
              ))}
              <circle cx="0" cy="0" r="2.5" fill="#FEF08A" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // --- 3D ZORRO SPRITE (Tuxedo King from Zorro.jpeg & Zorro2.jpeg) ---
  const showMask = accessoryId === 'zorro_mask';
  const showCrown = accessoryId === 'zorro_crown';
  const showChef = accessoryId === 'zorro_chef';
  const showBowtie = accessoryId === 'zorro_bowtie';

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        width: `${size * 1.15}px`,
        height: `${size * 1.15}px`,
        cursor: 'pointer',
        filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.3))',
        animation: isPurring ? 'purrShake 0.16s infinite' : 'bounceSoft 2.6s infinite ease-in-out'
      }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <radialGradient id="zorroShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.4)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          {/* Volumetric 3D Obsidian Black Coat */}
          <linearGradient id="zorroCoat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="45%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          {/* Volumetric Head */}
          <radialGradient id="zorroHeadGrad" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="60%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* 3D Contact Shadow on Floor */}
        <ellipse cx="50" cy="88" rx="36" ry="8.5" fill="url(#zorroShadow)" />

        {/* Tail curled elegantly */}
        <path d="M74 65 Q96 62 92 46" stroke="url(#zorroCoat)" strokeWidth="10" strokeLinecap="round" fill="none" />
        <circle cx="92" cy="46" r="4.5" fill="#FFFFFF" /> {/* White tail tip accent */}

        {/* Main Body */}
        <path d="M22 65 C18 45 82 45 78 65 C78 84 22 84 22 65 Z" fill="url(#zorroCoat)" />

        {/* Majestic White Chest Bib (Exact V-shape of real tuxedo Zorro!) */}
        <path d="M30 46 C24 78 76 78 70 46 C60 64 40 64 30 46 Z" fill="#FFFFFF" />

        {/* Bowtie Accessory */}
        {showBowtie && (
          <g transform="translate(50, 56)">
            <polygon points="-8,-5 -8,5 0,0" fill="#EF4444" />
            <polygon points="8,-5 8,5 0,0" fill="#EF4444" />
            <circle cx="0" cy="0" r="3" fill="#B91C1C" />
          </g>
        )}

        {/* Front White Mitten Paws */}
        <ellipse cx="38" cy="82" rx="8" ry="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        <ellipse cx="62" cy="82" rx="8" ry="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
        {/* Pink toe beans */}
        <circle cx="36" cy="83" r="1.3" fill="#FDA4AF" />
        <circle cx="40" cy="83" r="1.3" fill="#FDA4AF" />
        <circle cx="60" cy="83" r="1.3" fill="#FDA4AF" />
        <circle cx="64" cy="83" r="1.3" fill="#FDA4AF" />

        {/* Head */}
        <circle cx="50" cy="38" r="23.5" fill="url(#zorroHeadGrad)" />
        
        {/* Ears */}
        <polygon points="28,24 23,5 40,16" fill="#0F172A" />
        <polygon points="30,22 26,10 37,17" fill="#E2E8F0" />
        <polygon points="72,24 77,5 60,16" fill="#0F172A" />
        <polygon points="70,22 74,10 63,17" fill="#E2E8F0" />

        {/* White Muzzle */}
        <ellipse cx="50" cy="46" rx="11" ry="7.5" fill="#FFFFFF" />

        {/* Luminous Emerald Green Cat Eyes */}
        <circle cx="39" cy="34" r="5" fill="#65A30D" />
        <circle cx="61" cy="34" r="5" fill="#65A30D" />
        <circle cx="39" cy="34" r="3" fill="#0F172A" />
        <circle cx="61" cy="34" r="3" fill="#0F172A" />
        {/* 3D Specular Eye Reflections */}
        <circle cx="41" cy="32" r="1.8" fill="#FFFFFF" />
        <circle cx="38" cy="35.5" r="0.9" fill="#FFFFFF" />
        <circle cx="63" cy="32" r="1.8" fill="#FFFFFF" />
        <circle cx="60" cy="35.5" r="0.9" fill="#FFFFFF" />

        {/* Superhero Mask Accessory */}
        {showMask && (
          <g>
            <path d="M28 34 C28 27 72 27 72 34 C66 41 56 36 50 36 C44 36 34 41 28 34 Z" fill="#18181B" stroke="#000000" strokeWidth="1.5" />
            <ellipse cx="39" cy="34" rx="4.5" ry="3" fill="#84CC16" />
            <ellipse cx="61" cy="34" rx="4.5" ry="3" fill="#84CC16" />
            <circle cx="40" cy="33.5" r="1.2" fill="#FFFFFF" />
            <circle cx="62" cy="33.5" r="1.2" fill="#FFFFFF" />
            <path d="M28 33 L20 36 M72 33 L80 36" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {/* Signature Black Spot on Nose (Real Zorro feature!) */}
        <polygon points="48,41 52,41 50,43.5" fill="#0F172A" />
        <ellipse cx="49" cy="41" rx="1.5" ry="1.2" fill="#020617" />

        {/* Long Aristocratic White Whiskers */}
        <line x1="42" y1="44" x2="14" y2="39" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="42" y1="47" x2="12" y2="47" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="58" y1="44" x2="86" y2="39" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="58" y1="47" x2="88" y2="47" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />

        {/* Royal Crown Accessory */}
        {showCrown && (
          <g transform="translate(0, -3)">
            <polygon points="41,12 44,2 50,8 56,2 59,12" fill="#FBBF24" stroke="#D97706" strokeWidth="1.2" />
            <circle cx="50" cy="4" r="2" fill="#EF4444" />
            <circle cx="44" cy="2" r="1.2" fill="#3B82F6" />
            <circle cx="56" cy="2" r="1.2" fill="#3B82F6" />
          </g>
        )}

        {/* Barista Chef Hat Accessory */}
        {showChef && (
          <g transform="translate(50, 12)">
            <ellipse cx="0" cy="0" rx="15" ry="4.5" fill="#E2E8F0" />
            <path d="M-11 0 C-15 -18 15 -18 11 0 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
            <circle cx="-5" cy="-14" r="5.5" fill="#FFFFFF" />
            <circle cx="5" cy="-14" r="5.5" fill="#FFFFFF" />
            <circle cx="0" cy="-17" r="6.5" fill="#FFFFFF" />
          </g>
        )}
      </svg>
    </div>
  );
}
