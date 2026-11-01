// ============================================================================
// Game engine: pure-ish state transitions. Every action receives a mutable
// draft (already cloned) plus an `emit(type, data)` callback for UI effects.
// ============================================================================
import { VIP_MS, COLS, ROWS, CELLS, ENERGY_MAX, ENERGY_REGEN_MS, STORAGE_START, STORAGE_MAX, BUBBLE_MS, BUBBLE_CHANCE, FREE_GIFT_MS, xpForLevel, levelRewards, orderSlots } from './config';
import { item, nextId, rollGeneratorOutput, CHAINS, GENERATORS } from './items';
import { makeOrder, scriptedOrder, SCRIPTED_ORDERS, unlockedChains, maxTierFor } from './orders';
import { PETS, heartsFor, MAX_HEARTS } from './pets';
import { COSTUMES } from './costumes';
import { recipe, masteryOf, rushCost } from './kitchen';
import { SPOTS, SPOT_MAX, spotTime, upgradeCost } from './village';
import { REP_TIERS, REVIEW_LINES } from './guestbook';
import { ensureFest, FEST_TRACK, FEST_LEVEL, ACHIEVEMENTS, ACH_GEMS, achState, WHEEL, WHEEL_EXTRA_COST, WHEEL_EXTRA_MAX } from './meta';
import { AREAS, taskXp } from './areas';
import { makeDailyQuests, dayKey, DAILY_REWARDS, seededRng } from './quests';

let uidCounter = Date.now() % 100000;
export const uid = () => 'i' + (uidCounter++).toString(36);

export const idx = (r, c) => r * COLS + c;
export const rc = (i) => [Math.floor(i / COLS), i % COLS];

function neighbors(i) {
  const [r, c] = rc(i);
  const out = [];
  if (r > 0) out.push(idx(r - 1, c));
  if (r < ROWS - 1) out.push(idx(r + 1, c));
  if (c > 0) out.push(idx(r, c - 1));
  if (c < COLS - 1) out.push(idx(r, c + 1));
  return out;
}

export function nearestEmpty(board, from) {
  const [fr, fc] = rc(from);
  let best = -1;
  let bestD = Infinity;
  for (let i = 0; i < CELLS; i++) {
    if (board[i]) continue;
    const [r, c] = rc(i);
    const d = (r - fr) ** 2 + (c - fc) ** 2 + (r > fr ? 0.01 : 0); // prefer upward ties
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}

export function emptyCount(board) {
  return board.reduce((n, c) => n + (c ? 0 : 1), 0);
}

// ---------------------------------------------------------------------------
// New game
// ---------------------------------------------------------------------------
function starterBoard() {
  const rng = seededRng('zorro-start');
  const b = new Array(CELLS).fill(null);
  const boxPool = ['coffee_1', 'coffee_1', 'coffee_2', 'coffee_2', 'coffee_3', 'bread_1', 'bread_1', 'bread_2', 'bread_2', 'bread_3', 'coin_1', 'coin_1', 'energy_1', 'energy_1', 'gem_1', 'cake_1', 'cake_1', 'cake_2', 'coffee_1', 'bread_1'];
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < COLS; c++) {
      const id = boxPool[Math.floor(rng() * boxPool.length)];
      b[idx(r, c)] = { id, uid: uid(), st: 'box' };
    }
  }
  const webRow = ['coffee_1', 'bread_1', 'coffee_2', 'energy_1', 'bread_2', 'coffee_1', 'bread_1'];
  webRow.forEach((id, c) => (b[idx(4, c)] = { id, uid: uid(), st: 'web' }));
  b[idx(7, 1)] = { id: 'gencoffee_1', uid: uid() };
  b[idx(7, 5)] = { id: 'genbread_1', uid: uid() };
  b[idx(5, 0)] = { id: 'coin_1', uid: uid() };
  b[idx(5, 6)] = { id: 'energy_1', uid: uid() };
  return b;
}

