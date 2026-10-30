import React, { useState } from 'react';
import { X, Sparkles, Gift, Zap, Coins, Star } from 'lucide-react';
import { audio } from '../utils/audio';
import { safeConfetti as confetti } from '../utils/safeConfetti';

const WHEEL_SLICES = [
  { id: 'e15', label: '+15 ⚡', type: 'energy', value: 15, color: '#FEF3C7', textColor: '#B45309', desc: '15 Energi Kafe' },
  { id: 'c30', label: '+30 🪙', type: 'coins', value: 30, color: '#FFEDD5', textColor: '#C2410C', desc: '30 Koin Emas' },
  { id: 's1', label: '+1 ⭐', type: 'stars', value: 1, color: '#FFE4E6', textColor: '#BE123C', desc: '1 Bintang Kafe' },
  { id: 'e35', label: '+35 ⚡', type: 'energy', value: 35, color: '#FEF9C3', textColor: '#854D0E', desc: '35 Energi Kafe' },
  { id: 'c50', label: '+50 🪙', type: 'coins', value: 50, color: '#FFD8BE', textColor: '#9A3412', desc: '50 Koin Emas' },
  { id: 'gift', label: '🎁 Kotak', type: 'gift', value: 1, color: '#F3E8FF', textColor: '#7E22CE', desc: 'Kotak Kejutan Spesial' },
  { id: 'e50', label: '+50 ⚡', type: 'energy', value: 50, color: '#DCFCE7', textColor: '#15803D', desc: '50 Energi Kafe' },
  { id: 'c100', label: '+100 🪙', type: 'coins', value: 100, color: '#E0F2FE', textColor: '#0369A1', desc: 'Jackpot 100 Koin!' },
];

