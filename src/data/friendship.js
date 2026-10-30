// Cat Friendship & Feeding System Data for Zorro, Thor, and Loki

export const CAT_FRIENDSHIP = {
  zorro: {
    id: 'zorro',
    name: 'Zorro',
    title: 'Raja Tuxedo Nina',
    avatar: '🐾',
    color: '#0F172A',
    bgBadge: '#1E293B',
    favFoodIds: ['food_2', 'food_4', 'food_6'],
    quotes: [
      'Mrrroow! *Zorro mengusapkan kepalanya manja setelah makan tuna!*',
      'Purrrr... *Zorro menjilati kumis putihnya dengan puas*',
      'Meoow! (Zorro menatap Nina dengan mata hijau berbinar-binar!)'
    ],
    levels: [
      { level: 1, title: 'Kucing Manja Nina', xpNeeded: 0, reward: null },
      { level: 2, title: 'Teman Setia Dapur', xpNeeded: 50, reward: { type: 'energy', value: 20, label: '20 ⚡ Energi' } },
      { level: 3, title: 'Raja Kasur Beludru', xpNeeded: 120, reward: { type: 'coins', value: 80, label: '80 🪙 Koin' } },
      { level: 4, title: 'Penjaga Kafe Sejati', xpNeeded: 220, reward: { type: 'gift', value: 1, label: '🎁 Kotak Hadiah Zorro' } },
      { level: 5, title: 'Sahabat Jiwa Nina', xpNeeded: 350, reward: { type: 'stars', value: 2, label: '2 ⭐ Bintang + 100 🪙' } },
    ]
  },
  thor: {
    id: 'thor',
    name: 'Thor',
    title: 'Kitten Penasaran',
    avatar: '🐱',
    color: '#78716C',
    bgBadge: '#57534E',
    favFoodIds: ['food_1', 'food_3'],
    quotes: [
      'Meww! *Thor menjilati saus churu sampai ke hidung mungilnya!*',
      'Meoow! *Thor melompat gembira dengan ekor tegak ke atas!*',
      '*Thor berguling manja di depan Nina sambil mendengkur halus*'
    ],
    levels: [
      { level: 1, title: 'Anak Kucing Penasaran', xpNeeded: 0, reward: null },
      { level: 2, title: 'Pengejar Bola Benang', xpNeeded: 40, reward: { type: 'energy', value: 20, label: '20 ⚡ Energi' } },
      { level: 3, title: 'Teman Main Nina', xpNeeded: 100, reward: { type: 'coins', value: 80, label: '80 🪙 Koin' } },
      { level: 4, title: 'Penjelajah Kardus', xpNeeded: 190, reward: { type: 'scissors', value: 1, label: '✂️ Gunting Pemisah Ajaib' } },
      { level: 5, title: 'Kitten Kesayangan', xpNeeded: 300, reward: { type: 'stars', value: 2, label: '2 ⭐ Bintang + 80 🪙' } },
    ]
  },
  loki: {
    id: 'loki',
    name: 'Loki',
    title: 'Singa Oren Kafe',
    avatar: '🦁',
    color: '#EA580C',
    bgBadge: '#C2410C',
    favFoodIds: ['food_3', 'food_5'],
    quotes: [
      'Mrrooww... *Loki mengunyah potongan ayam panggang dengan nikmat!*',
      '*Loki mengibaskan surai lebatnya penuh rasa bangga*',
      'Purrr... *Loki memejamkan mata menikmati traktiran dari Nina*'
    ],
    levels: [
      { level: 1, title: 'Si Singa Santai', xpNeeded: 0, reward: null },
      { level: 2, title: 'Penikmat Sinar Matahari', xpNeeded: 45, reward: { type: 'energy', value: 20, label: '20 ⚡ Energi' } },
      { level: 3, title: 'Penguasa Sofa Kafe', xpNeeded: 110, reward: { type: 'coins', value: 80, label: '80 🪙 Koin' } },
      { level: 4, title: 'Kucing Oren Berwibawa', xpNeeded: 200, reward: { type: 'joker', value: 1, label: '🪄 Paw Bintang Ajaib' } },
      { level: 5, title: 'Singa Pelindung Nina', xpNeeded: 320, reward: { type: 'stars', value: 2, label: '2 ⭐ Bintang + 100 🪙' } },
    ]
  }
};

// Treats available for purchase or feeding
export const TREAT_ITEMS = [
  { id: 'treat_kibble', itemId: 'food_1', name: 'Butiran Kibble', icon: '🥣', xp: 15, coinCost: 15 },
  { id: 'treat_tuna', itemId: 'food_2', name: 'Kaleng Tuna', icon: '🥫', xp: 25, coinCost: 25 },
  { id: 'treat_churu', itemId: 'food_3', name: 'Snack Churu', icon: '🍦', xp: 45, coinCost: 45 },
  { id: 'treat_salmon', itemId: 'food_4', name: 'Mangkok Salmon', icon: '🍣', xp: 75, coinCost: 70 },
  { id: 'treat_chicken', itemId: 'food_5', name: 'Ayam Panggang', icon: '🍗', xp: 110, coinCost: 100 },
];
