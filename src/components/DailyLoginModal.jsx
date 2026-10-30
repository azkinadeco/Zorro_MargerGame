import React, { useState } from 'react';
import { audio } from '../utils/audio';
import { X, Gift, Check, Sparkles } from 'lucide-react';
import { safeConfetti as confetti } from '../utils/safeConfetti';

export const DAILY_REWARDS = [
  { day: 1, title: 'Hari 1', icon: '⚡', reward: { type: 'energy', value: 30, label: '+30 Energi' } },
  { day: 2, title: 'Hari 2', icon: '🪙', reward: { type: 'coins', value: 250, label: '+250 Koin' } },
  { day: 3, title: 'Hari 3', icon: '💎', reward: { type: 'gems', value: 20, label: '+20 Permata' } },
  { day: 4, title: 'Hari 4', icon: '⚡', reward: { type: 'energy', value: 50, label: '+50 Energi' } },
  { day: 5, title: 'Hari 5', icon: '🪙', reward: { type: 'coins', value: 500, label: '+500 Koin' } },
  { day: 6, title: 'Hari 6', icon: '💎', reward: { type: 'gems', value: 50, label: '+50 Permata' } },
  { day: 7, title: 'Hari 7', icon: '👑', reward: { type: 'grand', coins: 1500, gems: 100, energy: 100, label: 'Kotak Harta Zorro' } },
];

export function DailyLoginModal({
  isOpen = false,
  onClose,
  onClaim,
  onClaimDailyReward
}) {
  const [claimedDays, setClaimedDays] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_daily_claimed_days');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [currentDay, setCurrentDay] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_daily_current_day');
      return saved ? parseInt(saved, 10) : 1;
    } catch (e) {
      return 1;
    }
  });

  if (!isOpen) return null;

  const isTodayClaimed = claimedDays.includes(currentDay);

  const handleClaim = (dayItem) => {
    audio.playFanfare();
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.5 }
    });

    const newClaimed = [...claimedDays, dayItem.day];
    setClaimedDays(newClaimed);
    try {
      localStorage.setItem('zorro_daily_claimed_days', JSON.stringify(newClaimed));
      localStorage.setItem('zorro_daily_current_day', (currentDay % 7 + 1).toString());
    } catch (e) {}

    // Safely trigger callback prop
    const rewardPayload = {
      day: dayItem.day,
      coins: dayItem.reward.coins || (dayItem.reward.type === 'coins' ? dayItem.reward.value : 0),
      gems: dayItem.reward.gems || (dayItem.reward.type === 'gems' ? dayItem.reward.value : 0),
      energy: dayItem.reward.energy || (dayItem.reward.type === 'energy' ? dayItem.reward.value : 0)
    };

    if (typeof onClaim === 'function') {
      onClaim(rewardPayload);
    } else if (typeof onClaimDailyReward === 'function') {
      onClaimDailyReward(rewardPayload);
    }

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(26, 17, 11, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 220,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        style={{
          width: '920px',
          maxWidth: '96vw',
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '3.5px solid #8B5A2B',
          borderRadius: '26px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.9)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '12px 22px',
            background: 'linear-gradient(180deg, #FFFDF8 0%, #F5E3C9 100%)',
            borderBottom: '2.5px solid #E5C39E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🎁</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#3B1E08' }}>
                Hadiah Login Harian Cafe Zorro
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#8A5833' }}>
                Login setiap hari untuk bonus koin, permata, & energi kafe berturut-turut!
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              audio.playPop();
              if (onClose) onClose();
            }}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#FEE2E2',
              border: '2px solid #EF4444',
              color: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 7 Days Horizontal Track */}
        <div style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
            {DAILY_REWARDS.map((item) => {
              const isClaimed = claimedDays.includes(item.day);
              const isToday = currentDay === item.day;
              const isDay7 = item.day === 7;

              return (
                <div
                  key={item.day}
                  style={{
                    padding: '12px 8px',
                    borderRadius: '18px',
                    background: isClaimed
                      ? '#E2E8F0'
                      : isDay7
                      ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)'
                      : isToday
                      ? '#FEF3C7'
                      : '#FFF9F0',
                    border: isDay7
                      ? '2.5px solid #F59E0B'
                      : isToday
                      ? '2.5px solid #F59E0B'
                      : '1.5px solid #E5C39E',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '130px',
                    textAlign: 'center',
                    boxShadow: isToday ? '0 4px 14px rgba(245, 158, 11, 0.35)' : '0 2px 4px rgba(0,0,0,0.05)',
                    position: 'relative'
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: '900', color: isToday ? '#B45309' : '#8A5833' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: isDay7 ? '34px' : '28px', margin: '4px 0' }}>{item.icon}</span>
                  <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#3B1E08', lineHeight: '1.2' }}>
                    {isDay7 ? '+1500🪙 +100💎' : item.reward.label}
                  </span>

                  {isClaimed && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(255, 255, 255, 0.85)',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#059669',
                      fontWeight: '900',
                      fontSize: '12px',
                      gap: '2px'
                    }}>
                      <Check size={20} strokeWidth={3} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action Claim Button */}
          {!isTodayClaimed ? (
            <button
              onClick={() => {
                const todayReward = DAILY_REWARDS[Math.min(DAILY_REWARDS.length - 1, currentDay - 1)];
                handleClaim(todayReward);
              }}
              className="mockup-action-btn"
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
                border: '2.5px solid #047857',
                borderRadius: '18px',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 6px 16px rgba(5, 150, 105, 0.45)',
                animation: 'pulseReady 1.6s infinite'
              }}
            >
              <Gift size={20} />
              <span>Klaim Hadiah Hari {currentDay} Sekarang! ✨</span>
            </button>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '12px',
              background: '#F1F5F9',
              borderRadius: '16px',
              fontSize: '13px',
              fontWeight: '800',
              color: '#64748B'
            }}>
              Sudah diklaim hari ini! Mainkan pesanan cafe & kembali lagi besok 🐾
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
