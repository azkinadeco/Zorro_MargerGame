import { useEffect, useRef, useState } from 'react';
import { useGameCtx, bus } from '../game/useGame';
import { findOrderItems, findPetItem, emptyCount } from '../game/engine';
import { item } from '../game/items';
import { CUSTOMERS } from '../game/config';
import { PETS } from '../game/pets';
import { sfx } from '../game/audio';

const TIPS = [
  'Gabungkan dua generator yang sama supaya lebih sering menghasilkan item level tinggi!',
  'Item dengan centang hijau sedang dicari pelanggan. Jangan dijual, ya!',
  'Simpan item yang belum dibutuhkan di Gudang supaya papan tetap lega.',
  'Tamu VIP bermahkota memberi koin ganda dan permata. Layani sebelum waktunya habis!',
  'Gunting Ajaib bisa memecah satu item jadi dua. Cocok untuk melengkapi pesanan.',
  'Kotak kardus terbuka kalau kamu menggabungkan item tepat di sebelahnya.',
  'Dapur Resep memberi koin besar. Masak menu yang sama untuk naik peringkat!',
  'Cek Peta Desa. Tetangga rutin mengirim bahan gratis.',
  'Jangan lupa elus dan mandikan kucing di menu Rawat Kucing setiap beberapa jam.',
];

function contextTip(s) {
  const ready = s.orders.find((o) => findOrderItems(s.board, o));
  if (ready) return `${CUSTOMERS.find((c) => c.id === ready.cat)?.name} sudah bisa dilayani. Ketuk Sajikan!`;
  if (s.kitchen?.slot && s.kitchen.slot.done <= Date.now()) return 'Masakan di oven sudah matang! Ketuk chip oven untuk menyajikannya.';
  if (s.energy < 5) return 'Energi hampir habis. Ketuk item petir di papan, atau tunggu sebentar sambil rawat kucing.';
  if (emptyCount(s.board) <= 3) return 'Papan hampir penuh! Jual item yang tidak dicari atau simpan di Gudang.';
  if (s.gifts.length) return 'Ada hadiah menunggu di tombol Ambil. Ketuk untuk menaruhnya di papan.';
  for (const cat of s.residents) if (PETS[cat] && s.pets?.[cat]?.want && findPetItem(s, cat)) return `${PETS[cat].name} ingin ${item(s.pets[cat].want).name}, dan kamu punya! Beri di menu Teman Kucing.`;
  const reward = s.board.find((c) => c && !c.st && ['reward', 'chest'].includes(item(c.id).kind));
  if (reward) return `Ada ${item(reward.id).name} di papan. Ketuk dua kali untuk mengambilnya!`;
  return null;
}

const CHEERS = ['Wah, hebat!', 'Keren sekali!', 'Pelanggan pasti suka!', 'Luar biasa!'];

export function NinaHelper() {
  const { state } = useGameCtx();
  const [msg, setMsg] = useState(null);
  const timer = useRef(null);
  const tipIdx = useRef(Math.floor(Math.random() * TIPS.length));

  const show = (text, ms = 4200) => {
    clearTimeout(timer.current);
    setMsg(text);
    timer.current = setTimeout(() => setMsg(null), ms);
  };

  useEffect(
    () =>
      bus.on(({ t, d }) => {
        if (t === 'merge' && item(d.id).tier >= 5 && item(d.id).kind === 'food') show(`${CHEERS[Math.floor(Math.random() * CHEERS.length)]} ${item(d.id).name}!`, 2200);
        if (t === 'needEnergy') show('Energinya habis… istirahat sebentar, atau isi ulang di toko.', 3500);
      }),
    [],
  );
  useEffect(() => () => clearTimeout(timer.current), []);

  const tap = () => {
    sfx('tap');
    if (msg) return setMsg(null);
    const c = contextTip(state);
    if (c) return show(c);
    tipIdx.current = (tipIdx.current + 1) % TIPS.length;
    show(TIPS[tipIdx.current]);
  };

  const hasHint = !msg && !!contextTip(state);

  return (
    <div className="nina-helper">
      <button type="button" className={`nina-btn ${hasHint ? 'hint' : ''}`} onClick={tap} aria-label="Tips dari Nina">
        <img src="/ui/nina_avatar.png" alt="" />
        {hasHint && <i className="badge dot">!</i>}
      </button>
      {msg && (
        <div className="nina-bubble" onClick={() => setMsg(null)}>
          {msg}
        </div>
      )}
    </div>
  );
}