export function LuckyWheelModal({
  onReward,
  onClose,
  canSpin = true
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonSlice, setWonSlice] = useState(null);

  const handleSpin = () => {
    if (isSpinning) return;

    audio.playPop();
    setIsSpinning(true);
    setWonSlice(null);

    // Pick random slice
    const sliceIndex = Math.floor(Math.random() * WHEEL_SLICES.length);
    const sliceDeg = 360 / WHEEL_SLICES.length;
    // Align needle at top
    const extraSpins = 360 * 5; // 5 full rotations
    const targetDeg = rotation + extraSpins + (360 - (sliceIndex * sliceDeg)) - (sliceDeg / 2);

    setRotation(targetDeg);

    setTimeout(() => {
      setIsSpinning(false);
      const selected = WHEEL_SLICES[sliceIndex];
      setWonSlice(selected);
      audio.playServe();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      onReward(selected);
    }, 3800);
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
          width: '900px',
          maxWidth: '96vw',
          height: '520px',
          maxHeight: '92vh',
          backgroundColor: '#FFFDF9',
          borderRadius: '26px',
          overflow: 'hidden',
          border: '3.5px solid #FDA4AF',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          animation: 'pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '12px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #FFE4E6',
          background: 'linear-gradient(135deg, #FFF1F2 0%, #FFF7ED 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🎡</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Roda Rezeki Kucing Zorro
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>
                Putar roda harian untuk memenangkan koin, energi, dan hadiah misterius!
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              audio.playPop();
              onClose();
            }}
            disabled={isSpinning}
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
              cursor: isSpinning ? 'not-allowed' : 'pointer',
              border: 'none'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* 2-Column Body Landscape */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Left Column: The Wheel (460px) */}
          <div style={{
            width: '460px',
            backgroundColor: '#FFF9F6',
            borderRight: '1.5px solid #FEE2E2',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            position: 'relative'
          }}>
            {/* Wheel Container */}
            <div style={{ position: 'relative', width: '270px', height: '270px', marginBottom: '16px' }}>
              {/* Top Pointer Needle */}
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '0',
                height: '0',
                borderLeft: '14px solid transparent',
                borderRight: '14px solid transparent',
                borderTop: '26px solid #E11D48',
                zIndex: 10,
                filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.35))'
              }} />

              {/* Rotating Wheel SVG */}
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 8px 26px rgba(244, 63, 94, 0.25), inset 0 0 10px rgba(0,0,0,0.1)',
                border: '6px solid #FFF1E6',
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 3.8s cubic-bezier(0.15, 0.85, 0.15, 1)' : 'none'
              }}>
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  {WHEEL_SLICES.map((slice, i) => {
                    const angle = 360 / WHEEL_SLICES.length;
                    const startAngle = (i * angle - 90) * (Math.PI / 180);
                    const endAngle = ((i + 1) * angle - 90) * (Math.PI / 180);
                    const x1 = 50 + 50 * Math.cos(startAngle);
                    const y1 = 50 + 50 * Math.sin(startAngle);
                    const x2 = 50 + 50 * Math.cos(endAngle);
                    const y2 = 50 + 50 * Math.sin(endAngle);
                    const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                    // Text position
                    const midAngle = ((i + 0.5) * angle - 90) * (Math.PI / 180);
                    const tx = 50 + 34 * Math.cos(midAngle);
                    const ty = 50 + 34 * Math.sin(midAngle);
                    const textRotation = (i + 0.5) * angle;

                    return (
                      <g key={slice.id}>
                        <path d={pathData} fill={slice.color} stroke="#FFFFFF" strokeWidth="1.2" />
                        <text
                          x={tx}
                          y={ty}
                          fill={slice.textColor}
                          fontSize="5.2"
                          fontWeight="900"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${textRotation} ${tx} ${ty})`}
                        >
                          {slice.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Center Cat Hub */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: '#0F172A',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '26px',
                  cursor: isSpinning ? 'not-allowed' : 'pointer'
                }}
                onClick={handleSpin}
              >
                🐾
              </div>
            </div>

            {/* Spin Action Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className="cozy-btn"
              style={{
                width: '270px',
                padding: '11px 0',
                fontSize: '14px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
                color: '#FFFFFF',
                fontWeight: '900',
                border: 'none',
                cursor: isSpinning ? 'not-allowed' : 'pointer',
                boxShadow: '0 6px 18px rgba(244, 63, 94, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={16} fill="#FFFFFF" />
              <span>{isSpinning ? 'Sedang Memutar...' : 'Putar Roda Sekarang! ✨'}</span>
            </button>
          </div>

          {/* Right Column: Prizes & Result Status (flex: 1) */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FFFFFF',
            padding: '20px 24px'
          }}>
            {/* Won banner */}
            {wonSlice ? (
              <div style={{
                fontSize: '14px',
                fontWeight: '900',
                color: '#15803D',
                backgroundColor: '#F0FDF4',
                padding: '12px 18px',
                borderRadius: '16px',
                border: '2px solid #86EFAC',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.15)',
                animation: 'pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}>
                <span style={{ fontSize: '24px' }}>🎉</span>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '900' }}>Selamat! Kamu Menang Hadiah!</div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#166534' }}>
                    Kamu mendapatkan <strong>{wonSlice.desc}</strong>!
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                fontSize: '13px',
                fontWeight: '800',
                color: '#9F1239',
                backgroundColor: '#FFF1F2',
                padding: '10px 16px',
                borderRadius: '14px',
                border: '1.5px solid #FDA4AF',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🍀</span>
                <span>Setiap putaran dijamin 100% mendapatkan hadiah tanpa zonk!</span>
              </div>
            )}

            <div style={{ fontSize: '13px', fontWeight: '900', color: '#1E293B', marginBottom: '8px' }}>
              Daftar Hadiah Roda Keberuntungan:
            </div>

            <div style={{
              flex: 1,
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px'
            }}>
              {WHEEL_SLICES.map((slice) => (
                <div
                  key={slice.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    backgroundColor: slice.color,
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}
                >
                  <span style={{ fontSize: '16px', fontWeight: '900' }}>{slice.label}</span>
                  <span style={{ fontSize: '11px', fontWeight: '800', color: slice.textColor }}>
                    {slice.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
