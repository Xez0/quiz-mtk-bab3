# Kuis Interaktif Matematika Kelas 3 SD — Bab 3: Pengukuran Panjang dan Berat

Aplikasi web kuis interaktif mandiri (**terpisah** dari repositori kuis 50 soal) khusus materi **Matematika Kelas 3 SD Semester Ganjil Kurikulum Merdeka — Bab 3: Pengukuran Panjang dan Berat**, berisi **30 soal terstruktur** lengkap dengan **12 ilustrasi SVG presisi**, audio interaktif, dan dasbor rekap guru.

## Struktur Kurikulum (30 Soal, 4 Sub-bab)
1. **Sub-bab A (`subBabId: 1`, 8 Soal)**: Alat Ukur & Pengukuran Panjang Baku (`penggaris`, `meteran pita`, `meteran rol`, pembacaan dari `0` dan non-`0`, serta skala `mm`)
2. **Sub-bab B (`subBabId: 2`, 7 Soal)**: Hubungan Antarsatuan Panjang Baku (`mm`, `cm`, `m`, `km` & penjumlahan/perbandingan panjang)
3. **Sub-bab C (`subBabId: 3`, 8 Soal)**: Alat Ukur & Pengukuran Berat Baku (`timbangan jarum`, `digital`, `neraca`, `timbangan badan`, membaca jarum `kg` & `gram`)
4. **Sub-bab D (`subBabId: 4`, 7 Soal)**: Hubungan Antarsatuan Berat Baku & Soal Cerita (`kg`, `g`, `ons`, kesetimbangan & soal cerita belanja sehari-hari)

## Fitur Keamanan, Anti-Cheating & Isolasi Data
- **Penyimpanan Terisolasi**: Menggunakan prefix `quiz_mtk_bab3_*` dan `quiz_bab3_*` di `localStorage` serta sheet backend terpisah `Rekap_Nilai_Bab3` sehingga tidak pernah bertabrakan dengan aplikasi kuis sebelumnya.
- **Pengacakan Dua Lapis**:
  - Urutan 30 soal diacak menggunakan algoritma Fisher-Yates setiap sesi baru.
  - Isi opsi `A`, `B`, `C`, `D` ikut diacak per siswa sementara huruf tombol tetap terurut (`A–D`). Kunci statis seimbang (`A: 8`, `B: 8`, `C: 7`, `D: 7`).
- **Kunci 1 Kali Pengerjaan & Crash Recovery**:
  - Siswa yang sudah mengirim nilai hanya dapat melihat skor akhirnya dan tidak bisa mengulang.
  - Progres pengerjaan tersimpan otomatis setiap soal sehingga apabila browser tertutup/crash, siswa dapat langsung melanjutkan dari soal terakhirnya.
- **Google Spreadsheet sebagai Single Source of Truth (SSoT)**:
  - Dasbor guru menyinkronkan data langsung 1:1 dengan Google Spreadsheet via Google Apps Script (`backend/Code.gs`). Menghapus baris siswa di Spreadsheet otomatis membuka kunci perangkat dan menghapus data di tampilan dasbor saat disegarkan (`🔄 Segarkan Data`).
- **Akses Guru & Ekspor Lengkap**:
  - Tombol akses guru dilindungi PIN (`js/database.js` & `backend/Code.gs`) tanpa pernah membocorkan PIN di HTML, tooltip `title`, placeholder, atau teks UI.
  - Mendukung ekspor rekap ke **Excel (`.xlsx`)**, **PDF (`.pdf`)**, dan **Word (`.docx`)**.

## Struktur Berkas
```
quiz-mtk-bab3/
├── index.html
├── DESIGN.md
├── README.md
├── assets/
│   └── images/           # 12 ilustrasi pengukuran SVG matematis
├── backend/
│   └── Code.gs           # Google Apps Script endpoint (Sheet: Rekap_Nilai_Bab3)
├── css/
│   └── style.css         # Desain responsif 300px–1440px+
└── js/
    ├── quiz-data.js      # 30 soal Bab 3 + SUBBAB_META
    ├── audio-engine.js   # Web Audio API SFX + Narasi suara Bahasa Indonesia
    ├── database.js       # SSoT Spreadsheet + localStorage terisolasi
    ├── export-engine.js  # Ekspor Excel, PDF, dan Word
    └── app.js            # Kontroler QuizApp
```

## Menjalankan & Deploy Cloud Opsional
1. Untuk pengujian lokal, jalankan HTTP server statis dari folder `quiz-mtk-bab3/`:
   ```powershell
   python -m http.server 8765
   ```
   Lalu buka `http://localhost:8765`.
2. **Sinkronisasi Cloud Multi-Tab (1 Spreadsheet yang Sama, Tab Terpisah `Rekap_Nilai_Bab3`)**:
   - [`js/database.js`](js/database.js) sudah mengarah ke URL Web App Spreadsheet yang sama dan menyertakan parameter `sheet=Rekap_Nilai_Bab3` & `quiz=bab3` agar nilai kuis ini **tidak pernah tercampur** dengan tab kuis 50 soal (`Rekap_Nilai_Murid`).
   - Agar tab `Rekap_Nilai_Bab3` aktif otomatis pada Spreadsheet tersebut:
     1. Buka Google Spreadsheet Anda → **Ekstensi → Apps Script**.
     2. Ganti kode lama dengan isi [`backend/Code.gs`](backend/Code.gs) (versi *Unified Multi-Tab* yang kompatibel untuk kedua kuis) → klik **Simpan**.
     3. Klik **Terapkan (Deploy) → Kelola deployment → Ikon Pensil (Edit) → Versi: "Versi baru" → Terapkan** (URL Web App tetap sama).

