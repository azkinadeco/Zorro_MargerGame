import React from 'react';
import { audio } from '../utils/audio';

// Pristine Semi-3D Vector Icons with 0 background debris
function DockIcon({ id, isActive }) {
  if (id === 'lobby') {
    return (
      <svg width="38" height="38" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="60%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>
          <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>
        {/* House Wall */}
        <rect x="8" y="18" width="32" height="24" rx="4" fill="url(#wallGrad)" stroke="#B45309" strokeWidth="1.5" />
        {/* Awning Roof */}
        <path d="M4 18 L24 6 L44 18 Z" fill="url(#roofGrad)" stroke="#881337" strokeWidth="1.5" />
        {/* Striped Awning Overhang */}
        <rect x="6" y="18" width="36" height="6" rx="2" fill="#E11D48" />
        <rect x="12" y="18" width="6" height="6" fill="#FFF" />
        <rect x="24" y="18" width="6" height="6" fill="#FFF" />
        <rect x="36" y="18" width="4" height="6" fill="#FFF" />
        {/* Door & Window */}
        <rect x="18" y="27" width="12" height="15" rx="3" fill="#D97706" stroke="#78350F" strokeWidth="1" />
        <circle cx="27" cy="35" r="1.5" fill="#FEF08A" />
        {/* Steaming Coffee Mug Sign */}
        <circle cx="24" cy="24" r="3" fill="#FFF" stroke="#B45309" strokeWidth="0.8" />
      </svg>
    );
  }

  if (id === 'map') {
    return (
      <svg width="38" height="38" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="mapParch" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
        {/* Parchment Scroll */}
        <path d="M8 12 Q14 8 20 12 Q28 16 34 10 L40 34 Q34 40 28 36 Q20 32 14 38 L8 12 Z" fill="url(#mapParch)" stroke="#92400E" strokeWidth="1.5" />
        {/* Red X Marks the Spot */}
        <path d="M26 20 L32 26 M32 20 L26 26" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        {/* Dotted Island Trail */}
        <path d="M12 28 Q18 20 26 24" fill="none" stroke="#B45309" strokeWidth="1.5" strokeDasharray="2 2" />
        {/* Compass Star */}
        <polygon points="14,14 16,18 20,16 18,20 22,22 18,22 18,26 15,22 11,22 14,20" fill="#38BDF8" stroke="#0284C7" strokeWidth="0.8" />
      </svg>
    );
  }

  if (id === 'cats') {
    return (
      <svg width="38" height="38" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="pawPadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="60%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>
          <linearGradient id="pawToeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>
        </defs>
        {/* Main Heart Shaped Paw Pad */}
        <ellipse cx="24" cy="30" rx="11" ry="9" fill="url(#pawPadGrad)" stroke="#881337" strokeWidth="1.5" />
        {/* 4 Cute Toe Beans */}
        <circle cx="13" cy="18" r="4.2" fill="url(#pawToeGrad)" stroke="#881337" strokeWidth="1.2" />
        <circle cx="20" cy="13" r="4.5" fill="url(#pawToeGrad)" stroke="#881337" strokeWidth="1.2" />
        <circle cx="28" cy="13" r="4.5" fill="url(#pawToeGrad)" stroke="#881337" strokeWidth="1.2" />
        <circle cx="35" cy="18" r="4.2" fill="url(#pawToeGrad)" stroke="#881337" strokeWidth="1.2" />
        {/* Shiny Highlight */}
        <path d="M20 27 Q24 25 28 27" fill="none" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
      </svg>
    );
  }

  if (id === 'bake') {
    return (
      <svg width="38" height="38" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="cupcakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="60%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#BE185D" />
          </linearGradient>
          <linearGradient id="cupGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        {/* Cupcake Liner */}
        <path d="M14 26 L18 42 L30 42 L34 26 Z" fill="url(#cupGrad)" stroke="#B45309" strokeWidth="1.2" />
        {/* Swirled Frosting */}
        <path d="M11 26 C11 16 37 16 37 26 C37 28 11 28 11 26 Z" fill="url(#cupcakeGrad)" stroke="#9D174D" strokeWidth="1.5" />
        <circle cx="24" cy="18" r="8" fill="#F472B6" />
        {/* Cherry on Top */}
        <circle cx="24" cy="12" r="4" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
        <path d="M24 10 Q28 6 30 7" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
        {/* Whisk next to cupcake */}
        <line x1="34" y1="12" x2="42" y2="38" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="34" cy="14" rx="3" ry="5" fill="none" stroke="#64748B" strokeWidth="1.2" transform="rotate(-15 34 14)" />
      </svg>
    );
  }

  if (id === 'play') {
    return (
      <svg width="40" height="40" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="playPadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        {/* Golden Gamepad with Cat Ears */}
        <path d="M12 14 L16 20 L32 20 L36 14 L40 24 C42 34 38 42 32 40 L28 36 L20 36 L16 40 C10 42 6 34 8 24 Z" fill="url(#playPadGrad)" stroke="#78350F" strokeWidth="1.5" />
        {/* D-Pad Buttons */}
        <rect x="13" y="26" width="3" height="7" rx="1" fill="#451A03" />
        <rect x="11" y="28" width="7" height="3" rx="1" fill="#451A03" />
        {/* Play Triangle Green Button */}
        <polygon points="30,26 36,30 30,34" fill="#10B981" stroke="#047857" strokeWidth="1" />
      </svg>
    );
  }

  if (id === 'profile') {
    return (
      <svg width="38" height="38" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="cameoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>
        {/* Golden Cameo Rim */}
        <ellipse cx="24" cy="24" rx="18" ry="20" fill="url(#cameoGrad)" stroke="#B45309" strokeWidth="2" />
        {/* Tuxedo Cat Head Silhouette */}
        <path d="M14 18 L18 24 C18 32 30 32 30 24 L34 18 L32 24 C34 34 14 34 16 24 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1" />
        {/* White Chest & Whiskers */}
        <polygon points="24,26 21,32 27,32" fill="#FFF" />
        <circle cx="20" cy="22" r="1.5" fill="#FBBF24" />
        <circle cx="28" cy="22" r="1.5" fill="#FBBF24" />
      </svg>
    );
  }

  if (id === 'shop') {
    return (
      <svg width="38" height="38" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="shopAwning" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="60%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
          <radialGradient id="coinGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </radialGradient>
        </defs>
        {/* Storefront Stall */}
        <rect x="10" y="20" width="28" height="22" rx="3" fill="#FFFBEB" stroke="#92400E" strokeWidth="1.5" />
        {/* Striped Canopy */}
        <path d="M6 14 L42 14 L38 22 L10 22 Z" fill="url(#shopAwning)" stroke="#7C2D12" strokeWidth="1.2" />
        <rect x="14" y="14" width="5" height="8" fill="#FFF" />
        <rect x="24" y="14" width="5" height="8" fill="#FFF" />
        <rect x="34" y="14" width="4" height="8" fill="#FFF" />
        {/* Big Golden Paw Coin in Front */}
        <circle cx="24" cy="30" r="8" fill="url(#coinGrad)" stroke="#B45309" strokeWidth="1.2" />
        <circle cx="24" cy="31" r="2.5" fill="#92400E" />
        <circle cx="21" cy="27" r="1.2" fill="#92400E" />
        <circle cx="27" cy="27" r="1.2" fill="#92400E" />
      </svg>
    );
  }

  return null;
}

