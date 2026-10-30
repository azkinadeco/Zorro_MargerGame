import React, { useState, useEffect } from 'react';
import { CatRoomView } from './CatRoomView';
import { InteractCatView } from './InteractCatView';
import { GroomingRoomView } from './GroomingRoomView';
import { audio } from '../utils/audio';

export function CatLoungeView({
  initialTab = 'elus',
  catType = 'zorro',
  coins = 0,
  gems = 0,
  onSpendCoins,
  onSpendGems,
  onAddCoins,
  onAddGems,
  onAddEnergy,
  onGroomSuccess,
  onPetSuccess,
  onOpenFeeding,
  onOpenWardrobe,
  onBackToLobby,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'elus');

  // Synchronize when initialTab changes (e.g. from parent interaction triggers)
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const tabs = [
    { id: 'elus', label: 'Elus & Manja', icon: '🐾' },
    { id: 'asuh', label: 'Asuh & Tumbuh', icon: '🍼' },
    { id: 'spa', label: 'Salon Spa', icon: '✂️' },
    { id: 'kostum', label: 'Lemari Kostum', icon: '🎀', isModal: true }
  ];

  const handleTabClick = (tab) => {
    audio.playPop();
    if (tab.isModal) {
      if (onOpenWardrobe) onOpenWardrobe();
    } else {
      setActiveTab(tab.id);
    }
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }}>
      {/* Unified Cat Care Activity Bar */}
      <div style={{
        position: 'absolute',
        top: '68px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 35,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255, 250, 243, 0.96)',
        backdropFilter: 'blur(8px)',
        padding: '5px 12px',
        borderRadius: '24px',
        border: '2.5px solid #8B5A2B',
        boxShadow: '0 6px 16px rgba(74, 40, 16, 0.25)'
      }}>
        {tabs.map((tab) => {
          const isActive = !tab.isModal && activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className="mockup-action-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 12px',
                borderRadius: '16px',
                border: isActive ? '2px solid #C2410C' : '1.5px solid #E5D5C5',
                background: isActive
                  ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)'
                  : 'linear-gradient(180deg, #FFFFFF 0%, #F5EDE4 100%)',
                color: isActive ? '#FFFFFF' : '#6B3C18',
                fontWeight: '900',
                fontSize: '11.5px',
                cursor: 'pointer',
                boxShadow: isActive ? '0 2px 8px rgba(234, 88, 12, 0.4)' : '0 1px 3px rgba(0,0,0,0.08)',
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
                transition: 'all 0.15s ease'
              }}
              title={tab.label}
            >
              <span style={{ fontSize: '13px' }}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Elus & Manja (Petting & Happiness) */}
      {activeTab === 'elus' && (
        <InteractCatView
          catType={catType}
          coins={coins}
          gems={gems}
          onSpendCoins={onSpendCoins}
          onSpendGems={onSpendGems}
          onAddCoins={onAddCoins}
          onAddGems={onAddGems}
          onOpenFeeding={onOpenFeeding}
          onOpenWardrobe={onOpenWardrobe}
          onPetSuccess={onPetSuccess}
          onBackToLobby={onBackToLobby}
          onShowToast={onShowToast}
        />
      )}

      {/* Tab 2: Asuh & Tumbuh (Nursery & Kitten Growth) */}
      {activeTab === 'asuh' && (
        <CatRoomView
          coins={coins}
          gems={gems}
          onAddCoins={onAddCoins}
          onAddGems={onAddGems}
          onAddEnergy={onAddEnergy}
          onShowToast={onShowToast}
        />
      )}

      {/* Tab 3: Salon Spa (Grooming, Bath & Dryer) */}
      {activeTab === 'spa' && (
        <GroomingRoomView
          coins={coins}
          gems={gems}
          onSpendCoins={onSpendCoins}
          onSpendGems={onSpendGems}
          onAddCoins={onAddCoins}
          onAddEnergy={onAddEnergy}
          onGroomSuccess={onGroomSuccess}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
}
