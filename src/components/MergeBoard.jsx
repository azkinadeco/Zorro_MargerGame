import React, { useState, useRef, useEffect } from 'react';
import { ITEMS, getSpawnItem } from '../data/items';
import { audio } from '../utils/audio';
import { safeConfetti } from '../utils/safeConfetti';
import { Semi3DItemToken } from './Semi3DItemToken';

export const BOARD_COLS = 11;
export const BOARD_ROWS = 4;
export const TOTAL_CELLS = BOARD_COLS * BOARD_ROWS;

const SPAWN_CATALOG_FOOD = [
  { name: 'Level 1 Kitten Kibble', sprite: '/ui/sprites/bowl_pink.png', level: 1, item: ITEMS.food_1 },
  { name: 'Level 2 Tuna Bowl', sprite: '/ui/sprites/bowl_blue.png', level: 2, item: ITEMS.food_2 },
  { name: 'Level 1 Energy Spark', sprite: '/ui/icon_energy_bolt.png', level: 1, item: ITEMS.energy_1 }
];

const SPAWN_CATALOG_CATS = [
  { name: 'Level 1 Jejak Cakar Kucing', sprite: '/ui/sprites/paw_lv1.png', level: 1, item: ITEMS.cats_1 },
  { name: 'Level 2 Anak Kucing Tidur', sprite: '/ui/sprites/kitten_sleeping.png', level: 2, item: ITEMS.cats_2 },
  { name: 'Level 1 Bola Wol Pastel', sprite: '/ui/sprites/yarn_ball.png', level: 1, item: ITEMS.toys_1 },
  { name: 'Level 2 Tongkat Bulu Ayun', sprite: '/ui/sprites/yarn_ball.png', level: 2, item: ITEMS.toys_2 }
];

const getRandomNextItem = (category = 'food') => {
  const catalog = category === 'cats' ? SPAWN_CATALOG_CATS : SPAWN_CATALOG_FOOD;
  const entry = catalog[Math.floor(Math.random() * catalog.length)];
  return {
    name: entry.name,
    sprite: entry.sprite,
    level: entry.level,
    itemData: { ...entry.item, uid: `${entry.item.id}_${Date.now()}` }
  };
};

