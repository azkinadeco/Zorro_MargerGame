import React from 'react';
import { Volume2, VolumeX, Maximize2, Settings, Gift } from 'lucide-react';
import { audio } from '../utils/audio';

// Pristine Semi-3D Vector Icons (Zero raster fringe / Zero background debris)
function HeaderLevelStar({ level }) {
  return (
    <div style={{
      position: 'relative',
      width: '42px',
      height: '42px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))'
    }}>
      <svg width="42" height="42" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="starGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="50%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>
          <linearGradient id="starRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF1F2" />
            <stop offset="100%" stopColor="#FDA4AF" />
          </linearGradient>
        </defs>
        {/* Star Base with Rim */}
        <path
          d="M24 3 L30 16 L44 18 L33 28 L36 42 L24 35 L12 42 L15 28 L4 18 L18 16 Z"
          fill="url(#starGrad)"
          stroke="url(#starRim)"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Soft highlight */}
        <polygon points="24,7 28,17 38,18 29,26 24,20" fill="rgba(255,255,255,0.45)" />
      </svg>
      <span style={{
        position: 'absolute',
        fontSize: '13px',
        fontWeight: '900',
        color: '#FFFFFF',
        textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 0 2px #4C0519',
        zIndex: 2
      }}>
        {level}
      </span>
    </div>
  );
}

function HeaderCoinIcon() {
  return (
    <div style={{
      width: '38px',
      height: '38px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))'
    }}>
      <svg width="38" height="38" viewBox="0 0 48 48">
        <defs>
          <radialGradient id="coinFaceGrad" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#FBBF24" />
            <stop offset="85%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </radialGradient>
          <linearGradient id="coinRimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF9C3" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>
        {/* Outer Coin Body */}
        <circle cx="24" cy="24" r="21" fill="url(#coinFaceGrad)" stroke="url(#coinRimGrad)" strokeWidth="2.5" />
        <circle cx="24" cy="24" r="17" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="1.2" strokeDasharray="3 2" />
        {/* Paw Print in Center */}
        <ellipse cx="24" cy="27" rx="6" ry="4.5" fill="#78350F" />
        <circle cx="17" cy="20" r="2.4" fill="#78350F" />
        <circle cx="21.5" cy="17" r="2.6" fill="#78350F" />
        <circle cx="26.5" cy="17" r="2.6" fill="#78350F" />
        <circle cx="31" cy="20" r="2.4" fill="#78350F" />
        {/* Top Glint */}
        <path d="M12 16 Q18 9 28 10" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function HeaderGemIcon() {
  return (
    <div style={{
      width: '38px',
      height: '38px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))'
    }}>
      <svg width="38" height="38" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="gemTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="50%" stopColor="#E879F9" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <linearGradient id="gemBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>
        </defs>
        {/* Faceted Diamond Silhouette */}
        <polygon points="14,14 34,14 42,22 6,22" fill="url(#gemTopGrad)" stroke="#F5D0FE" strokeWidth="1.5" />
        <polygon points="6,22 42,22 24,42" fill="url(#gemBottomGrad)" stroke="#581C87" strokeWidth="1.5" />
        <polygon points="14,14 34,14 24,22" fill="#F0ABFC" />
        <polygon points="24,22 17,22 24,42" fill="#7E22CE" />
        <polygon points="24,22 31,22 24,42" fill="#A855F7" />
        <polygon points="6,22 17,22 24,42" fill="#6B21A8" />
        <polygon points="42,22 31,22 24,42" fill="#9333EA" />
        <polygon points="12,16 16,16 14,20" fill="rgba(255,255,255,0.75)" />
      </svg>
    </div>
  );
}

function HeaderEnergyIcon() {
  return (
    <div style={{
      width: '36px',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))'
    }}>
      <svg width="36" height="36" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="boltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#FACC15" />
            <stop offset="90%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id="boltRim" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#854D0E" />
          </linearGradient>
        </defs>
        <path
          d="M28 4 L12 24 L22 24 L18 44 L36 20 L24 20 Z"
          fill="url(#boltGrad)"
          stroke="url(#boltRim)"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <polygon points="26,8 16,22 23,22 25,14" fill="rgba(255,255,255,0.6)" />
      </svg>
    </div>
  );
}

