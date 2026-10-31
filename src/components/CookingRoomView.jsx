import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';
import { safeConfetti as confetti } from '../utils/safeConfetti';
import { Sparkles, Flame, Check, Utensils, Clock, Award, Star, Lock } from 'lucide-react';

export function CookingRoomView({
  level = 18,
  energy = 100,
  onConsumeEnergy,
  onBakeComplete,
  onAddCoins,
  onAddGems,
  onAddStars,
  onAddEnergy,
  onSpawnItemOnBoard,
  onShowToast
}) {
  const [selectedRecipe, setSelectedRecipe] = useState('meowffins');
  const [selectedChef, setSelectedChef] = useState('zorro'); // 'zorro' | 'thor' | 'loki'
  const [bakingState, setBakingState] = useState('ready'); // 'ready' | 'whisking' | 'baking' | 'done'
  const [whiskCount, setWhiskCount] = useState(0);
  const [isWhisking, setIsWhisking] = useState(false);
  const [unlockedRecipes, setUnlockedRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_unlocked_recipes');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [activeSpeech, setActiveSpeech] = useState(null);
  const [ninaSpeech, setNinaSpeech] = useState(null);
  const [isCatPurring, setIsCatPurring] = useState(false);
  const [catHearts, setCatHearts] = useState([]);

  // Persisted Recipe Mastery (bake count per recipe)
  const [recipeMastery, setRecipeMastery] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_recipe_mastery');
      return saved ? JSON.parse(saved) : {
        meowffins: 3,
        croissant: 2,
        waffle: 1,
        tuxedo_tart: 0,
        catnip_cake: 0
      };
    } catch (e) {
      return { meowffins: 3, croissant: 2, waffle: 1, tuxedo_tart: 0, catnip_cake: 0 };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zorro_recipe_mastery', JSON.stringify(recipeMastery));
    } catch (e) {}
  }, [recipeMastery]);

  const chefs = {
    zorro: {
      name: 'Zorro Tuxedo',
      icon: '🐱',
      bonus: '+25% Koin Bonus',
      color: '#312E81'
    },
    thor: {
      name: 'Thor Tabby',
      icon: '🐯',
      bonus: 'Whisk 2x Lebih Cepat',
      color: '#B45309'
    },
    loki: {
      name: 'Loki Lion',
      icon: '🦁',
      bonus: '+20 ⚡ Energi Ekstra',
      color: '#EA580C'
    }
  };

  const recipes = {
    meowffins: {
      reqLevel: 1,
      name: 'Level 1: Meowffins Madu',
      title: 'Meowffins Madu',
      desc: 'Muffin empuk dengan topping jejak cakar gula kelapa & madu.',
      ingredients: 'Tepung Paw + Telur Segar + Madu Hutan',
      energyCost: 5,
      rewardCoins: 150,
      rewardEnergy: 15,
      whiskTarget: 4
    },
    croissant: {
      reqLevel: 1,
      name: "Level 2: Cat's Paw Croissant",
      title: "Paw Croissant",
      desc: 'Croissant renyah berlapis mentega keemasan berbentuk tapak kaki kucing.',
      ingredients: 'Mentega Emas + Adonan Berlapis',
      energyCost: 8,
      rewardCoins: 350,
      rewardEnergy: 25,
      whiskTarget: 6
    },
    waffle: {
      reqLevel: 1,
      name: 'Level 3: Honey Paw Waffle',
      title: 'Honey Paw Waffle',
      desc: 'Waffle renyah madu dengan cetakan muka anabul imut.',
      ingredients: 'Susu Murni + Sirup Maple + Gula Palem',
      energyCost: 10,
      rewardCoins: 500,
      rewardEnergy: 35,
      whiskTarget: 6
    },
    tuxedo_tart: {
      reqLevel: 1,
      name: 'Level 4: Tuxedo Dark Tart',
      title: 'Tuxedo Dark Tart',
      desc: 'Tart keju krim cokelat hitam mewah resep eksklusif Zorro.',
      ingredients: 'Cokelat Belgia + Keju Mascarpone + Vanila',
      energyCost: 12,
      rewardCoins: 850,
      rewardEnergy: 50,
      whiskTarget: 8
    },
    catnip_cake: {
      reqLevel: 1,
      name: 'Level 5: Royal Catnip Shortcake',
      title: 'Catnip Shortcake',
      desc: 'Kue bolu stroberi catnip istana dengan krim manis lembut.',
      ingredients: 'Stroberi Segar + Daun Catnip Unggul + Krim Kocok',
      energyCost: 15,
      rewardCoins: 1400,
      rewardEnergy: 75,
      whiskTarget: 10
    }
  };

  const getMasteryRank = (count = 0) => {
    if (count >= 12) return { rank: 3, label: 'Gold Master Chef', stars: '⭐⭐⭐', coinBonus: 0.5, gemBonus: 1 };
    if (count >= 7) return { rank: 2, label: 'Silver Baker', stars: '⭐⭐', coinBonus: 0.3, gemBonus: 0 };
    if (count >= 3) return { rank: 1, label: 'Bronze Apprentice', stars: '⭐', coinBonus: 0.15, gemBonus: 0 };
    return { rank: 0, label: 'Pemula', stars: '☆', coinBonus: 0, gemBonus: 0 };
  };

  const currentRecipe = recipes[selectedRecipe] || recipes.meowffins;
  const currentBakeCount = recipeMastery[selectedRecipe] || 0;
  const currentMastery = getMasteryRank(currentBakeCount);
  const isLocked = level < currentRecipe.reqLevel && !unlockedRecipes.includes(selectedRecipe);

  const handleWhisk = () => {
    if (bakingState === 'ready') {
      const reqEnergy = currentRecipe.energyCost || 5;
      if (energy < reqEnergy) {
        audio.playError();
        if (onShowToast) onShowToast(`Energi tidak cukup untuk memanggang ${currentRecipe.title}! Butuh ${reqEnergy} ⚡`);
        return;
      }
      if (onConsumeEnergy) {
        onConsumeEnergy(reqEnergy);
      }
    }

    if (isLocked) {
      audio.playFanfare();
      const nextUnlocked = [...unlockedRecipes, selectedRecipe];
      setUnlockedRecipes(nextUnlocked);
      try { localStorage.setItem('zorro_unlocked_recipes', JSON.stringify(nextUnlocked)); } catch (e) {}
      if (onShowToast) onShowToast(`✨ Resep "${currentRecipe.title}" Berhasil Dibuka! Selamat memanggang! 🧁`);
    }

    audio.playPop();
    setIsWhisking(true);
    setTimeout(() => setIsWhisking(false), 350);

    // Thor sous-chef gives double whisk step!
    const step = selectedChef === 'thor' ? 2 : 1;
    const nextCount = Math.min(currentRecipe.whiskTarget, whiskCount + step);
    setWhiskCount(nextCount);

    if (nextCount >= currentRecipe.whiskTarget) {
      setBakingState('baking');
      audio.playBake();
      if (onShowToast) onShowToast("Adonan sempurna! Memanggang di oven paw ♨️");

      setTimeout(() => {
        setBakingState('done');
        audio.playFanfare();
        confetti({ particleCount: 40, spread: 70, origin: { x: 0.75, y: 0.5 } });
      }, 1500);
    } else {
      setBakingState('whisking');
    }
  };

  const handleInstantBake = () => {
    audio.playFanfare();
    confetti({ particleCount: 50, spread: 80, origin: { x: 0.75, y: 0.5 } });
    setWhiskCount(currentRecipe.whiskTarget);
    setBakingState('done');
    if (onShowToast) onShowToast(`⚡ Kilat! ${currentRecipe.title} selesai dipanggang sempurna! 🧁`);
  };

  const handleCollect = () => {
    audio.playFanfare();
    confetti({ particleCount: 55, spread: 85, origin: { x: 0.75, y: 0.5 } });

    // Calculate payouts with chef + mastery bonus
    const mastery = currentMastery;
    let baseCoins = currentRecipe.rewardCoins;
    let baseEnergy = currentRecipe.rewardEnergy;

    if (selectedChef === 'zorro') {
      baseCoins = Math.round(baseCoins * 1.25);
    } else if (selectedChef === 'loki') {
      baseEnergy += 20;
    }

    // Apply mastery multiplier
    const totalCoins = Math.round(baseCoins * (1 + mastery.coinBonus));
    const totalEnergy = baseEnergy;

    if (onAddCoins) onAddCoins(totalCoins);
    if (onAddEnergy) onAddEnergy(totalEnergy);
    if (onAddStars) onAddStars(1);
    if (mastery.gemBonus > 0 && onAddGems) {
      onAddGems(mastery.gemBonus);
    }

    // Increase mastery count
    const nextCount = currentBakeCount + 1;
    setRecipeMastery(prev => ({
      ...prev,
      [selectedRecipe]: nextCount
    }));
    if (onBakeComplete) {
      onBakeComplete();
    }

    const newMastery = getMasteryRank(nextCount);
    if (newMastery.rank > mastery.rank) {
      confetti({ particleCount: 75, spread: 100, origin: { x: 0.75, y: 0.4 } });
      if (onShowToast) {
        onShowToast(`🏆 Resep ${currentRecipe.title} naik ke ${newMastery.stars} ${newMastery.label}! Bonus +1 ⭐ Bintang & Koin!`);
      }
    } else {
      if (onShowToast) {
        onShowToast(`Kue ${currentRecipe.title} Matang! +${totalCoins} 🪙 +1 ⭐ Bintang & +${totalEnergy} ⚡${mastery.gemBonus ? ' +1 💎' : ''}`);
      }
    }

    // P3: Delivery fresh pastry directly to Merge Board!
    const pastryItemMap = {
      meowffins: 'food_2',
      croissant: 'food_3',
      waffle: 'food_4',
      tuxedo_tart: 'food_5',
      catnip_cake: 'food_6'
    };
    const bakedItemId = pastryItemMap[selectedRecipe] || 'food_2';
    if (onSpawnItemOnBoard) {
      onSpawnItemOnBoard(bakedItemId);
    }

    setBakingState('ready');
    setWhiskCount(0);
  };

  const chefPhotos = {
    zorro: '/cats/zoro_transparent.png',
    thor: '/cats/thor_transparent.png',
    loki: '/cats/loki_transparent.png'
  };

  const handleNinaClick = () => {
    audio.playPop();
    const ninaQuotes = [
      "Kue buatan kita selalu bikin anabul kafe bahagia! ✨",
      "Resep kue yang harum butuh sentuhan cinta dan mentega leleh! 🧈",
      `Wah, ${chefs[selectedChef].name} siap membantu memanggang hari ini! 🐱`,
      "Ayo kita kocok adonannya sampai mengembang sempurna! 🧁",
      "Setelah dipanggang di oven paw, kuenya lembut banget lho!"
    ];
    setNinaSpeech(ninaQuotes[Math.floor(Math.random() * ninaQuotes.length)]);
    setTimeout(() => setNinaSpeech(null), 3200);
  };

  const handleCatClick = () => {
    audio.playMeow(selectedChef);
    audio.playPurr();
    setIsCatPurring(true);

    const hId = Date.now();
    setCatHearts(prev => [...prev.slice(-3), { id: hId, x: 45 + Math.random() * 20 }]);
    setTimeout(() => {
      setCatHearts(prev => prev.filter(h => h.id !== hId));
    }, 1200);

    setTimeout(() => setIsCatPurring(false), 1200);

    const quotes = {
      zorro: [
        "Meooow! (Zorro mencium aroma vanila harum dari oven!) 🐾",
        "*Zorro mengibaskan ekornya menunggu kue matang dengan sabar* 🍰",
        "Purrr... Zorro siap jadi kepala pencicip utama Nina! 🧁",
        "Kue buatan Nina adalah yang terlezat di kerajaan kucing! ✨"
      ],
      thor: [
        "Purrr! Thor siap bantu mengocok adonan 2x lebih cepat! 🐯",
        "Aroma selai stroberi dan krimnya menggugah selera! 🍓",
        "*Thor mendengkur keras sambil mengawasi api oven* ♨️"
      ],
      loki: [
        "Meoooww! Loki si koki singa oren siap melahap kue hangat! 🦁",
        "Semangat memanggang! Energi kita bertambah banyak! ⚡",
        "*Loki melompat riang di samping nampan kue* 🐾"
      ]
    };
    const catList = quotes[selectedChef] || quotes.zorro;
    setActiveSpeech(catList[Math.floor(Math.random() * catList.length)]);
    setTimeout(() => setActiveSpeech(null), 3200);
  };

  const whiskProgress = Math.min(100, Math.round((whiskCount / currentRecipe.whiskTarget) * 100));

  return (
    <div style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundImage: 'url(/backgrounds/cooking_room.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      overflow: 'hidden'
    }}>
      {/* Nina Baker Cutout (Human Scale, Grounded on Kitchen Floor) */}
      <div
        onClick={handleNinaClick}
        style={{
          position: 'absolute',
          left: '14%',
          bottom: '28px',
          width: '230px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 20,
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        className="cat-breathe"
        title="Ketuk Nina untuk berbincang 👩‍🍳"
      >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '310px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 14px 24px rgba(0,0,0,0.48))'
        }}>
          <img
            src="/cats/nina_transparent.png"
            alt="Nina Koki"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />

          {/* Steaming Mixing Whisk / Spoon Tool in Hand */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            right: '10px',
            fontSize: '24px',
            filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))',
            animation: isWhisking ? 'wobble-spawner 0.3s infinite' : 'bouncePurr 2.5s infinite ease-in-out'
          }}>
            🥣
          </div>
        </div>

        {/* Baker Name Tag Badge */}
        <div style={{
          marginTop: '-12px',
          background: 'linear-gradient(180deg, #EA580C 0%, #C2410C 100%)',
          border: '2px solid #7C2D12',
          borderRadius: '12px',
          padding: '3px 12px',
          fontSize: '11px',
          fontWeight: '900',
          color: '#FFF',
          boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
          zIndex: 22,
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>👩‍🍳</span>
          <span>Nina Koki</span>
        </div>
      </div>

      {/* Floating Nina Speech Bubble */}
      {ninaSpeech && (
        <div style={{
          position: 'absolute',
          left: '24%',
          bottom: '340px',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8F0 100%)',
          border: '2.5px solid #8B5A2B',
          borderRadius: '18px',
          padding: '8px 14px',
          maxWidth: '240px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          zIndex: 35,
          animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '900', color: '#D97706', marginBottom: '2px' }}>
            Nina Koki 👩‍🍳
          </div>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#3B1E08', lineHeight: '1.3' }}>
            {ninaSpeech}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '30%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '8px solid #8B5A2B'
          }} />
        </div>
      )}

      {/* Sous-Chef Cat on Kitchen Stool / Floor */}
      <div
        onClick={handleCatClick}
        style={{
          position: 'absolute',
          left: '37%',
          bottom: '30px',
          width: '190px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 21,
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        className={isCatPurring ? 'bouncePurr' : 'cat-breathe'}
        title={`Ketuk ${chefs[selectedChef].name} untuk mengelus 🐾`}
      >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '210px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.45))'
        }}>
          <img
            src={chefPhotos[selectedChef] || chefPhotos.zorro}
            alt={chefs[selectedChef].name}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain'
            }}
          />

          {/* Floating Hearts */}
          {catHearts.map(h => (
            <div
              key={h.id}
              style={{
                position: 'absolute',
                top: '15px',
                left: `${h.x}%`,
                fontSize: '22px',
                animation: 'floatUpPurr 1.2s forwards',
                pointerEvents: 'none'
              }}
            >
              💖
            </div>
          ))}

          {/* Mini Chef Toque / Crown Badge */}
          <div style={{
            position: 'absolute',
            top: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '18px',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            animation: 'bouncePurr 2s infinite ease-in-out'
          }}>
            👨‍🍳
          </div>
        </div>

        {/* Sous-Chef Cat Badge */}
        <div style={{
          marginTop: '-10px',
          background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
          border: '2px solid #92400E',
          borderRadius: '12px',
          padding: '2px 10px',
          fontSize: '10.5px',
          fontWeight: '900',
          color: '#FFF',
          boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
          zIndex: 22,
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>{chefs[selectedChef].icon}</span>
          <span>{chefs[selectedChef].name.split(' ')[0]}</span>
        </div>
      </div>

      {/* Floating Cat Speech Bubble */}
      {activeSpeech && (
        <div style={{
          position: 'absolute',
          left: '46%',
          bottom: '240px',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #FFF8F0 100%)',
          border: '2.5px solid #8B5A2B',
          borderRadius: '18px',
          padding: '8px 14px',
          maxWidth: '240px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
          zIndex: 35,
          animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <div style={{ fontSize: '11px', fontWeight: '900', color: '#EA580C', marginBottom: '2px' }}>
            {chefs[selectedChef].name} 🐾
          </div>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#3B1E08', lineHeight: '1.3' }}>
            {activeSpeech}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '8px solid #8B5A2B'
          }} />
        </div>
      )}

      {/* Top-Right Recipe & Baking Station Card */}
      <div style={{
        position: 'absolute',
        right: '4%',
        top: '12%',
        width: '415px',
        background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
        border: '3.5px solid #8B5A2B',
        borderRadius: '24px',
        boxShadow: '0 12px 32px rgba(0,0,0,0.35), inset 0 2px 4px rgba(255,255,255,0.9)',
        padding: '12px 16px',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        gap: '9px'
      }}>
        {/* Title & VIP Gourmet Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #E5C39E',
          paddingBottom: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '20px' }}>🧁</span>
            <div>
              <div style={{ fontSize: '14.5px', fontWeight: '900', color: '#3B1E08' }}>
                Dapur Kue Nina & Kucing
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#D97706' }}>
                👑 Pesanan VIP Kafe: Dapat +1 ⭐ Bintang
              </div>
            </div>
          </div>
          <span style={{
            fontSize: '11px',
            fontWeight: '900',
            color: '#047857',
            background: '#D1FAE5',
            padding: '2px 8px',
            borderRadius: '10px',
            border: '1px solid #10B981'
          }}>
            +1 ⭐ Bintang
          </span>
        </div>

        {/* Sous-Chef Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <div style={{ fontSize: '10.5px', fontWeight: '900', color: '#78350F', display: 'flex', justifyContent: 'space-between' }}>
            <span>PILIH SOUS-CHEF:</span>
            <span style={{ color: '#059669' }}>{chefs[selectedChef].bonus}</span>
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            {Object.entries(chefs).map(([k, c]) => {
              const isSel = selectedChef === k;
              return (
                <button
                  key={k}
                  onClick={() => {
                    audio.playPop();
                    setSelectedChef(k);
                  }}
                  style={{
                    flex: 1,
                    background: isSel ? 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)' : '#FFF',
                    border: isSel ? '2px solid #D97706' : '1.5px solid #FED7AA',
                    borderRadius: '10px',
                    padding: '4px 4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    fontSize: '11px',
                    fontWeight: '900',
                    color: isSel ? '#78350F' : '#6B401D',
                    boxShadow: isSel ? '0 2px 4px rgba(217, 119, 6, 0.25)' : 'none'
                  }}
                >
                  <span>{c.icon}</span>
                  <span>{c.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recipe Selection Chips */}
        <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '2px' }}>
          {Object.entries(recipes).map(([key, rec]) => {
            const isSelected = selectedRecipe === key;
            const bCount = recipeMastery[key] || 0;
            const mRank = getMasteryRank(bCount);
            const locked = level < rec.reqLevel && !unlockedRecipes.includes(key);

            return (
              <button
                key={key}
                onClick={() => {
                  audio.playPop();
                  setSelectedRecipe(key);
                  setBakingState('ready');
                  setWhiskCount(0);
                }}
                style={{
                  flexShrink: 0,
                  background: isSelected ? 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)' : '#FFF',
                  color: isSelected ? '#FFF' : locked ? '#9CA3AF' : '#78350F',
                  border: isSelected ? '2px solid #9A3412' : '1.5px solid #FED7AA',
                  borderRadius: '10px',
                  padding: '4px 7px',
                  fontSize: '10.5px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                  boxShadow: isSelected ? '0 2px 4px rgba(234, 88, 12, 0.3)' : 'none'
                }}
              >
                {locked && <Lock size={10} color="#9CA3AF" />}
                <span>{rec.title}</span>
                {mRank.rank > 0 && (
                  <span style={{ fontSize: '9px' }}>{mRank.stars}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Recipe Details & Mastery Card */}
        <div style={{
          background: '#FFF9F0',
          border: '1.5px solid #E5C39E',
          borderRadius: '14px',
          padding: '8px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '900', color: '#3B1E08' }}>
              {currentRecipe.name}
            </span>
            <span style={{
              fontSize: '10.5px',
              fontWeight: '900',
              color: currentMastery.rank >= 3 ? '#B45309' : '#059669',
              background: '#FEF3C7',
              padding: '1px 6px',
              borderRadius: '8px'
            }}>
              {currentMastery.stars} {currentMastery.label} ({currentBakeCount}x)
            </span>
          </div>

          <div style={{ fontSize: '10.5px', fontWeight: '700', color: '#6B401D', lineHeight: '1.25' }}>
            {currentRecipe.desc}
          </div>

          <div style={{
            fontSize: '10.5px',
            fontWeight: '800',
            color: '#059669',
            marginTop: '2px',
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <span>Bahan: {currentRecipe.ingredients}</span>
            <span>🪙 +{Math.round(currentRecipe.rewardCoins * (1 + currentMastery.coinBonus))} | ⚡ +{currentRecipe.rewardEnergy}</span>
          </div>
        </div>

        {/* Minigame Interactive Action Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
          {bakingState === 'ready' && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {isLocked ? (
                <button
                  onClick={() => {
                    audio.playFanfare();
                    const nextUnlocked = [...unlockedRecipes, selectedRecipe];
                    setUnlockedRecipes(nextUnlocked);
                    try { localStorage.setItem('zorro_unlocked_recipes', JSON.stringify(nextUnlocked)); } catch (e) {}
                    if (onShowToast) onShowToast(`✨ Resep "${currentRecipe.title}" Berhasil Dibuka! Selamat memanggang! 🧁`);
                  }}
                  className="mockup-action-btn shimmer-badge"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                    border: '2.5px solid #047857',
                    borderRadius: '14px',
                    padding: '9px 16px',
                    color: '#FFFFFF',
                    fontSize: '12.5px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 10px rgba(5, 150, 105, 0.4)'
                  }}
                >
                  <Sparkles size={16} />
                  <span>🔓 Buka Resep Ini Sekarang</span>
                </button>
              ) : (
              <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                <button
                  onClick={handleWhisk}
                  className="mockup-action-btn"
                  style={{
                    flex: 1,
                    background: 'linear-gradient(180deg, #FDBA74 0%, #EA580C 100%)',
                    border: '2.5px solid #9A3412',
                    borderRadius: '14px',
                    padding: '9px 12px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 10px rgba(234, 88, 12, 0.4)'
                  }}
                >
                  <Utensils size={15} className={isWhisking ? 'whisk-spin-active' : ''} />
                  <span>Kocok Adonan (-{currentRecipe.energyCost || 5} ⚡)</span>
                </button>

                <button
                  onClick={handleInstantBake}
                  className="mockup-action-btn shimmer-badge"
                  style={{
                    background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                    border: '2.5px solid #047857',
                    borderRadius: '14px',
                    padding: '9px 14px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 10px rgba(5, 150, 105, 0.4)'
                  }}
                  title="Panggang instan tanpa kocok adonan"
                >
                  <Sparkles size={15} />
                  <span>⚡ Panggang Kilat</span>
                </button>
              </div>
              )}

              {energy < (currentRecipe.energyCost || 5) && onAddEnergy && (
                <button
                  onClick={() => {
                    audio.playPop();
                    onAddEnergy(25);
                    if (onShowToast) onShowToast("⚡ +25 Energi ditambahkan ke dapur!");
                  }}
                  className="mockup-action-btn"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(180deg, #FDE047 0%, #EAB308 100%)',
                    border: '1.5px solid #CA8A04',
                    borderRadius: '12px',
                    padding: '6px 12px',
                    color: '#713F12',
                    fontSize: '11px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>⚡ Energi Kurang? Isi +25 Energi Gratis</span>
                </button>
              )}
            </div>
          )}

          {bakingState === 'whisking' && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {/* Whisk Progress Bar */}
              <div style={{
                width: '100%',
                height: '8px',
                background: '#E5E7EB',
                borderRadius: '6px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${whiskProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #F59E0B 0%, #EA580C 100%)',
                  borderRadius: '6px',
                  transition: 'width 0.2s ease'
                }} />
              </div>

              <button
                onClick={handleWhisk}
                className="mockup-action-btn"
                style={{
                  width: '100%',
                  background: 'linear-gradient(180deg, #FDBA74 0%, #EA580C 100%)',
                  border: '2.5px solid #9A3412',
                  borderRadius: '14px',
                  padding: '9px 16px',
                  color: '#FFFFFF',
                  fontSize: '12.5px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Utensils size={15} className={isWhisking ? 'whisk-spin-active' : ''} />
                <span>Aduk Cepat! ({whiskCount}/{currentRecipe.whiskTarget})</span>
              </button>
            </div>
          )}

          {bakingState === 'baking' && (
            <div style={{
              width: '100%',
              background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)',
              border: '2px solid #F59E0B',
              borderRadius: '14px',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#92400E',
              fontWeight: '900',
              fontSize: '12.5px',
              boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Flame size={18} color="#EA580C" style={{ animation: 'bouncePurr 1s infinite' }} />
              <span>Memanggang di Oven Paw...</span>
              <span className="cozy-steam-particle" style={{ fontSize: '15px' }}>♨️</span>
              <span className="cozy-steam-particle" style={{ fontSize: '13px', animationDelay: '0.4s' }}>☁️</span>
            </div>
          )}

          {bakingState === 'done' && (
            <button
              onClick={handleCollect}
              className="mockup-action-btn"
              style={{
                width: '100%',
                background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
                border: '2.5px solid #047857',
                borderRadius: '14px',
                padding: '10px 16px',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 6px 16px rgba(5, 150, 105, 0.45)',
                animation: 'pulseReady 1.6s infinite'
              }}
            >
              <Check size={17} strokeWidth={3} />
              <span>Ambil Kue Hangat! (Klaim Bonus)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
