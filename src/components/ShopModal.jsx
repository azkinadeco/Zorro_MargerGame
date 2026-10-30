import React, { useState } from 'react';
import { audio } from '../utils/audio';
import { safeConfetti as confetti } from '../utils/safeConfetti';
import { X, Sparkles, Zap, Gift, ShoppingBag, Check } from 'lucide-react';

export function ShopModal({
  isOpen,
  onClose,
  coins = 14350,
  gems = 210,
  onAddCoins,
  onAddGems,
  onAddEnergy,
  onSpendCoins,
  onSpendGems,
  onSpawnItemOnBoard,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState('deals'); // 'deals' | 'boosters' | 'gems' | 'coins'

  if (!isOpen) return null;

  const handleBuyBooster = (boosterId, priceCoins, priceGems, name) => {
    if (priceCoins && coins < priceCoins) {
      audio.playPop();
      if (onShowToast) onShowToast("Koin tidak cukup untuk membeli booster ini! 🪙");
      return;
    }
    if (priceGems && gems < priceGems) {
      audio.playPop();
      if (onShowToast) onShowToast("Permata tidak cukup untuk membeli booster ini! 💎");
      return;
    }

    if (onSpawnItemOnBoard) {
      const ok = onSpawnItemOnBoard(boosterId);
      if (!ok) return; // board was full
    }

    if (priceCoins && onSpendCoins) onSpendCoins(priceCoins);
    if (priceGems && onSpendGems) onSpendGems(priceGems);

    audio.playFanfare();
    confetti({ particleCount: 45, spread: 70, origin: { y: 0.6 } });
    if (onShowToast) onShowToast(`Sukses membeli ${name}! Item dikirim ke Papan Merge ✨`);
  };

  const handleBuyDeal = (type) => {
    if (type === 'energy') {
      if (coins < 100) {
        audio.playPop();
        if (onShowToast) onShowToast("Koin tidak cukup! 🪙");
        return;
      }
      if (onSpendCoins) onSpendCoins(100);
      if (onAddEnergy) onAddEnergy(50);
      audio.playFanfare();
      if (onShowToast) onShowToast("Energi bertambah +50 ⚡!");
    } else if (type === 'treat') {
      if (gems < 450) {
        audio.playPop();
        if (onShowToast) onShowToast("Permata tidak cukup! 💎");
        return;
      }
      if (onSpendGems) onSpendGems(450);
      if (onAddCoins) onAddCoins(5000);
      if (onAddEnergy) onAddEnergy(100);
      audio.playFanfare();
      confetti({ particleCount: 50, spread: 75, origin: { y: 0.6 } });
      if (onShowToast) onShowToast("Paket Treat Mewah Terbuka! +5000 🪙 +100 ⚡");
    } else if (type === 'starter') {
      if (coins < 500) {
        audio.playPop();
        if (onShowToast) onShowToast("Koin tidak cukup! 🪙");
        return;
      }
      if (onSpendCoins) onSpendCoins(500);
      if (onAddGems) onAddGems(50);
      if (onAddEnergy) onAddEnergy(30);
      audio.playFanfare();
      confetti({ particleCount: 40, spread: 65, origin: { y: 0.6 } });
      if (onShowToast) onShowToast("Starter Bundle Terbuka! +50 💎 +30 ⚡");
    }
  };

  const handleClaimFreeGems = () => {
    audio.playFanfare();
    confetti({ particleCount: 35, spread: 65, origin: { y: 0.6 } });
    if (onAddGems) onAddGems(50);
    if (onShowToast) onShowToast("Bonus Harian: +50 Permata Gratis! 💎");
  };

  const handleBuyGemsWithCoins = (costCoins, gemAmount, name) => {
    if (coins < costCoins) {
      audio.playPop();
      if (onShowToast) onShowToast("Koin tidak cukup! Selesaikan pesanan pelanggan dulu 🪙");
      return;
    }
    if (onSpendCoins) onSpendCoins(costCoins);
    if (onAddGems) onAddGems(gemAmount);
    audio.playFanfare();
    confetti({ particleCount: 45, spread: 70, origin: { y: 0.6 } });
    if (onShowToast) onShowToast(`Berhasil membeli ${name}! +${gemAmount} 💎`);
  };

  const handleBuyCoinsWithGems = (costGems, coinAmount, name) => {
    if (gems < costGems) {
      audio.playPop();
      if (onShowToast) onShowToast("Permata tidak cukup! Kumpulkan dari misi & roda 💎");
      return;
    }
    if (onSpendGems) onSpendGems(costGems);
    if (onAddCoins) onAddCoins(coinAmount);
    audio.playFanfare();
    confetti({ particleCount: 45, spread: 70, origin: { y: 0.6 } });
    if (onShowToast) onShowToast(`Berhasil menukar ${name}! +${coinAmount.toLocaleString()} 🪙`);
  };

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
      <div style={{
        width: '940px',
        maxWidth: '96vw',
        maxHeight: '90vh',
        background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
        border: '4px solid #8B5A2B',
        borderRadius: '28px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.9)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        {/* Header Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 18px 8px 18px',
          borderBottom: '2.5px solid #E5C39E',
          background: '#FFF9F0'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                audio.playPop();
                setActiveTab('deals');
              }}
              style={{
                background: activeTab === 'deals' ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)' : '#FFF',
                color: activeTab === 'deals' ? '#FFF' : '#78350F',
                border: activeTab === 'deals' ? '2px solid #9A3412' : '1.5px solid #FED7AA',
                borderRadius: '14px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              🎁 DAILY DEALS
            </button>

            <button
              onClick={() => {
                audio.playPop();
                setActiveTab('boosters');
              }}
              style={{
                background: activeTab === 'boosters' ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)' : '#FFF',
                color: activeTab === 'boosters' ? '#FFF' : '#78350F',
                border: activeTab === 'boosters' ? '2px solid #9A3412' : '1.5px solid #FED7AA',
                borderRadius: '14px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              ⚡ BOOSTERS
            </button>

            <button
              onClick={() => {
                audio.playPop();
                setActiveTab('gems');
              }}
              style={{
                background: activeTab === 'gems' ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)' : '#FFF',
                color: activeTab === 'gems' ? '#FFF' : '#78350F',
                border: activeTab === 'gems' ? '2px solid #9A3412' : '1.5px solid #FED7AA',
                borderRadius: '14px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              💎 GEMS
            </button>

            <button
              onClick={() => {
                audio.playPop();
                setActiveTab('coins');
              }}
              style={{
                background: activeTab === 'coins' ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)' : '#FFF',
                color: activeTab === 'coins' ? '#FFF' : '#78350F',
                border: activeTab === 'coins' ? '2px solid #9A3412' : '1.5px solid #FED7AA',
                borderRadius: '14px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: '900',
                cursor: 'pointer'
              }}
            >
              🪙 COINS
            </button>
          </div>

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

        {/* Tab 1: DAILY DEALS */}
        {activeTab === 'deals' && (
          <div style={{
            padding: '18px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px'
          }}>
            {/* Deal 1: Energy Pack */}
            <div style={{
              background: '#FFF9F0',
              border: '2.5px solid #E5C39E',
              borderRadius: '20px',
              padding: '14px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
            }}>
              <span style={{ fontSize: '11px', fontWeight: '900', color: '#EA580C' }}>
                ENERGY PACK
              </span>
              <span style={{ fontSize: '38px' }}>⚡</span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#5C3818' }}>
                +50 Energi Penuh
              </span>

              <button
                onClick={() => handleBuyDeal('energy')}
                className="mockup-action-btn"
                style={{
                  width: '100%',
                  background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
                  border: '2px solid #047857',
                  borderRadius: '14px',
                  padding: '7px',
                  color: '#FFF',
                  fontSize: '13px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  marginTop: 'auto'
                }}
              >
                <span>🪙</span>
                <span>100</span>
              </button>
            </div>

            {/* Deal 2: 30% Off Treat Basket */}
            <div style={{
              background: '#FFF9F0',
              border: '2.5px solid #F43F5E',
              borderRadius: '20px',
              padding: '14px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              position: 'relative',
              boxShadow: '0 4px 10px rgba(244, 63, 94, 0.15)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                background: '#E11D48',
                color: '#FFF',
                fontSize: '10px',
                fontWeight: '900',
                padding: '2px 8px',
                borderRadius: '8px'
              }}>
                30% OFF
              </div>

              <span style={{ fontSize: '11px', fontWeight: '900', color: '#E11D48' }}>
                TREAT BASKET
              </span>
              <span style={{ fontSize: '38px' }}>🧁</span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#5C3818' }}>
                +5000 🪙 +100 ⚡
              </span>

              <button
                onClick={() => handleBuyDeal('treat')}
                className="mockup-action-btn"
                style={{
                  width: '100%',
                  background: 'linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)',
                  border: '2px solid #6B21A8',
                  borderRadius: '14px',
                  padding: '7px',
                  color: '#FFF',
                  fontSize: '13px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  marginTop: 'auto'
                }}
              >
                <span>💎</span>
                <span>450</span>
              </button>
            </div>

            {/* Deal 3: Starter Cafe Bundle */}
            <div style={{
              background: '#FFF9F0',
              border: '2.5px solid #F59E0B',
              borderRadius: '20px',
              padding: '14px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              position: 'relative',
              boxShadow: '0 4px 10px rgba(245, 158, 11, 0.15)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-10px',
                background: '#D97706',
                color: '#FFF',
                fontSize: '10px',
                fontWeight: '900',
                padding: '2px 8px',
                borderRadius: '8px'
              }}>
                HOT DEAL
              </div>

              <span style={{ fontSize: '11px', fontWeight: '900', color: '#B45309' }}>
                STARTER BUNDLE
              </span>
              <span style={{ fontSize: '38px' }}>🎁</span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#5C3818' }}>
                +50 💎 +30 ⚡
              </span>

              <button
                onClick={() => handleBuyDeal('starter')}
                className="mockup-action-btn"
                style={{
                  width: '100%',
                  background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                  border: '2px solid #B45309',
                  borderRadius: '14px',
                  padding: '7px',
                  color: '#FFF',
                  fontSize: '13px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  marginTop: 'auto'
                }}
              >
                <span>🪙</span>
                <span>500</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: GEMS PACKS (Landscape 2x2 Grid) */}
        {activeTab === 'gems' && (
          <div style={{
            padding: '16px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '12px',
            overflowY: 'auto'
          }}>
            {/* Free Daily */}
            <div style={{
              background: '#FFF9F0',
              border: '2px solid #34D399',
              borderRadius: '16px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>🎁</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                    50 Permata Harian Gratis
                  </div>
                  <div style={{ fontSize: '11px', color: '#059669', fontWeight: '700' }}>
                    Klaim cuma-cuma setiap hari!
                  </div>
                </div>
              </div>

              <button
                onClick={handleClaimFreeGems}
                className="mockup-action-btn"
                style={{
                  background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
                  border: '1.5px solid #047857',
                  borderRadius: '12px',
                  padding: '6px 14px',
                  color: '#FFF',
                  fontSize: '12px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                Klaim Gratis
              </button>
            </div>

            {/* Gem Pack 1 */}
            <div style={{
              background: '#FFF9F0',
              border: '1.5px solid #E5C39E',
              borderRadius: '16px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>💎</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                    Kantong Permata (+100 💎)
                  </div>
                  <div style={{ fontSize: '11px', color: '#78350F' }}>
                    Persediaan belanja aksesoris kucing
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBuyGemsWithCoins(1000, 100, "Kantong Permata")}
                className="mockup-action-btn"
                style={{
                  background: 'linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)',
                  border: '1.5px solid #0369A1',
                  borderRadius: '12px',
                  padding: '6px 14px',
                  color: '#FFF',
                  fontSize: '12px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                🪙 1,000
              </button>
            </div>

            {/* Gem Pack 2 */}
            <div style={{
              background: '#FFF9F0',
              border: '1.5px solid #E5C39E',
              borderRadius: '16px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>💍</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                    Peti Permata Mewah (+300 💎)
                  </div>
                  <div style={{ fontSize: '11px', color: '#78350F' }}>
                    Paling populer di kalangan pecinta anabul
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBuyGemsWithCoins(2500, 300, "Peti Permata Mewah")}
                className="mockup-action-btn"
                style={{
                  background: 'linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)',
                  border: '1.5px solid #6B21A8',
                  borderRadius: '12px',
                  padding: '6px 14px',
                  color: '#FFF',
                  fontSize: '12px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                🪙 2,500
              </button>
            </div>

            {/* Gem Pack 3 */}
            <div style={{
              background: '#FFF9F0',
              border: '2px solid #F59E0B',
              borderRadius: '16px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>👑</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                    Brankas Permata Kerajaan (+1,000 💎)
                  </div>
                  <div style={{ fontSize: '11px', color: '#D97706', fontWeight: '800' }}>
                    Koleksi permata tak terbatas!
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBuyGemsWithCoins(7500, 1000, "Brankas Permata Kerajaan")}
                className="mockup-action-btn"
                style={{
                  background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                  border: '1.5px solid #B45309',
                  borderRadius: '12px',
                  padding: '6px 14px',
                  color: '#FFF',
                  fontSize: '12px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                🪙 7,500
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: COINS PACKS (Landscape 3-Column Grid) */}
        {activeTab === 'coins' && (
          <div style={{
            padding: '16px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            overflowY: 'auto'
          }}>
            {/* Coin Pack 1 */}
            <div style={{
              background: '#FFF9F0',
              border: '1.5px solid #E5C39E',
              borderRadius: '16px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>🪙</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                    1,000 Koin Kafe Instan
                  </div>
                  <div style={{ fontSize: '11px', color: '#78350F' }}>
                    Untuk kebutuhan dekorasi kafe cepat
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBuyCoinsWithGems(20, 1000, "1,000 Koin")}
                className="mockup-action-btn"
                style={{
                  background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
                  border: '1.5px solid #047857',
                  borderRadius: '12px',
                  padding: '6px 14px',
                  color: '#FFF',
                  fontSize: '12px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                💎 20
              </button>
            </div>

            {/* Coin Pack 2 */}
            <div style={{
              background: '#FFF9F0',
              border: '1.5px solid #E5C39E',
              borderRadius: '16px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>💰</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                    Karung Koin (+5,000 🪙)
                  </div>
                  <div style={{ fontSize: '11px', color: '#059669', fontWeight: '800' }}>
                    Bonus +25% Koin Ekstra!
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBuyCoinsWithGems(80, 5000, "Karung Koin")}
                className="mockup-action-btn"
                style={{
                  background: 'linear-gradient(180deg, #FDBA74 0%, #EA580C 100%)',
                  border: '1.5px solid #9A3412',
                  borderRadius: '12px',
                  padding: '6px 14px',
                  color: '#FFF',
                  fontSize: '12px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                💎 80
              </button>
            </div>

            {/* Coin Pack 3 */}
            <div style={{
              background: '#FFF9F0',
              border: '2px solid #F59E0B',
              borderRadius: '16px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '28px' }}>🏆</span>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                    Peti Emas Kerajaan (+15,000 🪙)
                  </div>
                  <div style={{ fontSize: '11px', color: '#D97706', fontWeight: '800' }}>
                    Bonus +50% Koin Paling Untung!
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBuyCoinsWithGems(200, 15000, "Peti Emas Kerajaan")}
                className="mockup-action-btn"
                style={{
                  background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                  border: '1.5px solid #B45309',
                  borderRadius: '12px',
                  padding: '6px 14px',
                  color: '#FFF',
                  fontSize: '12px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                💎 200
              </button>
            </div>
          </div>
        )}

        {/* Tab 4: SPECIAL BOOSTERS & POWER-UPS */}
        {activeTab === 'boosters' && (
          <div style={{
            padding: '16px 20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '14px',
            overflowY: 'auto'
          }}>
            {/* Booster 1: Magic Scissors */}
            <div style={{
              background: '#F0F9FF',
              border: '2px solid #BAE6FD',
              borderRadius: '18px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 10px rgba(186, 230, 253, 0.4)'
            }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#E0F2FE',
                  border: '2px solid #0284C7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0
                }}>
                  ✂️
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#0369A1' }}>
                    Gunting Pemisah Ajaib
                  </div>
                  <div style={{ fontSize: '11px', color: '#0284C7', fontWeight: '700', marginTop: '2px', lineHeight: '1.3' }}>
                    Tarik ke item (Lv.2-6) di papan untuk memotongnya jadi 2 item level sebelumnya!
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  onClick={() => handleBuyBooster('booster_scissors', 1200, null, 'Gunting Pemisah Ajaib')}
                  className="mockup-action-btn"
                  style={{
                    background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                    border: '1.5px solid #92400E',
                    borderRadius: '12px',
                    padding: '7px 16px',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer'
                  }}
                >
                  🪙 1,200
                </button>
              </div>
            </div>

            {/* Booster 2: Magic Wand Joker */}
            <div style={{
              background: '#FEFCE8',
              border: '2px solid #FEF08A',
              borderRadius: '18px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 10px rgba(254, 240, 138, 0.4)'
            }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#FEF9C3',
                  border: '2px solid #CA8A04',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0
                }}>
                  🪄
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#854D0E' }}>
                    Paw Bintang Ajaib (Joker)
                  </div>
                  <div style={{ fontSize: '11px', color: '#A16207', fontWeight: '700', marginTop: '2px', lineHeight: '1.3' }}>
                    Tarik ke item apa saja untuk langsung menaikkannya 1 tingkat ke atas secara instan!
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  onClick={() => handleBuyBooster('booster_joker', 2200, null, 'Paw Bintang Ajaib')}
                  className="mockup-action-btn"
                  style={{
                    background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                    border: '1.5px solid #92400E',
                    borderRadius: '12px',
                    padding: '7px 16px',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer'
                  }}
                >
                  🪙 2,200
                </button>
              </div>
            </div>

            {/* Booster 3: Catnip Hourglass */}
            <div style={{
              background: '#FDF2F8',
              border: '2px solid #FBCFE8',
              borderRadius: '18px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 10px rgba(251, 207, 232, 0.4)'
            }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#FCE7F3',
                  border: '2px solid #DB2777',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0
                }}>
                  ⏳
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#9D174D' }}>
                    Jam Pasir Catnip
                  </div>
                  <div style={{ fontSize: '11px', color: '#BE185D', fontWeight: '700', marginTop: '2px', lineHeight: '1.3' }}>
                    Ketuk item jam pasir di papan untuk langsung memperoleh semburan +35 Energi!
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  onClick={() => handleBuyBooster('booster_hourglass', null, 35, 'Jam Pasir Catnip')}
                  className="mockup-action-btn"
                  style={{
                    background: 'linear-gradient(180deg, #C084FC 0%, #9333EA 100%)',
                    border: '1.5px solid #6B21A8',
                    borderRadius: '12px',
                    padding: '7px 16px',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer'
                  }}
                >
                  💎 35
                </button>
              </div>
            </div>

            {/* Booster 4: Kotak Harta Karun Zorro */}
            <div style={{
              background: '#FFF7ED',
              border: '2px solid #FED7AA',
              borderRadius: '18px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 10px rgba(254, 215, 170, 0.4)'
            }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#FFEDD5',
                  border: '2px solid #EA580C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0
                }}>
                  🎁
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#9A3412' }}>
                    Kotak Harta Karun Zorro
                  </div>
                  <div style={{ fontSize: '11px', color: '#C2410C', fontWeight: '700', marginTop: '2px', lineHeight: '1.3' }}>
                    Peti kejutan super langka yang memunculkan item-item tinggi makanan & mainan kafe!
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  onClick={() => handleBuyBooster('spawner_chest', null, 50, 'Kotak Harta Karun Zorro')}
                  className="mockup-action-btn"
                  style={{
                    background: 'linear-gradient(180deg, #C084FC 0%, #9333EA 100%)',
                    border: '1.5px solid #6B21A8',
                    borderRadius: '12px',
                    padding: '7px 16px',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer'
                  }}
                >
                  💎 50
                </button>
              </div>
            </div>

            {/* Booster 5: Kotak Kejutan Anabul Kucing (Koin Sink) */}
            <div style={{
              background: '#ECFDF5',
              border: '2px solid #A7F3D0',
              borderRadius: '18px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 10px rgba(167, 243, 208, 0.4)'
            }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#D1FAE5',
                  border: '2px solid #059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0
                }}>
                  🐱
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#065F46' }}>
                    Kotak Anabul Kucing
                  </div>
                  <div style={{ fontSize: '11px', color: '#047857', fontWeight: '700', marginTop: '2px', lineHeight: '1.3' }}>
                    Munculkan langsung anak kucing tidur (Lv. 2) ke papan merge untuk percepat merge anabul!
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  onClick={() => handleBuyBooster('cats_2', 600, null, 'Anak Kucing Lv.2')}
                  className="mockup-action-btn"
                  style={{
                    background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                    border: '1.5px solid #064E3B',
                    borderRadius: '12px',
                    padding: '7px 16px',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer'
                  }}
                >
                  🪙 600
                </button>
              </div>
            </div>

            {/* Booster 6: Paket Suplai Makanan Kafe (Koin Sink) */}
            <div style={{
              background: '#FFFBEB',
              border: '2px solid #FDE68A',
              borderRadius: '18px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 10px rgba(253, 230, 138, 0.4)'
            }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: '#FEF3C7',
                  border: '2px solid #D97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0
                }}>
                  🥫
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#78350F' }}>
                    Suplai Makanan Kafe
                  </div>
                  <div style={{ fontSize: '11px', color: '#92400E', fontWeight: '700', marginTop: '2px', lineHeight: '1.3' }}>
                    Munculkan langsung mangkuk tuna segar (Lv. 2) untuk segera memenuhi pesanan pelanggan!
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
                <button
                  onClick={() => handleBuyBooster('food_2', 450, null, 'Mangkuk Tuna Lv.2')}
                  className="mockup-action-btn"
                  style={{
                    background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                    border: '1.5px solid #92400E',
                    borderRadius: '12px',
                    padding: '7px 16px',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer'
                  }}
                >
                  🪙 450
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
