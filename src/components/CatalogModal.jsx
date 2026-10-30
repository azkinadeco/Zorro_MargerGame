import React, { useState } from 'react';
import { X, Sparkles, HelpCircle, CheckCircle2 } from 'lucide-react';
import { ITEMS, ITEM_CATEGORIES } from '../data/items';
import { Semi3DItemToken } from './Semi3DItemToken';
import { audio } from '../utils/audio';

export function CatalogModal({ discoveredItemIds = [], onAddGems, onShowToast, onClose }) {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [claimedCatRewards, setClaimedCatRewards] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_catalog_claimed_cats');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const tabs = [
    { id: 'all', label: 'Semua Resep', icon: '🌟' },
    { id: ITEM_CATEGORIES.GENERATORS, label: 'Generator Papan', icon: '🧺' },
    { id: ITEM_CATEGORIES.FOOD, label: 'Makanan Kafe', icon: '🥫' },
    { id: ITEM_CATEGORIES.TOYS, label: 'Mainan Kucing', icon: '🧶' },
    { id: ITEM_CATEGORIES.CARE, label: 'Perawatan Spa', icon: '🪮' },
    { id: ITEM_CATEGORIES.CATS, label: 'Karakter Kucing', icon: '🐱' },
    { id: ITEM_CATEGORIES.ENERGY, label: 'Item Energi', icon: '⚡' },
    { id: ITEM_CATEGORIES.COINS, label: 'Koin & Harta', icon: '🪙' },
    { id: ITEM_CATEGORIES.SPECIAL, label: 'Booster Ajaib', icon: '🪄' },
  ];

  // Auto-treat on-board generators as discovered if player has them
  const isItemDiscovered = (itemId) => {
    if (['gen_basket', 'gen_box', 'food_1', 'cats_1', 'toys_1'].includes(itemId)) return true;
    return discoveredItemIds.includes(itemId);
  };

  const handleClaimCatBonus = (catId, catLabel) => {
    if (claimedCatRewards.includes(catId)) return;
    audio.playFanfare();
    const next = [...claimedCatRewards, catId];
    setClaimedCatRewards(next);
    try { localStorage.setItem('zorro_catalog_claimed_cats', JSON.stringify(next)); } catch (e) {}
    if (onAddGems) onAddGems(25);
    if (onShowToast) onShowToast(`💎 Bonus Koleksi "${catLabel}" Diklaim! +25 Permata!`);
  };

  // Filter items in active category and search term, sort by level
  const itemsInCat = Object.values(ITEMS)
    .filter(item => {
      const matchCat = activeTab === 'all' || item.category === activeTab;
      const matchSearch = !searchTerm ||
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.nameId && item.nameId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.desc && item.desc.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    })
    .sort((a, b) => a.level - b.level);

  // Overall catalog stats
  const totalCatalogItems = Object.keys(ITEMS).length;
  const totalDiscovered = Object.values(ITEMS).filter(item => isItemDiscovered(item.id)).length;
  const overallPercent = Math.round((totalDiscovered / Math.max(1, totalCatalogItems)) * 100);

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
          border: '3.5px solid #BFDBFE',
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
          borderBottom: '2px solid #E2E8F0',
          background: 'linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>📖</span>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '900', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Buku Katalog & Resep Merge
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>
                Gabungkan 2 item yang sama untuk menemukan tingkat menu & mainan baru!
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FFFFFF',
              padding: '5px 12px',
              borderRadius: '999px',
              border: '1.5px solid #93C5FD',
              fontWeight: '900',
              fontSize: '12px',
              color: '#2563EB'
            }}>
              <span>🌟</span>
              <span>Koleksi: {totalDiscovered}/{totalCatalogItems} ({overallPercent}%)</span>
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
                backgroundColor: '#FFFFFF',
                border: '1.5px solid #CBD5E1',
                color: '#64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 2-Column Body Landscape */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <div style={{
              width: '240px',
              backgroundColor: '#F8FAFC',
              borderRight: '1.5px solid #E2E8F0',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              overflowY: 'auto'
            }}>
              <div style={{ fontSize: '10.5px', fontWeight: '900', color: '#64748B', textTransform: 'uppercase', padding: '2px 8px' }}>
                Kategori Item
              </div>

              {tabs.map(tab => {
                const allInThisCat = tab.id === 'all'
                  ? Object.values(ITEMS)
                  : Object.values(ITEMS).filter(i => i.category === tab.id);
                const discInThisCat = allInThisCat.filter(i => isItemDiscovered(i.id)).length;
                const isSelected = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      audio.playPop();
                      setActiveTab(tab.id);
                    }}
                    className="cozy-btn"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #3B82F6' : '1.5px solid transparent',
                      backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                      color: isSelected ? '#1D4ED8' : '#334155',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 2px 6px rgba(59, 130, 246, 0.15)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                      <span style={{ fontSize: '16px' }}>{tab.icon}</span>
                      <span style={{ fontSize: '11.5px', fontWeight: '800' }}>{tab.label}</span>
                    </div>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: '800',
                      color: discInThisCat === allInThisCat.length && allInThisCat.length > 0 ? '#10B981' : '#64748B',
                      backgroundColor: isSelected ? '#DBEAFE' : '#F1F5F9',
                      padding: '2px 6px',
                      borderRadius: '8px'
                    }}>
                      {discInThisCat}/{allInThisCat.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Search & Grid of Items in Active Category */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Search Input Bar & Category Completion Bonus Button */}
              <div style={{
                padding: '10px 20px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#FFFDF9'
              }}>
                <span style={{ fontSize: '15px' }}>🔍</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari resep menu, generator, atau mainan (misal: Keranjang, Salmon, Wol)..."
                  style={{
                    flex: 1,
                    background: '#F1F5F9',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: '12px',
                    padding: '6px 14px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#1E293B',
                    outline: 'none'
                  }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    style={{
                      background: '#E2E8F0',
                      border: 'none',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: '900',
                      color: '#64748B'
                    }}
                    title="Hapus pencarian"
                  >
                    ✕
                  </button>
                )}

                {activeTab !== 'all' && (() => {
                  const activeTabObj = tabs.find(t => t.id === activeTab);
                  const catItems = Object.values(ITEMS).filter(i => i.category === activeTab);
                  const discCount = catItems.filter(i => isItemDiscovered(i.id)).length;
                  const isClaimed = claimedCatRewards.includes(activeTab);
                  const canClaim = discCount >= Math.min(2, catItems.length) && !isClaimed;
                  return (
                    <button
                      onClick={() => canClaim && handleClaimCatBonus(activeTab, activeTabObj?.label || activeTab)}
                      disabled={!canClaim}
                      className="cozy-btn"
                      style={{
                        background: isClaimed
                          ? '#E2E8F0'
                          : canClaim
                          ? 'linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)'
                          : '#F1F5F9',
                        color: isClaimed ? '#64748B' : canClaim ? '#FFFFFF' : '#94A3B8',
                        border: canClaim ? '1.5px solid #F3E8FF' : '1.5px solid #CBD5E1',
                        borderRadius: '12px',
                        padding: '6px 12px',
                        fontSize: '11px',
                        fontWeight: '900',
                        cursor: canClaim ? 'pointer' : 'default',
                        whiteSpace: 'nowrap',
                        boxShadow: canClaim ? '0 3px 10px rgba(126, 34, 206, 0.35)' : 'none'
                      }}
                    >
                      {isClaimed ? '✅ Bonus Diklaim' : `💎 Klaim Bonus (+25 💎)`}
                    </button>
                  );
                })()}
              </div>

              {/* Grid of Items */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px 20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '12px',
                alignContent: 'start'
              }}>
                {itemsInCat.length === 0 && (
                  <div style={{
                    gridColumn: '1 / -1',
                    textAlign: 'center',
                    padding: '36px 20px',
                    color: '#64748B',
                    fontWeight: '700',
                    fontSize: '13px'
                  }}>
                    🔍 Tidak ada item yang cocok dengan "{searchTerm}". Coba kata kunci lain!
                  </div>
                )}
              {itemsInCat.map((item) => {
                const isDiscovered = isItemDiscovered(item.id);
                const totalWeight = Array.isArray(item.spawns)
                  ? item.spawns.reduce((acc, s) => acc + (s.weight || 0), 0)
                  : 0;

                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 14px',
                      borderRadius: '18px',
                      backgroundColor: isDiscovered ? '#FFFFFF' : '#F8FAFC',
                      border: isDiscovered ? '2px solid #FED7AA' : '1.5px dashed #CBD5E1',
                      boxShadow: isDiscovered ? '0 2px 8px rgba(0,0,0,0.04)' : 'none',
                      opacity: isDiscovered ? 1 : 0.65
                    }}
                  >
                    {/* Level Pill */}
                    <div style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: isDiscovered ? '#FEF3C7' : '#E2E8F0',
                      color: isDiscovered ? '#B45309' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '900',
                      flexShrink: 0
                    }}>
                      {item.level}
                    </div>

                    {/* Item Icon (Semi-3D Token) */}
                    <div style={{
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {isDiscovered ? (
                        <Semi3DItemToken item={item} showLevelBadge={false} size="100%" />
                      ) : (
                        <div style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: '14px',
                          backgroundColor: '#E2E8F0',
                          border: '1.5px dashed #CBD5E1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <HelpCircle size={22} color="#94A3B8" />
                        </div>
                      )}
                    </div>

                    {/* Name, Description & Generator Drop Rates */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '13.5px',
                        fontWeight: '900',
                        color: isDiscovered ? '#1E293B' : '#64748B'
                      }}>
                        {isDiscovered ? (item.nameId || item.name) : '??? Belum Ditemukan'}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: isDiscovered ? '#64748B' : '#94A3B8',
                        marginTop: '2px',
                        lineHeight: '1.3'
                      }}>
                        {isDiscovered ? item.desc : `Gabungkan 2x Lv.${Math.max(1, item.level - 1)} untuk membuka!`}
                      </div>

                      {/* F9: Piece of Cake Generator Drop Rate Table */}
                      {isDiscovered && item.isGenerator && Array.isArray(item.spawns) && totalWeight > 0 && (
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '4px',
                          marginTop: '6px'
                        }}>
                          {item.spawns.map((sp) => {
                            const spItem = ITEMS[sp.id];
                            const pct = Math.round((sp.weight / totalWeight) * 100);
                            return (
                              <span
                                key={sp.id}
                                style={{
                                  fontSize: '9.5px',
                                  fontWeight: '800',
                                  background: '#FEF3C7',
                                  color: '#92400E',
                                  border: '1px solid #FDE68A',
                                  borderRadius: '6px',
                                  padding: '1px 5px'
                                }}
                              >
                                {spItem?.nameId || spItem?.name || sp.id}: {pct}%
                              </span>
                            );
                          })}
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
