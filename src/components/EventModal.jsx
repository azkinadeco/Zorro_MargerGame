import React from 'react';
import { BIRTHDAY_EVENT } from '../data/events';
import { audio } from '../utils/audio';
import { X, Gift, Check, Sparkles, Clock, PartyPopper } from 'lucide-react';
import { safeConfetti as confetti } from '../utils/safeConfetti';

export function EventModal({
  eventPoints = 0,
  claimedTiers = [],
  onClaimTier,
  onClose
}) {
  const tiers = BIRTHDAY_EVENT.tiers;
  const maxPoints = tiers[tiers.length - 1].requiredPoints;
  const progressPercent = Math.min(100, Math.round((eventPoints / maxPoints) * 100));

  const handleClaim = (tier) => {
    audio.playServe();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 }
    });
    onClaimTier(tier);
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
          width: '920px',
          maxWidth: '96vw',
          height: '520px',
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
            background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FEF3C7 100%)',
            borderBottom: '2px solid #FDA4AF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '26px' }}>🎂</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#9F1239' }}>
                {BIRTHDAY_EVENT.title}
              </div>
              <div style={{ fontSize: '11px', fontWeight: '800', color: '#B45309', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} />
                <span>Event Spesial Terbatas: {BIRTHDAY_EVENT.endDate}</span>
              </div>
            </div>
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

        {/* 2-Column Body Landscape */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Left Column: Event Progress & Info (340px) */}
          <div style={{
            width: '340px',
            background: 'linear-gradient(180deg, #FFF5F5 0%, #FFFDF5 100%)',
            borderRight: '1.5px solid #FDA4AF',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '900', color: '#881337' }}>
                  {BIRTHDAY_EVENT.subtitle}
                </div>
                <div style={{ fontSize: '11px', color: '#9F1239', marginTop: '4px', lineHeight: '1.4' }}>
                  Bantu Nina mempersiapkan pesta ulang tahun kejutan termegah untuk Zorro si kucing hitam tuxedo!
                </div>
              </div>

              {/* Points Progress */}
              <div style={{
                background: '#FFFFFF',
                padding: '12px 14px',
                borderRadius: '18px',
                border: '1.5px solid #FBCFE8',
                boxShadow: '0 4px 12px rgba(244, 63, 94, 0.08)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '900', color: '#9F1239', marginBottom: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>🎀</span>
                    <span>Pita Pesta:</span>
                  </span>
                  <span>{eventPoints} / {maxPoints} 🎀</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '10px',
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

            {/* Info Helper Box */}
            <div style={{
              padding: '12px',
              background: '#FFF8F6',
              borderRadius: '16px',
              border: '1.5px solid #FED7AA',
              fontSize: '11px',
              fontWeight: '800',
              color: '#9A3412',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <span style={{ fontWeight: '900', color: '#C2410C' }}>💡 Cara Mengumpulkan Pita:</span>
              <span>• Sajikan Pesanan Menu (+20 🎀)</span>
              <span>• Rawat & Grooming Kucing (+5 🎀)</span>
              <span>• Bermain dengan Kucing (+10 🎀)</span>
            </div>
          </div>

          {/* Right Column: Tiers List (flex: 1) */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FFFFFF'
          }}>
            <div style={{
              padding: '12px 20px',
              backgroundColor: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <PartyPopper size={16} color="#E11D48" />
                <span>Tier Hadiah Event Ulang Tahun</span>
              </span>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>
                {tiers.length} Hadiah Spesial
              </span>
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '14px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >
              {tiers.map((tier) => {
                const isReached = eventPoints >= tier.requiredPoints;
                const isClaimed = claimedTiers.includes(tier.tier);

                return (
                  <div
                    key={tier.tier}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '16px',
                      background: isClaimed ? '#F1F5F9' : isReached ? '#FFFBEB' : '#F8FAFC',
                      border: isReached && !isClaimed ? '2px solid #F59E0B' : '1.5px solid #E2E8F0',
                      boxShadow: isReached && !isClaimed ? '0 4px 12px rgba(245, 158, 11, 0.2)' : 'none',
                      opacity: !isReached ? 0.75 : 1
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '14px',
                          background: '#FFFFFF',
                          border: '1.5px solid #FBCFE8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '24px'
                        }}
                      >
                        {tier.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '900', color: '#1E293B' }}>
                          Tier {tier.tier}: {tier.name}
                        </div>
                        <div style={{ fontSize: '11px', color: '#D97706', fontWeight: '800' }}>
                          Hadiah: {tier.reward.label}
                        </div>
                        <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '700' }}>
                          Target: {tier.requiredPoints} 🎀 Pita Pesta
                        </div>
                      </div>
                    </div>

                    <div>
                      {isClaimed ? (
                        <div style={{ fontSize: '11px', fontWeight: '900', color: '#059669', background: '#D1FAE5', padding: '4px 10px', borderRadius: '8px' }}>
                          Selesai ✓
                        </div>
                      ) : isReached ? (
                        <button
                          onClick={() => handleClaim(tier)}
                          className="cozy-btn"
                          style={{
                            padding: '6px 14px',
                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                            color: '#FFFFFF',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '900',
                            border: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.35)'
                          }}
                        >
                          Buka 🎁
                        </button>
                      ) : (
                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#94A3B8' }}>
                          {eventPoints}/{tier.requiredPoints}
                        </div>
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
  );
}