export function MergeBoard({
  board = [],
  onUpdateBoard,
  backpack = [null, null, null, null],
  onUpdateBackpack,
  energy = 75,
  coins = 0,
  onSpendCoins,
  hintItemId = null,
  isRotated90 = false,
  onOpenCatalog,
  onOpenEnergyModal,
  onItemDiscovered,
  onItemMerged,
  onConsumeEnergy,
  onAddCoins,
  onAddEnergy,
  onShowToast,
  onComboChange
}) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [hoverIndex, setHoverIndex] = useState(null);
  const [nextFoodItem, setNextFoodItem] = useState(() => getRandomNextItem('food'));
  const [nextCatItem, setNextCatItem] = useState(() => getRandomNextItem('cats'));
  const [, setNowTick] = useState(0);
  const [boardHistory, setBoardHistory] = useState([]);
  const [comboCount, setComboCount] = useState(0);
  const [animatingMergeIndex, setAnimatingMergeIndex] = useState(null);
  const [animatingSpawnIndex, setAnimatingSpawnIndex] = useState(null);
  const [isSpawnerWobbling, setIsSpawnerWobbling] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [starbursts, setStarbursts] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [floatingGains, setFloatingGains] = useState([]);
  const comboTimerRef = useRef(null);
  const lastMergeTimeRef = useRef(0);
  const mergeCountRef = useRef(0);

  const spawnFloatingGain = (cellIndex, text) => {
    const col = cellIndex % BOARD_COLS;
    const row = Math.floor(cellIndex / BOARD_COLS);
    const id = Date.now() + Math.random();
    setFloatingGains(prev => [
      ...prev.slice(-6),
      { id, col, row, text }
    ]);
    setTimeout(() => {
      setFloatingGains(prev => prev.filter(g => g.id !== id));
    }, 1200);
  };

  const spawnStarbursts = (cellIndex) => {
    const col = cellIndex % BOARD_COLS;
    const row = Math.floor(cellIndex / BOARD_COLS);
    const leftPercent = ((col + 0.5) / BOARD_COLS) * 100;
    const topPercent = ((row + 0.5) / BOARD_ROWS) * 100;
    const stars = Array.from({ length: 8 }).map((_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const dist = 28 + Math.random() * 26;
      return {
        id: Date.now() + Math.random() + i,
        x: leftPercent,
        y: topPercent,
        tx: Math.cos(angle) * dist,
        ty: Math.sin(angle) * dist
      };
    });
    setStarbursts(prev => [...prev.slice(-16), ...stars]);
    setTimeout(() => {
      setStarbursts(prev => prev.filter(s => !stars.some(ns => ns.id === s.id)));
    }, 650);
  };

  const boardRef = useRef(null);
  const isDraggingRef = useRef(false);
  const pointerTrackRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    cellIndex: null,
    isDragging: false,
    targetElement: null
  });

  // Map item IDs to high-fidelity mockup sprites
  const getMockupSprite = (item) => {
    if (!item) return null;

    // Direct mappings
    if (item.id === 'toys_1' || item.id === 'toys_2' || item.id === 'toys_3') return '/ui/sprites/yarn_ball.png';
    if (item.id === 'food_1') return '/ui/sprites/bowl_pink.png';
    if (item.id === 'food_2') return '/ui/sprites/bowl_blue.png';
    if (item.id === 'cats_1') return '/ui/sprites/paw_lv1.png';
    if (item.id === 'cats_2') return '/ui/sprites/kitten_sleeping.png';
    if (item.id === 'cats_3') return '/ui/sprites/cat_thor_tabby.png';
    if (item.id === 'cats_4') return '/ui/sprites/cat_loki_orange.png';
    if (item.id === 'cats_5' || item.id === 'cats_6') return '/ui/sprites/cat_zorro_tuxedo.png';

    // Energy drops
    if (item.id === 'energy_1' || item.id === 'energy_2' || item.id === 'energy_3') return '/ui/icon_energy_bolt.png';

    // Care items
    if (item.id === 'care_1' || item.id === 'care_2') return '/ui/sprites/paw_lv2.png';

    // Paw tiers
    if (item.category === 'cats' && item.level === 2) return '/ui/sprites/paw_lv2.png';
    if (item.category === 'cats' && item.level >= 3 && item.level <= 4) return '/ui/sprites/cat_calico.png';

    return item.photo || '/ui/sprites/yarn_ball.png';
  };

  const canMerge = (itemA, itemB) => {
    if (!itemA || !itemB || itemA.isCobweb || itemA.isBubble || itemB.isBubble) return false;
    // Booster Joker (Magic Wand): upgrades any active non-generator item with a nextId
    if (itemA.id === 'booster_joker' && Boolean(itemB.nextId) && !itemB.isGenerator && !itemB.isCobweb) return true;
    if (itemB.id === 'booster_joker' && Boolean(itemA.nextId) && !itemA.isGenerator && !itemA.isCobweb) return true;
    // Booster Scissors: splits any Level 2+ active non-generator item
    if (itemA.id === 'booster_scissors' && itemB.level >= 2 && !itemB.isGenerator && !itemB.isCobweb) return true;
    if (itemB.id === 'booster_scissors' && itemA.level >= 2 && !itemA.isGenerator && !itemA.isCobweb) return true;
    // Matching items (including active item merging into a matching cobweb item, or Lv.1 generators merging into Lv.2)
    return itemA.id === itemB.id && Boolean(itemA.nextId);
  };

  // Find pairs of items on the board that can merge
  const findMergeablePairs = () => {
    const pairs = [];
    const seen = new Set();

    board.forEach((itemA, i) => {
      if (!itemA || itemA.isCobweb || itemA.isBubble) return;
      board.forEach((itemB, j) => {
        if (i === j || !itemB || itemB.isBubble) return;
        if (itemA.id === itemB.id && itemA.nextId) {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!seen.has(key)) {
            seen.add(key);
            pairs.push({ from: i, to: j, id: itemA.id });
          }
        }
      });
    });

    return pairs;
  };

  const mergeablePairs = findMergeablePairs();
  const occupiedCount = board.filter(Boolean).length;
  const isSoftlockRisk = occupiedCount >= 40 && mergeablePairs.length === 0;

  // First-Time User Experience (FTUE) merge guide
  const [ftueCompleted, setFtueCompleted] = useState(() => {
    try {
      return localStorage.getItem('zorro_ftue_completed') === 'true';
    } catch (e) {
      return false;
    }
  });

  const guidePair = !ftueCompleted && mergeablePairs.length > 0 ? mergeablePairs[0] : null;

  // Spawner action: drops new item into nearest empty cell from chosen category
  const handleSpawnItem = (category = 'food') => {
    if (energy < 1) {
      audio.playPop();
      if (onShowToast) onShowToast("Energi habis! Membuka menu isi ulang energi ⚡");
      if (onOpenEnergyModal) {
        onOpenEnergyModal();
      }
      return;
    }

    const emptyIndices = [];
    board.forEach((cell, idx) => {
      if (!cell) emptyIndices.push(idx);
    });

    if (emptyIndices.length === 0) {
      audio.playPop();
      // Deadlock helper: if board is full and no mergeable pairs exist, auto-select lowest-tier item to sell
      if (mergeablePairs.length === 0) {
        let lowestIdx = null;
        let lowestLevel = Infinity;
        board.forEach((cell, idx) => {
          if (cell && !cell.isGenerator && (cell.level || 1) < lowestLevel) {
            lowestLevel = cell.level || 1;
            lowestIdx = idx;
          }
        });
        if (lowestIdx !== null) {
          setSelectedIndex(lowestIdx);
          if (onShowToast) onShowToast("Papan penuh & buntu! Jual item level rendah untuk mengosongkan tempat 🪙");
          return;
        }
      }
      if (onShowToast) onShowToast("Papan penuh! Gabungkan item terlebih dahulu 🐾");
      return;
    }

    // Pick random empty slot
    const targetIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    // Save history for undo
    setBoardHistory(h => [...h.slice(-10), [...board]]);

    // F5: Spawn the EXACT previewed item from nextFoodItem or nextCatItem!
    const previewed = category === 'cats' ? nextCatItem : nextFoodItem;
    const spawnedItem = previewed?.itemData
      ? { ...previewed.itemData, uid: `item_${Date.now()}_${Math.random().toString(36).slice(2, 5)}` }
      : { ...(category === 'cats' ? ITEMS.cats_1 : ITEMS.food_1), uid: `item_${Date.now()}` };

    const newBoard = [...board];
    newBoard[targetIdx] = spawnedItem;

    if (onConsumeEnergy) onConsumeEnergy(1);
    audio.playPop();

    // Trigger spawner wobble & bouncy spawn animation
    setIsSpawnerWobbling(true);
    setTimeout(() => setIsSpawnerWobbling(false), 420);
    setAnimatingSpawnIndex(targetIdx);
    setTimeout(() => setAnimatingSpawnIndex(null), 450);

    if (onUpdateBoard) onUpdateBoard(newBoard);
    if (onItemDiscovered && spawnedItem?.id) onItemDiscovered(spawnedItem.id);

    // Roll next accurate item preview for the used category
    if (category === 'cats') {
      setNextCatItem(getRandomNextItem('cats'));
    } else {
      setNextFoodItem(getRandomNextItem('food'));
    }
  };

  // Global Desktop Keyboard Shortcut: Space to spawn item from bag
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) return;
      if (e.code === 'Space' && selectedIndex === null) {
        e.preventDefault();
        handleSpawnItem('food');
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [board, energy, selectedIndex, mergeablePairs, nextFoodItem, nextCatItem]);

  // F6 & F7: 1-Second Interval for Generator Cooldown Recovery & Magic Soap Bubble 45s Auto-Pop
  useEffect(() => {
    const hasActiveTimers = board.some(
      cell => (cell?.isGenerator && cell?.isDepleted && cell?.cooldownUntil) || (cell?.isBubble && cell?.bubbleExpiresAt)
    );
    if (!hasActiveTimers) return;

    const timer = setInterval(() => {
      const now = Date.now();
      let changed = false;
      let poppedBubbleName = null;
      let rechargedGenName = null;

      const updated = board.map((cell) => {
        if (!cell) return null;
        if (cell.isGenerator && cell.isDepleted && cell.cooldownUntil && now >= cell.cooldownUntil) {
          changed = true;
          rechargedGenName = cell.nameId || cell.name;
          return {
            ...cell,
            isDepleted: false,
            cooldownUntil: null,
            chargesLeft: cell.level >= 2 ? 18 : 10
          };
        }
        if (cell.isBubble && cell.bubbleExpiresAt && now >= cell.bubbleExpiresAt) {
          changed = true;
          poppedBubbleName = cell.nameId || cell.name;
          return {
            ...ITEMS.coins_1,
            uid: `coin_bubble_${now}_${Math.random().toString(36).slice(2, 5)}`
          };
        }
        return cell;
      });

      if (changed) {
        audio.playPop();
        if (onUpdateBoard) onUpdateBoard(updated);
        if (rechargedGenName && onShowToast) {
          onShowToast(`⚡ ${rechargedGenName} selesai isi ulang dan siap digunakan kembali!`);
        }
        if (poppedBubbleName && onShowToast) {
          onShowToast(`🫧 Gelembung ${poppedBubbleName} meletus otomatis menjadi Koin Perunggu! 🪙`);
        }
      } else {
        setNowTick(t => t + 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [board, onUpdateBoard, onShowToast]);

  // Piece of Cake Mechanic: On-Board Generator Tap Action (Spawns items directly from generator on board)
  const handleTriggerBoardGenerator = (genIndex) => {
    const genItem = board[genIndex];
    if (!genItem || !genItem.isGenerator) return;

    if (genItem.isDepleted) {
      audio.playPop();
      const remSec = genItem.cooldownUntil ? Math.max(1, Math.ceil((genItem.cooldownUntil - Date.now()) / 1000)) : 15;
      if (onShowToast) onShowToast(`⏳ ${genItem.nameId || genItem.name} sedang isi ulang (${remSec}d)! Gunakan 20 🪙 atau Jam Pasir untuk isi instan!`);
      return;
    }

    if (energy < (genItem.energyCost || 1)) {
      audio.playPop();
      if (onShowToast) onShowToast("Energi habis! Membuka menu isi ulang energi ⚡");
      if (onOpenEnergyModal) onOpenEnergyModal();
      return;
    }

    const emptyIndices = [];
    board.forEach((cell, idx) => {
      if (!cell) emptyIndices.push(idx);
    });

    if (emptyIndices.length === 0) {
      audio.playPop();
      if (onShowToast) onShowToast("Papan penuh! Gabungkan item terlebih dahulu 🐾");
      return;
    }

    // Pick closest empty slot to the generator for juicy visual feel
    const genCol = genIndex % BOARD_COLS;
    const genRow = Math.floor(genIndex / BOARD_COLS);
    emptyIndices.sort((a, b) => {
      const distA = Math.hypot((a % BOARD_COLS) - genCol, Math.floor(a / BOARD_COLS) - genRow);
      const distB = Math.hypot((b % BOARD_COLS) - genCol, Math.floor(b / BOARD_COLS) - genRow);
      return distA - distB;
    });
    const targetIdx = emptyIndices[0];

    const spawnedId = getSpawnItem(genItem.id);
    const spawnedDef = ITEMS[spawnedId] || ITEMS.food_1;
    const newItem = {
      ...spawnedDef,
      uid: `${spawnedDef.id}_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`
    };

    const maxCharges = genItem.level >= 2 ? 18 : 10;
    const currentCharges = genItem.chargesLeft ?? maxCharges;
    const nextCharges = currentCharges - 1;
    const nowDepleted = nextCharges <= 0;

    setBoardHistory(h => [...h.slice(-10), [...board]]);
    const newBoard = [...board];
    newBoard[genIndex] = {
      ...genItem,
      chargesLeft: nowDepleted ? 0 : nextCharges,
      isDepleted: nowDepleted,
      cooldownUntil: nowDepleted ? Date.now() + 20000 : null
    };
    newBoard[targetIdx] = newItem;

    if (onConsumeEnergy) onConsumeEnergy(genItem.energyCost || 1);
    audio.playPop();

    setAnimatingMergeIndex(genIndex);
    setAnimatingSpawnIndex(targetIdx);
    setTimeout(() => {
      setAnimatingMergeIndex(null);
      setAnimatingSpawnIndex(null);
    }, 420);

    spawnFloatingGain(genIndex, nowDepleted ? `⏳ Cooldown 20s` : `⚡ -${genItem.energyCost || 1}`);
    if (onUpdateBoard) onUpdateBoard(newBoard);
    if (onItemDiscovered && newItem.id) onItemDiscovered(newItem.id);
    if (onShowToast) {
      if (nowDepleted) {
        onShowToast(`⏳ ${genItem.nameId || genItem.name} mengeluarkan ${newItem.nameId || newItem.name} & mulai istirahat 20 detik!`);
      } else {
        onShowToast(`🧺 ${genItem.nameId || genItem.name} mengeluarkan ${newItem.nameId || newItem.name}! (Sisa ${nextCharges}x) ✨`);
      }
    }
  };

  // F6: Instant Recharge Depleted Generator with Coins
  const handleRechargeGeneratorWithCoins = (genIndex) => {
    const genItem = board[genIndex];
    if (!genItem || !genItem.isGenerator || !genItem.isDepleted) return;
    const cost = 20;
    if (coins < cost) {
      audio.playPop();
      if (onShowToast) onShowToast(`Koin belum cukup (${cost} 🪙) untuk mempercepat generator!`);
      return;
    }
    if (onSpendCoins) onSpendCoins(cost);
    const newBoard = [...board];
    newBoard[genIndex] = {
      ...genItem,
      isDepleted: false,
      cooldownUntil: null,
      chargesLeft: genItem.level >= 2 ? 18 : 10
    };
    audio.playFanfare();
    spawnFloatingGain(genIndex, `⚡ PENUH!`);
    if (onUpdateBoard) onUpdateBoard(newBoard);
    if (onShowToast) onShowToast(`⚡ ${genItem.nameId || genItem.name} langsung penuh kembali!`);
  };

  // Piece of Cake Mechanic: Unlock Magic Soap Bubble for duplicate high-tier item
  const handleUnlockBubble = (index) => {
    const item = board[index];
    if (!item || !item.isBubble) return;
    const cost = item.bubbleCostCoins || ((item.level || 3) * 40);

    if (coins < cost) {
      audio.playPop();
      if (onShowToast) onShowToast(`Koin belum cukup (${cost} 🪙)! Kamu bisa tekan "Pecahkan Gratis" untuk bonus +35 🪙 & +5 ⚡!`);
      return;
    }

    setBoardHistory(h => [...h.slice(-10), [...board]]);
    if (onSpendCoins) onSpendCoins(cost);

    const newBoard = [...board];
    const baseDef = ITEMS[item.id] || item;
    newBoard[index] = {
      ...item,
      isBubble: false,
      desc: baseDef.desc
    };

    audio.playFanfare();
    safeConfetti({ particleCount: 30, spread: 65, origin: { y: 0.6 } });
    setAnimatingMergeIndex(index);
    setTimeout(() => setAnimatingMergeIndex(null), 480);
    spawnFloatingGain(index, `🫧 TERBUKA!`);
    spawnStarbursts(index);
    if (onUpdateBoard) onUpdateBoard(newBoard);
    if (onShowToast) onShowToast(`🫧 Gelembung Ajaib dibuka! Duplikat ${item.nameId || item.name} siap digabungkan!`);
  };

  // Piece of Cake Mechanic: Pop Magic Soap Bubble for free instant coins & energy
  const handlePopBubbleFree = (index) => {
    const item = board[index];
    if (!item || !item.isBubble) return;

    setBoardHistory(h => [...h.slice(-10), [...board]]);
    const newBoard = [...board];
    newBoard[index] = null;

    if (onAddCoins) onAddCoins(35);
    if (onAddEnergy) onAddEnergy(5);
    audio.playPop();
    spawnFloatingGain(index, `+35 🪙 +5 ⚡`);
    if (onUpdateBoard) onUpdateBoard(newBoard);
    if (onShowToast) onShowToast(`🫧 Gelembung Ajaib dipecahkan! Dapat bonus +35 🪙 Koin & +5 ⚡ Energi!`);
    setSelectedIndex(null);
  };

  // Merge & Move logic
  const executeMerge = (fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const itemA = board[fromIndex];
    const itemB = board[toIndex];

    if (!itemA) return;

    // Piece of Cake Rule: Cobweb locked items cannot be moved directly
    if (itemA.isCobweb) {
      audio.playPop();
      if (onShowToast) onShowToast("Item ini terkunci di bawah jaring laba-laba! Tabrakkan item sejenis untuk membukanya! 🕸️");
      setSelectedIndex(null);
      return;
    }

    // Magic Bubble items must be unlocked or popped before merging
    if (itemA.isBubble || itemB?.isBubble) {
      audio.playPop();
      if (onShowToast) onShowToast("🫧 Gelembung Ajaib harus dibuka atau dipecahkan dulu sebelum digabungkan!");
      setSelectedIndex(itemA.isBubble ? fromIndex : toIndex);
      return;
    }

    // Moving item to an empty slot
    if (!itemB) {
      const newBoard = [...board];
      newBoard[fromIndex] = null;
      newBoard[toIndex] = itemA;
      audio.playPop();
      if (onUpdateBoard) onUpdateBoard(newBoard);
      setSelectedIndex(null);
      return;
    }

    // Cobweb target check: cannot swap or merge non-matching item onto cobweb
    if (itemB.isCobweb && itemA.id !== itemB.id) {
      audio.playPop();
      if (onShowToast) onShowToast(`Petak ini terkunci jaring laba-laba! Butuh ${itemB.nameId || itemB.name} sejenis untuk membukanya! 🕸️`);
      setSelectedIndex(null);
      return;
    }

    // Booster Joker (Magic Wand): upgrades any non-generator item with a nextId!
    const isJokerMerge = (itemA.id === 'booster_joker' && itemB.nextId && !itemB.isGenerator) || (itemB.id === 'booster_joker' && itemA.nextId && !itemA.isGenerator);
    if (isJokerMerge) {
      const targetItem = itemA.id === 'booster_joker' ? itemB : itemA;
      const targetIdx = itemA.id === 'booster_joker' ? toIndex : fromIndex;
      const boosterIdx = itemA.id === 'booster_joker' ? fromIndex : toIndex;
      const nextDef = ITEMS[targetItem.nextId];
      if (nextDef) {
        const newBoard = [...board];
        newBoard[boosterIdx] = null;
        newBoard[targetIdx] = {
          ...nextDef,
          uid: `${nextDef.id}_${Date.now()}`,
          level: nextDef.level
        };
        audio.playMagic();
        safeConfetti({ particleCount: 25, spread: 65, origin: { y: 0.6 } });
        setAnimatingMergeIndex(targetIdx);
        setTimeout(() => setAnimatingMergeIndex(null), 480);
        spawnFloatingGain(targetIdx, `✨ LEVEL UP! ✨`);
        spawnStarbursts(targetIdx);
        if (onShowToast) onShowToast(`🪄 Tongkat Ajaib menaikkan ${targetItem.nameId || targetItem.name} ke ${nextDef.nameId || nextDef.name}!`);
        if (onUpdateBoard) onUpdateBoard(newBoard);
        if (onItemDiscovered) onItemDiscovered(nextDef.id);
        setSelectedIndex(null);
        return;
      }
    }

    // Booster Scissors: splits any Level 2+ non-generator item into 2 previous-tier items!
    const isScissorsMerge = (itemA.id === 'booster_scissors' && itemB.level >= 2 && !itemB.isGenerator) || (itemB.id === 'booster_scissors' && itemA.level >= 2 && !itemA.isGenerator);
    if (isScissorsMerge) {
      const targetItem = itemA.id === 'booster_scissors' ? itemB : itemA;
      const targetIdx = itemA.id === 'booster_scissors' ? toIndex : fromIndex;
      const boosterIdx = itemA.id === 'booster_scissors' ? fromIndex : toIndex;
      const prevEntry = Object.values(ITEMS).find(it => it.nextId === targetItem.id);
      if (prevEntry) {
        const newBoard = [...board];
        newBoard[boosterIdx] = {
          ...prevEntry,
          uid: `${prevEntry.id}_${Date.now()}_1`,
          level: prevEntry.level
        };
        newBoard[targetIdx] = {
          ...prevEntry,
          uid: `${prevEntry.id}_${Date.now()}_2`,
          level: prevEntry.level
        };
        audio.playLevelUp();
        setAnimatingMergeIndex(targetIdx);
        setAnimatingSpawnIndex(boosterIdx);
        setTimeout(() => {
          setAnimatingMergeIndex(null);
          setAnimatingSpawnIndex(null);
        }, 480);
        spawnFloatingGain(targetIdx, `✂️ DIPISAH!`);
        spawnFloatingGain(boosterIdx, `✂️ (+2 ${prevEntry.nameId || prevEntry.name})`);
        if (onShowToast) onShowToast(`✂️ Gunting Ajaib membelah ${targetItem.nameId || targetItem.name} menjadi 2x ${prevEntry.nameId || prevEntry.name}!`);
        if (onUpdateBoard) onUpdateBoard(newBoard);
        setSelectedIndex(null);
        return;
      }
    }

    // Both items match and have an upgrade definition
    if (itemA.id === itemB.id && itemA.nextId) {
      const nextDefinition = ITEMS[itemA.nextId];
      if (!nextDefinition) return;

      const wasCobweb = Boolean(itemB.isCobweb);
      const newBoard = [...board];
      newBoard[fromIndex] = null;
      newBoard[toIndex] = {
        ...nextDefinition,
        uid: `${nextDefinition.id}_${Date.now()}`,
        level: nextDefinition.level,
        isCobweb: false
      };

      // Calculate Combo Streak
      const now = Date.now();
      let nextCombo = 1;
      if (now - lastMergeTimeRef.current < 2600) {
        nextCombo = comboCount + 1;
      }
      lastMergeTimeRef.current = now;
      setComboCount(nextCombo);
      if (onComboChange) onComboChange(nextCombo);

      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => {
        setComboCount(0);
        if (onComboChange) onComboChange(0);
      }, 2600);

      const comboBonus = nextCombo >= 2 ? nextCombo * 10 : 0;
      if (comboBonus > 0 && onAddCoins) {
        onAddCoins(comboBonus);
        if (onShowToast) onShowToast(`🔥 COMBO x${nextCombo}! Bonus +${comboBonus} 🪙`);
      }

      // Sound & rewards
      audio.playMerge();
      if (Math.random() > 0.5) audio.playMeow();

      // Trigger juicy merge pop animation, starburst particles & floating coin gain
      setAnimatingMergeIndex(toIndex);
      setTimeout(() => setAnimatingMergeIndex(null), 480);
      spawnFloatingGain(toIndex, `+${nextDefinition.level * 5} 🪙`);
      spawnStarbursts(toIndex);

      // Juicy screen shake for high level merge or combo
      if (nextDefinition.level >= 3 || nextCombo >= 2) {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 280);
      }

      if (onAddCoins) onAddCoins(nextDefinition.level * 5);
      if (onItemDiscovered) onItemDiscovered(nextDefinition.id);
      if (onItemMerged) onItemMerged();

      if (wasCobweb) {
        audio.playFanfare();
        safeConfetti({ particleCount: 35, spread: 75, origin: { y: 0.6 } });
        if (onShowToast) onShowToast("✨ Jaring Laba-laba Terbuka! Petak berhasil dibebaskan! 🕸️");
      }

      if (!ftueCompleted) {
        setFtueCompleted(true);
        try { localStorage.setItem('zorro_ftue_completed', 'true'); } catch (e) {}
      }

      // Safe throttled confetti burst reserved for milestone merges (Level 5+)
      if (nextDefinition.level >= 5) {
        safeConfetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.6 }
        });
      }

      // Piece of Cake Mechanic: 45% chance on Level 3+ merge to spawn a Magic Soap Bubble with duplicate item!
      if (nextDefinition.level >= 3 && !nextDefinition.isGenerator && Math.random() < 0.45) {
        const emptyForBubble = [];
        newBoard.forEach((cell, idx) => { if (!cell) emptyForBubble.push(idx); });
        if (emptyForBubble.length > 0) {
          const bIdx = emptyForBubble[Math.floor(Math.random() * emptyForBubble.length)];
          const unlockCost = nextDefinition.level * 40;
          newBoard[bIdx] = {
            ...nextDefinition,
            uid: `bubble_${nextDefinition.id}_${Date.now()}`,
            isBubble: true,
            bubbleCostCoins: unlockCost,
            bubbleExpiresAt: Date.now() + 45000,
            desc: `🫧 Gelembung Ajaib (45d)! Buka duplikat (${unlockCost} 🪙) atau pecahkan gratis (+35 🪙 & +5 ⚡)!`
          };
          setAnimatingSpawnIndex(bIdx);
          setTimeout(() => setAnimatingSpawnIndex(null), 500);
          if (onShowToast) onShowToast(`🫧 Gelembung Ajaib muncul! Berisi duplikat ${nextDefinition.nameId || nextDefinition.name}!`);
        }
      }

      // Every 6 merges, drop a mystery gift box if board has empty slot
      mergeCountRef.current++;
      if (mergeCountRef.current % 6 === 0) {
        const emptyIndices = [];
        newBoard.forEach((cell, idx) => { if (!cell) emptyIndices.push(idx); });
        if (emptyIndices.length > 0) {
          const dropIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          newBoard[dropIdx] = {
            id: 'gift_box',
            uid: `gift_${Date.now()}`,
            name: 'Kotak Kejutan Meow',
            nameId: 'Kotak Kejutan Meow',
            category: 'special',
            level: 1,
            isGiftBox: true,
            desc: 'Ketuk untuk membuka hadiah kejutan spesial!'
          };
          setAnimatingSpawnIndex(dropIdx);
          setTimeout(() => setAnimatingSpawnIndex(null), 500);
          if (onShowToast) onShowToast("🎁 Kotak Kejutan Meow mendarat di papan!");
        }
      }

      if (onShowToast && nextCombo < 2) {
        onShowToast(`Berhasil gabung! Muncul ${nextDefinition.name} ⭐`);
      }

      if (onUpdateBoard) onUpdateBoard(newBoard);
      setSelectedIndex(null);
    } else {
      // Swap positions if different items
      const newBoard = [...board];
      newBoard[fromIndex] = itemB;
      newBoard[toIndex] = itemA;
      audio.playPop();
      if (onUpdateBoard) onUpdateBoard(newBoard);
      setSelectedIndex(null);
    }
  };

  const handleUndo = () => {
    if (boardHistory.length === 0) {
      if (onShowToast) onShowToast("Belum ada langkah yang bisa dibatalkan! ↩️");
      return;
    }
    const previousState = boardHistory[boardHistory.length - 1];
    setBoardHistory(h => h.slice(0, -1));
    audio.playPop();
    if (onUpdateBoard) onUpdateBoard(previousState);
    if (onShowToast) onShowToast("Langkah berhasil dibatalkan! ↩️");
  };

  const handleAutoOrganize = () => {
    setBoardHistory(h => [...h.slice(-10), [...board]]);
    const newBoard = new Array(TOTAL_CELLS).fill(null);
    const movableItems = [];

    board.forEach((cell, idx) => {
      if (!cell) return;
      if (cell.isCobweb) {
        newBoard[idx] = cell;
      } else {
        movableItems.push(cell);
      }
    });

    const catOrder = { generators: 0, cats: 1, food: 2, toys: 3, care: 4, energy: 5, coins: 6 };
    movableItems.sort((a, b) => {
      const catA = catOrder[a.category] ?? 99;
      const catB = catOrder[b.category] ?? 99;
      if (catA !== catB) return catA - catB;
      return (a.level || 1) - (b.level || 1);
    });

    let moveCursor = 0;
    for (let i = 0; i < TOTAL_CELLS && moveCursor < movableItems.length; i++) {
      if (!newBoard[i]) {
        newBoard[i] = movableItems[moveCursor++];
      }
    }

    audio.playFanfare();
    safeConfetti({ particleCount: 25, spread: 60, origin: { y: 0.6 } });
    if (onUpdateBoard) onUpdateBoard(newBoard);
    if (onShowToast) onShowToast("Papan berhasil dirapikan rapi! ✨");
  };

  // P1: Store item to 4-slot backpack
  const handleStoreInBackpack = (index) => {
    const item = board[index];
    if (!item) return;
    if (item.isCobweb || item.isBubble) {
      audio.playPop();
      if (onShowToast) onShowToast("Item berjaring atau di dalam gelembung tidak bisa dimasukkan ke saku! 🐾");
      return;
    }

    const emptySlotIdx = backpack.findIndex(slot => slot === null);
    if (emptySlotIdx === -1) {
      audio.playPop();
      if (onShowToast) onShowToast("🎒 Saku simpanan penuh! (Maks 4 slot)");
      return;
    }

    setBoardHistory(h => [...h.slice(-10), [...board]]);
    const newBackpack = [...backpack];
    newBackpack[emptySlotIdx] = item;
    const newBoard = [...board];
    newBoard[index] = null;

    if (onUpdateBoard) onUpdateBoard(newBoard);
    if (onUpdateBackpack) onUpdateBackpack(newBackpack);
    setSelectedIndex(null);

    audio.playPop();
    if (onShowToast) onShowToast(`🎒 ${item.nameId || item.name} disimpan ke saku!`);
  };

  // P1: Retrieve item from backpack back to first empty cell on board
  const handleRetrieveFromBackpack = (slotIdx) => {
    const item = backpack[slotIdx];
    if (!item) return;

    const emptyBoardIdx = board.findIndex(cell => cell === null);
    if (emptyBoardIdx === -1) {
      audio.playPop();
      if (onShowToast) onShowToast("Papan merge penuh! Gabungkan atau jual item untuk membuat ruang!");
      return;
    }

    setBoardHistory(h => [...h.slice(-10), [...board]]);
    const newBoard = [...board];
    newBoard[emptyBoardIdx] = item;
    const newBackpack = [...backpack];
    newBackpack[slotIdx] = null;

    if (onUpdateBoard) onUpdateBoard(newBoard);
    if (onUpdateBackpack) onUpdateBackpack(newBackpack);

    audio.playPop();
    if (onShowToast) onShowToast(`✨ ${item.nameId || item.name} dikeluarkan dari saku ke papan!`);
  };

  // Sell item from board to prevent grid lockup
  const handleSellItem = (index) => {
    const item = board[index];
    if (!item) return;

    setBoardHistory(h => [...h.slice(-10), [...board]]);
    const sellCoins = item.sellPrice || (item.level ? item.level * 2 : 2);
    const newBoard = [...board];
    newBoard[index] = null;

    if (onAddCoins) onAddCoins(sellCoins);
    audio.playPop();
    spawnFloatingGain(index, `+${sellCoins} 🪙`);
    if (onShowToast) onShowToast(`Item ${item.nameId || item.name} terjual! +${sellCoins} 🪙`);
    if (onUpdateBoard) onUpdateBoard(newBoard);
    setSelectedIndex(null);
  };

  // Direct claim for energy items on the board
  const handleClaimEnergyItem = (index) => {
    const item = board[index];
    if (!item || !item.energyValue) return;

    const energyVal = item.energyValue;
    const newBoard = [...board];
    newBoard[index] = null;

    if (onAddEnergy) onAddEnergy(energyVal);
    audio.playFanfare();
    spawnFloatingGain(index, `+${energyVal} ⚡`);
    if (onShowToast) onShowToast(`Energi bertambah +${energyVal} ⚡!`);
    if (onUpdateBoard) onUpdateBoard(newBoard);
    setSelectedIndex(null);
  };

  // Direct claim for coin items on the board
  const handleClaimCoinItem = (index) => {
    const item = board[index];
    if (!item || !item.coinsValue) return;

    const coinVal = item.coinsValue;
    const newBoard = [...board];
    newBoard[index] = null;

    if (onAddCoins) onAddCoins(coinVal);
    audio.playFanfare();
    safeConfetti({ particleCount: 25, spread: 60, origin: { y: 0.6 } });
    spawnFloatingGain(index, `+${coinVal} 🪙`);
    if (onShowToast) onShowToast(`Koin terkumpul +${coinVal} 🪙!`);
    if (onUpdateBoard) onUpdateBoard(newBoard);
    setSelectedIndex(null);
  };

  // Global window listener to safely abort gestures if pointer leaves or cancels
  useEffect(() => {
    const handleGlobalCancel = () => {
      if (pointerTrackRef.current.active) {
        pointerTrackRef.current = {
          active: false,
          pointerId: null,
          startX: 0,
          startY: 0,
          cellIndex: null,
          isDragging: false,
          targetElement: null
        };
        isDraggingRef.current = false;
        setDraggedIndex(null);
        setHoverIndex(null);
      }
    };

    window.addEventListener('pointercancel', handleGlobalCancel);
    window.addEventListener('blur', handleGlobalCancel);
    return () => {
      window.removeEventListener('pointercancel', handleGlobalCancel);
      window.removeEventListener('blur', handleGlobalCancel);
    };
  }, []);

  // Clean Tap handler (Unified for touch & mouse clicks)
  const handleCellTap = (index) => {
    const clickedItem = board[index];

    // Mystery gift box open on tap!
    if (clickedItem && clickedItem.isGiftBox) {
      audio.playLevelUp();
      safeConfetti({ particleCount: 25, spread: 60, origin: { y: 0.65 } });
      const newBoard = [...board];
      newBoard[index] = null;
      if (onUpdateBoard) onUpdateBoard(newBoard);

      const roll = Math.random();
      if (roll < 0.45) {
        if (onAddEnergy) onAddEnergy(25);
        spawnFloatingGain(index, "+25 ⚡");
        if (onShowToast) onShowToast("🎁 Hadiah Dibuka: +25 ⚡ Energi Harian!");
      } else if (roll < 0.85) {
        if (onAddCoins) onAddCoins(150);
        spawnFloatingGain(index, "+150 🪙");
        if (onShowToast) onShowToast("🎁 Hadiah Dibuka: +150 🪙 Koin Kafe!");
      } else {
        if (onAddCoins) onAddCoins(300);
        spawnFloatingGain(index, "+300 🪙 JACKPOT!");
        if (onShowToast) onShowToast("🎁 JACKPOT Hadiah Dibuka: +300 🪙 Koin Emas!");
      }
      setSelectedIndex(null);
      return;
    }

    // Booster Hourglass tap: instant +35 energy + recharges all depleted generators on board!
    if (clickedItem && clickedItem.id === 'booster_hourglass') {
      audio.playFanfare();
      safeConfetti({ particleCount: 25, spread: 60, origin: { y: 0.6 } });
      const newBoard = board.map((cell, i) => {
        if (i === index) return null;
        if (cell?.isGenerator && cell?.isDepleted) {
          return {
            ...cell,
            isDepleted: false,
            cooldownUntil: null,
            chargesLeft: cell.level >= 2 ? 18 : 10
          };
        }
        return cell;
      });
      if (onAddEnergy) onAddEnergy(35);
      spawnFloatingGain(index, "+35 ⚡ & Reset Generator!");
      if (onShowToast) onShowToast("⏳ Jam Pasir Catnip memulihkan +35 Energi & mengisi penuh semua Generator! ⚡");
      if (onUpdateBoard) onUpdateBoard(newBoard);
      setSelectedIndex(null);
      return;
    }

    if (selectedIndex === null) {
      if (clickedItem) {
        audio.playPop();
        setSelectedIndex(index);
      }
    } else {
      if (selectedIndex === index) {
        // Double tap on on-board generator spawns an item!
        if (clickedItem?.isGenerator) {
          handleTriggerBoardGenerator(index);
          return;
        }
        // Double tap on magic bubble pops it for free bonus coins & energy!
        if (clickedItem?.isBubble) {
          handlePopBubbleFree(index);
          return;
        }
        // Double tap on energy item directly claims it!
        if (clickedItem?.energyValue) {
          handleClaimEnergyItem(index);
          return;
        }
        // Double tap on coin item directly claims it!
        if (clickedItem?.coinsValue) {
          handleClaimCoinItem(index);
          return;
        }
        // Deselect when tapping the active selection again
        audio.playPop();
        setSelectedIndex(null);
      } else {
        // Merge or move from selectedIndex to index
        executeMerge(selectedIndex, index);
      }
    }
  };

  // Full Keyboard Navigation for Accessibility (WCAG 2.2 AA)
  const handleCellKeyDown = (index, e) => {
    let nextIdx = index;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextIdx = (index + 1) % TOTAL_CELLS;
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIdx = (index - 1 + TOTAL_CELLS) % TOTAL_CELLS;
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIdx = (index + BOARD_COLS) % TOTAL_CELLS;
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIdx = (index - BOARD_COLS + TOTAL_CELLS) % TOTAL_CELLS;
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCellTap(index);
      return;
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setSelectedIndex(null);
      return;
    } else if (e.key === 'Delete' || e.key === 'Backspace') {
      if (selectedIndex !== null) {
        e.preventDefault();
        handleSellItem(selectedIndex);
      }
      return;
    }

    if (nextIdx !== index) {
      setFocusedIndex(nextIdx);
      const targetEl = boardRef.current?.querySelector(`[data-cell-index="${nextIdx}"]`);
      if (targetEl) targetEl.focus();
    }
  };

  // Robust Unified Pointer/Touch & Drag System
  const handleCellPointerDown = (index, e) => {
    // Only primary button (left click or touch)
    if (e.button && e.button !== 0) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}

    pointerTrackRef.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      cellIndex: index,
      isDragging: false,
      targetElement: e.currentTarget
    };
  };

  const handleCellPointerMove = (e) => {
    const track = pointerTrackRef.current;
    if (!track.active || track.pointerId !== e.pointerId) return;

    const dx = e.clientX - track.startX;
    const dy = e.clientY - track.startY;
    const dist = Math.hypot(dx, dy);

    // If moved > 8px and item exists on source cell, activate drag!
    if (!track.isDragging && dist > 8 && board[track.cellIndex]) {
      // Piece of Cake rule: Cobweb locked items cannot be dragged directly!
      if (board[track.cellIndex].isCobweb) {
        return;
      }
      track.isDragging = true;
      isDraggingRef.current = true;
      setDraggedIndex(track.cellIndex);
    }

    if (track.isDragging) {
      setDragPos({ x: e.clientX, y: e.clientY });

      // Identify hovered cell using elementsFromPoint to pierce through any overlay canvases or particles
      let cellEl = null;
      if (document.elementsFromPoint) {
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        for (let i = 0; i < elements.length; i++) {
          const found = elements[i].closest ? elements[i].closest('[data-cell-index]') : null;
          if (found) {
            cellEl = found;
            break;
          }
        }
      } else {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        cellEl = el?.closest('[data-cell-index]');
      }

      if (cellEl) {
        const targetIdx = parseInt(cellEl.getAttribute('data-cell-index'), 10);
        if (!isNaN(targetIdx) && targetIdx >= 0 && targetIdx < TOTAL_CELLS) {
          setHoverIndex(targetIdx);
          return;
        }
      }
      setHoverIndex(null);
    }
  };

  const handleCellPointerUp = (e) => {
    const track = pointerTrackRef.current;
    if (!track.active || track.pointerId !== e.pointerId) return;

    try {
      if (track.targetElement && track.targetElement.hasPointerCapture(e.pointerId)) {
        track.targetElement.releasePointerCapture(e.pointerId);
      }
    } catch (err) {}

    const fromIdx = track.cellIndex;
    const wasDragging = track.isDragging;

    // Reset tracking immediately
    pointerTrackRef.current = {
      active: false,
      pointerId: null,
      startX: 0,
      startY: 0,
      cellIndex: null,
      isDragging: false,
      targetElement: null
    };
    isDraggingRef.current = false;
    setDraggedIndex(null);

    if (wasDragging) {
      let finalDropIdx = hoverIndex;
      if (finalDropIdx === null && document.elementsFromPoint) {
        const elements = document.elementsFromPoint(e.clientX, e.clientY);
        for (let i = 0; i < elements.length; i++) {
          const found = elements[i].closest ? elements[i].closest('[data-cell-index]') : null;
          if (found) {
            const idx = parseInt(found.getAttribute('data-cell-index'), 10);
            if (!isNaN(idx) && idx >= 0 && idx < TOTAL_CELLS) {
              finalDropIdx = idx;
              break;
            }
          }
        }
      }

      if (finalDropIdx !== null && finalDropIdx !== fromIdx) {
        executeMerge(fromIdx, finalDropIdx);
      }
      setHoverIndex(null);
    } else {
      setHoverIndex(null);
      // Clean tap action (distance was <= 8px)
      handleCellTap(fromIdx);
    }
  };

  const handleCellPointerCancel = (e) => {
    const track = pointerTrackRef.current;
    if (track.targetElement && e?.pointerId) {
      try {
        if (track.targetElement.hasPointerCapture(e.pointerId)) {
          track.targetElement.releasePointerCapture(e.pointerId);
        }
      } catch (err) {}
    }
    pointerTrackRef.current = {
      active: false,
      pointerId: null,
      startX: 0,
      startY: 0,
      cellIndex: null,
      isDragging: false,
      targetElement: null
    };
    isDraggingRef.current = false;
    setDraggedIndex(null);
    setHoverIndex(null);
  };

  return (
    <div
      onPointerMove={handleCellPointerMove}
      onPointerUp={handleCellPointerUp}
      onPointerCancel={handleCellPointerCancel}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
        userSelect: 'none',
        touchAction: 'none'
      }}
    >
      {/* Anti-Softlock Guidance Prompt */}
      {isSoftlockRisk && (
        <div style={{
          position: 'absolute',
          top: '-32px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(180deg, #FEF3C7 0%, #FDE68A 100%)',
          border: '2px solid #D97706',
          borderRadius: '16px',
          padding: '4px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)',
          zIndex: 30,
          animation: 'pulseReady 1.8s infinite',
          whiteSpace: 'nowrap'
        }}>
          <span style={{ fontSize: '13px' }}>💡</span>
          <span style={{ fontSize: '11px', fontWeight: '900', color: '#78350F' }}>
            Papan hampir penuh? Ketuk salah satu item lalu tekan 🗑️ Jual untuk membuat ruang!
          </span>
        </div>
      )}

      {/* Centered 11 x 4 Merge Grid Container matching gameplay 1.jpg */}
      <div
        ref={boardRef}
        role="grid"
        aria-label="Papan Merge Kucing Zorro"
        className={`merge-grid-board ${isShaking ? 'board-screen-shake' : ''}`}
        style={{
          width: '940px',
          height: '350px',
          background: 'linear-gradient(180deg, #FCF2E3 0%, #F5E5D0 100%)',
          border: '3.5px solid #8B5A2B',
          borderRadius: '20px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.28), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
          padding: '10px',
          display: 'grid',
          gridTemplateColumns: `repeat(${BOARD_COLS}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_ROWS}, 1fr)`,
          gap: '6px',
          position: 'relative',
          touchAction: 'none'
        }}
      >
        {/* Decorative Wooden Frame Rivets */}
        <div className="corner-rivet" style={{ top: '6px', left: '6px' }} />
        <div className="corner-rivet" style={{ top: '6px', right: '6px' }} />
        <div className="corner-rivet" style={{ bottom: '6px', left: '6px' }} />
        <div className="corner-rivet" style={{ bottom: '6px', right: '6px' }} />

        {/* Floating Combo Streak Badge */}
        {comboCount >= 2 && (
          <div
            className="combo-banner-badge"
            style={{
              position: 'absolute',
              top: '-18px',
              right: '18px',
              background: 'linear-gradient(180deg, #EF4444 0%, #B91C1C 100%)',
              border: '2.5px solid #FEE2E2',
              borderRadius: '16px',
              padding: '4px 14px',
              color: '#FFF',
              fontSize: '13px',
              fontWeight: '900',
              boxShadow: '0 6px 14px rgba(220, 38, 38, 0.55)',
              zIndex: 35,
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span>🔥</span>
            <span>COMBO x{comboCount}! +{comboCount * 10} 🪙</span>
          </div>
        )}

        {/* Starburst Particles */}
        {starbursts.map(star => (
          <div
            key={star.id}
            className="starburst-particle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              '--tx': `${star.tx}px`,
              '--ty': `${star.ty}px`
            }}
          />
        ))}

        {/* Render Cells with Accessible Keyboard & Touch */}
        {board.slice(0, TOTAL_CELLS).map((item, index) => {
          const isSelected = selectedIndex === index;
          const isHovered = hoverIndex === index;
          const isBeingDragged = draggedIndex === index;
          const isFocused = focusedIndex === index;
          const spriteSrc = getMockupSprite(item);
          const isHinted = hintItemId && item && item.id === hintItemId;

          // Check if this item is part of a mergeable pair
          const hasMergePartner = mergeablePairs.some(p => p.from === index || p.to === index);

          // Check if hovered cell is a magnetic merge target for the currently dragged item
          const isMagneticTarget = isHovered && draggedIndex !== null && draggedIndex !== index && board[draggedIndex] && item && canMerge(board[draggedIndex], item);

          const cellLabel = item
            ? `Kotak ${index + 1}: ${item.nameId || item.name}, Level ${item.level || 1}${hasMergePartner ? ', bisa digabungkan' : ''}`
            : `Kotak Kosong ${index + 1}`;

          return (
            <div
              key={item?.uid || `cell_${index}`}
              data-cell-index={index}
              role="gridcell"
              tabIndex={isFocused ? 0 : -1}
              aria-label={cellLabel}
              aria-selected={isSelected}
              className={`merge-cell ${animatingMergeIndex === index ? 'item-merge-pop' : ''} ${animatingSpawnIndex === index ? 'item-spawn-pop' : ''} ${hasMergePartner && !isSelected ? 'gold-glow-pair' : ''}`}
              onPointerDown={(e) => handleCellPointerDown(index, e)}
              onPointerMove={handleCellPointerMove}
              onPointerUp={handleCellPointerUp}
              onPointerCancel={handleCellPointerCancel}
              onKeyDown={(e) => handleCellKeyDown(index, e)}
              onFocus={() => setFocusedIndex(index)}
              style={{
                background: isSelected
                  ? '#FEF3C7'
                  : isMagneticTarget
                  ? '#D1FAE5'
                  : isHovered
                  ? '#DCFCE7'
                  : '#FFF7EC',
                borderRadius: '10px',
                border: isSelected
                  ? '2.5px solid #F59E0B'
                  : isMagneticTarget
                  ? '2.5px solid #10B981'
                  : isHovered
                  ? '2.5px solid #10B981'
                  : isHinted
                  ? '2.5px solid #EF4444'
                  : '1.5px solid #E5C39E',
                boxShadow: isSelected
                  ? '0 0 10px rgba(245, 158, 11, 0.5), inset 0 2px 4px rgba(255,255,255,0.8)'
                  : isMagneticTarget
                  ? '0 0 20px rgba(16, 185, 129, 0.85), inset 0 0 8px rgba(16, 185, 129, 0.4)'
                  : 'inset 0 1px 3px rgba(0, 0, 0, 0.08)',
                transform: isMagneticTarget ? 'scale(1.06)' : 'none',
                outline: isFocused ? '2.5px solid #2563EB' : 'none',
                outlineOffset: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: item ? 'grab' : 'pointer',
                opacity: isBeingDragged ? 0.3 : 1,
                touchAction: 'none',
                transition: 'background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease'
              }}
            >
              {/* Juicy Magnetic Target Indicator */}
              {isMagneticTarget && (
                <div style={{
                  position: 'absolute',
                  top: '-18px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                  border: '1.5px solid #A7F3D0',
                  borderRadius: '10px',
                  padding: '1px 6px',
                  color: '#FFF',
                  fontSize: '9.5px',
                  fontWeight: '900',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.6)',
                  zIndex: 25,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  animation: 'bouncePurr 0.8s infinite'
                }}>
                  ✨ GABUNG!
                </div>
              )}

              {/* Empty slot watermark */}
              {!item && (
                <span className="cell-paw-watermark">🐾</span>
              )}

              {/* Semi-3D Collectible Item Token */}
              {item && (
                <Semi3DItemToken
                  item={item}
                  isSelected={isSelected}
                  hasMergePartner={hasMergePartner}
                  isMagneticTarget={isMagneticTarget}
                  showLevelBadge={true}
                  size="90%"
                />
              )}

              {/* FTUE First Merge Tutorial Coachmark */}
              {guidePair && guidePair.from === index && !isSelected && (
                <div style={{
                  position: 'absolute',
                  top: '-24px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                  color: '#FFFFFF',
                  fontSize: '9.5px',
                  fontWeight: '900',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 8px rgba(217, 119, 6, 0.5)',
                  zIndex: 25,
                  pointerEvents: 'none',
                  animation: 'bouncePurr 1.4s infinite'
                }}>
                  👆 Tarik & Gabung!
                </div>
              )}

              {guidePair && guidePair.to === index && !isSelected && (
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  fontSize: '9px',
                  fontWeight: '900',
                  padding: '1px 6px',
                  borderRadius: '8px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 2px 6px rgba(5, 150, 105, 0.4)',
                  zIndex: 25,
                  pointerEvents: 'none',
                  animation: 'pulseReady 1.6s infinite'
                }}>
                  🎯 Pasangan
                </div>
              )}
            </div>
          );
        })}

        {/* Floating Gain Particles */}
        {floatingGains.map((gain) => {
          const leftPercent = ((gain.col + 0.5) / BOARD_COLS) * 100;
          const topPercent = ((gain.row + 0.5) / BOARD_ROWS) * 100;
          return (
            <div
              key={gain.id}
              className="floating-reward-gain"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                fontSize: '15px'
              }}
            >
              {gain.text}
            </div>
          );
        })}
      </div>

      {/* Floating Dragged Item Avatar */}
      {isDraggingRef.current && draggedIndex !== null && board[draggedIndex] && (
        <div style={{
          position: 'fixed',
          left: `${dragPos.x - 38}px`,
          top: `${dragPos.y - 38}px`,
          width: '76px',
          height: '76px',
          pointerEvents: 'none',
          zIndex: 100,
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))',
          transform: `${isRotated90 ? 'rotate(90deg) ' : ''}scale(1.18)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Semi3DItemToken
            item={board[draggedIndex]}
            isSelected={true}
            showLevelBadge={false}
            size="100%"
          />
        </div>
      )}

      {/* Bottom Row controls: SELECTED ITEM ACTIONS or NEXT ITEM + SPAWNER */}
      <div style={{
        width: '940px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '8px',
        padding: '0 4px'
      }}>
        {selectedIndex !== null && board[selectedIndex] ? (
          /* Item Selected Action Bar: Sell, Use, or Cancel */
          <div style={{
            flex: 1,
            position: 'relative',
            background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
            border: '2.5px solid #8B5A2B',
            borderRadius: '20px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15), inset 0 2px 3px rgba(255,255,255,0.9)',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            {/* Left: Selected Item info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Semi3DItemToken
                  item={board[selectedIndex]}
                  isSelected={false}
                  showLevelBadge={false}
                  size="100%"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '900', color: '#3B1E08' }}>
                    {board[selectedIndex].nameId || board[selectedIndex].name}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '900',
                    background: '#F59E0B',
                    color: '#FFF',
                    padding: '1px 6px',
                    borderRadius: '8px'
                  }}>
                    Lv. {board[selectedIndex].level || 1}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#78350F', fontWeight: '700', maxWidth: '420px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {board[selectedIndex].desc || 'Pilih item sejenis di papan untuk menggabungkan!'}
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Piece of Cake On-Board Generator Action */}
              {board[selectedIndex].isGenerator && (
                board[selectedIndex].isDepleted ? (
                  <button
                    onClick={() => handleRechargeGeneratorWithCoins(selectedIndex)}
                    className="mockup-action-btn shimmer-badge"
                    style={{
                      background: 'linear-gradient(180deg, #FBBF24 0%, #D97706 100%)',
                      border: '2px solid #B45309',
                      borderBottom: '3.5px solid #78350F',
                      borderRadius: '14px',
                      padding: '6px 14px',
                      color: '#FFF',
                      fontSize: '12px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 3px 8px rgba(217, 119, 6, 0.4)'
                    }}
                  >
                    <span>⏳</span>
                    <span>Isi Ulang Instan (20 🪙)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleTriggerBoardGenerator(selectedIndex)}
                    className="mockup-action-btn shimmer-badge"
                    style={{
                      background: 'linear-gradient(180deg, #34D399 0%, #059669 100%)',
                      border: '2px solid #047857',
                      borderBottom: '3.5px solid #064E3B',
                      borderRadius: '14px',
                      padding: '6px 14px',
                      color: '#FFF',
                      fontSize: '12px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 3px 8px rgba(5, 150, 105, 0.4)'
                    }}
                  >
                    <span>⚡</span>
                    <span>Keluarkan Item (-{board[selectedIndex].energyCost || 1}⚡ | Sisa {board[selectedIndex].chargesLeft ?? (board[selectedIndex].level >= 2 ? 18 : 10)}x)</span>
                  </button>
                )
              )}

              {/* Piece of Cake Magic Soap Bubble Actions */}
              {board[selectedIndex].isBubble && (
                <>
                  <button
                    onClick={() => handleUnlockBubble(selectedIndex)}
                    className="mockup-action-btn shimmer-badge"
                    style={{
                      background: 'linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)',
                      border: '2px solid #0369A1',
                      borderBottom: '3.5px solid #075985',
                      borderRadius: '14px',
                      padding: '6px 14px',
                      color: '#FFF',
                      fontSize: '12px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 3px 8px rgba(2, 132, 199, 0.4)'
                    }}
                  >
                    <span>🫧</span>
                    <span>Buka Duplikat ({board[selectedIndex].bubbleCostCoins || ((board[selectedIndex].level || 3) * 40)} 🪙)</span>
                  </button>

                  <button
                    onClick={() => handlePopBubbleFree(selectedIndex)}
                    className="mockup-action-btn"
                    style={{
                      background: 'linear-gradient(180deg, #FBBF24 0%, #D97706 100%)',
                      border: '1.5px solid #B45309',
                      borderRadius: '14px',
                      padding: '6px 12px',
                      color: '#FFF',
                      fontSize: '11.5px',
                      fontWeight: '900',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>✨</span>
                    <span>Pecahkan Gratis (+35🪙 +5⚡)</span>
                  </button>
                </>
              )}

              {!board[selectedIndex].isBubble && board[selectedIndex].energyValue && (
                <button
                  onClick={() => handleClaimEnergyItem(selectedIndex)}
                  className="mockup-action-btn"
                  style={{
                    background: 'linear-gradient(180deg, #FBBF24 0%, #D97706 100%)',
                    border: '1.5px solid #B45309',
                    borderRadius: '14px',
                    padding: '6px 14px',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>⚡</span>
                  <span>Klaim (+{board[selectedIndex].energyValue})</span>
                </button>
              )}

              {!board[selectedIndex].isBubble && board[selectedIndex].coinsValue && (
                <button
                  onClick={() => handleClaimCoinItem(selectedIndex)}
                  className="mockup-action-btn"
                  style={{
                    background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                    border: '1.5px solid #92400E',
                    borderRadius: '14px',
                    padding: '6px 14px',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>🪙</span>
                  <span>Klaim (+{board[selectedIndex].coinsValue})</span>
                </button>
              )}

              {/* Store to Backpack Button */}
              {!board[selectedIndex].isCobweb && !board[selectedIndex].isBubble && (
                <button
                  onClick={() => handleStoreInBackpack(selectedIndex)}
                  className="mockup-action-btn"
                  style={{
                    background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                    border: '1.5px solid #92400E',
                    borderRadius: '14px',
                    padding: '6px 14px',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 4px rgba(217, 119, 6, 0.3)'
                  }}
                  title="Simpan item ini ke saku simpanan sementara"
                >
                  <span>🎒 Simpan ke Saku</span>
                </button>
              )}

              {!board[selectedIndex].isCobweb && !board[selectedIndex].isBubble && !board[selectedIndex].isGenerator && (
                <button
                  onClick={() => handleSellItem(selectedIndex)}
                  className="mockup-action-btn"
                  style={{
                    background: 'linear-gradient(180deg, #EF4444 0%, #DC2626 100%)',
                    border: '1.5px solid #991B1B',
                    borderRadius: '14px',
                    padding: '6px 14px',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 4px rgba(220, 38, 38, 0.3)'
                  }}
                  title="Jual item ini untuk mengosongkan papan"
                >
                  <span>🗑️ Jual</span>
                  <span>(+{board[selectedIndex].sellPrice || ((board[selectedIndex].level || 1) * 2)} 🪙)</span>
                </button>
              )}

              <button
                onClick={() => setSelectedIndex(null)}
                className="mockup-action-btn"
                style={{
                  background: '#E5E7EB',
                  border: '1.5px solid #9CA3AF',
                  borderRadius: '14px',
                  padding: '6px 12px',
                  color: '#374151',
                  fontSize: '12px',
                  fontWeight: '900',
                  cursor: 'pointer'
                }}
              >
                Batal
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Left: NEXT ITEM Pill with Cat Ears matching mockup */}
            <div style={{
              position: 'relative',
              background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
              border: '2.5px solid #8B5A2B',
              borderRadius: '20px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15), inset 0 2px 3px rgba(255,255,255,0.9)',
              padding: '6px 18px 6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {/* Cute Cat Ears on top corners */}
              <div style={{
                position: 'absolute',
                top: '-7px',
                left: '10px',
                width: '12px',
                height: '10px',
                background: '#FFFDF8',
                borderTop: '2.5px solid #8B5A2B',
                borderLeft: '2.5px solid #8B5A2B',
                transform: 'rotate(-25deg)',
                borderTopLeftRadius: '4px'
              }} />
              <div style={{
                position: 'absolute',
                top: '-7px',
                right: '10px',
                width: '12px',
                height: '10px',
                background: '#FFFDF8',
                borderTop: '2.5px solid #8B5A2B',
                borderRight: '2.5px solid #8B5A2B',
                transform: 'rotate(25deg)',
                borderTopRightRadius: '4px'
              }} />

              {/* Dual Next Item Previews (Food & Cat Spawner Accuracy) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  onClick={() => handleSpawnItem('food')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                  title={`Ketuk untuk keluarkan Makanan: ${nextFoodItem.name}`}
                >
                  <div style={{ width: '36px', height: '36px', flexShrink: 0 }}>
                    <Semi3DItemToken
                      item={nextFoodItem.itemData || ITEMS.food_1}
                      isSelected={false}
                      showLevelBadge={false}
                      size="100%"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '9px', fontWeight: '900', color: '#C2410C' }}>🥫 NEXT MAKANAN</span>
                    <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#3B1E08', maxWidth: '90px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {nextFoodItem.itemData?.nameId || nextFoodItem.name}
                    </span>
                  </div>
                </div>

                <div style={{ width: '1.5px', height: '28px', background: '#D6B896' }} />

                <div
                  onClick={() => handleSpawnItem('cats')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                  title={`Ketuk untuk keluarkan Anabul: ${nextCatItem.name}`}
                >
                  <div style={{ width: '36px', height: '36px', flexShrink: 0 }}>
                    <Semi3DItemToken
                      item={nextCatItem.itemData || ITEMS.cats_1}
                      isSelected={false}
                      showLevelBadge={false}
                      size="100%"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '9px', fontWeight: '900', color: '#7E22CE' }}>🐱 NEXT ANABUL</span>
                    <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#3B1E08', maxWidth: '90px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {nextCatItem.itemData?.nameId || nextCatItem.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center: 4-Slot Saku Simpanan Backpack Tray */}
            <div style={{
              background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
              border: '2.5px solid #8B5A2B',
              borderRadius: '20px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15), inset 0 2px 3px rgba(255,255,255,0.9)',
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '13px' }}>🎒</span>
                <span style={{ fontSize: '8.5px', fontWeight: '900', color: '#5C3818' }}>SAKU</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {backpack.map((slotItem, sIdx) => (
                  <div
                    key={sIdx}
                    onClick={() => {
                      if (slotItem) handleRetrieveFromBackpack(sIdx);
                    }}
                    className="mockup-action-btn"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: slotItem ? '#FFFFFF' : '#F5EDE4',
                      border: slotItem ? '2px solid #D97706' : '1.5px dashed #C4A482',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: slotItem ? 'pointer' : 'default',
                      position: 'relative',
                      boxShadow: slotItem ? '0 2px 6px rgba(0,0,0,0.1)' : 'inset 0 1px 2px rgba(0,0,0,0.06)'
                    }}
                    title={slotItem ? `Ketuk untuk memindahkan ${slotItem.nameId || slotItem.name} kembali ke papan` : 'Slot Saku Simpanan Kosong'}
                  >
                    {slotItem ? (
                      <Semi3DItemToken
                        item={slotItem}
                        isSelected={false}
                        showLevelBadge={true}
                        size="34px"
                      />
                    ) : (
                      <span style={{ fontSize: '11px', opacity: 0.35, color: '#8B5A2B' }}>+</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Undo, Auto-Organize, Recipe Book + Spawner Generator Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Undo Button */}
              <button
                onClick={handleUndo}
                disabled={boardHistory.length === 0}
                className="mockup-action-btn"
                style={{
                  background: boardHistory.length > 0
                    ? 'linear-gradient(180deg, #FDE68A 0%, #F59E0B 100%)'
                    : '#E5E7EB',
                  border: boardHistory.length > 0 ? '2px solid #B45309' : '1.5px solid #9CA3AF',
                  borderBottom: boardHistory.length > 0 ? '3.5px solid #78350F' : '1.5px solid #9CA3AF',
                  borderRadius: '18px',
                  padding: '6px 12px',
                  color: boardHistory.length > 0 ? '#451A03' : '#9CA3AF',
                  fontSize: '11px',
                  fontWeight: '900',
                  cursor: boardHistory.length > 0 ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: boardHistory.length > 0 ? '0 3px 6px rgba(217, 119, 6, 0.35)' : 'none',
                  opacity: boardHistory.length > 0 ? 1 : 0.6
                }}
                title="Batalkan 1 langkah terakhir"
              >
                <span>↩️</span>
                <span>Undo</span>
              </button>

              {/* Auto-Organize / Sort Button */}
              <button
                onClick={handleAutoOrganize}
                className="mockup-action-btn"
                style={{
                  background: 'linear-gradient(180deg, #A7F3D0 0%, #10B981 100%)',
                  border: '2px solid #047857',
                  borderBottom: '3.5px solid #064E3B',
                  borderRadius: '18px',
                  padding: '6px 12px',
                  color: '#064E3B',
                  fontSize: '11px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 3px 6px rgba(16, 185, 129, 0.35)'
                }}
                title="Rapikan dan kelompokkan item sejenis secara otomatis"
              >
                <span>✨</span>
                <span>Rapikan</span>
              </button>

              {onOpenCatalog && (
                <button
                  onClick={() => {
                    audio.playPop();
                    onOpenCatalog();
                  }}
                  className="mockup-action-btn"
                  style={{
                    background: 'linear-gradient(180deg, #38BDF8 0%, #0284C7 100%)',
                    border: '2px solid #0369A1',
                    borderBottom: '3.5px solid #075985',
                    borderRadius: '18px',
                    padding: '6px 13px',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 4px 10px rgba(2, 132, 199, 0.35)'
                  }}
                  title="Lihat Pohon Resep & Ensiklopedia Item"
                >
                  <span style={{ fontSize: '13px' }}>📖</span>
                  <span>Resep</span>
                </button>
              )}

              {/* Dual Spawner Buttons (Piece of Cake split pipeline: Food vs Cats) */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <button
                  onClick={() => handleSpawnItem('food')}
                  className={`mockup-action-btn shimmer-badge ${isSpawnerWobbling ? 'wobble-spawner' : ''}`}
                  style={{
                    background: 'linear-gradient(180deg, #FB923C 0%, #EA580C 50%, #C2410C 100%)',
                    border: '2px solid #9A3412',
                    borderBottom: '3.5px solid #7C2D12',
                    borderRadius: '16px',
                    padding: '6px 14px',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 4px 12px rgba(234, 88, 12, 0.4), inset 0 2px 2px rgba(255,255,255,0.6)',
                    position: 'relative'
                  }}
                  title="Ambil Suplai Makanan Kafe (-1 Energi)"
                >
                  {board.filter(Boolean).length <= 3 && energy >= 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '-30px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                      border: '1.5px solid #FEF3C7',
                      borderRadius: '12px',
                      padding: '2px 8px',
                      color: '#FFF',
                      fontSize: '10px',
                      fontWeight: '900',
                      whiteSpace: 'nowrap',
                      boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
                      animation: 'bouncePurr 1.2s infinite',
                      pointerEvents: 'none',
                      zIndex: 20
                    }}>
                      👇 Ketuk Makanan!
                    </div>
                  )}
                  <span style={{ fontSize: '14px' }}>🥫</span>
                  <span>Makanan (-1⚡)</span>
                </button>

                <button
                  onClick={() => handleSpawnItem('cats')}
                  className={`mockup-action-btn shimmer-badge ${isSpawnerWobbling ? 'wobble-spawner' : ''}`}
                  style={{
                    background: 'linear-gradient(180deg, #A855F7 0%, #9333EA 50%, #7E22CE 100%)',
                    border: '2px solid #6B21A8',
                    borderBottom: '3.5px solid #581C87',
                    borderRadius: '16px',
                    padding: '6px 14px',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: '900',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 4px 12px rgba(147, 51, 234, 0.4), inset 0 2px 2px rgba(255,255,255,0.6)'
                  }}
                  title="Ambil Mainan & Anabul Kucing (-1 Energi)"
                >
                  <span style={{ fontSize: '14px' }}>🐱</span>
                  <span>Anabul (-1⚡)</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
