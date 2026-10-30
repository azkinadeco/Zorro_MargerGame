// Customer & Cat Orders for Zorro Merge Cats

export const CUSTOMERS = [
  {
    id: 'zorro',
    name: 'Zorro 🐾',
    title: 'The Mascot Prince',
    avatar: '🐱',
    avatarBg: '#2D3748',
    avatarBorder: '#FFF',
    dialogues: [
      'Mrrrooow! (Zorro sedang lapar dan mengelus kaki Nina!)',
      'Purrrr... *Zorro mengarahkan hidungnya ke mangkuk*',
      '*Zorro mencolek tangan Nina dengan paw berkaos kaki putihnya*'
    ]
  },
  {
    id: 'nina',
    name: 'Nina',
    title: 'Cat Mom & Cafe Owner',
    avatar: '👩🏻‍🦰',
    avatarBg: '#FFE4E6',
    avatarBorder: '#FB7185',
    dialogues: [
      'Hai! Kita butuh perlengkapan ini untuk menyambut tamu cafe!',
      'Zorro kelihatan aktif banget hari ini, ayo siapkan mainannya!',
      'Cafe kita semakin ramai dan menggemaskan berkat bantuanmu!'
    ]
  },
  {
    id: 'thor',
    name: 'Thor 🐾',
    title: 'The Curious Tabby Kitten',
    avatar: '🐱',
    avatarBg: '#E2E8F0',
    avatarBorder: '#94A3B8',
    dialogues: [
      'Meww! *Thor menatap ke atas dengan mata bulat penasaran melihat mainan!*',
      '*Thor melompat lincah mengejar tongkat bulu!*',
      'Purr-mew! (Thor ingin camilan tuna lezat!)'
    ]
  },
  {
    id: 'loki',
    name: 'Loki 🦁',
    title: 'The Fluffy Orange Lion',
    avatar: '🦁',
    avatarBg: '#FED7AA',
    avatarBorder: '#EA580C',
    dialogues: [
      'Mrrroow! *Loki merebahkan surai lebatnya dengan anggun di teras kafe*',
      '*Loki mengibaskan ekor mekar keemasan minta disisir bulunya*',
      'Purrrrrr! (Loki si raja oren menuntut semangkuk salmon hangat!)'
    ]
  },
  {
    id: 'chloe',
    name: 'Chloe',
    title: 'Cat Enthusiast',
    avatar: '👧🏼',
    avatarBg: '#FEF08A',
    avatarBorder: '#EAB308',
    dialogues: [
      'Halo Nina! Kucing oren Milo suka banget sama mainan ini lho!',
      'Bolehkah aku minta snack untuk memberi makan kucing-kucing lucu di teras?',
      'Aku mau foto bersama Zorro si tuxedo ganteng!'
    ]
  },
  {
    id: 'auntie',
    name: 'Tante Sarah',
    title: 'Cozy Neighbor',
    avatar: '👩🏼‍🦱',
    avatarBg: '#E9D5FF',
    avatarBorder: '#A855F7',
    dialogues: [
      'Selamat siang Nina sayang, apakah kamu punya sisir bulu yang lembut?',
      'Kucing-kucing di cafe Nina terawat sekali, baunya harum lavender!',
      'Ini koin hadiah dariku untuk bantu renovasi cafe ya.'
    ]
  },
  {
    id: 'ken',
    name: 'Barista Ken',
    title: 'Coffee & Cat Master',
    avatar: '🧑🏻‍🍳',
    avatarBg: '#FED7AA',
    avatarBorder: '#F97316',
    dialogues: [
      'Pesanan meja 3 butuh sajian kue kucing cantik, Nina!',
      'Aroma kopi cafe berpadu manis dengan dengkuran kucing-kucing santai.',
      'Ayo siapkan pesanan terbaik kita hari ini!'
    ]
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'order_1',
    customerId: 'zorro',
    items: [
      { itemId: 'food_2', count: 1 } // Tuna Can
    ],
    rewardCoins: 35,
    rewardStars: 1,
    dialogue: 'Mrrrooow! Zorro minta kaleng tuna lezat!'
  },
  {
    id: 'order_2',
    customerId: 'nina',
    items: [
      { itemId: 'toys_2', count: 1 } // Feather Wand
    ],
    rewardCoins: 40,
    rewardStars: 1,
    dialogue: 'Nina ingin mengajak Zorro bermain tongkat bulu!'
  },
  {
    id: 'order_3',
    customerId: 'chloe',
    items: [
      { itemId: 'care_1', count: 1 }, // Soft Brush
      { itemId: 'food_1', count: 1 }  // Kitten Kibble
    ],
    rewardCoins: 55,
    rewardStars: 1,
    dialogue: 'Chloe ingin menyisir bulu anak kucing sambil memberi makan.'
  }
];

// Pool of possible order templates as player levels up
const POSSIBLE_ORDER_ITEMS = [
  { items: ['food_2'], coins: 30, stars: 1 },
  { items: ['toys_2'], coins: 35, stars: 1 },
  { items: ['care_2'], coins: 40, stars: 1 },
  { items: ['food_3'], coins: 60, stars: 2 },
  { items: ['toys_3'], coins: 65, stars: 2 },
  { items: ['care_3'], coins: 70, stars: 2 },
  { items: ['cats_2'], coins: 80, stars: 2 },
  { items: ['food_2', 'toys_2'], coins: 75, stars: 2 },
  { items: ['care_2', 'food_3'], coins: 95, stars: 2 },
  { items: ['toys_3', 'food_2'], coins: 90, stars: 2 },
  { items: ['food_4'], coins: 120, stars: 3 },
  { items: ['toys_4'], coins: 130, stars: 3 },
  { items: ['care_4'], coins: 140, stars: 3 },
  { items: ['cats_3'], coins: 150, stars: 3 },
  { items: ['food_4', 'toys_3'], coins: 180, stars: 4 },
  { items: ['food_5'], coins: 220, stars: 4 },
  { items: ['toys_5'], coins: 240, stars: 4 },
  { items: ['cats_4'], coins: 260, stars: 4 },
  { items: ['food_6'], coins: 380, stars: 5 },
  { items: ['toys_6'], coins: 400, stars: 5 },
  { items: ['cats_5'], coins: 420, stars: 5 },
  { items: ['cats_6'], coins: 500, stars: 6, giftBonus: true }, // Legendary Zorro order!
];

export function generateNewOrder(orderId) {
  const customer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
  const template = POSSIBLE_ORDER_ITEMS[Math.floor(Math.random() * POSSIBLE_ORDER_ITEMS.length)];

  const items = template.items.map(itemId => ({ itemId, count: 1 }));
  const dialogue = customer.dialogues[Math.floor(Math.random() * customer.dialogues.length)];

  return {
    id: orderId || `order_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    customerId: customer.id,
    items,
    rewardCoins: template.coins,
    rewardStars: template.stars,
    giftBonus: template.giftBonus || false,
    dialogue
  };
}
