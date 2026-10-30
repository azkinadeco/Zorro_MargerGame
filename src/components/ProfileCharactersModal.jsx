import React, { useState } from 'react';
import { audio } from '../utils/audio';
import { safeConfetti as confetti } from '../utils/safeConfetti';
import { X, Award, Check, Sparkles, Trophy, User, Heart, ArrowRight } from 'lucide-react';

export function ProfileCharactersModal({
  isOpen,
  onClose,
  level = 18,
  totalOrdersServed = 8,
  friendshipData = {},
  discoveredItemIds = [],
  coins = 14350,
  gems = 210,
  onAddCoins,
  onAddGems,
  onOpenInteractCat,
  onOpenWardrobe,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'cats' | 'achievements'
  const [selectedCat, setSelectedCat] = useState('zorro');

  const [claimedAchievements, setClaimedAchievements] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_claimed_achievements');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  if (!isOpen) return null;

  // Cat Characters dossiers
  const catCharacters = [
    {
      id: 'zorro',
      name: 'Zorro Tuxedo',
      role: 'Maskot Utama & Kepala Pencicip',
      sprite: '/cats/zoro_transparent.png',
      badge: '👑 Tuxedo King',
      bgGrad: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
      desc: 'Kucing berbulu tuksedo hitam-putih bermata bundar penasaran. Sangat menyukai ikan salmon segar dan bermain bola wol ungu.',
      favFood: 'Salmon Sashimi & Tuna Segar',
      personality: 'Cerdas, Anggun, Suka Dimanja',
      xp: friendshipData?.zorro?.xp || 45,
      friendLevel: friendshipData?.zorro?.level || 2
    },
    {
      id: 'thor',
      name: 'Thor Tabby',
      role: 'Sous-Chef Dapur & Ahli Whisking',
      sprite: '/cats/thor_transparent.png',
      badge: '⚡ Tabby Master',
      bgGrad: 'linear-gradient(135deg, #78350F 0%, #B45309 100%)',
      desc: 'Kucing belang tabi cokelat yang lincah dan bersemangat. Selalu setia menemani Nina mengocok adonan kue di dapur.',
      favFood: 'Kitten Kibble & Susu Hangat',
      personality: 'Aktif, Pekerja Keras, Ramah',
      xp: friendshipData?.thor?.xp || 20,
      friendLevel: friendshipData?.thor?.level || 1
    },
    {
      id: 'loki',
      name: 'Loki Lion',
      role: 'Penjaga Kafe & Pengawas Kasir',
      sprite: '/cats/loki_transparent.png',
      badge: '🦁 Lion Mane',
      bgGrad: 'linear-gradient(135deg, #C2410C 0%, #EA580C 100%)',
      desc: 'Kucing oranye lebat dengan bulu leher seperti surai singa mini. Senang tidur di bantal empuk dekat jendela kafe.',
      favFood: 'Churu Creamy Snack & Keju',
      personality: 'Santai, Hangat, Penjaga Setia',
      xp: friendshipData?.loki?.xp || 15,
      friendLevel: friendshipData?.loki?.level || 1
    },
    {
      id: 'calico',
      name: 'Calico Fortune',
      role: 'Pembawa Rezeki Roda Keberuntungan',
      sprite: '/ui/sprites/cat_calico.png',
      badge: '🍀 Lucky Mascot',
      bgGrad: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
      desc: 'Kucing tiga warna langka lambang keberuntungan. Menjaga Roda Rezeki harian dan mendatangkan pelanggan dermawan.',
      favFood: 'Biskuit Cakar Madu',
      personality: 'Ceria, Pembawa Hoki, Lucu',
      xp: 30,
      friendLevel: 2
    }
  ];

  // 8 System Achievements
  const achievements = [
    {
      id: 'ach_1',
      title: 'Pelayan Pertama',
      desc: 'Layani setidaknya 1 pesanan pelanggan di kafe.',
      icon: '☕',
      current: totalOrdersServed,
      target: 1,
      rewardCoins: 200,
      rewardGems: 10
    },
    {
      id: 'ach_2',
      title: 'Barista Andal',
      desc: 'Layani 5 pesanan pelanggan di papan merge.',
      icon: '🧁',
      current: totalOrdersServed,
      target: 5,
      rewardCoins: 500,
      rewardGems: 15
    },
    {
      id: 'ach_3',
      title: 'Master Pesanan',
      desc: 'Layani 15 pesanan pelanggan yang puas.',
      icon: '📦',
      current: totalOrdersServed,
      target: 15,
      rewardCoins: 1000,
      rewardGems: 30
    },
    {
      id: 'ach_4',
      title: 'Kafe Bintang 10',
      desc: 'Tingkatkan level kafe mencapai Bintang 10.',
      icon: '⭐',
      current: level,
      target: 10,
      rewardCoins: 800,
      rewardGems: 25
    },
    {
      id: 'ach_5',
      title: 'Kafe Bintang 20',
      desc: 'Tingkatkan level kafe mencapai Bintang 20.',
      icon: '🌟',
      current: level,
      target: 20,
      rewardCoins: 1500,
      rewardGems: 50
    },
    {
      id: 'ach_6',
      title: 'Pencicip Resep',
      desc: 'Temukan dan gabungkan 8 variasi item di Ensiklopedia.',
      icon: '📖',
      current: discoveredItemIds.length,
      target: 8,
      rewardCoins: 400,
      rewardGems: 20
    },
    {
      id: 'ach_7',
      title: 'Juragan Koin',
      desc: 'Kumpulkan saldo koin kafe hingga 15,000 koin.',
      icon: '🪙',
      current: coins,
      target: 15000,
      rewardCoins: 1000,
      rewardGems: 40
    },
    {
      id: 'ach_8',
      title: 'Teman Sejati Anabul',
      desc: 'Naikkan level persahabatan Zorro hingga Level 2.',
      icon: '🐾',
      current: friendshipData?.zorro?.level || 2,
      target: 2,
      rewardCoins: 600,
      rewardGems: 25
    }
  ];

  const handleClaimAchievement = (ach) => {
    if (claimedAchievements[ach.id]) return;
    const next = { ...claimedAchievements, [ach.id]: true };
    setClaimedAchievements(next);
    try {
      localStorage.setItem('zorro_claimed_achievements', JSON.stringify(next));
    } catch (e) {}

    audio.playFanfare();
    confetti({ particleCount: 50, spread: 75, origin: { y: 0.6 } });
    if (onAddCoins) onAddCoins(ach.rewardCoins);
    if (onAddGems) onAddGems(ach.rewardGems);
    if (onShowToast) onShowToast(`Prestasi "${ach.title}" Diklaim! +${ach.rewardCoins} 🪙 +${ach.rewardGems} 💎`);
  };

  const currentCatData = catCharacters.find(c => c.id === selectedCat) || catCharacters[0];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 110,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '980px',
          height: '580px',
          maxHeight: '88vh',
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '4px solid #8B5A2B',
          borderRadius: '28px',
          boxShadow: '0 18px 48px rgba(0,0,0,0.45), inset 0 2px 4px rgba(255,255,255,0.9)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        {/* Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          borderBottom: '2.5px solid #E5C39E',
          background: '#FFF9F0'
        }}>
          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                audio.playPop();
                setActiveTab('profile');
              }}
              style={{
                background: activeTab === 'profile' ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)' : '#FFF',
                color: activeTab === 'profile' ? '#FFF' : '#78350F',
                border: activeTab === 'profile' ? '2px solid #9A3412' : '1.5px solid #FED7AA',
                borderRadius: '14px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <User size={14} />
              <span>PROFIL NINA & KAFE</span>
            </button>

            <button
              onClick={() => {
                audio.playPop();
                setActiveTab('cats');
              }}
              style={{
                background: activeTab === 'cats' ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)' : '#FFF',
                color: activeTab === 'cats' ? '#FFF' : '#78350F',
                border: activeTab === 'cats' ? '2px solid #9A3412' : '1.5px solid #FED7AA',
                borderRadius: '14px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>🐾</span>
              <span>KARAKTER KUCING</span>
            </button>

            <button
              onClick={() => {
                audio.playPop();
                setActiveTab('achievements');
              }}
              style={{
                background: activeTab === 'achievements' ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)' : '#FFF',
                color: activeTab === 'achievements' ? '#FFF' : '#78350F',
                border: activeTab === 'achievements' ? '2px solid #9A3412' : '1.5px solid #FED7AA',
                borderRadius: '14px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Trophy size={14} />
              <span>PRESTASI & TROFI</span>
            </button>
          </div>

          {/* Close button */}
          <button
            onClick={() => {
              audio.playPop();
              onClose();
            }}
            style={{
              background: '#FEE2E2',
              border: '2px solid #EF4444',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} color="#DC2626" />
          </button>
        </div>

        {/* Tab 1: PROFIL NINA & KAFE (Wide Landscape 2-Column Layout) */}
        {activeTab === 'profile' && (
          <div style={{
            padding: '18px 24px',
            display: 'flex',
            gap: '20px',
            flex: 1,
            overflowY: 'auto'
          }}>
            {/* Left Column: Nina Barista Master Card */}
            <div style={{
              width: '360px',
              background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
              border: '2.5px solid #8B5A2B',
              borderRadius: '22px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              flexShrink: 0
            }}>
              {/* Large Nina Transparent Portrait */}
              <div
                className="cat-breathe"
                style={{
                  width: '180px',
                  height: '210px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.35))'
                }}
              >
                <img
                  src="/cats/nina_transparent.png"
                  alt="Nina"
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '900', color: '#3B1E08' }}>
                    Nina The Barista
                  </span>
                  <span style={{
                    background: 'linear-gradient(180deg, #FB7185 0%, #E11D48 100%)',
                    color: '#FFF',
                    fontSize: '10.5px',
                    fontWeight: '900',
                    padding: '2px 8px',
                    borderRadius: '10px'
                  }}>
                    Master Baker
                  </span>
                </div>
                <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#78350F', lineHeight: '1.4', marginTop: '4px' }}>
                  Pemilik Kafe Kucing Zorro Merge Cats. Meracik kue lezat, merawat anabul tercinta, dan menyambut tamu dari seluruh penjuru kota.
                </div>
              </div>

              {/* Quick Action Button */}
              {onOpenWardrobe && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenWardrobe();
                  }}
                  className="mockup-action-btn"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(180deg, #F472B6 0%, #DB2777 100%)',
                    border: '2px solid #9D174D',
                    borderRadius: '14px',
                    padding: '8px 14px',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 10px rgba(219, 39, 119, 0.3)',
                    marginTop: 'auto'
                  }}
                >
                  <span>🎀 Buka Lemari Kostum Kucing</span>
                </button>
              )}
            </div>

            {/* Right Column: Cafe Stats & Milestones */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              {/* 2x2 Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px'
              }}>
                <div style={{
                  background: '#FFF9F0',
                  border: '2px solid #E5C39E',
                  borderRadius: '16px',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '32px' }}>⭐</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '900', color: '#78350F' }}>LEVEL KAFE</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#3B1E08' }}>Tingkat {level}</div>
                  </div>
                </div>

                <div style={{
                  background: '#FFF9F0',
                  border: '2px solid #E5C39E',
                  borderRadius: '16px',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '32px' }}>📦</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '900', color: '#78350F' }}>PESANAN SELESAI</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#059669' }}>{totalOrdersServed} Pesanan</div>
                  </div>
                </div>

                <div style={{
                  background: '#FFF9F0',
                  border: '2px solid #E5C39E',
                  borderRadius: '16px',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '32px' }}>📖</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '900', color: '#78350F' }}>RESEP TERBUKA</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#0284C7' }}>{discoveredItemIds.length} Resep</div>
                  </div>
                </div>

                <div style={{
                  background: '#FFF9F0',
                  border: '2px solid #E5C39E',
                  borderRadius: '16px',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '32px' }}>🏆</span>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '900', color: '#78350F' }}>REPUTASI KAFE</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#D97706' }}>5 Bintang ⭐</div>
                  </div>
                </div>
              </div>

              {/* Cafe Specialty Perk Banner */}
              <div style={{
                background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)',
                border: '2px solid #D97706',
                borderRadius: '16px',
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '28px' }}>☕</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#78350F' }}>
                    Keistimewaan Kafe Kucing Zorro
                  </div>
                  <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#92400E', marginTop: '2px' }}>
                    Setiap pesanan kafe memberikan Paw Points untuk membuka hadiah Cat Pass & mempercepat regenerasi energi anabul!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: KARAKTER KUCING */}
        {activeTab === 'cats' && (
          <div style={{
            padding: '18px 22px',
            display: 'flex',
            gap: '18px',
            overflowY: 'auto'
          }}>
            {/* Left Cat List */}
            <div style={{
              width: '210px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {catCharacters.map((cat) => {
                const isSelected = cat.id === selectedCat;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      audio.playPop();
                      setSelectedCat(cat.id);
                    }}
                    style={{
                      background: isSelected ? 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)' : '#FFF9F0',
                      border: isSelected ? '2.5px solid #F59E0B' : '1.5px solid #E5C39E',
                      borderRadius: '16px',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: '#FFF',
                      border: '1.5px solid #E5C39E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <img src={cat.sprite} alt={cat.name} style={{ width: '85%', height: '85%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                        {cat.name.split(' ')[0]}
                      </span>
                      <span style={{ fontSize: '10px', fontWeight: '800', color: '#EA580C' }}>
                        {cat.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Cat Profile Card */}
            <div style={{
              flex: 1,
              background: '#FFF9F0',
              border: '2.5px solid #E5C39E',
              borderRadius: '20px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '20px',
                  background: currentCatData.bgGrad,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  flexShrink: 0
                }}>
                  <img src={currentCatData.sprite} alt={currentCatData.name} style={{ maxHeight: '95%', maxWidth: '95%', objectFit: 'contain' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '17px', fontWeight: '900', color: '#3B1E08' }}>
                    {currentCatData.name}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#059669' }}>
                    {currentCatData.role}
                  </div>
                </div>
              </div>

              {/* Bio & Details */}
              <div style={{
                background: '#FFF',
                border: '1.5px solid #FED7AA',
                borderRadius: '14px',
                padding: '12px',
                fontSize: '12px',
                color: '#4A2810',
                lineHeight: '1.5',
                fontWeight: '700'
              }}>
                {currentCatData.desc}
              </div>

              {/* Favorite Food & Personality */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '800', color: '#78350F' }}>Makanan Favorit:</span>
                  <span style={{ fontWeight: '900', color: '#EA580C' }}>{currentCatData.favFood}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '800', color: '#78350F' }}>Kepribadian:</span>
                  <span style={{ fontWeight: '900', color: '#3B1E08' }}>{currentCatData.personality}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '800', color: '#78350F' }}>Tingkat Sahabat:</span>
                  <span style={{ fontWeight: '900', color: '#E11D48' }}>Lv. {currentCatData.friendLevel} ({currentCatData.xp} XP)</span>
                </div>
              </div>

              {/* Action Button */}
              {onOpenInteractCat && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenInteractCat(currentCatData.id);
                  }}
                  className="mockup-action-btn"
                  style={{
                    background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                    border: '2px solid #B45309',
                    borderRadius: '16px',
                    padding: '10px 16px',
                    color: '#FFF',
                    fontSize: '13px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: 'auto'
                  }}
                >
                  <Heart size={16} />
                  <span>Elus & Beri Makan {currentCatData.name.split(' ')[0]}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: PRESTASI & TROFI */}
        {activeTab === 'achievements' && (
          <div style={{
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            overflowY: 'auto',
            maxHeight: '440px'
          }}>
            {achievements.map((ach) => {
              const isClaimed = Boolean(claimedAchievements[ach.id]);
              const isCompleted = ach.current >= ach.target;
              const progressPct = Math.min(100, Math.round((ach.current / ach.target) * 100));

              return (
                <div
                  key={ach.id}
                  style={{
                    background: isClaimed ? '#F3F4F6' : '#FFFDF8',
                    border: isClaimed ? '1.5px solid #D1D5DB' : isCompleted ? '2px solid #10B981' : '1.5px solid #E5C39E',
                    borderRadius: '16px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                    opacity: isClaimed ? 0.7 : 1
                  }}
                >
                  {/* Left Icon */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: isCompleted ? '#DCFCE7' : '#FEF3C7',
                    border: isCompleted ? '1.5px solid #10B981' : '1.5px solid #F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    flexShrink: 0
                  }}>
                    {ach.icon}
                  </div>

                  {/* Middle: Title, Desc, Progress */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                        {ach.title}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: '800', color: '#78350F' }}>
                        {Math.min(ach.current, ach.target)}/{ach.target}
                      </span>
                    </div>

                    <span style={{ fontSize: '11px', color: '#6B401D', fontWeight: '600' }}>
                      {ach.desc}
                    </span>

                    {/* Progress Bar */}
                    <div style={{
                      width: '100%',
                      height: '7px',
                      background: '#E5E7EB',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      marginTop: '2px'
                    }}>
                      <div style={{
                        width: `${progressPct}%`,
                        height: '100%',
                        background: isCompleted ? '#10B981' : '#F59E0B',
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>

                  {/* Right: Reward & Button */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                    <div style={{ fontSize: '11px', fontWeight: '900', color: '#D97706' }}>
                      +{ach.rewardCoins} 🪙 +{ach.rewardGems} 💎
                    </div>

                    {isClaimed ? (
                      <span style={{
                        background: '#E5E7EB',
                        color: '#6B7280',
                        fontSize: '11px',
                        fontWeight: '800',
                        padding: '3px 10px',
                        borderRadius: '10px'
                      }}>
                        Terklaim ✔
                      </span>
                    ) : (
                      <button
                        onClick={() => handleClaimAchievement(ach)}
                        disabled={!isCompleted}
                        className="mockup-action-btn"
                        style={{
                          background: isCompleted
                            ? 'linear-gradient(180deg, #34D399 0%, #059669 100%)'
                            : '#E5E7EB',
                          border: isCompleted ? '1.5px solid #047857' : '1.5px solid #D1D5DB',
                          borderRadius: '12px',
                          padding: '4px 12px',
                          color: isCompleted ? '#FFF' : '#9CA3AF',
                          fontSize: '11px',
                          fontWeight: '900',
                          cursor: isCompleted ? 'pointer' : 'not-allowed'
                        }}
                      >
                        {isCompleted ? 'Klaim' : 'Belum Selesai'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