export function newGame() {
  const now = Date.now();
  const s = {
    v: 2,
    created: now,
    coins: 20,
    gems: 15,
    energy: ENERGY_MAX,
    energyTs: now,
    level: 1,
    xp: 0,
    board: starterBoard(),
    storage: [],
    storageSlots: STORAGE_START,
    gifts: [],
    orders: [],
    orderSeq: 1,
    scripted: 0,
    areaIdx: 0,
    areas: {},
    residents: ['zorro'],
    discovered: {},
    quests: null,
    daily: { last: null, streak: 0 },
    shop: { day: null, bought: {}, freeAt: 0, storageBuys: 0 },
    stats: { merges: 0, spawns: 0, served: 0, coins: 0 },
    settings: { sfx: true, music: true, vibe: true },
    tut: 0,
    seen: {},
    pendingLevel: [],
    pets: {},
    fest: null,
    ach: {},
    wardrobe: { owned: [], outfit: {} },
    kitchen: { slot: null, mastery: {} },
    village: {},
  };
  for (const cell of s.board) if (cell && cell.st !== 'box') s.discovered[cell.id] ??= 1;
  fillOrders(s);
  refreshDay(s);
  ensurePets(s);
  return s;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function discover(s, id, emit) {
  if (!s.discovered[id]) {
    s.discovered[id] = 1;
    const it = item(id);
    if (it.kind === 'food' && it.tier > 1) emit('discover', { id });
  }
}

function questProgress(s, type, n = 1) {
  if (!s.quests) return;
  for (const q of s.quests.list) if (q.type === type && !q.claimed) q.progress = Math.min(q.target, q.progress + n);
}

export function fillOrders(s, rng = Math.random) {
  const want = orderSlots(s.level);
  while (s.orders.length < want) {
    let o;
    if (s.scripted < SCRIPTED_ORDERS.length && s.tut < 99) {
      o = scriptedOrder(s.scripted, s.orderSeq++);
      s.scripted++;
    } else {
      o = makeOrder(s.level, s.orderSeq++, rng, s.orders.map((x) => x.cat));
      // Occasional VIP guest: limited time, double coins, bonus gems
      if (s.level >= 4 && !s.orders.some((x) => x.vip) && rng() < 0.12) {
        o.vip = Date.now() + VIP_MS;
        o.coins *= 2;
        o.xp = Math.round(o.xp * 1.5);
        o.gems = 2 + Math.floor(s.level / 4);
      }
    }
    s.orders.push(o);
  }
}

function giveCurrency(s, r, emit, from) {
  if (r.coins) {
    s.coins += r.coins;
    s.stats.coins += r.coins;
    questProgress(s, 'coins', r.coins);
    emit('gain', { kind: 'coins', amount: r.coins, from });
  }
  if (r.gems) {
    s.gems += r.gems;
    emit('gain', { kind: 'gems', amount: r.gems, from });
  }
  if (r.energy) {
    s.energy += r.energy;
    emit('gain', { kind: 'energy', amount: r.energy, from });
  }
  if (r.xp) addXp(s, r.xp, emit, from);
  if (r.item) s.gifts.push(r.item);
  if (r.items) s.gifts.push(...r.items);
}

export function addXp(s, amount, emit, from) {
  s.xp += amount;
  emit('gain', { kind: 'xp', amount, from });
  while (s.xp >= xpForLevel(s.level)) {
    s.xp -= xpForLevel(s.level);
    s.level += 1;
    const rew = levelRewards(s.level);
    const unlocks = Object.entries(CHAINS)
      .filter(([, c]) => c.unlock === s.level)
      .map(([k]) => k);
    s.pendingLevel.push({ level: s.level, ...rew, unlocks });
  }
}

// ---------------------------------------------------------------------------
// Time
// ---------------------------------------------------------------------------
export function tick(s, now, emit) {
  // Energy regen (only below max; items/purchases can push above max)
  if (s.energy >= ENERGY_MAX) {
    s.energyTs = now;
  } else {
    const gained = Math.floor((now - s.energyTs) / ENERGY_REGEN_MS);
    if (gained > 0) {
      s.energy = Math.min(ENERGY_MAX, s.energy + gained);
      s.energyTs += gained * ENERGY_REGEN_MS;
      if (s.energy >= ENERGY_MAX) s.energyTs = now;
    }
  }
  // Bubbles expire into a coin
  s.board.forEach((cell, i) => {
    if (cell?.bubble && cell.bubble < now) {
      s.board[i] = { id: 'coin_1', uid: uid(), pop: true };
      emit('bubbleExpire', { idx: i });
    }
  });
  // VIP guests leave when their patience runs out
  const before = s.orders.length;
  s.orders = s.orders.filter((o) => !o.vip || o.vip > now);
  if (s.orders.length < before) {
    emit('toast', { text: 'Tamu VIP sudah pergi… lain kali lebih cepat, ya!' });
    fillOrders(s);
  }
  refreshDay(s);
}

function festPoints(s, n, emit, from) {
  ensureFest(s);
  if (s.level < FEST_LEVEL || n <= 0) return;
  s.fest.pts += n;
  emit('gain', { kind: 'fest', amount: n, from });
}

function refreshDay(s) {
  ensureFest(s);
  const day = dayKey();
  if (!s.quests || s.quests.day !== day) s.quests = { day, list: makeDailyQuests(day, s.level) };
  if (s.shop.day !== day) {
    s.shop.day = day;
    s.shop.bought = {};
  }
}

export function energyNextIn(s, now) {
  if (s.energy >= ENERGY_MAX) return 0;
  return Math.max(0, ENERGY_REGEN_MS - (now - s.energyTs));
}

// ---------------------------------------------------------------------------
// Board actions
// ---------------------------------------------------------------------------
export function spawn(s, from, emit) {
  const g = s.board[from];
  if (!g || g.st || item(g.id).kind !== 'gen') return false;
  if (s.energy < 1) {
    emit('needEnergy');
    return false;
  }
  const to = nearestEmpty(s.board, from);
  if (to < 0) {
    emit('toast', { text: 'Papan penuh! Gabungkan, jual, atau simpan item dulu.' });
    emit('fail', { idx: from });
    return false;
  }
  const id = rollGeneratorOutput(g.id);
  if (s.energy >= ENERGY_MAX) s.energyTs = Date.now();
  s.energy -= 1;
  s.board[to] = { id, uid: uid(), from };
  s.stats.spawns++;
  questProgress(s, 'spawn');
  discover(s, id, emit);
  emit('spawn', { from, to, id });
  return true;
}

// Can tool `a` be used on target cell `b`?
export function canTool(a, b) {
  if (!a || !b || a.uid === b.uid || b.st === 'box' || b.bubble) return false;
  const ta = item(a.id);
  if (ta.kind !== 'tool') return false;
  const tb = item(b.id);
  if (tb.kind !== 'food') return false;
  if (a.id === 'joker_1') return !!nextId(b.id);
  if (a.id === 'scissors_1') return tb.tier >= 2 && !b.st;
  return false;
}

export function canMerge(a, b) {
  if (!a || !b || a.uid === b.uid) return false;
  if (a.st || a.bubble || b.st === 'box' || b.bubble) return false;
  return a.id === b.id && !!nextId(a.id);
}

export function move(s, from, to, emit) {
  if (from === to) return false;
  const a = s.board[from];
  const b = s.board[to];
  if (!a || a.st) return false;
  if (canTool(a, b)) {
    if (a.id === 'joker_1') {
      const nid = nextId(b.id);
      s.board[from] = null;
      s.board[to] = { id: nid, uid: uid(), merged: true };
      s.stats.merges++;
      questProgress(s, 'merge');
      discover(s, nid, emit);
      emit('merge', { idx: to, id: nid, freed: b.st === 'web', tool: true });
      return true;
    }
    // scissors: the tool's own cell receives the second half
    const lower = `${item(b.id).chain}_${item(b.id).tier - 1}`;
    s.board[to] = { id: lower, uid: uid(), merged: true };
    s.board[from] = { id: lower, uid: uid(), from: to };
    emit('split', { idx: to, id: lower });
    return true;
  }
  if (canMerge(a, b)) {
    const nid = nextId(a.id);
    s.board[from] = null;
    s.board[to] = { id: nid, uid: uid(), merged: true };
    s.stats.merges++;
    questProgress(s, 'merge');
    const it = item(nid);
    if (it.kind === 'food' && it.tier >= 5) questProgress(s, 'tier5');
    discover(s, nid, emit);
    // Opening boxes next to the merge
    for (const n of neighbors(to)) {
      const c = s.board[n];
      if (c?.st === 'box') {
        c.st = 'web';
        discover(s, c.id, emit);
        emit('unbox', { idx: n });
      }
    }
    // Bubble bonus
    if (it.kind === 'food' && it.tier >= 3 && Math.random() < BUBBLE_CHANCE) {
      const e = nearestEmpty(s.board, to);
      if (e >= 0) {
        s.board[e] = { id: nid, uid: uid(), bubble: Date.now() + BUBBLE_MS, from: to };
        emit('bubble', { idx: e });
      }
    }
    emit('merge', { idx: to, id: nid, freed: b.st === 'web' });
    if (s.tut === 2) s.tut = 3;
    return true;
  }
  if (b && (b.st || b.bubble)) return false;
  // move / swap
  s.board[to] = a;
  s.board[from] = b;
  delete a.from;
  delete a.merged;
  if (b) {
    delete b.from;
    delete b.merged;
  }
  emit('move', { from, to, swap: !!b });
  return true;
}

export function collect(s, i, emit) {
  const cell = s.board[i];
  if (!cell || cell.st || cell.bubble) return false;
  const it = item(cell.id);
  if (it.kind === 'reward') {
    s.board[i] = null;
    const kind = it.chain === 'coin' ? 'coins' : it.chain === 'gem' ? 'gems' : 'energy';
    giveCurrency(s, { [kind]: it.amount }, emit, { idx: i });
    questProgress(s, 'collect');
    emit('collect', { idx: i, id: cell.id });
    return true;
  }
  if (it.kind === 'chest') {
    let left = cell.left ?? it.amount;
    const chains = unlockedChains(s.level);
    let spawned = 0;
    while (left > 0) {
      const to = nearestEmpty(s.board, i);
      if (to < 0) break;
      const r = Math.random();
      let id;
      if (r < 0.2) id = 'coin_' + (it.tier >= 2 && Math.random() < 0.4 ? 2 : 1);
      else if (r < 0.38) id = 'energy_' + (it.tier >= 3 && Math.random() < 0.4 ? 2 : 1);
      else if (r < 0.46) id = 'gem_1';
      else {
        const ch = chains[Math.floor(Math.random() * chains.length)];
        id = `${ch}_${1 + Math.floor(Math.random() * Math.min(3, it.tier + 1))}`;
      }
      s.board[to] = { id, uid: uid(), from: i };
      discover(s, id, emit);
      left--;
      spawned++;
      if (left === 0) break;
    }
    if (left === 0) {
      s.board[i] = null;
      emit('chestOpen', { idx: i });
    } else {
      cell.left = left;
      if (spawned === 0) emit('toast', { text: 'Papan penuh! Kosongkan tempat dulu.' });
    }
    questProgress(s, 'collect');
    return true;
  }
  return false;
}

export function sell(s, i, emit) {
  const cell = s.board[i];
  if (!cell || cell.st || cell.bubble) return false;
  const it = item(cell.id);
  if (it.kind !== 'food') return false;
  s.board[i] = null;
  s.coins += it.sell;
  emit('sell', { idx: i, cell, coins: it.sell });
  emit('gain', { kind: 'coins', amount: it.sell, from: { idx: i } });
  return true;
}

export function unsell(s, i, cell, coins) {
  if (s.board[i] || s.coins < coins) return false;
  s.board[i] = cell;
  s.coins -= coins;
  return true;
}

export function webCost(id) {
  const it = item(id);
  return Math.max(1, Math.ceil(((it.tier || 1) + 1) / 2) + (it.kind === 'gen' ? 6 : 0));
}

export function freeWeb(s, i, emit) {
  const cell = s.board[i];
  if (!cell || cell.st !== 'web') return false;
  const cost = webCost(cell.id);
  if (s.gems < cost) {
    emit('needGems');
    return false;
  }
  s.gems -= cost;
  delete cell.st;
  cell.merged = true;
  emit('freeWeb', { idx: i });
  return true;
}

export function bubbleCost(id) {
  return Math.max(2, item(id).tier * 2 - 2);
}

export function popBubble(s, i, emit) {
  const cell = s.board[i];
  if (!cell?.bubble) return false;
  const cost = bubbleCost(cell.id);
  if (s.gems < cost) {
    emit('needGems');
    return false;
  }
  s.gems -= cost;
  delete cell.bubble;
  cell.merged = true;
  emit('popBubble', { idx: i });
  return true;
}

export function store(s, i, emit) {
  const cell = s.board[i];
  if (!cell || cell.st || cell.bubble) return false;
  if (s.storage.length >= s.storageSlots) {
    emit('toast', { text: 'Gudang penuh! Tambah slot di Toko.' });
    return false;
  }
  s.board[i] = null;
  s.storage.push(cell.id);
  emit('store', { idx: i });
  return true;
}

export function retrieve(s, slot, emit) {
  const id = s.storage[slot];
  if (!id) return false;
  const to = nearestEmpty(s.board, idx(ROWS - 1, 3));
  if (to < 0) {
    emit('toast', { text: 'Papan penuh!' });
    return false;
  }
  s.storage.splice(slot, 1);
  s.board[to] = { id, uid: uid(), merged: true };
  emit('retrieve', { to });
  return true;
}

export function placeGift(s, emit) {
  if (!s.gifts.length) return false;
  const to = nearestEmpty(s.board, idx(ROWS - 1, 3));
  if (to < 0) {
    emit('toast', { text: 'Papan penuh! Kosongkan satu kotak dulu.' });
    return false;
  }
  const id = s.gifts.shift();
  s.board[to] = { id, uid: uid(), merged: true };
  discover(s, id, emit);
  emit('gift', { to, id });
  return true;
}

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------
// Returns the board indices that would be consumed by an order, or null.
export function findOrderItems(board, order) {
  const used = new Set();
  const out = [];
  for (const id of order.items) {
    let found = -1;
    for (let i = 0; i < board.length; i++) {
      const c = board[i];
      if (c && !c.st && !c.bubble && c.id === id && !used.has(i)) {
        found = i;
        break;
      }
    }
    if (found < 0) return null;
    used.add(found);
    out.push(found);
  }
  return out;
}

export function serve(s, orderUid, emit) {
  const oi = s.orders.findIndex((o) => o.uid === orderUid);
  if (oi < 0) return false;
  const o = s.orders[oi];
  const cells = findOrderItems(s.board, o);
  if (!cells) return false;
  emit('serve', { order: o, cells: cells.map((i) => ({ idx: i, id: s.board[i].id })) });
  for (const i of cells) s.board[i] = null;
  s.orders.splice(oi, 1);
  s.stats.served++;
  if (o.vip) s.stats.vip = (s.stats.vip || 0) + 1;
  // leave a review in the guestbook (keep the latest 20)
  const chain = item(o.items[o.items.length - 1]).chain;
  const lines = Math.random() < 0.3 ? REVIEW_LINES.any : REVIEW_LINES[chain] || REVIEW_LINES.any;
  s.reviews = [{ cat: o.cat, text: lines[Math.floor(Math.random() * lines.length)], stars: o.vip ? 5 : 4 + (Math.random() < 0.6 ? 1 : 0), t: Date.now(), vip: !!o.vip }, ...(s.reviews || [])].slice(0, 20);
  festPoints(s, 1 + o.items.length + (o.vip ? 3 : 0), emit, { order: o.uid });
  questProgress(s, 'serve');
  giveCurrency(s, { coins: o.coins, xp: o.xp, gems: o.gems || 0 }, emit, { order: o.uid });
  if (o.bonus) s.gifts.push(o.bonus);
  fillOrders(s);
  if (s.tut === 3) s.tut = 4;
  return true;
}

export const SWAP_COST = 1;

export function swapOrder(s, orderUid, emit) {
  const oi = s.orders.findIndex((o) => o.uid === orderUid);
  if (oi < 0 || s.tut < 99) return false;
  if (s.gems < SWAP_COST) return emit('needGems'), false;
  s.gems -= SWAP_COST;
  const old = s.orders[oi];
  const o = makeOrder(s.level, s.orderSeq++, Math.random, s.orders.map((x) => x.cat).concat(old.cat));
  s.orders[oi] = o;
  emit('swapOrder', { uid: o.uid });
  return true;
}

// ---------------------------------------------------------------------------
// Resident cats (affection)
// ---------------------------------------------------------------------------
export function petWant(s, cat, rng = Math.random) {
  const p = PETS[cat];
  const unlocked = unlockedChains(s.level);
  const likes = p.likes.filter((c) => unlocked.includes(c));
  const pool = likes.length ? likes : unlocked;
  const chain = pool[Math.floor(rng() * pool.length)];
  const hearts = heartsFor(s.pets[cat]?.pts || 0);
  const maxT = maxTierFor(s.level, chain);
  const t = Math.max(2, Math.min(maxT, 2 + Math.floor(hearts / 1.5)));
  return `${chain}_${t}`;
}

export function ensurePets(s) {
  s.pets ||= {};
  for (const cat of s.residents) {
    if (!PETS[cat]) continue;
    s.pets[cat] ||= { pts: 0, want: null };
    if (!s.pets[cat].want) s.pets[cat].want = petWant(s, cat);
  }
}

// Board cell index (or storage slot) holding the wanted item
export function findPetItem(s, cat) {
  const want = s.pets[cat]?.want;
  if (!want) return null;
  const bi = s.board.findIndex((c) => c && !c.st && !c.bubble && c.id === want);
  if (bi >= 0) return { board: bi };
  const si = s.storage.indexOf(want);
  if (si >= 0) return { storage: si };
  return null;
}

export function feedPet(s, cat, emit) {
  ensurePets(s);
  const pet = s.pets[cat];
  if (!pet) return false;
  const where = findPetItem(s, cat);
  if (!where) return false;
  const it = item(pet.want);
  if (where.board !== undefined) s.board[where.board] = null;
  else s.storage.splice(where.storage, 1);
  const before = heartsFor(pet.pts);
  pet.pts += it.value * 2 + 2;
  const after = heartsFor(pet.pts);
  giveCurrency(s, { energy: 2 + it.tier, coins: it.value * 2 }, emit);
  emit('feed', { cat, id: pet.want });
  for (let h = before + 1; h <= after; h++) {
    const gems = 3 * h;
    s.gems += gems;
    emit('petHeart', { cat, hearts: h, gems, photo: PETS[cat].photos[h] || null });
  }
  pet.want = petWant(s, cat);
  return true;
}

export const CARE_COOLDOWN = 3 * 60 * 60 * 1000;

export function careReadyIn(s, cat, mode, now = Date.now()) {
  const t = s.care?.[cat]?.[mode] || 0;
  return Math.max(0, t + CARE_COOLDOWN - now);
}

// mode: 'pet' (elus) or 'groom' (salon)
export function finishCare(s, cat, mode, emit) {
  if (!s.residents.includes(cat) || careReadyIn(s, cat, mode) > 0) return false;
  ensurePets(s);
  s.care ||= {};
  (s.care[cat] ||= {})[mode] = Date.now();
  const pet = s.pets[cat];
  const before = heartsFor(pet.pts);
  pet.pts += mode === 'groom' ? 8 : 5;
  const after = heartsFor(pet.pts);
  giveCurrency(s, mode === 'groom' ? { coins: 25 + s.level * 3, energy: 6 } : { energy: 8 }, emit);
  for (let h = before + 1; h <= after; h++) {
    const gems = 3 * h;
    s.gems += gems;
    emit('petHeart', { cat, hearts: h, gems, photo: PETS[cat].photos[h] || null });
  }
  emit('care', { cat, mode });
  return true;
}

export function petMaxed(s, cat) {
  return heartsFor(s.pets?.[cat]?.pts || 0) >= MAX_HEARTS;
}

// Old saves: move past areas finished before new areas were added
export function ensureAreaIdx(s) {
  while (s.areaIdx < AREAS.length - 1 && (s.areas[AREAS[s.areaIdx].id] || []).length >= AREAS[s.areaIdx].tasks.length) s.areaIdx++;
}

// Old saves or reordered unlocks: every unlocked chain must own a generator
export function ensureGenerators(s) {
  const owned = new Set();
  const note = (id) => id?.startsWith('gen') && owned.add(id.split('_')[0].slice(3));
  s.board.forEach((c) => c && note(c.id));
  s.storage.forEach(note);
  s.gifts.forEach(note);
  for (const ch of unlockedChains(s.level)) if (!owned.has(ch)) s.gifts.push(`gen${ch}_1`);
}

// ---------------------------------------------------------------------------
// Café restoration
// ---------------------------------------------------------------------------
export function areaProgress(s, ai) {
  const a = AREAS[ai];
  const done = s.areas[a.id] || [];
  return { done: done.length, total: a.tasks.length, complete: done.length >= a.tasks.length };
}

export function doTask(s, ai, taskId, emit) {
  const a = AREAS[ai];
  const t = a.tasks.find((x) => x.id === taskId);
  if (ai > s.areaIdx) return false;
  const done = (s.areas[a.id] ||= []);
  if (!t || done.includes(taskId)) return false;
  if (s.coins < t.cost) {
    emit('needCoins', { need: t.cost - s.coins });
    return false;
  }
  s.coins -= t.cost;
  done.push(taskId);
  emit('task', { area: a.id, task: t });
  festPoints(s, 2, emit);
  addXp(s, taskXp(t.cost), emit, { task: taskId });
  if (done.length === a.tasks.length) {
    const rew = a.reward;
    s.gems += rew.gems;
    if (rew.cat && !s.residents.includes(rew.cat)) s.residents.push(rew.cat);
    ensurePets(s);
    if (ai === s.areaIdx && ai < AREAS.length - 1) s.areaIdx = ai + 1;
    emit('areaComplete', { area: a, reward: rew });
  }
  if (s.tut === 5) s.tut = 6;
  return true;
}

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------
export function claimLevel(s, emit) {
  const p = s.pendingLevel.shift();
  if (!p) return false;
  s.gems += p.gems;
  s.energy += p.energy;
  for (const ch of p.unlocks) {
    const to = nearestEmpty(s.board, idx(ROWS - 1, 3));
    if (to >= 0) {
      s.board[to] = { id: `gen${ch}_1`, uid: uid(), merged: true };
      discover(s, `gen${ch}_1`, emit);
    } else s.gifts.push(`gen${ch}_1`);
  }
  s.gifts.push(...p.items);
  ensureVillage(s);
  fillOrders(s);
  emit('gain', { kind: 'gems', amount: p.gems });
  emit('gain', { kind: 'energy', amount: p.energy });
  return true;
}

export function canClaimDaily(s) {
  return s.daily.last !== dayKey();
}

export function claimDaily(s, emit) {
  if (!canClaimDaily(s)) return false;
  const today = dayKey();
  const y = dayKey(Date.now() - 86400000);
  s.daily.streak = s.daily.last === y ? (s.daily.streak % 7) + 1 : 1;
  s.daily.last = today;
  giveCurrency(s, DAILY_REWARDS[s.daily.streak - 1], emit);
  return true;
}

export function claimQuest(s, qi, emit) {
  const q = s.quests?.list[qi];
  if (!q || q.claimed || q.progress < q.target) return false;
  q.claimed = true;
  giveCurrency(s, q.reward, emit);
  return true;
}

export function claimCodex(s, id, emit) {
  if (s.discovered[id] !== 1) return false;
  const it = item(id);
  s.discovered[id] = 2;
  const gems = Math.max(1, Math.ceil(it.tier / 2));
  giveCurrency(s, { gems }, emit);
  return true;
}

export function claimFest(s, i, emit) {
  ensureFest(s);
  const m = FEST_TRACK[i];
  if (!m || s.fest.claimed.includes(i) || s.fest.pts < m.pts) return false;
  s.fest.claimed.push(i);
  s.stats.festClaims = (s.stats.festClaims || 0) + 1;
  giveCurrency(s, m.r, emit);
  if (m.r.item) emit('toast', { text: 'Hadiah masuk ke tombol Hadiah di papan!', item: m.r.item });
  return true;
}

export function claimAch(s, id, emit) {
  const a = ACHIEVEMENTS.find((x) => x.id === id);
  if (!a) return false;
  const st = achState(s, a);
  if (!st.ready) return false;
  s.ach ||= {};
  s.ach[id] = st.tier + 1;
  giveCurrency(s, { gems: ACH_GEMS[st.tier] }, emit);
  return true;
}

export function wheelState(s) {
  const today = dayKey();
  const w = s.wheel && s.wheel.day === today ? s.wheel : { day: today, free: true, extra: 0, pending: s.wheel?.pending ?? null };
  return w;
}

export function spinWheel(s, emit) {
  const w = wheelState(s);
  if (w.pending !== null && w.pending !== undefined) return w.pending;
  if (!w.free) {
    if (w.extra >= WHEEL_EXTRA_MAX) return null;
    if (s.gems < WHEEL_EXTRA_COST) return emit('needGems'), null;
    s.gems -= WHEEL_EXTRA_COST;
    w.extra++;
  }
  w.free = false;
  const total = WHEEL.reduce((n, x) => n + x.w, 0);
  let r = Math.random() * total;
  let idx = 0;
  while (r >= WHEEL[idx].w) r -= WHEEL[idx++].w;
  w.pending = idx;
  s.wheel = w;
  return idx;
}

export function claimWheel(s, emit) {
  const w = s.wheel;
  if (!w || w.pending === null || w.pending === undefined) return false;
  const slice = WHEEL[w.pending];
  w.pending = null;
  giveCurrency(s, slice.r, emit);
  if (slice.r.item) emit('toast', { text: 'Hadiah masuk ke tombol Hadiah di papan!', item: slice.r.item });
  return true;
}

export function buyCostume(s, id, emit) {
  const c = COSTUMES.find((x) => x.id === id);
  s.wardrobe ||= { owned: [], outfit: {} };
  if (!c || s.wardrobe.owned.includes(id)) return false;
  if (c.price.coins && s.coins < c.price.coins) return emit('needCoins', {}), false;
  if (c.price.gems && s.gems < c.price.gems) return emit('needGems'), false;
  s.coins -= c.price.coins || 0;
  s.gems -= c.price.gems || 0;
  s.wardrobe.owned.push(id);
  emit('costume', { id });
  return true;
}

export function equipCostume(s, cat, id, emit) {
  const c = COSTUMES.find((x) => x.id === id);
  s.wardrobe ||= { owned: [], outfit: {} };
  if (!c || !s.wardrobe.owned.includes(id)) return false;
  const o = (s.wardrobe.outfit[cat] ||= {});
  o[c.slot] = o[c.slot] === id ? null : id;
  emit('equip', { cat, id });
  return true;
}

// ---------------------------------------------------------------- kitchen
function ensureKitchen(s) {
  s.kitchen ||= { slot: null, mastery: {} };
  return s.kitchen;
}

// Where each recipe ingredient would come from: [{board:i}|{storage:j}] or null
export function findIngredients(s, needs) {
  const usedB = new Set();
  const usedS = new Set();
  const out = [];
  for (const id of needs) {
    const bi = s.board.findIndex((c, i) => c && !c.st && !c.bubble && c.id === id && !usedB.has(i));
    if (bi >= 0) {
      usedB.add(bi);
      out.push({ board: bi });
      continue;
    }
    const si = s.storage.findIndex((x, j) => x === id && !usedS.has(j));
    if (si >= 0) {
      usedS.add(si);
      out.push({ storage: si });
      continue;
    }
    out.push(null);
  }
  return out;
}

export function startCook(s, rid, emit) {
  const k = ensureKitchen(s);
  const r = recipe(rid);
  if (!r || k.slot || s.level < r.level) return false;
  const src = findIngredients(s, r.needs);
  if (src.some((x) => !x)) return false;
  src.filter((x) => x.board !== undefined).forEach((x) => (s.board[x.board] = null));
  src
    .filter((x) => x.storage !== undefined)
    .map((x) => x.storage)
    .sort((a, b) => b - a)
    .forEach((j) => s.storage.splice(j, 1));
  k.slot = { id: rid, done: Date.now() + r.time };
  emit('cookStart', { id: rid });
  return true;
}

export function rushCook(s, emit) {
  const k = ensureKitchen(s);
  if (!k.slot) return false;
  const left = k.slot.done - Date.now();
  if (left <= 0) return false;
  const cost = rushCost(left);
  if (s.gems < cost) return emit('needGems'), false;
  s.gems -= cost;
  k.slot.done = Date.now();
  return true;
}

export function collectCook(s, emit) {
  const k = ensureKitchen(s);
  if (!k.slot || k.slot.done > Date.now()) return false;
  const r = recipe(k.slot.id);
  const count = k.mastery[r.id] || 0;
  const m = masteryOf(count);
  k.slot = null;
  k.mastery[r.id] = count + 1;
  s.stats.cooked = (s.stats.cooked || 0) + 1;
  giveCurrency(s, { coins: Math.round(r.coins * (1 + m.bonus)), xp: r.xp }, emit);
  festPoints(s, 3, emit);
  emit('cookDone', { id: r.id, rankUp: masteryOf(count + 1).name !== m.name ? masteryOf(count + 1).name : null });
  return true;
}

// ---------------------------------------------------------------- village
export function spotState(s, id, now = Date.now()) {
  const sp = SPOTS.find((x) => x.id === id);
  const v = s.village?.[id];
  if (!v) return { unlocked: s.level >= sp.level, lv: 0, ready: false, left: 0 };
  const left = Math.max(0, v.next - now);
  return { unlocked: true, lv: v.lv, ready: left === 0, left };
}

export function ensureVillage(s, now = Date.now()) {
  s.village ||= {};
  for (const sp of SPOTS) if (s.level >= sp.level && !s.village[sp.id]) s.village[sp.id] = { lv: 1, next: now + spotTime(sp, 1) / 3 };
}

export function collectSpot(s, id, emit) {
  ensureVillage(s);
  const sp = SPOTS.find((x) => x.id === id);
  const v = s.village[id];
  if (!sp || !v || v.next > Date.now()) return false;
  const g = sp.gives(v.lv);
  v.next = Date.now() + spotTime(sp, v.lv);
  giveCurrency(s, g, emit, { spot: id });
  if (g.items) emit('toast', { text: `${sp.name} mengirim hadiah! Ambil di papan.`, item: g.items[0] });
  emit('spot', { id });
  return true;
}

export function upgradeSpot(s, id, emit) {
  ensureVillage(s);
  const v = s.village[id];
  if (!v || v.lv >= SPOT_MAX) return false;
  const cost = upgradeCost(v.lv);
  if (s.coins < cost) return emit('needCoins', { need: cost - s.coins }), false;
  s.coins -= cost;
  v.lv++;
  emit('spotUp', { id, lv: v.lv });
  return true;
}

export function claimRep(s, i, emit) {
  const t = REP_TIERS[i];
  s.repClaimed ||= [];
  if (!t || !t.r || s.repClaimed.includes(i) || s.stats.served < t.at) return false;
  s.repClaimed.push(i);
  giveCurrency(s, t.r, emit);
  if (t.r.item) emit('toast', { text: 'Hadiah masuk ke tombol Hadiah di papan!', item: t.r.item });
  return true;
}

export function shopOffers(s) {
  const rng = seededRng('shop' + s.shop.day);
  const chains = unlockedChains(s.level);
  const offers = [];
  for (let i = 0; i < 3; i++) {
    const ch = chains[Math.floor(rng() * chains.length)];
    const tier = Math.min(CHAINS[ch].items.length, 2 + Math.floor(rng() * 2) + Math.floor(s.level / 6));
    const it = item(`${ch}_${tier}`);
    offers.push({ key: 'o' + i, id: it.id, price: { coins: it.value * 6 + 10 } });
  }
  offers.push({ key: 'chest', id: 'chest_1', price: { gems: 8 } });
  offers.push({ key: 'joker', id: 'joker_1', price: { gems: 14 } });
  offers.push({ key: 'scissors', id: 'scissors_1', price: { gems: 6 } });
  const gens = chains.slice(-2);
  gens.forEach((ch, i) => offers.push({ key: 'gen' + i, id: `gen${ch}_1`, price: { gems: 20 } }));
  return offers;
}

export function buyOffer(s, offer, emit) {
  if (s.shop.bought[offer.key]) return false;
  if (offer.price.coins && s.coins < offer.price.coins) return emit('needCoins', {}), false;
  if (offer.price.gems && s.gems < offer.price.gems) return emit('needGems'), false;
  s.coins -= offer.price.coins || 0;
  s.gems -= offer.price.gems || 0;
  s.shop.bought[offer.key] = true;
  s.gifts.push(offer.id);
  emit('bought', { id: offer.id });
  return true;
}

export function buyEnergy(s, amount, gems, emit) {
  if (s.gems < gems) return emit('needGems'), false;
  s.gems -= gems;
  s.energy += amount;
  emit('gain', { kind: 'energy', amount });
  return true;
}

export function storageSlotPrice(s) {
  return 10 + s.shop.storageBuys * 10;
}

export function buyStorage(s, emit) {
  if (s.storageSlots >= STORAGE_MAX) return false;
  const p = storageSlotPrice(s);
  if (s.gems < p) return emit('needGems'), false;
  s.gems -= p;
  s.storageSlots++;
  s.shop.storageBuys++;
  emit('toast', { text: 'Slot gudang bertambah!' });
  return true;
}

export function claimFreeGift(s, emit) {
  const now = Date.now();
  if (s.shop.freeAt > now) return false;
  s.shop.freeAt = now + FREE_GIFT_MS;
  const r = Math.random();
  const reward = r < 0.4 ? { coins: 25 + s.level * 5 } : r < 0.75 ? { energy: 20 } : { gems: 3 };
  giveCurrency(s, reward, emit);
  return reward;
}

export { GENERATORS };
