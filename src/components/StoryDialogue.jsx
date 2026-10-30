import React, { useState } from 'react';
import { audio } from '../utils/audio';
import { Sparkles, Heart } from 'lucide-react';

export function StoryDialogue({ story, onDismiss }) {
  const [chosenOption, setChosenOption] = useState(null);

  if (!story) return null;

  const handleChooseOption = (option) => {
    audio.playPop();
    setChosenOption(option);
  };

  const isNina = story.speaker?.toLowerCase().includes('nina');
  const isZorro = story.speaker?.toLowerCase().includes('zorro');

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(4px)',
      zIndex: 240,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div
        className="cozy-card"
        style={{
          width: '760px',
          maxWidth: '94vw',
          backgroundColor: '#FFFFFF',
          borderRadius: '26px',
          padding: '24px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          border: '3.5px solid #FDA4AF',
          boxShadow: '0 25px 50px rgba(0,0,0,0.35)',
          animation: 'pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        {/* Character Avatar (Left) */}
        <div style={{
          width: '110px',
          height: '110px',
          borderRadius: '24px',
          backgroundColor: '#FFE4E6',
          border: '3px solid #FB7185',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 8px 20px rgba(244, 63, 94, 0.25)',
          overflow: 'hidden',
          position: 'relative'
        }}>
          {isNina ? (
            <img
              src="/ui/nina_avatar.png"
              alt="Nina"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : isZorro ? (
            <img
              src="/ui/zorro_avatar.png"
              alt="Zorro"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <span style={{ fontSize: '56px' }}>{story.avatar || '👩🏻‍🦰'}</span>
          )}
        </div>

        {/* Story Text & Dialogue (Right) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Character Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '13px',
              fontWeight: '900',
              color: '#BE123C',
              backgroundColor: '#FFF1F2',
              padding: '3px 14px',
              borderRadius: '999px',
              border: '1.5px solid #FECDD3'
            }}>
              {story.speaker}
            </span>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8' }}>
              Kisah Kafe Zorro & Nina
            </span>
          </div>

          {/* Story Text */}
          <p style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#334155',
            lineHeight: '1.5',
            margin: '2px 0 6px 0'
          }}>
            "{story.text}"
          </p>

          {/* Interactive Response Choice (Visual Novel feature) */}
          {!chosenOption ? (
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={() => handleChooseOption('pet')}
                className="cozy-btn cozy-btn-yellow"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  fontSize: '12px',
                  borderRadius: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '800'
                }}
              >
                🐾 "Zorro kelihatan sangat bahagia di kafe ini!"
              </button>
              <button
                onClick={() => handleChooseOption('decor')}
                className="cozy-btn cozy-btn-pink"
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  fontSize: '12px',
                  borderRadius: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '800'
                }}
              >
                ✨ "Kerja bagus Nina, suasana kafe ini sangat hangat!"
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{
                fontSize: '12.5px',
                fontWeight: '800',
                color: '#15803D',
                backgroundColor: '#F0FDF4',
                padding: '8px 16px',
                borderRadius: '14px',
                border: '1.5px solid #86EFAC',
                animation: 'pop 0.2s ease',
                flex: 1
              }}>
                {chosenOption === 'pet'
                  ? 'Zorro mendengkur halus mendengar pujianmu! ❤️'
                  : 'Nina tersenyum hangat dan pipinya merona senang! 🌸'}
              </div>

              <button
                onClick={() => {
                  audio.playPop();
                  onDismiss();
                }}
                className="cozy-btn cozy-btn-pink"
                style={{
                  padding: '9px 18px',
                  fontSize: '12.5px',
                  borderRadius: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
                  color: '#FFF',
                  boxShadow: '0 4px 10px rgba(225, 29, 72, 0.3)'
                }}
              >
                Lanjutkan Cerita Kafe 🐾
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
