import React, { useState, useEffect, useRef } from 'react';
import { audio } from '../utils/audio';
import { safeConfetti as confetti } from '../utils/safeConfetti';
import { Heart, Sparkles, ArrowLeft, Gift, Zap, Flame, Award } from 'lucide-react';
import { InteractiveCatActor } from './InteractiveCatActor';

export function InteractCatView({
  catType = 'zorro', // 'zorro' | 'calico' | 'thor' | 'loki'
  coins = 14350,
  gems = 210,
  onSpendCoins,
  onSpendGems,
  onAddCoins,
  onAddGems,
  onOpenFeeding,
  onOpenWardrobe,
  onPetSuccess,
  onBackToLobby,
  onShowToast
}) {
  const [activeCat, setActiveCat] = useState(catType || 'zorro');
  const [happiness, setHappiness] = useState(65); // 0-100%
  const [purrBubbles, setPurrBubbles] = useState([]);
  const [activeReaction, setActiveReaction] = useState(null);
  const [purrCombo, setPurrCombo] = useState(0);
  const [flyingTreats, setFlyingTreats] = useState([]);
  const comboTimerRef = useRef(null);

  const [careLevel, setCareLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_care_station_level');
      return saved ? parseInt(saved, 10) : 6;
    } catch (e) {
      return 6;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zorro_care_station_level', careLevel.toString());
    } catch (e) {}
  }, [careLevel]);

  const catNames = {
    zorro: 'ZORRO TUXEDO',
    calico: 'CALICO',
    thor: 'THOR TABBY',
    loki: 'LOKI OREN LION'
  };

  const handleAction = (type, costCoins, costGems, boost, soundFunc, message) => {
    if (costCoins && coins < costCoins) {
      audio.playPop();
      if (onShowToast) onShowToast("Koin tidak cukup! 🪙");
      return;
    }
    if (costGems && gems < costGems) {
      audio.playPop();
      if (onShowToast) onShowToast("Permata tidak cukup! 💎");
      return;
    }

    if (costCoins && onSpendCoins) onSpendCoins(costCoins);
    if (costGems && onSpendGems) onSpendGems(costGems);

    if (soundFunc) soundFunc();

    // Increment combo
    const nextCombo = purrCombo + 1;
    setPurrCombo(nextCombo);

    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    comboTimerRef.current = setTimeout(() => {
      setPurrCombo(0);
    }, 3500);

    // Combo reward
    let comboCoinBonus = 0;
    if (nextCombo >= 5) {
      comboCoinBonus = 75;
      audio.playFanfare();
      confetti({ particleCount: 30, spread: 60, origin: { x: 0.5, y: 0.5 } });
      if (onShowToast) onShowToast(`🔥 MEGA PURR COMBO x${nextCombo}! Bonus +${comboCoinBonus} 🪙!`);
    } else if (nextCombo >= 2) {
      comboCoinBonus = nextCombo * 10;
    }

    if (comboCoinBonus > 0 && onAddCoins) {
      onAddCoins(comboCoinBonus);
    }

    // Treat toss animation
    if (type === 'feed') {
      const treatId = Date.now();
      setFlyingTreats(prev => [...prev, { id: treatId, x: 50, y: 55 }]);
      setTimeout(() => {
        setFlyingTreats(prev => prev.filter(t => t.id !== treatId));
      }, 900);
    }

    // Boost happiness with care station bonus
    const effectiveBoost = boost + Math.floor(careLevel / 2);
    const nextHap = Math.min(100, happiness + effectiveBoost);
    setHappiness(nextHap);

    // Floating purr bubbles
    const newBubble = {
      id: Date.now() + Math.random(),
      x: 48 + (Math.random() * 20 - 10),
      y: 42 + (Math.random() * 15 - 8),
      text: type === 'pet' ? 'purr ✨' : type === 'feed' ? 'nyam! 🐟' : type === 'play' ? 'meow! 🧶' : 'glowing! 🪮'
    };
    setPurrBubbles(prev => [...prev.slice(-4), newBubble]);

    setActiveReaction(message);
    setTimeout(() => setActiveReaction(null), 2500);

    // If reached 100% happiness, trigger milestone reward!
    if (nextHap >= 100) {
      audio.playFanfare();
      confetti({ particleCount: 60, spread: 85, origin: { y: 0.5 } });
      if (onAddCoins) onAddCoins(500);
      if (onAddGems) onAddGems(25);
      if (onShowToast) onShowToast("Kebahagiaan Penuh! Kamu menerima Kado Kejutan 🎁 +500 🪙 & +25 💎");
    }
  };

  const handleUpgradeCareStation = () => {
    const cost = careLevel * 1500;
    if (coins < cost) {
      audio.playPop();
      if (onShowToast) onShowToast(`Koin tidak cukup! Butuh ${cost.toLocaleString()} 🪙`);
      return;
    }

    audio.playFanfare();
    if (onSpendCoins) onSpendCoins(cost);
    setCareLevel(prev => prev + 1);
    confetti({ particleCount: 40, spread: 60, origin: { x: 0.1, y: 0.8 } });
    if (onShowToast) onShowToast(`Kitten Care Station naik ke Lv.${careLevel + 1}! Efek elusan makin kuat ✨`);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundImage: 'url(/backgrounds/interact_cats.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden'
    }}>
      {/* Back to Lobby Button */}
      <button
        onClick={() => {
          audio.playPop();
          onBackToLobby();
        }}
        className="mockup-action-btn"
        style={{
          position: 'absolute',
          left: '3%',
          top: '12%',
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '2.5px solid #8B5A2B',
          borderRadius: '18px',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          zIndex: 30,
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
        }}
      >
        <ArrowLeft size={16} color="#5C3818" strokeWidth={3} />
        <span style={{ fontSize: '13px', fontWeight: '900', color: '#4A2810' }}>
          Kembali ke Cafe
        </span>
      </button>

      {/* Quick Action: Wardrobe */}
      {onOpenWardrobe && (
        <button
          onClick={() => {
            audio.playPop();
            onOpenWardrobe(activeCat);
          }}
          className="mockup-action-btn"
          style={{
            position: 'absolute',
            left: '3%',
            top: '20%',
            background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
            border: '2.5px solid #8B5A2B',
            borderRadius: '18px',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            zIndex: 30,
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
          }}
        >
          <span>🎀</span>
          <span style={{ fontSize: '12px', fontWeight: '900', color: '#4A2810' }}>
            Kostum Kucing
          </span>
        </button>
      )}

      {/* Top Center Wooden Plaque matching mockup */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '12%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        zIndex: 20
      }}>
        <div style={{
          background: 'linear-gradient(180deg, #E6CCA8 0%, #C49666 100%)',
          border: '3.5px solid #8B5A2B',
          borderRadius: '24px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.3), inset 0 2px 3px rgba(255,255,255,0.7)',
          padding: '6px 36px'
        }}>
          <span style={{
            fontSize: '18px',
            fontWeight: '900',
            color: '#FFF',
            letterSpacing: '0.8px',
            textShadow: '0 2px 4px rgba(0,0,0,0.6)'
          }}>
            INTERACT WITH {catNames[activeCat] || 'ZORRO TUXEDO'}
          </span>
        </div>

        {/* Cat Switcher Chips */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'zorro', label: '🐾 Zorro' },
            { id: 'thor', label: '🐱 Thor' },
            { id: 'loki', label: '🦁 Loki' },
            { id: 'calico', label: '🐈 Calico' }
          ].map(c => {
            const isSelected = activeCat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  audio.playPop();
                  setActiveCat(c.id);
                  setHappiness(70);
                  setPurrCombo(0);
                }}
                style={{
                  background: isSelected ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)' : '#FFF',
                  color: isSelected ? '#FFF' : '#78350F',
                  border: isSelected ? '2px solid #9A3412' : '1.5px solid #FED7AA',
                  borderRadius: '12px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 2px 4px rgba(234, 88, 12, 0.3)' : 'none'
                }}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating Purr Bubbles */}
      {purrBubbles.map((b) => (
        <div
          key={b.id}
          style={{
            position: 'absolute',
            left: `${b.x}%`,
            top: `${b.y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: '16px',
            fontWeight: '900',
            color: '#D97706',
            textShadow: '0 1px 2px #FFF, 0 -1px 2px #FFF, 1px 0 2px #FFF, -1px 0 2px #FFF',
            animation: 'floatPurr 1.8s forwards',
            pointerEvents: 'none',
            zIndex: 25
          }}
        >
          {b.text}
        </div>
      ))}

      {/* Flying Treat Animation */}
      {flyingTreats.map((t) => (
        <div
          key={t.id}
          style={{
            position: 'absolute',
            left: '60%',
            top: '45%',
            fontSize: '28px',
            animation: 'tossTreat 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards',
            pointerEvents: 'none',
            zIndex: 35
          }}
        >
          🐟
        </div>
      ))}

      {/* Purr Combo Flame Pill */}
      {purrCombo >= 2 && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '25%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, #EF4444 0%, #B91C1C 100%)',
          border: '2.5px solid #FEE2E2',
          borderRadius: '20px',
          padding: '4px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 14px rgba(239, 68, 68, 0.6)',
          zIndex: 30,
          animation: 'bouncePurr 1s infinite'
        }}>
          <Flame size={16} color="#FFF" />
          <span style={{ fontSize: '13px', fontWeight: '900', color: '#FFF' }}>
            COMBO PURR x{purrCombo}! (+{purrCombo * 10} 🪙)
          </span>
        </div>
      )}

      {/* Active Reaction Bubble */}
      {activeReaction && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '32%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '2.5px solid #8B5A2B',
          borderRadius: '16px',
          padding: '6px 14px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
          zIndex: 30,
          fontSize: '12px',
          fontWeight: '900',
          color: '#3B1E08',
          animation: 'popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          {activeReaction}
        </div>
      )}

      {/* Center Interactive Cat Actor (Enlarged Life-Size, Petting, Purring, Real Photo & Sprite) */}
      <div
        style={{
          position: 'absolute',
          left: '45%',
          top: '54%',
          transform: 'translate(-50%, -50%)',
          zIndex: 22
        }}
      >
        <InteractiveCatActor
          type={activeCat === 'calico' ? 'thor' : activeCat}
          size={330}
          initialPhotoMode={true}
          showModeToggle={true}
          onPet={() => {
            handleAction('pet', 0, 0, 15, audio.playPurr, `Purrrrrr... ${catNames[activeCat]} senang sekali dielus! 🐾`);
            if (onPetSuccess) onPetSuccess();
          }}
        />
      </div>

      {/* Right Side Action Card matching mockup */}
      <div style={{
        position: 'absolute',
        right: '4%',
        top: '28%',
        width: '380px',
        background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
        border: '3.5px solid #8B5A2B',
        borderRadius: '26px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.35), inset 0 2px 4px rgba(255,255,255,0.9)',
        padding: '16px 18px',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* 4 Round Action Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px'
        }}>
          {/* FEED */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => {
                if (onOpenFeeding) {
                  audio.playPop();
                  onOpenFeeding(activeCat);
                } else {
                  handleAction('feed', 100, 0, 20, audio.playEat, "Nyam nyam! Ikan segar favorit anabul 🐟");
                }
              }}
              className="mockup-circle-btn"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#FFF9F0',
                border: '2.5px solid #8B5A2B',
                boxShadow: '0 4px 8px rgba(0,0,0,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              🐟
            </button>
            <span style={{ fontSize: '11px', fontWeight: '900', color: '#3B1E08' }}>FEED</span>
            <div style={{
              background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
              border: '1.5px solid #047857',
              borderRadius: '10px',
              padding: '1px 6px',
              color: '#FFF',
              fontSize: '10px',
              fontWeight: '900'
            }}>
              {onOpenFeeding ? 'Pilih Menu' : '🪙 100'}
            </div>
          </div>

          {/* PET */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => {
                handleAction('pet', 0, 0, 15, audio.playPurr, "Purrrr... Belaian hangat penuh kasih sayang ✨");
                if (onPetSuccess) onPetSuccess();
              }}
              className="mockup-circle-btn"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#FFF9F0',
                border: '2.5px solid #8B5A2B',
                boxShadow: '0 4px 8px rgba(0,0,0,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              ✋
            </button>
            <span style={{ fontSize: '11px', fontWeight: '900', color: '#3B1E08' }}>PET</span>
            <div style={{
              background: 'linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)',
              border: '1.5px solid #0369A1',
              borderRadius: '10px',
              padding: '1px 6px',
              color: '#FFF',
              fontSize: '10px',
              fontWeight: '900'
            }}>
              Gratis
            </div>
          </div>

          {/* PLAY */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => handleAction('play', 300, 0, 25, audio.playPop, "Yaaay! Kucing aktif bergulingan dengan bola wol 🧶")}
              className="mockup-circle-btn"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#FFF9F0',
                border: '2.5px solid #8B5A2B',
                boxShadow: '0 4px 8px rgba(0,0,0,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              🧶
            </button>
            <span style={{ fontSize: '11px', fontWeight: '900', color: '#3B1E08' }}>PLAY</span>
            <div style={{
              background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
              border: '1.5px solid #047857',
              borderRadius: '10px',
              padding: '1px 6px',
              color: '#FFF',
              fontSize: '10px',
              fontWeight: '900'
            }}>
              🪙 300
            </div>
          </div>

          {/* CLEAN */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <button
              onClick={() => handleAction('clean', 0, 150, 30, audio.playPop, "Bulu bersih berkilauan dan bebas kotoran! 🪮")}
              className="mockup-circle-btn"
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#FFF9F0',
                border: '2.5px solid #8B5A2B',
                boxShadow: '0 4px 8px rgba(0,0,0,0.18)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              🪮
            </button>
            <span style={{ fontSize: '11px', fontWeight: '900', color: '#3B1E08' }}>CLEAN</span>
            <div style={{
              background: 'linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)',
              border: '1.5px solid #6B21A8',
              borderRadius: '10px',
              padding: '1px 6px',
              color: '#FFF',
              fontSize: '10px',
              fontWeight: '900'
            }}>
              💎 150
            </div>
          </div>
        </div>

        {/* HAPPINESS BAR with Rainbow Gradient matching mockup */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '2px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11.5px',
            fontWeight: '900',
            color: '#5C3818'
          }}>
            <span>HAPPINESS BAR</span>
            <span style={{ color: '#059669' }}>{happiness}%</span>
          </div>

          {/* Rainbow Gradient Bar with Paw Notches */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '20px',
            background: '#FDEEE0',
            border: '2px solid #8B5A2B',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              width: `${happiness}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #FB7185 0%, #FBBF24 50%, #34D399 100%)',
              borderRadius: '10px',
              transition: 'width 0.4s ease'
            }} />

            {/* Paw Notches on the bar matching mockup */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 8px',
              pointerEvents: 'none',
              fontSize: '11px',
              opacity: 0.8
            }}>
              <span>🐾</span>
              <span>🐾</span>
              <span>🐾</span>
              <span>🐾</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-Left Kitten Care Card matching mockup */}
      <div
        onClick={handleUpgradeCareStation}
        style={{
          position: 'absolute',
          left: '3%',
          bottom: '96px',
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '3px solid #8B5A2B',
          borderRadius: '20px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.25), inset 0 2px 3px rgba(255,255,255,0.9)',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          zIndex: 20,
          cursor: 'pointer'
        }}
        title="Klik untuk upgrade fasilitas Kitten Care! 🐾"
      >
        {/* Cat ears */}
        <div style={{
          position: 'absolute',
          top: '-7px',
          left: '10px',
          width: '12px',
          height: '10px',
          background: '#FFFDF8',
          borderTop: '2.5px solid #8B5A2B',
          borderLeft: '2.5px solid #8B5A2B',
          transform: 'rotate(-25deg)',
          borderTopLeftRadius: '4px'
        }} />
        <div style={{
          position: 'absolute',
          top: '-7px',
          right: '10px',
          width: '12px',
          height: '10px',
          background: '#FFFDF8',
          borderTop: '2.5px solid #8B5A2B',
          borderRight: '2.5px solid #8B5A2B',
          transform: 'rotate(25deg)',
          borderTopRightRadius: '4px'
        }} />

        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: '#FFF6EA',
          border: '1.5px solid #E5C39E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src="/ui/sprites/yarn_ball.png"
            alt="Yarn"
            style={{ width: '80%', height: '80%', objectFit: 'contain' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
              Kitten Care
            </span>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#EA580C' }}>
              Lv. {careLevel} ⬆️
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{
              background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
              borderRadius: '12px',
              padding: '2px 8px',
              color: '#FFF',
              fontSize: '11px',
              fontWeight: '900'
            }}>
              🪙 {(careLevel * 1500).toLocaleString()} (Upgrade)
            </div>
            <div style={{
              background: 'linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)',
              borderRadius: '12px',
              padding: '2px 8px',
              color: '#FFF',
              fontSize: '11px',
              fontWeight: '900'
            }}>
              💎 +25
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
