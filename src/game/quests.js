export const QUEST_POOL = [
  { type: 'merge', label: (n) => `Gabungkan ${n} item`, targets: [25, 40, 60], reward: [{ gems: 2 }, { gems: 3 }, { gems: 5 }] },
  { type: 'serve', label: (n) => `Sajikan ${n} pesanan`, targets: [5, 8, 12], reward: [{ energy: 25 }, { energy: 40 }, { gems: 5 }] },
  { type: 'spawn', label: (n) => `Produksi ${n} item`, targets: [30, 50, 80], reward: [{ coins: 40 }, { coins: 80 }, { gems: 4 }] },
  { type: 'coins', label: (n) => `Kumpulkan ${n} koin`, targets: [80, 160, 300], reward: [{ energy: 20 }, { gems: 3 }, { gems: 6 }] },
  { type: 'tier5', label: (n) => `Buat ${n} item level 5+`, targets: [1, 2, 3], reward: [{ gems: 4 }, { gems: 6 }, { gems: 8 }] },
  { type: 'collect', label: (n) => `Ketuk ${n} hadiah di papan`, targets: [3, 5, 8], reward: [{ coins: 30 }, { energy: 20 }, { gems: 3 }] },
];

export const DAILY_REWARDS = [
  { coins: 30 },
  { energy: 30 },
  { gems: 5 },
  { coins: 80 },
  { item: 'chest_1' },
  { energy: 60 },
  { gems: 15, item: 'chest_2' },
];

export function dayKey(t = Date.now()) {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function seededRng(seed) {
  let a = typeof seed === 'number' ? seed : hash(String(seed));
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeDailyQuests(day, level) {
  const rng = seededRng('q' + day);
  const pool = QUEST_POOL.filter((q) => q.type !== 'tier5' || level >= 4);
  const picked = [];
  while (picked.length < 3) {
    const q = pool[Math.floor(rng() * pool.length)];
    if (!picked.includes(q)) picked.push(q);
  }
  return picked.map((q, i) => {
    const d = Math.min(2, Math.floor(level / 5) + (i === 2 ? 1 : 0));
    return { type: q.type, target: q.targets[d], progress: 0, reward: q.reward[d], claimed: false };
  });
}

export function questLabel(q) {
  const def = QUEST_POOL.find((p) => p.type === q.type);
  return def ? def.label(q.target) : q.type;
}
