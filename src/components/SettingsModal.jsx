import React, { useState } from 'react';
import { X, Volume2, VolumeX, Music, RotateCcw, Copy, Download, Sliders, ShieldCheck } from 'lucide-react';
import { audio } from '../utils/audio';

export function SettingsModal({
  isOpen = false,
  soundEnabled = true,
  bgmEnabled = true,
  soundVolume = 80,
  bgmVolume = 60,
  isSandboxMode = false,
  onToggleSound,
  onToggleBgm,
  onChangeSoundVolume,
  onChangeBgmVolume,
  onToggleSandboxMode,
  onExportSave,
  onImportSave,
  onResetProgress,
  onClose
}) {
  const [importInputOpen, setImportInputOpen] = useState(false);
  const [importString, setImportString] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen) return null;

  const handleReset = () => {
    if (window.confirm("Apakah kamu yakin ingin mengulang permainan dari awal? Semua koin dan progres akan diatur ulang.")) {
      if (typeof onResetProgress === 'function') {
        onResetProgress();
      }
      if (onClose) onClose();
    }
  };

  const handleCopySave = () => {
    if (onExportSave) {
      const code = onExportSave();
      if (code) {
        audio.playFanfare();
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      }
    }
  };

  const handleExecuteImport = () => {
    if (!importString.trim()) return;
    if (onImportSave) {
      const success = onImportSave(importString.trim());
      if (!success) {
        audio.playPop();
        alert("Kode simpanan tidak valid atau rusak!");
      }
    }
  };

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
        if (e.target === e.currentTarget && onClose) onClose();
      }}
    >
      <div
        style={{
          width: '860px',
          maxWidth: '95vw',
          maxHeight: '90vh',
          background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '3.5px solid #8B5A2B',
          borderRadius: '26px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.9)',
          overflowY: 'auto',
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
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="/logo.png"
              alt="Logo"
              style={{ height: '38px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }}
            />
            <div>
              <div style={{ fontSize: '16px', fontWeight: '900', color: '#3B1E08' }}>
                Pengaturan Game
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#8A5833' }}>
                Zorro Merger Game 🐾 (Landscape Ready)
              </div>
            </div>
          </div>

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
        </div>

        {/* Options Body - 2 Columns Landscape */}
        <div style={{ 
          padding: '18px 22px', 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '16px',
          alignItems: 'start'
        }}>
          {/* Left Column: Audio & Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* P0: Game Mode Selector (Normal Lv.1 vs Sandbox Lv.18) */}
            <div style={{
              background: '#FFF9F0',
              border: '1.5px solid #E5C39E',
              borderRadius: '16px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '22px' }}>🚀</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                      Mode Akses Penuh (Full Game)
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#8A5833', fontWeight: '700' }}>
                      {isSandboxMode
                        ? 'Semua fitur terbuka: Lv.10, 99.999 🪙, semua resep & peta!'
                        : 'Mode normal pemain baru (Lv.1 progres alami)'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    audio.playPop();
                    if (onToggleSandboxMode) onToggleSandboxMode();
                  }}
                  className="mockup-action-btn shimmer-badge"
                  style={{
                    padding: '7px 14px',
                    borderRadius: '12px',
                    background: isSandboxMode
                      ? 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)'
                      : 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                    color: '#FFF',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isSandboxMode ? 'Kembali ke Normal' : '⚡ Buka Semua Fitur!'}
                </button>
              </div>
            </div>

            {/* Sound FX & Volume */}
            <div style={{
              background: '#FFF9F0',
              border: '1.5px solid #E5C39E',
              borderRadius: '16px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: '#FEF3C7',
                    border: '1.5px solid #F59E0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D97706'
                  }}>
                    {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                      Efek Suara & SFX
                    </div>
                    <div style={{ fontSize: '11px', color: '#8A5833', fontWeight: '700' }}>
                      Pop merge, purr, & koin ({soundVolume}%)
                    </div>
                  </div>
                </div>

                <button
                  onClick={onToggleSound}
                  style={{
                    width: '46px',
                    height: '26px',
                    borderRadius: '999px',
                    background: soundEnabled ? 'linear-gradient(180deg, #34D399 0%, #059669 100%)' : '#CBD5E1',
                    border: soundEnabled ? '2px solid #047857' : '2px solid #94A3B8',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    position: 'absolute',
                    top: '2px',
                    left: soundEnabled ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.25)'
                  }} />
                </button>
              </div>

              {soundEnabled && onChangeSoundVolume && (
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundVolume}
                  onChange={(e) => onChangeSoundVolume(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#D97706', cursor: 'pointer', marginTop: '6px' }}
                />
              )}
            </div>

            {/* Lo-fi BGM & Volume */}
            <div style={{
              background: '#FFF9F0',
              border: '1.5px solid #E5C39E',
              borderRadius: '16px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: '#F3E8FF',
                    border: '1.5px solid #A855F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#7E22CE'
                  }}>
                    <Music size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                      Musik Santai Kafe
                    </div>
                    <div style={{ fontSize: '11px', color: '#8A5833', fontWeight: '700' }}>
                      Melodi cozy pastel ({bgmVolume}%)
                    </div>
                  </div>
                </div>

                <button
                  onClick={onToggleBgm}
                  style={{
                    width: '46px',
                    height: '26px',
                    borderRadius: '999px',
                    background: bgmEnabled ? 'linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)' : '#CBD5E1',
                    border: bgmEnabled ? '2px solid #6B21A8' : '2px solid #94A3B8',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#FFFFFF',
                    position: 'absolute',
                    top: '2px',
                    left: bgmEnabled ? '22px' : '2px',
                    transition: 'left 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.25)'
                  }} />
                </button>
              </div>

              {bgmEnabled && onChangeBgmVolume && (
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={bgmVolume}
                  onChange={(e) => onChangeBgmVolume(parseInt(e.target.value, 10))}
                  style={{ width: '100%', accentColor: '#7E22CE', cursor: 'pointer', marginTop: '6px' }}
                />
              )}
            </div>
          </div>

          {/* Right Column: Cloud Save & System Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* P1: Cloud Save & Transfer System */}
            <div style={{
              background: '#EFF6FF',
              border: '1.5px solid #BFDBFE',
              borderRadius: '16px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} color="#2563EB" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '900', color: '#1E3A8A' }}>
                    Cloud Save & Cadangan Data
                  </div>
                  <div style={{ fontSize: '11px', color: '#3B82F6', fontWeight: '700' }}>
                    Simpan atau pindahkan akun ke perangkat lain
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleCopySave}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    background: copySuccess ? '#059669' : '#2563EB',
                    color: '#FFF',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 4px rgba(37, 99, 235, 0.25)'
                  }}
                >
                  <Copy size={13} />
                  <span>{copySuccess ? 'Tersalin! ✅' : 'Salin Kode Save'}</span>
                </button>

                <button
                  onClick={() => setImportInputOpen(!importInputOpen)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    background: '#FFFFFF',
                    color: '#1E40AF',
                    border: '1.5px solid #93C5FD',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}
                >
                  <Download size={13} />
                  <span>Pulihkan Data</span>
                </button>
              </div>

              {importInputOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                  <textarea
                    rows={2}
                    value={importString}
                    onChange={(e) => setImportString(e.target.value)}
                    placeholder="Tempel kode save game di sini..."
                    style={{
                      width: '100%',
                      fontSize: '10.5px',
                      padding: '6px',
                      borderRadius: '8px',
                      border: '1px solid #93C5FD',
                      fontFamily: 'monospace'
                    }}
                  />
                  <button
                    onClick={handleExecuteImport}
                    style={{
                      padding: '7px',
                      background: '#1D4ED8',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '900',
                      cursor: 'pointer'
                    }}
                  >
                    Terapkan & Pulihkan Akun 🚀
                  </button>
                </div>
              )}
            </div>

            {/* Reset progress */}
            <button
              onClick={handleReset}
              className="mockup-action-btn"
              style={{
                padding: '11px',
                background: '#FEF2F2',
                color: '#DC2626',
                border: '2px solid #FECACA',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginTop: '4px'
              }}
            >
              <RotateCcw size={15} />
              <span>Mulai Ulang Game dari Awal</span>
            </button>

            <div style={{ textAlign: 'center', fontSize: '11px', color: '#8A5833', fontWeight: '700', marginTop: '6px' }}>
              Dibuat penuh kasih untuk <strong>Nina & Zorro</strong> 🐾
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
