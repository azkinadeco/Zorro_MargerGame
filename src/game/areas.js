// Café areas to restore. Coordinates are percentages of the background image.
// `r` is the reveal radius as a percentage of the image width.

const N = 'nina';
const Z = 'zorro';
const L = 'loki';
const T = 'thor';

export const SPEAKERS = {
  nina: { name: 'Nina', img: '/ui/nina_avatar.png' },
  zorro: { name: 'Zorro', img: '/ui/zorro_avatar.png' },
  loki: { name: 'Loki', img: '/cats/loki_transparent.png' },
  thor: { name: 'Thor', img: '/cats/thor_transparent.png' },
};

export const RESIDENTS = {
  zorro: { name: 'Zorro', img: '/cats/zoro_transparent.png', ratio: 881 / 588, desc: 'Kucing tuxedo penjaga kafe. Suka tidur siang dan latte art.' },
  loki: { name: 'Loki', img: '/cats/loki_transparent.png', ratio: 705 / 869, desc: 'Kucing oranye berbulu lebat. Paling cepat kalau dengar suara kaleng.' },
  thor: { name: 'Thor', img: '/cats/thor_transparent.png', ratio: 681 / 851, desc: 'Kucing abu yang tenang. Suka mengawasi dapur dari atas rak.' },
};

