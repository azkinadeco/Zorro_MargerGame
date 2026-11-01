# Zorro Merge Cats — Kafe Kucing 🐾

Game merge kasual bertema kafe kucing, terinspirasi gameplay *Piece of Cake: Merge & Bake*.
Nina mewarisi kafe tua milik Neneknya, dan bersama Zorro si kucing tuxedo, kalian menghidupkan kafe itu lagi.

## Cara main

1. **Ketuk generator** (Mesin Kopi, Oven, Etalase Kue, Teko Antik, Keranjang Ikan) untuk membuat item. Setiap ketukan memakai 1 energi.
2. **Seret dua item yang sama** untuk menggabungkannya jadi item level berikutnya. Generator juga bisa digabung (maks. Lv 3) supaya lebih sering menghasilkan item level tinggi.
3. **Sajikan pesanan** pelanggan kucing di bagian atas untuk mendapat koin dan XP.
4. **Renovasi kafe** dengan koin: 8 ruangan, masing-masing 7 tugas renovasi. Ruangan yang selesai membuka cerita, hadiah permata, dan kucing penghuni baru.

5. **Teman Kucing**: beri Zorro, Loki, dan Thor camilan favorit mereka. Setiap hati baru memberi permata dan membuka foto asli mereka di **Album Foto**.

6. **Festival mingguan**: kumpulkan poin dari pesanan dan renovasi untuk 12 hadiah yang berganti tema setiap minggu.
7. **Prestasi**: 10 pencapaian bertingkat dengan hadiah permata.

Fitur lain: kode cadangan untuk pindah progres antar perangkat (Pengaturan), jalur hadiah level, pelanggan VIP berbatas waktu (koin ganda + permata), ganti pesanan dengan 1 permata, petunjuk merge otomatis saat diam, kotak misteri & sarang laba-laba di papan, gelembung bonus, gudang, tombol hadiah, naik level dengan generator baru,
misi harian, hadiah login 7 hari, buku resep (koleksi item), toko, energi yang terisi sendiri, musik & efek suara (Web Audio), tutorial interaktif, dan simpan otomatis di perangkat.

## Struktur kode

```
src/
  game/      logika murni: items, orders, areas, quests, engine (aturan main), useGame (state + simpan)
  art/       ilustrasi SVG semua item dan pelanggan kucing
  ui/        layar (Kafe, Papan), modal, dialog, tutorial, efek
  styles.css
public/      gambar latar ruangan, karakter, ikon
```

## Menjalankan

```bash
npm install
npm run dev     # pengembangan
npm run build   # build produksi ke dist/ (dipakai Vercel)
```
