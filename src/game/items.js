// ============================================================================
// Item registry — every mergeable thing on the board lives here.
// An item id is `${chain}_${tier}`, e.g. "coffee_3".
// ============================================================================

export const CHAINS = {
  coffee: {
    name: 'Kopi',
    color: '#8b5a3c',
    unlock: 1,
    items: [
      { name: 'Biji Kopi', desc: 'Biji kopi pilihan, wangi banget.' },
      { name: 'Espresso', desc: 'Satu shot pekat untuk memulai hari.' },
      { name: 'Americano', desc: 'Kopi hitam hangat dalam mug.' },
      { name: 'Latte', desc: 'Kopi susu berlapis yang lembut.' },
      { name: 'Cappuccino Kucing', desc: 'Ada wajah kucing di busanya!' },
      { name: 'Mocha Krim', desc: 'Cokelat, kopi, dan krim kocok.' },
      { name: 'Frappé Karamel', desc: 'Dingin, manis, dan menyegarkan.' },
      { name: 'Set Kopi Zorro', desc: 'Menu andalan kafe. Legendaris!' },
    ],
  },
  bread: {
    name: 'Roti',
    color: '#d99a4e',
    unlock: 1,
    items: [
      { name: 'Tepung', desc: 'Sekarung tepung terigu.' },
      { name: 'Adonan', desc: 'Adonan kenyal siap dipanggang.' },
      { name: 'Roti Bulat', desc: 'Roti hangat yang empuk.' },
      { name: 'Croissant', desc: 'Berlapis-lapis dan renyah.' },
      { name: 'Roti Kucing', desc: 'Roti berbentuk kepala kucing.' },
      { name: 'Keranjang Roti', desc: 'Sekeranjang roti aneka rasa.' },
    ],
  },
  cake: {
    name: 'Kue',
    color: '#e86a8a',
    unlock: 3,
    items: [
      { name: 'Stroberi', desc: 'Merah, manis, dan segar.' },
      { name: 'Cupcake', desc: 'Cupcake mungil dengan krim pink.' },
      { name: 'Donat', desc: 'Donat bertabur meses warna-warni.' },
      { name: 'Potongan Kue', desc: 'Sepotong kue stroberi.' },
      { name: 'Kue Tart', desc: 'Kue bundar untuk dirayakan.' },
      { name: 'Kue Bertingkat', desc: 'Dua tingkat kebahagiaan.' },
      { name: 'Kue Mahkota Kucing', desc: 'Mahakarya pastry kafe!' },
    ],
  },
  treat: {
    name: 'Camilan Kucing',
    color: '#4f8fc0',
    unlock: 4,
    items: [
      { name: 'Ikan Teri', desc: 'Kecil tapi bikin kucing semangat.' },
      { name: 'Ikan Segar', desc: 'Baru dari pasar pagi ini.' },
      { name: 'Kaleng Tuna', desc: 'Tuna premium untuk pelanggan setia.' },
      { name: 'Sushi Ikan', desc: 'Sushi khusus lidah kucing.' },
      { name: 'Onigiri Kucing', desc: 'Nasi kepal bertelinga kucing.' },
      { name: 'Bento Kucing', desc: 'Kotak bekal paling mewah.' },
    ],
  },
  tea: {
    name: 'Teh',
    color: '#5f9a4a',
    unlock: 6,
    items: [
      { name: 'Daun Teh', desc: 'Pucuk teh hijau segar.' },
      { name: 'Teh Hangat', desc: 'Secangkir teh yang menenangkan.' },
      { name: 'Teh Susu', desc: 'Teh dengan susu yang creamy.' },
      { name: 'Boba', desc: 'Teh susu dengan mutiara kenyal.' },
      { name: 'Matcha Latte', desc: 'Hijau, lembut, dan wangi.' },
      { name: 'Set Teh Sore', desc: 'Teko antik dan cangkir cantik.' },
    ],
  },
};

