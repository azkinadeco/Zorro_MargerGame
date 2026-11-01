// Village map: neighbours that send supplies over time. Coordinates are % of maps.jpg.
const MIN = 60 * 1000;

export const SPOTS = [
  { id: 'bakery', name: 'Toko Tepung Bu Rosa', x: 16, y: 42, level: 2, base: 20 * MIN, gives: (lv) => ({ items: lv >= 3 ? ['bread_3', 'bread_2'] : ['bread_2', 'bread_1'] }), desc: 'Mengirim tepung dan adonan segar.' },
  { id: 'fountain', name: 'Air Mancur Kucing', x: 40, y: 52, level: 2, base: 30 * MIN, gives: (lv) => ({ energy: 10 + lv * 5 }), desc: 'Lempar koin, dapatkan energi.' },
  { id: 'cottage', name: 'Pondok Kopi Pak Budi', x: 34, y: 33, level: 3, base: 25 * MIN, gives: (lv) => ({ items: lv >= 3 ? ['coffee_3', 'coffee_2'] : ['coffee_2', 'coffee_1'] }), desc: 'Biji kopi sangrai dari kebun sebelah.' },
  { id: 'market', name: 'Pasar Ikan Sungai', x: 63, y: 66, level: 4, base: 35 * MIN, gives: (lv) => ({ items: lv >= 3 ? ['treat_3', 'treat_2'] : ['treat_2', 'treat_1'] }), desc: 'Ikan segar untuk camilan kucing.' },
  { id: 'farm', name: 'Kebun Stroberi', x: 85, y: 30, level: 3, base: 30 * MIN, gives: (lv) => ({ items: lv >= 3 ? ['cake_3', 'cake_1'] : ['cake_1', 'cake_1'] }), desc: 'Stroberi manis untuk kue.' },
  { id: 'mill', name: 'Kincir Angin', x: 88, y: 20, level: 5, base: 45 * MIN, gives: (lv) => ({ coins: 40 + lv * 25 }), desc: 'Penghasilan dari menggiling gandum.' },
  { id: 'teahouse', name: 'Rumah Teh Nenek Sumi', x: 87, y: 72, level: 6, base: 40 * MIN, gives: (lv) => ({ items: lv >= 3 ? ['tea_3', 'tea_2'] : ['tea_2', 'tea_1'] }), desc: 'Daun teh pilihan dan teh hangat.' },
  { id: 'lodge', name: 'Penginapan Bukit', x: 79, y: 52, level: 7, base: 60 * MIN, gives: (lv) => ({ gems: 1 + Math.floor(lv / 2) }), desc: 'Tamu penginapan memberi tip permata.' },
];

export const SPOT_MAX = 5;

export function spotTime(spot, lv) {
  return Math.round(spot.base * (1 - (lv - 1) * 0.12));
}

export function upgradeCost(lv) {
  return 100 * lv * lv;
}
