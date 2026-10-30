/**
 * Centralized Save State & Data Migration Engine for Zorro Merge Cats
 * Versioned schema (v1) with automatic backward-compatibility migration
 */

export const SCHEMA_VERSION = 1;
export const STORAGE_PREFIX = 'zorro_cafe';
export const UNIFIED_SAVE_KEY = 'zorro_merge_cats_save_v1';

export const DEFAULT_SAVE_STATE = {
  version: SCHEMA_VERSION,
  lastSavedAt: Date.now(),
  level: 1,
  coins: 100,
  gems: 20,
  energy: 100,
  maxEnergy: 100,
  board: [],
  discoveredItemIds: [],
  unlockedWardrobeOutfits: ['cape_red'],
  equippedOutfits: { zorro: 'cape_red' },
  friendshipData: {
    zorro: { xp: 50, level: 1, claimedLevels: [] },
    thor: { xp: 0, level: 1, claimedLevels: [] },
    loki: { xp: 0, level: 1, claimedLevels: [] }
  },
  pawPoints: 0,
  totalOrdersServed: 0,
  claimedPassQuests: [],
  claimedPassTiers: [],
  claimedGuestbookTiers: [],
  claimedEventTiers: [],
  eventPoints: 0,
  questProgress: {},
  soundSettings: {
    soundEnabled: true,
    bgmEnabled: true,
    soundVolume: 0.5,
    bgmVolume: 0.15
  },
  renovationData: {
    counter: 1,
    table: 0,
    catTree: 0,
    curtains: 0,
    wallDecor: 0
  }
};

/**
 * Migrate legacy individual localStorage keys into the unified v1 format
 */
export function migrateLegacySave() {
  try {
    const unified = localStorage.getItem(UNIFIED_SAVE_KEY);
    if (unified) {
      const parsed = JSON.parse(unified);
      if (parsed && parsed.version) {
        return parsed;
      }
    }

    // Attempt migration from legacy discrete keys
    const levelStr = localStorage.getItem(`${STORAGE_PREFIX}_level`);
    if (!levelStr) {
      return null; // Brand new player
    }

    const legacyState = {
      ...DEFAULT_SAVE_STATE,
      version: SCHEMA_VERSION,
      lastSavedAt: Date.now(),
      level: parseInt(levelStr, 10) || DEFAULT_SAVE_STATE.level,
      coins: parseInt(localStorage.getItem(`${STORAGE_PREFIX}_coins`) || '100', 10),
      gems: parseInt(localStorage.getItem(`${STORAGE_PREFIX}_gems`) || '20', 10),
      energy: parseInt(localStorage.getItem(`${STORAGE_PREFIX}_energy`) || '100', 10),
      totalOrdersServed: parseInt(localStorage.getItem(`${STORAGE_PREFIX}_orders_served`) || '0', 10),
      pawPoints: parseInt(localStorage.getItem(`${STORAGE_PREFIX}_paw_points`) || '0', 10),
      eventPoints: parseInt(localStorage.getItem(`${STORAGE_PREFIX}_event_points`) || '0', 10),
    };

    const boardStr = localStorage.getItem(`${STORAGE_PREFIX}_board`);
    if (boardStr) {
      try { legacyState.board = JSON.parse(boardStr); } catch (e) {}
    }

    const discoveredStr = localStorage.getItem(`${STORAGE_PREFIX}_discovered`);
    if (discoveredStr) {
      try { legacyState.discoveredItemIds = JSON.parse(discoveredStr); } catch (e) {}
    }

    const friendshipStr = localStorage.getItem(`${STORAGE_PREFIX}_friendship`);
    if (friendshipStr) {
      try { legacyState.friendshipData = JSON.parse(friendshipStr); } catch (e) {}
    }

    const equippedStr = localStorage.getItem(`${STORAGE_PREFIX}_equipped_outfits`);
    if (equippedStr) {
      try { legacyState.equippedOutfits = JSON.parse(equippedStr); } catch (e) {}
    }

    const wardrobeStr = localStorage.getItem(`${STORAGE_PREFIX}_unlocked_wardrobe`);
    if (wardrobeStr) {
      try { legacyState.unlockedWardrobeOutfits = JSON.parse(wardrobeStr); } catch (e) {}
    }

    const questsStr = localStorage.getItem(`${STORAGE_PREFIX}_pass_quests`);
    if (questsStr) {
      try { legacyState.claimedPassQuests = JSON.parse(questsStr); } catch (e) {}
    }

    const tiersStr = localStorage.getItem(`${STORAGE_PREFIX}_pass_tiers`);
    if (tiersStr) {
      try { legacyState.claimedPassTiers = JSON.parse(tiersStr); } catch (e) {}
    }

    const guestbookStr = localStorage.getItem(`${STORAGE_PREFIX}_guestbook_tiers`);
    if (guestbookStr) {
      try { legacyState.claimedGuestbookTiers = JSON.parse(guestbookStr); } catch (e) {}
    }

    const questProgStr = localStorage.getItem(`${STORAGE_PREFIX}_quest_progress`);
    if (questProgStr) {
      try { legacyState.questProgress = JSON.parse(questProgStr); } catch (e) {}
    }

    // Save consolidated state
    localStorage.setItem(UNIFIED_SAVE_KEY, JSON.stringify(legacyState));
    return legacyState;
  } catch (err) {
    console.warn('[saveManager] Migration error:', err);
    return null;
  }
}

/**
 * Save unified game state
 */
export function saveUnifiedGame(state) {
  try {
    const payload = {
      ...state,
      version: SCHEMA_VERSION,
      lastSavedAt: Date.now()
    };
    localStorage.setItem(UNIFIED_SAVE_KEY, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.error('[saveManager] Failed to save game state:', err);
    return false;
  }
}

/**
 * Load unified game state with fallback to legacy migration
 */
export function loadUnifiedGame() {
  try {
    const saved = localStorage.getItem(UNIFIED_SAVE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
    return migrateLegacySave();
  } catch (err) {
    console.error('[saveManager] Failed to load game state:', err);
    return null;
  }
}

/**
 * Export save data as formatted JSON string
 */
export function exportSaveData(state) {
  return JSON.stringify({
    ...state,
    version: SCHEMA_VERSION,
    exportedAt: new Date().toISOString(),
    game: 'Zorro Merge Cats'
  }, null, 2);
}

/**
 * Import save data from JSON string with validation
 */
export function importSaveData(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid JSON structure');
    }
    if (typeof parsed.level !== 'number' || !Array.isArray(parsed.board)) {
      throw new Error('Missing required game state fields (level, board)');
    }
    return {
      success: true,
      data: parsed
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}

/**
 * Reset game save completely
 */
export function resetUnifiedGame() {
  try {
    localStorage.removeItem(UNIFIED_SAVE_KEY);
    // Also clean legacy keys
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
    return true;
  } catch (err) {
    console.error('[saveManager] Failed to reset game:', err);
    return false;
  }
}
