// Resident cats you can feed. Feeding raises affection (hearts) and unlocks
// real photos of the café cats for the album.

export const HEART_POINTS = [10, 25, 45, 70, 100, 140]; // cumulative points for heart 1..6
export const MAX_HEARTS = HEART_POINTS.length;

export const PETS = {
  zorro: {
    name: 'Zorro',
    img: '/cats/zoro_transparent.png',
    likes: ['treat', 'bread'],
    bio: 'Tuxedo pemalas yang diam-diam mengatur seluruh kafe.',
    photos: {
      1: { src: '/cats/zorro_indoor.jpeg', caption: 'Rebahan santai di lantai rumah.' },
      2: { src: '/photos/zorro_cozy_nap.png', caption: 'Duduk manis menunggu Nina pulang.' },
      3: { src: '/photos/zorro_garden_curious.png', caption: 'Penjelajah taman yang penasaran.' },
      4: { src: '/photos/zorro_laptop.png', caption: 'Membantu Nina “bekerja” di laptop.' },
      5: { src: '/photos/zorro_garden_relax.png', caption: 'Berjemur di rumput hangat.' },
      6: { src: '/cats/zorro_outdoor.jpeg', caption: 'Patroli jalanan di siang yang cerah.' },
    },
  },
  loki: {
    name: 'Loki',
    img: '/cats/loki_transparent.png',
    likes: ['treat', 'cake'],
    bio: 'Si oranye berbulu lebat. Selalu yang pertama datang kalau ada kaleng dibuka.',
    photos: {
      3: { src: '/cats/loki.jpeg', caption: 'Loki berpose seperti raja.' },
      6: { src: '/photos/zorro_standing_peeking.png', caption: 'Zorro mengintip, iri melihat Loki dimanja.' },
    },
  },
  thor: {
    name: 'Thor',
    img: '/cats/thor_transparent.png',
    likes: ['treat', 'tea'],
    bio: 'Kucing abu yang tenang dan bijak. Penjaga dapur dari atas rak.',
    photos: {
      3: { src: '/cats/thor.jpeg', caption: 'Thor dengan tatapan bijaknya.' },
    },
  },
};

export function heartsFor(points) {
  let h = 0;
  while (h < MAX_HEARTS && points >= HEART_POINTS[h]) h++;
  return h;
}

export function heartRange(points) {
  const h = heartsFor(points);
  const lo = h === 0 ? 0 : HEART_POINTS[h - 1];
  const hi = h >= MAX_HEARTS ? HEART_POINTS[MAX_HEARTS - 1] : HEART_POINTS[h];
  return { h, lo, hi };
}

export function allPhotos() {
  const out = [];
  for (const [cat, p] of Object.entries(PETS)) for (const [h, ph] of Object.entries(p.photos)) out.push({ cat, hearts: Number(h), ...ph });
  return out;
}
