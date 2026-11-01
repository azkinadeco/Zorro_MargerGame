// Weekly festival track and long-term achievements.
import { heartsFor } from './pets';
import { AREAS } from './areas';

// ------------------------------------------------------------------ festival
export const FEST_THEMES = [
  { name: 'Festival Kue Stroberi', icon: 'cake_5', color: '#f27ea0' },
  { name: 'Pekan Kopi Susu', icon: 'coffee_5', color: '#a8714a' },
  { name: 'Pesta Teh Sore', icon: 'tea_6', color: '#6fae58' },
  { name: 'Karnaval Ikan', icon: 'treat_6', color: '#4f8fc0' },
  { name: 'Hari Roti Hangat', icon: 'bread_6', color: '#d99a4e' },
];

export const FEST_TRACK = [
  { pts: 5, r: { energy: 20 } },
  { pts: 12, r: { coins: 60 } },
  { pts: 20, r: { gems: 5 } },
  { pts: 30, r: { item: 'chest_1' } },
  { pts: 42, r: { energy: 40 } },
  { pts: 56, r: { item: 'scissors_1' } },
  { pts: 72, r: { item: 'coin_3' } },
  { pts: 90, r: { item: 'chest_2' } },
  { pts: 110, r: { energy: 60 } },
  { pts: 135, r: { item: 'joker_1' } },
  { pts: 165, r: { item: 'energy_4' } },
  { pts: 200, r: { gems: 25, item: 'chest_3' } },
];

export const FEST_LEVEL = 3;

// Monday 00:00 local time of the current week
export function weekStart(t = Date.now()) {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  const dow = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - dow);
  return d.getTime();
}

export function weekKey(t = Date.now()) {
  return String(weekStart(t));
}

export function festTheme(key) {
  const n = Math.floor(Number(key) / (7 * 86400000));
  return FEST_THEMES[((n % FEST_THEMES.length) + FEST_THEMES.length) % FEST_THEMES.length];
}

export function festEndsIn(t = Date.now()) {
  return weekStart(t) + 7 * 86400000 - t;
}

export function ensureFest(s) {
  const key = weekKey();
  if (!s.fest || s.fest.week !== key) s.fest = { week: key, pts: 0, claimed: [] };
}

export function festClaimable(s) {
  if (!s.fest || s.level < FEST_LEVEL) return 0;
  return FEST_TRACK.filter((m, i) => s.fest.pts >= m.pts && !s.fest.claimed.includes(i)).length;
}

// ---------------------------------------------------------------- achievements
const areasDone = (s) => AREAS.filter((a) => (s.areas[a.id] || []).length >= a.tasks.length).length;
const totalHearts = (s) => Object.values(s.pets || {}).reduce((n, p) => n + heartsFor(p.pts || 0), 0);

export const ACHIEVEMENTS = [
  { id: 'merge', label: 'Ahli Gabung', desc: (n) => `Gabungkan ${n} item`, targets: [50, 300, 1500], get: (s) => s.stats.merges },
  { id: 'serve', label: 'Pelayan Teladan', desc: (n) => `Sajikan ${n} pesanan`, targets: [20, 120, 500], get: (s) => s.stats.served },
  { id: 'spawn', label: 'Dapur Sibuk', desc: (n) => `Produksi ${n} item`, targets: [100, 600, 2500], get: (s) => s.stats.spawns },
  { id: 'coins', label: 'Kasir Kaya', desc: (n) => `Dapatkan total ${n} koin`, targets: [500, 4000, 20000], get: (s) => s.stats.coins },
  { id: 'vip', label: 'Sahabat VIP', desc: (n) => `Layani ${n} tamu VIP`, targets: [1, 10, 40], get: (s) => s.stats.vip || 0 },
  { id: 'areas', label: 'Arsitek Kafe', desc: (n) => `Selesaikan ${n} ruangan`, targets: [1, 4, AREAS.length], get: areasDone },
  { id: 'hearts', label: 'Pencinta Kucing', desc: (n) => `Kumpulkan ${n} hati kucing`, targets: [3, 9, 15], get: totalHearts },
  { id: 'codex', label: 'Kolektor Resep', desc: (n) => `Temukan ${n} item`, targets: [15, 35, 55], get: (s) => Object.keys(s.discovered).length },
  { id: 'level', label: 'Bintang Kafe', desc: (n) => `Capai level ${n}`, targets: [5, 10, 20], get: (s) => s.level },
  { id: 'fest', label: 'Raja Festival', desc: (n) => `Selesaikan ${n} hadiah festival`, targets: [6, 12, 36], get: (s) => s.stats.festClaims || 0 },
];

export const ACH_GEMS = [5, 12, 25];

export function achState(s, a) {
  const tier = s.ach?.[a.id] || 0; // tiers already claimed
  const val = a.get(s);
  const target = a.targets[Math.min(tier, a.targets.length - 1)];
  return { tier, val, target, done: tier >= a.targets.length, ready: tier < a.targets.length && val >= target };
}

export function achClaimable(s) {
  return ACHIEVEMENTS.filter((a) => achState(s, a).ready).length;
}

// --------------------------------------------------------------- lucky wheel
export const WHEEL = [
  { r: { energy: 15 }, w: 18, color: '#fff3c4' },
  { r: { coins: 30 }, w: 18, color: '#ffe1cc' },
  { r: { gems: 2 }, w: 12, color: '#efe4ff' },
  { r: { energy: 35 }, w: 12, color: '#e3f6d8' },
  { r: { coins: 80 }, w: 10, color: '#ffd9e4' },
  { r: { item: 'chest_1' }, w: 12, color: '#dff1fb' },
  { r: { item: 'scissors_1' }, w: 10, color: '#fff3c4' },
  { r: { gems: 10 }, w: 4, color: '#ffe1cc', jackpot: true },
];
export const WHEEL_EXTRA_COST = 5;
export const WHEEL_EXTRA_MAX = 5;
