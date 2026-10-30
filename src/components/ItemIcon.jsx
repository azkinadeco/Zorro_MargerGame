import React from 'react';

export function ItemIcon({ id, className = '', size = 52, isCobweb = false }) {
  const renderIconContent = () => {
    switch (id) {
      // --- ENERGY CHAIN ---
      case 'energy_1': // Energy Spark
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <circle cx="32" cy="32" r="20" fill="#FEF3C7" />
            <polygon points="34,14 22,34 32,34 30,50 42,30 32,30" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
            <circle cx="44" cy="20" r="2.5" fill="#FEF08A" />
            <circle cx="20" cy="44" r="2" fill="#FEF08A" />
          </svg>
        );

      case 'energy_2': // Energy Potion
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="52" rx="16" ry="5" fill="#CBD5E1" opacity="0.6" />
            <rect x="28" y="14" width="8" height="10" fill="#E2E8F0" />
            <rect x="26" y="12" width="12" height="4" rx="2" fill="#D97706" />
            <path d="M28 24 L18 44 C16 48 22 52 32 52 C42 52 48 48 46 44 L36 24 Z" fill="#FDE047" stroke="#F59E0B" strokeWidth="2" />
            <polygon points="33,30 27,40 33,40 31,48 37,38 31,38" fill="#D97706" />
          </svg>
        );

      case 'energy_3': // Energy Crystal Orb
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="52" rx="18" ry="6" fill="#E2E8F0" opacity="0.6" />
            {/* Pedestal */}
            <path d="M22 48 L42 48 L38 42 L26 42 Z" fill="#D97706" />
            {/* Glowing crystal orb */}
            <circle cx="32" cy="28" r="18" fill="#FDE047" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="32" cy="28" r="14" fill="#FEF08A" />
            <polygon points="33,18 25,29 33,29 31,38 39,27 31,27" fill="#B45309" />
            {/* Sparkles */}
            <polygon points="46,14 48,10 50,14 54,16 50,18 48,22 46,18 42,16" fill="#FFFFFF" />
          </svg>
        );

      case 'energy_4': // Royal Cat Sun Elixir
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            {/* Aura */}
            <circle cx="32" cy="32" r="22" fill="#FEF08A" opacity="0.6" />
            {/* Sun rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line
                key={i}
                x1="32"
                y1="10"
                x2="32"
                y2="4"
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform={`rotate(${angle} 32 32)`}
              />
            ))}
            <circle cx="32" cy="32" r="16" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
            {/* Crown & Paw */}
            <polygon points="26,22 28,16 32,19 36,16 38,22" fill="#FFFFFF" />
            <ellipse cx="32" cy="36" rx="6" ry="4.5" fill="#FFFFFF" />
            <circle cx="28" cy="30" r="1.5" fill="#FFFFFF" />
            <circle cx="36" cy="30" r="1.5" fill="#FFFFFF" />
            <circle cx="32" cy="28" r="1.5" fill="#FFFFFF" />
          </svg>
        );

      // --- COINS CHAIN ---
      case 'coins_1': // Bronze Pile
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="26" cy="44" rx="14" ry="6" fill="#C2410C" />
            <ellipse cx="26" cy="42" rx="14" ry="6" fill="#FB923C" />
            <ellipse cx="38" cy="42" rx="14" ry="6" fill="#C2410C" />
            <ellipse cx="38" cy="40" rx="14" ry="6" fill="#FDBA74" />
            <ellipse cx="32" cy="34" rx="14" ry="6" fill="#EA580C" />
            <ellipse cx="32" cy="32" rx="14" ry="6" fill="#FED7AA" />
            <text x="32" y="35" fontSize="8" fill="#7C2D12" textAnchor="middle" fontWeight="900">🪙</text>
          </svg>
        );

      case 'coins_2': // Silver Coin Sack
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="52" rx="18" ry="6" fill="#CBD5E1" opacity="0.6" />
            <path d="M22 22 C14 36 14 50 32 50 C50 50 50 36 42 22 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
            <path d="M24 22 L20 16 L44 16 L40 22 Z" fill="#94A3B8" />
            <rect x="22" y="20" width="20" height="4" rx="2" fill="#3B82F6" />
            <circle cx="32" cy="36" r="6" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
            <text x="32" y="39" fontSize="8" fill="#334155" textAnchor="middle" fontWeight="bold">S</text>
          </svg>
        );

      case 'coins_3': // Gold Coin Stash
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="52" rx="18" ry="6" fill="#CBD5E1" opacity="0.6" />
            <path d="M20 24 C12 36 12 50 32 50 C52 50 52 36 44 24 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
            <path d="M24 24 L18 16 L46 16 L40 24 Z" fill="#D97706" />
            <rect x="22" y="22" width="20" height="4" rx="2" fill="#EF4444" />
            {/* Gold paw emblem */}
            <circle cx="32" cy="37" r="4" fill="#FDE047" />
            <circle cx="28" cy="33" r="1.5" fill="#FDE047" />
            <circle cx="36" cy="33" r="1.5" fill="#FDE047" />
            <circle cx="32" cy="31" r="1.5" fill="#FDE047" />
          </svg>
        );

      case 'coins_4': // Royal Cat Treasure Chest
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="54" rx="22" ry="6" fill="#CBD5E1" opacity="0.6" />
            {/* Chest base */}
            <rect x="12" y="32" width="40" height="20" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
            <path d="M12 40 L52 40 M24 32 L24 52 M40 32 L40 52" stroke="#FBBF24" strokeWidth="2.5" />
            {/* Chest dome lid */}
            <path d="M10 32 C10 18 54 18 54 32 Z" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
            <path d="M10 32 C10 22 54 22 54 32" stroke="#FBBF24" strokeWidth="2.5" fill="none" />
            {/* Keyhole / Gold lock */}
            <rect x="29" y="31" width="6" height="7" rx="1.5" fill="#FDE047" stroke="#92400E" strokeWidth="1" />
            <circle cx="32" cy="34" r="1.2" fill="#78350F" />
            {/* Sparkles */}
            <polygon points="46,14 48,10 50,14 54,16 50,18 48,22 46,18 42,16" fill="#FEF08A" />
          </svg>
        );

      // --- GENERATORS LEVEL 2 ---
      case 'gen_basket_2': // Luxury Picnic Basket
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="52" rx="22" ry="6" fill="#CBD5E1" opacity="0.6" />
            {/* Double golden handles */}
            <path d="M16 32 C16 10 48 10 48 32" stroke="#B45309" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M18 32 C18 14 46 14 46 32" stroke="#FBBF24" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Basket body */}
            <path d="M10 30 L15 50 C15 52 49 52 49 50 L54 30 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            {/* Polka dot red cloth */}
            <path d="M9 30 Q20 36 32 30 Q44 36 55 30 L53 28 L11 28 Z" fill="#EF4444" />
            <circle cx="20" cy="31" r="1.2" fill="#FFFFFF" />
            <circle cx="32" cy="31" r="1.2" fill="#FFFFFF" />
            <circle cx="44" cy="31" r="1.2" fill="#FFFFFF" />
            <circle cx="32" cy="42" r="3" fill="#FBBF24" />
          </svg>
        );

      case 'gen_box_2': // Deluxe Wooden Play Box
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="52" rx="20" ry="6" fill="#CBD5E1" opacity="0.6" />
            <polygon points="12,28 32,36 52,28 32,20" fill="#86EFAC" stroke="#16A34A" strokeWidth="1" />
            <polygon points="12,28 32,36 32,50 12,42" fill="#16A34A" />
            <polygon points="52,28 32,36 32,50 52,42" fill="#15803D" />
            {/* Brass corners */}
            <polygon points="12,28 17,26 15,33 12,31" fill="#FBBF24" />
            <polygon points="52,28 47,26 49,33 52,31" fill="#FBBF24" />
            {/* Cat ears peeking */}
            <polygon points="26,22 29,14 33,20" fill="#0F172A" />
            <polygon points="35,20 39,14 42,22" fill="#0F172A" />
            <circle cx="30" cy="24" r="1.8" fill="#FBBF24" />
            <circle cx="38" cy="24" r="1.8" fill="#FBBF24" />
          </svg>
        );

      // --- FOOD CHAIN ---
      case 'food_1': // Kibble Bowl
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="46" rx="22" ry="7" fill="#E2C9B6" opacity="0.6" />
            <path d="M12 34 C12 48 52 48 52 34 L48 24 L16 24 Z" fill="#FFAAA6" />
            <ellipse cx="32" cy="24" rx="16" ry="6" fill="#FFD3B6" />
            <circle cx="27" cy="23" r="3.2" fill="#B3541E" />
            <circle cx="37" cy="24" r="3" fill="#D36B00" />
            <circle cx="32" cy="21" r="2.8" fill="#8B4513" />
            <path d="M30 35 Q32 38 34 35" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="28" cy="33" r="1.5" fill="#FFFFFF" />
            <circle cx="36" cy="33" r="1.5" fill="#FFFFFF" />
          </svg>
        );

      case 'food_2': // Tuna Can
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="50" rx="20" ry="6" fill="#CBD5E1" opacity="0.5" />
            <path d="M14 26 L14 42 C14 50 50 50 50 42 L50 26 Z" fill="#93C5FD" />
            <ellipse cx="32" cy="42" rx="18" ry="6" fill="#60A5FA" opacity="0.3" />
            <path d="M14 26 C14 32 50 32 50 26 L50 24 C50 18 14 18 14 24 Z" fill="#BFDBFE" />
            <ellipse cx="32" cy="24" rx="18" ry="5.5" fill="#DBEAFE" />
            <ellipse cx="32" cy="24" rx="14" ry="4" fill="#F87171" />
            <path d="M28 36 Q32 33 36 36 Q32 39 28 36 Z" fill="#FFFFFF" />
            <polygon points="36,36 40,33 40,39" fill="#FFFFFF" />
          </svg>
        );

      case 'food_3': // Churu Stick
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <rect x="24" y="8" width="16" height="46" rx="8" transform="rotate(25 32 32)" fill="#F472B6" />
            <rect x="25" y="10" width="14" height="42" rx="7" transform="rotate(25 32 32)" fill="#FB7185" />
            <circle cx="44" cy="14" r="5" fill="#FDE047" />
            <path d="M44 9 C41 14 47 14 44 9 Z" fill="#FDE047" />
            <circle cx="31" cy="33" r="2.5" fill="#FFFFFF" />
            <circle cx="28" cy="28" r="1.2" fill="#FFFFFF" />
            <circle cx="34" cy="28" r="1.2" fill="#FFFFFF" />
            <circle cx="31" cy="25" r="1.2" fill="#FFFFFF" />
          </svg>
        );

      case 'food_4': // Gourmet Salmon Bowl
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="48" rx="22" ry="7" fill="#E2E8F0" opacity="0.6" />
            <path d="M10 28 C10 48 54 48 54 28 Z" fill="#FEE2E2" stroke="#FECDD3" strokeWidth="2" />
            <ellipse cx="32" cy="28" rx="22" ry="7" fill="#FFFFFF" />
            <path d="M22 25 Q32 18 42 25 Q32 32 22 25 Z" fill="#FB923C" />
            <path d="M26 23 L38 29 M30 21 L34 31" stroke="#FED7AA" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="24" cy="24" r="2.5" fill="#4ADE80" />
            <circle cx="26" cy="22" r="2" fill="#22C55E" />
          </svg>
        );

      case 'food_5': // Cat Milk & Cookie
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <rect x="16" y="24" width="20" height="26" rx="6" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5" />
            <rect x="20" y="16" width="12" height="9" rx="2" fill="#E2E8F0" />
            <rect x="18" y="14" width="16" height="4" rx="2" fill="#F472B6" />
            <path d="M18 36 Q26 38 34 36 L34 46 Q26 48 18 46 Z" fill="#67E8F9" opacity="0.3" />
            <text x="26" y="35" fontSize="8" fill="#3B82F6" textAnchor="middle" fontWeight="bold">MILK</text>
            <path d="M38 40 Q46 36 48 44 Q44 46 38 40 Z" fill="#D97706" />
            <polygon points="48,44 54,39 53,48" fill="#D97706" />
            <circle cx="41" cy="41" r="1" fill="#78350F" />
          </svg>
        );

      case 'food_6': // Royal Cat Birthday Cake
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="54" rx="22" ry="5" fill="#FEE2E2" opacity="0.7" />
            <rect x="12" y="34" width="40" height="18" rx="6" fill="#FBCFE8" />
            <path d="M12 40 Q22 46 32 40 Q42 46 52 40 L52 34 L12 34 Z" fill="#F472B6" />
            <rect x="18" y="20" width="28" height="15" rx="4" fill="#FEF08A" />
            <path d="M18 25 Q25 29 32 25 Q39 29 46 25 L46 20 L18 20 Z" fill="#FDE047" />
            <polygon points="22,20 25,12 28,20" fill="#F43F5E" />
            <polygon points="36,20 39,12 42,20" fill="#F43F5E" />
            <rect x="31" y="10" width="2.5" height="10" fill="#60A5FA" />
            <ellipse cx="32" cy="7" rx="2.5" ry="4" fill="#F97316" />
            <ellipse cx="32" cy="7" rx="1.2" ry="2" fill="#FEF08A" />
          </svg>
        );

      // --- TOYS CHAIN ---
      case 'toys_1': // Yarn Ball
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="50" rx="18" ry="5" fill="#E2E8F0" opacity="0.5" />
            <circle cx="32" cy="30" r="18" fill="#C084FC" />
            <path d="M18 25 Q32 15 44 28" stroke="#E9D5FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M20 36 Q34 44 46 30" stroke="#DDD6FE" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M24 18 Q36 32 30 46" stroke="#A855F7" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M46 34 Q54 44 56 50 Q50 54 44 50" stroke="#C084FC" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'toys_2': // Feather Wand
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <line x1="12" y1="52" x2="38" y2="26" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
            <path d="M38 26 Q46 14 56 12 Q50 22 42 28 Z" fill="#FB7185" />
            <path d="M40 25 Q46 20 54 22 Q46 28 41 27 Z" fill="#38BDF8" />
            <path d="M36 28 Q44 32 48 38 Q40 34 38 29 Z" fill="#FACC15" />
            <circle cx="37" cy="27" r="3" fill="#FBBF24" />
          </svg>
        );

      case 'toys_3': // Jingle Bell
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="52" rx="16" ry="5" fill="#E2E8F0" opacity="0.5" />
            <circle cx="32" cy="32" r="18" fill="#FBBF24" />
            <line x1="18" y1="36" x2="46" y2="36" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="32" cy="36" r="3.5" fill="#78350F" />
            <path d="M32 14 C26 8 20 12 28 14 C36 12 38 8 32 14 Z" fill="#EF4444" />
          </svg>
        );

      case 'toys_4': // Catnip Mouse
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="30" cy="50" rx="16" ry="5" fill="#CBD5E1" opacity="0.5" />
            <path d="M46 36 Q54 38 56 28 Q58 20 52 24" stroke="#F472B6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <ellipse cx="30" cy="36" rx="18" ry="12" fill="#A78BFA" />
            <ellipse cx="22" cy="26" rx="4" ry="6" fill="#F472B6" transform="rotate(-15 22 26)" />
            <circle cx="16" cy="34" r="1.8" fill="#1F2937" />
            <circle cx="12" cy="37" r="2.2" fill="#F43F5E" />
            <line x1="13" y1="35" x2="8" y2="33" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="13" y1="39" x2="8" y2="41" stroke="#CBD5E1" strokeWidth="1.5" />
          </svg>
        );

      case 'toys_5': // Laser Pointer
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <rect x="14" y="34" width="28" height="12" rx="4" transform="rotate(-30 28 40)" fill="#64748B" />
            <rect x="36" y="24" width="8" height="12" rx="2" transform="rotate(-30 40 30)" fill="#E2E8F0" />
            <circle cx="28" cy="34" r="2.5" fill="#EF4444" />
            <line x1="42" y1="21" x2="56" y2="12" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 2" />
            <circle cx="56" cy="12" r="5" fill="#EF4444" opacity="0.7" />
            <circle cx="56" cy="12" r="2.5" fill="#FEF08A" />
          </svg>
        );

      case 'toys_6': // Deluxe Cat Tree
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <rect x="10" y="52" width="44" height="6" rx="3" fill="#D97706" />
            <rect x="29" y="16" width="6" height="36" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
            <rect x="14" y="34" width="22" height="5" rx="2.5" fill="#FBBF24" />
            <rect x="22" y="14" width="26" height="5" rx="2.5" fill="#F472B6" />
            <line x1="38" y1="19" x2="38" y2="28" stroke="#94A3B8" strokeWidth="1" />
            <circle cx="38" cy="29" r="3" fill="#38BDF8" />
          </svg>
        );

      // --- CARE CHAIN ---
      case 'care_1': // Slicker Comb
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <line x1="20" y1="50" x2="32" y2="38" stroke="#F472B6" strokeWidth="5" strokeLinecap="round" />
            <rect x="26" y="18" width="22" height="16" rx="4" transform="rotate(-30 37 26)" fill="#F9A8D4" />
            <line x1="30" y1="14" x2="33" y2="8" stroke="#475569" strokeWidth="1.5" />
            <line x1="35" y1="16" x2="38" y2="10" stroke="#475569" strokeWidth="1.5" />
            <line x1="40" y1="19" x2="43" y2="13" stroke="#475569" strokeWidth="1.5" />
            <line x1="45" y1="22" x2="48" y2="16" stroke="#475569" strokeWidth="1.5" />
          </svg>
        );

      case 'care_2': // Paw Clipper
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="24" cy="46" rx="8" ry="5" transform="rotate(-30 24 46)" fill="#A7F3D0" stroke="#10B981" strokeWidth="2" />
            <ellipse cx="40" cy="46" rx="8" ry="5" transform="rotate(30 40 46)" fill="#A7F3D0" stroke="#10B981" strokeWidth="2" />
            <path d="M26 40 L32 20 L38 40" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
            <circle cx="32" cy="24" r="3" fill="#334155" />
          </svg>
        );

      case 'care_3': // Spray Bottle
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <rect x="20" y="26" width="24" height="30" rx="8" fill="#DDD6FE" stroke="#A78BFA" strokeWidth="1.5" />
            <rect x="26" y="18" width="12" height="8" rx="2" fill="#E2E8F0" />
            <path d="M28 18 L18 12 L18 8 L36 8 L36 18 Z" fill="#C084FC" />
            <path d="M18 14 L12 14" stroke="#C084FC" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="10" cy="10" r="1.5" fill="#38BDF8" />
            <circle cx="7" cy="14" r="1.2" fill="#38BDF8" />
            <circle cx="8" cy="18" r="1.5" fill="#38BDF8" />
          </svg>
        );

      case 'care_4': // Paw Balm Tin
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="50" rx="20" ry="6" fill="#E2E8F0" opacity="0.6" />
            <ellipse cx="32" cy="38" rx="20" ry="8" fill="#FDE047" />
            <rect x="12" y="30" width="40" height="8" fill="#FACC15" />
            <ellipse cx="32" cy="30" rx="20" ry="8" fill="#FEF08A" />
            <ellipse cx="32" cy="30" rx="14" ry="5.5" fill="#F472B6" />
            <circle cx="32" cy="30" r="2.5" fill="#FB7185" />
            <circle cx="28" cy="28" r="1.2" fill="#FB7185" />
            <circle cx="36" cy="28" r="1.2" fill="#FB7185" />
          </svg>
        );

      case 'care_5': // Fluffy Towel Robe
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <path d="M16 22 L24 14 L40 14 L48 22 L44 48 L20 48 Z" fill="#86EFAC" rx="6" />
            <path d="M24 14 L32 30 L40 14" stroke="#4ADE80" strokeWidth="2" fill="none" />
            <rect x="18" y="32" width="28" height="4" rx="2" fill="#22C55E" />
            <polygon points="24,14 22,8 28,12" fill="#4ADE80" />
            <polygon points="40,14 42,8 36,12" fill="#4ADE80" />
          </svg>
        );

      case 'care_6': // Cat Jacuzzi Spa
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="50" rx="22" ry="7" fill="#E2E8F0" opacity="0.6" />
            <path d="M10 32 C10 52 54 52 54 32 L50 28 L14 28 Z" fill="#BAE6FD" stroke="#38BDF8" strokeWidth="2" />
            <ellipse cx="32" cy="28" rx="20" ry="6" fill="#E0F2FE" />
            <circle cx="24" cy="24" r="4" fill="#FFFFFF" opacity="0.8" />
            <circle cx="30" cy="20" r="3" fill="#FFFFFF" opacity="0.8" />
            <circle cx="38" cy="23" r="4.5" fill="#FFFFFF" opacity="0.8" />
            <circle cx="24" cy="20" r="3" fill="#FBBF24" />
            <polygon points="21,20 18,21 21,22" fill="#F97316" />
          </svg>
        );

      // --- CATS & PAW CHAIN ---
      case 'cats_1': // Jelly Bean Paw Print
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="38" rx="14" ry="11" fill="#FB7185" />
            <ellipse cx="32" cy="36" rx="10" ry="7" fill="#FDA4AF" />
            <ellipse cx="19" cy="24" rx="5" ry="6.5" fill="#FB7185" transform="rotate(-20 19 24)" />
            <ellipse cx="27" cy="18" rx="5.5" ry="7" fill="#FB7185" transform="rotate(-6 27 18)" />
            <ellipse cx="37" cy="18" rx="5.5" ry="7" fill="#FB7185" transform="rotate(6 37 18)" />
            <ellipse cx="45" cy="24" rx="5" ry="6.5" fill="#FB7185" transform="rotate(20 45 24)" />
          </svg>
        );

      case 'cats_2': // Sleeping Baby Kitten
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="38" rx="18" ry="13" fill="#FDE2E4" stroke="#FFB6C1" strokeWidth="1.5" />
            <polygon points="18,28 15,20 22,23" fill="#FFB6C1" />
            <polygon points="26,24 28,16 33,22" fill="#FFB6C1" />
            <path d="M20 34 Q23 37 26 34" stroke="#4A4A4A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M48 38 Q52 30 46 28" stroke="#FFB6C1" strokeWidth="3" strokeLinecap="round" fill="none" />
            <text x="44" y="20" fontSize="10" fill="#93C5FD" fontWeight="900">z</text>
            <text x="50" y="14" fontSize="13" fill="#60A5FA" fontWeight="900">Z</text>
          </svg>
        );

      case 'cats_3': // Fluffy Kitten Thor (from Thor.jpeg)
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            {/* Fluffy body with brown tabby stripes */}
            <circle cx="32" cy="37" r="18" fill="#A89F91" />
            {/* Big white chest bib */}
            <path d="M22 36 C22 48 42 48 42 36 C38 46 26 46 22 36 Z" fill="#FFFFFF" />
            <ellipse cx="32" cy="38" rx="8" ry="6" fill="#FFFFFF" />
            {/* Ears with white fluff */}
            <polygon points="17,23 15,9 25,18" fill="#786F62" />
            <polygon points="18,21 17,13 23,18" fill="#F5F5F4" />
            <polygon points="47,23 49,9 39,18" fill="#786F62" />
            <polygon points="46,21 47,13 41,18" fill="#F5F5F4" />
            {/* Tabby forehead 'M' stripes */}
            <path d="M26 20 L29 25 L32 21 L35 25 L38 20" stroke="#44403C" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Big round curious eyes looking up (Thor's signature pose!) */}
            <ellipse cx="25" cy="30" rx="4.2" ry="4.5" fill="#292524" />
            <ellipse cx="39" cy="30" rx="4.2" ry="4.5" fill="#292524" />
            <circle cx="26" cy="28.5" r="1.6" fill="#FFFFFF" />
            <circle cx="40" cy="28.5" r="1.6" fill="#FFFFFF" />
            {/* Tiny cute nose looking up */}
            <polygon points="31,34 33,34 32,35.5" fill="#F43F5E" />
            {/* Whiskers */}
            <line x1="26" y1="35" x2="14" y2="33" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="38" y1="35" x2="50" y2="33" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        );

      case 'cats_4': // Lion Fluffy Loki (from Loki.jpeg)
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            {/* Giant fluffy orange lion mane */}
            <circle cx="32" cy="35" r="20" fill="#EA580C" />
            <circle cx="32" cy="35" r="17" fill="#F97316" />
            {/* White face blaze and chest mane */}
            <path d="M22 35 C20 48 44 48 42 35 C38 46 26 46 22 35 Z" fill="#FFFFFF" />
            <polygon points="30,22 32,36 34,22" fill="#FFFFFF" />
            <ellipse cx="32" cy="38" rx="8" ry="5" fill="#FFFFFF" />
            {/* Fluffy ears */}
            <polygon points="17,21 14,7 26,16" fill="#C2410C" />
            <polygon points="18,19 16,11 23,16" fill="#FED7AA" />
            <polygon points="47,21 50,7 38,16" fill="#C2410C" />
            <polygon points="46,19 48,11 41,16" fill="#FED7AA" />
            {/* Amber golden eyes */}
            <circle cx="24" cy="31" r="3.2" fill="#D97706" />
            <circle cx="40" cy="31" r="3.2" fill="#D97706" />
            <circle cx="24" cy="31" r="1.8" fill="#1C1917" />
            <circle cx="40" cy="31" r="1.8" fill="#1C1917" />
            <circle cx="25" cy="30" r="0.9" fill="#FFFFFF" />
            <circle cx="41" cy="30" r="0.9" fill="#FFFFFF" />
            {/* Pink nose & whiskers */}
            <polygon points="31,35 33,35 32,36.5" fill="#F43F5E" />
            <line x1="26" y1="36" x2="12" y2="35" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="38" y1="36" x2="52" y2="35" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        );

      case 'cats_5': // Prince Zorro Muda (from Zorro2.jpeg)
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <circle cx="32" cy="35" r="18" fill="#0F172A" />
            {/* White fluffy chest & muzzle */}
            <path d="M22 36 C22 47 42 47 42 36 C38 44 26 44 22 36 Z" fill="#FFFFFF" />
            <ellipse cx="32" cy="38" rx="7" ry="5" fill="#FFFFFF" />
            {/* Ears */}
            <polygon points="17,23 15,9 25,18" fill="#0F172A" />
            <polygon points="18,21 17,13 23,18" fill="#E2E8F0" />
            <polygon points="47,23 49,9 39,18" fill="#0F172A" />
            <polygon points="46,21 47,13 41,18" fill="#E2E8F0" />
            {/* Bright green-gold eyes */}
            <circle cx="25" cy="31" r="3" fill="#84CC16" />
            <circle cx="39" cy="31" r="3" fill="#84CC16" />
            <circle cx="25" cy="31" r="1.8" fill="#0F172A" />
            <circle cx="39" cy="31" r="1.8" fill="#0F172A" />
            {/* White paws */}
            <ellipse cx="24" cy="48" rx="4" ry="2.5" fill="#FFFFFF" />
            <ellipse cx="40" cy="48" rx="4" ry="2.5" fill="#FFFFFF" />
          </svg>
        );

      case 'cats_6': // LEGENDARY TUXEDO KING ZORRO! (from Zorro.jpeg)
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <circle cx="32" cy="34" r="22" fill="#FEF3C7" opacity="0.4" />
            <circle cx="32" cy="35" r="18" fill="#0F172A" />
            <path d="M22 38 C22 48 42 48 42 38 C38 45 26 45 22 38 Z" fill="#FFFFFF" />
            <path d="M28 35 C28 44 36 44 36 35 C34 41 30 41 28 35 Z" fill="#FFFFFF" />
            <ellipse cx="32" cy="39" rx="6.5" ry="4.5" fill="#FFFFFF" />
            <polygon points="17,24 14,8 26,17" fill="#0F172A" />
            <polygon points="19,21 16,13 23,17" fill="#E2E8F0" />
            <polygon points="47,24 50,8 38,17" fill="#0F172A" />
            <polygon points="45,21 48,13 41,17" fill="#E2E8F0" />
            <circle cx="24" cy="32" r="3" fill="#84CC16" />
            <circle cx="40" cy="32" r="3" fill="#84CC16" />
            <circle cx="24" cy="32" r="1.8" fill="#0F172A" />
            <circle cx="40" cy="32" r="1.8" fill="#0F172A" />
            <circle cx="25" cy="31" r="0.8" fill="#FFFFFF" />
            <circle cx="41" cy="31" r="0.8" fill="#FFFFFF" />
            <polygon points="31,37 33,37 32,38.5" fill="#0F172A" />
            <line x1="26" y1="38" x2="12" y2="36" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="26" y1="40" x2="13" y2="42" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="38" y1="38" x2="52" y2="36" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="38" y1="40" x2="51" y2="42" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            <polygon points="26,12 28,6 32,10 36,6 38,12" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
            <circle cx="32" cy="7" r="1" fill="#EF4444" />
          </svg>
        );

      // --- GENERATORS ---
      case 'gen_basket': // Cat Supply Basket
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="50" rx="20" ry="6" fill="#CBD5E1" opacity="0.6" />
            <path d="M18 34 C18 14 46 14 46 34" stroke="#D97706" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <path d="M12 32 L16 50 C16 52 48 52 48 50 L52 32 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
            <line x1="20" y1="32" x2="24" y2="50" stroke="#D97706" strokeWidth="1" />
            <line x1="32" y1="32" x2="32" y2="51" stroke="#D97706" strokeWidth="1" />
            <line x1="44" y1="32" x2="40" y2="50" stroke="#D97706" strokeWidth="1" />
            <line x1="14" y1="40" x2="50" y2="40" stroke="#D97706" strokeWidth="1" />
            <path d="M11 32 Q20 37 32 31 Q44 37 53 32 L51 30 L13 30 Z" fill="#F472B6" />
            <circle cx="32" cy="33" r="1.5" fill="#FFFFFF" />
          </svg>
        );

      case 'gen_box': // Cardboard Toy Box
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="52" rx="20" ry="6" fill="#CBD5E1" opacity="0.6" />
            <polygon points="12,28 32,36 52,28 32,20" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
            <polygon points="12,28 32,36 32,50 12,42" fill="#D97706" />
            <polygon points="52,28 32,36 32,50 52,42" fill="#B45309" />
            <polygon points="12,28 8,20 28,16 32,20" fill="#FBBF24" />
            <polygon points="52,28 56,20 36,16 32,20" fill="#F59E0B" />
            <circle cx="28" cy="22" r="2.2" fill="#10B981" />
            <circle cx="36" cy="22" r="2.2" fill="#10B981" />
            <circle cx="28" cy="22" r="1" fill="#064E3B" />
            <circle cx="36" cy="22" r="1" fill="#064E3B" />
          </svg>
        );

      case 'gen_gift': // Mystery Gift Box
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <ellipse cx="32" cy="52" rx="18" ry="5" fill="#FDA4AF" opacity="0.5" />
            <rect x="14" y="28" width="36" height="22" rx="4" fill="#FB7185" />
            <rect x="12" y="22" width="40" height="9" rx="3" fill="#F43F5E" />
            <rect x="29" y="22" width="6" height="28" fill="#FDE047" />
            <rect x="14" y="37" width="36" height="4" fill="#FDE047" />
            <ellipse cx="26" cy="18" rx="6" ry="4" transform="rotate(-25 26 18)" fill="#FACC15" />
            <ellipse cx="38" cy="18" rx="6" ry="4" transform="rotate(25 38 18)" fill="#FACC15" />
            <circle cx="32" cy="19" r="2.5" fill="#EAB308" />
            <polygon points="46,12 48,8 50,12 54,14 50,16 48,20 46,16 42,14" fill="#FEF08A" />
          </svg>
        );

      // --- BOOSTERS & SPECIAL ITEMS ---
      case 'booster_scissors': // Magic Scissors (Item Splitter)
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <circle cx="32" cy="32" r="22" fill="#E0F2FE" />
            {/* Scissor blade 1 */}
            <path d="M22 14 L34 32 L40 30 L26 12 Z" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
            <path d="M24 13 L33 30" stroke="#F1F5F9" strokeWidth="1" />
            {/* Scissor blade 2 */}
            <path d="M42 14 L30 32 L24 30 L38 12 Z" fill="#CBD5E1" stroke="#475569" strokeWidth="1" />
            {/* Center Pivot Screw */}
            <circle cx="32" cy="31" r="2.5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
            {/* Handle rings */}
            <circle cx="23" cy="46" r="7.5" fill="none" stroke="#0284C7" strokeWidth="3.5" />
            <circle cx="41" cy="46" r="7.5" fill="none" stroke="#0284C7" strokeWidth="3.5" />
            <path d="M28 39 L25 41" stroke="#0284C7" strokeWidth="3" />
            <path d="M36 39 L39 41" stroke="#0284C7" strokeWidth="3" />
            {/* Magic sparkles */}
            <polygon points="48,16 50,12 52,16 56,18 52,20 50,24 48,20 44,18" fill="#38BDF8" />
          </svg>
        );

      case 'booster_joker': // Magic Paw Wand (Wildcard Level Up)
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            {/* Shimmer Aura */}
            <circle cx="32" cy="32" r="23" fill="#FEF9C3" opacity="0.8" />
            {/* Magic Wand Stick */}
            <line x1="16" y1="48" x2="34" y2="30" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
            <line x1="16" y1="48" x2="22" y2="42" stroke="#CA8A04" strokeWidth="6" strokeLinecap="round" />
            {/* Star head with cat paw */}
            <circle cx="38" cy="24" r="14" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            <path d="M38 16 C34 16 33 21 34 23 C31 23 30 26 31 28 C33 30 36 30 38 30 C40 30 43 30 45 28 C46 26 45 23 42 23 C43 21 42 16 38 16 Z" fill="#FEF08A" />
            {/* Paw prints on wand */}
            <ellipse cx="38" cy="26" rx="4" ry="3" fill="#B45309" />
            <circle cx="34" cy="22" r="1.5" fill="#B45309" />
            <circle cx="38" cy="20.5" r="1.5" fill="#B45309" />
            <circle cx="42" cy="22" r="1.5" fill="#B45309" />
            {/* Little stars orbiting */}
            <polygon points="20,18 21,15 22,18 25,19 22,20 21,23 20,20 17,19" fill="#EAB308" />
            <polygon points="50,34 51,31 52,34 55,35 52,36 51,39 50,36 47,35" fill="#EAB308" />
          </svg>
        );

      case 'booster_hourglass': // Catnip Hourglass
        return (
          <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
            <circle cx="32" cy="32" r="22" fill="#FCE7F3" />
            {/* Top & Bottom wood frames */}
            <rect x="20" y="14" width="24" height="4" rx="2" fill="#DB2777" />
            <rect x="20" y="46" width="24" height="4" rx="2" fill="#DB2777" />
            <line x1="22" y1="18" x2="22" y2="46" stroke="#BE185D" strokeWidth="2" />
            <line x1="42" y1="18" x2="42" y2="46" stroke="#BE185D" strokeWidth="2" />
            {/* Glass hourglass */}
            <path d="M24 18 C24 28 38 28 38 18 Z" fill="#FBCFE8" stroke="#F472B6" strokeWidth="1" />
            <path d="M24 46 C24 36 38 36 38 46 Z" fill="#FBCFE8" stroke="#F472B6" strokeWidth="1" />
            {/* Sand particles */}
            <polygon points="27,24 35,24 32,29 29,29" fill="#EC4899" />
            <polygon points="28,44 34,44 36,41 26,41" fill="#EC4899" />
            <line x1="31" y1="29" x2="31" y2="40" stroke="#EC4899" strokeWidth="1" strokeDasharray="1 2" />
            {/* Cute cat ears on top frame */}
            <polygon points="22,14 25,9 28,14" fill="#DB2777" />
            <polygon points="36,14 39,9 42,14" fill="#DB2777" />
          </svg>
        );

      default:
        return <span style={{ fontSize: size * 0.7 }}>🐱</span>;
    }
  };

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ filter: isCobweb ? 'grayscale(0.6) opacity(0.85)' : 'none' }}>
        {renderIconContent()}
      </div>

      {/* Cobweb overlay (Piece of Cake style dusty locked items) */}
      {isCobweb && (
        <svg
          viewBox="0 0 64 64"
          width={size}
          height={size}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 5
          }}
        >
          {/* Radial cobweb spider web lines */}
          <line x1="8" y1="8" x2="56" y2="56" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.85" />
          <line x1="56" y1="8" x2="8" y2="56" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.85" />
          <line x1="32" y1="6" x2="32" y2="58" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.85" />
          <line x1="6" y1="32" x2="58" y2="32" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.85" />
          {/* Concentric rings */}
          <polygon points="32,16 44,24 48,32 44,40 32,48 20,40 16,32 20,24" stroke="#94A3B8" strokeWidth="1.2" fill="none" opacity="0.75" />
          <polygon points="32,22 39,26 42,32 39,38 32,42 25,38 22,32 25,26" stroke="#CBD5E1" strokeWidth="1.2" fill="none" opacity="0.85" />
          {/* Dusty Lock Icon in corner */}
          <circle cx="48" cy="16" r="6" fill="#475569" opacity="0.9" />
          <path d="M46 16 L46 13 C46 11.5 50 11.5 50 13 L50 16" stroke="#FDE047" strokeWidth="1.2" fill="none" />
          <rect x="45" y="15" width="6" height="5" rx="1" fill="#FDE047" />
        </svg>
      )}
    </div>
  );
}
