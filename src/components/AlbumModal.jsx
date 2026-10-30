import React, { useState } from 'react';
import { X, Lock, Sparkles, Heart } from 'lucide-react';
import { ZORRO_ALBUM } from '../data/album';
import { audio } from '../utils/audio';

export function AlbumModal({ totalStarsEarned, onClose }) {
  const [unlockedPhotos, setUnlockedPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_unlocked_photos');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const isPhotoUnlocked = (item) => totalStarsEarned >= item.unlockStars || unlockedPhotos.includes(item.id);

  // Default to first unlocked photo or first photo
  const firstUnlocked = ZORRO_ALBUM.find(item => isPhotoUnlocked(item)) || ZORRO_ALBUM[0];
  const [selectedPhoto, setSelectedPhoto] = useState(firstUnlocked);

  const totalUnlocked = ZORRO_ALBUM.filter(item => isPhotoUnlocked(item)).length;

  const handleUnlockPhoto = (photoId) => {
    audio.playFanfare();
    const next = [...unlockedPhotos, photoId];
    setUnlockedPhotos(next);
    try {
      localStorage.setItem('zorro_unlocked_photos', JSON.stringify(next));
    } catch (e) {}
  };

  const handleUnlockAllPhotos = () => {
    audio.playFanfare();
    const allIds = ZORRO_ALBUM.map(p => p.id);
    setUnlockedPhotos(allIds);
    try {
      localStorage.setItem('zorro_unlocked_photos', JSON.stringify(allIds));
    } catch (e) {}
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
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FFFDF9',
          borderRadius: '26px',
          overflow: 'hidden',
          border: '3.5px solid #FED7AA',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
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
            <span style={{ fontSize: '24px' }}>📸</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Album Kenangan Zorro & Kucing Kafe
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>
                Momen-momen manis Zorro, Thor, & Loki saat bersantai di kafe!
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FFFFFF',
              padding: '5px 12px',
              borderRadius: '999px',
              border: '1.5px solid #FDBA74',
              fontWeight: '900',
              fontSize: '12px',
              color: '#EA580C'
            }}>
              <span>⭐</span>
              <span>Terbuka: {totalUnlocked}/{ZORRO_ALBUM.length} Foto</span>
            </div>

            {totalUnlocked < ZORRO_ALBUM.length && (
              <button
                onClick={handleUnlockAllPhotos}
                className="mockup-action-btn"
                style={{
                  background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                  border: '1.5px solid #B45309',
                  borderRadius: '12px',
                  padding: '5px 12px',
                  color: '#FFF',
                  fontSize: '11px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                🔓 Buka Semua Foto
              </button>
            )}

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

        {/* 2-Column Body Landscape */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          
          {/* Left Column: Spotlight Polaroid Preview (360px) */}
          <div style={{
            width: '360px',
            backgroundColor: '#FFF8F0',
            borderRight: '1.5px solid #FED7AA',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Washi tape decoration */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '18px',
              background: 'rgba(251, 113, 133, 0.45)',
              borderRadius: '3px',
              zIndex: 3
            }} />

            {/* Polaroid Paper Frame */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px 12px 16px 12px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              border: '2px solid #FED7AA',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{
                width: '100%',
                height: '240px',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#0F172A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {selectedPhoto && isPhotoUnlocked(selectedPhoto) ? (
                  <img
                    src={selectedPhoto.photo}
                    alt={selectedPhoto.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#CBD5E1',
                    textAlign: 'center',
                    padding: '16px'
                  }}>
                    <Lock size={28} color="#FBBF24" />
                    <span style={{ fontSize: '12px', fontWeight: '800' }}>
                      Syarat: {selectedPhoto?.unlockStars || 10} ⭐ Bintang
                    </span>
                    <button
                      onClick={() => handleUnlockPhoto(selectedPhoto.id)}
                      className="mockup-action-btn"
                      style={{
                        background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                        border: '1.5px solid #B45309',
                        borderRadius: '12px',
                        padding: '6px 14px',
                        color: '#FFF',
                        fontSize: '11.5px',
                        fontWeight: '900',
                        cursor: 'pointer',
                        marginTop: '4px'
                      }}
                    >
                      🔓 Buka Foto Ini
                    </button>
                  </div>
                )}
              </div>

              <div>
                <div style={{ fontSize: '15px', fontWeight: '900', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{selectedPhoto?.title}</span>
                  <Heart size={15} fill="#FB7185" color="#FB7185" />
                </div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#EA580C', marginTop: '2px' }}>
                  {selectedPhoto?.subtitle} • {selectedPhoto?.date}
                </div>
                <p style={{ fontSize: '11.5px', color: '#475569', marginTop: '6px', lineHeight: '1.45', fontStyle: 'italic' }}>
                  "{selectedPhoto?.story}"
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Grid of Polaroids (flex: 1) */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '18px 22px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '14px',
            alignContent: 'start',
            backgroundColor: '#FFFDF9'
          }}>
            {ZORRO_ALBUM.map((item) => {
              const isUnlocked = isPhotoUnlocked(item);
              const isCurrent = selectedPhoto?.id === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    audio.playPop();
                    setSelectedPhoto(item);
                  }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '8px 8px 12px 8px',
                    boxShadow: isCurrent ? '0 6px 16px rgba(234, 88, 12, 0.25)' : '0 3px 10px rgba(0,0,0,0.06)',
                    border: isCurrent ? '2.5px solid #EA580C' : '1.5px solid #FED7AA',
                    cursor: 'pointer',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                    transform: isCurrent ? 'scale(1.02)' : 'none',
                    opacity: isUnlocked ? 1 : 0.75
                  }}
                >
                  {/* Photo Thumbnail */}
                  <div style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    backgroundColor: '#E2E8F0',
                    position: 'relative'
                  }}>
                    {isUnlocked ? (
                      <img
                        src={item.photo}
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#334155',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                        color: '#FFFFFF',
                        padding: '6px',
                        textAlign: 'center'
                      }}>
                        <Lock size={18} color="#FBBF24" />
                        <span style={{ fontSize: '10px', fontWeight: '800' }}>
                          {item.unlockStars} ⭐
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Caption */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '900',
                      color: isUnlocked ? '#1E293B' : '#94A3B8',
                      lineHeight: '1.2'
                    }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '9.5px', color: '#94A3B8', marginTop: '2px' }}>
                      {item.date}
                    </div>
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
