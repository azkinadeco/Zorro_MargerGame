import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';
import { safeConfetti } from '../utils/safeConfetti';
import { Sparkles, Trophy, Check, ArrowRight, Star, Heart } from 'lucide-react';

export const STORY_CHAPTERS = [
  {
    chapter: 1,
    title: 'Babak 1: Pesanan Pertama Kafe Zorro',
    desc: 'Layani setidaknya 2 pesanan pelanggan di papan merge.',
    type: 'orders',
    target: 2,
    rewardCoins: 350,
    rewardEnergy: 20,
    rewardStars: 1
  },
  {
    chapter: 2,
    title: 'Babak 2: Sentuhan Kasih Sayang Anabul',
    desc: 'Elus atau beri makan Zorro/Thor di Ruang Anabul.',
    type: 'pet',
    target: 1,
    rewardCoins: 450,
    rewardEnergy: 25,
    rewardStars: 1
  },
  {
    chapter: 3,
    title: 'Babak 3: Aroma Hangat Dapur Bakery',
    desc: 'Panggang 1 resep kue lezat di Dapur Bakery.',
    type: 'bake',
    target: 1,
    rewardCoins: 600,
    rewardEnergy: 30,
    rewardStars: 1
  },
  {
    chapter: 4,
    title: 'Babak 4: Renovasi Kafe Impian',
    desc: 'Beli dan pasang 1 dekorasi atau furnitur di Lobby.',
    type: 'decor',
    target: 1,
    rewardCoins: 800,
    rewardEnergy: 35,
    rewardStars: 1
  },
  {
    chapter: 5,
    title: 'Babak 5: Barista Andal Kebanggaan',
    desc: 'Selesaikan 6 pesanan pelanggan di kafe.',
    type: 'orders',
    target: 6,
    rewardCoins: 1200,
    rewardEnergy: 45,
    rewardStars: 2
  },
  {
    chapter: 6,
    title: 'Babak 6: Ekspedisi Desa Kucing',
    desc: 'Jelajahi dan buka 1 wilayah baru di Peta Desa.',
    type: 'map',
    target: 2,
    rewardCoins: 1500,
    rewardEnergy: 50,
    rewardStars: 2
  },
  {
    chapter: 7,
    title: 'Babak 7: Lemari Kostum Mewah',
    desc: 'Dandani salah satu anabul dengan kostum baru.',
    type: 'wardrobe',
    target: 1,
    rewardCoins: 2000,
    rewardEnergy: 60,
    rewardStars: 3
  },
  {
    chapter: 8,
    title: 'Babak 8: Kafe Kucing Bintang Lima',
    desc: 'Layani total 12 pesanan pelanggan yang bahagia!',
    type: 'orders',
    target: 12,
    rewardCoins: 3000,
    rewardEnergy: 80,
    rewardStars: 3
  }
];

