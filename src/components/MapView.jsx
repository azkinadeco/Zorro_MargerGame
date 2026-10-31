import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';
import { safeConfetti as confetti } from '../utils/safeConfetti';
import { Sparkles, MapPin, Gift, Trophy, ArrowRight, X, Lock, CheckCircle } from 'lucide-react';

export function MapView({
  level = 18,
  coins = 0,
  onSpendCoins,
  onPlayMerge,
  onAddCoins,
  onAddGems,
  onAddEnergy,
  onShowToast
}) {
  const [mapMode, setMapMode] = useState('village'); // 'village' | 'adventure'
  const [selectedNode, setSelectedNode] = useState(null);
  const [explorerSpeech, setExplorerSpeech] = useState(null);
  const [isExplorerExcited, setIsExplorerExcited] = useState(false);
  const [, setNowTick] = useState(0);

  // Persisted District Levels (Lv.1 - Lv.5) for each map node
  const [districtLevels, setDistrictLevels] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_map_district_levels');
      return saved ? JSON.parse(saved) : { cafe: 2, market: 1, park: 1, plaza: 1, forest: 1, lake: 1, castle: 1 };
    } catch (e) {
      return { cafe: 2, market: 1, park: 1, plaza: 1, forest: 1, lake: 1, castle: 1 };
    }
  });

  // Repeatable 45s Tribute Cooldowns per node
  const [nodeCooldowns, setNodeCooldowns] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_map_node_cooldowns');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zorro_map_district_levels', JSON.stringify(districtLevels));
    } catch (e) {}
  }, [districtLevels]);

  useEffect(() => {
    try {
      localStorage.setItem('zorro_map_node_cooldowns', JSON.stringify(nodeCooldowns));
    } catch (e) {}
  }, [nodeCooldowns]);

  useEffect(() => {
    const t = setInterval(() => setNowTick(n => n + 1), 1000);
    return () => clearInterval(t);
  }, []);

  // Persisted claimed nodes today
  const [claimedNodes, setClaimedNodes] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_claimed_map_nodes');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Persisted claimed milestone chests
  const [claimedMilestones, setClaimedMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_map_milestones');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zorro_claimed_map_nodes', JSON.stringify(claimedNodes));
    } catch (e) {}
  }, [claimedNodes]);

  useEffect(() => {
    try {
      localStorage.setItem('zorro_map_milestones', JSON.stringify(claimedMilestones));
    } catch (e) {}
  }, [claimedMilestones]);

  const villageNodes = [
    {
      id: 'cafe',
      title: 'Merge Café (Start)',
      subtitle: 'Markas utama Nina & Zorro',
      desc: 'Pusat pesanan dan petualangan merge cafe! Selesaikan pesanan pelanggan untuk memajukan desa kucing.',
      reward: '🪙 +500 Koin Harian',
      btnText: 'Buka Papan Merge',
      reqLevel: 1,
      action: () => {
        onPlayMerge();
      },
      x: '59%',
      y: '63%',
      isCurrent: true
    },
    {
      id: 'market',
      title: 'Miaow Market',
      subtitle: 'Pasar belanja perlengkapan kucing',
      desc: 'Tempat bertukar bahan baku kue, membeli catnip segar, dan mendapatkan diskon peralatan kucing.',
      reward: '🪙 +300 Koin & +10 ⚡',
      btnText: 'Klaim Hadiah Pasar',
      reqLevel: 2,
      action: () => {
        if (onAddCoins) onAddCoins(300);
        if (onAddEnergy) onAddEnergy(10);
        confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
        if (onShowToast) onShowToast("Kamu menerima 300 koin & 10 energi dari Miaow Market! 🪙");
      },
      x: '20%',
      y: '78%'
    },
    {
      id: 'park',
      title: 'Cat Park',
      subtitle: 'Taman bermain & patung kucing',
      desc: 'Taman hijau asri tempat anak kucing berkejaran dan memanjat pohon pastel.',
      reward: '💎 +20 Permata Hijau',
      btnText: 'Main di Taman',
      reqLevel: 3,
      action: () => {
        if (onAddGems) onAddGems(20);
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
        if (onShowToast) onShowToast("Kamu menemukan 20 Permata di Cat Park! 💎");
      },
      x: '18%',
      y: '43%'
    },
    {
      id: 'plaza',
      title: 'Kitten Plaza',
      subtitle: 'Alun-alun festival kucing desa',
      desc: 'Alun-alun megah dengan lingkaran paw batu raksasa tempat bertemunya kucing dari seluruh penjuru!',
      reward: '🪙 +450 Koin & +15 ⚡',
      btnText: 'Ikuti Festival',
      reqLevel: 4,
      action: () => {
        if (onAddCoins) onAddCoins(450);
        if (onAddEnergy) onAddEnergy(15);
        confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
        if (onShowToast) onShowToast("Selamat! Kamu disambut hangat di Kitten Plaza (+450 🪙)! ⭐");
      },
      x: '81%',
      y: '48%'
    }
  ];

  const adventureNodes = [
    {
      id: 'forest',
      title: 'Hutan Catnip Liar',
      subtitle: 'Eksplorasi tanaman catnip aromatik',
      desc: 'Hutan lebat misterius tempat tumbuhnya catnip alami kualitas terbaik di kerajaan kucing!',
      reward: '🪙 +350 Koin & +20 ⚡',
      btnText: 'Panen Catnip',
      reqLevel: 5,
      action: () => {
        if (onAddCoins) onAddCoins(350);
        if (onAddEnergy) onAddEnergy(20);
        confetti({ particleCount: 35, spread: 70, origin: { y: 0.6 } });
        if (onShowToast) onShowToast("Sukses panen catnip segar! +350 🪙 & +20 ⚡ 🌿");
      },
      x: '28%',
      y: '58%'
    },
    {
      id: 'lake',
      title: 'Danau Salmon Segar',
      subtitle: 'Air terjun jernih penuh ikan',
      desc: 'Danau jernih tempat ikan salmon melompat riang. Makanan favorit anak kucing cafe!',
      reward: '🪙 +500 Koin & +25 ⚡',
      btnText: 'Memancing Bersama Nina',
      reqLevel: 6,
      action: () => {
        if (onAddCoins) onAddCoins(500);
        if (onAddEnergy) onAddEnergy(25);
        confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
        if (onShowToast) onShowToast("Tangkapan melimpah! +500 Koin & +25 ⚡ 🐟");
      },
      x: '45%',
      y: '78%'
    },
    {
      id: 'castle',
      title: 'Kastil Tuxedo Kuno',
      subtitle: 'Istana leluhur Zorro The King',
      desc: 'Kastil megah bermahkota emas tempat mahkota tuxedo Zorro disimpan.',
      reward: '💎 +60 Permata Mewah',
      btnText: 'Masuk ke Kastil',
      reqLevel: 8,
      action: () => {
        if (onAddGems) onAddGems(60);
        confetti({ particleCount: 50, spread: 80, origin: { y: 0.6 } });
        if (onShowToast) onShowToast("Harta Karun Kastil Ditemukan! +60 💎 👑");
      },
      x: '64%',
      y: '42%'
    }
  ];

  const allNodes = [...villageNodes, ...adventureNodes];
  const unlockedCount = allNodes.filter(n => {
    if (level >= n.reqLevel) return true;
    if (claimedNodes.includes(n.id)) return true;
    try {
      const raw = localStorage.getItem('zorro_map_unlocked');
      return raw ? JSON.parse(raw).includes(n.id) : false;
    } catch (e) { return false; }
  }).length;

  const activeNodes = mapMode === 'village' ? villageNodes : adventureNodes;

  const handleNodeClick = (node) => {
    audio.playPop();
    setSelectedNode(node);
  };

  const handleClaimMilestone = (tier) => {
    if (claimedMilestones.includes(tier)) return;

    if (tier === 1 && unlockedCount >= 2) {
      audio.playFanfare();
      confetti({ particleCount: 60, spread: 80, origin: { y: 0.8 } });
      if (onAddCoins) onAddCoins(1000);
      if (onAddGems) onAddGems(30);
      setClaimedMilestones(prev => [...prev, 1]);
      if (onShowToast) onShowToast("🎁 Peti Eksplorasi Silver Terbuka! +1,000 🪙 & +30 💎!");
    } else if (tier === 2 && unlockedCount >= 4) {
      audio.playFanfare();
      confetti({ particleCount: 90, spread: 100, origin: { y: 0.8 } });
      if (onAddCoins) onAddCoins(3000);
      if (onAddGems) onAddGems(100);
      setClaimedMilestones(prev => [...prev, 2]);
      if (onShowToast) onShowToast("👑 Peti Eksplorasi Royal Gold Terbuka! +3,000 🪙 & +100 💎!");
    } else {
      audio.playPop();
      if (onShowToast) onShowToast("Buka lebih banyak lokasi di peta untuk membuka peti ini!");
    }
  };

  const handleUnlockAllNodes = () => {
    audio.playFanfare();
    confetti({ particleCount: 75, spread: 90, origin: { y: 0.5 } });
    const allIds = allNodes.map(n => n.id);
    setClaimedNodes(allIds);
    if (onAddCoins) onAddCoins(1500);
    if (onAddGems) onAddGems(50);
    if (onShowToast) onShowToast("✨ Semua 7 Wilayah Peta Berhasil Dibuka! Bonus +1,500 🪙 +50 💎!");
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundImage: `url(${mapMode === 'village' ? '/backgrounds/maps.jpg' : '/backgrounds/maps_adventure.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden'
    }}>
      {/* Top-Left Cat-Eared Plaque + Map Mode Toggle */}
      <div style={{
        position: 'absolute',
        left: '4%',
        top: '12%',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 20
      }}>
        <div style={{
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '3px solid #8B5A2B',
          borderRadius: '24px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.25), inset 0 2px 3px rgba(255,255,255,0.9)',
          padding: '8px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
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
            {mapMode === 'village' ? 'Cat Village' : 'Cat Adventure'}
          </span>
        </div>

        {/* Mode Switcher Buttons */}
        <div style={{
          display: 'flex',
          gap: '6px',
          background: 'rgba(255, 248, 240, 0.95)',
          padding: '4px 6px',
          borderRadius: '16px',
          border: '2px solid #8B5A2B'
        }}>
          <button
            onClick={() => {
              audio.playPop();
              setMapMode('village');
            }}
            style={{
              flex: 1,
              background: mapMode === 'village' ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)' : '#FFF',
              color: mapMode === 'village' ? '#FFF' : '#78350F',
              border: mapMode === 'village' ? '1.5px solid #9A3412' : '1px solid #FED7AA',
              borderRadius: '12px',
              padding: '4px 8px',
              fontSize: '11px',
              fontWeight: '900',
              cursor: 'pointer'
            }}
          >
            🗺️ Desa Kucing
          </button>
          <button
            onClick={() => {
              audio.playPop();
              setMapMode('adventure');
            }}
            style={{
              flex: 1,
              background: mapMode === 'adventure' ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)' : '#FFF',
              color: mapMode === 'adventure' ? '#FFF' : '#78350F',
              border: mapMode === 'adventure' ? '1.5px solid #9A3412' : '1px solid #FED7AA',
              borderRadius: '12px',
              padding: '4px 8px',
              fontSize: '11px',
              fontWeight: '900',
              cursor: 'pointer'
            }}
          >
            🧭 Petualangan
          </button>
        </div>
      </div>

      {/* Interactive Nodes along the trail */}
      {activeNodes.map((node) => {
        const isUnlockedDirectly = (() => {
          try {
            const raw = localStorage.getItem('zorro_map_unlocked');
            return raw ? JSON.parse(raw).includes(node.id) : false;
          } catch (e) { return false; }
        })();
        const isLocked = level < node.reqLevel && !isUnlockedDirectly && !claimedNodes.includes(node.id);
        const isClaimed = claimedNodes.includes(node.id);

        return (
          <div
            key={node.id}
            onClick={() => handleNodeClick(node)}
            style={{
              position: 'absolute',
              left: node.x,
              top: node.y,
              transform: 'translate(-50%, -50%)',
              cursor: 'pointer',
              zIndex: 25,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              filter: isLocked ? 'grayscale(0.6)' : 'none'
            }}
            title={node.title}
          >
            {/* Node Badge / Pulse */}
            <div style={{
              width: node.isCurrent ? '52px' : '44px',
              height: node.isCurrent ? '52px' : '44px',
              borderRadius: '50%',
              background: isLocked
                ? '#9CA3AF'
                : node.isCurrent
                ? 'linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)'
                : isClaimed
                ? 'linear-gradient(180deg, #34D399 0%, #059669 100%)'
                : 'linear-gradient(180deg, #FFFDF8 0%, #F5E3C9 100%)',
              border: isLocked
                ? '2.5px solid #6B7280'
                : node.isCurrent
                ? '3px solid #0369A1'
                : '2.5px solid #8B5A2B',
              boxShadow: node.isCurrent
                ? '0 0 16px rgba(14, 165, 233, 0.8), 0 4px 10px rgba(0,0,0,0.3)'
                : '0 3px 8px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              position: 'relative',
              animation: node.isCurrent ? 'currentBounce 2s infinite' : !isLocked ? 'pawPulse 2.5s infinite' : 'none'
            }}>
              {/* Hopping Zorro Cutout Marker on active node */}
              {(node.isCurrent || selectedNode?.id === node.id) && (
                <div style={{
                  position: 'absolute',
                  top: '-36px',
                  width: '36px',
                  height: '36px',
                  animation: 'bouncePurr 1.4s infinite',
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.45))',
                  pointerEvents: 'none'
                }}>
                  <img
                    src="/cats/zoro_transparent.png"
                    alt="Zorro"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              )}
              {isLocked ? (
                <Lock size={18} color="#FFF" />
              ) : isClaimed ? (
                <CheckCircle size={20} color="#FFF" />
              ) : node.isCurrent ? (
                <span style={{ fontSize: '13px', fontWeight: '900', color: '#FFF' }}>{level}</span>
              ) : (
                <span>🐾</span>
              )}
            </div>

            {/* Node Label Pill */}
            <div style={{
              background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
              border: '2px solid #8B5A2B',
              borderRadius: '12px',
              padding: '2px 8px',
              marginTop: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span style={{
                fontSize: '10px',
                fontWeight: '900',
                color: isLocked ? '#6B7280' : '#3B1E08'
              }}>
                {isLocked ? `Lv.${node.reqLevel} 🔒` : node.title}
              </span>
            </div>
          </div>
        );
      })}

      {/* Exploration Milestones Bottom Ribbon */}
      <div style={{
        position: 'absolute',
        left: '50%',
        bottom: '88px',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
        border: '3px solid #8B5A2B',
        borderRadius: '20px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.3)',
        padding: '6px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Trophy size={16} color="#EA580C" />
          <span style={{ fontSize: '12px', fontWeight: '900', color: '#3B1E08' }}>
            Eksplorasi: {unlockedCount}/7 Terbuka
          </span>
        </div>

        {/* Milestone 1 (Silver Chest at 2) */}
        <button
          onClick={() => handleClaimMilestone(1)}
          style={{
            background: claimedMilestones.includes(1)
              ? '#D1D5DB'
              : unlockedCount >= 2
              ? 'linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)'
              : '#F3F4F6',
            color: claimedMilestones.includes(1) ? '#6B7280' : unlockedCount >= 2 ? '#FFF' : '#9CA3AF',
            border: '1.5px solid #8B5A2B',
            borderRadius: '12px',
            padding: '3px 10px',
            fontSize: '11px',
            fontWeight: '900',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>🎁 Peti Silver (2)</span>
          {claimedMilestones.includes(1) && <span>✓</span>}
        </button>

        {/* Milestone 2 (Gold Chest at 4) */}
        <button
          onClick={() => handleClaimMilestone(2)}
          style={{
            background: claimedMilestones.includes(2)
              ? '#D1D5DB'
              : unlockedCount >= 4
              ? 'linear-gradient(180deg, #FBBF24 0%, #D97706 100%)'
              : '#F3F4F6',
            color: claimedMilestones.includes(2) ? '#6B7280' : unlockedCount >= 4 ? '#3B1E08' : '#9CA3AF',
            border: '1.5px solid #8B5A2B',
            borderRadius: '12px',
            padding: '3px 10px',
            fontSize: '11px',
            fontWeight: '900',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>👑 Peti Emas (4)</span>
          {claimedMilestones.includes(2) && <span>✓</span>}
        </button>
      </div>

      {/* Interactive Nina & Zorro Explorer Duo on Map */}
      <div
        onClick={() => {
          audio.playMeow();
          audio.playPop();
          setIsExplorerExcited(true);
          setTimeout(() => setIsExplorerExcited(false), 1200);

          const quotes = [
            "Ayo kita jelajahi seluruh penjuru desa anabul! 🗺️",
            "Setiap tempat baru menyimpan peti harta dan koin kafe melimpah! 🎁",
            "Purrr... Zorro mencium aroma ikan lezat di Danau Ikan! 🐟",
            "Selesaikan pesanan di Merge Cafe untuk membuka rute selanjutnya! ⭐",
            "Nina dan Zorro siap memandu perjalananmu! 🐾"
          ];
          setExplorerSpeech(quotes[Math.floor(Math.random() * quotes.length)]);
          setTimeout(() => setExplorerSpeech(null), 3400);

          if (onAddCoins) onAddCoins(5);
          if (onShowToast) onShowToast("Semangat berpetualang! +5 🪙 Koin Semangat!");
        }}
        style={{
          position: 'absolute',
          left: '20px',
          bottom: '84px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '6px',
          cursor: 'pointer',
          zIndex: 22,
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        className={isExplorerExcited ? 'bouncePurr' : 'cat-breathe'}
        title="Ketuk Nina & Zorro untuk tips petualangan 🗺️"
      >
        {/* Nina Explorer Cutout */}
        <div style={{
          position: 'relative',
          width: '105px',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.45))'
        }}>
          <img
            src="/cats/nina_transparent.png"
            alt="Nina Explorer"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
          {/* Compass Icon Badge */}
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '-4px',
            fontSize: '18px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            animation: 'bouncePurr 2s infinite'
          }}>
            🧭
          </div>
        </div>

        {/* Zorro Explorer Cutout */}
        <div style={{
          position: 'relative',
          width: '85px',
          height: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.45))'
        }}>
          <img
            src="/cats/zoro_transparent.png"
            alt="Zorro Explorer"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
          {/* Map Pin Icon Badge */}
          <div style={{
            position: 'absolute',
            top: '2px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '16px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
          }}>
            📍
          </div>
        </div>

        {/* Adventure Tag Pill */}
        <div style={{
          position: 'absolute',
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
          border: '1.5px solid #78350F',
          borderRadius: '10px',
          padding: '2px 8px',
          fontSize: '9.5px',
          fontWeight: '900',
          color: '#FFF',
          boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          whiteSpace: 'nowrap'
        }}>
          🧭 Tim Penjelajah
        </div>
      </div>

      {/* Floating Explorer Speech Bubble */}
      {explorerSpeech && (
        <div style={{
          position: 'absolute',
          left: '120px',
          bottom: '260px',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8F0 100%)',
          border: '2.5px solid #8B5A2B',
          borderRadius: '18px',
          padding: '8px 14px',
          maxWidth: '240px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          zIndex: 35,
          animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '900', color: '#D97706', marginBottom: '2px' }}>
            Nina & Zorro 🗺️
          </div>
          <div style={{ fontSize: '11.5px', fontWeight: '800', color: '#3B1E08', lineHeight: '1.3' }}>
            {explorerSpeech}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '30%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '8px solid #8B5A2B'
          }} />
        </div>
      )}

      {/* Selected Node Modal Card */}
      {selectedNode && (
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '380px',
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '3.5px solid #8B5A2B',
          borderRadius: '24px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.9)',
          padding: '18px 20px',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          {/* Close button */}
          <button
            onClick={() => {
              audio.playPop();
              setSelectedNode(null);
            }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: '#FEE2E2',
              border: '2px solid #EF4444',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} color="#DC2626" />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🐾</span>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: '#3B1E08' }}>
                {selectedNode.title}
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#EA580C' }}>
                {selectedNode.subtitle}
              </div>
            </div>
          </div>

          <p style={{ fontSize: '12px', fontWeight: '700', color: '#5C3818', lineHeight: '1.4' }}>
            {selectedNode.desc}
          </p>

          {/* F10: District Level & Upgrade Bar */}
          {(() => {
            const dLvl = districtLevels[selectedNode.id] || 1;
            const upgradeCost = dLvl * 250;
            const bonusPct = (dLvl - 1) * 25;
            const cdUntil = nodeCooldowns[selectedNode.id] || 0;
            const remSec = Math.max(0, Math.ceil((cdUntil - Date.now()) / 1000));

            return (
              <>
                <div style={{
                  background: '#FFF9F0',
                  border: '1.5px solid #E5C39E',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#7C4A26' }}>Hadiah Upeti:</span>
                    <span style={{ fontSize: '12px', fontWeight: '900', color: '#059669' }}>
                      {selectedNode.reward} {bonusPct > 0 ? `(+${bonusPct}%)` : ''}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px dashed #E5C39E',
                    paddingTop: '6px'
                  }}>
                    <span style={{ fontSize: '11px', fontWeight: '900', color: '#B45309' }}>
                      🏰 Level Distrik: Lv.{dLvl}/5
                    </span>
                    {dLvl < 5 ? (
                      <button
                        onClick={() => {
                          if (coins < upgradeCost) {
                            audio.playPop();
                            if (onShowToast) onShowToast(`Koin belum cukup (${upgradeCost} 🪙) untuk upgrade ${selectedNode.title}!`);
                            return;
                          }
                          audio.playFanfare();
                          if (onSpendCoins) onSpendCoins(upgradeCost);
                          if (onAddEnergy) onAddEnergy(5);
                          setDistrictLevels(prev => ({ ...prev, [selectedNode.id]: dLvl + 1 }));
                          confetti({ particleCount: 35, spread: 65, origin: { y: 0.6 } });
                          if (onShowToast) onShowToast(`🏰 ${selectedNode.title} naik ke Lv.${dLvl + 1}! Bonus upeti +${dLvl * 25}% & +5 ⚡!`);
                        }}
                        style={{
                          background: 'linear-gradient(180deg, #FBBF24 0%, #D97706 100%)',
                          border: '1.5px solid #92400E',
                          borderRadius: '10px',
                          padding: '3px 10px',
                          color: '#FFF',
                          fontSize: '10.5px',
                          fontWeight: '900',
                          cursor: 'pointer'
                        }}
                      >
                        ⬆️ Upgrade ({upgradeCost} 🪙)
                      </button>
                    ) : (
                      <span style={{ fontSize: '10.5px', fontWeight: '900', color: '#059669' }}>MAX LEVEL ⭐</span>
                    )}
                  </div>
                </div>

                {level < selectedNode.reqLevel && !claimedNodes.includes(selectedNode.id) ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{
                      background: '#FEF3C7',
                      border: '1.5px solid #F59E0B',
                      borderRadius: '12px',
                      padding: '8px 10px',
                      textAlign: 'center',
                      color: '#92400E',
                      fontSize: '11.5px',
                      fontWeight: '800'
                    }}>
                      ⭐ Syarat Normal: Level {selectedNode.reqLevel}
                    </div>
                    <button
                      onClick={() => {
                        audio.playFanfare();
                        selectedNode.action();
                        if (dLvl > 1 && onAddCoins) onAddCoins((dLvl - 1) * 75);
                        if (!claimedNodes.includes(selectedNode.id)) {
                          setClaimedNodes(prev => [...prev, selectedNode.id]);
                        }
                        if (selectedNode.id !== 'cafe') {
                          setNodeCooldowns(prev => ({ ...prev, [selectedNode.id]: Date.now() + 45000 }));
                        }
                        setSelectedNode(null);
                      }}
                      className="mockup-action-btn"
                      style={{
                        background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                        border: '2px solid #B45309',
                        borderRadius: '16px',
                        padding: '10px 18px',
                        color: '#FFFFFF',
                        fontSize: '13px',
                        fontWeight: '900',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)'
                      }}
                    >
                      <span>🚀 Buka & Jelajahi Sekarang!</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (selectedNode.id !== 'cafe' && remSec > 0) {
                        audio.playPop();
                        if (onShowToast) onShowToast(`⏳ Upeti ${selectedNode.title} sedang disiapkan anabul (${remSec} detik lagi)!`);
                        return;
                      }
                      audio.playFanfare();
                      selectedNode.action();
                      if (dLvl > 1 && onAddCoins) onAddCoins((dLvl - 1) * 75);
                      if (!claimedNodes.includes(selectedNode.id)) {
                        setClaimedNodes(prev => [...prev, selectedNode.id]);
                      }
                      if (selectedNode.id !== 'cafe') {
                        setNodeCooldowns(prev => ({ ...prev, [selectedNode.id]: Date.now() + 45000 }));
                      }
                      setSelectedNode(null);
                    }}
                    className="mockup-action-btn"
                    style={{
                      background: (selectedNode.id !== 'cafe' && remSec > 0)
                        ? '#94A3B8'
                        : 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
                      border: (selectedNode.id !== 'cafe' && remSec > 0)
                        ? '2px solid #64748B'
                        : '2.5px solid #047857',
                      borderRadius: '16px',
                      padding: '10px 18px',
                      color: '#FFFFFF',
                      fontSize: '13.5px',
                      fontWeight: '900',
                      cursor: (selectedNode.id !== 'cafe' && remSec > 0) ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: (selectedNode.id !== 'cafe' && remSec > 0) ? 'none' : '0 4px 12px rgba(5, 150, 105, 0.4)'
                    }}
                  >
                    <span>
                      {selectedNode.id !== 'cafe' && remSec > 0
                        ? `⏳ Panen Berikutnya (${remSec}d)`
                        : selectedNode.btnText}
                    </span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
