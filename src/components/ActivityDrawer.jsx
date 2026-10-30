import React from 'react';
import { audio } from '../utils/audio';
import {
  X,
  Gift,
  Sparkles,
  BookOpen,
  Trophy,
  Camera,
  Shirt,
  Calendar,
  Settings,
  Star
} from 'lucide-react';

export function ActivityDrawer({
  isOpen,
  onClose,
  level = 1,
  canClaimDaily = true,
  canSpinWheel = true,
  activeQuestsCount = 3,
  onOpenDailyGift,
  onOpenLuckyWheel,
  onOpenCatalog,
  onOpenCatPass,
  onOpenEvent,
  onOpenWardrobe,
  onOpenAlbum,
  onOpenGuestbook,
  onOpenSettings
}) {
  if (!isOpen) return null;

  const activities = [
    {
      id: 'daily',
      title: 'Kado Harian',
      desc: 'Klaim koin & energi gratis setiap hari',
      icon: '🎁',
      lucideIcon: Gift,
      badge: canClaimDaily ? 'BISA KLAIM!' : null,
      badgeColor: '#EF4444',
      bgGrad: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
      borderColor: '#D97706',
      reqLevel: 1,
      action: onOpenDailyGift
    },
    {
      id: 'wheel',
      title: 'Roda Rezeki',
      desc: 'Putar roda keberuntungan dapat jackpot',
      icon: '🎡',
      lucideIcon: Sparkles,
      badge: canSpinWheel ? 'PUTAR!' : null,
      badgeColor: '#10B981',
      bgGrad: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
      borderColor: '#0284C7',
      reqLevel: 1,
      action: onOpenLuckyWheel
    },
    {
      id: 'pass',
      title: 'Cat Pass & Misi',
      desc: 'Selesaikan misi kafe kumpulkan Paw Points',
      icon: '🐾',
      badge: `${activeQuestsCount} Misi`,
      badgeColor: '#8B5CF6',
      bgGrad: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
      borderColor: '#7C3AED',
      reqLevel: 1,
      action: onOpenCatPass
    },
    {
      id: 'catalog',
      title: 'Pohon Resep',
      desc: 'Buku ensiklopedia 70+ item & resep',
      icon: '📖',
      lucideIcon: BookOpen,
      bgGrad: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
      borderColor: '#16A34A',
      reqLevel: 1,
      action: onOpenCatalog
    },
    {
      id: 'wardrobe',
      title: 'Lemari Kostum',
      desc: 'Dandani Zorro, Thor & Loki dengan jubah',
      icon: '🎀',
      lucideIcon: Shirt,
      bgGrad: 'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)',
      borderColor: '#DB2777',
      reqLevel: 1,
      action: onOpenWardrobe
    },
    {
      id: 'event',
      title: 'Festival Kafe',
      desc: 'Event ulang tahun & hadiah tier eksklusif',
      icon: '🎂',
      lucideIcon: Calendar,
      badge: 'EVENT AKTIF',
      badgeColor: '#EA580C',
      bgGrad: 'linear-gradient(135deg, #FFEDD5 0%, #FED7AA 100%)',
      borderColor: '#EA580C',
      reqLevel: 1,
      action: onOpenEvent
    },
    {
      id: 'guestbook',
      title: 'Buku Tamu & Ulasan',
      desc: 'Reputasi kafe dan review pelanggan puas',
      icon: '🏆',
      lucideIcon: Trophy,
      bgGrad: 'linear-gradient(135deg, #FEF9C3 0%, #FEF08A 100%)',
      borderColor: '#CA8A04',
      reqLevel: 1,
      action: onOpenGuestbook
    },
    {
      id: 'album',
      title: 'Album Kenangan Zorro',
      desc: 'Koleksi foto nyata anabul peliharaan',
      icon: '📸',
      lucideIcon: Camera,
      bgGrad: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
      borderColor: '#64748B',
      reqLevel: 1,
      action: onOpenAlbum
    },
    {
      id: 'settings',
      title: 'Pengaturan Game',
      desc: 'Atur volume audio, BGM, dan simpan data',
      icon: '⚙️',
      lucideIcon: Settings,
      bgGrad: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
      borderColor: '#475569',
      reqLevel: 1,
      action: onOpenSettings
    }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26, 17, 11, 0.72)',
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
      <div
        style={{
          width: '840px',
          maxWidth: '95vw',
          maxHeight: '90vh',
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '4px solid #8B5A2B',
          borderRadius: '28px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.45), inset 0 2px 4px rgba(255,255,255,0.9)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
      >
        {/* Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          borderBottom: '2.5px solid #E5C39E',
          background: '#FFF9F0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '26px' }}>📋</span>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#2E1305' }}>
                Pusat Aktivitas Kafe
              </div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#78350F' }}>
                Pilih kegiatan, misi harian, dan hadiah kafe Zorro
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              audio.playPop();
              onClose();
            }}
            aria-label="Tutup Menu Aktivitas"
            style={{
              width: '34px',
              height: '34px',
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
            <X size={18} strokeWidth={2.5} />
          </button>
        </div>

        {/* 3x3 Grid of Activity Cards */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '14px'
        }}>
          {activities.map((act) => {
            const isLocked = level < act.reqLevel;

            return (
              <button
                key={act.id}
                disabled={isLocked}
                onClick={() => {
                  audio.playPop();
                  onClose();
                  if (act.action) act.action();
                }}
                style={{
                  background: isLocked ? '#F3F4F6' : act.bgGrad,
                  border: isLocked ? '2px solid #D1D5DB' : `2px solid ${act.borderColor}`,
                  borderRadius: '18px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  opacity: isLocked ? 0.65 : 1,
                  boxShadow: isLocked ? 'none' : '0 4px 12px rgba(0,0,0,0.06)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                className={isLocked ? '' : 'mockup-action-btn'}
              >
                {/* Top Badge */}
                {act.badge && !isLocked && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: act.badgeColor,
                    color: '#FFF',
                    fontSize: '9.5px',
                    fontWeight: '900',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}>
                    {act.badge}
                  </div>
                )}

                {/* Lock Overlay */}
                {isLocked && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: '#9CA3AF',
                    color: '#FFF',
                    fontSize: '10px',
                    fontWeight: '900',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}>
                    <span>🔒 Lv.{act.reqLevel}</span>
                  </div>
                )}

                {/* Big Icon */}
                <div style={{
                  fontSize: '32px',
                  marginBottom: '8px',
                  filter: isLocked ? 'grayscale(0.8)' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
                }}>
                  {act.icon}
                </div>

                {/* Title */}
                <div style={{
                  fontSize: '14px',
                  fontWeight: '900',
                  color: isLocked ? '#6B7280' : '#2E1305',
                  marginBottom: '3px'
                }}>
                  {act.title}
                </div>

                {/* Description */}
                <div style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: isLocked ? '#9CA3AF' : '#6B401D',
                  lineHeight: '1.3'
                }}>
                  {isLocked ? `Terbuka otomatis saat mencapai Level ${act.reqLevel} ⭐` : act.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
