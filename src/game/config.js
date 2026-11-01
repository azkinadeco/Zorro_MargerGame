export const COLS = 7;
export const ROWS = 9;
export const CELLS = COLS * ROWS;

export const ENERGY_MAX = 100;
export const ENERGY_REGEN_MS = 2 * 60 * 1000; // +1 energy every 2 minutes

export const STORAGE_START = 4;
export const STORAGE_MAX = 12;

export const BUBBLE_MS = 60 * 1000;
export const BUBBLE_CHANCE = 0.07;

export const FREE_GIFT_MS = 4 * 60 * 60 * 1000;

// XP needed to go from level L to L+1
export function xpForLevel(level) {
  return Math.round(12 + 18 * (level - 1) + 4 * (level - 1) ** 2);
}

// Rewards granted when reaching `level`
export function levelRewards(level) {
  const r = { gems: 3 + Math.floor(level / 2), energy: 40, items: [] };
  if (level % 3 === 0) r.items.push('chest_2');
  else r.items.push('chest_1');
  return r;
}

// Order slots grow as you level up
export function orderSlots(level) {
  if (level >= 8) return 4;
  return 3;
}

export const CUSTOMERS = [
  { id: 'mochi', name: 'Mochi', fur: '#fbf4ea', fur2: '#f1dcc4', pattern: 'plain', eye: '#6aa0d8', acc: 'bow', accColor: '#f27ea0' },
  { id: 'oyen', name: 'Oyen', fur: '#f3a04b', fur2: '#d97b2a', pattern: 'tabby', eye: '#7cb342', acc: null },
  { id: 'kiko', name: 'Kiko', fur: '#fffaf2', fur2: '#f19a4c', fur3: '#4a3b35', pattern: 'calico', eye: '#e0a630', acc: 'flower', accColor: '#ffd23f' },
  { id: 'abu', name: 'Abu', fur: '#a9b0bb', fur2: '#7f8794', pattern: 'tabby', eye: '#f5c542', acc: 'glasses', accColor: '#4a3b35' },
  { id: 'coco', name: 'Coco', fur: '#8a5a3b', fur2: '#6b432a', pattern: 'plain', eye: '#f5c542', acc: 'scarf', accColor: '#e34f4f' },
  { id: 'luna', name: 'Luna', fur: '#3d3a46', fur2: '#2a2731', pattern: 'plain', eye: '#ffd54a', acc: 'bow', accColor: '#9b7bea' },
  { id: 'snowy', name: 'Snowy', fur: '#f6efe6', fur2: '#8a6a58', pattern: 'siamese', eye: '#58a6e8', acc: 'hat', accColor: '#6fbfa8' },
  { id: 'belang', name: 'Belang', fur: '#d8c3a5', fur2: '#8d6e52', pattern: 'tabby', eye: '#88b04b', acc: 'scarf', accColor: '#4f8fc0' },
  { id: 'kopi', name: 'Kopi', fur: '#2f2a2b', fur2: '#fffaf2', pattern: 'tuxedo', eye: '#9ccc65', acc: 'bow', accColor: '#e34f4f' },
  { id: 'ciko', name: 'Ciko', fur: '#f5d29a', fur2: '#e6b56f', pattern: 'tabby', eye: '#6aa0d8', acc: 'hat', accColor: '#f27ea0' },
  { id: 'nala', name: 'Nala', fur: '#cfa47a', fur2: '#9c7550', pattern: 'plain', eye: '#7cb342', acc: 'flower', accColor: '#f27ea0' },
  { id: 'kumbang', name: 'Kumbang', fur: '#24222a', fur2: '#24222a', pattern: 'plain', eye: '#ffb02e', acc: 'glasses', accColor: '#c08a3e' },
];
