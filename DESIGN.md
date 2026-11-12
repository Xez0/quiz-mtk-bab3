# DESIGN.md — Kuis Interaktif Matematika Kelas 3 SD (Bab 3: Pengukuran Panjang & Berat)

## 1. Visual Aesthetic & Palette
Aplikasi dirancang dengan gaya **Playful Classroom Sky & Sun**, bersih, kontras tinggi, ramah anak kelas 3 SD, serta responsif penuh dari layar mobile ultra-kompak (`300px+`) hingga desktop (`1440px+`).

- **Primary Sky Palette**: `#0284c7` (`--sky-600`), `#38bdf8` (`--sky-400`), `#bae6fd` (`--sky-200`), `#7dd3fc` (`--sky-300`), `#f0f9ff` (`--sky-50`)
- **Surface & Text**: `#ffffff` (card surface), `#0f172a` (`--slate-900`), `#334155` (`--slate-700`), `#64748b` (`--slate-500`)
- **Semantic Accents**:
  - Success / Lulus KKM: `#16a34a` (`--emerald-600`)
  - Warning / Perlu Latihan: `#d97706` (`--amber-600`)
  - Error: `#dc2626` (`--red-600`)
  - Streak / Highlight: `#f59e0b`

## 2. Tipografi & Komponen Kuis
- **Font Family**: `Nunito` / `Fredoka` fallback sans-serif untuk judul ramah anak & angka pengukuran yang jelas (`cm`, `mm`, `m`, `km`, `kg`, `g`, `ons`).
- **Question Media Slot (`.question-box-toolbar` + `.question-media`)**:
  -Toolbar sejajar di atas konten soal berisi badge `🖼️ Amati Gambar` (`#question-media-badge`) dan tombol `🔊 Dengarkan` (`#btn-listen-question`), mencegah tumpang-tindih absolut pada layar sempit `300px–360px`.
  - Wadah `#question-media-container` merender 12 aset ilustrasi SVG presisi (`max-width: 100%; height: auto`) di atas teks pertanyaan agar kalimat *"Perhatikan gambar di atas!"* konsisten secara visual.

## 3. Aset Ilustrasi Pengukuran SVG Presisi (`assets/images/`)
Seluruh 12 ilustrasi dibangun secara matematis (`generate_svgs.py`) sehingga skala penggaris (posisi nol dan non-nol, sub-skala `mm`) serta sudut jarum timbangan jarum cocok 100% dengan kunci jawaban:
1. `q01-penggaris-pensil.svg` — Penggaris cm mengukur pensil dari titik `0 cm` ke `9 cm`
2. `q02-penggaris-krayon.svg` — Penggaris cm mengukur krayon dari posisi tidak nol (`2 cm` ke `8 cm`)
3. `q03-penggaris-penghapus-mm.svg` — Penggaris zoom skala milimeter (`mm`) untuk penghapus (`3 cm 5 mm`)
4. `q04-penggaris-selisih.svg` — Pengukuran dua benda (spidol `11 cm` dan paku `4 cm`) untuk mencari selisih
5. `q05-alat-ukur-panjang.svg` — Empat ilustrasi alat ukur bernomor netral (`Alat 1–4`: penggaris, meteran pita, meteran rol saku, timbangan)
6. `q09-tangga-satuan-panjang.svg` — Tangga 7 satuan panjang (`km`–`mm`) dengan loncatan `× 10` untuk konversi `4 m = ... cm`
7. `q16-timbangan-kue-jeruk.svg` — Timbangan kue jarum presisi untuk buah jeruk (`2 kg`)
8. `q17-timbangan-gram-tepung.svg` — Timbangan dapur jarum skala `gram` untuk tepung terigu (`600 gram`)
9. `q18-timbangan-digital-semangka.svg` — Timbangan digital layar LCD menampilkan berat semangka (`2.500 g`)
10. `q19-neraca-apel.svg` — Neraca dua lengan seimbang membandingkan buah apel dengan anak timbangan `1 kg` + `500 g`
11. `q20-timbangan-badan.svg` — Timbangan badan skala zoomed menunjuk tepat `32 kg`
12. `q21-banding-berat-buah.svg` — Perbandingan berat mangga (`1 kg 200 g`) dan melon (`1.800 g`) pada layar timbangan digital

## 4. Layout & Breakpoint Responsif
- `>= 1024px`: Container lebar optimal, grid statistik guru 5 kolom, tabel horizontal bersih.
- `768px` / `640px`: Padding kartu merapat, kontrol filter & ekspor menumpuk rapi.
- `480px` / `360px` / `300px+`: Ukuran font, badge, opsi `A–D`, dan ilustrasi SVG terskala proporsional dengan `overflow-x: hidden` pada container utama serta horizontal scroll terkontrol pada tabel dasbor guru.

