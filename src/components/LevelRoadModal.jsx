import React, { useState } from 'react';
import { X, Trophy, Sparkles, Star, Gift, Check, ArrowRight, Zap, Award } from 'lucide-react';
import { audio } from '../utils/audio';
import { safeConfetti } from '../utils/safeConfetti';

export function LevelRoadModal({
  level = 1,
  levelProgress = 65,
  onClose,
  onAddCoins,
  onAddGems,
  onAddEnergy,
  onLevelUp,
  onShowToast
}) {
  const [claimedLevels, setClaimedLevels] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_claimed_level_road');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const levelMilestones = [
    {
      level: 1,
      title: 'Pemilik Kafe Pemula',
      featureUnlocked: 'Papan Merge, Dapur Meowffins & Kado Harian',
      icon: '☕',
      reward: { coins: 300, gems: 10, energy: 20 },
      desc: 'Langkah pertama mengelola Kafe Kucing Zorro bersama Nina!'
    },
    {
      level: 2,
      title: 'Pelayan Penuh Bakat',
      featureUnlocked: 'Roda Rezeki & Cat Pass Quests',
      icon: '🎡',
      reward: { coins: 500, gems: 15, energy: 25 },
      desc: 'Membuka putaran Roda Keberuntungan harian & jalur misi berhadiah.'
    },
    {
      level: 3,
      title: 'Barista Bersemangat',
      featureUnlocked: 'Festival Kafe & Buku Tamu Reputasi',
      icon: '🎂',
      reward: { coins: 750, gems: 20, energy: 30 },
      desc: 'Membuka festival ulang tahun kafe dan ulasan pelanggan setia.'
    },
    {
      level: 4,
      title: 'Koki Pastry Mandiri',
      featureUnlocked: 'Resep Cat\'s Paw Croissant & Pohon Kucing',
      icon: '🥐',
      reward: { coins: 1000, gems: 25, energy: 35 },
      desc: 'Membuka resep croissant renyah & instalasi pohon panjat anabul.'
    },
    {
      level: 5,
      title: 'Sahabat Sejati Anabul',
      featureUnlocked: 'Miaow Market & Bantal Sofa Beludru',
      icon: '🛒',
      reward: { coins: 1200, gems: 30, energy: 40 },
      desc: 'Membuka Miaow Market di peta desa & dekorasi bantal kafe.'
    },
    {
      level: 6,
      title: 'Petualang Desa Kucing',
      featureUnlocked: 'Cat Park & Jam Bandul Dinding',
      icon: '⛲',
      reward: { coins: 1500, gems: 35, energy: 45 },
      desc: 'Membuka taman kucing di peta & jam dinding bandul meong.'
    },
    {
      level: 7,
      title: 'Master Pastry & Kopi',
      featureUnlocked: 'Resep Honey Paw Waffle & Piano Kafe',
      icon: '🧇',
      reward: { coins: 1800, gems: 40, energy: 50 },
      desc: 'Membuka resep waffle madu & instrumen piano klasik di lobby.'
    },
    {
      level: 8,
      title: 'Penguasa Alun-Alun',
      featureUnlocked: 'Kitten Plaza & Hutan Catnip Liar',
      icon: '🎪',
      reward: { coins: 2000, gems: 45, energy: 55 },
      desc: 'Membuka alun-alun festival & zona ekspedisi hutan catnip liar.'
    },
    {
      level: 10,
      title: 'Chef Bintang Lima',
      featureUnlocked: 'Resep Tuxedo Dark Tart & Danau Salmon',
      icon: '🥧',
      reward: { coins: 2500, gems: 60, energy: 70 },
      desc: 'Membuka tart cokelat mewah Zorro & danau pancing salmon segar.'
    },
    {
      level: 15,
      title: 'Legenda Kerajaan Kucing',
      featureUnlocked: 'Kue Royal Shortcake & Kastil Tuxedo Kuno',
      icon: '👑',
      reward: { coins: 5000, gems: 120, energy: 100 },
      desc: 'Membuka kue termahal di kerajaan & akses ke kastil leluhur Zorro!'
    }
  ];

  const handleClaim = (milestone) => {
    if (claimedLevels.includes(milestone.level)) return;
    if (level < milestone.level) return;

    audio.playFanfare();
    safeConfetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });

    if (onAddCoins) onAddCoins(milestone.reward.coins);
    if (onAddGems) onAddGems(milestone.reward.gems);
    if (onAddEnergy) onAddEnergy(milestone.reward.energy);

    const nextClaimed = [...claimedLevels, milestone.level];
    setClaimedLevels(nextClaimed);
    try {
      localStorage.setItem('zorro_claimed_level_road', JSON.stringify(nextClaimed));
    } catch (e) {}

    if (onShowToast) {
      onShowToast(`🎉 Hadiah Tingkat ${milestone.level} Diklaim! +${milestone.reward.coins} 🪙 +${milestone.reward.gems} 💎 +${milestone.reward.energy} ⚡`);
    }
  };

  const handleClaimAll = () => {
    const uncollected = levelMilestones.filter(m => level >= m.level && !claimedLevels.includes(m.level));
    if (uncollected.length === 0) {
      if (onShowToast) onShowToast("Semua hadiah level yang terbuka sudah kamu klaim!");
      return;
    }

    let totCoins = 0;
    let totGems = 0;
    let totEnergy = 0;
    const newClaimedIds = [...claimedLevels];

    uncollected.forEach(m => {
      totCoins += m.reward.coins;
      totGems += m.reward.gems;
      totEnergy += m.reward.energy;
      newClaimedIds.push(m.level);
    });

    audio.playFanfare();
    safeConfetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });

    if (onAddCoins) onAddCoins(totCoins);
    if (onAddGems) onAddGems(totGems);
    if (onAddEnergy) onAddEnergy(totEnergy);

    setClaimedLevels(newClaimedIds);
    try {
      localStorage.setItem('zorro_claimed_level_road', JSON.stringify(newClaimedIds));
    } catch (e) {}

    if (onShowToast) {
      onShowToast(`✨ Sukses Klaim Semua Hadiah Level: +${totCoins.toLocaleString()} 🪙 +${totGems} 💎 +${totEnergy} ⚡!`);
    }
  };

  const handleFastLevelUp = () => {
    audio.playLevelUp();
    if (onLevelUp) onLevelUp(1);
    safeConfetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
    if (onShowToast) onShowToast("🚀 Kafe Naik Level! Tingkat fitur bertambah!");
  };

  const uncollectedCount = levelMilestones.filter(m => level >= m.level && !claimedLevels.includes(m.level)).length;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
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
        className="cozy-card"
        style={{
          width: '960px',
          maxWidth: '96vw',
          height: '560px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFDF9',
          borderRadius: '26px',
          overflow: 'hidden',
          border: '3.5px solid #F59E0B',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          animation: 'pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '12px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2.5px solid #FDE68A',
          background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #F59E0B, #D97706)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(217, 119, 6, 0.3)',
              color: '#FFF'
            }}>
              <Trophy size={24} />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#78350F', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Jalur Tingkat Kafe & Hadiah Fitur</span>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '900',
                  color: '#FFF',
                  background: '#EA580C',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  Level {level} ⭐
                </span>
              </div>
              <div style={{ fontSize: '11.5px', color: '#92400E', fontWeight: '700' }}>
                Tingkatkan level kafe untuk membuka resep dapur, wilayah peta desa, dan fitur eksklusif!
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Quick Test Level Up button */}
            <button
              onClick={handleFastLevelUp}
              className="mockup-action-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)',
                border: '2px solid #0369A1',
                borderRadius: '16px',
                padding: '7px 14px',
                fontSize: '12px',
                fontWeight: '900',
                color: '#FFF',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
              }}
              title="Naikkan 1 Level untuk membuka fitur baru seketika"
            >
              <Zap size={14} />
              <span>+1 Level Kafe 🚀</span>
            </button>

            {/* Claim All Button */}
            {uncollectedCount > 0 && (
              <button
                onClick={handleClaimAll}
                className="mockup-action-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                  border: '2px solid #047857',
                  borderRadius: '16px',
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: '900',
                  color: '#FFF',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(5, 150, 105, 0.3)'
                }}
              >
                <Sparkles size={14} />
                <span>Klaim Semua ({uncollectedCount}) ✨</span>
              </button>
            )}

            <button
              onClick={() => {
                audio.playPop();
                if (onClose) onClose();
              }}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: '#FFF',
                border: '1.5px solid #FCD34D',
                color: '#78350F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Milestone Road List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {levelMilestones.map((m) => {
            const isReached = level >= m.level;
            const isClaimed = claimedLevels.includes(m.level);

            return (
              <div
                key={m.level}
                style={{
                  background: isClaimed
                    ? '#F8FAFC'
                    : isReached
                    ? 'linear-gradient(135deg, #FFFDF8 0%, #FEF9C3 100%)'
                    : '#FFFFFF',
                  border: isReached && !isClaimed
                    ? '2.5px solid #F59E0B'
                    : isClaimed
                    ? '1.5px solid #CBD5E1'
                    : '1.5px solid #E2E8F0',
                  borderRadius: '20px',
                  padding: '14px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  boxShadow: isReached && !isClaimed
                    ? '0 6px 16px rgba(245, 158, 11, 0.2)'
                    : '0 2px 6px rgba(0,0,0,0.04)',
                  position: 'relative',
                  opacity: isReached ? 1 : 0.75
                }}
              >
                {/* Level Badge & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '16px',
                    background: isReached ? 'linear-gradient(135deg, #FEF3C7, #FDE68A)' : '#F1F5F9',
                    border: isReached ? '2px solid #F59E0B' : '1.5px solid #CBD5E1',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '20px' }}>{m.icon}</span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: '900',
                      color: isReached ? '#78350F' : '#64748B'
                    }}>
                      Lv.{m.level}
                    </span>
                  </div>

                  {/* Title & Unlocked Feature Description */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: '900', color: isReached ? '#3B1E08' : '#64748B' }}>
                        {m.title}
                      </span>
                      {isReached && !isClaimed && (
                        <span style={{
                          fontSize: '9.5px',
                          fontWeight: '900',
                          color: '#059669',
                          background: '#D1FAE5',
                          padding: '1px 6px',
                          borderRadius: '8px'
                        }}>
                          SIAP KLAIM!
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#D97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>🔓 Terbuka:</span>
                      <span>{m.featureUnlocked}</span>
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: '600', color: '#78350F' }}>
                      {m.desc}
                    </div>
                  </div>
                </div>

                {/* Right Rewards & Claim Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Reward preview pills */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#FFF',
                    padding: '6px 10px',
                    borderRadius: '14px',
                    border: '1px solid #E5D5C5'
                  }}>
                    <span style={{ fontSize: '11.5px', fontWeight: '900', color: '#D97706' }}>+{m.reward.coins} 🪙</span>
                    <span style={{ fontSize: '11.5px', fontWeight: '900', color: '#9333EA' }}>+{m.reward.gems} 💎</span>
                    <span style={{ fontSize: '11.5px', fontWeight: '900', color: '#0284C7' }}>+{m.reward.energy} ⚡</span>
                  </div>

                  {/* Action Button */}
                  {isClaimed ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '8px 14px',
                      background: '#F1F5F9',
                      borderRadius: '14px',
                      color: '#64748B',
                      fontSize: '12px',
                      fontWeight: '800'
                    }}>
                      <Check size={14} color="#059669" />
                      <span>Sudah Diklaim</span>
                    </div>
                  ) : isReached ? (
                    <button
                      onClick={() => handleClaim(m)}
                      className="mockup-action-btn"
                      style={{
                        background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                        border: '2px solid #B45309',
                        borderRadius: '14px',
                        padding: '8px 16px',
                        color: '#FFF',
                        fontSize: '12.5px',
                        fontWeight: '900',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 10px rgba(217, 119, 6, 0.3)'
                      }}
                    >
                      <Gift size={14} />
                      <span>Klaim Hadiah</span>
                    </button>
                  ) : (
                    <div style={{
                      padding: '8px 14px',
                      background: '#F3F4F6',
                      borderRadius: '14px',
                      color: '#9CA3AF',
                      fontSize: '12px',
                      fontWeight: '800'
                    }}>
                      🔒 Butuh Lv. {m.level}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