function HeaderLogo() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '56px',
      position: 'relative',
      userSelect: 'none'
    }}>
      <div style={{
        background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
        border: '2.5px solid #8B5A2B',
        borderRadius: '20px',
        padding: '3px 18px',
        boxShadow: '0 3px 8px rgba(0,0,0,0.22), inset 0 2px 2px rgba(255,255,255,0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Cat Ears on Logo Top */}
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '12px',
          width: '12px',
          height: '10px',
          background: '#FAEDD9',
          borderTop: '2.5px solid #8B5A2B',
          borderLeft: '2.5px solid #8B5A2B',
          transform: 'rotate(-25deg)',
          borderTopLeftRadius: '4px'
        }} />
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '12px',
          width: '12px',
          height: '10px',
          background: '#FAEDD9',
          borderTop: '2.5px solid #8B5A2B',
          borderRight: '2.5px solid #8B5A2B',
          transform: 'rotate(25deg)',
          borderTopRightRadius: '4px'
        }} />

        {/* Top Text: ZORRO */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span style={{ fontSize: '11px' }}>🐾</span>
          <span style={{
            fontFamily: "'Sniglet', 'Nunito', sans-serif",
            fontSize: '16px',
            fontWeight: '900',
            background: 'linear-gradient(180deg, #F97316 0%, #EA580C 50%, #C2410C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.8px',
            lineHeight: '1.1',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)'
          }}>
            ZORRO
          </span>
          <span style={{ fontSize: '11px' }}>🐾</span>
        </div>

        {/* Bottom Text: MERGE CATS */}
        <span style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: '10px',
          fontWeight: '900',
          color: '#5C3818',
          letterSpacing: '1.2px',
          lineHeight: '1',
          textTransform: 'uppercase'
        }}>
          MERGE CATS
        </span>
      </div>
    </div>
  );
}

