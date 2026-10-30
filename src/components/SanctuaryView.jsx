import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';
import { safeConfetti as confetti } from '../utils/safeConfetti';
import { Check, Lock } from 'lucide-react';
import { InteractiveCatActor } from './InteractiveCatActor';

export function SanctuaryView({
  coins = 14350,
  gems = 210,
  stars = 18,
  onSpendCoins,
  onSpendGems,
  onAddCoins,
  onAddGems,
  onAddEnergy,
  onAddStars,
  onDecorUnlocked,
  onOpenInteractCat,
  onOpenGuestbook,
  onOpenAlbum,
  onOpenBakery,
  onTriggerStory,
  equippedOutfits = {},
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState('furniture'); // 'furniture' | 'toys' | 'decor'
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [cafeTips, setCafeTips] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_cafe_tips');
      return saved ? parseInt(saved, 10) : 45;
    } catch (e) {
      return 45;
    }
  });
  const [unlockedItems, setUnlockedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_unlocked_decor');
      return saved ? JSON.parse(saved) : {
        floral_rug: true,
        kitty_sofa: false,
        pastel_cattree: false,
        cozy_teacup: false,
        feather_wand: true,
        catnip_mouse: false,
        potted_fern: true,
        cat_clock: false
      };
    } catch (e) {
      return {
        floral_rug: true,
        kitty_sofa: false,
        pastel_cattree: false,
        cozy_teacup: false,
        feather_wand: true,
        catnip_mouse: false,
        potted_fern: true,
        cat_clock: false
      };
    }
  });
  const [decorStyles, setDecorStyles] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_decor_styles');
      return saved ? JSON.parse(saved) : {
        kitty_sofa: 'pastel',
        pastel_cattree: 'pastel',
        floral_rug: 'rustic',
        cozy_teacup: 'pastel',
        cat_clock: 'royal'
      };
    } catch (e) {
      return {
        kitty_sofa: 'pastel',
        pastel_cattree: 'pastel',
        floral_rug: 'rustic',
        cozy_teacup: 'pastel',
        cat_clock: 'royal'
      };
    }
  });
  const [styleModalTarget, setStyleModalTarget] = useState(null); // { item, isNewPurchase }
  const [selectedStyleOption, setSelectedStyleOption] = useState('pastel');

  const STYLE_CHOICES = {
    rustic: {
      id: 'rustic',
      name: 'Rustic Wood',
      tagline: 'Klasik Kayu Jati & Hangat',
      badge: '🪵',
      bgGradient: 'linear-gradient(135deg, #78350F 0%, #B45309 100%)',
      borderColor: '#92400E',
      sofaColor: '#92400E',
      sofaAccent: '#D97706',
      sofaLight: '#FEF3C7',
      treeColor: '#B45309',
      treeAccent: '#78350F'
    },
    pastel: {
      id: 'pastel',
      name: 'Pastel Sweet',
      tagline: 'Merah Muda Manis & Stroberi',
      badge: '🍬',
      bgGradient: 'linear-gradient(135deg, #BE185D 0%, #EC4899 100%)',
      borderColor: '#9D174D',
      sofaColor: '#EC4899',
      sofaAccent: '#BE185D',
      sofaLight: '#FCE7F3',
      treeColor: '#F472B6',
      treeAccent: '#EC4899'
    },
    royal: {
      id: 'royal',
      name: 'Royal Tuxedo',
      tagline: 'Midnight Navy & Aksen Emas',
      badge: '🎩',
      bgGradient: 'linear-gradient(135deg, #172554 0%, #1E3A8A 100%)',
      borderColor: '#1E3A8A',
      sofaColor: '#1E3A8A',
      sofaAccent: '#F59E0B',
      sofaLight: '#FEF3C7',
      treeColor: '#1E40AF',
      treeAccent: '#D97706'
    }
  };

  const [activeSpeech, setActiveSpeech] = useState(null);
  const [flyingCoins, setFlyingCoins] = useState([]);
  const [claimedRoomMilestones, setClaimedRoomMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_claimed_room_milestones');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const totalDecorCount = Object.values(unlockedItems).filter(Boolean).length;
  const maxDecorCount = 9;
  const ROOM_MILESTONES = [
    { id: 'ms_4', reqCount: 4, label: '4/9', coins: 250, gems: 5, stars: 1, title: 'Peti Renovasi Awal' },
    { id: 'ms_6', reqCount: 6, label: '6/9', coins: 500, gems: 15, stars: 2, title: 'Peti Renovasi Menengah' },
    { id: 'ms_9', reqCount: 9, label: '9/9', coins: 1200, gems: 35, stars: 3, title: 'Peti Kafe Sempurna' }
  ];

  const handleClaimRoomMilestone = (ms) => {
    if (claimedRoomMilestones.includes(ms.id)) {
      audio.playPop();
      if (onShowToast) onShowToast(`${ms.title} sudah diklaim! ✨`);
      return;
    }
    if (totalDecorCount < ms.reqCount) {
      audio.playPop();
      if (onShowToast) onShowToast(`Buka ${ms.reqCount} dekorasi kafe untuk mengklaim ${ms.title} (+${ms.coins} 🪙 & +${ms.gems} 💎)!`);
      return;
    }
    const nextClaimed = [...claimedRoomMilestones, ms.id];
    setClaimedRoomMilestones(nextClaimed);
    try {
      localStorage.setItem('zorro_claimed_room_milestones', JSON.stringify(nextClaimed));
    } catch (e) {}

    audio.playFanfare();
    confetti({ particleCount: 45, spread: 75, origin: { y: 0.5 } });
    if (onAddCoins && ms.coins) onAddCoins(ms.coins);
    if (onAddGems && ms.gems) onAddGems(ms.gems);
    if (onAddStars && ms.stars) onAddStars(ms.stars);
    if (onShowToast) onShowToast(`🎁 ${ms.title} Diklaim! +${ms.coins} 🪙, +${ms.gems} 💎 & +${ms.stars} ⭐!`);
  };

  // Visiting Cafe Customers with dynamic tip dialogues
  const GUEST_VISITORS = [
    {
      id: 'chloe',
      name: 'Chloe',
      role: 'Mahasiswi Arsitektur',
      avatar: '👧🏼',
      drink: 'Iced Caramel Macchiato 🧋',
      quote: 'Kopi macchiato dan muffin di Kafe Zorro terenak di kota! 🧋✨',
      rewardCoins: 85,
      rewardEnergy: 10
    },
    {
      id: 'ken',
      name: 'Barista Ken',
      role: 'Ahli Kopi Spesial',
      avatar: '🧑🏻‍🍳',
      drink: 'Cold Brew Vanilla ☕',
      quote: 'Aroma biji kopi di kafe Nina dan Zorro ini aromatik luar biasa! ☕✨',
      rewardCoins: 120,
      rewardEnergy: 15
    },
    {
      id: 'sarah',
      name: 'Sarah',
      role: 'Pelukis Kucing',
      avatar: '👩🏼‍🎨',
      drink: 'Matcha Latte 🍵',
      quote: 'Zorro dan Thor pose-nya sangat fotogenik untuk digambar di kanvasku! 🎨🐾',
      rewardCoins: 95,
      rewardEnergy: 10
    }
  ];
  const [currentGuestIndex, setCurrentGuestIndex] = useState(0);

  // Idle tip accumulation from cafe visitors
  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCafeTips(prev => {
        const decorCount = Object.values(unlockedItems).filter(Boolean).length;
        const gain = 10 + decorCount * 3;
        const next = Math.min(500, prev + gain);
        try { localStorage.setItem('zorro_cafe_tips', next.toString()); } catch (e) {}
        return next;
      });
    }, 14000);
    return () => clearInterval(tipInterval);
  }, [unlockedItems]);

  const handleCollectTips = () => {
    if (cafeTips <= 0) {
      if (onShowToast) onShowToast("Pelanggan sedang berkunjung, tunggu sebentar untuk tip berikutnya! 🐾");
      return;
    }
    const amt = cafeTips;
    setCafeTips(0);
    try { localStorage.setItem('zorro_cafe_tips', '0'); } catch (e) {}
    audio.playFanfare();
    confetti({ particleCount: 30, spread: 60, origin: { x: 0.2, y: 0.6 } });
    if (onAddCoins) onAddCoins(amt);
    if (onShowToast) onShowToast(`🪙 Mengambil Tip Pengunjung: +${amt} Koin Kafe!`);

    const newCoins = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      startX: 22 + (Math.random() * 3),
      startY: 56 + (Math.random() * 3),
      delay: `${i * 0.08}s`
    }));
    setFlyingCoins(newCoins);
    setTimeout(() => setFlyingCoins([]), 1200);
  };

  // Tab items configuration
  const tabData = {
    furniture: [
      {
        id: 'kitty_sofa',
        name: 'Kitty Sofa',
        preview: '/ui/renovations/kitty_sofa.png',
        priceGems: 150,
        reqLevel: 2
      },
      {
        id: 'pastel_cattree',
        name: 'Pastel Cat Tree',
        preview: '/ui/renovations/pastel_cattree.png',
        priceCoins: 4000,
        reqLevel: 3
      },
      {
        id: 'floral_rug',
        name: 'Floral Rug',
        preview: '/ui/renovations/floral_rug.png',
        priceCoins: 800,
        reqLevel: 1
      },
      {
        id: 'cozy_teacup',
        name: 'Cozy Teacup Set',
        preview: '/ui/renovations/cozy_teacup.png',
        priceCoins: 1500,
        reqLevel: 2
      }
    ],
    toys: [
      {
        id: 'feather_wand',
        name: 'Feather Wand',
        preview: '/ui/sprites/yarn_ball.png',
        priceCoins: 900,
        reqLevel: 1
      },
      {
        id: 'catnip_mouse',
        name: 'Catnip Plush Mouse',
        preview: '/ui/sprites/paw_lv2.png',
        priceCoins: 2000,
        reqLevel: 2
      },
      {
        id: 'laser_tower',
        name: 'Laser Beam Tower',
        preview: '/ui/sprites/paw_lv3.png',
        priceGems: 90,
        reqLevel: 3
      }
    ],
    decor: [
      {
        id: 'potted_fern',
        name: 'Potted Fern Plant',
        preview: '/ui/renovations/floral_rug.png',
        priceCoins: 600,
        reqLevel: 1
      },
      {
        id: 'cat_clock',
        name: 'Kitty Wall Clock',
        preview: '/ui/renovations/cozy_teacup.png',
        priceCoins: 2000,
        reqLevel: 2
      }
    ]
  };

  const handleOpenStyleModal = (item, isNewPurchase = false) => {
    audio.playPop();
    const currentStyle = decorStyles[item.id] || 'pastel';
    setSelectedStyleOption(currentStyle);
    setStyleModalTarget({ item, isNewPurchase });
  };

  const handleBuyItem = (item) => {
    if (unlockedItems[item.id]) {
      // Free aesthetic style switching for already unlocked items!
      handleOpenStyleModal(item, false);
      return;
    }

    // Check balance before opening 3-choice modal
    if (item.priceGems && gems < item.priceGems) {
      audio.playPop();
      if (onShowToast) onShowToast("Permata tidak cukup! Kunjungi Shop untuk top-up 💎");
      return;
    }
    if (item.priceCoins && coins < item.priceCoins) {
      audio.playPop();
      if (onShowToast) onShowToast("Koin tidak cukup! Selesaikan pesanan pelanggan di papan merge 🪙");
      return;
    }

    // Open Piece of Cake 3-choice aesthetic selector
    handleOpenStyleModal(item, true);
  };

  const handleConfirmStyle = () => {
    if (!styleModalTarget) return;
    const { item, isNewPurchase } = styleModalTarget;

    if (isNewPurchase) {
      if (item.priceGems) {
        if (gems < item.priceGems) {
          audio.playPop();
          if (onShowToast) onShowToast("Permata tidak cukup! 💎");
          return;
        }
        if (onSpendGems) onSpendGems(item.priceGems);
      } else if (item.priceCoins) {
        if (coins < item.priceCoins) {
          audio.playPop();
          if (onShowToast) onShowToast("Koin tidak cukup! 🪙");
          return;
        }
        if (onSpendCoins) onSpendCoins(item.priceCoins);
      }

      const nextUnlocked = { ...unlockedItems, [item.id]: true };
      setUnlockedItems(nextUnlocked);
      try {
        localStorage.setItem('zorro_unlocked_decor', JSON.stringify(nextUnlocked));
      } catch (e) {}
      if (onAddStars) onAddStars(1);
      if (onDecorUnlocked) onDecorUnlocked();
    }

    const nextStyles = { ...decorStyles, [item.id]: selectedStyleOption };
    setDecorStyles(nextStyles);
    try {
      localStorage.setItem('zorro_decor_styles', JSON.stringify(nextStyles));
    } catch (e) {}

    audio.playFanfare();
    confetti({ particleCount: 45, spread: 75, origin: { y: 0.65 } });
    const chosenStyle = STYLE_CHOICES[selectedStyleOption] || STYLE_CHOICES.pastel;
    if (onShowToast) onShowToast(`✨ Gaya ${chosenStyle.name} untuk ${item.name} berhasil diterapkan!`);

    if (isNewPurchase && onTriggerStory) {
      setTimeout(() => {
        onTriggerStory({
          avatar: '🐱',
          speaker: 'Zorro Tuxedo',
          message: `Purrr! Gaya ${chosenStyle.name} untuk ${item.name} terlihat luar biasa di kafe kita! Tamu-tamu pasti betah bersantai.`,
          options: [
            { text: 'Sangat cocok untuk kafe kita! 🐾', response: 'Meow! Kafe kita semakin estetik setiap hari!' },
            { text: 'Ayo terus percantik kafe!', response: 'Purrrr! Siap menyambut pelanggan berikutnya!' }
          ]
        });
      }, 600);
    }

    setStyleModalTarget(null);
  };

  const handleNinaClick = () => {
    audio.playPop();
    if (onTriggerStory && Math.random() > 0.5) {
      onTriggerStory({
        avatar: '👩🏻‍🦰',
        speaker: 'Nina',
        message: 'Zorro, Thor, dan Loki kelihatannya sangat bersemangat hari ini! Pelanggan sangat menyukai menu kafe kita.',
        options: [
          { text: 'Ayo racik menu baru di dapur!', response: 'Ide cemerlang! Buka papan merge untuk meracik resep!' },
          { text: 'Bagaimana kalau kita beri mereka camilan?', response: 'Bagus sekali! Kucing-kucing suka salmon dan churu!' }
        ]
      });
      return;
    }
    const quotes = [
      "Selamat datang di Cafe Zorro! Semua kue dibuat penuh cinta 🧁",
      "Zorro sangat suka duduk di samping etalase kue ini! 🐾",
      "Kamu sudah merge kue hari ini? Pelanggan kita sedang ramai!",
      "Cafe kita makin cantik berkat bantuanmu! ✨"
    ];
    setActiveSpeech({
      speaker: 'Nina',
      text: quotes[Math.floor(Math.random() * quotes.length)],
      x: '24%',
      y: '38%'
    });
    setTimeout(() => setActiveSpeech(null), 3500);
  };

  const handleZorroClick = () => {
    audio.playMeow('zorro');
    if (onOpenInteractCat) {
      onOpenInteractCat('zorro');
      return;
    }
  };

  const handleCatFloorClick = (catName) => {
    audio.playMeow(catName);
    if (onOpenInteractCat) {
      onOpenInteractCat(catName);
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundImage: 'url(/backgrounds/lobby.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden'
    }}>
      {/* Top-Left Quick Cafe Features: Guestbook & Album */}
      <div style={{
        position: 'absolute',
        left: '24px',
        top: '115px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 20
      }}>
        {onOpenGuestbook && (
          <button
            onClick={() => {
              audio.playPop();
              onOpenGuestbook();
            }}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
              border: '2.5px solid #8B5A2B',
              borderRadius: '16px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '900',
              color: '#4A2810',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
            title="Buku Tamu & Ulasan Kafe"
          >
            <span>📖</span>
            <span>Buku Tamu</span>
          </button>
        )}

        {onOpenAlbum && (
          <button
            onClick={() => {
              audio.playPop();
              onOpenAlbum();
            }}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
              border: '2.5px solid #8B5A2B',
              borderRadius: '16px',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: '900',
              color: '#4A2810',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
            title="Album Kenangan Foto Zorro"
          >
            <span>📸</span>
            <span>Album Zorro</span>
          </button>
        )}

        {/* Piece of Cake Room Renovation Progress & Milestone Chests */}
        <div style={{
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '2.5px solid #8B5A2B',
          borderRadius: '18px',
          padding: '5px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: '110px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '900', color: '#4A2810' }}>
              <span>🏠 Renovasi Kafe</span>
              <span style={{ color: '#D97706' }}>{totalDecorCount}/{maxDecorCount}</span>
            </div>
            <div style={{
              width: '100%',
              height: '7px',
              background: '#E5D5C5',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid #C4A482'
            }}>
              <div style={{
                width: `${Math.min(100, (totalDecorCount / maxDecorCount) * 100)}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            {ROOM_MILESTONES.map((ms) => {
              const isClaimed = claimedRoomMilestones.includes(ms.id);
              const canClaim = !isClaimed && totalDecorCount >= ms.reqCount;
              return (
                <button
                  key={ms.id}
                  onClick={() => handleClaimRoomMilestone(ms)}
                  className="mockup-action-btn"
                  style={{
                    background: isClaimed
                      ? '#D1FAE5'
                      : canClaim
                      ? 'linear-gradient(180deg, #FEF08A 0%, #F59E0B 100%)'
                      : '#F3EFEA',
                    border: isClaimed
                      ? '1.5px solid #10B981'
                      : canClaim
                      ? '2px solid #B45309'
                      : '1.5px dashed #C4A482',
                    borderRadius: '10px',
                    padding: '3px 6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontSize: '10px',
                    fontWeight: '900',
                    color: isClaimed ? '#047857' : canClaim ? '#451A03' : '#78350F',
                    cursor: 'pointer',
                    animation: canClaim ? 'pulseReady 1.4s infinite' : 'none'
                  }}
                  title={`${ms.title} (${ms.label} Dekorasi): +${ms.coins} 🪙 & +${ms.gems} 💎`}
                >
                  <span>{isClaimed ? '✅' : canClaim ? '🎁' : '🔒'}</span>
                  <span>{ms.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Nina Character behind Pastry Showcase (Life-size Proportional Scale) */}
      <div
        onClick={handleNinaClick}
        style={{
          position: 'absolute',
          left: '9%',
          top: '20%',
          width: '175px',
          height: '310px',
          cursor: 'pointer',
          zIndex: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          userSelect: 'none'
        }}
        title="Bicara dengan Nina Sang Pemilik Kafe 👩🏻‍🍳"
      >
        {/* Transparent Full-Body Nina Cutout at Human Scale */}
        <div
          className="cat-breathe"
          style={{
            position: 'relative',
            width: '100%',
            height: '285px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.48))'
          }}
        >
          <img
            src="/cats/nina_transparent.png"
            alt="Nina"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />

          {/* Steaming Coffee Cup in Hand */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            right: '12px',
            fontSize: '24px',
            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))',
            animation: 'bouncePurr 2.5s infinite ease-in-out'
          }}>
            ☕
          </div>
        </div>

        {/* Barista Name Tag Badge */}
        <div
          style={{
            marginTop: '-12px',
            background: 'linear-gradient(180deg, #EA580C 0%, #C2410C 100%)',
            border: '2px solid #7C2D12',
            borderRadius: '12px',
            padding: '3px 12px',
            fontSize: '11px',
            fontWeight: '900',
            color: '#FFF',
            boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
            zIndex: 18,
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>👩🏻‍🍳</span>
          <span>Nina (Barista Owner)</span>
        </div>
      </div>

      {/* Animated Steam over Coffee Counter */}
      <div style={{
        position: 'absolute',
        left: '22%',
        top: '60%',
        pointerEvents: 'none',
        zIndex: 14,
        display: 'flex',
        gap: '4px'
      }}>
        <span className="steam-particle" style={{ fontSize: '14px', animationDelay: '0s' }}>♨️</span>
        <span className="steam-particle" style={{ fontSize: '12px', animationDelay: '0.8s' }}>♨️</span>
      </div>

      {/* Interactive Cafe Tip Jar on Counter */}
      <div
        onClick={handleCollectTips}
        style={{
          position: 'absolute',
          left: '16%',
          top: '56%',
          cursor: 'pointer',
          zIndex: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        title="Ketuk untuk mengambil Tip Pengunjung Kafe 🪙"
      >
        <div style={{
          background: 'linear-gradient(180deg, #FEF3C7 0%, #F59E0B 100%)',
          border: '2px solid #B45309',
          borderRadius: '14px',
          padding: '4px 9px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 4px 10px rgba(180, 83, 9, 0.4)',
          fontSize: '11px',
          fontWeight: '900',
          color: '#451A03',
          animation: cafeTips > 0 ? 'pulseReady 2.2s infinite' : 'none'
        }}>
          <span>🏺 Tip:</span>
          <span style={{ color: '#78350F' }}>+{cafeTips} 🪙</span>
        </div>
      </div>

      {/* Flying Tip Coins to Header */}
      {flyingCoins.map(c => (
        <div
          key={c.id}
          className="flying-tip-coin"
          style={{
            left: `${c.startX}%`,
            top: `${c.startY}%`,
            animationDelay: c.delay
          }}
        >
          🪙
        </div>
      ))}

      {/* Interactive Zorro Mascot on the Cafe Floor (Proportional Life-Size Cat Scale) */}
      <div
        style={{
          position: 'absolute',
          left: '27%',
          top: '64%',
          transform: 'translate(-50%, -50%)',
          zIndex: 18
        }}
      >
        <InteractiveCatActor
          type="zorro"
          stage="adult"
          size={225}
          initialPhotoMode={true}
          showModeToggle={true}
          equippedOutfit={equippedOutfits.zorro}
          onPet={handleZorroClick}
          onClick={handleZorroClick}
        />
      </div>

      {/* Clickable Interactive Hotspot: Cats on the rug */}
      <div
        onClick={() => handleCatFloorClick('calico')}
        style={{
          position: 'absolute',
          left: '37%',
          top: '72%',
          width: '14%',
          height: '20%',
          cursor: 'pointer',
          zIndex: 15
        }}
        title="Interaksi dengan Kucing Manja"
      />

      {/* Placed Decor: Floral Rug Carpet Accent (Styled via 3-Choice System) */}
      {unlockedItems.floral_rug && (() => {
        const rugStyle = STYLE_CHOICES[decorStyles.floral_rug || 'rustic'];
        return (
          <div
            onClick={() => {
              audio.playPop();
              handleOpenStyleModal({ id: 'floral_rug', name: 'Floral Rug' }, false);
            }}
            style={{
              position: 'absolute',
              left: '34%',
              top: '76%',
              width: '180px',
              height: '58px',
              zIndex: 11,
              cursor: 'pointer',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.22))'
            }}
            title={`Floral Rug [${rugStyle.name}] (Ketuk untuk ganti gaya karpet 🧶)`}
          >
            <svg width="100%" height="100%" viewBox="0 0 180 58">
              <ellipse cx="90" cy="29" rx="84" ry="24" fill={rugStyle.sofaLight} stroke={rugStyle.sofaColor} strokeWidth="3.5" />
              <ellipse cx="90" cy="29" rx="70" ry="17" fill="none" stroke={rugStyle.sofaAccent} strokeWidth="2" strokeDasharray="6 4" />
              <circle cx="52" cy="29" r="5" fill={rugStyle.sofaColor} opacity="0.65" />
              <circle cx="90" cy="29" r="6" fill={rugStyle.sofaAccent} opacity="0.75" />
              <circle cx="128" cy="29" r="5" fill={rugStyle.sofaColor} opacity="0.65" />
            </svg>
          </div>
        );
      })()}

      {/* Placed Decor: Potted Fern (Styled via 3-Choice System) */}
      {unlockedItems.potted_fern && (() => {
        const fernStyle = STYLE_CHOICES[decorStyles.potted_fern || 'rustic'];
        return (
          <div
            onClick={() => {
              audio.playPop();
              handleOpenStyleModal({ id: 'potted_fern', name: 'Potted Fern Plant' }, false);
            }}
            style={{
              position: 'absolute',
              left: '5%',
              top: '58%',
              width: '48px',
              height: '62px',
              zIndex: 14,
              cursor: 'pointer',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
            }}
            title={`Tanaman Pakis [${fernStyle.name}] (Ketuk untuk ganti pot 🌿)`}
          >
            <svg width="100%" height="100%" viewBox="0 0 48 64">
              <defs>
                <linearGradient id="potGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={fernStyle.sofaColor} />
                  <stop offset="100%" stopColor={fernStyle.borderColor} />
                </linearGradient>
              </defs>
              <polygon points="12,38 36,38 32,60 16,60" fill="url(#potGrad)" stroke={fernStyle.borderColor} strokeWidth="1.2" />
              <ellipse cx="24" cy="38" rx="13" ry="3.5" fill={fernStyle.sofaAccent} stroke={fernStyle.borderColor} strokeWidth="1" />
              <path d="M24 38 Q18 20 6 18 Q16 28 24 38" fill="#15803D" stroke="#14532D" strokeWidth="0.8" />
              <path d="M24 38 Q30 20 42 18 Q32 28 24 38" fill="#16A34A" stroke="#14532D" strokeWidth="0.8" />
              <path d="M24 38 Q24 12 24 6 Q28 22 24 38" fill="#22C55E" stroke="#14532D" strokeWidth="0.8" />
              <path d="M24 38 Q14 26 10 32" fill="none" stroke="#15803D" strokeWidth="1.2" />
              <path d="M24 38 Q34 26 38 32" fill="none" stroke="#16A34A" strokeWidth="1.2" />
            </svg>
          </div>
        );
      })()}

      {/* Placed Decor: Cozy Teacup on Table (Styled via 3-Choice System) */}
      {unlockedItems.cozy_teacup && (() => {
        const cupStyle = STYLE_CHOICES[decorStyles.cozy_teacup || 'pastel'];
        return (
          <div
            onClick={() => {
              audio.playPop();
              handleOpenStyleModal({ id: 'cozy_teacup', name: 'Cozy Teacup Set' }, false);
            }}
            style={{
              position: 'absolute',
              left: '52%',
              top: '64%',
              width: '32px',
              height: '28px',
              zIndex: 16,
              cursor: 'pointer',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))'
            }}
            title={`Cangkir Teh Cozy [${cupStyle.name}] (Ketuk untuk ganti gaya ☕)`}
          >
            <svg width="100%" height="100%" viewBox="0 0 36 32">
              <ellipse cx="18" cy="28" rx="14" ry="3" fill={cupStyle.sofaLight} stroke={cupStyle.borderColor} strokeWidth="1" />
              <path d="M8 12 L10 24 C10 27 26 27 26 24 L28 12 Z" fill={cupStyle.sofaColor} stroke={cupStyle.borderColor} strokeWidth="1.2" />
              <path d="M28 14 C32 14 32 20 27 21" fill="none" stroke={cupStyle.sofaAccent} strokeWidth="1.5" />
              <ellipse cx="18" cy="12" rx="10" ry="3" fill="#92400E" />
              <path d="M16 8 Q18 4 17 2" fill="none" stroke="#FFF" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
            </svg>
          </div>
        );
      })()}

      {/* Placed Decor: Kitty Sofa in Lounge (Styled via 3-Choice System) */}
      {unlockedItems.kitty_sofa && (() => {
        const sofaStyle = STYLE_CHOICES[decorStyles.kitty_sofa || 'pastel'];
        return (
          <div
            onClick={() => {
              audio.playPurr();
              handleOpenStyleModal({ id: 'kitty_sofa', name: 'Kitty Sofa' }, false);
            }}
            style={{
              position: 'absolute',
              left: '74%',
              top: '56%',
              width: '74px',
              height: '56px',
              zIndex: 14,
              cursor: 'pointer',
              filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.32))'
            }}
            title={`Kitty Sofa [${sofaStyle.name}] (Ketuk untuk ganti gaya sofa 🛋️)`}
          >
            <svg width="100%" height="100%" viewBox="0 0 80 60">
              <defs>
                <linearGradient id="sofaPlush" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={sofaStyle.sofaLight} />
                  <stop offset="45%" stopColor={sofaStyle.sofaColor} />
                  <stop offset="100%" stopColor={sofaStyle.sofaAccent} />
                </linearGradient>
              </defs>
              <path d="M12 28 L18 10 L28 18 L52 18 L62 10 L68 28 C74 36 74 44 68 46 L12 46 C6 44 6 36 12 28 Z" fill="url(#sofaPlush)" stroke={sofaStyle.borderColor} strokeWidth="1.5" />
              <polygon points="19,13 25,18 20,22" fill={sofaStyle.sofaLight} />
              <polygon points="61,13 55,18 60,22" fill={sofaStyle.sofaLight} />
              <rect x="8" y="36" width="64" height="16" rx="8" fill={sofaStyle.sofaColor} stroke={sofaStyle.borderColor} strokeWidth="1.5" />
              <rect x="14" y="50" width="5" height="8" rx="2" fill="#D97706" stroke="#78350F" strokeWidth="1" />
              <rect x="61" y="50" width="5" height="8" rx="2" fill="#D97706" stroke="#78350F" strokeWidth="1" />
            </svg>
          </div>
        );
      })()}

      {/* Placed Decor: Cat Tree Tower (Styled via 3-Choice System) */}
      {unlockedItems.pastel_cattree && (() => {
        const treeStyle = STYLE_CHOICES[decorStyles.pastel_cattree || 'pastel'];
        return (
          <div
            onClick={() => {
              audio.playMeow();
              handleOpenStyleModal({ id: 'pastel_cattree', name: 'Cat Tree Tower' }, false);
            }}
            style={{
              position: 'absolute',
              left: '88%',
              top: '36%',
              width: '56px',
              height: '92px',
              zIndex: 14,
              cursor: 'pointer',
              filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.35))'
            }}
            title={`Cat Tree Tower [${treeStyle.name}] (Ketuk untuk ganti gaya pohon 🐱)`}
          >
            <svg width="100%" height="100%" viewBox="0 0 64 96">
              <defs>
                <linearGradient id="poleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FED7AA" />
                  <stop offset="50%" stopColor="#FDBA74" />
                  <stop offset="100%" stopColor="#FB923C" />
                </linearGradient>
              </defs>
              <ellipse cx="32" cy="88" rx="26" ry="6" fill={treeStyle.treeAccent} stroke={treeStyle.borderColor} strokeWidth="1.5" />
              <rect x="28" y="18" width="8" height="70" fill="url(#poleGrad)" stroke="#B45309" strokeWidth="1" />
              <ellipse cx="32" cy="54" rx="20" ry="5.5" fill={treeStyle.treeColor} stroke={treeStyle.borderColor} strokeWidth="1.2" />
              <ellipse cx="32" cy="18" rx="18" ry="6" fill={treeStyle.sofaLight} stroke={treeStyle.borderColor} strokeWidth="1.5" />
              <circle cx="32" cy="12" r="6" fill="#1E293B" />
              <polygon points="28,8 26,4 30,7" fill="#1E293B" />
              <polygon points="36,8 38,4 34,7" fill="#1E293B" />
              <line x1="18" y1="56" x2="18" y2="68" stroke="#94A3B8" strokeWidth="1" />
              <circle cx="18" cy="70" r="3.5" fill={treeStyle.sofaColor} />
            </svg>
          </div>
        );
      })()}

      {/* Placed Decor: Kitty Pendulum Wall Clock */}
      {unlockedItems.cat_clock && (() => {
        const clkStyle = STYLE_CHOICES[decorStyles.cat_clock || 'pastel'] || STYLE_CHOICES.pastel;
        return (
          <div
            onClick={() => {
              audio.playPop();
              audio.playBell();
              if (onAddCoins) onAddCoins(15);
              handleOpenStyleModal('cat_clock', 'Kitty Wall Clock');
            }}
            style={{
              position: 'absolute',
              left: '64%',
              top: '16%',
              width: '42px',
              height: '58px',
              zIndex: 12,
              cursor: 'pointer',
              filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))'
            }}
            title={`Kitty Pendulum Clock (${clkStyle.label} - Ketuk untuk ganti gaya & +15 🪙)`}
          >
            <svg width="100%" height="100%" viewBox="0 0 42 58">
              <polygon points="12,12 8,4 16,9" fill={clkStyle.borderColor} />
              <polygon points="30,12 34,4 26,9" fill={clkStyle.borderColor} />
              <ellipse cx="21" cy="22" rx="16" ry="14" fill={clkStyle.sofaColor} stroke={clkStyle.borderColor} strokeWidth="1.4" />
              <circle cx="21" cy="22" r="10" fill="#FFFDF8" />
              <line x1="21" y1="22" x2="21" y2="16" stroke={clkStyle.borderColor} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="21" y1="22" x2="25" y2="22" stroke="#EA580C" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="21" cy="22" r="1.5" fill={clkStyle.borderColor} />
              <path d="M21 36 Q19 46 25 54" fill="none" stroke={clkStyle.borderColor} strokeWidth="2.5" strokeLinecap="round">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="-12 21 36; 12 21 36; -12 21 36"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        );
      })()}

      {/* Placed Decor: Feather Wand Play Station */}
      {unlockedItems.feather_wand && (() => {
        const wandStyle = STYLE_CHOICES[decorStyles.feather_wand || 'pastel'] || STYLE_CHOICES.pastel;
        return (
          <div
            onClick={() => {
              audio.playPurr();
              audio.playPop();
              if (onAddCoins) onAddCoins(20);
              confetti({ particleCount: 20, spread: 45, origin: { x: 0.41, y: 0.70 } });
              handleOpenStyleModal('feather_wand', 'Feather Wand');
            }}
            style={{
              position: 'absolute',
              left: '40%',
              top: '68%',
              width: '34px',
              height: '46px',
              zIndex: 16,
              cursor: 'pointer',
              filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.28))'
            }}
            title={`Feather Wand (${wandStyle.label} - Ketuk untuk ganti gaya & +20 🪙)`}
          >
            <svg width="100%" height="100%" viewBox="0 0 34 46">
              <line x1="8" y1="42" x2="24" y2="10" stroke={wandStyle.borderColor} strokeWidth="2.2" strokeLinecap="round" />
              <path d="M24 10 Q28 4 32 8 Q28 12 24 10" fill={wandStyle.sofaColor} stroke={wandStyle.borderColor} strokeWidth="0.9" />
              <path d="M24 10 Q26 2 29 4 Q27 8 24 10" fill={wandStyle.treeColor} stroke={wandStyle.borderColor} strokeWidth="0.9" />
              <circle cx="24" cy="10" r="2.2" fill="#FBBF24" />
            </svg>
          </div>
        );
      })()}

      {/* Placed Decor: Catnip Plush Mouse */}
      {unlockedItems.catnip_mouse && (() => {
        const mouseStyle = STYLE_CHOICES[decorStyles.catnip_mouse || 'pastel'] || STYLE_CHOICES.pastel;
        return (
          <div
            onClick={() => {
              audio.playMeow();
              audio.playPurr();
              if (onAddCoins) onAddCoins(25);
              confetti({ particleCount: 20, spread: 45, origin: { x: 0.58, y: 0.72 } });
              handleOpenStyleModal('catnip_mouse', 'Catnip Mouse');
            }}
            style={{
              position: 'absolute',
              left: '58%',
              top: '72%',
              width: '32px',
              height: '24px',
              zIndex: 16,
              cursor: 'pointer',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))'
            }}
            title={`Catnip Mouse (${mouseStyle.label} - Ketuk untuk ganti gaya & +25 🪙)`}
          >
            <svg width="100%" height="100%" viewBox="0 0 32 24">
              <ellipse cx="16" cy="14" rx="10" ry="7" fill={mouseStyle.sofaColor} stroke={mouseStyle.borderColor} strokeWidth="1.2" />
              <circle cx="8" cy="9" r="3" fill={mouseStyle.sofaLight} stroke={mouseStyle.borderColor} strokeWidth="0.8" />
              <circle cx="12" cy="8" r="3" fill={mouseStyle.sofaLight} stroke={mouseStyle.borderColor} strokeWidth="0.8" />
              <circle cx="6" cy="14" r="1.5" fill="#E11D48" />
              <path d="M26 14 Q30 11 31 16" fill="none" stroke={mouseStyle.borderColor} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        );
      })()}

      {/* Placed Decor: Automatic Laser Tower (90 Gems VIP Decor!) */}
      {unlockedItems.laser_tower && (() => {
        const laserStyle = STYLE_CHOICES[decorStyles.laser_tower || 'royal'] || STYLE_CHOICES.royal;
        return (
          <div
            onClick={() => {
              audio.playMagic();
              audio.playPurr();
              if (onAddCoins) onAddCoins(35);
              if (onAddEnergy) onAddEnergy(5);
              confetti({ particleCount: 30, spread: 60, origin: { x: 0.30, y: 0.65 } });
              handleOpenStyleModal('laser_tower', 'Auto Laser Tower');
            }}
            style={{
              position: 'absolute',
              left: '30%',
              top: '60%',
              width: '48px',
              height: '62px',
              zIndex: 17,
              cursor: 'pointer',
              filter: 'drop-shadow(0 4px 8px rgba(225,29,72,0.35))'
            }}
            title={`Auto Laser Tower (${laserStyle.label} - Ketuk untuk ganti gaya & +35 🪙 +5 ⚡)`}
          >
            <svg width="100%" height="100%" viewBox="0 0 48 62" style={{ overflow: 'visible' }}>
              {/* Pedestal Base */}
              <ellipse cx="24" cy="54" rx="14" ry="5" fill={laserStyle.treeAccent} stroke={laserStyle.borderColor} strokeWidth="1.5" />
              {/* Tower Body */}
              <path d="M16 54 L19 22 L29 22 L32 54 Z" fill={laserStyle.sofaColor} stroke={laserStyle.borderColor} strokeWidth="1.5" />
              {/* Golden Collar */}
              <rect x="17" y="22" width="14" height="4" rx="2" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
              {/* Rotating Cat Head Dome */}
              <circle cx="24" cy="14" r="9" fill={laserStyle.sofaLight} stroke={laserStyle.borderColor} strokeWidth="1.5" />
              <polygon points="17,8 15,2 21,6" fill={laserStyle.borderColor} />
              <polygon points="31,8 33,2 27,6" fill={laserStyle.borderColor} />
              {/* Glowing Laser Lens */}
              <circle cx="24" cy="14" r="3.5" fill="#EF4444" stroke="#FECDD3" strokeWidth="1">
                <animate attributeName="r" values="3;4.2;3" dur="0.8s" repeatCount="indefinite" />
              </circle>
              {/* Animated Laser Beam & Floor Dot */}
              <g>
                <line x1="24" y1="14" x2="65" y2="56" stroke="#EF4444" strokeWidth="1.4" strokeDasharray="3 2" opacity="0.75">
                  <animate attributeName="x2" values="50; 85; 42; 50" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="y2" values="56; 48; 62; 56" dur="2.6s" repeatCount="indefinite" />
                </line>
                <circle cx="65" cy="56" r="3.5" fill="#EF4444" filter="drop-shadow(0 0 4px #EF4444)">
                  <animate attributeName="cx" values="50; 85; 42; 50" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="56; 48; 62; 56" dur="2.6s" repeatCount="indefinite" />
                </circle>
              </g>
            </svg>
          </div>
        );
      })()}

      {/* Animated Cafe Visiting Customer sitting at Cafe Table */}
      {(() => {
        const guest = GUEST_VISITORS[currentGuestIndex % GUEST_VISITORS.length];
        return (
          <div
            onClick={() => {
              audio.playFanfare();
              audio.playPurr();
              const coinsGain = guest.rewardCoins;
              const energyGain = guest.rewardEnergy;
              if (onAddCoins) onAddCoins(coinsGain);
              if (onAddEnergy) onAddEnergy(energyGain);
              confetti({ particleCount: 30, spread: 60, origin: { x: 0.63, y: 0.45 } });
              setActiveSpeech({
                speaker: guest.name,
                text: `${guest.quote} (Tip: +${coinsGain} 🪙 & +${energyGain} ⚡)`,
                x: '63%',
                y: '30%'
              });
              if (onShowToast) onShowToast(`${guest.name} puas menikmati hidangan kafe! +${coinsGain} 🪙 & +${energyGain} ⚡`);
              setCurrentGuestIndex(idx => idx + 1);
            }}
            style={{
              position: 'absolute',
              left: '63%',
              top: '42%',
              transform: 'translate(-50%, -50%)',
              zIndex: 15,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              userSelect: 'none'
            }}
            title={`${guest.name} (${guest.role}) - Ketuk untuk menyapa & dapatkan tip kafe!`}
          >
            <div
              className="cat-breathe"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.32))'
              }}
            >
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '46px', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.25))' }}>
                  {guest.avatar}
                </span>
                <span style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-10px',
                  fontSize: '20px',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}>
                  🧋
                </span>
              </div>

              <div style={{
                marginTop: '4px',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FEF3C7 100%)',
                border: '1.5px solid #D97706',
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '10px',
                fontWeight: '900',
                color: '#78350F',
                boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}>
                <span>⭐ Tamu: {guest.name}</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Cafe Resident: Chef Thor on Floral Rug (Proportional Life-Size Scale) */}
      <div
        onClick={() => {
          audio.playMeow('thor');
          audio.playPurr();
          audio.playCoin();
          setActiveSpeech({
            speaker: 'Chef Thor Tabby',
            text: 'Meow! Aku baru saja memeriksa adonan croissant di dapur, mengembang sempurna! (+30 🪙)',
            x: '50%',
            y: '48%'
          });
          if (onAddCoins) onAddCoins(30);
          confetti({ particleCount: 20, spread: 45, origin: { x: 0.50, y: 0.55 } });
        }}
        style={{
          position: 'absolute',
          left: '48%',
          top: '64%',
          transform: 'translate(-50%, -50%)',
          zIndex: 16,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        title="Chef Thor Tabby (Ketuk untuk menyapa & terima koin 🐾)"
      >
        <div
          className="cat-breathe"
          style={{
            position: 'relative',
            width: '135px',
            height: '145px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 10px 16px rgba(0,0,0,0.38))'
          }}
        >
          {/* Realistic Floor Contact Shadow */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '110px',
              height: '24px',
              background: 'radial-gradient(ellipse at center, rgba(30, 15, 5, 0.45) 0%, rgba(30, 15, 5, 0) 72%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
          <img
            src="/cats/thor_transparent.png"
            alt="Thor"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
        <div style={{
          marginTop: '-6px',
          background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
          border: '1.5px solid #92400E',
          borderRadius: '10px',
          padding: '2px 8px',
          fontSize: '10px',
          fontWeight: '900',
          color: '#FFF',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 20
        }}>
          🐾 Thor (Sous-Chef)
        </div>
      </div>

      {/* Cafe Resident: Loki Lion near Lounge Sofa (Proportional Life-Size Scale) */}
      <div
        onClick={() => {
          audio.playMeow('loki');
          audio.playPurr();
          audio.playCoin();
          setActiveSpeech({
            speaker: 'Loki Lion',
            text: 'Purrrrr... Tempat terbaik di kafe ini ada di sini, hangat dan empuk! (+40 🪙)',
            x: '68%',
            y: '42%'
          });
          if (onAddCoins) onAddCoins(40);
          confetti({ particleCount: 25, spread: 50, origin: { x: 0.68, y: 0.50 } });
        }}
        style={{
          position: 'absolute',
          left: '68%',
          top: '58%',
          transform: 'translate(-50%, -50%)',
          zIndex: 16,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        title="Loki Lion (Ketuk untuk menyapa & terima koin 🦁)"
      >
        <div
          className="cat-breathe"
          style={{
            position: 'relative',
            width: '145px',
            height: '155px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.4))'
          }}
        >
          {/* Realistic Floor Contact Shadow */}
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '24px',
              background: 'radial-gradient(ellipse at center, rgba(30, 15, 5, 0.45) 0%, rgba(30, 15, 5, 0) 72%)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
          <img
            src="/cats/loki_transparent.png"
            alt="Loki"
            style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
          />
        </div>
        <div style={{
          marginTop: '-6px',
          background: 'linear-gradient(180deg, #EA580C 0%, #C2410C 100%)',
          border: '1.5px solid #7C2D12',
          borderRadius: '10px',
          padding: '2px 8px',
          fontSize: '10px',
          fontWeight: '900',
          color: '#FFF',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 20
        }}>
          🦁 Loki (Lion Guard)
        </div>
      </div>

      {/* Floating Nina / Cat Speech Bubble */}
      {activeSpeech && (
        <div style={{
          position: 'absolute',
          left: activeSpeech.x,
          top: activeSpeech.y,
          transform: 'translate(-50%, -100%)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8F0 100%)',
          border: '2.5px solid #8B5A2B',
          borderRadius: '18px',
          padding: '8px 14px',
          maxWidth: '240px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          zIndex: 30,
          animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '900', color: '#EA580C', marginBottom: '2px' }}>
            {activeSpeech.speaker} 💬
          </div>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#3B1E08', lineHeight: '1.3' }}>
            {activeSpeech.text}
          </div>
          {/* Arrow */}
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

      {/* Right-Side Renovation Drawer matching loby.jpg (Collapsible) */}
      {isDrawerOpen ? (
        <div style={{
          position: 'absolute',
          right: '24px',
          top: '120px',
          width: '740px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 20,
          animation: 'popIn 0.25s ease-out'
        }}>
          {/* Tabs Row matching loby.jpg */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            paddingLeft: '12px',
            marginBottom: '-4px',
            position: 'relative',
            zIndex: 5
          }}>
          {/* Furniture Tab */}
          <button
            onClick={() => {
              audio.playPop();
              setActiveTab('furniture');
            }}
            style={{
              background: activeTab === 'furniture'
                ? 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)'
                : 'linear-gradient(180deg, #E6CCA8 0%, #C49666 100%)',
              border: '2.5px solid #8B5A2B',
              borderBottom: activeTab === 'furniture' ? 'none' : '2.5px solid #8B5A2B',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              padding: '6px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: activeTab === 'furniture' ? '#4A2810' : '#FFF',
              fontWeight: '900',
              fontSize: '13px',
              textShadow: activeTab === 'furniture' ? 'none' : '0 1px 2px rgba(0,0,0,0.5)',
              boxShadow: activeTab === 'furniture' ? '0 -2px 6px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            <span>🛋️</span>
            <span>FURNITURE</span>
          </button>

          {/* Cat Toys Tab */}
          <button
            onClick={() => {
              audio.playPop();
              setActiveTab('toys');
            }}
            style={{
              background: activeTab === 'toys'
                ? 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)'
                : 'linear-gradient(180deg, #E6CCA8 0%, #C49666 100%)',
              border: '2.5px solid #8B5A2B',
              borderBottom: activeTab === 'toys' ? 'none' : '2.5px solid #8B5A2B',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              padding: '6px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: activeTab === 'toys' ? '#4A2810' : '#FFF',
              fontWeight: '900',
              fontSize: '13px',
              textShadow: activeTab === 'toys' ? 'none' : '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            <span>🧶</span>
            <span>CAT TOYS</span>
          </button>

          {/* Décor Tab */}
          <button
            onClick={() => {
              audio.playPop();
              setActiveTab('decor');
            }}
            style={{
              background: activeTab === 'decor'
                ? 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)'
                : 'linear-gradient(180deg, #E6CCA8 0%, #C49666 100%)',
              border: '2.5px solid #8B5A2B',
              borderBottom: activeTab === 'decor' ? 'none' : '2.5px solid #8B5A2B',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              padding: '6px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: activeTab === 'decor' ? '#4A2810' : '#FFF',
              fontWeight: '900',
              fontSize: '13px',
              textShadow: activeTab === 'decor' ? 'none' : '0 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            <span>🐾</span>
            <span>DÉCOR</span>
          </button>

          {/* Minimize / Hide Drawer Button */}
          <button
            onClick={() => {
              audio.playPop();
              setIsDrawerOpen(false);
            }}
            style={{
              marginLeft: 'auto',
              marginRight: '8px',
              background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
              border: '2px solid #8B5A2B',
              borderRadius: '14px',
              padding: '5px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: '#5C3818',
              fontWeight: '900',
              fontSize: '11px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
            title="Tutup menu untuk melihat ruangan Cafe"
          >
            <span>👁️</span>
            <span>Lihat Cafe</span>
          </button>
        </div>

        {/* Main Renovation Card Frame */}
        <div style={{
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '3.5px solid #8B5A2B',
          borderRadius: '24px',
          boxShadow: '0 10px 28px rgba(0, 0, 0, 0.3), inset 0 2px 4px rgba(255,255,255,0.85)',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {/* Grid of 4 Items inside */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px'
          }}>
            {tabData[activeTab]?.map((item) => {
              const isUnlocked = unlockedItems[item.id];

              return (
                <div
                  key={item.id}
                  style={{
                    background: '#FFF9F0',
                    border: isUnlocked ? '2px solid #10B981' : '2px solid #D4A373',
                    borderRadius: '18px',
                    padding: '8px 6px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '190px',
                    position: 'relative',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
                  }}
                >
                  {/* Item Title */}
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '900',
                    color: '#3B1E08',
                    textAlign: 'center',
                    lineHeight: '1.2'
                  }}>
                    {item.name}
                  </span>

                  {/* Lock / Unlocked Status Badge Top-Right */}
                  <div style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px'
                  }}>
                    {isUnlocked ? (
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: '#10B981',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFF'
                      }}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                    ) : (
                      <Lock size={14} color="#A47148" />
                    )}
                  </div>

                  {/* Item Illustration Preview */}
                  <div style={{
                    width: '90px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '6px 0'
                  }}>
                    <img
                      src={item.preview}
                      alt={item.name}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        filter: isUnlocked ? 'none' : 'grayscale(15%) drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
                      }}
                    />
                  </div>

                  {/* Level Tag if applicable */}
                  {item.reqLevel && !isUnlocked && (
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      color: '#7C4A26',
                      marginBottom: '2px'
                    }}>
                      Lv. {item.reqLevel}
                    </span>
                  )}

                  {/* Action Button: Price Pill or "Ubah Gaya" (Piece of Cake 3-Style System) */}
                  {isUnlocked ? (
                    <button
                      onClick={() => handleOpenStyleModal(item, false)}
                      className="mockup-action-btn"
                      style={{
                        background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                        border: '1.5px solid #047857',
                        borderRadius: '12px',
                        padding: '4px 8px',
                        color: '#FFFFFF',
                        fontSize: '11px',
                        fontWeight: '900',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 5px rgba(5, 150, 105, 0.3)'
                      }}
                      title="Ganti Tema Estetika 3 Pilihan"
                    >
                      <span>🎨</span>
                      <span>Ubah Gaya</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuyItem(item)}
                      className="mockup-action-btn"
                      style={{
                        width: '90%',
                        background: item.priceGems
                          ? 'linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)'
                          : 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
                        border: item.priceGems ? '2px solid #6B21A8' : '2px solid #047857',
                        borderRadius: '14px',
                        padding: '4px 6px',
                        color: '#FFFFFF',
                        fontSize: '12px',
                        fontWeight: '900',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                      }}
                    >
                      <span>{item.priceGems ? '💎' : '🪙'}</span>
                      <span>{(item.priceGems || item.priceCoins).toLocaleString()}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Action: Big Green DECORATE CAFE Button matching loby.jpg */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '2px'
          }}>
            <button
              onClick={() => {
                audio.playFanfare();
                confetti({ particleCount: 55, spread: 85, origin: { y: 0.6 } });
                if (onAddStars) onAddStars(1);
                if (onShowToast) onShowToast("Cafe Zorro Bintang 5! Dekorasi Berhasil Terpasang ✨ (+1 ⭐ Bintang Level)");
              }}
              className="mockup-action-btn"
              style={{
                background: 'linear-gradient(180deg, #34D399 0%, #10B981 50%, #059669 100%)',
                border: '3px solid #047857',
                borderRadius: '22px',
                padding: '10px 32px',
                color: '#FFFFFF',
                fontSize: '15px',
                fontWeight: '900',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                boxShadow: '0 6px 16px rgba(5, 150, 105, 0.45), inset 0 2px 2px rgba(255,255,255,0.7)',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              DECORATE CAFE ✨
            </button>
          </div>
        </div>
      </div>
      ) : (
        /* Floating Button to Re-Open Renovation Drawer */
        <button
          onClick={() => {
            audio.playPop();
            setIsDrawerOpen(true);
          }}
          className="mockup-action-btn"
          style={{
            position: 'absolute',
            right: '24px',
            top: '120px',
            background: 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)',
            border: '3px solid #C2410C',
            borderRadius: '24px',
            padding: '12px 24px',
            color: '#FFFFFF',
            fontSize: '15px',
            fontWeight: '900',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(234, 88, 12, 0.45), inset 0 2px 2px rgba(255,255,255,0.6)',
            zIndex: 25,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'popIn 0.25s ease-out'
          }}
        >
          <span style={{ fontSize: '20px' }}>🛋️</span>
          <span>Buka Dekorasi Cafe ✨</span>
        </button>
      )}

      {/* 3-Choice Style Aesthetic Selection Modal (Piece of Cake Renovation Loop) */}
      {styleModalTarget && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(6px)',
          zIndex: 80,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'popIn 0.22s ease-out'
        }}>
          <div style={{
            background: 'linear-gradient(180deg, #FFFDF8 0%, #F5E8D3 100%)',
            border: '4px solid #7C4A26',
            borderRadius: '28px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.9)',
            padding: '22px 28px',
            maxWidth: '560px',
            width: '92%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            position: 'relative'
          }}>
            {/* Modal Header */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{
                fontSize: '18px',
                fontWeight: '900',
                color: '#451A03',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}>
                <span>🎨</span>
                <span>PILIH GAYA RENOVASI</span>
                <span>✨</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#78350F' }}>
                Pilih tema estetika kafe untuk <span style={{ color: '#B45309', fontWeight: '900' }}>{styleModalTarget.item.name}</span>:
              </div>
            </div>

            {/* 3 Style Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '12px'
            }}>
              {Object.values(STYLE_CHOICES).map((choice) => {
                const isSelected = selectedStyleOption === choice.id;
                return (
                  <button
                    key={choice.id}
                    onClick={() => {
                      audio.playPop();
                      setSelectedStyleOption(choice.id);
                    }}
                    style={{
                      background: isSelected ? 'linear-gradient(180deg, #FFFBEB 0%, #FEF3C7 100%)' : '#FFFFFF',
                      border: isSelected ? '3px solid #D97706' : '2px solid #E2D3C4',
                      borderRadius: '18px',
                      padding: '12px 8px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                      boxShadow: isSelected ? '0 6px 16px rgba(217, 119, 6, 0.35)' : '0 2px 6px rgba(0,0,0,0.06)',
                      transition: 'all 0.15s ease',
                      position: 'relative'
                    }}
                  >
                    {/* Selected Checkmark Badge */}
                    {isSelected && (
                      <div style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        background: '#D97706',
                        color: '#FFF',
                        borderRadius: '50%',
                        width: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '11px',
                        fontWeight: '900'
                      }}>
                        ✓
                      </div>
                    )}

                    {/* Style Badge / Icon */}
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '14px',
                      background: choice.bgGradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '22px',
                      boxShadow: '0 3px 8px rgba(0,0,0,0.2)'
                    }}>
                      {choice.badge}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '13px', fontWeight: '900', color: isSelected ? '#78350F' : '#3B1E08' }}>
                        {choice.name}
                      </div>
                      <div style={{ fontSize: '10px', color: '#6B7280', fontWeight: '600', marginTop: '2px', lineHeight: '1.2' }}>
                        {choice.tagline}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Modal Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '6px' }}>
              <button
                onClick={() => {
                  audio.playPop();
                  setStyleModalTarget(null);
                }}
                className="mockup-action-btn"
                style={{
                  background: '#E5E7EB',
                  border: '2px solid #9CA3AF',
                  borderRadius: '16px',
                  padding: '8px 18px',
                  color: '#4B5563',
                  fontSize: '13px',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                Batal
              </button>

              <button
                onClick={handleConfirmStyle}
                className="mockup-action-btn shimmer-badge"
                style={{
                  background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                  border: '2.5px solid #047857',
                  borderBottom: '4px solid #064E3B',
                  borderRadius: '16px',
                  padding: '8px 24px',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(5, 150, 105, 0.45)'
                }}
              >
                <span>✨</span>
                <span>
                  {styleModalTarget.isNewPurchase
                    ? `Beli & Pasang (${styleModalTarget.item.priceGems ? `${styleModalTarget.item.priceGems} 💎` : `${(styleModalTarget.item.priceCoins || 0).toLocaleString()} 🪙`})`
                    : 'Terapkan Gaya Baru'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
