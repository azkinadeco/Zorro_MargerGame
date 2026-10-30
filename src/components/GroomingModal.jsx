import React, { useState, useRef } from 'react';
import { X, Sparkles, Heart } from 'lucide-react';
import { CatSprite } from './CatSprite';
import { audio } from '../utils/audio';
import { safeConfetti as confetti } from '../utils/safeConfetti';

export function GroomingModal({ onFinishGrooming, onClose }) {
  const [brushProgress, setBrushProgress] = useState(0); // 0 to 100%
  const [isBrushing, setIsBrushing] = useState(false);
  const [brushSparkles, setBrushSparkles] = useState([]);
  const [hasFinished, setHasFinished] = useState(false);

  const containerRef = useRef(null);
  const lastBrushTime = useRef(0);

  const handlePointerDown = (e) => {
    if (hasFinished) return;
    setIsBrushing(true);
    handleStroke(e);
  };

  const handlePointerMove = (e) => {
    if (!isBrushing || hasFinished) return;
    handleStroke(e);
  };

  const handlePointerUp = () => {
    setIsBrushing(false);
  };

  const handleStroke = (e) => {
    const now = Date.now();
    if (now - lastBrushTime.current < 90) return;
    lastBrushTime.current = now;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Purr audio
    audio.playPurr();

    // Add sparkle particle
    const newSparkle = {
      id: Math.random(),
      x,
      y
    };
    setBrushSparkles(prev => [...prev.slice(-8), newSparkle]);

    setBrushProgress(prev => {
      const next = prev + 5;
      if (next >= 100 && !hasFinished) {
        setHasFinished(true);
        audio.playMeow();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 }
        });
        setTimeout(() => {
          onFinishGrooming();
        }, 1200);
        return 100;
      }
      return Math.min(100, next);
    });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(5px)',
      zIndex: 230,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div
        className="cozy-card"
        style={{
          width: '880px',
          maxWidth: '96vw',
          height: '500px',
          maxHeight: '92vh',
          backgroundColor: '#FFFDF9',
          borderRadius: '26px',
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
          borderBottom: '2px solid #FFE4E6',
          background: 'linear-gradient(135deg, #FFF1F2 0%, #FFF7ED 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🪮</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Salon Spa & Sisir Zorro
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>
                Usap kursor atau jarimu ke atas bulu Zorro untuk menyisirnya dengan lembut!
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

        {/* 2-Column Body Landscape */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Left Column: Interactive Grooming Canvas (500px) */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            style={{
              width: '500px',
              backgroundColor: '#FFF7ED',
              borderRight: '1.5px solid #FED7AA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              cursor: 'grab',
              touchAction: 'none',
              overflow: 'hidden'
            }}
          >
            {/* Plush Velvet Mat */}
            <div style={{
              position: 'absolute',
              bottom: '40px',
              width: '280px',
              height: '90px',
              borderRadius: '50%',
              backgroundColor: '#FECDD3',
              border: '2.5px solid #FDA4AF',
              boxShadow: '0 8px 20px rgba(244, 63, 94, 0.15)'
            }} />

            {/* Zorro in Spa pose with Animated Sprite */}
            <div style={{
              pointerEvents: 'none',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
              transform: 'scale(1.35) translateY(-10px)'
            }}>
              <CatSprite type="zorro" size={105} isPurring={isBrushing} />
            </div>

            {/* Sparkles from brushing */}
            {brushSparkles.map(sparkle => (
              <div
                key={sparkle.id}
                style={{
                  position: 'absolute',
                  left: sparkle.x,
                  top: sparkle.y,
                  transform: 'translate(-50%, -50%)',
                  fontSize: '24px',
                  pointerEvents: 'none',
                  animation: 'pop 0.4s forwards'
                }}
              >
                ✨
              </div>
            ))}

            {/* Prompt banner if not started */}
            {brushProgress === 0 && (
              <div style={{
                position: 'absolute',
                top: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                padding: '6px 16px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: '900',
                color: '#C2410C',
                border: '1.5px solid #FED7AA',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
              }}>
                👆 Usap jarimu ke bulu Zorro untuk menyisir!
              </div>
            )}

            {/* Finished message */}
            {hasFinished && (
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                animation: 'pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}>
                <span style={{ fontSize: '42px' }}>🎉</span>
                <span style={{ fontSize: '16px', fontWeight: '900', color: '#15803D' }}>
                  Bulu Zorro Bersih & Berkilau!
                </span>
                <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '800' }}>
                  Kamu mendapatkan Bola Wol + 20 🐾 Poin Paw!
                </span>
              </div>
            )}
          </div>

          {/* Right Column: Progress & Spa Info (flex: 1) */}
          <div style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '900', color: '#1E293B', marginBottom: '12px' }}>
                Status Perawatan Spa
              </div>

              {/* Progress Bar */}
              <div style={{
                backgroundColor: '#FFF1F2',
                borderRadius: '18px',
                padding: '14px',
                border: '1.5px solid #FDA4AF',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '900', color: '#881337', marginBottom: '8px' }}>
                  <span>Kilau & Kenyamanan Zorro:</span>
                  <span>{brushProgress}%</span>
                </div>
                <div style={{ height: '14px', width: '100%', backgroundColor: '#FFE4E6', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${brushProgress}%`,
                    background: 'linear-gradient(90deg, #FB7185 0%, #34D399 100%)',
                    borderRadius: '999px',
                    transition: 'width 0.1s ease'
                  }} />
                </div>
              </div>

              {/* Spa Benefits */}
              <div style={{
                backgroundColor: '#F8FAFC',
                borderRadius: '16px',
                padding: '14px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '11.5px',
                color: '#475569',
                lineHeight: '1.4'
              }}>
                <div style={{ fontWeight: '900', color: '#0F172A', fontSize: '12px' }}>
                  ✨ Manfaat Perawatan Rutin:
                </div>
                <div>• Mengurangi stres dan meningkatkan mood Zorro.</div>
                <div>• Menghasilkan item bulu halus & benang wol langka.</div>
                <div>• Menambah Poin Paw untuk Zorro Cat Pass!</div>
              </div>
            </div>

            <div style={{
              textAlign: 'center',
              fontSize: '11px',
              color: '#8A5833',
              fontWeight: '800',
              backgroundColor: '#FFF9F0',
              padding: '8px',
              borderRadius: '12px',
              border: '1px solid #FED7AA'
            }}>
              {hasFinished ? 'Hadiah sedang dikirim ke papan...' : 'Zorro paling suka disisir lembut di leher & dagunya 🐾'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
