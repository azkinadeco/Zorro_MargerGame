import React, { useState, useEffect, lazy, Suspense } from 'react';
import { ITEMS, ITEM_CATEGORIES } from './data/items';
import { Header } from './components/Header';
import { OrderTray } from './components/OrderTray';
import { MergeBoard, TOTAL_CELLS } from './components/MergeBoard';
import { SanctuaryView } from './components/SanctuaryView';
import { NavigationDock } from './components/NavigationDock';
import { ProfileCharactersModal } from './components/ProfileCharactersModal';
import { ShopModal } from './components/ShopModal';
import { EnergyModal } from './components/EnergyModal';
import { DailyLoginModal } from './components/DailyLoginModal';
import { StoryDialogue } from './components/StoryDialogue';
import { NinaCompanion } from './components/NinaCompanion';
import { ActivityDrawer } from './components/ActivityDrawer';
import { StoryQuestBanner } from './components/StoryQuestBanner';
import { audio } from './utils/audio';
import { telemetry } from './utils/telemetry';
import { safeConfetti } from './utils/safeConfetti';
import { saveUnifiedGame, loadUnifiedGame, exportSaveData, importSaveData, resetUnifiedGame } from './utils/saveManager';

// Code-split heavy views & modals to optimize initial bundle size & load performance
const SettingsModal = lazy(() => import('./components/SettingsModal').then(m => ({ default: m.SettingsModal })));
const MapView = lazy(() => import('./components/MapView').then(m => ({ default: m.MapView })));
const CookingRoomView = lazy(() => import('./components/CookingRoomView').then(m => ({ default: m.CookingRoomView })));
const LuckyWheelModal = lazy(() => import('./components/LuckyWheelModal').then(m => ({ default: m.LuckyWheelModal })));
const CatalogModal = lazy(() => import('./components/CatalogModal').then(m => ({ default: m.CatalogModal })));
const CatPassModal = lazy(() => import('./components/CatPassModal').then(m => ({ default: m.CatPassModal })));
const AlbumModal = lazy(() => import('./components/AlbumModal').then(m => ({ default: m.AlbumModal })));
const GuestbookModal = lazy(() => import('./components/GuestbookModal').then(m => ({ default: m.GuestbookModal })));
const EventModal = lazy(() => import('./components/EventModal').then(m => ({ default: m.EventModal })));
const FeedingModal = lazy(() => import('./components/FeedingModal').then(m => ({ default: m.FeedingModal })));
const WardrobeModal = lazy(() => import('./components/WardrobeModal').then(m => ({ default: m.WardrobeModal })));
const CatLoungeView = lazy(() => import('./components/CatLoungeView').then(m => ({ default: m.CatLoungeView })));
const LevelRoadModal = lazy(() => import('./components/LevelRoadModal').then(m => ({ default: m.LevelRoadModal })));

const STORAGE_KEY = 'zorro_merge_cats_v6_landscape';

// Clean Level 1 Onboarding Board for Commercial Mode:
// Includes 2 On-Board Generators (Basket & Box), 4 tutorial items + 4 Cobweb locked items!
function getStarterBoard() {
  const b = new Array(TOTAL_CELLS).fill(null);
  // On-board Generators (Piece of Cake core loop)
  b[0] = { ...ITEMS.gen_basket, uid: 'init_gen_basket' };
  b[11] = { ...ITEMS.gen_box, uid: 'init_gen_box' };

  b[1] = { ...ITEMS.cats_1, uid: 'init_cat_1' };
  b[3] = { ...ITEMS.cats_1, uid: 'init_cat_2' };
  b[12] = { ...ITEMS.toys_1, uid: 'init_toy_1' };
  b[14] = { ...ITEMS.toys_1, uid: 'init_toy_2' };

  // Cobweb trapped items (unlock by merging matching active item into them)
  b[9] = { ...ITEMS.food_1, uid: 'cobweb_food_1', isCobweb: true };
  b[10] = { ...ITEMS.cats_2, uid: 'cobweb_cats_2', isCobweb: true };
  b[20] = { ...ITEMS.gen_basket, uid: 'cobweb_gen_basket', isCobweb: true };
  b[31] = { ...ITEMS.gen_box, uid: 'cobweb_gen_box', isCobweb: true };
  b[33] = { ...ITEMS.toys_2, uid: 'cobweb_toys_2', isCobweb: true };
  b[43] = { ...ITEMS.food_2, uid: 'cobweb_food_2', isCobweb: true };
  return b;
}

// Initial 44-cell board: On-board generators + spacious mergeable items + cobweb locks
function getInitialBoard() {
  const b = new Array(TOTAL_CELLS).fill(null);

  // Row 0 (0..10)
  b[0] = { ...ITEMS.gen_basket, uid: 'gen_b1' };
  b[1] = { ...ITEMS.cats_1, uid: 'p1' };
  b[3] = { ...ITEMS.cats_1, uid: 'p3' };
  b[6] = { ...ITEMS.food_1, uid: 'p6' };
  b[8] = { ...ITEMS.food_1, uid: 'p8' };
  b[9] = { ...ITEMS.cats_2, uid: 'cob_9', isCobweb: true };
  b[10] = { ...ITEMS.food_2, uid: 'cob_10', isCobweb: true };

  // Row 1 (11..21)
  b[11] = { ...ITEMS.gen_box, uid: 'gen_bx1' };
  b[12] = { ...ITEMS.cats_2, uid: 'p12' };
  b[14] = { ...ITEMS.cats_2, uid: 'p14' };
  b[17] = { ...ITEMS.toys_1, uid: 'p17' };
  b[19] = { ...ITEMS.toys_1, uid: 'p19' };
  b[20] = { ...ITEMS.gen_basket, uid: 'cob_gen_basket', isCobweb: true };
  b[21] = { ...ITEMS.food_2, uid: 'p21' };

  // Row 2 (22..32)
  b[23] = { ...ITEMS.cats_3, uid: 'p23' };
  b[25] = { ...ITEMS.cats_3, uid: 'p25' };
  b[28] = { ...ITEMS.toys_2, uid: 'p28' };
  b[30] = { ...ITEMS.food_2, uid: 'p30' };
  b[31] = { ...ITEMS.gen_box, uid: 'cob_gen_box', isCobweb: true };
  b[32] = { ...ITEMS.cats_4, uid: 'p32' };

  // Row 3 (33..43)
  b[33] = { ...ITEMS.toys_2, uid: 'cob_33', isCobweb: true };
  b[34] = { ...ITEMS.energy_2, uid: 'p34' };
  b[37] = { ...ITEMS.toys_2, uid: 'p37' };
  b[40] = { ...ITEMS.cats_5, uid: 'p40' };
  b[42] = { ...ITEMS.cats_4, uid: 'p42' };
  b[43] = { ...ITEMS.food_2, uid: 'cob_43', isCobweb: true };

  return b;
}

