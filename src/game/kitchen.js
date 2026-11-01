// Special recipes: combine board items in the oven, wait, collect big rewards.
const MIN = 60 * 1000;

export const RECIPES = [
  { id: 'muffin', name: 'Muffin Madu Kucing', level: 2, needs: ['bread_3', 'coffee_2'], time: 3 * MIN, coins: 55, xp: 18, plate: 'bread_3', tint: '#f6c58a' },
  { id: 'croissant', name: 'Croissant Cakar', level: 3, needs: ['bread_4', 'cake_2'], time: 5 * MIN, coins: 90, xp: 26, plate: 'bread_4', tint: '#ffd0dd' },
  { id: 'waffle', name: 'Wafel Paw Madu', level: 4, needs: ['bread_4', 'cake_3', 'coffee_3'], time: 8 * MIN, coins: 140, xp: 38, plate: 'cake_3', tint: '#fff3b0' },
  { id: 'bento', name: 'Bento Piknik', level: 5, needs: ['treat_4', 'bread_3'], time: 10 * MIN, coins: 160, xp: 42, plate: 'treat_4', tint: '#cfe9f2' },
  { id: 'tart', name: 'Tart Tuxedo', level: 6, needs: ['cake_4', 'coffee_4'], time: 12 * MIN, coins: 210, xp: 55, plate: 'cake_4', tint: '#e8d5c4' },
  { id: 'teaset', name: 'Paket Teh Sore', level: 7, needs: ['tea_3', 'cake_4', 'bread_4'], time: 15 * MIN, coins: 280, xp: 70, plate: 'tea_3', tint: '#d6f0c8' },
  { id: 'royal', name: 'Shortcake Kerajaan', level: 9, needs: ['cake_5', 'tea_4', 'coffee_5'], time: 25 * MIN, coins: 480, xp: 120, plate: 'cake_5', tint: '#efe4ff' },
];

export const MASTERY = [
  { at: 0, name: 'Pemula', bonus: 0 },
  { at: 3, name: 'Perunggu', bonus: 0.15 },
  { at: 7, name: 'Perak', bonus: 0.3 },
  { at: 12, name: 'Emas', bonus: 0.5 },
];

export function masteryOf(count) {
  let m = MASTERY[0];
  for (const x of MASTERY) if (count >= x.at) m = x;
  return m;
}

export function nextMastery(count) {
  return MASTERY.find((x) => x.at > count) || null;
}

export const recipe = (id) => RECIPES.find((r) => r.id === id);

export function rushCost(msLeft) {
  return Math.max(1, Math.ceil(msLeft / (2 * MIN)));
}
