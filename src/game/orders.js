import { CHAINS, item } from './items';
import { CUSTOMERS } from './config';

export function unlockedChains(level) {
  return Object.entries(CHAINS)
    .filter(([, c]) => c.unlock <= level)
    .map(([k]) => k);
}

function maxTierFor(level, chain) {
  const c = CHAINS[chain];
  const sinceUnlock = level - c.unlock;
  return Math.min(c.items.length, 2 + Math.floor(sinceUnlock / 1.6));
}

function pick(arr, rng) {
  return arr[Math.floor(rng() * arr.length)];
}

export function orderReward(items) {
  const v = items.reduce((s, id) => s + item(id).value, 0);
  const extra = items.length > 1 ? 1.15 : 1;
  return {
    coins: Math.round((v * 2.4 + 3) * extra),
    xp: Math.round((v * 1.4 + 2) * extra),
  };
}

export function makeOrder(level, seq, rng = Math.random, avoidCats = []) {
  const chains = unlockedChains(level);
  let count = 1;
  const r = rng();
  if (level >= 3 && r < 0.4) count = 2;
  if (level >= 6 && r < 0.12) count = 3;

  // Prefer newest chain a bit so the player uses new generators
  const newest = chains[chains.length - 1];
  const items = [];
  for (let i = 0; i < count; i++) {
    const chain = rng() < 0.3 ? newest : pick(chains, rng);
    const maxT = maxTierFor(level, chain);
    const minT = Math.max(1, maxT - 2);
    // weight toward higher tiers within the window
    const span = maxT - minT + 1;
    let t = minT + Math.floor(Math.sqrt(rng()) * span);
    if (t > maxT) t = maxT;
    if (t < 2 && maxT >= 2) t = 2; // tier-1 orders are too trivial
    items.push(`${chain}_${t}`);
  }
  items.sort();
  const pool = CUSTOMERS.filter((c) => !avoidCats.includes(c.id));
  const cat = pick(pool.length ? pool : CUSTOMERS, rng).id;
  const rew = orderReward(items);
  const bonus = rng() < 0.12 ? (rng() < 0.5 ? 'energy_1' : 'coin_2') : null;
  return { uid: `o${seq}`, cat, items, coins: rew.coins, xp: rew.xp, bonus };
}

// Hand-written orders that guide new players through the first minutes.
export const SCRIPTED_ORDERS = [
  { cat: 'mochi', items: ['coffee_2'] },
  { cat: 'oyen', items: ['bread_2'] },
  { cat: 'kiko', items: ['coffee_3'] },
];

export function scriptedOrder(i, seq) {
  const s = SCRIPTED_ORDERS[i];
  const rew = orderReward(s.items);
  return { uid: `o${seq}`, cat: s.cat, items: s.items, coins: rew.coins + 6, xp: rew.xp + 2, bonus: null };
}
