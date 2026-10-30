import React, { useState } from 'react';
import { X, Check, Gift, Sparkles, Award } from 'lucide-react';
import { DAILY_QUESTS, CAT_PASS_TIERS } from '../data/quests';
import { audio } from '../utils/audio';
import { safeConfetti as confetti } from '../utils/safeConfetti';

export function CatPassModal({
  pawPoints,
  questProgress,
  claimedQuests,
  claimedTiers,
  onClaimQuest,
  onClaimTier,
  onClose
}) {
  const handleClaimQuest = (quest) => {
    audio.playServe();
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 }
    });
    onClaimQuest(quest);
  };

  const handleClaimTier = (tier) => {
    audio.playServe();
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.5 }
    });
    onClaimTier(tier);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(5px)',
      zIndex: 220,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div
        className="cozy-card"
        style={{
          width: '960px',
          maxWidth: '96vw',
          height: '560px',
          maxHeight: '92vh',
          backgroundColor: '#FFFDF9',
          borderRadius: '28px',
          overflow: 'hidden',
          border: '3.5px solid #FDA4AF',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '12px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #FFE4D6',
          background: 'linear-gradient(135deg, #FFF1F2 0%, #FFF7ED 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '26px' }}>🐾</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Zorro Cat Pass & Misi Harian
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>
                Kumpulkan Poin Paw 🐾 untuk membuka berbagai tier hadiah spesial kafe!
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FFFFFF',
              padding: '5px 14px',
              borderRadius: '999px',
              border: '2px solid #FDA4AF',
              boxShadow: '0 2px 6px rgba(253, 164, 175, 0.2)'
            }}>
              <span style={{ fontSize: '16px' }}>🐾</span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#9F1239' }}>Poin Paw:</span>
              <span style={{ fontSize: '14px', fontWeight: '900', color: '#E11D48' }}>{pawPoints}</span>
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
                backgroundColor: '#F1F5F9',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 2-Column Landscape Body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Left Column: Cat Pass Tiers Track (460px) */}
          <div style={{
            width: '460px',
            borderRight: '1.5px solid #FEE2E2',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FFFBF7'
          }}>
            <div style={{
              padding: '10px 16px',
              backgroundColor: '#FFF1F2',
              borderBottom: '1px solid #FFE4E6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#9F1239', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>👑</span> Jalur Cat Pass Season 1
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {CAT_PASS_TIERS.some(tier => pawPoints >= tier.requiredPawPoints && !claimedTiers.includes(tier.tier)) && (
                  <button
                    onClick={() => {
                      audio.playFanfare();
                      CAT_PASS_TIERS.filter(tier => pawPoints >= tier.requiredPawPoints && !claimedTiers.includes(tier.tier))
                        .forEach(tier => handleClaimTier(tier));
                    }}
                    className="cozy-btn"
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '2px 8px',
                      color: '#FFF',
                      fontSize: '10px',
                      fontWeight: '900',
                      cursor: 'pointer'
                    }}
                  >
                    ✨ Klaim Semua
                  </button>
                )}
                <span style={{ fontSize: '10px', fontWeight: '800', color: '#E11D48', backgroundColor: '#FFE4E6', padding: '2px 8px', borderRadius: '6px' }}>
                  Musim Semi 🌸
                </span>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {CAT_PASS_TIERS.map(tier => {
                const isUnlocked = pawPoints >= tier.requiredPawPoints;
                const isClaimed = claimedTiers.includes(tier.tier);

                return (
                  <div
                    key={tier.tier}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '16px',
                      backgroundColor: isClaimed ? '#F1F5F9' : isUnlocked ? '#FEF3C7' : '#FFFFFF',
                      border: isUnlocked && !isClaimed ? '2px solid #F59E0B' : '1.5px solid #E2E8F0',
                      opacity: isClaimed ? 0.6 : 1,
                      boxShadow: isUnlocked && !isClaimed ? '0 4px 10px rgba(245, 158, 11, 0.15)' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '12px',
                        backgroundColor: isUnlocked ? '#F59E0B' : '#E2E8F0',
                        color: isUnlocked ? '#FFFFFF' : '#64748B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: '900',
                        flexShrink: 0
                      }}>
                        T{tier.tier}
                      </div>
                      <div>
                        <div style={{ fontSize: '12.5px', fontWeight: '900', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>{tier.reward.label}</span>
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#64748B' }}>
                          Target: {tier.requiredPawPoints} Poin Paw 🐾
                        </div>
                      </div>
                    </div>

                    <div>
                      {isClaimed ? (
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', padding: '4px 10px', borderRadius: '8px', backgroundColor: '#E2E8F0' }}>
                          Klaim Selesai
                        </div>
                      ) : isUnlocked ? (
                        <button
                          onClick={() => handleClaimTier(tier)}
                          className="cozy-btn"
                          style={{
                            padding: '6px 14px',
                            fontSize: '11px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                            color: '#FFFFFF',
                            border: 'none',
                            fontWeight: '900',
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(217, 119, 6, 0.3)'
                          }}
                        >
                          Buka Hadiah 🎁
                        </button>
                      ) : (
                        <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#94A3B8' }}>
                          🔒 {tier.requiredPawPoints - pawPoints} lagi
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Daily Quests to earn points (flex: 1) */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FFFFFF'
          }}>
            <div style={{
              padding: '10px 18px',
              backgroundColor: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '13px', fontWeight: '900', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>📋</span> Misi Harian Kafe
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {DAILY_QUESTS.some(q => (questProgress[q.id] || 0) >= q.target && !claimedQuests.includes(q.id)) && (
                  <button
                    onClick={() => {
                      audio.playFanfare();
                      DAILY_QUESTS.filter(q => (questProgress[q.id] || 0) >= q.target && !claimedQuests.includes(q.id))
                        .forEach(q => handleClaimQuest(q));
                    }}
                    className="cozy-btn"
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '2px 8px',
                      color: '#FFF',
                      fontSize: '10px',
                      fontWeight: '900',
                      cursor: 'pointer'
                    }}
                  >
                    ✨ Klaim Semua
                  </button>
                )}
                <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '700' }}>
                  Direset Setiap Hari Jam 00:00 WIB
                </span>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {DAILY_QUESTS.map(quest => {
                const currentVal = questProgress[quest.id] || 0;
                const isCompleted = currentVal >= quest.target;
                const isClaimed = claimedQuests.includes(quest.id);

                return (
                  <div
                    key={quest.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '16px',
                      backgroundColor: isClaimed ? '#F8FAFC' : '#FFFFFF',
                      border: isCompleted && !isClaimed ? '2px solid #34D399' : '1.5px solid #FED7AA',
                      boxShadow: isCompleted && !isClaimed ? '0 4px 12px rgba(52, 211, 153, 0.2)' : 'none',
                      opacity: isClaimed ? 0.6 : 1
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '26px', flexShrink: 0 }}>
                        {quest.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '12.5px', fontWeight: '900', color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {quest.title}
                        </div>
                        <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '1px' }}>
                          {quest.desc}
                        </div>
                        {/* Mini progress bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                          <div style={{ height: '6px', flex: 1, backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{
                              height: '100%',
                              width: `${Math.min(100, (currentVal / quest.target) * 100)}%`,
                              backgroundColor: isCompleted ? '#10B981' : '#F59E0B',
                              borderRadius: '999px'
                            }} />
                          </div>
                          <span style={{ fontSize: '10px', fontWeight: '800', color: '#64748B' }}>
                            {Math.min(quest.target, currentVal)}/{quest.target}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Rewards & Claim Button */}
                    <div style={{ marginLeft: '12px', flexShrink: 0 }}>
                      {isClaimed ? (
                        <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', padding: '4px 10px', borderRadius: '8px', backgroundColor: '#E2E8F0' }}>
                          Selesai
                        </div>
                      ) : isCompleted ? (
                        <button
                          onClick={() => handleClaimQuest(quest)}
                          className="cozy-btn"
                          style={{
                            padding: '6px 14px',
                            fontSize: '11px',
                            borderRadius: '12px',
                            background: '#10B981',
                            color: '#FFFFFF',
                            border: 'none',
                            fontWeight: '900',
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)'
                          }}
                        >
                          Klaim! ✨
                        </button>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '10px', fontWeight: '800', color: '#EA580C' }}>
                          <span>+{quest.rewardPawPoints} 🐾</span>
                          {quest.rewardCoins && <span>+{quest.rewardCoins} 🪙</span>}
                          {quest.rewardEnergy && <span>+{quest.rewardEnergy} ⚡</span>}
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
