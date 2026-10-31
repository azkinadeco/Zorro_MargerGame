import React from 'react';
import { CAFE_TIERS, GUESTBOOK_REVIEWS } from '../data/guestbook';
import { audio } from '../utils/audio';
import { X, Star, Sparkles, Check, Gift, Heart, Coffee } from 'lucide-react';

export function GuestbookModal({
  totalOrdersServed,
  claimedTiers = [],
  onClaimTier,
  onClose
}) {
  // Find current cafe tier
  let currentTier = CAFE_TIERS[0];
  for (let i = CAFE_TIERS.length - 1; i >= 0; i--) {
    if (totalOrdersServed >= CAFE_TIERS[i].requiredOrders) {
      currentTier = CAFE_TIERS[i];
      break;
    }
  }

  const nextTier = CAFE_TIERS.find(t => t.requiredOrders > totalOrdersServed) || CAFE_TIERS[CAFE_TIERS.length - 1];
  const progressPercent = Math.min(100, Math.round((totalOrdersServed / nextTier.requiredOrders) * 100));

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
            background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
            borderBottom: '2px solid #FDE68A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>📖</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#92400E' }}>
                Buku Tamu & Ulasan Kafe Zorro
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#B45309' }}>
                Tingkat reputasi kafe & testimoni jujur dari pelanggan setia Nina & Zorro!
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: '#FFFFFF',
              border: '1.5px solid #FDE047',
              padding: '4px 12px',
              borderRadius: '999px',
              boxShadow: '0 2px 6px rgba(234, 179, 8, 0.2)'
            }}>
              <Star size={14} fill="#EAB308" color="#EAB308" />
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#854D0E' }}>5.0 Bintang</span>
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
                border: '1.5px solid #FCD34D',
                color: '#92400E',
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

        {/* 2-Column Body Landscape */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Left Column: Reputation Card & Tier Milestones (440px) */}
          <div style={{
            width: '440px',
            background: 'linear-gradient(180deg, #FEFCE8 0%, #FFFDF5 100%)',
            borderRight: '1.5px solid #FEF08A',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Reputation Header Card */}
            <div style={{
              padding: '14px 18px',
              borderBottom: '1.5px solid #FEF08A',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '26px' }}>{currentTier.badge}</span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '900', color: '#713F12' }}>
                      {currentTier.title}
                    </div>
                    <div style={{ fontSize: '11px', color: '#854D0E', fontWeight: '700' }}>
                      {currentTier.subtitle}
                    </div>
                  </div>
                </div>

                <div style={{
                  fontSize: '11px',
                  fontWeight: '900',
                  color: '#92400E',
                  backgroundColor: '#FEF3C7',
                  padding: '3px 10px',
                  borderRadius: '10px'
                }}>
                  {totalOrdersServed} Pesanan
                </div>
              </div>

              {/* Progress bar to next level */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', fontWeight: '800', color: '#854D0E', marginBottom: '3px' }}>
                  <span>Kemajuan Reputasi</span>
                  <span>Berikutnya: {nextTier.title} ({totalOrdersServed}/{nextTier.requiredOrders})</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#FEF08A',
                  borderRadius: '999px',
                  overflow: 'hidden'
                }}>
                  <div
                    style={{
                      width: `${progressPercent}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #F59E0B 0%, #EAB308 100%)',
                      borderRadius: '999px',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Reputation Rewards Track List */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '12px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ fontSize: '12px', fontWeight: '900', color: '#713F12', marginBottom: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Gift size={14} color="#EA580C" />
                  <span>Hadiah Tingkat Reputasi</span>
                </div>
                {CAFE_TIERS.some(t => !claimedTiers.includes(t.level)) && (
                  <button
                    onClick={() => {
                      audio.playFanfare();
                      CAFE_TIERS.filter(t => !claimedTiers.includes(t.level))
                        .forEach(t => onClaimTier(t));
                    }}
                    className="cozy-btn"
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '3px 8px',
                      color: '#FFF',
                      fontSize: '10px',
                      fontWeight: '900',
                      cursor: 'pointer'
                    }}
                  >
                    ✨ Klaim Semua
                  </button>
                )}
              </div>

              {CAFE_TIERS.map((tier) => {
                const isReached = totalOrdersServed >= tier.requiredOrders;
                const isClaimed = claimedTiers.includes(tier.level);

                return (
                  <div
                    key={tier.level}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 12px',
                      borderRadius: '14px',
                      background: isClaimed ? '#F1F5F9' : isReached ? '#FFFFFF' : '#F8FAFC',
                      border: isReached && !isClaimed ? '2px solid #F59E0B' : '1.5px solid #E2E8F0',
                      opacity: !isReached ? 0.75 : 1,
                      boxShadow: isReached && !isClaimed ? '0 2px 8px rgba(245, 158, 11, 0.2)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '22px' }}>{tier.badge}</span>
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: '900', color: '#1E293B' }}>
                          Lv.{tier.level} {tier.title}
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '700' }}>
                          Hadiah: <strong style={{ color: '#D97706' }}>{tier.reward.label}</strong>
                        </div>
                      </div>
                    </div>

                    <div>
                      {isClaimed ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '10.5px', fontWeight: '900', color: '#059669', background: '#D1FAE5', padding: '3px 8px', borderRadius: '8px' }}>
                          <Check size={12} />
                          <span>Klaim</span>
                        </div>
                      ) : isReached ? (
                        <button
                          onClick={() => onClaimTier(tier)}
                          className="cozy-btn"
                          style={{
                            padding: '5px 12px',
                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                            color: '#FFFFFF',
                            fontSize: '11px',
                            fontWeight: '900',
                            borderRadius: '10px',
                            boxShadow: '0 2px 6px rgba(245, 158, 11, 0.3)',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          Buka 🎁
                        </button>
                      ) : (
                        <button
                          onClick={() => onClaimTier(tier)}
                          className="cozy-btn"
                          style={{
                            padding: '4px 10px',
                            background: 'linear-gradient(135deg, #FDE047 0%, #EAB308 100%)',
                            color: '#713F12',
                            fontSize: '10.5px',
                            fontWeight: '900',
                            borderRadius: '10px',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                          title="Buka hadiah reputasi kafe ini seketika"
                        >
                          ⚡ Buka 🎁
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Customer Reviews (flex: 1) */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FFFFFF'
          }}>
            <div style={{
              padding: '12px 20px',
              backgroundColor: '#FFF1F2',
              borderBottom: '1px solid #FFE4E6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#9F1239', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Heart size={14} color="#E11D48" />
                <span>Ulasan Hangat Pengunjung Kafe</span>
              </span>
              <span style={{ fontSize: '10.5px', color: '#E11D48', fontWeight: '700' }}>
                {GUESTBOOK_REVIEWS.length} Ulasan Terverifikasi
              </span>
            </div>

            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '14px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {GUESTBOOK_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '16px',
                    background: '#FFFFFF',
                    border: '1.5px solid #FEE2E2',
                    boxShadow: '0 2px 6px rgba(244, 63, 94, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '22px' }}>{rev.avatar}</span>
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: '900', color: '#1E293B' }}>
                          {rev.author}
                        </div>
                        <div style={{ fontSize: '9.5px', fontWeight: '700', color: '#94A3B8' }}>
                          {rev.role} • {rev.date}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2px' }}>
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={12} fill="#EAB308" color="#EAB308" />
                      ))}
                    </div>
                  </div>

                  <p style={{
                    margin: 0,
                    fontSize: '11.5px',
                    lineHeight: '1.45',
                    color: '#475569',
                    fontStyle: 'italic',
                    paddingLeft: '30px'
                  }}>
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