export const AREAS = [
  {
    id: 'hall',
    name: 'Kafe Utama',
    bg: '/backgrounds/lobby.jpg',
    resident: null,
    cats: [{ id: 'zorro', x: 60, y: 92, w: 22 }],
    intro: [
      [N, 'Jadi… ini kafe peninggalan Nenek. Debunya tebal sekali!'],
      [Z, 'Meong! (Akhirnya ada yang datang. Aku sudah menunggu lama.)'],
      [N, 'Kamu pasti Zorro! Yuk, kita hidupkan lagi kafe ini bersama.'],
      [N, 'Kita layani pelanggan dulu untuk dapat koin, lalu pakai koinnya untuk merenovasi.'],
    ],
    outro: [
      [N, 'Kafe Utama kembali cantik! Lihat, pelanggan mulai berdatangan.'],
      [L, 'Mrrrow? (Bau croissant… boleh aku tinggal di sini?)'],
      [N, 'Selamat datang, Loki! Sekarang dapur berikutnya yang harus kita rapikan.'],
    ],
    reward: { gems: 10, cat: 'loki' },
    tasks: [
      { id: 'floor', name: 'Sapu Lantai Kayu', cost: 15, x: 52, y: 88, r: 22, line: [N, 'Lantainya mengkilap lagi! Zorro langsung guling-guling.'] },
      { id: 'counter', name: 'Rapikan Meja Kasir', cost: 30, x: 22, y: 80, r: 18, line: [Z, 'Meong! (Tempat favoritku untuk tidur siang.)'] },
      { id: 'vitrine', name: 'Isi Etalase Kue', cost: 45, x: 37, y: 58, r: 14, line: [N, 'Etalase penuh kue. Pelanggan pasti tergoda!'] },
      { id: 'machine', name: 'Pasang Mesin Kopi', cost: 60, x: 15, y: 50, r: 14, line: [N, 'Mesin kopi Nenek masih berfungsi! Wangi espresso memenuhi ruangan.'] },
      { id: 'shelves', name: 'Rak Panjat Kucing', cost: 80, x: 30, y: 28, r: 18, line: [Z, 'Prrr… (Akhirnya aku bisa memanjat sampai ke atas!)'] },
      { id: 'lamps', name: 'Lampu & Tanaman Gantung', cost: 100, x: 70, y: 16, r: 18, line: [N, 'Cahaya hangatnya bikin suasana jadi nyaman.'] },
      { id: 'sofa', name: 'Sofa Jendela Empuk', cost: 130, x: 87, y: 72, r: 18, line: [N, 'Tempat terbaik untuk ngopi sambil melihat jalan.'] },
    ],
  },
  {
    id: 'kitchen',
    name: 'Dapur Hangat',
    bg: '/backgrounds/cooking_room.jpg',
    cats: [{ id: 'loki', x: 30, y: 93, w: 16 }],
    intro: [
      [N, 'Dapur ini dulu tempat Nenek memanggang roti setiap pagi.'],
      [L, 'Mrrow! (Aku jaga supaya tidak ada tikus, ya.)'],
    ],
    outro: [
      [N, 'Dapurnya siap dipakai! Rasanya seperti Nenek masih di sini.'],
      [T, 'Mrr. (Aku Thor. Aku suka mengawasi dari atas rak.)'],
      [N, 'Halo, Thor! Ruang bermain kucing berikutnya akan jadi milik kalian.'],
    ],
    reward: { gems: 15, cat: 'thor' },
    tasks: [
      { id: 'table', name: 'Lap Meja Kayu', cost: 40, x: 60, y: 80, r: 20, line: [N, 'Meja kerja yang bersih, siap untuk menguleni adonan.'] },
      { id: 'jars', name: 'Rapikan Rak Toples', cost: 60, x: 56, y: 30, r: 16, line: [L, 'Mrrow? (Ada ikan kering di toples itu?)'] },
      { id: 'oven', name: 'Perbaiki Oven Hijau', cost: 80, x: 80, y: 52, r: 14, line: [N, 'Ovennya menyala! Roti pertama segera matang.'] },
      { id: 'curtain', name: 'Ganti Tirai Kotak', cost: 100, x: 18, y: 30, r: 20, line: [N, 'Tirai baru bikin sinar pagi masuk dengan lembut.'] },
      { id: 'herbs', name: 'Pot Tanaman Herbal', cost: 120, x: 78, y: 30, r: 12, line: [N, 'Daun mint segar untuk teh dan kue.'] },
      { id: 'bowls', name: 'Alat Baking Baru', cost: 150, x: 52, y: 64, r: 14, line: [L, 'Mrrr! (Aku boleh jilat mangkuknya nanti?)'] },
      { id: 'pans', name: 'Panci Tembaga', cost: 180, x: 95, y: 40, r: 12, line: [N, 'Panci tembaga Nenek berkilau seperti baru.'] },
    ],
  },
  {
    id: 'playroom',
    name: 'Ruang Main Kucing',
    bg: '/backgrounds/cat_room.jpg',
    cats: [
      { id: 'thor', x: 36, y: 72, w: 14 },
      { id: 'zorro', x: 62, y: 93, w: 20 },
    ],
    intro: [
      [T, 'Mrr. (Ruangan ini terlalu sepi untuk kucing.)'],
      [N, 'Ayo kita buat surga kecil untuk kucing-kucing kafe!'],
    ],
    outro: [
      [Z, 'Meong meong! (Jembatan gantungnya keren sekali!)'],
      [N, 'Kucing-kucing senang, pelanggan pun ikut bahagia.'],
    ],
    reward: { gems: 20 },
    tasks: [
      { id: 'rug', name: 'Karpet Bunga', cost: 120, x: 55, y: 82, r: 22, line: [Z, 'Prrr… (Karpet lembut untuk menguleni!)'] },
      { id: 'tower', name: 'Menara Cakar', cost: 150, x: 10, y: 48, r: 14, line: [T, 'Mrr. (Akhirnya ada tempat tinggi untukku.)'] },
      { id: 'bridge', name: 'Jembatan Gantung', cost: 170, x: 30, y: 18, r: 16, line: [Z, 'Meong! (Ayo lomba lari, Loki!)'] },
      { id: 'bed', name: 'Kasur Kucing', cost: 190, x: 32, y: 66, r: 12, line: [N, 'Kasur empuk untuk tidur siang panjang.'] },
      { id: 'hammock', name: 'Hammock Kain', cost: 210, x: 40, y: 38, r: 12, line: [L, 'Mrrow… (Ayunannya bikin ngantuk.)'] },
      { id: 'couch', name: 'Sofa Pengunjung', cost: 240, x: 82, y: 60, r: 18, line: [N, 'Pengunjung bisa santai sambil memangku kucing.'] },
      { id: 'stars', name: 'Hiasan Bintang', cost: 270, x: 88, y: 25, r: 14, line: [N, 'Sentuhan akhir yang manis!'] },
    ],
  },
  {
    id: 'tearoom',
    name: 'Ruang Teh Taman',
    bg: '/backgrounds/game_battle.jpg',
    cats: [
      { id: 'loki', x: 85, y: 92, w: 14 },
      { id: 'thor', x: 22, y: 92, w: 13 },
    ],
    intro: [
      [N, 'Jendela besar ini menghadap taman. Cocok untuk minum teh sore.'],
      [Z, 'Meong. (Aku suka berjemur di dekat jendela itu.)'],
    ],
    outro: [
      [N, 'Ruang teh jadi tempat favorit pelanggan!'],
      [L, 'Mrrow! (Tinggal satu ruangan lagi yang berantakan… salon!)'],
    ],
    reward: { gems: 25 },
    tasks: [
      { id: 'chairs', name: 'Kursi & Meja Bundar', cost: 250, x: 48, y: 68, r: 22, line: [N, 'Kursi pastel yang cantik untuk pelanggan.'] },
      { id: 'display', name: 'Etalase Roti', cost: 280, x: 10, y: 65, r: 14, line: [L, 'Mrr! (Croissant di etalase itu milikku.)'] },
      { id: 'lights', name: 'Lampu Tali', cost: 300, x: 52, y: 12, r: 18, line: [N, 'Lampu kecil berkelip seperti bintang.'] },
      { id: 'teapots', name: 'Rak Teko Antik', cost: 320, x: 20, y: 34, r: 14, line: [N, 'Koleksi teko Nenek dipajang lagi.'] },
      { id: 'plants', name: 'Tanaman Gantung', cost: 340, x: 94, y: 28, r: 12, line: [Z, 'Meong? (Daunnya bergoyang, boleh kutangkap?)'] },
      { id: 'cattree', name: 'Menara Kucing Pojok', cost: 370, x: 87, y: 56, r: 12, line: [T, 'Mrr. (Pos jaga baru untukku.)'] },
      { id: 'fur', name: 'Karpet Bulu', cost: 400, x: 88, y: 88, r: 14, line: [N, 'Lembut sekali! Semua kucing berebut tidur di sini.'] },
    ],
  },
  {
    id: 'salon',
    name: 'Salon Kucing',
    bg: '/backgrounds/grooming_room.jpg',
    cats: [{ id: 'thor', x: 74, y: 92, w: 14 }],
    intro: [
      [N, 'Kalau kafe ini punya salon, kucing-kucing pelanggan bisa dimandikan juga.'],
      [Z, 'Meong!! (Mandi?! Aku tidak ikut-ikutan.)'],
    ],
    outro: [
      [N, 'Salon kucing resmi dibuka! Wangi sampo stroberi di mana-mana.'],
      [N, 'Tinggal satu tempat: kamar loteng Zorro.'],
    ],
    reward: { gems: 30 },
    tasks: [
      { id: 'tub', name: 'Bak Mandi Busa', cost: 380, x: 18, y: 72, r: 18, line: [Z, 'Meong… (Asal airnya hangat, deh.)'] },
      { id: 'gtable', name: 'Meja Grooming', cost: 420, x: 48, y: 66, r: 18, line: [N, 'Sikat, sisir, dan handuk siap dipakai.'] },
      { id: 'cabinet', name: 'Lemari Biru', cost: 450, x: 38, y: 28, r: 14, line: [N, 'Lemari cantik untuk menyimpan perlengkapan.'] },
      { id: 'lamp', name: 'Lampu Kerang', cost: 470, x: 51, y: 12, r: 14, line: [N, 'Terang dan anggun.'] },
      { id: 'shampoo', name: 'Rak Sampo', cost: 500, x: 52, y: 32, r: 12, line: [L, 'Mrrow? (Kenapa sampo ini wangi ikan?)'] },
      { id: 'mat', name: 'Keset & Mainan', cost: 540, x: 82, y: 80, r: 16, line: [Z, 'Meong! (Ada tikus mainan!)'] },
      { id: 'shelf', name: 'Rak Tanaman', cost: 580, x: 85, y: 36, r: 12, line: [N, 'Hijau-hijau segar di sudut ruangan.'] },
    ],
  },
  {
    id: 'loft',
    name: 'Kamar Loteng Zorro',
    bg: '/backgrounds/zorro_room_with_cats.jpg',
    cats: [],
    intro: [
      [Z, 'Meong. (Ini kamar rahasiaku. Nenek dulu sering membaca di sini bersamaku.)'],
      [N, 'Kita jadikan kamar ini tempat paling nyaman untukmu, Zorro.'],
    ],
    outro: [
      [Z, 'Purrrrr… (Terima kasih, Nina. Rumah ini hidup lagi.)'],
      [N, 'Eh, ada pintu kecil di balik rak buku… menuju pojok herbal Nenek!'],
    ],
    reward: { gems: 50 },
    tasks: [
      { id: 'floor', name: 'Lantai & Karpet', cost: 550, x: 50, y: 90, r: 22, line: [Z, 'Prrr. (Hangat di kaki.)'] },
      { id: 'tree', name: 'Menara Kucing Tinggi', cost: 600, x: 18, y: 55, r: 16, line: [L, 'Mrrow! (Aku dapat lantai paling atas!)'] },
      { id: 'dome', name: 'Rumah Kubah', cost: 650, x: 62, y: 74, r: 14, line: [T, 'Mrr… (Aku tidur di sini sampai sore.)'] },
      { id: 'hammock', name: 'Hammock Macrame', cost: 700, x: 82, y: 50, r: 14, line: [Z, 'Meong. (Berayun pelan… zzz.)'] },
      { id: 'garland', name: 'Lampu Tali Loteng', cost: 750, x: 50, y: 10, r: 20, line: [N, 'Seperti langit berbintang di dalam kamar.'] },
      { id: 'window', name: 'Jendela & Tanaman', cost: 800, x: 50, y: 40, r: 18, line: [N, 'Pemandangan desa terlihat sampai ke bukit.'] },
      { id: 'books', name: 'Rak Buku Nenek', cost: 900, x: 94, y: 50, r: 12, line: [N, 'Buku resep Nenek… semuanya masih utuh.'] },
    ],
  },
  {
    id: 'herbs',
    name: 'Pojok Herbal',
    bg: '/backgrounds/interact_cats.jpg',
    cats: [{ id: 'zorro', x: 50, y: 74, w: 22 }],
    intro: [
      [N, 'Pojok ini penuh tanaman obat dan teh racikan Nenek.'],
      [T, 'Mrr. (Baunya menenangkan. Aku suka tempat ini.)'],
    ],
    outro: [
      [N, 'Pojok Herbal jadi tempat minum teh paling damai di desa.'],
      [Z, 'Meong! (Nina, lihat meja tua di ujung sana… ada buku di atasnya!)'],
    ],
    reward: { gems: 60 },
    tasks: [
      { id: 'table', name: 'Meja Bundar Besar', cost: 950, x: 50, y: 80, r: 24, line: [N, 'Meja ini cukup untuk sepuluh pelanggan sekaligus!'] },
      { id: 'window', name: 'Jendela & Tirai Renda', cost: 1020, x: 18, y: 32, r: 18, line: [N, 'Cahaya pagi menembus tirai renda.'] },
      { id: 'monstera', name: 'Pot Monstera', cost: 1100, x: 6, y: 74, r: 12, line: [L, 'Mrrow! (Daunnya besar sekali, bisa buat sembunyi.)'] },
      { id: 'books', name: 'Rak Buku & Teko', cost: 1180, x: 56, y: 32, r: 14, line: [N, 'Koleksi buku herbal Nenek tersusun rapi.'] },
      { id: 'board', name: 'Papan Menu Kapur', cost: 1260, x: 68, y: 26, r: 10, line: [N, 'Menu hari ini: teh mint dan kue jahe.'] },
      { id: 'lamps', name: 'Lampu Bohlam Gantung', cost: 1350, x: 88, y: 14, r: 14, line: [Z, 'Meong. (Hangat seperti sinar matahari sore.)'] },
      { id: 'dishes', name: 'Rak Piring Antik', cost: 1450, x: 84, y: 56, r: 16, line: [N, 'Piring keramik Nenek masih utuh semua!'] },
    ],
  },
  {
    id: 'recipe',
    name: 'Meja Resep Nenek',
    bg: '/backgrounds/interact_upgrade_cats.jpg',
    cats: [],
    intro: [
      [N, 'Ini meja kerja Nenek. Dan ini… buku resep rahasianya!'],
      [Z, 'Meong. (Nenek selalu menulis di sini sambil mengelusku.)'],
      [N, 'Ayo kita rapikan meja ini dan lanjutkan tulisan Nenek.'],
    ],
    outro: [
      [N, 'Di halaman terakhir Nenek menulis: “Untuk Nina dan Zorro — jagalah kafe ini dengan cinta.”'],
      [Z, 'Purrrr… (Kita sudah melakukannya, Nina.)'],
      [L, 'Mrrow! (Tapi pelanggan tetap lapar!)'],
      [T, 'Mrr. (Festival minggu depan juga menunggu.)'],
      [N, 'Kafe Kucing Zorro resmi pulih sepenuhnya! Terima kasih sudah bermain — kafe akan terus buka untukmu.'],
    ],
    reward: { gems: 100 },
    tasks: [
      { id: 'book', name: 'Buku Resep Nenek', cost: 1600, x: 57, y: 70, r: 18, line: [N, 'Resep pertama: “Roti kucing untuk hari hujan.”'] },
      { id: 'bunting', name: 'Bendera Segitiga', cost: 1700, x: 66, y: 16, r: 20, line: [N, 'Bendera kain warna-warni seperti di festival desa.'] },
      { id: 'yarn', name: 'Keranjang Benang', cost: 1800, x: 36, y: 36, r: 12, line: [Z, 'Meong!! (BENANG! Boleh kumainkan?)'] },
      { id: 'shelf', name: 'Rak Kecil Kayu', cost: 1900, x: 85, y: 50, r: 14, line: [N, 'Rak mungil berisi gulungan renda dan stiker.'] },
      { id: 'plants', name: 'Tanaman Jendela', cost: 2050, x: 15, y: 30, r: 14, line: [N, 'Tanaman ivy Nenek tumbuh subur lagi.'] },
      { id: 'ribbons', name: 'Kotak Pita & Renda', cost: 2200, x: 25, y: 62, r: 12, line: [L, 'Mrr? (Pita merah itu cocok untukku.)'] },
      { id: 'brush', name: 'Sikat & Kancing', cost: 2400, x: 30, y: 82, r: 10, line: [N, 'Sikat bulu kesayangan Zorro. Semuanya lengkap.'] },
    ],
  },
];

export function taskXp(cost) {
  return 4 + Math.floor(cost / 12);
}

export function areaIndex(id) {
  return AREAS.findIndex((a) => a.id === id);
}