export default function App() {
  // Navigation & Screen View State
  const [currentView, setCurrentView] = useState('play'); // 'play' | 'lobby' | 'map' | 'bake' | 'grooming' | 'catroom' | 'interact'
  const [interactCatType, setInteractCatType] = useState('zorro');
  const [gameplayCombo, setGameplayCombo] = useState(0);
  const [lastMergeEvent, setLastMergeEvent] = useState(null);

  // Game Mode: Sandbox vs Normal Commercial Mode
  const [isSandboxMode, setIsSandboxMode] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_sandbox_mode`);
      return saved === 'true';
    } catch (e) {
      return false;
    }
  });

  // Core Game Resources: Level 1 Starter for new players, Level 18 for Sandbox
  const [level, setLevel] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_level`);
      if (saved) return parseInt(saved, 10);
      const isSandbox = localStorage.getItem(`${STORAGE_KEY}_sandbox_mode`) === 'true';
      return isSandbox ? 18 : 1;
    } catch (e) {
      return 1;
    }
  });

  const [coins, setCoins] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_coins`);
      if (saved) return parseInt(saved, 10);
      const isSandbox = localStorage.getItem(`${STORAGE_KEY}_sandbox_mode`) === 'true';
      return isSandbox ? 14350 : 50;
    } catch (e) {
      return 50;
    }
  });

  const [gems, setGems] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_gems`);
      if (saved) return parseInt(saved, 10);
      const isSandbox = localStorage.getItem(`${STORAGE_KEY}_sandbox_mode`) === 'true';
      return isSandbox ? 210 : 25;
    } catch (e) {
      return 25;
    }
  });

  const [energy, setEnergy] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_energy`);
      return saved ? parseInt(saved, 10) : 100;
    } catch (e) {
      return 100;
    }
  });

  const [board, setBoard] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_board`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === TOTAL_CELLS) {
          // Ensure existing saved boards automatically receive the on-board generator if missing
          if (!parsed.some(c => c?.isGenerator)) {
            const emptyIdx = parsed.findIndex(c => !c);
            if (emptyIdx !== -1) {
              parsed[emptyIdx] = { ...ITEMS.gen_basket, uid: 'auto_gen_basket' };
            }
          }
          return parsed;
        }
      }
      const isSandbox = localStorage.getItem(`${STORAGE_KEY}_sandbox_mode`) === 'true';
      return isSandbox ? getInitialBoard() : getStarterBoard();
    } catch (e) {
      return getStarterBoard();
    }
  });

  // P1: 4-slot temporary backpack inventory
  const [backpack, setBackpack] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_backpack`);
      return saved ? JSON.parse(saved) : [null, null, null, null];
    } catch (e) {
      return [null, null, null, null];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_backpack`, JSON.stringify(backpack));
    } catch (e) {}
  }, [backpack]);

  // Audio Volume Sliders
  const [soundVolume, setSoundVolume] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_sound_vol`);
      return saved ? parseInt(saved, 10) : 80;
    } catch (e) {
      return 80;
    }
  });

  const [bgmVolume, setBgmVolume] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_bgm_vol`);
      return saved ? parseInt(saved, 10) : 60;
    } catch (e) {
      return 60;
    }
  });

  const handleSoundVolumeChange = (vol) => {
    setSoundVolume(vol);
    audio.setMasterVolume(vol / 100);
    try { localStorage.setItem(`${STORAGE_KEY}_sound_vol`, vol.toString()); } catch (e) {}
  };

  const handleBgmVolumeChange = (vol) => {
    setBgmVolume(vol);
    audio.setBgmVolume(vol / 100);
    try { localStorage.setItem(`${STORAGE_KEY}_bgm_vol`, vol.toString()); } catch (e) {}
  };

  // Toggle between Normal (Lv.1 Starter) and Sandbox (Lv.18 All-Unlocked)
  const handleToggleSandboxMode = () => {
    const next = !isSandboxMode;
    setIsSandboxMode(next);
    try {
      localStorage.setItem(`${STORAGE_KEY}_sandbox_mode`, next.toString());
      if (next) {
        localStorage.setItem(`${STORAGE_KEY}_level`, '18');
        localStorage.setItem(`${STORAGE_KEY}_coins`, '14350');
        localStorage.setItem(`${STORAGE_KEY}_gems`, '210');
        localStorage.setItem(`${STORAGE_KEY}_board`, JSON.stringify(getInitialBoard()));
      } else {
        localStorage.setItem(`${STORAGE_KEY}_level`, '1');
        localStorage.setItem(`${STORAGE_KEY}_coins`, '50');
        localStorage.setItem(`${STORAGE_KEY}_gems`, '25');
        localStorage.setItem(`${STORAGE_KEY}_board`, JSON.stringify(getStarterBoard()));
      }
      showToast(next ? "🛠️ Berpindah ke Mode Sandbox (Lv.18)!" : "🌱 Berpindah ke Mode Normal (Lv.1)!");
      setTimeout(() => window.location.reload(), 400);
    } catch (e) {
      window.location.reload();
    }
  };

  // Cloud Save Code Export / Import Handlers
  const handleExportSaveData = () => {
    try {
      const exportPayload = {
        app: 'ZorroMergeCats',
        version: '1.0.0',
        level,
        coins,
        gems,
        energy,
        board,
        discoveredItemIds,
        unlockedWardrobeOutfits,
        equippedOutfits,
        friendshipData,
        totalOrdersServed,
        exportedAt: new Date().toISOString()
      };
      const jsonString = JSON.stringify(exportPayload);
      const encoded = btoa(unescape(encodeURIComponent(jsonString)));
      navigator.clipboard.writeText(encoded);
      showToast("Kode Simpanan Akun Berhasil Disalin! 📋✨");
      telemetry.logEvent('save_exported', { level, coins });
      return encoded;
    } catch (e) {
      showToast("Gagal menyalin kode!");
      return null;
    }
  };

  const handleImportSaveData = (encodedString) => {
    try {
      const jsonString = decodeURIComponent(escape(atob(encodedString.trim())));
      const parsed = JSON.parse(jsonString);
      if (typeof parsed.level === 'number' && Array.isArray(parsed.board)) {
        localStorage.setItem(`${STORAGE_KEY}_level`, parsed.level.toString());
        localStorage.setItem(`${STORAGE_KEY}_coins`, (parsed.coins || 0).toString());
        localStorage.setItem(`${STORAGE_KEY}_gems`, (parsed.gems || 0).toString());
        localStorage.setItem(`${STORAGE_KEY}_energy`, (parsed.energy || 100).toString());
        localStorage.setItem(`${STORAGE_KEY}_board`, JSON.stringify(parsed.board));
        if (parsed.discoveredItemIds) localStorage.setItem(`${STORAGE_KEY}_discovered`, JSON.stringify(parsed.discoveredItemIds));
        if (parsed.unlockedWardrobeOutfits) localStorage.setItem(`${STORAGE_KEY}_wardrobe_unlocked`, JSON.stringify(parsed.unlockedWardrobeOutfits));
        if (parsed.equippedOutfits) localStorage.setItem(`${STORAGE_KEY}_wardrobe_equipped`, JSON.stringify(parsed.equippedOutfits));
        if (parsed.friendshipData) localStorage.setItem(`${STORAGE_KEY}_friendship`, JSON.stringify(parsed.friendshipData));
        showToast("Akun Berhasil Dipulihkan! 🚀 Memulai ulang...");
        telemetry.logEvent('save_imported', { level: parsed.level });
        setTimeout(() => window.location.reload(), 500);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  // Active Customer Orders matching mockup Orders Card with Multi-Item Combo & VIP Royal Orders
  const [orders, setOrders] = useState([
    {
      id: 'ord_1',
      items: [{ itemId: 'toys_2', count: 1, name: 'Level 2 Feather Wand' }],
      rewardCoins: 180,
      rewardStars: 1
    },
    {
      id: 'ord_2',
      items: [
        { itemId: 'food_2', count: 1, name: 'Level 2 Tuna Bowl' },
        { itemId: 'cats_2', count: 1, name: 'Level 2 Sleeping Kitten' }
      ],
      rewardCoins: 360,
      rewardStars: 2
    },
    {
      id: 'ord_3',
      isVip: true,
      items: [
        { itemId: 'cats_4', count: 1, name: 'Level 4 Lion Cat "Loki"' },
        { itemId: 'food_3', count: 1, name: 'Level 3 Churu Snack' }
      ],
      rewardCoins: 750,
      rewardStars: 3,
      rewardGems: 15
    }
  ]);

  const [hintItemId, setHintItemId] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Modals state
  const [showActivityDrawer, setShowActivityDrawer] = useState(false);
  const [lobbyRenovationPrompt, setLobbyRenovationPrompt] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showEnergyModal, setShowEnergyModal] = useState(false);
  const [showDailyModal, setShowDailyModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showLuckyWheelModal, setShowLuckyWheelModal] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [showCatPassModal, setShowCatPassModal] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showGuestbookModal, setShowGuestbookModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showFeedingModal, setShowFeedingModal] = useState(false);
  const [showWardrobeModal, setShowWardrobeModal] = useState(false);
  const [showLevelRoadModal, setShowLevelRoadModal] = useState(false);
  const [activeStoryDialogue, setActiveStoryDialogue] = useState(null);

  // Track cafe tips accumulation for Lobby badge
  const [cafeTipsCount, setCafeTipsCount] = useState(() => {
    try {
      const saved = localStorage.getItem('zorro_cafe_tips');
      return saved ? parseInt(saved, 10) : 45;
    } catch (e) { return 45; }
  });

  useEffect(() => {
    const checkTips = () => {
      try {
        const saved = localStorage.getItem('zorro_cafe_tips');
        if (saved !== null) {
          setCafeTipsCount(parseInt(saved, 10) || 0);
        }
      } catch (e) {}
    };
    const tInterval = setInterval(checkTips, 4000);
    return () => clearInterval(tInterval);
  }, []);

  // Limited Birthday Event
  const [eventPoints, setEventPoints] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_event_points`);
      return saved ? parseInt(saved, 10) : 35;
    } catch (e) { return 35; }
  });

  const [claimedEventTiers, setClaimedEventTiers] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_event_tiers`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  // Cat Friendship & Feeding
  const [friendshipData, setFriendshipData] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_friendship`);
      return saved ? JSON.parse(saved) : {
        zorro: { xp: 45, level: 2, claimedLevels: [] },
        thor: { xp: 20, level: 1, claimedLevels: [] },
        loki: { xp: 15, level: 1, claimedLevels: [] }
      };
    } catch (e) {
      return { zorro: { xp: 45, level: 2, claimedLevels: [] } };
    }
  });

  // Cat Wardrobe
  const [equippedOutfits, setEquippedOutfits] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_equipped_outfits`);
      return saved ? JSON.parse(saved) : { zorro: 'zorro_default' };
    } catch (e) { return { zorro: 'zorro_default' }; }
  });

  const [unlockedWardrobeOutfits, setUnlockedWardrobeOutfits] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_unlocked_wardrobe`);
      return saved ? JSON.parse(saved) : ['zorro_default', 'thor_default', 'loki_default'];
    } catch (e) { return ['zorro_default', 'thor_default', 'loki_default']; }
  });

  // Discovery / Catalog items
  const [discoveredItemIds, setDiscoveredItemIds] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_discovered`);
      return saved ? JSON.parse(saved) : [
        'food_1', 'food_2', 'food_3',
        'toys_1', 'toys_2', 'toys_3',
        'cats_1', 'cats_2', 'cats_3', 'cats_4', 'cats_5',
        'energy_1', 'energy_2', 'care_1', 'care_2'
      ];
    } catch (e) {
      return ['food_1', 'food_2', 'toys_1', 'toys_2', 'cats_1', 'cats_2', 'cats_3', 'cats_4', 'cats_5'];
    }
  });

  // Cat Pass & Quests
  const [pawPoints, setPawPoints] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_paw_points`);
      return saved ? parseInt(saved, 10) : 45;
    } catch (e) { return 45; }
  });

  const [totalOrdersServed, setTotalOrdersServed] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_orders_served`);
      return saved ? parseInt(saved, 10) : 8;
    } catch (e) { return 8; }
  });

  const [claimedPassQuests, setClaimedPassQuests] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_pass_quests`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [claimedPassTiers, setClaimedPassTiers] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_pass_tiers`);
      return saved ? JSON.parse(saved) : [1];
    } catch (e) { return [1]; }
  });

  const [claimedGuestbookTiers, setClaimedGuestbookTiers] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_guestbook_tiers`);
      return saved ? JSON.parse(saved) : [1];
    } catch (e) { return [1]; }
  });

  // Daily Quests live progression
  const [questProgress, setQuestProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_quest_progress`);
      return saved ? JSON.parse(saved) : {
        quest_merge: 8,
        quest_serve: 3,
        quest_pet: 5,
        quest_spin: 1,
        quest_groom: 1
      };
    } catch (e) {
      return { quest_merge: 8, quest_serve: 3, quest_pet: 5, quest_spin: 1, quest_groom: 1 };
    }
  });

  const updateQuestProgress = (questId, amt = 1) => {
    setQuestProgress(prev => {
      const next = { ...prev, [questId]: (prev[questId] || 0) + amt };
      try { localStorage.setItem(`${STORAGE_KEY}_quest_progress`, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  // Mobile landscape scaling, orientation & Fullscreen engine
  const [isPortrait, setIsPortrait] = useState(() => {
    return typeof window !== 'undefined' ? window.innerHeight > window.innerWidth : false;
  });
  const [isRotated90, setIsRotated90] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(() => {
    return typeof document !== 'undefined' ? Boolean(document.fullscreenElement || document.webkitFullscreenElement) : false;
  });
  const [dismissPortraitPrompt, setDismissPortraitPrompt] = useState(false);
  const [stageScale, setStageScale] = useState(1);

  // Responsive stage scaling with automatic orientation detection
  useEffect(() => {
    const updateScale = () => {
      const availPhysicalW = window.innerWidth;
      const availPhysicalH = window.innerHeight;
      const portrait = availPhysicalH > availPhysicalW;
      setIsPortrait(portrait);

      // CRITICAL FIX FOR MOBILE ROTATION BUG:
      // If the user physically rotates their phone into landscape orientation,
      // IMMEDIATELY disable virtual 90deg CSS rotation so it doesn't double-rotate!
      let activeRotated90 = isRotated90;
      if (!portrait && isRotated90) {
        setIsRotated90(false);
        activeRotated90 = false;
      }

      const availW = (portrait && activeRotated90) ? availPhysicalH : availPhysicalW;
      const availH = (portrait && activeRotated90) ? availPhysicalW : availPhysicalH;

      const sX = availW / 1408;
      const sY = availH / 768;
      setStageScale(Math.min(sX, sY));
    };

    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement || document.webkitFullscreenElement));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    window.addEventListener('orientationchange', updateScale);
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);

    return () => {
      window.removeEventListener('resize', updateScale);
      window.removeEventListener('orientationchange', updateScale);
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, [isRotated90]);

  // Passive Energy Regeneration: +1 energy every 45s when below 100
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => {
        if (prev < 100) return prev + 1;
        return prev;
      });
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  // Global Escape key listener to close modals
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowActivityDrawer(false);
        setShowProfileModal(false);
        setShowShopModal(false);
        setShowEnergyModal(false);
        setShowDailyModal(false);
        setShowSettingsModal(false);
        setShowLuckyWheelModal(false);
        setShowCatalogModal(false);
        setShowCatPassModal(false);
        setShowAlbumModal(false);
        setShowGuestbookModal(false);
        setShowEventModal(false);
        setShowFeedingModal(false);
        setShowWardrobeModal(false);
        setActiveStoryDialogue(null);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Dedicated Fullscreen Game Mode action
  const handleToggleFullscreen = async () => {
    // Dismiss portrait modal immediately
    setDismissPortraitPrompt(true);

    // If currently portrait, also activate 90deg landscape rotation
    if (isPortrait && !isRotated90) {
      setIsRotated90(true);
    }

    const nextFs = !isFullscreen;
    setIsFullscreen(nextFs);

    try {
      if (nextFs) {
        const el = document.documentElement;
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if (el.webkitRequestFullscreen) {
          await el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          await el.msRequestFullscreen();
        }

        // Try locking orientation to landscape for true game mode
        if (window.screen?.orientation?.lock) {
          try {
            await window.screen.orientation.lock('landscape');
          } catch (e) {}
        }

        audio.playFanfare();
        showToast("🎮 Mode Game Layar Penuh Aktif! Selamat Bermain 🐾");
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }

        if (window.screen?.orientation?.unlock) {
          try {
            window.screen.orientation.unlock();
          } catch (e) {}
        }

        audio.playPop();
        showToast("Keluar dari Mode Game Layar Penuh");
      }
    } catch (e) {
      // If browser blocked native fullscreen API, in-app fullscreen is still active!
      if (nextFs) {
        audio.playFanfare();
        showToast("🎮 Mode Game Layar Penuh Aktif! 🐾");
      } else {
        audio.playPop();
        showToast("Keluar dari Mode Game Layar Penuh");
      }
    }
  };

  // Unified Auto-Save
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_level`, level.toString());
      localStorage.setItem(`${STORAGE_KEY}_coins`, coins.toString());
      localStorage.setItem(`${STORAGE_KEY}_gems`, gems.toString());
      localStorage.setItem(`${STORAGE_KEY}_energy`, energy.toString());
      localStorage.setItem(`${STORAGE_KEY}_board`, JSON.stringify(board));
    } catch (e) {}

    saveUnifiedGame({
      level,
      coins,
      gems,
      energy,
      board,
      discoveredItemIds,
      totalOrdersServed,
      pawPoints,
      eventPoints,
      friendshipData,
      equippedOutfits,
      unlockedWardrobeOutfits,
      claimedPassQuests,
      claimedPassTiers,
      claimedGuestbookTiers,
      questProgress
    });
  }, [
    level, coins, gems, energy, board, discoveredItemIds,
    totalOrdersServed, pawPoints, eventPoints, friendshipData,
    equippedOutfits, unlockedWardrobeOutfits, claimedPassQuests,
    claimedPassTiers, claimedGuestbookTiers, questProgress
  ]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleItemDiscovered = (itemId) => {
    if (!itemId) return;
    if (discoveredItemIds.includes(itemId)) return;

    const next = [...discoveredItemIds, itemId];
    setDiscoveredItemIds(next);
    try { localStorage.setItem(`${STORAGE_KEY}_discovered`, JSON.stringify(next)); } catch (e) {}

    const itemDef = ITEMS[itemId];
    if (itemDef) {
      audio.playFanfare();
      safeConfetti({ particleCount: 25, spread: 60, origin: { y: 0.5 } });
      showToast(`🌟 Koleksi Baru Terbuka: ${itemDef.nameId || itemDef.name}! +10 💎`);
      setGems(g => g + 10);
    }
  };

  // Auto-start cozy lo-fi BGM on first user touch/click (browser autoplay policy compliant)
  useEffect(() => {
    const handleFirstGesture = () => {
      if (soundEnabled) {
        audio.init();
        audio.startBgm();
      }
      window.removeEventListener('pointerdown', handleFirstGesture);
    };
    window.addEventListener('pointerdown', handleFirstGesture);
    return () => window.removeEventListener('pointerdown', handleFirstGesture);
  }, [soundEnabled]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audio.setSoundEnabled(next);
    audio.setBgmEnabled(next);
    showToast(next ? "Suara diaktifkan 🔊" : "Suara dimatikan 🔇");
  };

  // Serve completed customer order (supports Rush Hour 2x multiplier, Multi-Item Combos, and VIP Gems)
  const handleServeOrder = (order, multiplier = 1) => {
    if (!order || !order.items || order.items.length === 0) return;
    // Remove the served active items from the board (never consume cobweb or bubble items)
    const newBoard = [...board];
    order.items.forEach(req => {
      let remaining = req.count || 1;
      for (let i = 0; i < newBoard.length; i++) {
        const cell = newBoard[i];
        if (!cell || cell.isCobweb || cell.isBubble) continue;
        if (
          cell.id === req.itemId ||
          cell.itemData?.id === req.itemId ||
          (cell.uid && cell.uid.startsWith(req.itemId))
        ) {
          newBoard[i] = null;
          remaining--;
          if (remaining <= 0) break;
        }
      }
    });
    setBoard(newBoard);

    // Award rewards with multiplier, VIP gems, and scaled star progression
    const coinReward = (order.rewardCoins || 250) * multiplier;
    const starReward = order.rewardStars || 1;
    const gemReward = order.rewardGems || 0;
    setCoins(c => c + coinReward);
    setLevel(l => l + starReward);
    if (gemReward > 0) setGems(g => g + gemReward);

    // Increase total orders served & paw points scaled to difficulty
    setTotalOrdersServed(prev => {
      const next = prev + 1;
      try { localStorage.setItem(`${STORAGE_KEY}_orders_served`, next.toString()); } catch (e) {}
      return next;
    });
    setPawPoints(p => {
      const next = p + (20 * starReward);
      try { localStorage.setItem(`${STORAGE_KEY}_paw_points`, next.toString()); } catch (e) {}
      return next;
    });
    // Add Event points for festival
    setEventPoints(prev => {
      const next = prev + (15 * starReward);
      try { localStorage.setItem(`${STORAGE_KEY}_event_points`, next.toString()); } catch (e) {}
      return next;
    });
    updateQuestProgress('quest_serve', 1);

    safeConfetti({
      particleCount: 25 + starReward * 10,
      spread: 70,
      origin: { y: 0.5 }
    });

    audio.playFanfare();
    showToast(
      order.isVip
        ? `👑 PESANAN VIP SELESAI! +${coinReward} 🪙, +${starReward} ⭐ & +${gemReward} 💎 Permata!`
        : multiplier > 1
        ? `🔥 JAM SIBUK! Pesanan terkirim: +${coinReward} 🪙 (2x Koin) & +${starReward} ⭐ Bintang Kafe!`
        : `Pesanan terkirim! +${coinReward} 🪙 & +${starReward} ⭐ Bintang Kafe!`
    );

    // Callout prompt to renovate Lobby Kafe
    setLobbyRenovationPrompt(true);

    // Replace order from dynamic scaled pool (includes Single, 2-Item Combo, and VIP Sultan Orders)
    const nextPool = [
      { id: `ord_${Date.now()}`, items: [{ itemId: 'food_2', count: 1, name: 'Level 2 Tuna Bowl' }], rewardCoins: 180, rewardStars: 1 },
      { id: `ord_${Date.now() + 1}`, items: [{ itemId: 'cats_3', count: 1, name: 'Level 3 Tabby Cat "Thor"' }], rewardCoins: 350, rewardStars: 2 },
      { id: `ord_${Date.now() + 2}`, items: [{ itemId: 'toys_2', count: 1, name: 'Level 2 Feather Wand' }, { itemId: 'food_2', count: 1, name: 'Level 2 Tuna Bowl' }], rewardCoins: 360, rewardStars: 2 },
      { id: `ord_${Date.now() + 3}`, items: [{ itemId: 'food_3', count: 1, name: 'Level 3 Churu Snack' }], rewardCoins: 300, rewardStars: 2 },
      { id: `ord_${Date.now() + 4}`, isVip: true, items: [{ itemId: 'cats_4', count: 1, name: 'Level 4 Lion Cat "Loki"' }, { itemId: 'toys_3', count: 1, name: 'Level 3 Jingle Bell' }], rewardCoins: 780, rewardStars: 3, rewardGems: 15 },
      { id: `ord_${Date.now() + 5}`, items: [{ itemId: 'care_2', count: 1, name: 'Level 2 Paw Clipper' }, { itemId: 'cats_2', count: 1, name: 'Level 2 Sleeping Kitten' }], rewardCoins: 380, rewardStars: 2 },
      { id: `ord_${Date.now() + 6}`, isVip: true, items: [{ itemId: 'food_4', count: 1, name: 'Level 4 Gourmet Salmon' }], rewardCoins: 650, rewardStars: 3, rewardGems: 12 },
      { id: `ord_${Date.now() + 7}`, items: [{ itemId: 'toys_3', count: 1, name: 'Level 3 Jingle Bell' }], rewardCoins: 320, rewardStars: 2 }
    ];
    setOrders(prev => [
      ...prev.filter(o => o.id !== order.id),
      nextPool[Math.floor(Math.random() * nextPool.length)]
    ]);
  };

  const handleItemHint = (itemId) => {
    audio.playPop();
    setHintItemId(itemId);
    showToast("Item yang dibutuhkan ditandai di papan! 🔍");
    setTimeout(() => setHintItemId(null), 4000);
  };

  const handleOpenInteract = (cat = 'zorro') => {
    setInteractCatType(cat);
    setCurrentView('cats');
  };

  // Friendship & Feeding handlers
  const addCatXp = (catId, xpGain) => {
    setFriendshipData(prev => {
      const current = prev[catId] || { xp: 0, level: 1, claimedLevels: [] };
      const nextXp = current.xp + xpGain;
      const updated = {
        ...prev,
        [catId]: {
          ...current,
          xp: nextXp
        }
      };
      try { localStorage.setItem(`${STORAGE_KEY}_friendship`, JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    showToast(`Persahabatan meningkat! +${xpGain} XP ✨`);
  };

  const handleFeedCatWithBoardItem = (catId, treatItemId, xpGain) => {
    const newBoard = [...board];
    const idx = newBoard.findIndex(it => it && it.id === treatItemId);
    if (idx !== -1) {
      newBoard[idx] = null;
      setBoard(newBoard);
    }
    addCatXp(catId, xpGain);
  };

  const handleBuyAndFeedCat = (catId, coinCost, xpGain) => {
    setCoins(c => Math.max(0, c - coinCost));
    addCatXp(catId, xpGain);
  };

  const handleClaimFriendshipReward = (catId, levelObj) => {
    setFriendshipData(prev => {
      const current = prev[catId] || { xp: 0, level: 1, claimedLevels: [] };
      const claimed = [...(current.claimedLevels || []), levelObj.level];
      const updated = {
        ...prev,
        [catId]: {
          ...current,
          claimedLevels: claimed
        }
      };
      try { localStorage.setItem(`${STORAGE_KEY}_friendship`, JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
    if (levelObj.reward.type === 'coins') setCoins(c => c + levelObj.reward.value);
    if (levelObj.reward.type === 'gems') setGems(g => g + levelObj.reward.value);
    if (levelObj.reward.type === 'energy') setEnergy(e => Math.min(100, e + levelObj.reward.value));
    showToast(`Hadiah Sahabat Lv ${levelObj.level} Diklaim! 🎁`);
  };

  // Cat Wardrobe handlers
  const handleEquipOutfit = (catId, outfitId) => {
    setEquippedOutfits(prev => {
      const next = { ...prev, [catId]: outfitId };
      try { localStorage.setItem(`${STORAGE_KEY}_equipped_outfits`, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  const handleBuyOutfit = (catId, outfitId, cost) => {
    setCoins(c => Math.max(0, c - cost));
    setUnlockedWardrobeOutfits(prev => {
      const next = [...prev, outfitId];
      try { localStorage.setItem(`${STORAGE_KEY}_unlocked_wardrobe`, JSON.stringify(next)); } catch (e) {}
      return next;
    });
    handleEquipOutfit(catId, outfitId);
  };

  // Direct item spawner onto merge board (for booster shop purchases and special event rewards)
  const handleSpawnItemOnBoard = (itemId) => {
    const emptyIndex = board.findIndex(cell => !cell);
    if (emptyIndex === -1) {
      audio.playPop();
      showToast("Papan penuh! Jual atau gabungkan item untuk memberi ruang 🐾");
      return false;
    }
    const resolvedId = itemId === 'spawner_chest' ? 'gen_gift' : itemId === 'spawner_basket' ? 'gen_basket' : itemId;
    const itemDef = ITEMS[resolvedId];
    if (!itemDef) return false;
    const newItem = {
      ...itemDef,
      uid: `${resolvedId}_${Date.now()}`
    };
    const newBoard = [...board];
    newBoard[emptyIndex] = newItem;
    setBoard(newBoard);
    try {
      localStorage.setItem(`${STORAGE_KEY}_board`, JSON.stringify(newBoard));
    } catch (e) {}
    audio.playFanfare();
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    showToast(`${newItem.nameId || newItem.name} berhasil ditaruh di Papan Merge! ✨`);
    return true;
  };

  // Birthday Festival Event handler
  const handleClaimEventTier = (tier) => {
    setClaimedEventTiers(prev => {
      const next = [...prev, tier.tier];
      try { localStorage.setItem(`${STORAGE_KEY}_event_tiers`, JSON.stringify(next)); } catch (e) {}
      return next;
    });
    if (tier.reward.type === 'coins') setCoins(c => c + tier.reward.value);
    if (tier.reward.type === 'gems') setGems(g => g + tier.reward.value);
    if (tier.reward.type === 'energy') setEnergy(e => Math.min(100, e + tier.reward.value));
    if (tier.reward.type === 'scissors') {
      const spawned = handleSpawnItemOnBoard('booster_scissors');
      if (!spawned) setCoins(c => c + 500);
    }
    if (tier.reward.type === 'joker') {
      const spawned = handleSpawnItemOnBoard('booster_joker');
      if (!spawned) setCoins(c => c + 1000);
    }
    if (tier.reward.type === 'grand_event') {
      setLevel(l => l + 3);
      setCoins(c => c + 1500);
      setEnergy(e => Math.min(100, e + 50));
      handleSpawnItemOnBoard('spawner_chest');
    }
    if (tier.reward.type === 'gift') {
      setCoins(c => c + 1000);
      setGems(g => g + 100);
      handleSpawnItemOnBoard('spawner_chest');
    }
    audio.playFanfare();
    confetti({ particleCount: 45, spread: 75, origin: { y: 0.6 } });
    showToast(`Hadiah Festival Tier ${tier.tier} (${tier.reward.label}) Berhasil Diklaim! 🎂`);
  };

  const handleResetGame = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      showToast("Game diatur ulang ke kondisi awal! 🐾");
      setShowSettingsModal(false);
      setTimeout(() => {
        window.location.reload();
      }, 400);
    } catch (e) {
      window.location.reload();
    }
  };

  const hasActiveModal = Boolean(
    showActivityDrawer ||
    showProfileModal ||
    showShopModal ||
    showEnergyModal ||
    showDailyModal ||
    showSettingsModal ||
    showLuckyWheelModal ||
    showCatalogModal ||
    showCatPassModal ||
    showAlbumModal ||
    showGuestbookModal ||
    showEventModal ||
    showFeedingModal ||
    showWardrobeModal ||
    showLevelRoadModal ||
    activeStoryDialogue
  );

  const handleCloseAllModals = () => {
    setShowActivityDrawer(false);
    setShowProfileModal(false);
    setShowShopModal(false);
    setShowEnergyModal(false);
    setShowDailyModal(false);
    setShowSettingsModal(false);
    setShowLuckyWheelModal(false);
    setShowCatalogModal(false);
    setShowCatPassModal(false);
    setShowAlbumModal(false);
    setShowGuestbookModal(false);
    setShowEventModal(false);
    setShowFeedingModal(false);
    setShowWardrobeModal(false);
    setShowLevelRoadModal(false);
    setActiveStoryDialogue(null);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 20%, #352218 0%, #150D0A 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Cozy ambient floating motes around the cafe viewport */}
      <div className="ambient-mote" style={{ top: '15%', left: '10%', width: '12px', height: '12px', animationDuration: '9s' }} />
      <div className="ambient-mote" style={{ top: '65%', left: '8%', width: '8px', height: '8px', animationDuration: '7s', animationDelay: '2s' }} />
      <div className="ambient-mote" style={{ top: '25%', right: '12%', width: '10px', height: '10px', animationDuration: '11s', animationDelay: '1s' }} />
      <div className="ambient-mote" style={{ top: '75%', right: '9%', width: '14px', height: '14px', animationDuration: '8.5s', animationDelay: '3s' }} />
      <div className="ambient-mote" style={{ top: '8%', left: '45%', width: '9px', height: '9px', animationDuration: '10s', animationDelay: '4s' }} />

      {/* Main 16:9 Game Landscape Stage */}
      <div
        className="game-landscape-stage"
        style={{
          transform: `translate(-50%, -50%) ${isRotated90 ? 'rotate(90deg)' : ''} scale(${stageScale})`,
          zIndex: hasActiveModal ? 98 : 10
        }}
      >
        {/* Top Header Bar matching mockups */}
        <Header
          level={level}
          levelProgress={65}
          coins={coins}
          gems={gems}
          energy={energy}
          maxEnergy={100}
          soundEnabled={soundEnabled}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          onToggleSound={handleToggleSound}
          onOpenActivityDrawer={() => setShowActivityDrawer(true)}
          onOpenSettings={() => setShowSettingsModal(true)}
          onOpenShop={() => setShowShopModal(true)}
          onOpenEnergyModal={() => setShowEnergyModal(true)}
          onOpenDailyGift={() => setShowDailyModal(true)}
          onOpenLuckyWheel={() => setShowLuckyWheelModal(true)}
          onOpenCatalog={() => setShowCatalogModal(true)}
          onOpenCatPass={() => setShowCatPassModal(true)}
          onOpenEvent={() => setShowEventModal(true)}
          onOpenWardrobe={() => setShowWardrobeModal(true)}
          onOpenLevelRewards={() => {
            audio.playPop();
            setShowLevelRoadModal(true);
          }}
        />

        {/* Center Main Stage Content by Active View */}
        <div style={{
          flex: 1,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Suspense fallback={null}>
          {/* VIEW 1: PLAY (Merge Screen matching gameplay 1.jpg) */}
          {currentView === 'play' && (
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              backgroundImage: 'url(/backgrounds/game_battle.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 0 10px 0'
            }}>
              {/* Floating Orders Card Top-Center */}
              <OrderTray
                orders={orders}
                boardItems={board}
                onServeOrder={handleServeOrder}
                onItemHint={handleItemHint}
              />

              {/* Pinned Story Quest Banner (P1 Core Progression Loop) */}
              <StoryQuestBanner
                totalOrdersServed={totalOrdersServed}
                petCount={questProgress.quest_pet || 0}
                bakeCount={Math.max(questProgress.quest_bake || 0, (() => {
                  try {
                    const m = JSON.parse(localStorage.getItem('zorro_recipe_mastery') || '{}');
                    return Math.max(0, Object.values(m).reduce((a, b) => a + (Number(b) || 0), 0) - 6);
                  } catch (e) { return 0; }
                })())}
                decorCount={Math.max(questProgress.quest_decor || 0, (() => {
                  try {
                    const d = JSON.parse(localStorage.getItem('zorro_unlocked_decor') || '{}');
                    return Math.max(0, Object.values(d).filter(Boolean).length - 3);
                  } catch (e) { return 0; }
                })())}
                equippedOutfits={equippedOutfits}
                unlockedWardrobeCount={unlockedWardrobeOutfits.length}
                onAddCoins={(amt) => setCoins(c => c + amt)}
                onAddEnergy={(amt) => setEnergy(e => Math.min(100, e + amt))}
                onAddStars={(amt) => setLevel(l => l + amt)}
                onShowToast={showToast}
                onNavigate={(v) => setCurrentView(v)}
              />

              {/* Interactive Nina & Zorro Gameplay Mascot Companion */}
              <NinaCompanion
                comboCount={gameplayCombo}
                lastMergeEvent={lastMergeEvent}
                totalOrdersServed={totalOrdersServed}
                energy={energy}
                onShowToast={showToast}
                onAddCoins={(amt) => setCoins(c => c + amt)}
              />

              {/* 11 x 4 Merge Grid & Next Item pill + 4-Slot Backpack */}
              <MergeBoard
                board={board}
                onUpdateBoard={setBoard}
                backpack={backpack}
                onUpdateBackpack={setBackpack}
                energy={energy}
                coins={coins}
                onSpendCoins={(amt) => setCoins(c => Math.max(0, c - amt))}
                hintItemId={hintItemId}
                isRotated90={isRotated90}
                onOpenCatalog={() => setShowCatalogModal(true)}
                onOpenEnergyModal={() => setShowEnergyModal(true)}
                onItemDiscovered={handleItemDiscovered}
                onItemMerged={() => {
                  setLastMergeEvent(Date.now());
                  updateQuestProgress('quest_merge', 1);
                }}
                onComboChange={(c) => setGameplayCombo(c)}
                onConsumeEnergy={(amt) => setEnergy(e => Math.max(0, e - amt))}
                onAddCoins={(amt) => setCoins(c => c + amt)}
                onAddEnergy={(amt) => setEnergy(e => Math.min(100, e + amt))}
                onShowToast={showToast}
              />

              {/* Callout prompt to renovate Lobby Kafe */}
              {lobbyRenovationPrompt && (
                <div
                  onClick={() => {
                    audio.playPop();
                    setLobbyRenovationPrompt(false);
                    setCurrentView('lobby');
                  }}
                  style={{
                    position: 'absolute',
                    bottom: '76px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                    border: '2.5px solid #FEF3C7',
                    borderRadius: '24px',
                    padding: '8px 22px',
                    color: '#FFF',
                    fontSize: '12.5px',
                    fontWeight: '900',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 24px rgba(217, 119, 6, 0.55)',
                    cursor: 'pointer',
                    zIndex: 42,
                    animation: 'pulseReady 1.6s infinite'
                  }}
                  title="Lihat perabot kafe yang siap direnovasi di Lobby"
                >
                  <span>✨</span>
                  <span>Kafe Siap Direnovasi! Buka Lobby Kafe ☕</span>
                  <span style={{ fontSize: '15px' }}>➜</span>
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: LOBBY (Cafe Renovation matching loby.jpg) */}
          {currentView === 'lobby' && (
            <SanctuaryView
              coins={coins}
              gems={gems}
              stars={level}
              onSpendCoins={(amt) => setCoins(c => Math.max(0, c - amt))}
              onSpendGems={(amt) => setGems(g => Math.max(0, g - amt))}
              onAddCoins={(amt) => setCoins(c => c + amt)}
              onAddGems={(amt) => setGems(g => g + amt)}
              onAddStars={(amt) => setLevel(l => l + amt)}
              onAddEnergy={(amt) => setEnergy(e => Math.min(100, e + amt))}
              onDecorUnlocked={() => updateQuestProgress('quest_decor', 1)}
              onOpenInteractCat={handleOpenInteract}
              onOpenGuestbook={() => setShowGuestbookModal(true)}
              onOpenAlbum={() => setShowAlbumModal(true)}
              onOpenBakery={() => setCurrentView('bake')}
              onTriggerStory={(story) => setActiveStoryDialogue(story)}
              equippedOutfits={equippedOutfits}
              onShowToast={showToast}
            />
          )}

          {/* VIEW 3: MAP (Cat Village Map matching maps game.jpg) */}
          {currentView === 'map' && (
            <MapView
              level={level}
              coins={coins}
              onSpendCoins={(amt) => setCoins(c => Math.max(0, c - amt))}
              onPlayMerge={() => setCurrentView('play')}
              onAddCoins={(amt) => setCoins(c => c + amt)}
              onAddGems={(amt) => setGems(g => g + amt)}
              onAddEnergy={(amt) => setEnergy(e => Math.min(100, e + amt))}
              onShowToast={showToast}
            />
          )}

          {/* VIEW 4: BAKE (Bakery Room matching cooking room.jpg) */}
          {currentView === 'bake' && (
            <CookingRoomView
              level={level}
              energy={energy}
              onConsumeEnergy={(amt) => setEnergy(e => Math.max(0, e - amt))}
              onBakeComplete={() => updateQuestProgress('quest_bake', 1)}
              onAddCoins={(amt) => setCoins(c => c + amt)}
              onAddGems={(amt) => setGems(g => g + amt)}
              onAddStars={(amt) => setLevel(l => l + amt)}
              onAddEnergy={(amt) => setEnergy(e => Math.min(100, e + amt))}
              onSpawnItemOnBoard={handleSpawnItemOnBoard}
              onShowToast={showToast}
            />
          )}

          {/* VIEW 5: CAT CARE LOUNGE (Consolidated: Asuh & Tumbuh, Elus & Manja, Salon Spa, Kostum) */}
          {(currentView === 'cats' || ['grooming', 'catroom', 'interact'].includes(currentView)) && (
            <CatLoungeView
              initialTab={currentView === 'grooming' ? 'spa' : currentView === 'catroom' ? 'asuh' : 'elus'}
              catType={interactCatType}
              coins={coins}
              gems={gems}
              onSpendCoins={(amt) => setCoins(c => Math.max(0, c - amt))}
              onSpendGems={(amt) => setGems(g => Math.max(0, g - amt))}
              onAddCoins={(amt) => setCoins(c => c + amt)}
              onAddGems={(amt) => setGems(g => g + amt)}
              onAddEnergy={(amt) => setEnergy(e => Math.min(100, e + amt))}
              onGroomSuccess={() => updateQuestProgress('quest_groom', 1)}
              onPetSuccess={() => updateQuestProgress('quest_pet', 1)}
              onOpenFeeding={() => setShowFeedingModal(true)}
              onOpenWardrobe={() => setShowWardrobeModal(true)}
              onBackToLobby={() => setCurrentView('lobby')}
              onShowToast={showToast}
            />
          )}
          </Suspense>
        </div>

        {/* Bottom Wooden Navigation Dock */}
        <NavigationDock
          currentView={currentView}
          onChangeView={(v) => setCurrentView(v)}
          onOpenProfile={() => setShowProfileModal(true)}
          onOpenShop={() => setShowShopModal(true)}
          hasLobbyTips={cafeTipsCount >= 50}
        />

        {/* Floating Toast Notification inside Landscape Stage */}
        {toastMessage && (
          <div style={{
            position: 'absolute',
            top: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
            border: '2.5px solid #8B5A2B',
            borderRadius: '24px',
            padding: '8px 24px',
            color: '#3B1E08',
            fontSize: '13px',
            fontWeight: '900',
            boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
            zIndex: 999,
            animation: 'toastSlide 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            pointerEvents: 'none'
          }}>
            {toastMessage}
          </div>
        )}

        {/* Modals rendered inside Stage so they inherit rotation & scaling and never appear portrait/terbalik */}
        <ActivityDrawer
          isOpen={showActivityDrawer}
          onClose={() => setShowActivityDrawer(false)}
          level={level}
          canClaimDaily={true}
          canSpinWheel={true}
          activeQuestsCount={3}
          onOpenDailyGift={() => setShowDailyModal(true)}
          onOpenLuckyWheel={() => setShowLuckyWheelModal(true)}
          onOpenCatalog={() => setShowCatalogModal(true)}
          onOpenCatPass={() => setShowCatPassModal(true)}
          onOpenEvent={() => setShowEventModal(true)}
          onOpenWardrobe={() => setShowWardrobeModal(true)}
          onOpenAlbum={() => setShowAlbumModal(true)}
          onOpenGuestbook={() => setShowGuestbookModal(true)}
          onOpenSettings={() => setShowSettingsModal(true)}
        />

        <ProfileCharactersModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          level={level}
          totalOrdersServed={totalOrdersServed}
          friendshipData={friendshipData}
          discoveredItemIds={discoveredItemIds}
          coins={coins}
          gems={gems}
          onAddCoins={(amt) => setCoins(c => c + amt)}
          onAddGems={(amt) => setGems(g => g + amt)}
          onOpenInteractCat={handleOpenInteract}
          onOpenWardrobe={() => {
            setShowProfileModal(false);
            setShowWardrobeModal(true);
          }}
          onShowToast={showToast}
        />

        <ShopModal
          isOpen={showShopModal}
          onClose={() => setShowShopModal(false)}
          coins={coins}
          gems={gems}
          onAddCoins={(amt) => setCoins(c => c + amt)}
          onAddGems={(amt) => setGems(g => g + amt)}
          onAddEnergy={(amt) => setEnergy(e => Math.min(100, e + amt))}
          onSpendCoins={(amt) => setCoins(c => Math.max(0, c - amt))}
          onSpendGems={(amt) => setGems(g => Math.max(0, g - amt))}
          onSpawnItemOnBoard={handleSpawnItemOnBoard}
          onShowToast={showToast}
        />

        <EnergyModal
          isOpen={showEnergyModal}
          onClose={() => setShowEnergyModal(false)}
          energy={energy}
          maxEnergy={100}
          coins={coins}
          onRefillCoins={() => {
            if (coins < 200) {
              audio.playPop();
              showToast("Koin tidak cukup! 🪙");
              return;
            }
            setCoins(c => c - 200);
            setEnergy(100);
            audio.playFanfare();
            showToast("Energi terisi penuh! ⚡ (100/100)");
            setShowEnergyModal(false);
          }}
          onRefillFree={() => {
            setEnergy(e => Math.min(100, e + 30));
            audio.playFanfare();
            showToast("+30 Energi gratis berhasil diklaim! ⚡");
            setShowEnergyModal(false);
          }}
        />

        <DailyLoginModal
          isOpen={showDailyModal}
          onClose={() => setShowDailyModal(false)}
          onClaim={(reward) => {
            audio.playFanfare();
            if (reward.coins) setCoins(c => c + reward.coins);
            if (reward.gems) setGems(g => g + reward.gems);
            if (reward.energy) setEnergy(e => Math.min(100, e + reward.energy));
            showToast("Hadiah harian berhasil diklaim! 🎁");
            setShowDailyModal(false);
          }}
        />

        {/* Code-split Lazy Loaded Modals wrapped in Suspense */}
        <Suspense fallback={null}>
          {showSettingsModal && (
            <SettingsModal
              isOpen={showSettingsModal}
              onClose={() => setShowSettingsModal(false)}
              soundEnabled={soundEnabled}
              bgmEnabled={soundEnabled}
              soundVolume={soundVolume}
              bgmVolume={bgmVolume}
              isSandboxMode={isSandboxMode}
              onToggleSound={handleToggleSound}
              onToggleBgm={handleToggleSound}
              onChangeSoundVolume={handleSoundVolumeChange}
              onChangeBgmVolume={handleBgmVolumeChange}
              onToggleSandboxMode={handleToggleSandboxMode}
              onExportSave={handleExportSaveData}
              onImportSave={handleImportSaveData}
              onResetProgress={handleResetGame}
            />
          )}
          {/* 1. Lucky Wheel Modal */}
          {showLuckyWheelModal && (
            <LuckyWheelModal
            onReward={(reward) => {
              audio.playFanfare();
              updateQuestProgress('quest_spin', 1);
              if (reward.type === 'energy') {
                setEnergy(e => Math.min(100, e + reward.value));
                showToast(`Roda Rezeki: +${reward.value} ⚡ Energi!`);
              } else if (reward.type === 'coins') {
                setCoins(c => c + reward.value);
                showToast(`Roda Rezeki: +${reward.value} 🪙 Koin!`);
              } else if (reward.type === 'stars') {
                setLevel(l => l + reward.value);
                showToast(`Roda Rezeki: +${reward.value} ⭐ Bintang Level!`);
              } else if (reward.type === 'gift') {
                setCoins(c => c + 350);
                setGems(g => g + 25);
                setEnergy(e => Math.min(100, e + 35));
                showToast("Kotak Kejutan Zorro: +350 🪙 +25 💎 +35 ⚡!");
              }
            }}
            onClose={() => setShowLuckyWheelModal(false)}
          />
        )}

        {/* 2. Catalog & Item Recipe Discovery Modal */}
        {showCatalogModal && (
          <CatalogModal
            discoveredItemIds={discoveredItemIds}
            onAddGems={(amt) => setGems(g => g + amt)}
            onShowToast={showToast}
            onClose={() => setShowCatalogModal(false)}
          />
        )}

        {/* 3. Cat Pass & Daily Quests Modal */}
        {showCatPassModal && (
          <CatPassModal
            pawPoints={pawPoints}
            questProgress={questProgress}
            claimedQuests={claimedPassQuests}
            claimedTiers={claimedPassTiers}
            onClaimQuest={(quest) => {
              setClaimedPassQuests(prev => {
                const next = [...prev, quest.id];
                try { localStorage.setItem(`${STORAGE_KEY}_pass_quests`, JSON.stringify(next)); } catch (e) {}
                return next;
              });
              if (quest.rewardPawPoints) {
                setPawPoints(p => {
                  const next = p + quest.rewardPawPoints;
                  try { localStorage.setItem(`${STORAGE_KEY}_paw_points`, next.toString()); } catch (e) {}
                  return next;
                });
              }
              if (quest.rewardCoins) setCoins(c => c + quest.rewardCoins);
              if (quest.rewardEnergy) setEnergy(e => Math.min(100, e + quest.rewardEnergy));
              showToast(`Misi Selesai: ${quest.title}! +${quest.rewardPawPoints} 🐾`);
            }}
            onClaimTier={(tier) => {
              setClaimedPassTiers(prev => {
                const next = [...prev, tier.tier];
                try { localStorage.setItem(`${STORAGE_KEY}_pass_tiers`, JSON.stringify(next)); } catch (e) {}
                return next;
              });
              if (tier.reward.type === 'coins') setCoins(c => c + tier.reward.value);
              if (tier.reward.type === 'energy') setEnergy(e => Math.min(100, e + tier.reward.value));
              if (tier.reward.type === 'stars') setLevel(l => l + tier.reward.value);
              if (tier.reward.type === 'gift') {
                setCoins(c => c + 500);
                setGems(g => g + 50);
              }
              showToast(`Hadiah Cat Pass Tier ${tier.tier} Berhasil Diklaim! 🐾`);
            }}
            onClose={() => setShowCatPassModal(false)}
          />
        )}

        {/* 4. Real Zorro Memory Photo Album Modal */}
        {showAlbumModal && (
          <AlbumModal
            totalStarsEarned={level}
            onClose={() => setShowAlbumModal(false)}
          />
        )}

        {/* 5. Cafe Guestbook & Reputation Reviews Modal */}
        {showGuestbookModal && (
          <GuestbookModal
            totalOrdersServed={totalOrdersServed}
            claimedTiers={claimedGuestbookTiers}
            onClaimTier={(tier) => {
              setClaimedGuestbookTiers(prev => {
                const next = [...prev, tier.level];
                try { localStorage.setItem(`${STORAGE_KEY}_guestbook_tiers`, JSON.stringify(next)); } catch (e) {}
                return next;
              });
              if (tier.reward?.type === 'energy') setEnergy(e => Math.min(100, e + tier.reward.value));
              if (tier.reward?.type === 'coins') setCoins(c => c + tier.reward.value);
              if (tier.reward?.type === 'stars') setLevel(l => l + tier.reward.value);
              if (tier.reward?.type === 'gift') {
                setCoins(c => c + 500);
                setGems(g => g + 50);
                handleSpawnItemOnBoard('spawner_chest');
              }
              audio.playFanfare();
              confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
              showToast(`Reputasi Kafe Meningkat: ${tier.title}! Hadiah: ${tier.reward?.label} 🏆`);
            }}
            onClose={() => setShowGuestbookModal(false)}
          />
        )}

        {/* 6. Birthday Festival Event Modal */}
        {showEventModal && (
          <EventModal
            eventPoints={eventPoints}
            claimedTiers={claimedEventTiers}
            onClaimTier={handleClaimEventTier}
            onClose={() => setShowEventModal(false)}
          />
        )}

        {/* 7. Cat Feeding & Friendship Station Modal */}
        {showFeedingModal && (
          <FeedingModal
            coins={coins}
            boardItems={board}
            friendshipData={friendshipData}
            equippedOutfits={equippedOutfits}
            onFeedCatWithBoardItem={handleFeedCatWithBoardItem}
            onBuyAndFeedCat={handleBuyAndFeedCat}
            onClaimFriendshipReward={handleClaimFriendshipReward}
            onClose={() => setShowFeedingModal(false)}
            onShowToast={showToast}
          />
        )}

        {/* 8. Cat Wardrobe & Costume Salon Modal */}
        {showWardrobeModal && (
          <WardrobeModal
            coins={coins}
            equippedOutfits={equippedOutfits}
            unlockedOutfits={unlockedWardrobeOutfits}
            onEquipOutfit={handleEquipOutfit}
            onBuyOutfit={handleBuyOutfit}
            onClose={() => setShowWardrobeModal(false)}
            onShowToast={showToast}
          />
        )}

        {/* 8.5 Level Road & Progression Milestones Modal */}
        {showLevelRoadModal && (
          <LevelRoadModal
            level={level}
            levelProgress={levelProgress}
            onClose={() => setShowLevelRoadModal(false)}
            onAddCoins={(amt) => setCoins(c => c + amt)}
            onAddGems={(amt) => setGems(g => g + amt)}
            onAddEnergy={(amt) => setEnergy(e => Math.min(100, e + amt))}
            onLevelUp={(amt) => setLevel(l => l + amt)}
            onShowToast={showToast}
          />
        )}
        </Suspense>

        {/* 9. Visual Novel Story Dialogue */}
        {activeStoryDialogue && (
          <StoryDialogue
            story={activeStoryDialogue}
            onDismiss={() => setActiveStoryDialogue(null)}
          />
        )}
      </div>

      {/* Outer Dim Overlay when any modal is open */}
      {hasActiveModal && (
        <div
          onClick={handleCloseAllModals}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 90
          }}
        />
      )}

      {/* Mobile Portrait Orientation Prompt */}
      {isPortrait && !dismissPortraitPrompt && !isRotated90 && (
        <div style={{
          position: 'fixed',
          top: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #FFFDF8 0%, #FAEDD9 100%)',
          border: '2.5px solid #8B5A2B',
          borderRadius: '20px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          maxWidth: '92vw',
          animation: 'pulseReady 2s infinite'
        }}>
          <div style={{
            fontSize: '24px',
            animation: 'wobble-spawner 1.5s infinite',
            flexShrink: 0
          }}>
            📱🔄
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '12px', fontWeight: '900', color: '#4A2810' }}>
              Putar HP ke Mode Lanskap
            </span>
            <span style={{ fontSize: '10px', fontWeight: '700', color: '#78350F' }}>
              Game dirancang dalam rasio horizontal 16:9 agar nyaman dimainkan!
            </span>
          </div>
          <button
            onClick={() => setDismissPortraitPrompt(true)}
            style={{
              background: '#E5D5C5',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              cursor: 'pointer',
              fontWeight: '900',
              fontSize: '12px',
              color: '#5C3818',
              flexShrink: 0
            }}
            title="Tutup pesan"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Bottom Quick Game Mode & Rotation Controls */}
      <div style={{
        position: 'fixed',
        bottom: '12px',
        right: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 90
      }}>
        {/* Full Screen Game Mode Toggle */}
        <button
          onClick={handleToggleFullscreen}
          style={{
            background: isFullscreen
              ? 'linear-gradient(180deg, #10B981 0%, #059669 100%)'
              : 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
            border: isFullscreen ? '2.5px solid #047857' : '2.5px solid #8B5A2B',
            borderRadius: '16px',
            padding: '7px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: isFullscreen ? '#FFF' : '#4A2810',
            fontSize: '12px',
            fontWeight: '900',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.35)'
          }}
          title="Mode Game Fullscreen Tanpa Gangguan"
        >
          <span>🎮</span>
          <span>{isFullscreen ? 'Keluar Fullscreen' : 'Mode Game (Layar Penuh)'}</span>
        </button>

        {/* Rotation Toggle */}
        <button
          onClick={() => {
            audio.playPop();
            setIsRotated90(r => !r);
            showToast(!isRotated90 ? "Mode Lanskap Rotasi 90° Aktif 🔄" : "Mode Lanskap Normal Aktif 🔄");
          }}
          style={{
            background: isRotated90
              ? 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)'
              : 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
            border: isRotated90 ? '2.5px solid #B45309' : '2.5px solid #8B5A2B',
            borderRadius: '16px',
            padding: '7px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: isRotated90 ? '#FFF' : '#4A2810',
            fontSize: '12px',
            fontWeight: '900',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.35)'
          }}
          title="Ubah Orientasi Lanskap"
        >
          <span>🔄</span>
          <span>{isRotated90 ? 'Lanskap 0°' : 'Putar 90°'}</span>
        </button>
      </div>

      {/* Mobile Portrait Welcome & Orientation Gateway Modal */}
      {isPortrait && !isRotated90 && !dismissPortraitPrompt && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(21, 13, 10, 0.85)',
          backdropFilter: 'blur(6px)',
          zIndex: 99,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '380px',
            background: 'linear-gradient(180deg, #FFFDF8 0%, #FAEDD9 100%)',
            border: '3.5px solid #8B5A2B',
            borderRadius: '28px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.9)',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '14px',
            animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              background: '#FEF3C7',
              border: '2.5px solid #F59E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              boxShadow: '0 6px 14px rgba(245, 158, 11, 0.3)'
            }}>
              🐱
            </div>

            <div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#3B1E08', marginBottom: '4px' }}>
                Mode Layar Lanskap 🐾
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#78350F', lineHeight: '1.4' }}>
                Zorro Merge Cats didesain dalam format horizontal 16:9 agar leluasa dan seru dimainkan!
              </div>
            </div>

            {/* Big Action Buttons */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                onClick={() => {
                  audio.playFanfare();
                  setIsRotated90(true);
                  setDismissPortraitPrompt(true);
                  showToast("Mode Lanskap Rotasi 90° Aktif! 🐾 Selamat Bermain");
                }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(180deg, #F59E0B 0%, #D97706 100%)',
                  border: '2.5px solid #B45309',
                  borderRadius: '18px',
                  padding: '12px 18px',
                  color: '#FFF',
                  fontSize: '15px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 16px rgba(217, 119, 6, 0.45)'
                }}
              >
                <span>🔄</span>
                <span>Mulai Main (Rotasi 90° Otomatis)</span>
              </button>

              <button
                onClick={handleToggleFullscreen}
                style={{
                  width: '100%',
                  background: 'linear-gradient(180deg, #10B981 0%, #059669 100%)',
                  border: '2px solid #047857',
                  borderRadius: '16px',
                  padding: '10px 16px',
                  color: '#FFF',
                  fontSize: '13px',
                  fontWeight: '900',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>🎮</span>
                <span>Mode Game Layar Penuh</span>
              </button>

              <button
                onClick={() => {
                  audio.playPop();
                  setDismissPortraitPrompt(true);
                }}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  padding: '6px',
                  color: '#8A5833',
                  fontSize: '12px',
                  fontWeight: '800',
                  cursor: 'pointer'
                }}
              >
                📱 Tetap Main dalam Mode Potret
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