export function NavigationDock({
  currentView,
  onChangeView,
  onOpenProfile,
  onOpenShop,
  hasLobbyTips = false
}) {
  const navItems = [
    {
      id: 'lobby',
      label: 'Lobby',
      isCurrentBadge: true
    },
    {
      id: 'play',
      label: 'Play',
      isSpecialPlay: true
    },
    {
      id: 'bake',
      label: 'Dapur'
    },
    {
      id: 'cats',
      label: 'Anabul'
    },
    {
      id: 'map',
      label: 'Map'
    }
  ];

  const secondaryItems = [
    {
      id: 'shop',
      label: 'Shop\nKafe',
      action: onOpenShop
    },
    {
      id: 'profile',
      label: 'Profile\nKarakter',
      action: onOpenProfile
    }
  ];

  const isItemActive = (id) => {
    if (id === 'cats') return ['cats', 'catroom', 'interact', 'grooming'].includes(currentView);
    return currentView === id;
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      zIndex: 40,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      pointerEvents: 'auto'
    }}>
      {/* Main Wooden Dock */}
      <div style={{
        width: '100%',
        height: '82px',
        background: 'linear-gradient(180deg, #D4A373 0%, #BC8A5F 18%, #A47148 60%, #8B5A2B 100%)',
        borderTop: '3px solid #E8B888',
        boxShadow: '0 -4px 14px rgba(0, 0, 0, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 16px',
        position: 'relative'
      }}>
        {/* Decorative Brass Studs on Wooden Dock Ends */}
        <div className="corner-rivet" style={{ top: '12px', left: '16px' }} />
        <div className="corner-rivet" style={{ bottom: '12px', left: '16px' }} />
        <div className="corner-rivet" style={{ top: '12px', right: '16px' }} />
        <div className="corner-rivet" style={{ bottom: '12px', right: '16px' }} />

        {/* Subtle wood grain texture effect */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(0,0,0,0.03) 12px, rgba(255,255,255,0.02) 24px)',
          pointerEvents: 'none'
        }} />

        {/* Buttons Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Main 4 Navigation Buttons */}
          {navItems.map((item) => {
            const isActive = isItemActive(item.id);
            return (
              <button
                key={item.id}
                onClick={() => {
                  audio.playPop();
                  onChangeView(item.id);
                }}
                className="mockup-dock-btn"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  transform: isActive ? 'translateY(-4px) scale(1.05)' : 'translateY(0)',
                  transition: 'transform 0.15s ease',
                  outline: 'none'
                }}
                title={item.label}
              >
                {/* Button Icon Container with Pristine 3D Vector */}
                <div style={{
                  width: '58px',
                  height: '52px',
                  borderRadius: '16px',
                  background: '#FFF8F0',
                  border: isActive ? '3px solid #F97316' : '2.5px solid #8B5A2B',
                  boxShadow: isActive
                    ? '0 4px 14px rgba(249, 115, 22, 0.65), 0 0 16px rgba(249, 115, 22, 0.4), inset 0 2px 4px rgba(255,255,255,0.9)'
                    : '0 3px 0 #5C3818, 0 4px 8px rgba(0,0,0,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <DockIcon id={item.id} isActive={isActive} />

                  {/* Golden Cafe Tips Notification Badge on Lobby */}
                  {item.id === 'lobby' && hasLobbyTips && (
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                      border: '1.5px solid #FEF3C7',
                      borderRadius: '10px',
                      padding: '0 4px',
                      fontSize: '8px',
                      fontWeight: '900',
                      color: '#FFF',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.4)',
                      animation: 'pulseReady 1.6s infinite',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1px',
                      zIndex: 10
                    }}>
                      <span>🪙</span>
                    </div>
                  )}
                </div>

                {/* Button Label */}
                <span style={{
                  fontSize: '11px',
                  fontWeight: '900',
                  color: isActive ? '#FED7AA' : '#FFFFFF',
                  textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 2px #000',
                  marginTop: '2px',
                  letterSpacing: '0.3px',
                  lineHeight: '1.1',
                  textAlign: 'center'
                }}>
                  {item.label}
                </span>

                {/* Orange "Current" Badge under Lobby if active */}
                {item.isCurrentBadge && isActive && (
                  <span style={{
                    fontSize: '9px',
                    fontWeight: '900',
                    color: '#FFEDD5',
                    background: '#C2410C',
                    padding: '1px 5px',
                    borderRadius: '8px',
                    marginTop: '-1px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.4)'
                  }}>
                    Current
                  </span>
                )}
              </button>
            );
          })}

          {/* Dotted Vertical Wooden Divider */}
          <div style={{
            width: '2px',
            height: '48px',
            borderRight: '2px dashed rgba(255, 230, 200, 0.4)',
            margin: '0 6px'
          }} />

          {/* Secondary 2 Buttons: Profile Characters & Shop */}
          {secondaryItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                audio.playPop();
                if (item.action) item.action();
              }}
              className="mockup-dock-btn"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                transition: 'transform 0.15s ease',
                outline: 'none'
              }}
              title={item.label.replace('\n', ' ')}
            >
              <div style={{
                width: '58px',
                height: '52px',
                borderRadius: '16px',
                background: '#FFF8F0',
                border: '2.5px solid #8B5A2B',
                boxShadow: '0 3px 0 #5C3818, 0 4px 8px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <DockIcon id={item.id} isActive={false} />
              </div>

              <span style={{
                fontSize: '10px',
                fontWeight: '900',
                color: '#FFFFFF',
                textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 0 2px #000',
                marginTop: '2px',
                letterSpacing: '0.2px',
                lineHeight: '1.1',
                textAlign: 'center',
                whiteSpace: 'pre-line'
              }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
