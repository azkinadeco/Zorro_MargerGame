import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';
import { safeConfetti as confetti } from '../utils/safeConfetti';
import { Sparkles, Heart, Star, Award, Zap, ChevronUp } from 'lucide-react';
import { InteractiveCatActor } from './InteractiveCatActor';

export function CatRoomView({
  coins = 14350,
  gems = 210,
  onAddCoins,
  onAddGems,
  onAddEnergy,
  onShowToast
}) {
  const [selectedKitten, setSelectedKitten] = useState('zorro'); // 'zorro' | 'thor' | 'loki'
  const [activeSpeech, setActiveSpeech] = useState(null);
  const [hearts, setHearts] = useState([]);

  // Persisted Kitten Growth Levels
  const [kittenLevels, setKittenLevels] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_kitten_levels');
      return saved ? JSON.parse(saved) : { zorro: 1, thor: 1, loki: 1 };
    } catch (e) {
      return { zorro: 1, thor: 1, loki: 1 };
    }
  });

  // Persisted Kitten Happiness (0 - 100)
  const [happiness, setHappiness] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_kitten_happiness');
      return saved ? JSON.parse(saved) : { zorro: 70, thor: 60, loki: 80 };
    } catch (e) {
      return { zorro: 70, thor: 60, loki: 80 };
    }
  });

  // Nursery Facility Level
  const [nurseryFacilityLevel, setNurseryFacilityLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_nursery_level');
      return saved ? parseInt(saved, 10) : 5;
    } catch (e) {
      return 5;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('zorro_kitten_levels', JSON.stringify(kittenLevels));
    } catch (e) {}
  }, [kittenLevels]);

  useEffect(() => {
    try {
      localStorage.setItem('zorro_kitten_happiness', JSON.stringify(happiness));
    } catch (e) {}
  }, [happiness]);

  useEffect(() => {
    try {
      localStorage.setItem('zorro_nursery_level', nurseryFacilityLevel.toString());
    } catch (e) {}
  }, [nurseryFacilityLevel]);

  const kittens = {
    zorro: {
      name: 'Baby Zorro',
      title: kittenLevels.zorro >= 5 ? 'Pangeran Tuxedo' : kittenLevels.zorro >= 3 ? 'Kucing Kecil Elegan' : 'Anak Kucing Tuxedo',
      desc: 'Anak kucing tuxedo bermata bulat menggemaskan yang selalu penasaran.',
      sprite: '/ui/sprites/kitten_sleeping.png',
      fav: 'Susu Hangat',
      perk: `+${10 + (kittenLevels.zorro * 5)}% Peluang Kotak Kejutan Merge`,
      perkIcon: '🎁'
    },
    thor: {
      name: 'Baby Thor',
      title: kittenLevels.thor >= 5 ? 'Master Chef Cilik' : kittenLevels.thor >= 3 ? 'Sous-Chef Ceria' : 'Anak Kucing Belang',
      desc: 'Anak kucing tabi lincah suka bergulingan & mencium aroma dapur.',
      sprite: '/ui/sprites/cat_thor_tabby.png',
      fav: 'Bola Wol Rajut',
      perk: `+${10 + (kittenLevels.thor * 5)}% Bonus Koin Pesanan Kafe`,
      perkIcon: '🪙'
    },
    loki: {
      name: 'Baby Loki',
      title: kittenLevels.loki >= 5 ? 'Raja Singa Oranye' : kittenLevels.loki >= 3 ? 'Surai Emas Menggemaskan' : 'Anak Kucing Singa',
      desc: 'Anak kucing oranye manis berbulu lebat singa yang gemar tidur siang.',
      sprite: '/ui/sprites/cat_loki_orange.png',
      fav: 'Bantal Empuk',
      perk: `+${15 + (kittenLevels.loki * 5)}% Kecepatan Regenerasi Energi`,
      perkIcon: '⚡'
    }
  };

  const currentKitten = kittens[selectedKitten];
  const curLevel = kittenLevels[selectedKitten] || 1;
  const curHap = happiness[selectedKitten] || 70;

  const triggerCareReaction = (text, coinReward = 0, energyReward = 0, soundFunc = audio.playPurr) => {
    soundFunc();
    if (coinReward && onAddCoins) onAddCoins(coinReward);
    if (energyReward && onAddEnergy) onAddEnergy(energyReward);

    setHappiness(prev => {
      const nextVal = Math.min(100, (prev[selectedKitten] || 50) + 15);
      return {
        ...prev,
        [selectedKitten]: nextVal
      };
    });

    const newHeart = {
      id: Date.now() + Math.random(),
      x: 72 + (Math.random() * 12 - 6),
      y: 64 + (Math.random() * 10 - 5)
    };
    setHearts(prev => [...prev.slice(-4), newHeart]);

    setActiveSpeech(text);
    setTimeout(() => setActiveSpeech(null), 3200);

    if (Math.random() > 0.6) {
      confetti({ particleCount: 25, spread: 55, origin: { y: 0.65 } });
    }
  };

  const handleKittenCuddle = () => {
    triggerCareReaction(
      `Nina memeluk & mengelus ${currentKitten.name}... Purrrrr hangat! 🐾 +150 🪙 +10 ⚡`,
      150,
      10,
      audio.playPurr
    );
  };

  const handleMilkBottle = () => {
    triggerCareReaction(
      `${currentKitten.name} kenyang meminum susu hangat beraroma vanila! 🍼 +200 🪙`,
      200,
      0,
      audio.playEat
    );
  };

  const handleYarnPlay = () => {
    triggerCareReaction(
      `Yaaay! ${currentKitten.name} melompat ceria mengejar bola wol! 🧶 +100 🪙 +15 ⚡`,
      100,
      15,
      audio.playPop
    );
  };

  const handleSleepNap = () => {
    triggerCareReaction(
      `Ssshh... ${currentKitten.name} tertidur pulas di kasur busa mimpi indah 💤 +25 ⚡`,
      0,
      25,
      audio.playPurr
    );
  };

  // Kitten Growth Level-Up when 100% Happiness
  const handleLevelUpKitten = () => {
    audio.playFanfare();
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { x: 0.75, y: 0.4 }
    });

    const nextLevel = curLevel + 1;
    setKittenLevels(prev => ({
      ...prev,
      [selectedKitten]: nextLevel
    }));
    setHappiness(prev => ({
      ...prev,
      [selectedKitten]: 20
    }));

    if (onAddCoins) onAddCoins(500);
    if (onAddGems) onAddGems(25);
    if (onShowToast) {
      onShowToast(`🎉 Selamat! ${currentKitten.name} TUMBUH ke Lv.${nextLevel}! Hadiah: +500 🪙 & +25 💎!`);
    }

    setActiveSpeech(`🌟 Yaaay! Aku tumbuh makin kuat & lincah! Perk: ${currentKitten.perk}!`);
    setTimeout(() => setActiveSpeech(null), 4000);
  };

  // Nursery Facility Upgrade
  const handleUpgradeFacility = () => {
    const cost = nurseryFacilityLevel * 1500;
    if (coins < cost) {
      audio.playPop();
      if (onShowToast) onShowToast(`Koin tidak cukup! Butuh ${cost.toLocaleString()} 🪙`);
      return;
    }

    audio.playFanfare();
    if (onAddCoins) onAddCoins(-cost);
    setNurseryFacilityLevel(prev => prev + 1);
    confetti({ particleCount: 35, spread: 60, origin: { x: 0.1, y: 0.8 } });
    if (onShowToast) onShowToast(`Fasilitas Nursery ditingkatkan ke Lv.${nurseryFacilityLevel + 1}! 🍼✨`);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundImage: 'url(/backgrounds/cat_room.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden'
    }}>
      {/* Plaque "Cat Room" matching mockup */}
      <div style={{
        position: 'absolute',
        left: '4%',
        top: '12%',
        background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
        border: '3px solid #8B5A2B',
        borderRadius: '24px',
        boxShadow: '0 6px 16px rgba(0,0,0,0.25), inset 0 2px 3px rgba(255,255,255,0.9)',
        padding: '8px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20
      }}>
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '12px',
          width: '14px',
          height: '12px',
          background: '#FFFDF8',
          borderTop: '3px solid #8B5A2B',
          borderLeft: '3px solid #8B5A2B',
          transform: 'rotate(-25deg)',
          borderTopLeftRadius: '5px'
        }} />
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '12px',
          width: '14px',
          height: '12px',
          background: '#FFFDF8',
          borderTop: '3px solid #8B5A2B',
          borderRight: '3px solid #8B5A2B',
          transform: 'rotate(25deg)',
          borderTopRightRadius: '5px'
        }} />

        <span style={{
          fontSize: '22px',
          fontWeight: '900',
          color: '#3B1E08',
          letterSpacing: '0.5px'
        }}>
          Cat Nursery
        </span>
      </div>

      {/* Floating Hearts */}
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: 'absolute',
            left: `${h.x}%`,
            top: `${h.y}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: '22px',
            animation: 'floatPurr 1.6s forwards',
            pointerEvents: 'none',
            zIndex: 35
          }}
        >
          💖
        </div>
      ))}

      {/* Nursery Scene: Nina with Baby Kitten Actor (Life-Size Proportional Scale) */}
      <div
        style={{
          position: 'absolute',
          left: '70%',
          top: '56%',
          transform: 'translate(-50%, -50%)',
          zIndex: 22,
          display: 'flex',
          alignItems: 'flex-end',
          gap: '12px'
        }}
      >
        {/* Nina Sitting by the Nursery Crib */}
        <div
          onClick={handleKittenCuddle}
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '10px'
          }}
          title="Nina sedang merawat anak kucing 🍼"
        >
          <div
            className="cat-breathe"
            style={{
              position: 'relative',
              width: '135px',
              height: '235px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.45))'
            }}
          >
            {/* Contact Shadow under Nina */}
            <div
              style={{
                position: 'absolute',
                bottom: '4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '110px',
                height: '18px',
                background: 'radial-gradient(ellipse at center, rgba(30, 15, 5, 0.45) 0%, rgba(30, 15, 5, 0) 70%)',
                borderRadius: '50%',
                pointerEvents: 'none'
              }}
            />
            <img
              src="/cats/nina_transparent.png"
              alt="Nina"
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>
          <span style={{
            fontSize: '11px',
            fontWeight: '900',
            color: '#FFF',
            background: 'linear-gradient(180deg, #EA580C 0%, #C2410C 100%)',
            border: '1.5px solid #7C2D12',
            borderRadius: '12px',
            padding: '3px 12px',
            marginTop: '-8px',
            boxShadow: '0 3px 8px rgba(0,0,0,0.25)',
            zIndex: 5
          }}>
            👩🏻‍🍼 Nina Caretaker
          </span>
        </div>

        {/* Baby Kitten Actor (Enlarged inside Crib) */}
        <InteractiveCatActor
          type={selectedKitten}
          stage="kitten"
          size={240}
          initialPhotoMode={true}
          showModeToggle={true}
          onPet={handleKittenCuddle}
        />
      </div>

      {/* Floating Speech */}
      {activeSpeech && (
        <div style={{
          position: 'absolute',
          left: '74%',
          top: '48%',
          transform: 'translate(-50%, -100%)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8F0 100%)',
          border: '2.5px solid #8B5A2B',
          borderRadius: '18px',
          padding: '8px 14px',
          maxWidth: '260px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          zIndex: 30,
          animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '900', color: '#EA580C', marginBottom: '2px' }}>
            Nursery Care 🍼
          </div>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#3B1E08', lineHeight: '1.3' }}>
            {activeSpeech}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '8px solid #8B5A2B'
          }} />
        </div>
      )}

      {/* Right-Side Care Station Card */}
      <div style={{
        position: 'absolute',
        right: '4%',
        top: '12%',
        width: '320px',
        background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
        border: '3.5px solid #8B5A2B',
        borderRadius: '24px',
        boxShadow: '0 10px 28px rgba(0,0,0,0.3)',
        padding: '12px 16px',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {/* Title & Level Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #E5C39E',
          paddingBottom: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '14px', fontWeight: '900', color: '#3B1E08' }}>
              {currentKitten.name}
            </span>
            <span style={{
              fontSize: '11px',
              fontWeight: '900',
              background: '#EA580C',
              color: '#FFF',
              padding: '1px 6px',
              borderRadius: '8px'
            }}>
              Lv.{curLevel}
            </span>
          </div>
          <span style={{ fontSize: '11px', fontWeight: '900', color: curHap >= 100 ? '#EA580C' : '#059669' }}>
            {curHap}% Nyaman
          </span>
        </div>

        {/* Kitten Selector Chips */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {Object.entries(kittens).map(([key, kit]) => {
            const isSelected = selectedKitten === key;
            const kLvl = kittenLevels[key] || 1;
            return (
              <button
                key={key}
                onClick={() => {
                  audio.playPop();
                  setSelectedKitten(key);
                }}
                style={{
                  flex: 1,
                  background: isSelected ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)' : '#FFF',
                  color: isSelected ? '#FFF' : '#78350F',
                  border: isSelected ? '2px solid #9A3412' : '1.5px solid #FED7AA',
                  borderRadius: '12px',
                  padding: '4px 6px',
                  fontSize: '11px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 2px 5px rgba(234, 88, 12, 0.3)' : 'none'
                }}
              >
                {kit.name.split(' ')[1]} Lv.{kLvl}
              </button>
            );
          })}
        </div>

        {/* Happiness Meter Progress Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '800', color: '#78350F' }}>
            <span>Kemajuan Pertumbuhan</span>
            <span>{curHap}/100</span>
          </div>
          <div style={{
            width: '100%',
            height: '10px',
            background: '#FED7AA',
            borderRadius: '6px',
            overflow: 'hidden',
            border: '1px solid #D97706'
          }}>
            <div style={{
              width: `${curHap}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #F59E0B 0%, #10B981 100%)',
              borderRadius: '6px',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Evolution Level Up Button (If 100% Happiness) */}
        {curHap >= 100 ? (
          <button
            onClick={handleLevelUpKitten}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #FBBF24 0%, #D97706 100%)',
              border: '2.5px solid #78350F',
              borderRadius: '14px',
              padding: '8px 12px',
              color: '#3B1E08',
              fontSize: '12px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(217, 119, 6, 0.45)',
              animation: 'bouncePurr 1.6s infinite'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} color="#78350F" />
              <span>TUMBUH KE LV.{curLevel + 1}!</span>
            </span>
            <span style={{ fontSize: '11px', background: '#FFF', padding: '2px 8px', borderRadius: '10px', color: '#78350F' }}>
              +500 🪙 +25 💎
            </span>
          </button>
        ) : (
          <div style={{
            fontSize: '10.5px',
            fontWeight: '800',
            color: '#92400E',
            background: '#FEF3C7',
            padding: '4px 8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span>{currentKitten.perkIcon}</span>
            <span>Perk: <b>{currentKitten.perk}</b></span>
          </div>
        )}

        {/* Care Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '2px' }}>
          <button
            onClick={handleMilkBottle}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)',
              border: '2px solid #0369A1',
              borderRadius: '12px',
              padding: '7px 10px',
              color: '#FFFFFF',
              fontSize: '11.5px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <span>🍼 Beri Susu Hangat</span>
            <span style={{ fontSize: '10px', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '8px' }}>
              🪙 +200
            </span>
          </button>

          <button
            onClick={handleYarnPlay}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)',
              border: '2px solid #6B21A8',
              borderRadius: '12px',
              padding: '7px 10px',
              color: '#FFFFFF',
              fontSize: '11.5px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <span>🧶 Mainan Bola Wol</span>
            <span style={{ fontSize: '10px', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '8px' }}>
              🪙 +100 | ⚡ +15
            </span>
          </button>

          <button
            onClick={handleKittenCuddle}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #FDBA74 0%, #EA580C 100%)',
              border: '2px solid #9A3412',
              borderRadius: '12px',
              padding: '7px 10px',
              color: '#FFFFFF',
              fontSize: '11.5px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <span>🐾 Peluk & Elus Manja</span>
            <span style={{ fontSize: '10px', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '8px' }}>
              🪙 +150 | ⚡ +10
            </span>
          </button>

          <button
            onClick={handleSleepNap}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
              border: '2px solid #047857',
              borderRadius: '12px',
              padding: '7px 10px',
              color: '#FFFFFF',
              fontSize: '11.5px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          >
            <span>🛏️ Tidurkan di Kasur Busa</span>
            <span style={{ fontSize: '10px', background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '8px' }}>
              ⚡ +25
            </span>
          </button>
        </div>
      </div>

      {/* Bottom-Left Card matching mockup with interactive Upgrade */}
      <div
        onClick={handleUpgradeFacility}
        style={{
          position: 'absolute',
          left: '4%',
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
        title="Klik untuk tingkatkan fasilitas Nursery! 🍼"
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
              Nursery Care
            </span>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#EA580C' }}>
              Lv. {nurseryFacilityLevel} ⬆️
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
              🪙 {(nurseryFacilityLevel * 1500).toLocaleString()} (Upgrade)
            </div>
            <div style={{
              background: 'linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)',
              borderRadius: '12px',
              padding: '2px 8px',
              color: '#FFF',
              fontSize: '11px',
              fontWeight: '900'
            }}>
              💎 +25/Lv
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
