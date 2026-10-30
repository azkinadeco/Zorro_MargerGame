// Daily Quests and Zorro Cat Pass Progression

export const DAILY_QUESTS = [
  {
    id: 'quest_merge',
    title: 'Pakar Menggabung Anabul',
    desc: 'Gabungkan item di papan merge sebanyak 10 kali',
    target: 10,
    rewardPawPoints: 20,
    rewardCoins: 25,
    icon: '🧩'
  },
  {
    id: 'quest_serve',
    title: 'Pelayan Kafe Idaman',
    desc: 'Selesaikan 3 pesanan pelanggan kafe',
    target: 3,
    rewardPawPoints: 30,
    rewardCoins: 40,
    icon: '🧾'
  },
  {
    id: 'quest_pet',
    title: 'Cinta untuk Zorro',
    desc: 'Elus Zorro di kafe sebanyak 5 kali',
    target: 5,
    rewardPawPoints: 15,
    rewardEnergy: 15,
    icon: '🐾'
  },
  {
    id: 'quest_spin',
    title: 'Keberuntungan Hari Ini',
    desc: 'Putar Roda Rezeki Kucing 1 kali',
    target: 1,
    rewardPawPoints: 15,
    rewardCoins: 20,
    icon: '🎡'
  },
  {
    id: 'quest_groom',
    title: 'Salon Bulu Berkilau',
    desc: 'Sisir bulu Zorro di mini-game spa',
    target: 1,
    rewardPawPoints: 20,
    rewardEnergy: 20,
    icon: '🪮'
  }
];

export const CAT_PASS_TIERS = [
  { tier: 1, requiredPawPoints: 20, reward: { type: 'energy', value: 25, label: '+25 ⚡ Energi' }, icon: '⚡' },
  { tier: 2, requiredPawPoints: 50, reward: { type: 'coins', value: 50, label: '+50 🪙 Koin' }, icon: '🪙' },
  { tier: 3, requiredPawPoints: 90, reward: { type: 'gift', value: 1, label: '🎁 Kotak Hadiah Zorro' }, icon: '🎁' },
  { tier: 4, requiredPawPoints: 140, reward: { type: 'stars', value: 2, label: '+2 ⭐ Bintang' }, icon: '⭐' },
  { tier: 5, requiredPawPoints: 200, reward: { type: 'energy', value: 60, label: '+60 ⚡ Super Energi' }, icon: '⚡' },
  { tier: 6, requiredPawPoints: 270, reward: { type: 'coins', value: 120, label: '+120 🪙 Pundi Koin' }, icon: '💰' },
  { tier: 7, requiredPawPoints: 350, reward: { type: 'gift', value: 2, label: '👑 2x Kotak Harta Mewah' }, icon: '👑' },
  { tier: 8, requiredPawPoints: 440, reward: { type: 'stars', value: 5, label: '+5 ⭐ Mega Bintang Kafe' }, icon: '🌟' },
];
