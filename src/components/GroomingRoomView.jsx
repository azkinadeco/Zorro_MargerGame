import React, { useState } from 'react';
import { audio } from '../utils/audio';
import { safeConfetti as confetti } from '../utils/safeConfetti';
import { Sparkles, Wind, ShowerHead, Check, Scissors, Heart } from 'lucide-react';
import { InteractiveCatActor } from './InteractiveCatActor';

export function GroomingRoomView({
  coins = 14350,
  gems = 210,
  onSpendCoins,
  onSpendGems,
  onAddCoins,
  onAddEnergy,
  onGroomSuccess,
  onShowToast
}) {
  const [selectedCat, setSelectedCat] = useState('zorro'); // 'zorro' | 'thor' | 'loki'
  const [dryerLevel, setDryerLevel] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_dryer_level');
      return saved ? parseInt(saved, 10) : 4;
    } catch (e) {
      return 4;
    }
  });
  const [activeSpeech, setActiveSpeech] = useState(null);
  const [groomAction, setGroomAction] = useState(null);

  const cats = {
    zorro: {
      name: 'Zorro Tuxedo',
      role: 'Maskot Kafe',
      coat: 'Bulu Tuksedo Hitam-Putih Mengkilap',
      sound: audio.playPurr
    },
    thor: {
      name: 'Thor Tabby',
      role: 'Sous-Chef Dapur',
      coat: 'Bulu Belang Cokelat Lembut',
      sound: audio.playPurr
    },
    loki: {
      name: 'Loki Lion',
      role: 'Penjaga Kafe',
      coat: 'Surai Oranye Lebat & Halus',
      sound: audio.playPurr
    }
  };

  const currentCat = cats[selectedCat] || cats.zorro;

  const triggerGroom = (actionName, text, rewardCoins, rewardEnergy = 0) => {
    audio.playPurr();
    setGroomAction(actionName);
    if (rewardCoins && onAddCoins) onAddCoins(rewardCoins);
    if (rewardEnergy && onAddEnergy) onAddEnergy(rewardEnergy);
    if (onGroomSuccess) onGroomSuccess();

    setActiveSpeech(text);
    setTimeout(() => {
      setGroomAction(null);
      setActiveSpeech(null);
    }, 2800);

    confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
  };

  const handleBrush = () => {
    triggerGroom(
      'brush',
      `Purrrrrr... ${currentCat.coat} disisir lembut hingga berkilauan! ✨ +100 🪙`,
      100
    );
  };

  const handleWash = () => {
    triggerGroom(
      'wash',
      `Busa chamomile wangi bikin ${currentCat.name} sangat rileks & segar! 🫧 +150 🪙`,
      150
    );
  };

  const handleClawTrim = () => {
    audio.playPop();
    triggerGroom(
      'trim',
      `Kuku tapak ${currentCat.name} dipotong rapi, siap bermain lagi! ✂️ +200 🪙`,
      200
    );
  };

  const handleDryerBlow = () => {
    audio.playBake();
    const bonusCoins = 200 + (dryerLevel * 25);
    const bonusEnergy = 15 + Math.floor(dryerLevel * 2);
    triggerGroom(
      'dryer',
      `Pet Dryer Lv. ${dryerLevel} meniupkan angin hangat beraroma vanila! 💨 +${bonusCoins} 🪙 +${bonusEnergy} ⚡`,
      bonusCoins,
      bonusEnergy
    );
  };

  const handleUpgradeDryerCoins = () => {
    const costCoins = 8000;
    if (coins < costCoins) {
      audio.playPop();
      if (onShowToast) onShowToast("Koin tidak cukup untuk upgrade Pet Dryer! 🪙");
      return;
    }
    if (onSpendCoins) onSpendCoins(costCoins);
    const next = dryerLevel + 1;
    setDryerLevel(next);
    try { localStorage.setItem('zorro_dryer_level', next.toString()); } catch (e) {}
    audio.playFanfare();
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
    if (onShowToast) onShowToast(`Sukses upgrade Pet Dryer ke Lv. ${next}! 💨`);
  };

  const handleUpgradeDryerGems = () => {
    const costGems = 150;
    if (gems < costGems) {
      audio.playPop();
      if (onShowToast) onShowToast("Permata tidak cukup untuk upgrade Pet Dryer! 💎");
      return;
    }
    if (onSpendGems) onSpendGems(costGems);
    const next = dryerLevel + 1;
    setDryerLevel(next);
    try { localStorage.setItem('zorro_dryer_level', next.toString()); } catch (e) {}
    audio.playFanfare();
    confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
    if (onShowToast) onShowToast(`Sukses upgrade Pet Dryer ke Lv. ${next}! 💨`);
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundImage: 'url(/backgrounds/grooming_room.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden'
    }}>
      {/* Top-Left Plaque "Grooming Room" matching mockup */}
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
        {/* Cat ears */}
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
          Grooming Room
        </span>
      </div>

      {/* Floating Speech Bubble */}
      {activeSpeech && (
        <div style={{
          position: 'absolute',
          left: '60%',
          top: '38%',
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
            Salon Nina ✂️
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

      {/* Interactive Grooming Station: Center Spa Cat Actor (Enlarged & Table-Grounded) */}
      <div
        style={{
          position: 'absolute',
          left: '43%',
          top: '52%',
          transform: 'translate(-50%, -50%)',
          zIndex: 22
        }}
      >
        <InteractiveCatActor
          type={selectedCat}
          action={groomAction}
          size={290}
          initialPhotoMode={true}
          showModeToggle={true}
          onPet={() => {
            currentCat.sound();
            if (onGroomSuccess) onGroomSuccess();
            setActiveSpeech(`Purrrr... ${currentCat.name} sangat menikmati perawatan spa kafe! 🐾`);
            setTimeout(() => setActiveSpeech(null), 2500);
          }}
        />
      </div>

      {/* Interactive Grooming Action Visual FX */}
      {groomAction === 'wash' && (
        <div style={{ position: 'absolute', left: '52%', top: '56%', pointerEvents: 'none', zIndex: 25 }}>
          <span className="soap-bubble-effect" style={{ position: 'absolute', left: '-20px', top: '-30px', fontSize: '28px' }}>🫧</span>
          <span className="soap-bubble-effect" style={{ position: 'absolute', left: '20px', top: '-10px', fontSize: '22px', animationDelay: '0.3s' }}>🫧</span>
          <span className="soap-bubble-effect" style={{ position: 'absolute', left: '0px', top: '20px', fontSize: '26px', animationDelay: '0.6s' }}>🫧</span>
        </div>
      )}

      {groomAction === 'dryer' && (
        <div style={{ position: 'absolute', left: '52%', top: '56%', pointerEvents: 'none', zIndex: 25 }}>
          <span className="soap-bubble-effect" style={{ position: 'absolute', left: '-30px', top: '-20px', fontSize: '26px' }}>💨</span>
          <span className="soap-bubble-effect" style={{ position: 'absolute', left: '15px', top: '10px', fontSize: '24px', animationDelay: '0.4s' }}>💨</span>
        </div>
      )}

      {groomAction === 'brush' && (
        <div style={{ position: 'absolute', left: '52%', top: '56%', pointerEvents: 'none', zIndex: 25 }}>
          <span style={{ position: 'absolute', left: '-15px', top: '-25px', fontSize: '24px', animation: 'sparkleGlow 1s infinite' }}>✨</span>
          <span style={{ position: 'absolute', left: '25px', top: '0px', fontSize: '20px', animation: 'sparkleGlow 1s infinite', animationDelay: '0.3s' }}>✨</span>
        </div>
      )}

      {/* Right-Side Spa & Grooming Card */}
      <div style={{
        position: 'absolute',
        right: '4%',
        top: '14%',
        width: '330px',
        background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
        border: '3.5px solid #8B5A2B',
        borderRadius: '24px',
        boxShadow: '0 10px 28px rgba(0,0,0,0.3)',
        padding: '14px 16px',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {/* Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #E5C39E',
          paddingBottom: '6px'
        }}>
          <span style={{ fontSize: '15px', fontWeight: '900', color: '#3B1E08' }}>
            Spa & Perawatan Bulu 🐾
          </span>
          <span style={{ fontSize: '11px', fontWeight: '900', color: '#EA580C' }}>
            {currentCat.name.split(' ')[0]}
          </span>
        </div>

        {/* Cat Selector */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {Object.entries(cats).map(([key, cat]) => {
            const isSelected = selectedCat === key;
            return (
              <button
                key={key}
                onClick={() => {
                  audio.playPop();
                  setSelectedCat(key);
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
                  cursor: 'pointer'
                }}
              >
                {cat.name.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* 4 Grooming Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '2px' }}>
          <button
            onClick={handleBrush}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #FDBA74 0%, #EA580C 100%)',
              border: '2px solid #9A3412',
              borderRadius: '14px',
              padding: '8px 12px',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}
          >
            <span>🪮 Sisir Bulu Lembut</span>
            <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '10px' }}>
              🪙 +100
            </span>
          </button>

          <button
            onClick={handleWash}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)',
              border: '2px solid #0369A1',
              borderRadius: '14px',
              padding: '8px 12px',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}
          >
            <span>🫧 Mandi Busa Hangat</span>
            <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '10px' }}>
              🪙 +150
            </span>
          </button>

          <button
            onClick={handleClawTrim}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)',
              border: '2px solid #6B21A8',
              borderRadius: '14px',
              padding: '8px 12px',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}
          >
            <span>✂️ Potong Kuku Paw</span>
            <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '10px' }}>
              🪙 +200
            </span>
          </button>

          <button
            onClick={handleDryerBlow}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
              border: '2px solid #047857',
              borderRadius: '14px',
              padding: '8px 12px',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
            }}
          >
            <span>💨 Pet Dryer (Lv. {dryerLevel})</span>
            <span style={{ fontSize: '11px', background: 'rgba(0,0,0,0.2)', padding: '2px 8px', borderRadius: '10px' }}>
              🪙 +{200 + (dryerLevel * 25)} | ⚡ +{15 + Math.floor(dryerLevel * 2)}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom-Left Pet Dryer Card matching mockup */}
      <div style={{
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
        zIndex: 20
      }}>
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

        {/* Dryer Icon */}
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: '#FFF6EA',
          border: '1.5px solid #E5C39E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px'
        }}>
          💨
        </div>

        {/* Info & Price Button */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
              Pet Dryer Upgrade
            </span>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#EA580C' }}>
              Lv. {dryerLevel}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={handleUpgradeDryerCoins}
              className="mockup-action-btn"
              style={{
                background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
                border: '1.5px solid #047857',
                borderRadius: '12px',
                padding: '3px 10px',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
              title="Upgrade dengan 8.000 Koin"
            >
              <span>🪙</span>
              <span>8,000</span>
            </button>

            <button
              onClick={handleUpgradeDryerGems}
              className="mockup-action-btn"
              style={{
                background: 'linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)',
                border: '1.5px solid #6B21A8',
                borderRadius: '12px',
                padding: '3px 10px',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}
              title="Upgrade dengan 150 Permata"
            >
              <span>💎</span>
              <span>150</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
