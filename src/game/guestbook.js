// Café reputation tiers (by orders served) and customer reviews.
export const REP_TIERS = [
  { at: 0, title: 'Kedai Kucing Pemula', r: null },
  { at: 10, title: 'Kafe Nyaman Pinggir Jalan', r: { energy: 30 } },
  { at: 30, title: 'Tempat Nongkrong Pencinta Kucing', r: { coins: 150 } },
  { at: 70, title: 'Kafe Viral di Media Sosial', r: { gems: 10, item: 'chest_2' } },
  { at: 150, title: 'Kafe Bintang Lima Desa', r: { gems: 20, item: 'joker_1' } },
  { at: 300, title: 'Surga Kucing Legendaris', r: { gems: 40, item: 'chest_3' } },
];

export function repTier(served) {
  let i = 0;
  REP_TIERS.forEach((t, k) => served >= t.at && (i = k));
  return i;
}

// Short lines customers leave after being served; chosen by item chain.
export const REVIEW_LINES = {
  coffee: ['Kopinya wangi banget, langsung melek!', 'Latte art kucingnya bikin nggak tega minum.', 'Espresso terbaik di desa ini.'],
  bread: ['Rotinya hangat dan empuk, kayak buatan nenek.', 'Croissant-nya renyah berlapis-lapis!', 'Roti kucingnya lucu, sayang dimakan.'],
  cake: ['Kuenya manis pas, nggak bikin eneg.', 'Cupcake pink-nya cantik sekali!', 'Pasti balik lagi buat kue stroberinya.'],
  tea: ['Tehnya menenangkan setelah hari yang panjang.', 'Boba-nya kenyal sempurna!', 'Matcha latte favoritku sekarang.'],
  treat: ['Kucingku di rumah pasti iri.', 'Camilan ikannya segar sekali!', 'Bento kucingnya menggemaskan.'],
  any: ['Zorro menemaniku sepanjang sore. Bintang lima!', 'Pelayanannya cepat dan ramah.', 'Suasananya hangat, kucingnya manja.'],
};