export const REWARD_CHAINS = {
  coin: {
    name: 'Koin',
    items: [
      { name: 'Koin', desc: 'Ketuk untuk mengambil 5 koin.', amount: 5 },
      { name: 'Tumpukan Koin', desc: 'Ketuk untuk mengambil 15 koin.', amount: 15 },
      { name: 'Kantong Koin', desc: 'Ketuk untuk mengambil 40 koin.', amount: 40 },
      { name: 'Peti Koin', desc: 'Ketuk untuk mengambil 100 koin.', amount: 100 },
    ],
  },
  energy: {
    name: 'Energi',
    items: [
      { name: 'Energi Kecil', desc: 'Ketuk untuk +5 energi.', amount: 5 },
      { name: 'Botol Energi', desc: 'Ketuk untuk +12 energi.', amount: 12 },
      { name: 'Toples Energi', desc: 'Ketuk untuk +30 energi.', amount: 30 },
      { name: 'Baterai Super', desc: 'Ketuk untuk +75 energi.', amount: 75 },
    ],
  },
  gem: {
    name: 'Permata',
    items: [
      { name: 'Permata Kecil', desc: 'Ketuk untuk +1 permata.', amount: 1 },
      { name: 'Permata', desc: 'Ketuk untuk +3 permata.', amount: 3 },
      { name: 'Kristal Permata', desc: 'Ketuk untuk +8 permata.', amount: 8 },
    ],
  },
  chest: {
    name: 'Kotak Hadiah',
    items: [
      { name: 'Kotak Hadiah', desc: 'Ketuk untuk membuka 3 hadiah.', amount: 3 },
      { name: 'Kotak Hadiah Besar', desc: 'Ketuk untuk membuka 5 hadiah.', amount: 5 },
      { name: 'Peti Harta', desc: 'Ketuk untuk membuka 8 hadiah.', amount: 8 },
    ],
  },
};

export const GENERATORS = {
  coffee: { name: 'Mesin Kopi', chain: 'coffee' },
  bread: { name: 'Oven', chain: 'bread' },
  cake: { name: 'Etalase Kue', chain: 'cake' },
  treat: { name: 'Keranjang Ikan', chain: 'treat' },
  tea: { name: 'Teko Antik', chain: 'tea' },
};
export const GEN_MAX = 3;

// Spawn odds per generator level: [tier1, tier2, tier3]
const GEN_ODDS = { 1: [1, 0, 0], 2: [0.72, 0.28, 0], 3: [0.55, 0.35, 0.1] };

const ITEMS = {};

function add(def) {
  ITEMS[def.id] = def;
}

for (const [chain, c] of Object.entries(CHAINS)) {
  c.items.forEach((it, i) => {
    const tier = i + 1;
    add({
      id: `${chain}_${tier}`,
      kind: 'food',
      chain,
      tier,
      max: c.items.length,
      name: it.name,
      desc: it.desc,
      value: 2 ** i,
      sell: Math.max(1, Math.round(2 ** i * 0.6)),
    });
  });
}

for (const [chain, c] of Object.entries(REWARD_CHAINS)) {
  c.items.forEach((it, i) => {
    const tier = i + 1;
    add({
      id: `${chain}_${tier}`,
      kind: chain === 'chest' ? 'chest' : 'reward',
      chain,
      tier,
      max: c.items.length,
      name: it.name,
      desc: it.desc,
      amount: it.amount,
      value: 0,
      sell: 0,
    });
  });
}

for (const [key, g] of Object.entries(GENERATORS)) {
  for (let lv = 1; lv <= GEN_MAX; lv++) {
    add({
      id: `gen${key}_${lv}`,
      kind: 'gen',
      chain: `gen${key}`,
      produces: g.chain,
      tier: lv,
      max: GEN_MAX,
      name: g.name,
      desc: `Ketuk untuk membuat ${CHAINS[g.chain].name.toLowerCase()}. Gabungkan dua ${g.name} untuk naik level.`,
      odds: GEN_ODDS[lv],
      value: 0,
      sell: 0,
    });
  }
}

// Booster tools: drag onto an item to use
add({ id: 'joker_1', kind: 'tool', chain: 'joker', tier: 1, max: 1, name: 'Paw Ajaib', desc: 'Seret ke item mana pun untuk menaikkannya satu level!', value: 0, sell: 0 });
add({ id: 'scissors_1', kind: 'tool', chain: 'scissors', tier: 1, max: 1, name: 'Gunting Ajaib', desc: 'Seret ke item Lv 2+ untuk memecahnya jadi dua item satu level di bawahnya.', value: 0, sell: 0 });

export function item(id) {
  return ITEMS[id];
}
export function allItems() {
  return ITEMS;
}
export function nextId(id) {
  const it = ITEMS[id];
  if (!it || it.tier >= it.max) return null;
  return `${it.chain}_${it.tier + 1}`;
}
export function chainIds(chain) {
  return Object.values(ITEMS)
    .filter((i) => i.chain === chain)
    .sort((a, b) => a.tier - b.tier)
    .map((i) => i.id);
}
export function rollGeneratorOutput(genId, rng = Math.random) {
  const g = ITEMS[genId];
  const r = rng();
  let acc = 0;
  for (let t = 0; t < g.odds.length; t++) {
    acc += g.odds[t];
    if (r < acc) return `${g.produces}_${t + 1}`;
  }
  return `${g.produces}_1`;
}