export function Header({
  level = 18,
  levelProgress = 65, // percentage 0-100
  coins = 14350,
  gems = 210,
  energy = 75,
  maxEnergy = 100,
  soundEnabled = true,
  isFullscreen = false,
  onToggleFullscreen,
  onToggleSound,
  onOpenActivityDrawer,
  onOpenSettings,
  onOpenShop,
  onOpenEnergyModal,
  onOpenLevelRewards,
  onOpenDailyGift,
  onOpenLuckyWheel,
  onOpenCatalog,
  onOpenCatPass,
  onOpenEvent,
  onOpenWardrobe,
  canClaimDaily = true
}) {
  const formatNumber = (num) => {
    return (num || 0).toLocaleString('en-US');
  };

  const handleToggleFullscreen = () => {
    if (typeof onToggleFullscreen === 'function') {
      onToggleFullscreen();
      return;
    }
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <header style={{
      width: '100%',
      position: 'relative',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      background: 'transparent',
      pointerEvents: 'auto'
    }}>
      {/* iOS Top Status Bar (Matching Mockup ●●●●● 10:10 AM 88%) */}
      <div style={{
        width: '100%',
        height: '20px',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '11px',
        fontWeight: '700',
        color: 'rgba(0, 0, 0, 0.75)',
        letterSpacing: '0.2px',
        userSelect: 'none'
      }}>
        {/* Signal dots & WiFi */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '2px' }}>●●●●●</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.5c3.78 0 7.21 1.5 9.74 3.96L12 18.2 2.26 11.46C4.79 9 8.22 7.5 12 7.5z" />
          </svg>
        </div>

        {/* Clock */}
        <div style={{ fontWeight: '800' }}>10:10 AM</div>

        {/* Battery & Quick Controls */}
        {/* Quick Controls & Main Activity Center */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Quick Audio Mute Toggle */}
          <button
            onClick={() => {
              if (onToggleSound) onToggleSound();
            }}
            className="header-micro-btn"
            style={{
              color: soundEnabled ? '#047857' : '#9CA3AF'
            }}
            aria-label={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            className="header-micro-btn"
            style={{ color: '#4B5563' }}
            aria-label="Layar Penuh"
            title="Mode Layar Penuh"
          >
            <Maximize2 size={12} />
          </button>

          {/* Consolidated Activity Center Drawer Button */}
          <button
            onClick={() => {
              audio.playPop();
              if (onOpenActivityDrawer) onOpenActivityDrawer();
            }}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
              border: '1.5px solid #92400E',
              borderRadius: '12px',
              padding: '2px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: '#FFF',
              fontSize: '11px',
              fontWeight: '900',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(217, 119, 6, 0.35)',
              position: 'relative'
            }}
            aria-label="Buka Menu Aktivitas Kafe"
            title="Buka Menu Aktivitas, Misi, Hadiah & Pengaturan"
          >
            <span>📋</span>
            <span>Aktivitas</span>
            {canClaimDaily && (
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#EF4444',
                border: '1.5px solid #FFF',
                boxShadow: '0 0 6px #EF4444'
              }} />
            )}
          </button>

          {/* Battery Icon & Percentage */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginLeft: '2px' }}>
            <span style={{ fontSize: '11px', color: '#4A2810' }}>88%</span>
            <div style={{
              width: '18px',
              height: '9px',
              border: '1.5px solid rgba(0,0,0,0.7)',
              borderRadius: '2.5px',
              padding: '1px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{ width: '85%', height: '100%', background: 'currentColor', borderRadius: '1px' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar with Pill Controls & Logo */}
      <div style={{
        width: '100%',
        padding: '2px 20px 4px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
      }}>
        {/* Left Side: Level Pill + Coins Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Level Pill */}
          <div
            onClick={() => {
              audio.playPop();
              if (onOpenLevelRewards) onOpenLevelRewards();
            }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            title="Hadiah Level"
          >
            {/* Pill Label */}
            <span style={{
              position: 'absolute',
              top: '-11px',
              left: '52px',
              fontSize: '11px',
              fontWeight: '900',
              color: '#5C3818',
              letterSpacing: '0.2px',
              textShadow: '0 1px 0 rgba(255,255,255,0.8)'
            }}>
              Level
            </span>

            {/* Pill Capsule */}
            <div style={{
              height: '32px',
              width: '124px',
              background: 'linear-gradient(180deg, #FFFDF8 0%, #FCEED8 100%)',
              border: '2.5px solid #8B5A2B',
              borderRadius: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15), inset 0 2px 3px rgba(255,255,255,0.9)',
              padding: '3px 6px 3px 30px',
              display: 'flex',
              alignItems: 'center',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div className="pill-glass-reflection" />
              {/* Progress Bar inside */}
              <div style={{
                width: '100%',
                height: '14px',
                background: '#D9CAA5',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
              }}>
                <div style={{
                  width: `${Math.min(100, Math.max(10, levelProgress))}%`,
                  height: '100%',
                  background: 'linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)',
                  borderRadius: '6px',
                  boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.7)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {/* Pristine Semi-3D Star with Level on Left */}
            <div
              className="cat-breathe"
              style={{
                position: 'absolute',
                left: '-8px',
                zIndex: 5
              }}
            >
              <HeaderLevelStar level={level} />
            </div>
          </div>

          {/* Coins Pill */}
          <div
            onClick={() => {
              audio.playPop();
              if (onOpenShop) onOpenShop();
            }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            title="Koin Cafe"
          >
            {/* Pill Label */}
            <span style={{
              position: 'absolute',
              top: '-11px',
              left: '42px',
              fontSize: '11px',
              fontWeight: '900',
              color: '#5C3818',
              letterSpacing: '0.2px',
              textShadow: '0 1px 0 rgba(255,255,255,0.8)'
            }}>
              Coins
            </span>

            {/* Pill Capsule */}
            <div style={{
              height: '32px',
              minWidth: '120px',
              background: 'linear-gradient(180deg, #FFFDF8 0%, #FCEED8 100%)',
              border: '2.5px solid #8B5A2B',
              borderRadius: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15), inset 0 2px 3px rgba(255,255,255,0.9)',
              padding: '0 14px 0 34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div className="pill-glass-reflection" />
              <span style={{
                fontSize: '15px',
                fontWeight: '900',
                color: '#3B1E08',
                letterSpacing: '0.3px',
                textShadow: '0 1px 0 rgba(255,255,255,0.6)'
              }}>
                {formatNumber(coins)}
              </span>
            </div>

            {/* Pristine Semi-3D Golden Paw Coin on Left */}
            <div style={{
              position: 'absolute',
              left: '-6px',
              zIndex: 5
            }}>
              <HeaderCoinIcon />
            </div>
          </div>
        </div>

        {/* Center: Bespoke Pristine Vector Game Logo Banner */}
        <HeaderLogo />

        {/* Right Side: Gems Pill + Energy Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Gems Pill */}
          <div
            onClick={() => {
              audio.playPop();
              if (onOpenShop) onOpenShop();
            }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            title="Permata Ajaib"
          >
            {/* Pill Label */}
            <span style={{
              position: 'absolute',
              top: '-11px',
              left: '42px',
              fontSize: '11px',
              fontWeight: '900',
              color: '#5C3818',
              letterSpacing: '0.2px',
              textShadow: '0 1px 0 rgba(255,255,255,0.8)'
            }}>
              Gems
            </span>

            {/* Pill Capsule */}
            <div style={{
              height: '32px',
              minWidth: '108px',
              background: 'linear-gradient(180deg, #FFFDF8 0%, #FCEED8 100%)',
              border: '2.5px solid #8B5A2B',
              borderRadius: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15), inset 0 2px 3px rgba(255,255,255,0.9)',
              padding: '0 6px 0 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '6px',
              position: 'relative'
            }}>
              <div className="pill-glass-reflection" />
              <span style={{
                fontSize: '15px',
                fontWeight: '900',
                color: '#3B1E08',
                letterSpacing: '0.3px',
                textShadow: '0 1px 0 rgba(255,255,255,0.6)'
              }}>
                {formatNumber(gems)}
              </span>

              {/* Green Circular "+" Button */}
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
                border: '1.5px solid #047857',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '900',
                lineHeight: '1',
                boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}>
                +
              </div>
            </div>

            {/* Pristine Semi-3D Faceted Diamond Gem on Left */}
            <div style={{
              position: 'absolute',
              left: '-8px',
              zIndex: 5
            }}>
              <HeaderGemIcon />
            </div>
          </div>

          {/* Energy Pill */}
          <div
            onClick={() => {
              audio.playPop();
              if (onOpenEnergyModal) onOpenEnergyModal();
            }}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer'
            }}
            title="Energi Harian (Ketuk untuk isi ulang)"
          >
            {/* Pill Label */}
            <span style={{
              position: 'absolute',
              top: '-11px',
              left: '42px',
              fontSize: '11px',
              fontWeight: '900',
              color: '#5C3818',
              letterSpacing: '0.2px',
              textShadow: '0 1px 0 rgba(255,255,255,0.8)'
            }}>
              Energy
            </span>

            {/* Pill Capsule */}
            <div style={{
              height: '32px',
              minWidth: '124px',
              background: 'linear-gradient(180deg, #FFFDF8 0%, #FCEED8 100%)',
              border: '2.5px solid #8B5A2B',
              borderRadius: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.15), inset 0 2px 3px rgba(255,255,255,0.9)',
              padding: '0 12px 0 34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div className="pill-glass-reflection" />
              {/* Yellow Energy Progress Meter Underneath Text */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: `${Math.min(100, Math.max(0, (energy / maxEnergy) * 100))}%`,
                background: 'linear-gradient(180deg, rgba(253, 224, 71, 0.45) 0%, rgba(245, 158, 11, 0.4) 100%)',
                pointerEvents: 'none',
                transition: 'width 0.3s ease'
              }} />

              <span style={{
                fontSize: '14px',
                fontWeight: '900',
                color: '#3B1E08',
                letterSpacing: '0.3px',
                position: 'relative',
                zIndex: 2,
                textShadow: '0 1px 0 rgba(255,255,255,0.6)'
              }}>
                {energy}/{maxEnergy}
              </span>
            </div>

            {/* Pristine Semi-3D Golden Lightning Bolt on Left */}
            <div style={{
              position: 'absolute',
              left: '-8px',
              zIndex: 5
            }}>
              <HeaderEnergyIcon />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
