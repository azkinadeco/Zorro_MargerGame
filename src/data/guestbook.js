// Cafe Guestbook, Reputation Milestones, and Customer Reviews Data

export const CAFE_TIERS = [
  {
    level: 1,
    title: 'Kedai Kucing Pemula',
    subtitle: 'Awal mula kedai cozy Nina & Zorro',
    requiredOrders: 2,
    reward: { type: 'energy', value: 30, label: '30 ⚡ Energi' },
    badge: '🐾'
  },
  {
    level: 2,
    title: 'Kafe Nyaman Pinggir Jalan',
    subtitle: 'Warga sekitar mulai menyukai aroma kue & keimutan Zorro',
    requiredOrders: 6,
    reward: { type: 'coins', value: 80, label: '80 🪙 Koin' },
    badge: '☕'
  },
  {
    level: 3,
    title: 'Spot Hangout Pecinta Kucing',
    subtitle: 'Thor & Loki ikut meramaikan dan menghibur tamu kafe',
    requiredOrders: 12,
    reward: { type: 'stars', value: 2, label: '2 ⭐ Bintang' },
    badge: '🌸'
  },
  {
    level: 4,
    title: 'Kafe Bintang 5 Viral Sosmed',
    subtitle: 'Pengunjung rela antre demi berfoto dengan Tuxedo King Zorro!',
    requiredOrders: 20,
    reward: { type: 'gift', value: 1, label: '🎁 Hadiah Zorro + 100 🪙' },
    badge: '🌟'
  },
  {
    level: 5,
    title: 'Surga Kucing Megah Nina & Zorro',
    subtitle: 'Kafe kucing paling legendaris dan paling dicintai seluruh kota',
    requiredOrders: 30,
    reward: { type: 'stars', value: 5, label: '5 ⭐ Bintang + 50 ⚡' },
    badge: '👑'
  }
];

export const GUESTBOOK_REVIEWS = [
  {
    id: 'rev_chloe',
    author: 'Chloe',
    role: 'Sahabat Nina',
    avatar: '👩🏼',
    rating: 5,
    date: 'Hari ini',
    comment: 'Kafenya super cozy! Dan kue ikan tuna buatan Nina disukai banget sama Zorro. Pasti bakal sering mampir nugas ke sini! 💖',
    verified: true
  },
  {
    id: 'rev_ken',
    author: 'Barista Ken',
    role: 'Ahli Kopi & Teman Nina',
    avatar: '👨🏻‍🍳',
    rating: 5,
    date: 'Kemarin',
    comment: 'Penyajian dan susunya lembut sempurna. Apalagi ditemani Zorro yang tiduran dengan dasi kupu-kupunya. Kafe kucing nomor 1!',
    verified: true
  },
  {
    id: 'rev_sarah',
    author: 'Tante Sarah',
    role: 'Tetangga & Pecinta Kucing',
    avatar: '👵🏼',
    rating: 5,
    date: '2 hari lalu',
    comment: 'Kucing-kucing di sini terawat dengan penuh kasih sayang, bersih dan wangi. Thor lucu banget waktu lompat ngejar bola benang wol!',
    verified: true
  },
  {
    id: 'rev_zorro',
    author: 'Zorro 🐾',
    role: 'Mascot Tuxedo Cat',
    avatar: '🐱',
    rating: 5,
    date: 'Setiap saat',
    comment: 'Purrr... Kasur baruku empuk sekali. Dan camilan salmon kalengnya lezat. Aku izinkan manusia-manusia ini minum kopi di istanaku. 👑',
    verified: true
  },
  {
    id: 'rev_thor',
    author: 'Thor 🐾',
    role: 'Kitten Penasaran',
    avatar: '🐾',
    rating: 5,
    date: 'Hari ini',
    comment: 'Meoow! Kardus mainannya seru banget, aku bisa ngintip dari sela-sela kardus sambil ngeliatin Nina melayani pesanan! ✨',
    verified: true
  },
  {
    id: 'rev_loki',
    author: 'Loki 🦁',
    role: 'Singa Oren Kafe',
    avatar: '🦁',
    rating: 5,
    date: 'Kemarin',
    comment: 'Mrrooww... tempat duduk di bawah sinar matahari hangat ini milikku. Sempurna untuk tidur siang kucing singa berbulu lebat.',
    verified: true
  }
];
