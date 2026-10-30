// Limited Event Data: Zorro's Birthday Festival

export const BIRTHDAY_EVENT = {
  id: 'event_zorro_birthday',
  title: 'Pesta Ulang Tahun Zorro',
  subtitle: 'Rayakan hari spesial Raja Tuxedo Zorro bersama Nina & kawan-kawan! 🎂👑',
  bannerIcon: '🎂',
  endDate: 'Tersisa 3 Hari',
  tiers: [
    {
      tier: 1,
      name: 'Balon Pesta Warna-Warni',
      requiredPoints: 40,
      reward: { type: 'energy', value: 30, label: '30 ⚡ Energi' },
      icon: '🎈'
    },
    {
      tier: 2,
      name: 'Topi Kerucut Pesta',
      requiredPoints: 100,
      reward: { type: 'coins', value: 100, label: '100 🪙 Koin' },
      icon: '🎉'
    },
    {
      tier: 3,
      name: 'Kotak Kejutan Zorro',
      requiredPoints: 200,
      reward: { type: 'scissors', value: 1, label: '✂️ Gunting Pemisah Ajaib' },
      icon: '🎁'
    },
    {
      tier: 4,
      name: 'Paw Keberuntungan',
      requiredPoints: 320,
      reward: { type: 'joker', value: 1, label: '🪄 Paw Bintang Ajaib' },
      icon: '⭐'
    },
    {
      tier: 5,
      name: 'Kue Salmon Tingkat Tiga Zorro',
      requiredPoints: 450,
      reward: { type: 'grand_event', value: 1, label: '🎂 Kue Pesta Kafe + 3 ⭐ Bintang' },
      icon: '👑'
    }
  ]
};
