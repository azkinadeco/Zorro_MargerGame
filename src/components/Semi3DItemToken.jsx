import React from 'react';

// Semi-3D Vector Art for items that do not have dedicated mockup PNGs
function RenderSemi3DVector({ itemId, category, level }) {
  // Food Chain
  if (itemId === 'food_3') {
    // Churu Creamy Stick
    return (
      <svg width="80%" height="80%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="churuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="40%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>
          <linearGradient id="creamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="60%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <filter id="churuShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#4C0519" floodOpacity="0.4" />
          </filter>
        </defs>
        <g filter="url(#churuShadow)" transform="rotate(-25 32 32)">
          {/* Main Squeeze Tube */}
          <rect x="22" y="16" width="20" height="38" rx="6" fill="url(#churuGrad)" stroke="#FFE4E6" strokeWidth="1.5" />
          {/* Gold Top Seal */}
          <path d="M22 18 L42 18 L40 14 L24 14 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          {/* Paw Print on Tube */}
          <circle cx="32" cy="34" r="3.5" fill="#FFF" opacity="0.9" />
          <circle cx="28" cy="28" r="1.8" fill="#FFF" opacity="0.9" />
          <circle cx="36" cy="28" r="1.8" fill="#FFF" opacity="0.9" />
          <circle cx="26" cy="32" r="1.4" fill="#FFF" opacity="0.9" />
          <circle cx="38" cy="32" r="1.4" fill="#FFF" opacity="0.9" />
          {/* Creamy Swirl Droplet on Tip */}
          <path d="M32 6 C28 10 26 13 28 15 C30 17 34 17 36 15 C38 13 36 10 32 6 Z" fill="url(#creamGrad)" stroke="#D97706" strokeWidth="1" />
        </g>
      </svg>
    );
  }

  if (itemId === 'food_4') {
    // Gourmet Salmon Bowl
    return (
      <svg width="84%" height="84%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="salmonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>
        </defs>
        {/* Bowl Base */}
        <ellipse cx="32" cy="46" rx="22" ry="10" fill="url(#bowlGrad)" stroke="#92400E" strokeWidth="1.5" />
        <ellipse cx="32" cy="41" rx="20" ry="8" fill="#FFFBEB" />
        {/* Salmon Fillets */}
        <path d="M22 36 Q32 30 42 36 Q38 43 28 42 Z" fill="url(#salmonGrad)" stroke="#7F1D1D" strokeWidth="1" />
        <path d="M26 34 L30 40 M32 33 L36 39 M37 34 L40 38" stroke="#FEF2F2" strokeWidth="1" strokeLinecap="round" />
        {/* Herb Leaves */}
        <path d="M30 30 Q32 25 36 28 Q34 32 30 30 Z" fill="#10B981" stroke="#047857" strokeWidth="0.8" />
      </svg>
    );
  }

  if (itemId === 'food_5') {
    // Cat Milk Bottle & Biscuit
    return (
      <svg width="82%" height="82%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="50%" stopColor="rgba(240,249,255,0.6)" />
            <stop offset="100%" stopColor="rgba(186,230,253,0.8)" />
          </linearGradient>
          <linearGradient id="biscuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        {/* Milk Bottle */}
        <rect x="18" y="20" width="18" height="30" rx="5" fill="#FFF" stroke="#38BDF8" strokeWidth="1.5" />
        <rect x="22" y="14" width="10" height="6" rx="2" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
        <rect x="19" y="24" width="16" height="25" rx="3" fill="url(#glassGrad)" />
        {/* Blue Paw on Bottle */}
        <circle cx="27" cy="36" r="2.5" fill="#38BDF8" />
        {/* Fish Biscuit next to bottle */}
        <path d="M38 38 Q48 32 46 44 Q44 48 38 46 L34 49 L34 39 Z" fill="url(#biscuitGrad)" stroke="#B45309" strokeWidth="1.2" />
        <circle cx="43" cy="40" r="1" fill="#78350F" />
      </svg>
    );
  }

  if (itemId === 'food_6') {
    // Royal Cat Birthday Cake
    return (
      <svg width="84%" height="84%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="cakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="60%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#BE185D" />
          </linearGradient>
        </defs>
        {/* Cake Tier Base */}
        <ellipse cx="32" cy="46" rx="22" ry="9" fill="url(#cakeGrad)" stroke="#9D174D" strokeWidth="1.5" />
        <path d="M10 46 C10 52 54 52 54 46 L54 38 C54 44 10 44 10 38 Z" fill="#DB2777" stroke="#9D174D" strokeWidth="1" />
        <ellipse cx="32" cy="38" rx="22" ry="8" fill="#FDF2F8" stroke="#F472B6" strokeWidth="1" />
        {/* Cream Dollops */}
        <circle cx="20" cy="36" r="3" fill="#FFF" />
        <circle cx="32" cy="34" r="3" fill="#FFF" />
        <circle cx="44" cy="36" r="3" fill="#FFF" />
        {/* Candle with Glow */}
        <rect x="30" y="20" width="4" height="14" rx="1.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="0.8" />
        <path d="M32 10 Q35 15 32 18 Q29 15 32 10 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="0.8" />
      </svg>
    );
  }

  // Toys Chain
  if (itemId === 'toys_2') {
    // Feather Wand
    return (
      <svg width="82%" height="82%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="featherGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <linearGradient id="featherGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
        </defs>
        {/* Wand Stick */}
        <line x1="12" y1="52" x2="40" y2="24" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
        {/* Feathers */}
        <path d="M40 24 Q52 14 54 22 Q46 28 40 24 Z" fill="url(#featherGrad1)" stroke="#5B21B6" strokeWidth="1" />
        <path d="M40 24 Q48 10 50 16 Q44 24 40 24 Z" fill="url(#featherGrad2)" stroke="#9D174D" strokeWidth="1" />
        <circle cx="40" cy="24" r="2.5" fill="#F59E0B" />
      </svg>
    );
  }

  if (itemId === 'toys_3') {
    // Jingle Bell
    return (
      <svg width="80%" height="80%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <radialGradient id="bellGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FBBF24" />
            <stop offset="85%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </radialGradient>
        </defs>
        {/* Ribbon Bow */}
        <path d="M24 16 C20 10 32 10 32 18 C32 10 44 10 40 16 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
        {/* Golden Bell Sphere */}
        <circle cx="32" cy="34" r="16" fill="url(#bellGrad)" stroke="#B45309" strokeWidth="1.5" />
        {/* Bell Slit */}
        <line x1="22" y1="38" x2="42" y2="38" stroke="#451A03" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="38" r="3" fill="#451A03" />
      </svg>
    );
  }

  if (itemId === 'toys_4') {
    // Catnip Plush Mouse
    return (
      <svg width="82%" height="82%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="mouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="60%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
        </defs>
        {/* Tail */}
        <path d="M16 42 Q10 48 14 54 Q18 56 16 50" fill="none" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
        {/* Mouse Body */}
        <path d="M16 42 C16 30 36 28 48 38 C42 48 24 50 16 42 Z" fill="url(#mouseGrad)" stroke="#475569" strokeWidth="1.5" />
        {/* Ears */}
        <ellipse cx="32" cy="26" rx="4" ry="6" fill="#F472B6" stroke="#DB2777" strokeWidth="1" transform="rotate(-15 32 26)" />
        {/* Nose & Eye */}
        <circle cx="48" cy="38" r="2" fill="#F472B6" />
        <circle cx="40" cy="33" r="1.5" fill="#1E293B" />
        {/* Catnip Leaf */}
        <path d="M26 22 Q30 18 34 22 Q30 26 26 22 Z" fill="#10B981" stroke="#047857" strokeWidth="0.8" />
      </svg>
    );
  }

  if (itemId === 'toys_5') {
    // Laser Pointer
    return (
      <svg width="80%" height="80%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#B91C1C" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>
        </defs>
        {/* Laser Body Tube */}
        <rect x="22" y="24" width="30" height="12" rx="4" fill="url(#laserGrad)" stroke="#450A0A" strokeWidth="1.5" transform="rotate(-30 37 30)" />
        {/* Silver Ring */}
        <rect x="42" y="26" width="4" height="12" rx="1" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" transform="rotate(-30 44 32)" />
        {/* Laser Beam Flare */}
        <circle cx="16" cy="18" r="6" fill="#EF4444" opacity="0.4" />
        <circle cx="16" cy="18" r="3" fill="#F87171" />
        <circle cx="16" cy="18" r="1.5" fill="#FFF" />
      </svg>
    );
  }

  if (itemId === 'toys_6') {
    // Deluxe Cat Tree Tower
    return (
      <svg width="86%" height="86%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="treeWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="treePlush" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
        </defs>
        {/* Base Platform */}
        <ellipse cx="32" cy="54" rx="24" ry="7" fill="url(#treePlush)" stroke="#9D174D" strokeWidth="1.5" />
        {/* Center Sisal Scratch Post */}
        <rect x="28" y="22" width="8" height="30" rx="3" fill="url(#treeWood)" stroke="#78350F" strokeWidth="1.2" />
        <line x1="28" y1="28" x2="36" y2="28" stroke="#78350F" strokeWidth="1" />
        <line x1="28" y1="36" x2="36" y2="36" stroke="#78350F" strokeWidth="1" />
        <line x1="28" y1="44" x2="36" y2="44" stroke="#78350F" strokeWidth="1" />
        {/* Middle Perch Platform */}
        <ellipse cx="24" cy="34" rx="14" ry="5" fill="#FDF2F8" stroke="#DB2777" strokeWidth="1.2" />
        {/* Top Observation Castle Perch */}
        <rect x="18" y="14" width="28" height="10" rx="4" fill="url(#treePlush)" stroke="#9D174D" strokeWidth="1.5" />
        <circle cx="24" cy="14" r="3" fill="#FDF2F8" />
        <circle cx="40" cy="14" r="3" fill="#FDF2F8" />
        {/* Hanging Jingle Ball */}
        <line x1="38" y1="24" x2="38" y2="30" stroke="#F43F5E" strokeWidth="1" />
        <circle cx="38" cy="31" r="2.5" fill="#FBBF24" />
      </svg>
    );
  }

  // Care Chain
  if (itemId === 'care_1') {
    // Soft Grooming Comb
    return (
      <svg width="80%" height="80%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="combGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="60%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>
        </defs>
        {/* Handle */}
        <rect x="28" y="34" width="8" height="24" rx="4" fill="url(#combGrad)" stroke="#9A3412" strokeWidth="1.2" />
        {/* Comb Head */}
        <rect x="18" y="14" width="28" height="20" rx="5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
        {/* Bristles */}
        <line x1="22" y1="14" x2="22" y2="8" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="27" y1="14" x2="27" y2="8" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="32" y1="14" x2="32" y2="8" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="37" y1="14" x2="37" y2="8" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="42" y1="14" x2="42" y2="8" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (itemId === 'care_2') {
    // Paw Nail Clipper
    return (
      <svg width="80%" height="80%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="clipperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="70%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
        </defs>
        {/* Scissor Ring Left */}
        <circle cx="22" cy="48" r="8" fill="none" stroke="url(#clipperGrad)" strokeWidth="3.5" />
        {/* Scissor Ring Right */}
        <circle cx="42" cy="48" r="8" fill="none" stroke="url(#clipperGrad)" strokeWidth="3.5" />
        {/* Blades Crossing */}
        <path d="M22 40 L38 18 Q32 14 26 18 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.2" />
        <path d="M42 40 L26 18 Q32 14 38 18 Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.2" />
        {/* Center Pivot Stud */}
        <circle cx="32" cy="28" r="2.5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8" />
      </svg>
    );
  }

  if (itemId === 'care_3') {
    // Aromatherapy Spray Bottle
    return (
      <svg width="80%" height="80%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="sprayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="60%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>
        </defs>
        {/* Glass Bottle */}
        <rect x="22" y="24" width="20" height="28" rx="6" fill="url(#sprayGrad)" stroke="#581C87" strokeWidth="1.5" />
        {/* Neck */}
        <rect x="28" y="18" width="8" height="6" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
        {/* Pump Head */}
        <path d="M26 18 L26 14 Q32 10 38 14 L44 14" fill="none" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
        {/* Mist Droplets */}
        <circle cx="48" cy="12" r="1.5" fill="#38BDF8" />
        <circle cx="52" cy="14" r="1" fill="#38BDF8" />
        <circle cx="50" cy="17" r="1.2" fill="#38BDF8" />
      </svg>
    );
  }

  if (itemId === 'care_4') {
    // Moisturizing Paw Balm
    return (
      <svg width="82%" height="82%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="tinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <radialGradient id="balmCream" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="70%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </radialGradient>
        </defs>
        {/* Tin Can Body */}
        <ellipse cx="32" cy="44" rx="22" ry="10" fill="url(#tinGrad)" stroke="#78350F" strokeWidth="1.5" />
        <path d="M10 44 C10 52 54 52 54 44 L54 36 C54 44 10 44 10 36 Z" fill="#D97706" stroke="#78350F" strokeWidth="1" />
        {/* Cream Inner Top */}
        <ellipse cx="32" cy="36" rx="22" ry="9" fill="url(#balmCream)" stroke="#B45309" strokeWidth="1.2" />
        {/* Embossed Paw Print */}
        <ellipse cx="32" cy="37" rx="5" ry="3.5" fill="#FB7185" />
        <circle cx="27" cy="32" r="2" fill="#FB7185" />
        <circle cx="32" cy="30" r="2.2" fill="#FB7185" />
        <circle cx="37" cy="32" r="2" fill="#FB7185" />
      </svg>
    );
  }

  if (itemId === 'care_5') {
    // Warm Fluffy Robe
    return (
      <svg width="84%" height="84%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="robeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="60%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
        </defs>
        {/* Robe Body */}
        <path d="M20 18 L12 36 L18 38 L24 28 L24 52 L40 52 L40 28 L46 38 L52 36 L44 18 Z" fill="url(#robeGrad)" stroke="#065F46" strokeWidth="1.5" />
        {/* Fluffy Collar V-Neck */}
        <path d="M20 18 L32 36 L44 18 L38 14 L32 24 L26 14 Z" fill="#FFFBEB" stroke="#D1D5DB" strokeWidth="1" />
        {/* Belt Ribbon */}
        <rect x="22" y="36" width="20" height="4" rx="2" fill="#F472B6" stroke="#DB2777" strokeWidth="0.8" />
        <circle cx="32" cy="38" r="2" fill="#BE185D" />
      </svg>
    );
  }

  if (itemId === 'care_6') {
    // Aesthetic Cat Jacuzzi Tub
    return (
      <svg width="86%" height="86%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="tubGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
        </defs>
        {/* 4 Golden Claw Feet */}
        <circle cx="16" cy="52" r="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
        <circle cx="48" cy="52" r="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
        {/* Tub Outer Shell */}
        <path d="M10 26 C10 46 20 50 32 50 C44 50 54 46 54 26 Z" fill="url(#tubGrad)" stroke="#0284C7" strokeWidth="1.5" />
        {/* Tub Rim */}
        <ellipse cx="32" cy="26" rx="23" ry="8" fill="url(#tubGrad)" stroke="#0284C7" strokeWidth="1.5" />
        {/* Lavender Bubbly Water */}
        <ellipse cx="32" cy="27" rx="20" ry="6" fill="url(#waterGrad)" />
        {/* Rubber Duck */}
        <circle cx="36" cy="23" r="3" fill="#FBBF24" />
        <circle cx="38" cy="22" r="2" fill="#F59E0B" />
        <polygon points="40,22 43,23 40,24" fill="#EA580C" />
        {/* Bubbles */}
        <circle cx="24" cy="25" r="2" fill="#FFF" opacity="0.8" />
        <circle cx="28" cy="23" r="1.5" fill="#FFF" opacity="0.8" />
        <circle cx="20" cy="27" r="1" fill="#FFF" opacity="0.8" />
      </svg>
    );
  }

  // Energy Chain
  if (itemId === 'energy_1') {
    // Mini Energy Spark
    return (
      <svg width="84%" height="84%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="sparkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <path d="M32 8 L36 24 L52 28 L38 36 L44 54 L32 40 L20 54 L26 36 L12 28 L28 24 Z" fill="url(#sparkGrad)" stroke="#B45309" strokeWidth="1.5" />
        <circle cx="32" cy="32" r="4" fill="#FFF" />
      </svg>
    );
  }

  if (itemId === 'energy_2') {
    // Energy Potion Flask
    return (
      <svg width="82%" height="82%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <radialGradient id="potionLiquid" cx="40%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </radialGradient>
        </defs>
        {/* Cork Stopper */}
        <rect x="28" y="10" width="8" height="6" rx="1.5" fill="#92400E" stroke="#78350F" strokeWidth="1" />
        {/* Flask Neck */}
        <rect x="29" y="16" width="6" height="8" fill="rgba(255,255,255,0.7)" stroke="#CA8A04" strokeWidth="1" />
        {/* Spherical Flask Base */}
        <circle cx="32" cy="38" r="16" fill="url(#potionLiquid)" stroke="#CA8A04" strokeWidth="1.5" />
        {/* Glass Sheen */}
        <path d="M22 30 Q28 26 36 28" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
        {/* Glowing Lightning inside */}
        <path d="M33 30 L28 38 L33 38 L31 46 L37 36 L33 36 Z" fill="#FFF" />
      </svg>
    );
  }

  if (itemId === 'energy_3') {
    // Energy Crystal Orb
    return (
      <svg width="84%" height="84%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <radialGradient id="orbGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF" />
            <stop offset="30%" stopColor="#67E8F9" />
            <stop offset="70%" stopColor="#0891B2" />
            <stop offset="100%" stopColor="#164E63" />
          </radialGradient>
        </defs>
        {/* Outer Golden Halo */}
        <circle cx="32" cy="32" r="20" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" />
        {/* Cyan Orb */}
        <circle cx="32" cy="32" r="17" fill="url(#orbGrad)" stroke="#0E7490" strokeWidth="1.5" />
        {/* Lightning Glyph inside */}
        <path d="M34 18 L26 31 L32 31 L30 44 L39 30 L33 30 Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="0.8" />
      </svg>
    );
  }

  if (itemId === 'energy_4') {
    // Star Cat Sun Elixir
    return (
      <svg width="86%" height="86%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <radialGradient id="sunElixirGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FBBF24" />
            <stop offset="80%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>
        </defs>
        {/* Radiant Sun Rays */}
        <circle cx="32" cy="32" r="22" fill="none" stroke="#FDE047" strokeWidth="2" strokeDasharray="6 3" />
        {/* Angelic Cat Wing Left */}
        <path d="M16 32 C10 26 12 18 20 22 C18 26 16 30 16 32 Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
        {/* Angelic Cat Wing Right */}
        <path d="M48 32 C54 26 52 18 44 22 C46 26 48 30 48 32 Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
        {/* Octagonal Crystal Bottle */}
        <polygon points="26,16 38,16 46,24 46,40 38,48 26,48 18,40 18,24" fill="url(#sunElixirGrad)" stroke="#78350F" strokeWidth="1.5" />
        {/* Shining Star in Center */}
        <path d="M32 24 L34 29 L39 30 L35 34 L36 39 L32 36 L28 39 L29 34 L25 30 L30 29 Z" fill="#FFF" />
      </svg>
    );
  }

  // Coins Chain
  if (itemId === 'coins_1') {
    // Bronze Coin Pile
    return (
      <svg width="80%" height="80%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="bronzeCoin" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="60%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
        </defs>
        {/* Coin 1 Bottom */}
        <ellipse cx="32" cy="46" rx="18" ry="7" fill="url(#bronzeCoin)" stroke="#7C2D12" strokeWidth="1.2" />
        {/* Coin 2 Middle */}
        <ellipse cx="32" cy="38" rx="18" ry="7" fill="url(#bronzeCoin)" stroke="#7C2D12" strokeWidth="1.2" />
        {/* Coin 3 Top */}
        <ellipse cx="32" cy="30" rx="18" ry="7" fill="url(#bronzeCoin)" stroke="#7C2D12" strokeWidth="1.2" />
        {/* Paw Print on Top Coin */}
        <circle cx="32" cy="30" r="3" fill="#FFF" opacity="0.9" />
        <circle cx="28" cy="27" r="1.3" fill="#FFF" opacity="0.9" />
        <circle cx="36" cy="27" r="1.3" fill="#FFF" opacity="0.9" />
      </svg>
    );
  }

  if (itemId === 'coins_2') {
    // Silver Coin Sack
    return (
      <svg width="82%" height="82%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="sackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="60%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>
        {/* Sack Body */}
        <path d="M22 22 C14 26 12 48 20 54 C28 58 36 58 44 54 C52 48 50 26 42 22 Z" fill="url(#sackGrad)" stroke="#334155" strokeWidth="1.5" />
        {/* Rope Tie */}
        <ellipse cx="32" cy="22" rx="10" ry="3" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
        {/* Pouch Flaps */}
        <path d="M22 22 L24 14 L32 17 L40 14 L42 22 Z" fill="#CBD5E1" stroke="#334155" strokeWidth="1" />
        {/* Silver Coin Emblem */}
        <circle cx="32" cy="38" r="6" fill="#F1F5F9" stroke="#64748B" strokeWidth="1" />
        <text x="32" y="42" textAnchor="middle" fontSize="10" fontWeight="900" fill="#475569">🪙</text>
      </svg>
    );
  }

  if (itemId === 'coins_3') {
    // Gold Coin Stash & Ingots
    return (
      <svg width="84%" height="84%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="goldBar" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        {/* Bottom Gold Ingot */}
        <polygon points="18,48 46,48 52,40 12,40" fill="url(#goldBar)" stroke="#78350F" strokeWidth="1.2" />
        {/* Top Gold Ingot */}
        <polygon points="24,38 40,38 44,30 20,30" fill="url(#goldBar)" stroke="#78350F" strokeWidth="1.2" />
        {/* Gold Coins Around */}
        <ellipse cx="48" cy="48" rx="8" ry="4" fill="#FBBF24" stroke="#92400E" strokeWidth="1" />
        <ellipse cx="16" cy="48" rx="8" ry="4" fill="#FBBF24" stroke="#92400E" strokeWidth="1" />
        {/* Ruby Jewel Accent */}
        <polygon points="32,18 38,24 32,30 26,24" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
      </svg>
    );
  }

  if (itemId === 'coins_4') {
    // Royal Cat Treasure Chest
    return (
      <svg width="86%" height="86%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="chestWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="50%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>
          <linearGradient id="chestGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        {/* Chest Base */}
        <rect x="12" y="32" width="40" height="22" rx="4" fill="url(#chestWood)" stroke="#291202" strokeWidth="1.5" />
        {/* Gold Corner Trim */}
        <rect x="12" y="32" width="6" height="22" fill="url(#chestGold)" stroke="#78350F" strokeWidth="0.8" />
        <rect x="46" y="32" width="6" height="22" fill="url(#chestGold)" stroke="#78350F" strokeWidth="0.8" />
        {/* Overflowing Gold & Jewels inside */}
        <ellipse cx="32" cy="30" rx="18" ry="7" fill="#FDE047" />
        <circle cx="26" cy="27" r="3" fill="#FBBF24" />
        <circle cx="34" cy="26" r="3.5" fill="#FBBF24" />
        <circle cx="38" cy="28" r="2.5" fill="#38BDF8" />
        <circle cx="22" cy="29" r="2.5" fill="#EF4444" />
        {/* Chest Lid (Tilted Open) */}
        <path d="M10 24 C10 14 54 14 54 24 L52 30 C52 20 12 20 12 30 Z" fill="url(#chestWood)" stroke="#291202" strokeWidth="1.5" />
        <rect x="29" y="34" width="6" height="8" rx="2" fill="url(#chestGold)" stroke="#78350F" strokeWidth="1" />
      </svg>
    );
  }

  // Generators / Spawners
  if (itemId === 'gen_basket' || itemId === 'gen_basket_2') {
    return (
      <svg width="86%" height="86%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="basketWicker" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="60%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
        </defs>
        {/* Arched Woven Handle */}
        <path d="M18 36 C18 12 46 12 46 36" fill="none" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
        {/* Basket Body */}
        <path d="M14 30 L18 52 C18 55 46 55 46 52 L50 30 Z" fill="url(#basketWicker)" stroke="#7C2D12" strokeWidth="1.5" />
        {/* Woven Cross Lines */}
        <line x1="16" y1="36" x2="48" y2="36" stroke="#7C2D12" strokeWidth="1" />
        <line x1="17" y1="42" x2="47" y2="42" stroke="#7C2D12" strokeWidth="1" />
        <line x1="18" y1="48" x2="46" y2="48" stroke="#7C2D12" strokeWidth="1" />
        {/* Red Checkered Gingham Cloth Rim */}
        <ellipse cx="32" cy="30" rx="20" ry="6" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
        {/* Golden Cat Paw Tag */}
        <circle cx="32" cy="38" r="4" fill="#FBBF24" stroke="#B45309" strokeWidth="0.8" />
      </svg>
    );
  }

  if (itemId === 'gen_box' || itemId === 'gen_box_2') {
    return (
      <svg width="86%" height="86%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="cardboardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="50%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>
        </defs>
        {/* Box Front Face */}
        <rect x="14" y="26" width="36" height="28" rx="3" fill="url(#cardboardGrad)" stroke="#7C2D12" strokeWidth="1.5" />
        {/* Box Flap Left */}
        <polygon points="14,26 8,16 26,20 26,26" fill="#FDBA74" stroke="#7C2D12" strokeWidth="1.2" />
        {/* Box Flap Right */}
        <polygon points="50,26 56,16 38,20 38,26" fill="#FDBA74" stroke="#7C2D12" strokeWidth="1.2" />
        {/* Peekaboo Cat Ears Inside */}
        <polygon points="26,22 29,14 33,22" fill="#1E293B" />
        <polygon points="31,22 35,14 38,22" fill="#1E293B" />
        {/* Packing Tape */}
        <rect x="29" y="26" width="6" height="28" fill="#FDE68A" stroke="#CA8A04" strokeWidth="0.8" opacity="0.85" />
        {/* Stencil Fish Logo */}
        <ellipse cx="32" cy="44" rx="4" ry="2" fill="#7C2D12" />
        <polygon points="36,44 39,42 39,46" fill="#7C2D12" />
      </svg>
    );
  }

  // Mystery Gift Box / Meow Package
  if (itemId === 'gift_box' || itemId === 'mystery_box') {
    return (
      <svg width="86%" height="86%" viewBox="0 0 64 64" className="semi-3d-sprite cat-breathe">
        <defs>
          <linearGradient id="boxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="60%" stopColor="#DB2777" />
            <stop offset="100%" stopColor="#9D174D" />
          </linearGradient>
          <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        {/* Gift Box Base */}
        <rect x="14" y="26" width="36" height="28" rx="6" fill="url(#boxGrad)" stroke="#831843" strokeWidth="1.5" />
        {/* Lid */}
        <rect x="11" y="20" width="42" height="10" rx="3" fill="#EC4899" stroke="#831843" strokeWidth="1.5" />
        {/* Vertical Gold Ribbon */}
        <rect x="29" y="20" width="6" height="34" fill="url(#ribbonGrad)" stroke="#B45309" strokeWidth="0.8" />
        {/* Horizontal Gold Ribbon */}
        <rect x="11" y="23" width="42" height="4" fill="url(#ribbonGrad)" stroke="#B45309" strokeWidth="0.8" />
        {/* Ribbon Bow on Top */}
        <path d="M22 14 C16 8 30 10 32 18 C34 10 48 8 42 14 C36 18 28 18 22 14 Z" fill="url(#ribbonGrad)" stroke="#92400E" strokeWidth="1" />
        <circle cx="32" cy="18" r="2.5" fill="#FEF08A" />
      </svg>
    );
  }

  // --- SPECIAL BOOSTER TOKENS ---
  if (itemId === 'booster_scissors') {
    return (
      <svg width="88%" height="88%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="50%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id="scisHandleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <filter id="glowScis" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#38BDF8" floodOpacity="0.7" />
          </filter>
        </defs>
        {/* Scissor Blades crossing */}
        <g filter="url(#glowScis)">
          <path d="M16 10 L32 30 L28 34 L12 12 Z" fill="url(#bladeGrad)" stroke="#0284C7" strokeWidth="1.2" />
          <path d="M48 10 L32 30 L36 34 L52 12 Z" fill="url(#bladeGrad)" stroke="#0284C7" strokeWidth="1.2" />
        </g>
        {/* Central Pivot Jewel Screw */}
        <circle cx="32" cy="30" r="4.5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.2" />
        <circle cx="30.5" cy="28.5" r="1.5" fill="#FFF" />
        {/* Golden Cat-eared Handles */}
        <circle cx="20" cy="46" r="10" fill="none" stroke="url(#scisHandleGrad)" strokeWidth="4.5" />
        <circle cx="44" cy="46" r="10" fill="none" stroke="url(#scisHandleGrad)" strokeWidth="4.5" />
        {/* Handle connectors */}
        <line x1="28" y1="34" x2="22" y2="39" stroke="url(#scisHandleGrad)" strokeWidth="4" strokeLinecap="round" />
        <line x1="36" y1="34" x2="42" y2="39" stroke="url(#scisHandleGrad)" strokeWidth="4" strokeLinecap="round" />
        {/* Sparkle glint */}
        <path d="M16 8 L18 12 L22 14 L18 16 L16 20 L14 16 L10 14 L14 12 Z" fill="#FFF" opacity="0.9" />
      </svg>
    );
  }

  if (itemId === 'booster_joker') {
    return (
      <svg width="88%" height="88%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="wandStaffGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="pawStarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="50%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#E11D48" />
          </linearGradient>
          <filter id="wandGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.8" />
          </filter>
        </defs>
        {/* Golden Magic Wand Shaft */}
        <line x1="16" y1="52" x2="36" y2="28" stroke="url(#wandStaffGrad)" strokeWidth="5.5" strokeLinecap="round" filter="url(#wandGlow)" />
        <line x1="16" y1="52" x2="36" y2="28" stroke="#78350F" strokeWidth="1" strokeDasharray="3 3" />
        {/* Star Burst Backing */}
        <polygon points="42,8 46,18 56,18 48,24 51,34 42,28 33,34 36,24 28,18 38,18" fill="#FBBF24" stroke="#D97706" strokeWidth="1.2" />
        {/* Glowing Pink Crystal Paw Head */}
        <ellipse cx="42" cy="22" rx="7" ry="6" fill="url(#pawStarGrad)" stroke="#881337" strokeWidth="1" />
        <circle cx="36" cy="14" r="2.5" fill="url(#pawStarGrad)" stroke="#881337" strokeWidth="0.8" />
        <circle cx="41" cy="11" r="2.8" fill="url(#pawStarGrad)" stroke="#881337" strokeWidth="0.8" />
        <circle cx="47" cy="13" r="2.5" fill="url(#pawStarGrad)" stroke="#881337" strokeWidth="0.8" />
        {/* Magic Sparkles */}
        <circle cx="22" cy="20" r="2" fill="#FFF" opacity="0.9" />
        <circle cx="52" cy="42" r="1.5" fill="#FEF08A" />
      </svg>
    );
  }

  if (itemId === 'booster_hourglass') {
    return (
      <svg width="88%" height="88%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="frameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FED7AA" />
            <stop offset="50%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#7C2D12" />
          </linearGradient>
          <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(186,230,253,0.3)" />
          </linearGradient>
        </defs>
        {/* Top & Bottom Wooden Cat Caps */}
        <path d="M18 14 L22 8 L26 12 L38 12 L42 8 L46 14 Z" fill="url(#frameGrad)" stroke="#431407" strokeWidth="1.2" />
        <rect x="16" y="14" width="32" height="4" rx="2" fill="url(#frameGrad)" stroke="#431407" strokeWidth="1.2" />
        <rect x="16" y="46" width="32" height="4" rx="2" fill="url(#frameGrad)" stroke="#431407" strokeWidth="1.2" />
        {/* Hourglass Glass Bulb */}
        <path d="M22 18 C22 28 28 32 32 32 C36 32 42 28 42 18 Z M22 46 C22 36 28 32 32 32 C36 32 42 36 42 46 Z" fill="url(#glassGrad)" stroke="#0284C7" strokeWidth="1.2" />
        {/* Glowing Emerald Catnip Sand */}
        <path d="M25 21 C26 27 30 29 32 30 C34 29 38 27 39 21 Z" fill="url(#sandGrad)" />
        <path d="M24 45 C25 41 29 38 32 38 C35 38 39 41 40 45 Z" fill="url(#sandGrad)" />
        {/* Falling Sand Stream */}
        <line x1="32" y1="30" x2="32" y2="40" stroke="#34D399" strokeWidth="1.5" strokeDasharray="1 1" />
        {/* Outer Wooden Columns */}
        <line x1="19" y1="18" x2="19" y2="46" stroke="url(#frameGrad)" strokeWidth="2.5" />
        <line x1="45" y1="18" x2="45" y2="46" stroke="url(#frameGrad)" strokeWidth="2.5" />
      </svg>
    );
  }

  if (itemId === 'gen_basket' || itemId === 'gen_basket_2') {
    const isLv2 = itemId === 'gen_basket_2';
    return (
      <svg width="88%" height="88%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="basketWicker" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isLv2 ? '#FDE68A' : '#FED7AA'} />
            <stop offset="50%" stopColor={isLv2 ? '#F59E0B' : '#EA580C'} />
            <stop offset="100%" stopColor={isLv2 ? '#B45309' : '#9A3412'} />
          </linearGradient>
          <linearGradient id="clothGingham" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="50%" stopColor="#FFE4E6" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>
        </defs>
        {/* Basket Handle Arc */}
        <path d="M18 28 C18 10 46 10 46 28" fill="none" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M18 28 C18 10 46 10 46 28" fill="none" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
        {/* Basket Woven Body */}
        <path d="M12 28 L52 28 L46 52 C45 55 19 55 18 52 Z" fill="url(#basketWicker)" stroke="#451A03" strokeWidth="1.5" />
        {/* Woven Texture Lines */}
        <line x1="16" y1="36" x2="48" y2="36" stroke="#78350F" strokeWidth="1.2" strokeDasharray="4 2" />
        <line x1="18" y1="44" x2="46" y2="44" stroke="#78350F" strokeWidth="1.2" strokeDasharray="4 2" />
        {/* Picnic Cloth Trim */}
        <path d="M10 26 Q18 33 24 26 Q32 33 40 26 Q46 33 54 26 L52 23 L12 23 Z" fill="url(#clothGingham)" stroke="#881337" strokeWidth="1.2" />
        {/* Lv.2 Golden Crown Star */}
        {isLv2 && <circle cx="32" cy="40" r="5" fill="#FEF08A" stroke="#B45309" strokeWidth="1.2" />}
      </svg>
    );
  }

  if (itemId === 'gen_box' || itemId === 'gen_box_2') {
    const isLv2 = itemId === 'gen_box_2';
    return (
      <svg width="88%" height="88%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="boxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isLv2 ? '#DDD6FE' : '#FDE68A'} />
            <stop offset="55%" stopColor={isLv2 ? '#A855F7' : '#D97706'} />
            <stop offset="100%" stopColor={isLv2 ? '#6B21A8' : '#92400E'} />
          </linearGradient>
        </defs>
        {/* Peeking Cat Ears inside Box */}
        <polygon points="22,24 25,13 31,22" fill="#1E293B" stroke="#F8FAFC" strokeWidth="1" />
        <polygon points="42,24 39,13 33,22" fill="#1E293B" stroke="#F8FAFC" strokeWidth="1" />
        {/* Box Flaps */}
        <polygon points="12,26 20,19 32,24 14,30" fill="#FBBF24" stroke="#78350F" strokeWidth="1.2" />
        <polygon points="52,26 44,19 32,24 50,30" fill="#FBBF24" stroke="#78350F" strokeWidth="1.2" />
        {/* Box Main Cube */}
        <rect x="14" y="26" width="36" height="26" rx="4" fill="url(#boxGrad)" stroke="#451A03" strokeWidth="1.5" />
        {/* Cute Paw Emblem on Box */}
        <circle cx="32" cy="41" r="4.5" fill="#FFF" opacity="0.9" />
        <circle cx="27" cy="35" r="2" fill="#FFF" opacity="0.9" />
        <circle cx="32" cy="33" r="2" fill="#FFF" opacity="0.9" />
        <circle cx="37" cy="35" r="2" fill="#FFF" opacity="0.9" />
      </svg>
    );
  }

  if (itemId === 'gen_gift' || itemId === 'spawner_chest') {
    return (
      <svg width="88%" height="88%" viewBox="0 0 64 64" className="semi-3d-sprite">
        <defs>
          <linearGradient id="giftBoxGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="50%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>
        </defs>
        {/* Ribbon Loops */}
        <path d="M32 22 C20 10 16 22 30 24" fill="none" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M32 22 C44 10 48 22 34 24" fill="none" stroke="#FBBF24" strokeWidth="3.5" strokeLinecap="round" />
        {/* Gift Box Body */}
        <rect x="14" y="26" width="36" height="26" rx="4" fill="url(#giftBoxGrad)" stroke="#881337" strokeWidth="1.5" />
        {/* Gift Lid */}
        <rect x="12" y="21" width="40" height="7" rx="2.5" fill="#F43F5E" stroke="#881337" strokeWidth="1.5" />
        {/* Golden Cross Ribbons */}
        <rect x="29" y="21" width="6" height="31" fill="#FBBF24" />
        <rect x="14" y="36" width="36" height="5" fill="#FBBF24" />
      </svg>
    );
  }

  // Generic fallback with category symbol
  return (
    <div className="semi-3d-sprite" style={{ fontSize: '30px', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.25))' }}>
      {category === 'food' ? '🍲' : category === 'toys' ? '🧶' : category === 'care' ? '✂️' : category === 'coins' ? '🪙' : category === 'energy' ? '⚡' : '🐾'}
    </div>
  );
}

export function Semi3DItemToken({
  item,
  isSelected = false,
  hasMergePartner = false,
  isMagneticTarget = false,
  showLevelBadge = true,
  size = '100%'
}) {
  if (!item) return null;

  // Determine mockup PNG sprite if available
  const getMockupSprite = (it) => {
    if (!it) return null;
    if (it.id === 'toys_1') return '/ui/sprites/yarn_ball.png';
    if (it.id === 'food_1') return '/ui/sprites/bowl_pink.png';
    if (it.id === 'food_2') return '/ui/sprites/bowl_blue.png';
    if (it.id === 'cats_1') return '/ui/sprites/paw_lv1.png';
    if (it.id === 'cats_2') return '/ui/sprites/kitten_sleeping.png';
    if (it.id === 'cats_3') return '/ui/sprites/cat_thor_tabby.png';
    if (it.id === 'cats_4') return '/ui/sprites/cat_loki_orange.png';
    if (it.id === 'cats_5') return '/ui/sprites/cat_calico.png';
    if (it.id === 'cats_6') return '/ui/sprites/cat_zorro_tuxedo.png';
    return null;
  };

  const spriteSrc = getMockupSprite(item);
  const categoryRimClass = `semi-3d-rim-${item.category || 'cats'}`;
  const isCat = item.category === 'cats';

  return (
    <div
      className={`semi-3d-token ${categoryRimClass} ${isMagneticTarget ? 'magnetic-target-glow' : ''}`}
      style={{
        width: size,
        height: size,
        boxShadow: isSelected
          ? '0 0 16px rgba(245, 158, 11, 0.9), 0 4.5px 0 #D97706, inset 0 2px 2px #FFF'
          : isMagneticTarget
          ? '0 0 20px rgba(52, 211, 153, 0.95), 0 4.5px 0 #059669, inset 0 2px 2px #FFF'
          : undefined,
        transform: isMagneticTarget ? 'scale(1.12)' : undefined,
        transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease'
      }}
    >
      {/* Specular 3D Gloss Highlight Arc */}
      <div className="semi-3d-token-gloss" />

      {/* Collectible Token Floor Shadow */}
      <div className="token-floor-shadow" />

      {/* Render High-Fidelity Sprite or Semi-3D Vector */}
      {spriteSrc ? (
        <img
          src={spriteSrc}
          alt={item.name}
          className={`semi-3d-sprite ${isCat ? 'cat-breathe' : ''}`}
          style={{
            width: isCat ? '80%' : '74%',
            height: isCat ? '80%' : '74%',
            objectFit: 'contain',
            pointerEvents: 'none'
          }}
        />
      ) : (
        <RenderSemi3DVector
          itemId={item.id}
          category={item.category}
          level={item.level}
        />
      )}

      {/* Semi-3D Gold Coin Level Badge */}
      {showLevelBadge && (
        <div className="semi-3d-level-badge" title={`Level ${item.level || 1}`}>
          {item.level || 1}
        </div>
      )}

      {/* Golden Sparkle Glow if Mergeable Partner */}
      {hasMergePartner && !isSelected && !isMagneticTarget && (
        <div style={{
          position: 'absolute',
          top: '-2px',
          right: '-2px',
          fontSize: '11px',
          animation: 'sparkleGlow 1.8s infinite',
          pointerEvents: 'none',
          zIndex: 6
        }}>
          ✨
        </div>
      )}

      {/* Magnetic Attraction Ring */}
      {isMagneticTarget && (
        <div style={{
          position: 'absolute',
          inset: '-4px',
          borderRadius: '50%',
          border: '2.5px dashed #10B981',
          animation: 'rotateSpark 3s linear infinite',
          pointerEvents: 'none',
          zIndex: 7
        }} />
      )}

      {/* Piece of Cake Style On-Board Generator Lightning Bolt & Charge/Cooldown Badge */}
      {item.isGenerator && (
        <div
          style={{
            position: 'absolute',
            top: '-3px',
            left: '-3px',
            minWidth: '19px',
            height: '19px',
            padding: '0 4px',
            borderRadius: '10px',
            background: item.isDepleted
              ? 'linear-gradient(135deg, #64748B, #334155)'
              : 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 60%, #B45309 100%)',
            border: '1.5px solid #FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '8.5px',
            fontWeight: '900',
            color: item.isDepleted ? '#F8FAFC' : '#451A03',
            boxShadow: '0 2px 5px rgba(0,0,0,0.45)',
            zIndex: 9,
            pointerEvents: 'none'
          }}
          title={item.isDepleted ? 'Generator sedang isi ulang' : 'Generator Aktif! Ketuk untuk mengeluarkan item'}
        >
          {item.isDepleted
            ? `⏳${item.cooldownUntil ? Math.max(1, Math.ceil((item.cooldownUntil - Date.now()) / 1000)) + 's' : ''}`
            : `⚡${item.chargesLeft ?? (item.level >= 2 ? 18 : 10)}`}
        </div>
      )}

      {/* Piece of Cake Style Magic Soap Bubble Overlay */}
      {item.isBubble && (
        <div style={{
          position: 'absolute',
          inset: '-3px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.72) 0%, rgba(56, 189, 248, 0.28) 45%, rgba(236, 72, 153, 0.32) 78%, rgba(168, 85, 247, 0.45) 100%)',
          border: '2px solid rgba(255, 255, 255, 0.88)',
          boxShadow: '0 0 12px rgba(56, 189, 248, 0.65), inset 0 2px 6px rgba(255, 255, 255, 0.9)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          zIndex: 8,
          pointerEvents: 'none',
          animation: 'pulseReady 1.8s infinite'
        }}>
          {/* Bubble Specular Shine */}
          <div style={{
            position: 'absolute',
            top: '6px',
            left: '9px',
            width: '12px',
            height: '6px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            transform: 'rotate(-28deg)'
          }} />
          <div style={{
            position: 'absolute',
            top: '-4px',
            left: '-4px',
            background: 'linear-gradient(135deg, #38BDF8, #818CF8)',
            border: '1.5px solid #FFFFFF',
            borderRadius: '8px',
            padding: '0 4px',
            fontSize: '8.5px',
            fontWeight: '900',
            color: '#FFF',
            boxShadow: '0 2px 4px rgba(0,0,0,0.35)'
          }}>
            🫧{item.bubbleExpiresAt ? `${Math.max(1, Math.ceil((item.bubbleExpiresAt - Date.now()) / 1000))}s` : ''}
          </div>
        </div>
      )}

      {/* Piece of Cake Style Cobweb & Dusty Locked Overlay */}
      {item.isCobweb && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          backgroundColor: 'rgba(30, 27, 75, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 8,
          pointerEvents: 'none'
        }}>
          <svg viewBox="0 0 64 64" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <line x1="8" y1="8" x2="56" y2="56" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1.2" />
            <line x1="56" y1="8" x2="8" y2="56" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1.2" />
            <line x1="32" y1="6" x2="32" y2="58" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1.2" />
            <line x1="6" y1="32" x2="58" y2="32" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="1.2" />
            <circle cx="32" cy="32" r="14" fill="none" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.2" />
            <circle cx="32" cy="32" r="23" fill="none" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
          <div style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #451A03, #78350F)',
            border: '1.5px solid #FDE68A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '9px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
            zIndex: 9
          }}>
            🔒
          </div>
        </div>
      )}
    </div>
  );
}
