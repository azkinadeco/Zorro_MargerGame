import React, { useState } from 'react';
import { WARDROBE_ITEMS } from '../data/wardrobe';
import { CatSprite } from './CatSprite';
import { audio } from '../utils/audio';
import { X, Sparkles, Check, Lock, ShoppingBag } from 'lucide-react';

export function WardrobeModal({
  coins,
  equippedOutfits,
  unlockedOutfits,
  onEquipOutfit,
  onBuyOutfit,
  onClose,
  onShowToast
}) {
  const [selectedCat, setSelectedCat] = useState('zorro'); // 'zorro' | 'thor' | 'loki'
  const [previewOutfit, setPreviewOutfit] = useState(equippedOutfits[selectedCat] || `${selectedCat}_default`);

  // Switch cat tab
  const handleSelectCat = (cat) => {
    audio.playPop();
    setSelectedCat(cat);
    setPreviewOutfit(equippedOutfits[cat] || `${cat}_default`);
  };

  const catItems = WARDROBE_ITEMS[selectedCat] || [];
  const activeEquipped = equippedOutfits[selectedCat];

  const handleEquip = (itemId) => {
    audio.playPop();
    onEquipOutfit(selectedCat, itemId);
    setPreviewOutfit(itemId);
    if (onShowToast) onShowToast("Kostum berhasil dipakai! Lucu sekali 🎀");
  };

  const handleBuy = (item) => {
    if (coins < item.cost) {
      if (onShowToast) onShowToast("Koin tidak cukup! Selesaikan pesanan pelanggan dulu 🪙");
      return;
    }
    audio.playServe();
    onBuyOutfit(selectedCat, item.id, item.cost);
    setPreviewOutfit(item.id);
    if (onShowToast) onShowToast(`Berhasil membeli ${item.name}! ✨`);
  };

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
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="cozy-card"
        style={{
          width: '940px',
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
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
            borderBottom: '2px solid #FDA4AF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🎀</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#9F1239' }}>
                Salon Kostum Kucing
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#E11D48' }}>
                Dandani Zorro, Thor, & Loki dengan aksesoris imut!
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFF',
              padding: '5px 12px',
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

        {/* Cat Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '8px 20px',
            background: '#FFF8F6',
            borderBottom: '1.5px solid #FEE2E2'
          }}
        >
          {[
            { id: 'zorro', name: 'Zorro Sang Barista', icon: '🐾', color: '#0F172A', bgActive: '#1E293B', textActive: '#FFFFFF' },
            { id: 'thor', name: 'Thor Si Kucing Belang', icon: '🐱', color: '#78716C', bgActive: '#57534E', textActive: '#FFFFFF' },
            { id: 'loki', name: 'Loki Si Kucing Oren', icon: '🦁', color: '#EA580C', bgActive: '#EA580C', textActive: '#FFFFFF' }
          ].map((cat) => {
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCat(cat.id)}
                className="cozy-btn"
                style={{
                  flex: 1,
                  padding: '7px 8px',
                  borderRadius: '14px',
                  background: isSelected ? cat.bgActive : '#FFFFFF',
                  color: isSelected ? cat.textActive : '#64748B',
                  border: isSelected ? `2px solid ${cat.color}` : '1.5px solid #E2E8F0',
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
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Body Landscape */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left Column: Fitting Room Preview (320px) */}
          <div
            style={{
              width: '320px',
              background: 'linear-gradient(180deg, #FFF5F5 0%, #FFF9F9 100%)',
              borderRight: '1.5px solid #FFE4E6',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'relative',
              width: '180px',
              height: '180px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px'
            }}>
              {/* Ground contact shadow */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                width: '140px',
                height: '30px',
                background: 'radial-gradient(ellipse at center, rgba(159, 18, 57, 0.22) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />

              {/* Cat sprite / accessory preview */}
              <div style={{
                transform: 'scale(1.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CatSprite
                  type={selectedCat}
                  accessoryId={previewOutfit}
                  size={100}
                />
              </div>
            </div>

            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #FDA4AF',
              borderRadius: '16px',
              padding: '12px 16px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(244, 63, 94, 0.08)'
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: '800',
                color: '#E11D48',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Fitting Room
              </div>
              <div style={{
                fontSize: '14px',
                fontWeight: '900',
                color: '#1E293B',
                marginTop: '2px'
              }}>
                {catItems.find(i => i.id === previewOutfit)?.name || 'Bulu Alami'}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#64748B',
                fontWeight: '600',
                marginTop: '4px',
                lineHeight: '1.4'
              }}>
                {catItems.find(i => i.id === previewOutfit)?.desc}
              </div>
            </div>
          </div>

          {/* Right Column: Wardrobe Items Grid */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '12px',
              alignContent: 'start'
            }}
          >
            {catItems.map((item) => {
              const isUnlocked = unlockedOutfits.includes(item.id) || item.cost === 0;
              const isEquipped = activeEquipped === item.id || (!activeEquipped && item.id.endsWith('_default'));
              const isPreviewing = previewOutfit === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    audio.playPop();
                    setPreviewOutfit(item.id);
                  }}
                  className="cozy-btn"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '16px',
                    background: isPreviewing ? '#FFF1F2' : '#F8FAFC',
                    border: isEquipped
                      ? '2px solid #10B981'
                      : isPreviewing
                      ? '2px solid #FDA4AF'
                      : '1.5px solid #E2E8F0',
                    boxShadow: isPreviewing ? '0 4px 14px rgba(244,63,94,0.12)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '14px',
                        background: '#FFFFFF',
                        border: '1.5px solid #F1F5F9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px'
                      }}
                    >
                      {item.icon}
                    </div>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '13px', fontWeight: '900', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {item.name}
                        {isEquipped && (
                          <span style={{
                            fontSize: '9px',
                            fontWeight: '900',
                            color: '#065F46',
                            background: '#D1FAE5',
                            padding: '1px 6px',
                            borderRadius: '999px'
                          }}>
                            Dipakai
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '700', maxWidth: '140px' }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  {/* Action button: Equip / Buy */}
                  <div>
                    {isEquipped ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '6px 12px',
                        borderRadius: '12px',
                        background: '#D1FAE5',
                        color: '#065F46',
                        fontSize: '11px',
                        fontWeight: '900'
                      }}>
                        <Check size={14} />
                        <span>Aktif</span>
                      </div>
                    ) : isUnlocked ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEquip(item.id);
                        }}
                        className="cozy-btn"
                        style={{
                          padding: '6px 14px',
                          borderRadius: '12px',
                          background: '#10B981',
                          color: '#FFFFFF',
                          border: 'none',
                          fontSize: '11px',
                          fontWeight: '900',
                          cursor: 'pointer'
                        }}
                      >
                        Pakai
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuy(item);
                        }}
                        className="cozy-btn"
                        style={{
                          padding: '6px 12px',
                          borderRadius: '12px',
                          background: coins >= item.cost ? 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' : '#CBD5E1',
                          color: '#FFFFFF',
                          border: 'none',
                          fontSize: '11px',
                          fontWeight: '900',
                          gap: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <ShoppingBag size={12} />
                        <span>{item.cost} 🪙</span>
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
  );
}