export function StoryQuestBanner({
  totalOrdersServed = 0,
  petCount = 0,
  bakeCount = 0,
  decorCount = 0,
  equippedOutfits = {},
  unlockedWardrobeCount = 0,
  onAddCoins,
  onAddEnergy,
  onAddStars,
  onShowToast,
  onNavigate
}) {
  const [currentChapter, setCurrentChapter] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_story_chapter');
      return saved ? parseInt(saved, 10) : 1;
    } catch (e) {
      return 1;
    }
  });

  const activeQuest = STORY_CHAPTERS.find(q => q.chapter === currentChapter) || STORY_CHAPTERS[STORY_CHAPTERS.length - 1];
  const isAllCompleted = currentChapter > STORY_CHAPTERS.length;

  const getCurrentProgress = () => {
    if (isAllCompleted) return 1;
    switch (activeQuest.type) {
      case 'orders':
        return totalOrdersServed;
      case 'pet':
        return petCount;
      case 'bake':
        return bakeCount;
      case 'decor':
        return decorCount;
      case 'map':
        try {
          const claimed = JSON.parse(localStorage.getItem('zorro_claimed_map_nodes') || '[]');
          return claimed.length;
        } catch (e) { return 0; }
      case 'wardrobe': {
        const activeEquippedCount = Object.values(equippedOutfits || {}).filter(v => v && v !== 'none').length;
        if (activeEquippedCount > 0 || unlockedWardrobeCount > 0) return 1;
        try {
          const eq1 = JSON.parse(localStorage.getItem('zorro_merge_cats_v6_landscape_equipped_outfits') || '{}');
          const eq2 = JSON.parse(localStorage.getItem('zorro_merge_cats_v6_landscape_wardrobe_equipped') || '{}');
          const count = Object.values({ ...eq1, ...eq2 }).filter(v => v && v !== 'none').length;
          return count > 0 ? 1 : 0;
        } catch (e) { return 0; }
      }
      default:
        return totalOrdersServed;
    }
  };

  const progress = getCurrentProgress();
  const isReadyToClaim = !isAllCompleted && progress >= activeQuest.target;

  const handleClaimQuest = () => {
    if (!isReadyToClaim) {
      audio.playPop();
      if (onShowToast) onShowToast(`Selesaikan misi: ${activeQuest.desc}`);
      return;
    }

    audio.playFanfare();
    safeConfetti({ particleCount: 65, spread: 80, origin: { y: 0.3 } });

    if (onAddCoins) onAddCoins(activeQuest.rewardCoins);
    if (onAddEnergy) onAddEnergy(activeQuest.rewardEnergy);
    if (onAddStars) onAddStars(activeQuest.rewardStars);

    const nextChapter = currentChapter + 1;
    setCurrentChapter(nextChapter);
    try {
      localStorage.setItem('zorro_story_chapter', nextChapter.toString());
    } catch (e) {}

    if (onShowToast) {
      onShowToast(`🎉 Babak ${activeQuest.chapter} Selesai! +${activeQuest.rewardCoins} 🪙 +${activeQuest.rewardEnergy} ⚡ +${activeQuest.rewardStars} ⭐!`);
    }
  };

  if (isAllCompleted) {
    return (
      <div style={{
        width: '940px',
        background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)',
        border: '2.5px solid #D97706',
        borderRadius: '18px',
        padding: '6px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 12px rgba(217, 119, 6, 0.25)',
        zIndex: 15
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>👑</span>
          <span style={{ fontSize: '12px', fontWeight: '900', color: '#78350F' }}>
            Semua Babak Cerita Kafe Selesai! Kafe Kucing Zorro resmi menjadi Kafe Bintang Lima! ⭐
          </span>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '940px',
      background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
      border: '2.5px solid #8B5A2B',
      borderRadius: '18px',
      padding: '5px 14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.9)',
      zIndex: 15,
      position: 'relative'
    }}>
      {/* Left: Chapter Badge + Title & Description */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
        <div style={{
          background: 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)',
          color: '#FFF',
          padding: '3px 8px',
          borderRadius: '10px',
          fontSize: '10px',
          fontWeight: '900',
          letterSpacing: '0.4px',
          boxShadow: '0 2px 4px rgba(234, 88, 12, 0.3)',
          flexShrink: 0
        }}>
          BABAK {activeQuest.chapter}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{
            fontSize: '12px',
            fontWeight: '900',
            color: '#3B1E08',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {activeQuest.title}
          </div>
          <div style={{
            fontSize: '10.5px',
            fontWeight: '700',
            color: '#78350F',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {activeQuest.desc}
          </div>
        </div>
      </div>

      {/* Right: Progress bar & Claim / Go Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        {/* Progress pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: '#FFF',
          padding: '3px 10px',
          borderRadius: '12px',
          border: '1.5px solid #E5D5C5'
        }}>
          <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#6B3C18' }}>
            Progres:
          </span>
          <span style={{
            fontSize: '11.5px',
            fontWeight: '900',
            color: isReadyToClaim ? '#059669' : '#D97706'
          }}>
            {Math.min(activeQuest.target, progress)} / {activeQuest.target}
          </span>
        </div>

        {/* Claim / Action Button */}
        {isReadyToClaim ? (
          <button
            onClick={handleClaimQuest}
            className="mockup-action-btn"
            style={{
              background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
              border: '2px solid #047857',
              borderRadius: '14px',
              padding: '5px 14px',
              color: '#FFF',
              fontSize: '11.5px',
              fontWeight: '900',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 3px 8px rgba(5, 150, 105, 0.4)',
              animation: 'pulseReady 1.6s infinite'
            }}
          >
            <Sparkles size={13} />
            <span>Klaim Hadiah (+{activeQuest.rewardCoins} 🪙)!</span>
          </button>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '10.5px',
            fontWeight: '800',
            color: '#92400E'
          }}>
            <span>Hadiah:</span>
            <span style={{ fontWeight: '900', color: '#D97706' }}>+{activeQuest.rewardCoins} 🪙</span>
            <span style={{ fontWeight: '900', color: '#0284C7' }}>+{activeQuest.rewardEnergy} ⚡</span>
          </div>
        )}
      </div>
    </div>
  );
}
