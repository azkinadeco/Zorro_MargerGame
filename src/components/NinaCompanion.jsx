import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';

export function NinaCompanion({
  comboCount = 0,
  lastMergeEvent = null,
  totalOrdersServed = 0,
  energy = 100,
  onShowToast,
  onAddCoins
}) {
  const [speech, setSpeech] = useState("Halo! Aku Nina & Zorro. Semangat meracik pesanan kafe hari ini! ☕✨");
  const [isExcited, setIsExcited] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [useRealCatPhoto, setUseRealCatPhoto] = useState(true);
  const [lastCheerCombo, setLastCheerCombo] = useState(0);

  // React to Combos
  useEffect(() => {
    if (comboCount >= 2 && comboCount !== lastCheerCombo) {
      setLastCheerCombo(comboCount);
      setIsExcited(true);
      const cheeringQuotes = [
        `🔥 COMBO x${comboCount}! Tanganmu cepat sekali!`,
        `✨ Hebat! COMBO x${comboCount}! Pelanggan kagum melihatmu!`,
        `⚡ COMBO x${comboCount}! Aroma kue semerbak di seluruh kafe!`,
        `🎉 Luar biasa! COMBO x${comboCount}! Zorro ikut melompat gembira!`
      ];
      setSpeech(cheeringQuotes[Math.min(comboCount - 2, cheeringQuotes.length - 1)]);
      
      const timer = setTimeout(() => {
        setIsExcited(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [comboCount, lastCheerCombo]);

  // React to Merge Events
  useEffect(() => {
    if (lastMergeEvent) {
      setIsExcited(true);
      if (Math.random() > 0.65) {
        const mergeQuotes = [
          "Kue baru berhasil diracik! Cantik sekali! 🧁",
          "Aroma resep barunya wangi banget! 🥧",
          "Gabungan yang sempurna! Lanjutkan! ☕",
          "Purrr! Zorro suka melihat kreasi barumu! 🐾"
        ];
        setSpeech(mergeQuotes[Math.floor(Math.random() * mergeQuotes.length)]);
      }
      const timer = setTimeout(() => setIsExcited(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [lastMergeEvent]);

  // React to Orders Served
  useEffect(() => {
    if (totalOrdersServed > 0) {
      setIsExcited(true);
      setSpeech(`✨ Pesanan ke-${totalOrdersServed} terkirim! Terima kasih bantuannya! 🪙`);
      const timer = setTimeout(() => setIsExcited(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [totalOrdersServed]);

  // Low Energy Advice
  useEffect(() => {
    if (energy < 15 && energy > 0) {
      setSpeech("Kamu kelihatan lelah! Istirahat minum kopi atau ambil energi harian yuk! ☕⚡");
    }
  }, [energy]);

  // Interactive Tap Handler
  const handleTapNina = () => {
    audio.playPurr();
    setIsExcited(true);

    // Spawn floating heart
    const id = Date.now() + Math.random();
    setHearts(prev => [...prev, { id, x: 50 + (Math.random() * 20 - 10) }]);
    setTimeout(() => {
      setHearts(prev => prev.filter(h => h.id !== id));
    }, 1200);

    const friendlyQuotes = [
      "Zorro dan aku selalu mendukungmu! Semangat ya! 💕",
      "Tahukah kamu? Kucing di kafe ini punya makanan kesukaan masing-masing! 🐟",
      "Ini sedikit tip untuk kerja kerasmu! +5 Koin! 🪙",
      "Resep minuman dan kue kita semakin terkenal di kota! 🍰",
      "Purrrr... Zorro sangat suka saat dagunya dielus! 🐾"
    ];
    const picked = friendlyQuotes[Math.floor(Math.random() * friendlyQuotes.length)];
    setSpeech(picked);

    if (picked.includes("+5 Koin") && onAddCoins) {
      onAddCoins(5);
      if (onShowToast) onShowToast("🪙 Tip dari Nina: +5 Koin Kafe!");
    }

    setTimeout(() => setIsExcited(false), 2000);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: '12px',
        bottom: '74px',
        width: '215px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 22,
        pointerEvents: 'auto'
      }}
    >
      {/* Dynamic Interactive Speech Bubble */}
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF9F2 100%)',
          border: '2.5px solid #8B5A2B',
          borderRadius: '16px',
          padding: '8px 12px',
          boxShadow: '0 8px 18px rgba(74, 40, 16, 0.25)',
          marginBottom: '8px',
          position: 'relative',
          animation: isExcited ? 'bouncePurr 0.6s infinite ease-in-out' : 'catBreathe 4s infinite ease-in-out',
          transition: 'transform 0.2s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
          <span style={{ fontSize: '11px', fontWeight: '900', color: '#EA580C', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <span>👩🏻‍🍳 Nina & 🐾 Zoro</span>
            {isExcited && <span>✨</span>}
          </span>
          <button
            onClick={() => setUseRealCatPhoto(!useRealCatPhoto)}
            style={{
              background: useRealCatPhoto ? '#FEF3C7' : '#F1F5F9',
              border: '1.2px solid #D97706',
              borderRadius: '8px',
              padding: '1px 6px',
              fontSize: '9.5px',
              fontWeight: '900',
              color: '#92400E',
              cursor: 'pointer'
            }}
            title="Ganti foto asli / kartun Zoro"
          >
            {useRealCatPhoto ? '📷 Asli' : '🎨 Kartun'}
          </button>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: '11.5px',
            fontWeight: '800',
            color: '#3B1E08',
            lineHeight: '1.35',
            minHeight: '30px'
          }}
        >
          {speech}
        </p>

        {/* Speech triangle pointing down to Nina */}
        <div
          style={{
            position: 'absolute',
            bottom: '-7px',
            left: '46px',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '7px solid #8B5A2B'
          }}
        />
      </div>

      {/* Characters Podium & Display (Enlarged & Grounded) */}
      <div
        onClick={handleTapNina}
        style={{
          position: 'relative',
          width: '100%',
          height: '185px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          userSelect: 'none'
        }}
        title="Ketuk Nina & Zoro untuk berinteraksi! 💕"
      >
        {/* Floating Heart Particles */}
        {hearts.map(h => (
          <div
            key={h.id}
            style={{
              position: 'absolute',
              left: `${h.x}%`,
              bottom: '120px',
              fontSize: '22px',
              animation: 'floatPurr 1.2s forwards',
              pointerEvents: 'none',
              zIndex: 30
            }}
          >
            💖
          </div>
        ))}

        {/* Cafe Counter Bar Surface under characters */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '26px',
            background: 'linear-gradient(180deg, #A76537 0%, #78350F 100%)',
            borderRadius: '12px',
            border: '2px solid #542508',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}
        >
          <span style={{ fontSize: '9.5px', fontWeight: '900', color: '#FEF3C7', letterSpacing: '0.4px' }}>
            ☕ BARISTA COMPANION
          </span>
        </div>

        {/* Grounding Contact Shadow for Nina and Zoro */}
        <div
          style={{
            position: 'absolute',
            bottom: '22px',
            left: '10px',
            width: '90px',
            height: '14px',
            background: 'radial-gradient(ellipse at center, rgba(30, 15, 5, 0.45) 0%, rgba(30, 15, 5, 0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '22px',
            right: '8px',
            width: '96px',
            height: '14px',
            background: 'radial-gradient(ellipse at center, rgba(30, 15, 5, 0.45) 0%, rgba(30, 15, 5, 0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 2
          }}
        />

        {/* Nina The Barista Character Cutout (Enlarged) */}
        <div
          style={{
            position: 'absolute',
            left: '4px',
            bottom: '14px',
            width: '100px',
            height: '175px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 3,
            transform: isExcited ? 'scale(1.08) translateY(-6px)' : 'scale(1)',
            transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          <img
            src="/cats/nina_transparent.png"
            alt="Nina Barista"
            style={{
              maxHeight: '160px',
              maxWidth: '96px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.38))'
            }}
          />

          {/* Barista Apron badge */}
          <div
            style={{
              marginTop: '-8px',
              background: 'linear-gradient(180deg, #EA580C 0%, #C2410C 100%)',
              border: '1.5px solid #7C2D12',
              borderRadius: '10px',
              padding: '2px 8px',
              fontSize: '9.5px',
              fontWeight: '900',
              color: '#FFF',
              boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
              zIndex: 4
            }}
          >
            👩🏻‍🍳 Nina
          </div>
        </div>

        {/* Zoro Tuxedo Cat Companion sitting beside Nina (Enlarged) */}
        <div
          style={{
            position: 'absolute',
            right: '4px',
            bottom: '14px',
            width: '108px',
            height: '115px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            zIndex: 4,
            transform: isExcited ? 'scale(1.1) translateY(-6px)' : 'scale(1)',
            transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
        >
          {useRealCatPhoto ? (
            /* Real Transparent Cutout of Zoro */
            <div
              className="cat-breathe"
              style={{
                width: '102px',
                height: '92px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.38))'
              }}
            >
              <img
                src="/cats/zoro_transparent.png"
                alt="Zoro"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain'
                }}
              />
            </div>
          ) : (
            /* Animated Cute Zoro Tuxedo Sprite */
            <div
              className="tail-swish"
              style={{
                width: '74px',
                height: '74px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: isExcited ? 'bouncePurr 0.5s infinite' : 'catBreathe 3s infinite ease-in-out'
              }}
            >
              <img
                src="/ui/sprites/cat_zorro_tuxedo.png"
                alt="Zorro Tuxedo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
                }}
              />
            </div>
          )}

          {/* Name Tag */}
          <div
            style={{
              marginTop: '-4px',
              background: 'linear-gradient(180deg, #1E293B 0%, #0F172A 100%)',
              border: '1.5px solid #475569',
              borderRadius: '10px',
              padding: '2px 8px',
              fontSize: '9.5px',
              fontWeight: '900',
              color: '#FEF08A',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 5
            }}
          >
            🐾 Zoro
          </div>
        </div>
      </div>
    </div>
  );
}
