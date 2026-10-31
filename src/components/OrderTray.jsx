import React, { useState, useEffect } from 'react';
import { ITEMS } from '../data/items';
import { audio } from '../utils/audio';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Semi3DItemToken } from './Semi3DItemToken';

export function OrderTray({
  orders = [],
  boardItems = [],
  backpack = [],
  onServeOrder,
  onItemHint,
  onShowToast
}) {
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [servedFlight, setServedFlight] = useState(false);
  const [rushTimeLeft, setRushTimeLeft] = useState(() => {
    try {
      const saved = sessionStorage.getItem('zorro_rush_time');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

  // Countdown timer for Rush Hour
  useEffect(() => {
    if (rushTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setRushTimeLeft(prev => {
        const next = Math.max(0, prev - 1);
        try { sessionStorage.setItem('zorro_rush_time', next.toString()); } catch (e) {}
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [rushTimeLeft]);

  // Periodic random Rush Hour trigger every 90 seconds
  useEffect(() => {
    const rushTrigger = setInterval(() => {
      setRushTimeLeft(prev => {
        if (prev <= 0 && Math.random() > 0.4) {
          audio.playMagic();
          return 60; // 60 seconds of 2x coins Rush Hour!
        }
        return prev;
      });
    }, 90000);
    return () => clearInterval(rushTrigger);
  }, []);

  const isRushHour = rushTimeLeft > 0;

  if (!orders || orders.length === 0) return null;

  // Make sure currentOrderIndex is valid
  const activeOrder = orders[currentOrderIndex % orders.length] || orders[0];

  // Helper to count how many of target item are currently active (not cobweb/bubble) on the board or in backpack
  const countItemOnBoard = (targetId) => {
    const onBoard = boardItems.filter(
      item =>
        item &&
        !item.isCobweb &&
        !item.isBubble &&
        (item.id === targetId || item.itemData?.id === targetId || (item.uid && item.uid.startsWith(targetId)))
    ).length;
    const inBag = (backpack || []).filter(
      item =>
        item &&
        !item.isCobweb &&
        !item.isBubble &&
        (item.id === targetId || item.itemData?.id === targetId || (item.uid && item.uid.startsWith(targetId)))
    ).length;
    return onBoard + inBag;
  };

  // Check if active order is ready to serve
  const isReady = Boolean(activeOrder?.items?.every(req => countItemOnBoard(req.itemId) >= (req.count || 1)));

  // Auto-switch to an order that is ready if the current order is not ready
  useEffect(() => {
    if (!orders || orders.length === 0) return;
    const currentIsReady = activeOrder?.items?.every(req => countItemOnBoard(req.itemId) >= (req.count || 1));
    if (!currentIsReady) {
      const readyIdx = orders.findIndex(ord => ord.items?.every(req => countItemOnBoard(req.itemId) >= (req.count || 1)));
      if (readyIdx !== -1 && readyIdx !== (currentOrderIndex % orders.length)) {
        setCurrentOrderIndex(readyIdx);
      }
    }
  }, [boardItems, backpack, orders, currentOrderIndex]);

  const reqItem = activeOrder?.items?.[0];

  // Map item ID to sprite or custom name
  const getItemDetails = (id) => {
    switch (id) {
      case 'cats_4':
        return { name: 'Level 4 Lion Cat "Loki"', sprite: '/ui/sprites/cat_loki_orange.png' };
      case 'cats_5':
      case 'cats_6':
        return { name: 'Level 4 Tuxedo Cat "Zorro"', sprite: '/ui/sprites/cat_zorro_tuxedo.png' };
      case 'cats_3':
        return { name: 'Level 3 Tabby Cat "Thor"', sprite: '/ui/sprites/cat_thor_tabby.png' };
      case 'cats_2':
        return { name: 'Level 2 Sleeping Kitten', sprite: '/ui/sprites/kitten_sleeping.png' };
      case 'cats_1':
        return { name: 'Level 1 Paw Print', sprite: '/ui/sprites/paw_lv1.png' };
      case 'toys_1':
        return { name: 'Level 1 Pastel Yarn Ball', sprite: '/ui/sprites/yarn_ball.png' };
      case 'toys_2':
        return { name: 'Level 2 Feather Wand', sprite: '/ui/sprites/yarn_ball.png' };
      case 'food_1':
        return { name: 'Level 1 Kitten Kibble', sprite: '/ui/sprites/bowl_pink.png' };
      case 'food_2':
        return { name: 'Level 2 Tuna Bowl', sprite: '/ui/sprites/bowl_blue.png' };
      case 'food_3':
        return { name: 'Level 3 Creamy Snack', sprite: '/ui/sprites/bowl_pink.png' };
      case 'care_1':
      case 'care_2':
        return { name: 'Level 2 Care Paw', sprite: '/ui/sprites/paw_lv2.png' };
      default:
        return { name: reqItem?.name || 'Item Pesanan', sprite: '/ui/sprites/cat_zorro_tuxedo.png' };
    }
  };

  const itemDetails = getItemDetails(reqItem?.itemId);
  const currentCount = countItemOnBoard(reqItem?.itemId);

  const handleServe = (e) => {
    if (e) {
      e.stopPropagation();
      if (e.cancelable) e.preventDefault();
    }
    audio.playFanfare();
    setServedFlight(true);
    setTimeout(() => setServedFlight(false), 850);
    if (onServeOrder && activeOrder) {
      onServeOrder(activeOrder, isRushHour ? 2 : 1);
    }
  };

  const handleNextOrder = () => {
    audio.playPop();
    setCurrentOrderIndex(prev => (prev + 1) % orders.length);
  };

  const handlePrevOrder = () => {
    audio.playPop();
    setCurrentOrderIndex(prev => (prev - 1 + orders.length) % orders.length);
  };

  const customerList = [
    {
      name: 'Chloe Mahasiswi',
      role: 'Pelanggan Kafe',
      icon: '👩‍🎓',
      avatarBg: 'linear-gradient(135deg, #FDE68A 0%, #F59E0B 100%)',
      waitingQuote: 'Lagi nugas skripsi, butuh asupan manis & anabul lucu...',
      readyQuote: 'Wah, pesananku kelihatan lezat banget! Cepat kirim ya!',
      satisfiedQuote: 'Makasih banyak! Manisnya pas, semangat nugas lagi! (＾▽＾)'
    },
    {
      name: 'Barista Ken',
      role: 'Head Barista',
      icon: '🧑‍🍳',
      avatarBg: 'linear-gradient(135deg, #FED7AA 0%, #EA580C 100%)',
      waitingQuote: 'Stok etalase kafe tinggal sedikit, tolong bantu siapin!',
      readyQuote: 'Mantap, racikan ini memenuhi standar kafe bintang 5!',
      satisfiedQuote: 'Sempurna! Tamu kafe bakal suka banget! (★ω★)'
    },
    {
      name: 'Sarah Seniman',
      role: 'Ilustrator Komik',
      icon: '🎨',
      avatarBg: 'linear-gradient(135deg, #DDD6FE 0%, #8B5CF6 100%)',
      waitingQuote: 'Lagi cari inspirasi komik kucing lucu hari ini...',
      readyQuote: 'Lucu banget bentuknya! Nggak sabar mau foto & cicip!',
      satisfiedQuote: 'Kreatif dan estetik banget! Inspirasiku mengalir! (*^▽^*)'
    },
    {
      name: 'Nenek Agatha',
      role: 'Penyayang Anabul',
      icon: '👵',
      avatarBg: 'linear-gradient(135deg, #FBCFE8 0%, #EC4899 100%)',
      waitingQuote: 'Cucu nenek mau mampir ke kafe nanti sore...',
      readyQuote: 'Aduh harum sekali! Cucuku pasti gembira!',
      satisfiedQuote: 'Terima kasih banyak ya nak, berkah selalu! (✿◠‿◠)'
    },
    {
      name: 'Maya Pustakawan',
      role: 'Kutu Buku Kafe',
      icon: '📚',
      avatarBg: 'linear-gradient(135deg, #BAE6FD 0%, #0284C7 100%)',
      waitingQuote: 'Membaca buku paling nikmat sambil ditemani camilan hangat.',
      readyQuote: 'Kombinasi yang pas untuk menemani bab terakhir!',
      satisfiedQuote: 'Sangat menenangkan hati... Kafe favoritku! (◕‿◕✿)'
    }
  ];
  const customer = customerList[currentOrderIndex % customerList.length];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      margin: '2px 0 6px 0',
      zIndex: 40,
      pointerEvents: 'auto',
      gap: '5px'
    }}>
      {/* 3-Slot Simultaneous Order Preview Bar */}
      {orders.length > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 248, 240, 0.94)',
          backdropFilter: 'blur(4px)',
          border: '2px solid #8B5A2B',
          borderRadius: '16px',
          padding: '3px 8px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
        }}>
          {orders.slice(0, 3).map((ord, idx) => {
            const isSelected = idx === (currentOrderIndex % orders.length);
            const reqList = ord.items || [];
            const readyCount = reqList.filter(r => countItemOnBoard(r.itemId) >= (r.count || 1)).length;
            const ordReady = reqList.length > 0 && readyCount === reqList.length;

            return (
              <button
                key={ord.id || idx}
                onClick={() => {
                  audio.playPop();
                  setCurrentOrderIndex(idx);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '3px 8px',
                  borderRadius: '10px',
                  border: ord.isVip
                    ? '2px solid #EAB308'
                    : isSelected
                    ? '2px solid #D97706'
                    : '1.5px solid #E2D3C4',
                  background: ord.isVip
                    ? 'linear-gradient(180deg, #FEF9C3 0%, #FDE047 100%)'
                    : isSelected
                    ? 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)'
                    : 'linear-gradient(180deg, #FFFFFF 0%, #F9F3EB 100%)',
                  boxShadow: isSelected ? '0 2px 6px rgba(217, 119, 6, 0.35)' : 'none',
                  cursor: 'pointer',
                  transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                  transition: 'all 0.15s ease'
                }}
                title={`Pesanan #${idx + 1}${ord.isVip ? ' (VIP Sultan)' : ''}`}
              >
                {ord.isVip && <span style={{ fontSize: '11px' }}>👑</span>}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  {reqList.map((r, rIdx) => (
                    <div key={rIdx} style={{ width: '21px', height: '21px', position: 'relative' }}>
                      <Semi3DItemToken
                        item={ITEMS[r.itemId] || { id: r.itemId, name: r.name, category: 'food', level: 1 }}
                        showLevelBadge={false}
                        size="100%"
                      />
                    </div>
                  ))}
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '900',
                  color: isSelected ? '#78350F' : '#8B5A2B'
                }}>
                  #{idx + 1}
                </span>
                <span style={{
                  fontSize: '9.5px',
                  fontWeight: '900',
                  padding: '1px 5px',
                  borderRadius: '6px',
                  background: ordReady ? '#10B981' : '#F97316',
                  color: '#FFFFFF',
                  animation: ordReady ? 'pulseReady 1.6s infinite' : 'none'
                }}>
                  {ordReady ? '✓ Siap' : `${readyCount}/${reqList.length}`}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Order Card Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
      {/* Left Switch Order Arrow */}
      {orders.length > 1 && (
        <button
          onClick={handlePrevOrder}
          style={{
            background: 'rgba(255, 248, 240, 0.9)',
            border: '2px solid #8B5A2B',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginRight: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          title="Pesanan Sebelumnya"
        >
          <ChevronLeft size={16} color="#5C3818" />
        </button>
      )}

      {/* Main Floating Orders Box */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
        border: '3px solid #7C4A26',
        borderRadius: '24px',
        boxShadow: isReady
          ? '0 6px 20px rgba(16, 185, 129, 0.45), 0 0 12px rgba(16, 185, 129, 0.25), inset 0 2px 3px rgba(255,255,255,0.9)'
          : '0 4px 12px rgba(0,0,0,0.18), inset 0 2px 3px rgba(255,255,255,0.9)',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        minWidth: '420px',
        maxWidth: '520px',
        transition: 'all 0.2s ease'
      }}>
        {/* Cat ears on top of order tray */}
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '16px',
          width: '14px',
          height: '11px',
          background: '#FFFDF8',
          borderTop: '2.5px solid #7C4A26',
          borderLeft: '2.5px solid #7C4A26',
          transform: 'rotate(-25deg)',
          borderTopLeftRadius: '5px'
        }} />
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '16px',
          width: '14px',
          height: '11px',
          background: '#FFFDF8',
          borderTop: '2.5px solid #7C4A26',
          borderRight: '2.5px solid #7C4A26',
          transform: 'rotate(25deg)',
          borderTopRightRadius: '5px'
        }} />

        {/* Floating Rush Hour 2x Badge */}
        {isRushHour && (
          <div style={{
            position: 'absolute',
            top: '-25px',
            right: '10px',
            background: 'linear-gradient(180deg, #EF4444 0%, #B91C1C 100%)',
            border: '2px solid #FEE2E2',
            borderRadius: '14px',
            padding: '2px 10px',
            color: '#FFFFFF',
            fontSize: '11px',
            fontWeight: '900',
            boxShadow: '0 4px 10px rgba(220, 38, 38, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            animation: 'pulseReady 1.4s infinite',
            zIndex: 20
          }}>
            <span>🔥 JAM SIBUK: 2x KOIN ({rushTimeLeft}s)</span>
          </div>
        )}

        {/* Top Floating "Orders" Pill Badge */}
        <div style={{
          position: 'absolute',
          top: '-14px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, #FFFDF8 0%, #F5E3C9 100%)',
          border: '2px solid #7C4A26',
          borderRadius: '16px',
          padding: '2px 20px',
          fontSize: '13px',
          fontWeight: '900',
          color: '#4A2810',
          boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
          letterSpacing: '0.5px'
        }}>
          Orders
        </div>

        {/* Customer Avatar on Left (with Expression Mood Badges) */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '18px',
          background: customer.avatarBg || 'linear-gradient(180deg, #FCEED8 0%, #E6CCA8 100%)',
          border: '2px solid #8B5A2B',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          position: 'relative',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none'
        }}
        title={`Pelanggan: ${customer.name} (${customer.role})`}
        >
          <span style={{ fontSize: '32px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
            {customer.icon || '🧑'}
          </span>
          {/* Reaction Mood Badge */}
          <div style={{
            position: 'absolute',
            bottom: '-4px',
            background: servedFlight ? '#10B981' : isReady ? '#F59E0B' : '#6B7280',
            color: '#FFFFFF',
            fontSize: '8.5px',
            fontWeight: '900',
            padding: '1px 5px',
            borderRadius: '8px',
            border: '1px solid #FFFFFF',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 4px rgba(0,0,0,0.25)'
          }}>
            {servedFlight ? '💖 Puas!' : isReady ? '🤩 Siap!' : '⏳ Nunggu'}
          </div>
        </div>

        {/* Requested Item Icons (Supports 1 or 2 Combo Items Side-by-Side) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {(activeOrder.items || []).map((req, rIdx) => {
            const cnt = countItemOnBoard(req.itemId);
            const itemReady = cnt >= (req.count || 1);
            const det = getItemDetails(req.itemId);
            return (
              <div
                key={rIdx}
                onClick={() => onItemHint && onItemHint(req.itemId)}
                style={{
                  width: (activeOrder.items?.length || 1) > 1 ? '54px' : '60px',
                  height: (activeOrder.items?.length || 1) > 1 ? '54px' : '60px',
                  borderRadius: '16px',
                  background: '#FFF6EA',
                  border: itemReady ? '2.5px solid #10B981' : '2px dashed #C49666',
                  boxShadow: itemReady ? '0 0 10px rgba(16, 185, 129, 0.4), inset 0 1px 3px rgba(0,0,0,0.1)' : 'inset 0 1px 3px rgba(0,0,0,0.1)',
                  overflow: 'visible',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                title={`Ketuk untuk sorot ${det.name} di papan`}
              >
                <Semi3DItemToken
                  item={ITEMS[req.itemId] || { id: req.itemId, name: det.name, category: 'food', level: 1 }}
                  showLevelBadge={false}
                  size="92%"
                />

                {/* Count Badge (e.g. 1/1 or 0/1) */}
                <div style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  background: itemReady ? '#10B981' : '#F97316',
                  color: '#FFF',
                  fontSize: '10px',
                  fontWeight: '900',
                  padding: '1px 5px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
                  zIndex: 10
                }}>
                  {itemReady ? '✓' : `${cnt}/${req.count || 1}`}
                </div>
              </div>
            );
          })}
        </div>

        {/* Middle Info: Requested Name & Customer Dynamic Quote */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {activeOrder.isVip && (
              <span style={{
                fontSize: '10px',
                fontWeight: '900',
                color: '#78350F',
                background: 'linear-gradient(180deg, #FEF08A 0%, #F59E0B 100%)',
                border: '1px solid #B45309',
                padding: '1px 6px',
                borderRadius: '8px'
              }}>
                👑 VIP SULTAN
              </span>
            )}
            <span style={{
              fontSize: '13.5px',
              fontWeight: '900',
              color: '#3B1E08',
              letterSpacing: '0.2px',
              lineHeight: '1.2'
            }}>
              {(activeOrder.items || []).map(r => ITEMS[r.itemId]?.nameId || getItemDetails(r.itemId).name).join(' + ')}
            </span>
            <span style={{ fontSize: '10px', fontWeight: '800', color: '#EA580C', background: '#FEF3C7', padding: '1px 6px', borderRadius: '8px' }}>
              {customer.name}
            </span>
          </div>

          <div style={{ fontSize: '10px', fontStyle: 'italic', color: '#78350F', fontWeight: '600' }}>
            "{servedFlight ? customer.satisfiedQuote : isReady ? customer.readyQuote : customer.waitingQuote}"
          </div>

          <div style={{
            fontSize: '11px',
            fontWeight: '700',
            color: '#8A5833',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>Hadiah:</span>
            <span style={{ color: isRushHour ? '#DC2626' : '#D97706', fontWeight: '900' }}>
              🪙 +{(activeOrder.rewardCoins || 250) * (isRushHour ? 2 : 1)} {isRushHour ? '🔥 (2x!)' : ''}
            </span>
            <span style={{ color: '#E11D48', fontWeight: '900' }}>⭐ +{activeOrder.rewardStars || 1}</span>
            {activeOrder.rewardGems > 0 && (
              <span style={{ color: '#0284C7', fontWeight: '900' }}>💎 +{activeOrder.rewardGems}</span>
            )}
          </div>
        </div>

        {/* Action Button: SERVE (Ready) or NOT READY (Informative Hint) */}
        <div>
          {isReady ? (
            <button
              type="button"
              onClick={handleServe}
              className="mockup-action-btn shimmer-badge order-ready-pulse"
              style={{
                background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                border: '2.5px solid #047857',
                borderBottom: '4px solid #064E3B',
                borderRadius: '16px',
                padding: '8px 20px',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(5, 150, 105, 0.55), inset 0 2px 2px rgba(255,255,255,0.7)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 60,
                pointerEvents: 'auto',
                touchAction: 'manipulation',
                userSelect: 'none'
              }}
            >
              <Check size={17} strokeWidth={3} />
              <span>KIRIM SELESAI</span>
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  audio.playPop();
                  const missing = (activeOrder.items || []).find(r => countItemOnBoard(r.itemId) < (r.count || 1));
                  const missingDef = missing ? (ITEMS[missing.itemId] || getItemDetails(missing.itemId)) : null;
                  const missingName = missingDef?.nameId || missingDef?.name || 'item';
                  if (onShowToast) {
                    onShowToast(`Pesanan butuh ${missingName}. Gabungkan item di papan atau gunakan tombol "⚡ Penuhi Instan"! 🐾`);
                  }
                  if (onItemHint && missing?.itemId) {
                    onItemHint(missing.itemId);
                  }
                }}
                className="mockup-action-btn"
                style={{
                  background: 'linear-gradient(180deg, #FDBA74 0%, #EA580C 100%)',
                  border: '1.5px solid #C2410C',
                  borderBottom: '3px solid #9A3412',
                  borderRadius: '14px',
                  padding: '6px 10px',
                  color: '#FFFFFF',
                  fontSize: '10.5px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(234, 88, 12, 0.35)',
                  zIndex: 60,
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
                }}
                title="Ketuk untuk melihat panduan item yang dibutuhkan"
              >
                <span>🔍</span>
                <span>Cari</span>
              </button>

              <button
                type="button"
                onClick={handleServe}
                className="mockup-action-btn shimmer-badge"
                style={{
                  background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                  border: '2px solid #047857',
                  borderBottom: '3.5px solid #064E3B',
                  borderRadius: '14px',
                  padding: '6px 12px',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: '0 3px 8px rgba(5, 150, 105, 0.45)',
                  zIndex: 60,
                  pointerEvents: 'auto',
                  touchAction: 'manipulation',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Kirim dan penuhi pesanan sekarang secara instan"
              >
                <Check size={14} strokeWidth={3} />
                <span>⚡ Kirim Langsung</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Switch Order Arrow */}
      {orders.length > 1 && (
        <button
          onClick={handleNextOrder}
          style={{
            background: 'rgba(255, 248, 240, 0.9)',
            border: '2px solid #8B5A2B',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            marginLeft: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
          title="Pesanan Selanjutnya"
        >
          <ChevronRight size={16} color="#5C3818" />
        </button>
      )}

      {/* Served Celebration Overlay */}
      {servedFlight && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.95) 0%, rgba(5, 150, 105, 0.95) 100%)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          color: '#FFF',
          fontSize: '15px',
          fontWeight: '900',
          zIndex: 40,
          animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <span>✨ PESANAN BERHASIL DISAJIKAN!</span>
          <span style={{ background: '#FFF', color: '#047857', padding: '2px 10px', borderRadius: '12px', fontSize: '12px' }}>
            +{(activeOrder.rewardCoins || 250) * (isRushHour ? 2 : 1)} 🪙
          </span>
        </div>
      )}
      </div>
    </div>
  );
}
