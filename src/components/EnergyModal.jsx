import React, { useState, useEffect } from 'react';
import { X, Zap, Heart, Play, Film, CheckCircle, Sparkles } from 'lucide-react';
import { audio } from '../utils/audio';
import { telemetry } from '../utils/telemetry';

export function EnergyModal({
  isOpen = false,
  energy = 75,
  maxEnergy = 100,
  coins = 14350,
  onRefillCoins,
  onRefillFree,
  onClose
}) {
  const [adPlaying, setAdPlaying] = useState(false);
  const [adCountdown, setAdCountdown] = useState(3);

  useEffect(() => {
    let timer;
    if (adPlaying && adCountdown > 0) {
      timer = setTimeout(() => {
        setAdCountdown(c => c - 1);
      }, 1000);
    } else if (adPlaying && adCountdown === 0) {
      setAdPlaying(false);
      setAdCountdown(3);
      audio.playFanfare();
      telemetry.trackRewardedAd('energy_modal', 'energy', 30);
      if (onRefillFree) onRefillFree();
    }
    return () => clearTimeout(timer);
  }, [adPlaying, adCountdown, onRefillFree]);

  if (!isOpen) return null;

  const handleStartAd = () => {
    audio.playPop();
    setAdPlaying(true);
    setAdCountdown(3);
  };

  const energyPercent = Math.min(100, Math.round((energy / maxEnergy) * 100));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(26, 17, 11, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={(e) => {
        if (!adPlaying && e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        style={{
          width: '860px',
          maxWidth: '96vw',
          height: '460px',
          maxHeight: '92vh',
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '3.5px solid #8B5A2B',
          borderRadius: '26px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.9)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '12px 22px',
            background: 'linear-gradient(180deg, #FFFDF8 0%, #F5E3C9 100%)',
            borderBottom: '2.5px solid #E5C39E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>⚡</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#3B1E08' }}>
                Stasiun Pengisian Energi Kafe
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#8A5833' }}>
                Isi kembali tenaga barista dan kelinci dapur untuk pesanan tanpa henti 🐾
              </div>
            </div>
          </div>

          {!adPlaying && (
            <button
              onClick={() => {
                audio.playPop();
                if (onClose) onClose();
              }}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#FEE2E2',
                border: '2px solid #EF4444',
                color: '#DC2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* 2-Column Body Landscape */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Left Column: Current Energy Status Gauge (300px) */}
          <div style={{
            width: '300px',
            background: 'linear-gradient(180deg, #FFF9F0 0%, #FFF3E0 100%)',
            borderRight: '1.5px solid #E5C39E',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: '#FFFBEB',
              border: '3.5px solid #F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '38px',
              boxShadow: '0 8px 20px rgba(245, 158, 11, 0.25)'
            }}>
              ⚡
            </div>

            <div>
              <div style={{ fontSize: '12px', fontWeight: '800', color: '#78350F', textTransform: 'uppercase' }}>
                Status Energi Kafe
              </div>
              <div style={{ fontSize: '32px', fontWeight: '900', color: '#B45309', lineHeight: '1.1' }}>
                {energy} <span style={{ fontSize: '16px', color: '#92400E' }}>/ {maxEnergy}</span>
              </div>
            </div>

            {/* Gauge bar */}
            <div style={{
              width: '100%',
              height: '10px',
              backgroundColor: '#FEF3C7',
              borderRadius: '999px',
              overflow: 'hidden',
              border: '1px solid #FCD34D'
            }}>
              <div style={{
                width: `${energyPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #F59E0B 0%, #10B981 100%)',
                borderRadius: '999px',
                transition: 'width 0.3s ease'
              }} />
            </div>

            <div style={{
              fontSize: '11px',
              color: '#8A5833',
              fontWeight: '700',
              backgroundColor: '#FFFDF9',
              padding: '6px 12px',
              borderRadius: '10px',
              border: '1px solid #E5C39E'
            }}>
              💡 +1 Energi pulih otomatis tiap 2 menit istirahat!
            </div>
          </div>

          {/* Right Column: Refill Options (flex: 1) */}
          <div style={{
            flex: 1,
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '14px',
            backgroundColor: '#FFFFFF'
          }}>
            {/* Option 1: Commercial Rewarded Video Ad (+30 Energy) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFF9F0',
              border: '2px solid #FDA4AF',
              borderRadius: '20px',
              padding: '14px 18px',
              boxShadow: '0 4px 12px rgba(244, 63, 94, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: '#FFE4E6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E11D48'
                }}>
                  <Film size={26} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#9F1239' }}>
                    Tonton Video Ad Singkat
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#E11D48', fontWeight: '700' }}>
                    +30 ⚡ Energi Instan Gratis (Iklan Mitra Sponsor)
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartAd}
                disabled={adPlaying}
                className="mockup-action-btn"
                style={{
                  background: 'linear-gradient(180deg, #F43F5E 0%, #E11D48 100%)',
                  border: '2px solid #9F1239',
                  borderRadius: '14px',
                  padding: '8px 18px',
                  color: '#FFF',
                  fontSize: '13px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 10px rgba(225, 29, 72, 0.3)'
                }}
              >
                <Play size={14} fill="#FFF" />
                <span>Nonton (3s)</span>
              </button>
            </div>

            {/* Option 2: Full Refill (100 Energy for 200 Coins) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#FFF9F0',
              border: '2px solid #E5C39E',
              borderRadius: '20px',
              padding: '14px 18px',
              boxShadow: '0 4px 12px rgba(139, 90, 43, 0.08)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '14px',
                  background: '#FEF3C7',
                  border: '1.5px solid #FCD34D',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px'
                }}>
                  🐟
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#3B1E08' }}>
                    Snack Salmon Premium Penuh
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#8A5833', fontWeight: '700' }}>
                    Isi Penuh Sampai Maksimal (100 ⚡ Energi)
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  if (onRefillCoins) onRefillCoins();
                }}
                disabled={adPlaying}
                className="mockup-action-btn"
                style={{
                  background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
                  border: '2px solid #047857',
                  borderRadius: '14px',
                  padding: '8px 18px',
                  color: '#FFF',
                  fontSize: '13px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 10px rgba(5, 150, 105, 0.3)'
                }}
              >
                <span>200 🪙 Beli</span>
              </button>
            </div>
          </div>
        </div>

        {/* Rewarded Ad Playback Screen Overlay */}
        {adPlaying && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: '#0F172A',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF',
            padding: '24px',
            textAlign: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: '#1E293B',
              border: '2px solid #38BDF8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              animation: 'spin 3s linear infinite'
            }}>
              🎬
            </div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#38BDF8' }}>
              Memutar Iklan Video Sponsor Mitra
            </div>
            <div style={{ fontSize: '13px', color: '#94A3B8' }}>
              Hadiah +30 ⚡ Energi Kafe akan masuk otomatis setelah iklan selesai.
            </div>
            <div style={{
              background: '#1E293B',
              border: '1.5px solid #475569',
              borderRadius: '20px',
              padding: '8px 20px',
              fontSize: '15px',
              fontWeight: '900',
              color: '#FACC15',
              marginTop: '10px'
            }}>
              Selesai dalam {adCountdown} detik...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
