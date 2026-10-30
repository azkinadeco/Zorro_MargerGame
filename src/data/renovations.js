// Renovation and Cafe Decoration Progression for Zorro Merge Cats
// Features 3-choice aesthetic customization just like Piece of Cake: Merge & Bake!

export const RENOVATION_TASKS = [
  {
    id: 'clean_floor',
    title: 'Bersihkan Lantai Berdebu',
    description: 'Sapu dedaunan kering dan pasang lantai baru yang berkilau.',
    starsCost: 1,
    icon: '🧹',
    styles: [
      { id: 'floor_oak', name: 'Kayu Oak Hangat', previewColor: '#EED7B8', desc: 'Serat kayu alami bernuansa homey' },
      { id: 'floor_sakura', name: 'Parket Sakura Pink', previewColor: '#FDE2E4', desc: 'Kayu pastel lembut bernuansa Jepang' },
      { id: 'floor_mint', name: 'Lantai Herringbone Mint', previewColor: '#D1FAE5', desc: 'Pola herringbone modern & segar' },
    ],
    defaultStyle: 'floor_oak',
    story: {
      speaker: 'Nina',
      avatar: '👩🏻‍🦰',
      text: 'Wah, lantainya sekarang bersih dan berkilau! Zorro langsung berguling-guling gembira di lantai baru!'
    }
  },
  {
    id: 'zorro_cushion',
    title: 'Kasur Beludru Mewah Zorro',
    description: 'Tempat tidur empuk untuk Zorro membuat adonan donat.',
    starsCost: 2,
    icon: '🛏️',
    styles: [
      { id: 'cushion_pink', name: 'Beludru Rose Gold', previewColor: '#FECDD3', desc: 'Bantalan beludru pink dengan bordir paw' },
      { id: 'cushion_blue', name: 'Awan Biru Lembut', previewColor: '#BAE6FD', desc: 'Kasur bentuk awan dengan renda halus' },
      { id: 'cushion_royal', name: 'Tahta Tuxedo King', previewColor: '#1E293B', desc: 'Bantal satin hitam bermahkota emas' },
    ],
    defaultStyle: 'cushion_pink',
    story: {
      speaker: 'Zorro 🐾',
      avatar: '🐱',
      text: 'Purrrrrr! *Zorro membuat adonan donat di atas kasur barunya yang super empuk*'
    }
  },
  {
    id: 'pastel_rug',
    title: 'Karpet Bulu Awan Pastel',
    description: 'Karpet lembut yang nyaman untuk kucing-kucing bersantai.',
    starsCost: 2,
    icon: '🧶',
    styles: [
      { id: 'rug_cloud', name: 'Awan Peach Sakura', previewColor: '#FFCAD4', desc: 'Karpet oval lembut warna peach-pink' },
      { id: 'rug_paw', name: 'Karpet Jejak Paw Pink', previewColor: '#FBCFE8', desc: 'Bentuk cakar kucing raksasa yang empuk' },
      { id: 'rug_boho', name: 'Rajut Rumbai Krem', previewColor: '#FEF3C7', desc: 'Anyaman boho chic hangat' },
    ],
    defaultStyle: 'rug_cloud',
    story: {
      speaker: 'Nina',
      avatar: '👩🏻‍🦰',
      text: 'Ruangan ini mulai terasa hangat dan estetik! Kucing-kucing lain pasti suka nongkrong di sini.'
    }
  },
  {
    id: 'cat_tree',
    title: 'Pohon Panjatan Kucing Kayu',
    description: 'Menara kayu 3 tingkat dengan hammock dan tali garukan rami.',
    starsCost: 3,
    icon: '🌳',
    styles: [
      { id: 'tree_nature', name: 'Pohon Birch Alami', previewColor: '#FED7AA', desc: 'Kayu birch dengan daun ivy hijau' },
      { id: 'tree_sakura', name: 'Pohon Bunga Sakura', previewColor: '#F472B6', desc: 'Panjatan berpola bunga sakura mekar' },
      { id: 'tree_castle', name: 'Kastil Menara Dongeng', previewColor: '#C084FC', desc: 'Kastil fantasi dengan kubah ungu' },
    ],
    defaultStyle: 'tree_nature',
    story: {
      speaker: 'Zorro 🐾',
      avatar: '🐱',
      text: 'Meoow! *Zorro melompat lincah ke puncak tertinggi pohon dan mengamati seluruh cafe*'
    }
  },
  {
    id: 'sun_window',
    title: 'Bantalan Jendela Berjemur',
    description: 'Tempat berjemur matahari pagi dengan tirai tipis dan tanaman gantung.',
    starsCost: 3,
    icon: '☀️',
    styles: [
      { id: 'window_arch', name: 'Lengkung Mediterania', previewColor: '#93C5FD', desc: 'Jendela lengkung dengan tirai putih tipis' },
      { id: 'window_french', name: 'Jendela Kaca Prancis', previewColor: '#FED7AA', desc: 'Pintu kaca ganda dengan pemandangan taman' },
      { id: 'window_cozy', name: 'Balkon Kayu Bunga', previewColor: '#86EFAC', desc: 'Bantalan duduk dengan pot bunga marigold' },
    ],
    defaultStyle: 'window_arch',
    story: {
      speaker: 'Nina',
      avatar: '👩🏻‍🦰',
      text: 'Cahaya pagi masuk dengan indahnya! Sekarang Zorro bisa berjemur sambil melihat burung-burung di luar.'
    }
  },
  {
    id: 'cafe_counter',
    title: 'Meja Barista & Display Snack',
    description: 'Meja kayu estetik untuk menyajikan kopi hangat dan camilan kucing.',
    starsCost: 4,
    icon: '☕',
    styles: [
      { id: 'bar_vintage', name: 'Kayu Jati Vintage', previewColor: '#D97706', desc: 'Bar kayu hangat dengan lampu gantung tembaga' },
      { id: 'bar_pastel', name: 'Pastel Cafe Sweet', previewColor: '#F472B6', desc: 'Etalase pink manis dengan kue anabul' },
      { id: 'bar_botanical', name: 'Taman Kaca Sage Green', previewColor: '#10B981', desc: 'Konter hijau sage berhias tanaman hias' },
    ],
    defaultStyle: 'bar_vintage',
    story: {
      speaker: 'Barista Ken',
      avatar: '🧑🏻‍🍳',
      text: 'Bar cafe kita sudah siap Nina! Aroma kopi latte dan biskuit ikan siap menggoda pengunjung!'
    }
  },
  {
    id: 'fairy_lights',
    title: 'Lampu Fairy Light & Tanaman',
    description: 'Lampu gantung warna warm white dan pot monstera yang segar.',
    starsCost: 4,
    icon: '✨',
    styles: [
      { id: 'light_stars', name: 'Bintang & Lentera Warm', previewColor: '#FDE047', desc: 'Kelap-kelip bintang hangat di langit-langit' },
      { id: 'light_paper', name: 'Lentera Kertas Pastel', previewColor: '#F472B6', desc: 'Lentera bulat warna peach, mint, dan lavender' },
      { id: 'light_crystal', name: 'Chandelier Kristal Mini', previewColor: '#E0E7FF', desc: 'Kilau permata mewah bernuansa dongeng' },
    ],
    defaultStyle: 'light_stars',
    story: {
      speaker: 'Tante Sarah',
      avatar: '👩🏼‍🦱',
      text: 'Suasananya jadi begitu magis dan menenangkan di sore hari. Betah sekali duduk di sini!'
    }
  },
  {
    id: 'patio_tables',
    title: 'Meja Santai & Kursi Rotan',
    description: 'Set meja bundar dan kursi rotan nyaman untuk para tamu bermain kucing.',
    starsCost: 5,
    icon: '🪑',
    styles: [
      { id: 'table_rattan', name: 'Rotan Alami & Bantal', previewColor: '#F59E0B', desc: 'Kursi rotan bohemian dengan bantalan bulu' },
      { id: 'table_wrought', name: 'Besi Tempa Putih Klasik', previewColor: '#CBD5E1', desc: 'Meja teh putri ala taman Inggris' },
      { id: 'table_cushion', name: 'Lesehan Tatami Kotatsu', previewColor: '#FDE68A', desc: 'Meja rendah lesehan super cozy' },
    ],
    defaultStyle: 'table_rattan',
    story: {
      speaker: 'Chloe',
      avatar: '👧🏼',
      text: 'Asik! Sekarang aku bisa duduk santai sambil memangku kucing oren Milo dan mengelus Zorro!'
    }
  },
  {
    id: 'grand_sanctuary',
    title: 'Taman Kaca Kucing Impian',
    description: 'Rumah kaca megah dengan jembatan kucing di langit-langit dan air mancur!',
    starsCost: 6,
    icon: '🏰',
    styles: [
      { id: 'sanctuary_crystal', name: 'Kubah Kaca Kristal', previewColor: '#38BDF8', desc: 'Atap kaca lengkung bermandikan sinar matahari' },
      { id: 'sanctuary_cherry', name: 'Paviliun Sakura Musim Semi', previewColor: '#FB7185', desc: 'Taman kaca bertabur kelopak bunga sakura' },
      { id: 'sanctuary_starlight', name: 'Observatorium Bintang Malam', previewColor: '#818CF8', desc: 'Langit-langit kaca untuk menatap bintang malam' },
    ],
    defaultStyle: 'sanctuary_crystal',
    story: {
      speaker: 'Nina & Zorro',
      avatar: '🐱',
      text: 'Kita berhasil mewujudkan Cat Sanctuary & Cafe impian kita bersama Zorro! Terima kasih sudah berjuang bersama Nina!'
    }
  }
];
