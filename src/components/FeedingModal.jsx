import React, { useState } from 'react';
import { CAT_FRIENDSHIP, TREAT_ITEMS } from '../data/friendship';
import { CatSprite } from './CatSprite';
import { audio } from '../utils/audio';
import { X, Heart, Sparkles, Gift, Check, Utensils } from 'lucide-react';
import { safeConfetti as confetti } from '../utils/safeConfetti';

export function FeedingModal({
  coins,
  boardItems = [],
  friendshipData = {},
  equippedOutfits = {},
  onFeedCatWithBoardItem,
  onBuyAndFeedCat,
  onClaimFriendshipReward,
  onClose,
  onShowToast
}) {
  const [selectedCat, setSelectedCat] = useState('zorro');
  const [isEating, setIsEating] = useState(false);
  const [speech, setSpeech] = useState(null);

  const catProfile = CAT_FRIENDSHIP[selectedCat];
  const catState = friendshipData[selectedCat] || { xp: 0, level: 1, claimedLevels: [] };

  // Calculate level based on XP
  const levels = catProfile.levels;
  let currentLevelObj = levels[0];
  let nextLevelObj = levels[levels.length - 1];

  for (let i = 0; i < levels.length; i++) {
    if (catState.xp >= levels[i].xpNeeded) {
      currentLevelObj = levels[i];
      nextLevelObj = levels[i + 1] || levels[levels.length - 1];
    }
  }

  const isMaxLevel = currentLevelObj.level === levels[levels.length - 1].level;
  const currentLevelXp = currentLevelObj.xpNeeded;
  const nextLevelXp = nextLevelObj.xpNeeded;
  const progressPercent = isMaxLevel
    ? 100
    : Math.min(100, Math.round(((catState.xp - currentLevelXp) / Math.max(1, nextLevelXp - currentLevelXp)) * 100));

  const handleFeed = (treat, fromBoard = false) => {
    if (!fromBoard && coins < treat.coinCost) {
      if (onShowToast) onShowToast("Koin tidak cukup untuk membeli camilan ini! 🪙");
      return;
    }

    setIsEating(true);
    audio.playEat();

    const isFav = catProfile.favFoodIds.includes(treat.itemId);
    const xpGain = isFav ? Math.round(treat.xp * 1.5) : treat.xp;

    if (fromBoard) {
      onFeedCatWithBoardItem(selectedCat, treat.itemId, xpGain);
    } else {
      onBuyAndFeedCat(selectedCat, treat.coinCost, xpGain);
    }

    // Pick speech quote
    const quote = catProfile.quotes[Math.floor(Math.random() * catProfile.quotes.length)];
    setSpeech(quote);

    setTimeout(() => {
      setIsEating(false);
    }, 900);

    setTimeout(() => {
      setSpeech(null);
    }, 3200);

    if (onShowToast) {
      onShowToast(`+${xpGain} ❤️ Kasih Sayang untuk ${catProfile.name}!${isFav ? ' (Makanan Favorit!)' : ''}`);
    }
  };

  const handleClaim = (lvl) => {
    audio.playServe();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 }
    });
    onClaimFriendshipReward(selectedCat, lvl);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 230,
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
        className="cozy-card"
        style={{
          width: '960px',
          maxWidth: '96vw',
          height: '560px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          borderRadius: '26px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          animation: 'pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '12px 22px',
            background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
            borderBottom: '2px solid #FDA4AF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🥣</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#9F1239' }}>
                Beri Makan & Kasih Sayang Anabul
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#E11D48' }}>
                Traktir Zorro, Thor, & Loki dengan camilan favorit untuk meningkatkan ikatan persahabatan!
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FFFFFF',
              padding: '4px 12px',
              borderRadius: '999px',
              border: '1.5px solid #FDA4AF',
              fontWeight: '900',
              fontSize: '12px',
              color: '#D97706'
            }}>
              <span>🪙</span>
              <span>{coins} Koin</span>
            </div>

            <button
              onClick={() => {
                audio.playPop();
                onClose();
              }}
              className="cozy-btn"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1.5px solid #FDA4AF',
                color: '#9F1239',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Cat Selector Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '8px 22px',
            background: '#FFF8F6',
            borderBottom: '1.5px solid #FEE2E2'
          }}
        >
          {[
            { id: 'zorro', name: 'Zorro Sang Barista', icon: '🐾', bg: '#1E293B' },
            { id: 'thor', name: 'Thor Si Belang Lembut', icon: '🐱', bg: '#57534E' },
            { id: 'loki', name: 'Loki Si Kucing Oren Ceria', icon: '🦁', bg: '#EA580C' }
          ].map((cat) => {
            const isSelected = selectedCat === cat.id;
            const state = friendshipData[cat.id] || { level: 1 };
            return (
              <button
                key={cat.id}
                onClick={() => {
                  audio.playPop();
                  setSelectedCat(cat.id);
                  setSpeech(null);
                }}
                className="cozy-btn"
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  borderRadius: '14px',
                  background: isSelected ? cat.bg : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#64748B',
                  border: isSelected ? `2px solid ${cat.bg}` : '1.5px solid #E2E8F0',
                  fontSize: '12px',
                  fontWeight: '900',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name} (Lv.{state.level || 1})</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Body Landscape */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Left Column: Live Cat Eating Stage (340px) */}
          <div
            style={{
              width: '340px',
              background: 'linear-gradient(180deg, #FFF5F5 0%, #FFFFFF 100%)',
              borderRight: '1.5px solid #FFE4E6',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              position: 'relative'
            }}
          >
            <div
              style={{
                width: '180px',
                height: '160px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                animation: isEating ? 'purrShake 0.15s infinite' : 'none'
              }}
            >
              {/* Floor shadow */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                width: '130px',
                height: '24px',
                background: 'radial-gradient(ellipse at center, rgba(159, 18, 57, 0.22) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />

              <div style={{ transform: 'scale(1.25)' }}>
                <CatSprite
                  type={selectedCat}
                  accessoryId={equippedOutfits[selectedCat]}
                  size={85}
                />
              </div>

              {/* Flying Hearts while eating */}
              {isEating && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-10px',
                    fontSize: '28px',
                    animation: 'heartFloat 1s forwards ease-out'
                  }}
                >
                  ❤️✨
                </div>
              )}
            </div>

            {/* Speech Bubble */}
            {speech && (
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1.5px solid #FDA4AF',
                  borderRadius: '14px',
                  padding: '6px 14px',
                  fontSize: '11px',
                  fontWeight: '800',
                  color: '#881337',
                  margin: '8px 0',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(244, 63, 94, 0.15)'
                }}
              >
                {speech}
              </div>
            )}

            {/* Affection Progress Bar Card */}
            <div style={{
              width: '100%',
              background: '#FFF8F6',
              border: '1.5px solid #FDA4AF',
              borderRadius: '16px',
              padding: '12px 14px',
              marginTop: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '900', color: '#1E293B', marginBottom: '4px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Heart size={14} fill="#E11D48" color="#E11D48" />
                  <span>Lv.{currentLevelObj.level} {currentLevelObj.title}</span>
                </span>
                <span style={{ color: '#E11D48' }}>
                  {isMaxLevel ? 'Maksimal! ❤️' : `${catState.xp} / ${nextLevelXp} XP`}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#FFE4E6',
                borderRadius: '999px',
                overflow: 'hidden'
              }}>
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #F43F5E 0%, #E11D48 100%)',
                    borderRadius: '999px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Treats & Friendship Level Rewards (flex: 1) */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: '#FFFFFF'
            }}
          >
            {/* Treats Menu */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: '900', color: '#1E293B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Utensils size={15} color="#EA580C" />
                <span>Pilihan Camilan Lezat ({catProfile.name})</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
                {TREAT_ITEMS.map((treat) => {
                  const isFav = catProfile.favFoodIds.includes(treat.itemId);
                  const hasOnBoard = boardItems.some(i => i && i.id === treat.itemId && !i.isCobweb);

                  return (
                    <div
                      key={treat.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        borderRadius: '16px',
                        background: isFav ? '#FFF1F2' : '#F8FAFC',
                        border: isFav ? '1.5px solid #FDA4AF' : '1.5px solid #E2E8F0'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '26px' }}>{treat.icon}</span>
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: '900', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>{treat.name}</span>
                            {isFav && (
                              <span style={{ fontSize: '9px', fontWeight: '900', color: '#BE123C', background: '#FFE4E6', padding: '1px 5px', borderRadius: '6px' }}>
                                Favorit! ⭐
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '700' }}>
                            +{isFav ? Math.round(treat.xp * 1.5) : treat.xp} ❤️ Kasih Sayang
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        {hasOnBoard ? (
                          <button
                            onClick={() => handleFeed(treat, true)}
                            className="cozy-btn"
                            style={{
                              padding: '6px 10px',
                              background: '#10B981',
                              color: '#FFFFFF',
                              borderRadius: '10px',
                              fontSize: '11px',
                              fontWeight: '900',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            Pakai Papan
                          </button>
                        ) : (
                          <button
                            onClick={() => handleFeed(treat, false)}
                            className="cozy-btn"
                            style={{
                              padding: '6px 12px',
                              background: coins >= treat.coinCost ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#CBD5E1',
                              color: '#FFFFFF',
                              borderRadius: '10px',
                              fontSize: '11px',
                              fontWeight: '900',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            <span>{treat.coinCost} 🪙</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Level Rewards Track */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: '900', color: '#1E293B', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Gift size={15} color="#E11D48" />
                <span>Hadiah Tingkat Ikatan Sahabat</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '8px' }}>
                {levels.slice(1).map((lvl) => {
                  const isReached = catState.xp >= lvl.xpNeeded;
                  const isClaimed = (catState.claimedLevels || []).includes(lvl.level);

                  return (
                    <div
                      key={lvl.level}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: '14px',
                        background: isClaimed ? '#F1F5F9' : isReached ? '#FFFBEB' : '#F8FAFC',
                        border: isReached && !isClaimed ? '1.5px solid #F59E0B' : '1px solid #E2E8F0',
                        opacity: !isReached ? 0.7 : 1
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '12px', fontWeight: '900', color: '#1E293B' }}>
                          Lv.{lvl.level}: {lvl.title}
                        </div>
                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#D97706' }}>
                          Hadiah: {lvl.reward?.label}
                        </div>
                      </div>

                      <div>
                        {isClaimed ? (
                          <div style={{ fontSize: '10px', fontWeight: '900', color: '#059669', background: '#D1FAE5', padding: '3px 8px', borderRadius: '8px' }}>
                            Diklaim ✓
                          </div>
                        ) : isReached ? (
                          <button
                            onClick={() => handleClaim(lvl)}
                            className="cozy-btn"
                            style={{
                              padding: '5px 10px',
                              background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                              color: '#FFFFFF',
                              borderRadius: '10px',
                              fontSize: '11px',
                              fontWeight: '900',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            Klaim 🎁
                          </button>
                        ) : (
                          <button
                            onClick={() => handleClaim(lvl)}
                            className="cozy-btn"
                            style={{
                              padding: '5px 9px',
                              background: 'linear-gradient(135deg, #FDE047 0%, #EAB308 100%)',
                              color: '#713F12',
                              borderRadius: '10px',
                              fontSize: '10.5px',
                              fontWeight: '900',
                              border: 'none',
                              cursor: 'pointer'
                            }}
                            title="Klaim hadiah ikatan persahabatan anabul"
                          >
                            ⚡ Klaim 🎁
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
