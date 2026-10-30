import React, { useState } from 'react';
import { CatSprite } from './CatSprite';
import { audio } from '../utils/audio';

export function InteractiveCatActor({
  type = 'zorro', // 'zorro' | 'thor' | 'loki'
  stage = 'adult', // 'adult' | 'kitten'
  action = null, // 'wash' | 'dryer' | 'brush' | 'trim' | 'feed' | 'cuddle' | 'sleep'
  accessoryId = null,
  equippedOutfit = null,
  size = 180,
  initialPhotoMode = true,
  showModeToggle = true,
  onPet,
  onClick
}) {
  const [photoMode, setPhotoMode] = useState(initialPhotoMode);
  const [isPurring, setIsPurring] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [cheeksBlush, setCheeksBlush] = useState(false);

  // Transparent character cutout mapping from user assets in /cats (background removed)
  const photoMap = {
    zorro: '/cats/zoro_transparent.png',
    thor: '/cats/thor_transparent.png',
    loki: '/cats/loki_transparent.png'
  };

  const currentPhoto = photoMap[type] || photoMap.zorro;

  const handleInteraction = (e) => {
    if (e) e.stopPropagation();
    // Play character-specific meow sound with authentic vocal profile
    audio.playMeow(type);
    setIsPurring(true);
    setCheeksBlush(true);

    // Spawn floating heart
    const hId = Date.now() + Math.random();
    const spawnX = 35 + Math.random() * 30;
    const spawnY = 20 + Math.random() * 20;
    setHearts(prev => [...prev.slice(-4), { id: hId, x: spawnX, y: spawnY }]);

    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== hId));
    }, 1200);

    setTimeout(() => {
      setIsPurring(false);
      setCheeksBlush(false);
    }, 1000);

    if (onPet) onPet(type);
    if (onClick) onClick(type);
  };

  return (
    <div
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
      {/* Photo / Cartoon Mode Toggle Badge */}
      {showModeToggle && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            audio.playPop();
            setPhotoMode(!photoMode);
          }}
          className="mockup-action-btn"
          style={{
            position: 'absolute',
            top: '-24px',
            right: '0px',
            background: photoMode
              ? 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)'
              : 'linear-gradient(180deg, #E2E8F0 0%, #CBD5E1 100%)',
            border: '1.5px solid #8B5A2B',
            borderRadius: '12px',
            padding: '2px 8px',
            fontSize: '9.5px',
            fontWeight: '900',
            color: '#78350F',
            boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
            cursor: 'pointer',
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}
          title="Ganti tampilan foto asli kucing / kartun SVG"
        >
          <span>{photoMode ? '📷 Foto Asli' : '🎨 Kartun'}</span>
        </button>
      )}

      {/* Floating Interaction Hearts */}
      {hearts.map(h => (
        <div
          key={h.id}
          style={{
            position: 'absolute',
            left: `${h.x}%`,
            top: `${h.y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: '22px',
            animation: 'floatPurr 1.2s forwards',
            pointerEvents: 'none',
            zIndex: 40
          }}
        >
          💖
        </div>
      ))}

      {/* Realistic Floor Contact Shadow to prevent floating */}
      <div
        style={{
          position: 'absolute',
          bottom: '22px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: `${size * 0.76}px`,
          height: `${size * 0.18}px`,
          background: 'radial-gradient(ellipse at center, rgba(30, 15, 5, 0.45) 0%, rgba(30, 15, 5, 0) 72%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Main Cat Visual Body */}
      <div
        onClick={handleInteraction}
        style={{
          position: 'relative',
          width: `${size * 0.95}px`,
          height: `${size * 0.95}px`,
          cursor: 'pointer',
          borderRadius: photoMode ? '50%' : '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: isPurring ? 'bouncePurr 0.3s infinite' : 'catBreathe 3.5s infinite ease-in-out',
          transition: 'transform 0.15s ease',
          zIndex: 2
        }}
        title={`Ketuk untuk mengelus ${type.toUpperCase()}! 🐾`}
      >
        {photoMode ? (
          /* REAL TRANSPARENT CAT CUTOUT VIEW (Background Removed from /cats) */
          <div
            className="cat-breathe"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.35))'
            }}
          >
            <img
              src={currentPhoto}
              alt={type}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                transform: cheeksBlush ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.25s ease'
              }}
            />

            {/* Cheeks Blush during purring */}
            {cheeksBlush && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    left: '26%',
                    top: '50%',
                    width: '18px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'rgba(244, 63, 94, 0.55)',
                    filter: 'blur(3px)',
                    pointerEvents: 'none'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    right: '26%',
                    top: '50%',
                    width: '18px',
                    height: '10px',
                    borderRadius: '50%',
                    background: 'rgba(244, 63, 94, 0.55)',
                    filter: 'blur(3px)',
                    pointerEvents: 'none'
                  }}
                />
              </>
            )}
          </div>
        ) : (
          /* VECTOR ANIMATED SVG SPRITE VIEW */
          <div
            className="tail-swish"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CatSprite
              type={type}
              size={size * 0.85}
              isPurring={isPurring}
              accessoryId={accessoryId}
            />
          </div>
        )}

        {/* Equipped Costume Hats on Real Photo / Sprite */}
        {(equippedOutfit === 'zorro_royal' || accessoryId === 'zorro_crown') && (
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '32px',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))',
              pointerEvents: 'none',
              zIndex: 35
            }}
          >
            👑
          </div>
        )}

        {(equippedOutfit === 'zorro_barista' || accessoryId === 'zorro_bowtie') && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '24px',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))',
              pointerEvents: 'none',
              zIndex: 35
            }}
          >
            🎀
          </div>
        )}

        {equippedOutfit === 'zorro_party' && (
          <div
            style={{
              position: 'absolute',
              top: '-24px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '32px',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))',
              pointerEvents: 'none',
              zIndex: 35
            }}
          >
            🎉
          </div>
        )}

        {equippedOutfit === 'zorro_detective' && (
          <div
            style={{
              position: 'absolute',
              top: '-22px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '32px',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))',
              pointerEvents: 'none',
              zIndex: 35
            }}
          >
            🕵️
          </div>
        )}

        {/* Dynamic Action Effects Overlay */}
        {action === 'wash' && (
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              pointerEvents: 'none',
              zIndex: 35,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <span style={{ position: 'absolute', top: '-10px', left: '10px', fontSize: '32px', animation: 'bubbleFloat 1.2s infinite' }}>🫧</span>
            <span style={{ position: 'absolute', top: '15px', right: '-8px', fontSize: '28px', animation: 'bubbleFloat 1.6s infinite 0.3s' }}>🫧</span>
            <span style={{ position: 'absolute', bottom: '-5px', left: '20px', fontSize: '26px', animation: 'bubbleFloat 1.4s infinite 0.6s' }}>🫧</span>
            <span style={{ position: 'absolute', bottom: '15px', right: '15px', fontSize: '34px', animation: 'bubbleFloat 1.8s infinite 0.2s' }}>🫧</span>
          </div>
        )}

        {action === 'dryer' && (
          <div
            style={{
              position: 'absolute',
              inset: '-15px',
              pointerEvents: 'none',
              zIndex: 35
            }}
          >
            <span style={{ position: 'absolute', top: '20%', left: '-18px', fontSize: '30px', animation: 'popIn 0.5s infinite' }}>💨</span>
            <span style={{ position: 'absolute', top: '45%', right: '-18px', fontSize: '32px', animation: 'popIn 0.5s infinite 0.2s' }}>💨</span>
            <span style={{ position: 'absolute', bottom: '0px', left: '25%', fontSize: '28px', animation: 'popIn 0.5s infinite 0.4s' }}>💨</span>
          </div>
        )}

        {action === 'brush' && (
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              pointerEvents: 'none',
              zIndex: 35
            }}
          >
            <span style={{ position: 'absolute', top: '0', left: '15%', fontSize: '26px', animation: 'sparkleGlow 0.8s infinite' }}>✨</span>
            <span style={{ position: 'absolute', top: '40%', right: '5%', fontSize: '28px', animation: 'sparkleGlow 0.8s infinite 0.3s' }}>✨</span>
            <span style={{ position: 'absolute', bottom: '5%', left: '30%', fontSize: '24px', animation: 'sparkleGlow 0.8s infinite 0.5s' }}>✨</span>
          </div>
        )}

        {action === 'trim' && (
          <div
            style={{
              position: 'absolute',
              bottom: '-5px',
              left: '50%',
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              zIndex: 35,
              display: 'flex',
              gap: '6px'
            }}
          >
            <span style={{ fontSize: '20px', animation: 'bouncePurr 0.8s infinite' }}>🐾</span>
            <span style={{ fontSize: '18px', animation: 'bouncePurr 0.8s infinite 0.2s' }}>💖</span>
          </div>
        )}

        {action === 'feed' && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 35,
              animation: 'bouncePurr 0.6s infinite'
            }}
          >
            <span style={{ fontSize: '30px' }}>🐟</span>
          </div>
        )}

        {action === 'sleep' && (
          <div
            style={{
              position: 'absolute',
              top: '-15px',
              right: '10px',
              pointerEvents: 'none',
              zIndex: 35,
              fontSize: '22px',
              fontWeight: '900',
              color: '#3B82F6',
              animation: 'floatPurr 2s infinite'
            }}
          >
            💤 Zzz
          </div>
        )}
      </div>

      {/* Name Ribbon Under Cat */}
      <div
        style={{
          marginTop: '6px',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FAEDD9 100%)',
          border: '2px solid #8B5A2B',
          borderRadius: '12px',
          padding: '2px 10px',
          fontSize: '11px',
          fontWeight: '900',
          color: '#4A2810',
          boxShadow: '0 3px 8px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          zIndex: 20
        }}
      >
        <span>🐾</span>
        <span>
          {type === 'zorro'
            ? stage === 'kitten' ? 'Baby Zorro' : 'Zorro Tuxedo'
            : type === 'thor'
            ? 'Thor Tabby'
            : 'Loki Lion'}
        </span>
      </div>
    </div>
  );
}
