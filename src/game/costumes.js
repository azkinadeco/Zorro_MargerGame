// Costumes for the resident cats. Anchors are percentages of each cat image.
export const ANCHORS = {
  zorro: { hat: { x: 73, y: 6, w: 30 }, face: { x: 73.5, y: 22.5, w: 27 }, neck: { x: 74, y: 53, w: 26 } },
  loki: { hat: { x: 48, y: 6, w: 46 }, face: { x: 48.5, y: 31, w: 40 }, neck: { x: 48, y: 45, w: 40 } },
  thor: { hat: { x: 45, y: 4, w: 42 }, face: { x: 45, y: 18.5, w: 36 }, neck: { x: 46, y: 40, w: 38 } },
};

export const SLOTS = [
  { key: 'hat', name: 'Topi' },
  { key: 'face', name: 'Wajah' },
  { key: 'neck', name: 'Leher' },
];

export const COSTUMES = [
  { id: 'chef', slot: 'hat', name: 'Topi Chef', price: { coins: 120 } },
  { id: 'party', slot: 'hat', name: 'Topi Pesta', price: { coins: 160 } },
  { id: 'flower', slot: 'hat', name: 'Mahkota Bunga', price: { coins: 240 } },
  { id: 'beret', slot: 'hat', name: 'Baret Pelukis', price: { coins: 300 } },
  { id: 'crown', slot: 'hat', name: 'Mahkota Raja', price: { gems: 25 } },
  { id: 'glasses', slot: 'face', name: 'Kacamata Bulat', price: { coins: 140 } },
  { id: 'mask', slot: 'face', name: 'Topeng Zorro', price: { coins: 260 } },
  { id: 'hearts', slot: 'face', name: 'Kacamata Hati', price: { gems: 15 } },
  { id: 'bowtie', slot: 'neck', name: 'Dasi Kupu-kupu', price: { coins: 80 } },
  { id: 'bell', slot: 'neck', name: 'Kalung Lonceng', price: { coins: 150 } },
  { id: 'scarf', slot: 'neck', name: 'Syal Rajut', price: { coins: 220 } },
  { id: 'cape', slot: 'neck', name: 'Jubah Pahlawan', price: { gems: 20 } },
];

export const costume = (id) => COSTUMES.find((c) => c.id === id);
