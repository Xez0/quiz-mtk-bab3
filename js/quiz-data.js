/**
 * BANK 30 SOAL KHUSUS BAB 3: PENGUKURAN PANJANG DAN BERAT
 * Matematika Kelas 3 SD Semester Ganjil - Kurikulum Merdeka (Kemendikbudristek RI)
 * 
 * Cakupan Sub-bab Resmi:
 * - Sub-bab 1 (A): Alat Ukur & Pengukuran Panjang Baku (8 Soal, ID 1-8)
 * - Sub-bab 2 (B): Hubungan Antarsatuan Panjang Baku (7 Soal, ID 9-15)
 * - Sub-bab 3 (C): Alat Ukur & Pengukuran Berat Baku (8 Soal, ID 16-23)
 * - Sub-bab 4 (D): Hubungan Antarsatuan Berat Baku & Soal Cerita (7 Soal, ID 24-30)
 * 
 * Fitur Khusus:
 * - 12 soal dilengkapi ilustrasi gambar pengukuran presisi (assets/images/*.svg)
 * - Distribusi Kunci Jawaban Seimbang: A (8), B (8), C (7), D (7)
 */

const QUIZ_DATA = [
  // ==========================================
  // SUB-BAB 1: ALAT UKUR & PENGUKURAN PANJANG BAKU (8 SOAL)
  // ==========================================
  {
    id: 1,
    subBabId: 1,
    subBabTitle: "A. Mengukur Panjang Benda",
    difficulty: "easy",
    question: "Perhatikan gambar penggaris dan pensil di atas! Berapakah panjang pensil tersebut?",
    image: "assets/images/q01-penggaris-pensil.svg",
    imageAlt: "Pensil diletakkan di atas penggaris mulai dari angka 0 cm sampai angka 9 cm",
    options: [
      "8 cm",
      "10 cm",
      "9 cm",
      "7 cm"
    ],
    answer: 2,
    isAudioQuestion: false,
    appreciation: "Hebat sekali! Kamu membaca angka pada ujung pensil di penggaris dengan sangat teliti!",
    explanation: "Pangkal pensil sejajar tepat dengan angka 0 cm dan ujung runcingnya berhenti tepat di angka 9 cm. Jadi, panjang pensil adalah 9 cm."
  },
  {
    id: 2,
    subBabId: 1,
    subBabTitle: "A. Mengukur Panjang Benda",
    difficulty: "medium",
    question: "Perhatikan posisi krayon pada gambar penggaris! Berapakah panjang krayon sebenarnya?",
    image: "assets/images/q02-penggaris-krayon.svg",
    imageAlt: "Krayon diletakkan sejajar angka 2 cm sampai angka 8 cm pada penggaris",
    options: [
      "6 cm",
      "8 cm",
      "7 cm",
      "10 cm"
    ],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Cerdas! Kamu tidak tertipu meskipun benda tidak dimulai dari angka nol!",
    explanation: "Pangkal krayon berada di angka 2 cm dan ujungnya di angka 8 cm. Panjang sebenarnya = 8 cm - 2 cm = 6 cm."
  },
  {
    id: 3,
    subBabId: 1,
    subBabTitle: "A. Mengukur Panjang Benda",
    difficulty: "medium",
    question: "Amati garis-garis kecil (milimeter) pada gambar! Panjang penghapus tersebut adalah...",
    image: "assets/images/q03-penggaris-penghapus-mm.svg",
    imageAlt: "Penghapus diukur dari angka 0 cm hingga tepat di garis tengah antara 3 cm dan 4 cm",
    options: [
      "3 cm 2 mm",
      "4 cm",
      "3 cm",
      "3 cm 5 mm"
    ],
    answer: 3,
    isAudioQuestion: false,
    appreciation: "Luar biasa teliti! Kamu mampu membaca skala sentimeter sekaligus milimeter!",
    explanation: "Penghapus dimulai dari angka 0 dan melewati angka 3 cm sebanyak 5 garis kecil (5 mm). Jadi panjangnya adalah 3 cm 5 mm (atau 35 mm)."
  },
  {
    id: 4,
    subBabId: 1,
    subBabTitle: "A. Mengukur Panjang Benda",
    difficulty: "hard",
    question: "Berdasarkan gambar pengukuran di atas, berapakah selisih panjang antara spidol dan paku?",
    image: "assets/images/q04-penggaris-selisih.svg",
    imageAlt: "Spidol hijau panjang 11 cm dan paku logam panjang 4 cm diukur bersama pada penggaris",
    options: [
      "15 cm",
      "7 cm",
      "8 cm",
      "6 cm"
    ],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Super teliti! Kamu berhasil mengukur kedua benda lalu menghitung selisihnya dengan tepat!",
    explanation: "Panjang spidol = 11 cm dan panjang paku = 4 cm. Selisih panjang keduanya = 11 cm - 4 cm = 7 cm."
  },
  {
    id: 5,
    subBabId: 1,
    subBabTitle: "A. Mengukur Panjang Benda",
    difficulty: "easy",
    question: "Penjahit ingin mengukur lingkar pinggang dan panjang kain untuk membuat baju. Alat ukur manakah yang paling tepat?",
    image: "assets/images/q05-alat-ukur-panjang.svg",
    imageAlt: "Empat gambar alat ukur berbeda berlabel Alat 1 (penggaris), Alat 2 (meteran pita), Alat 3 (meteran saku), dan Alat 4 (timbangan)",
    options: [
      "Alat 1 (Penggaris lurus)",
      "Alat 2 (Meteran pita kain)",
      "Alat 3 (Meteran rol kayu)",
      "Alat 4 (Timbangan jarum)"
    ],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Tepat sekali! Meteran pita kain bersifat lentur sehingga pas melingkari tubuh!",
    explanation: "Alat 2 adalah meteran pita (meteran kain) yang lentur dan panjang, sangat cocok digunakan penjahit untuk mengukur kain atau lingkar badan."
  },
  {
    id: 6,
    subBabId: 1,
    subBabTitle: "A. Mengukur Panjang Benda",
    difficulty: "easy",
    question: "Pak Budi seorang tukang kayu yang ingin mengukur panjang dan lebar daun pintu. Alat ukur yang paling tepat digunakan Pak Budi adalah...",
    image: null,
    options: [
      "Penggaris segitiga sekolah",
      "Timbangan duduk",
      "Meteran rol kecil (meteran saku)",
      "Neraca dua lengan"
    ],
    answer: 2,
    isAudioQuestion: false,
    appreciation: "Bagus sekali! Kamu mengenal alat ukur pertukangan dengan sangat baik!",
    explanation: "Meteran rol kecil (meteran saku) terbuat dari pelat logam tipis yang kaku dan panjang (biasanya 3–5 meter), sangat praktis untuk tukang kayu mengukur pintu, meja, atau kayu."
  },
  {
    id: 7,
    subBabId: 1,
    subBabTitle: "A. Mengukur Panjang Benda",
    difficulty: "easy",
    question: "Dengarkan baik-baik: Pada penggaris biasa berukuran 30 yang dibawa ke sekolah, satuan panjang baku yang tertera angkanya adalah...",
    image: null,
    options: [
      "Sentimeter (cm)",
      "Kilogram (kg)",
      "Kilometer (km)",
      "Gram (g)"
    ],
    answer: 0,
    isAudioQuestion: true,
    appreciation: "Pendengaran yang tajam! Penggaris siswa memang berskala sentimeter!",
    explanation: "Penggaris sekolah umumnya memiliki panjang 30 cm dengan angka-angka yang menunjukkan satuan sentimeter (cm) beserta garis kecil milimeter (mm)."
  },
  {
    id: 8,
    subBabId: 1,
    subBabTitle: "A. Mengukur Panjang Benda",
    difficulty: "medium",
    question: "Agar hasil pengukuran panjang buku tulis menggunakan penggaris menjadi tepat, ujung kiri buku harus diletakkan sejajar dengan angka...",
    image: null,
    options: [
      "1 (satu)",
      "10 (sepuluh)",
      "Tepi paling ujung plastik penggaris",
      "0 (nol)"
    ],
    answer: 3,
    isAudioQuestion: false,
    appreciation: "Betul! Memulai dari angka 0 membuat pembacaan panjang menjadi akurat!",
    explanation: "Langkah pertama mengukur dengan penggaris adalah memastikan salah satu ujung benda sejajar tepat dengan garis angka 0, bukan di tepi luar penggaris atau di angka 1."
  },

  // ==========================================
  // SUB-BAB 2: HUBUNGAN ANTARSATUAN PANJANG BAKU (7 SOAL)
  // ==========================================
  {
    id: 9,
    subBabId: 2,
    subBabTitle: "B. Satuan Panjang Baku",
    difficulty: "easy",
    question: "Perhatikan tangga satuan panjang di atas! Berapakah hasil konversi 4 m menjadi cm?",
    image: "assets/images/q09-tangga-satuan-panjang.svg",
    imageAlt: "Tangga satuan panjang km sampai mm menunjukkan turun 2 tangga dari meter ke sentimeter",
    options: [
      "40 cm",
      "400 cm",
      "4.000 cm",
      "140 cm"
    ],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Mantap! Setiap turun dua tangga dikali 100!",
    explanation: "Dari meter (m) ke sentimeter (cm) turun 2 tangga (× 10 × 10 = × 100). Karena 1 m = 100 cm, maka 4 m = 4 × 100 cm = 400 cm."
  },
  {
    id: 10,
    subBabId: 2,
    subBabTitle: "B. Satuan Panjang Baku",
    difficulty: "easy",
    question: "Ibu membeli pita hias sepanjang 300 cm. Panjang pita Ibu jika diubah ke dalam satuan meter (m) adalah...",
    image: null,
    options: [
      "3 meter",
      "30 meter",
      "300 meter",
      "3.000 meter"
    ],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Keren! Kamu lancar mengubah satuan sentimeter kembali menjadi meter!",
    explanation: "Karena 100 cm = 1 m (naik 2 tangga dibagi 100), maka 300 cm = 300 ÷ 100 = 3 meter."
  },
  {
    id: 11,
    subBabId: 2,
    subBabTitle: "B. Satuan Panjang Baku",
    difficulty: "easy",
    question: "Diketahui 1 cm = 10 mm. Panjang sebatang lidi adalah 5 cm. Berapakah panjang lidi tersebut dalam satuan milimeter (mm)?",
    image: null,
    options: [
      "5 mm",
      "500 mm",
      "15 mm",
      "50 mm"
    ],
    answer: 3,
    isAudioQuestion: false,
    appreciation: "Tepat sekali! Mengubah sentimeter ke milimeter berhasil kamu jawab cepat!",
    explanation: "Dari cm ke mm turun 1 tangga (dikalikan 10). Maka 5 cm = 5 × 10 mm = 50 mm."
  },
  {
    id: 12,
    subBabId: 2,
    subBabTitle: "B. Satuan Panjang Baku",
    difficulty: "medium",
    question: "Tinggi sebuah lemari buku adalah 2 meter 35 sentimeter. Tinggi lemari tersebut dalam satuan sentimeter (cm) seluruhnya adalah...",
    image: null,
    options: [
      "205 cm",
      "55 cm",
      "235 cm",
      "2.035 cm"
    ],
    answer: 2,
    isAudioQuestion: false,
    appreciation: "Pintar! Kamu menyatukan ukuran meter dan sentimeter dengan tepat!",
    explanation: "2 meter = 200 cm. Lalu tambahkan 35 cm menjadi: 200 cm + 35 cm = 235 cm."
  },
  {
    id: 13,
    subBabId: 2,
    subBabTitle: "B. Satuan Panjang Baku",
    difficulty: "medium",
    question: "Dengarkan baik-baik: Jarak dari rumah Beni ke taman bermain adalah 1 km 200 m. Jika dinyatakan dalam meter seluruhnya, jarak tersebut adalah...",
    image: null,
    options: [
      "120 meter",
      "1.200 meter",
      "300 meter",
      "1.020 meter"
    ],
    answer: 1,
    isAudioQuestion: true,
    appreciation: "Luar biasa! Penangkapan audio dan konversi kilometer ke metermu hebat!",
    explanation: "1 kilometer (km) = 1.000 meter. Jadi 1 km 200 m = 1.000 m + 200 m = 1.200 meter."
  },
  {
    id: 14,
    subBabId: 2,
    subBabTitle: "B. Satuan Panjang Baku",
    difficulty: "hard",
    question: "Dayu memiliki pita merah sepanjang 180 cm dan pita putih sepanjang 120 cm. Jika kedua pita disambung, panjang keseluruhannya dalam satuan meter adalah...",
    image: null,
    options: [
      "3 meter",
      "2 meter",
      "30 meter",
      "4 meter"
    ],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Juara! Kamu menjumlahkan panjang lalu mengonversinya ke meter dengan benar!",
    explanation: "Total panjang pita = 180 cm + 120 cm = 300 cm. Karena 100 cm = 1 meter, maka 300 cm = 3 meter."
  },
  {
    id: 15,
    subBabId: 2,
    subBabTitle: "B. Satuan Panjang Baku",
    difficulty: "hard",
    question: "Ayah memiliki sebatang bambu sepanjang 4 meter. Ayah memotong bambu tersebut sepanjang 150 cm untuk tiang bendera. Berapa cm sisa bambu Ayah sekarang?",
    image: null,
    options: [
      "350 cm",
      "150 cm",
      "250 cm",
      "200 cm"
    ],
    answer: 2,
    isAudioQuestion: false,
    appreciation: "Sempurna! Soal cerita pengurangan beda satuan kamu kerjakan dengan rapi!",
    explanation: "Ubah ke sentimeter terlebih dahulu: 4 meter = 400 cm. Sisa bambu = 400 cm - 150 cm = 250 cm."
  },

  // ==========================================
  // SUB-BAB 3: ALAT UKUR & PENGUKURAN BERAT BAKU (8 SOAL)
  // ==========================================
  {
    id: 16,
    subBabId: 3,
    subBabTitle: "C. Mengukur Berat Benda",
    difficulty: "easy",
    question: "Perhatikan arah jarum merah pada timbangan kue di atas! Berapa kilogram berat buah jeruk tersebut?",
    image: "assets/images/q16-timbangan-kue-jeruk.svg",
    imageAlt: "Timbangan kue berisi buah jeruk dengan jarum merah menunjuk tepat ke angka 2 kg",
    options: [
      "1 kg",
      "3 kg",
      "4 kg",
      "2 kg"
    ],
    answer: 3,
    isAudioQuestion: false,
    appreciation: "Cermat sekali! Jarum timbangan memang menunjuk tegak ke angka 2 kg!",
    explanation: "Pada timbangan kue berskala kilogram (kg), jarum penunjuk warna merah menunjuk tepat ke angka 2. Jadi berat jeruk tersebut adalah 2 kg."
  },
  {
    id: 17,
    subBabId: 3,
    subBabTitle: "C. Mengukur Berat Benda",
    difficulty: "medium",
    question: "Ibu sedang menimbang sekantong tepung terigu untuk membuat bolu. Berapa gram berat tepung terigu pada gambar timbangan di atas?",
    image: "assets/images/q17-timbangan-gram-tepung.svg",
    imageAlt: "Timbangan dapur menimbang tepung terigu dengan jarum merah menunjuk tepat angka 600 gram",
    options: [
      "600 gram",
      "400 gram",
      "800 gram",
      "500 gram"
    ],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Hebat! Kamu membaca skala jarum ratusan gram dengan tepat!",
    explanation: "Perhatikan angka dan garis skala pada lingkaran timbangan berlabel gram: jarum merah berhenti tepat menunjuk angka 600 gram."
  },
  {
    id: 18,
    subBabId: 3,
    subBabTitle: "C. Mengukur Berat Benda",
    difficulty: "medium",
    question: "Amati layar timbangan digital di atas! Jika berat buah semangka tersebut diuraikan ke dalam kilogram dan gram, maka hasilnya adalah...",
    image: "assets/images/q18-timbangan-digital-semangka.svg",
    imageAlt: "Timbangan digital menimbang buah semangka utuh menampilkan angka 2.500 g di layar",
    options: [
      "25 kg 0 g",
      "2 kg 500 g",
      "2 kg 50 g",
      "20 kg 500 g"
    ],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Brilian! Pembacaan timbangan digital dan penguraian kg-gram kamu sangat tepat!",
    explanation: "Layar menunjukkan 2.500 g. Karena 1.000 g = 1 kg, maka 2.500 g = 2.000 g + 500 g = 2 kg 500 g."
  },
  {
    id: 19,
    subBabId: 3,
    subBabTitle: "C. Mengukur Berat Benda",
    difficulty: "hard",
    question: "Posisi neraca dua lengan di atas seimbang rata. Di piringan kanan terdapat beban 1 kg dan 500 g. Berapa gram total berat buah apel di piringan kiri?",
    image: "assets/images/q19-neraca-apel.svg",
    imageAlt: "Neraca dua lengan seimbang antara tiga buah apel di sisi kiri dan dua pemberat 1 kg serta 500 g di sisi kanan",
    options: [
      "501 gram",
      "1.050 gram",
      "1.500 gram",
      "2.000 gram"
    ],
    answer: 2,
    isAudioQuestion: false,
    appreciation: "Luar biasa! Kamu menyamakan satuan anak timbangan dengan sangat cermat!",
    explanation: "Karena neraca seimbang, berat apel sama dengan total beban kanan: 1 kg + 500 g = 1.000 g + 500 g = 1.500 gram."
  },
  {
    id: 20,
    subBabId: 3,
    subBabTitle: "C. Mengukur Berat Benda",
    difficulty: "hard",
    question: "Siti menimbang berat badannya dan jarum menunjuk seperti pada gambar. Jika berat badan kakaknya 40 kg, berapakah selisih berat badan Siti dan kakaknya?",
    image: "assets/images/q20-timbangan-badan.svg",
    imageAlt: "Timbangan badan biru dengan garis merah menunjuk tepat angka 32 kg",
    options: [
      "8 kg",
      "7 kg",
      "9 kg",
      "12 kg"
    ],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Pintar sekali! Membaca timbangan badan lalu mencari selisihnya berhasil dituntaskan!",
    explanation: "Pada timbangan badan tertera berat Siti = 32 kg. Jika berat kakaknya 40 kg, selisihnya = 40 kg - 32 kg = 8 kg."
  },
  {
    id: 21,
    subBabId: 3,
    subBabTitle: "C. Mengukur Berat Benda",
    difficulty: "hard",
    question: "Amati berat Buah Mangga dan Buah Melon pada gambar di atas! Manakah pernyataan perbandingan yang paling tepat?",
    image: "assets/images/q21-banding-berat-buah.svg",
    imageAlt: "Dua tampilan berat buah: Mangga seberat 1 kg 200 g dan Melon seberat 1.800 g",
    options: [
      "Mangga lebih berat 600 gram daripada melon",
      "Berat buah mangga sama dengan melon",
      "Melon lebih ringan 600 gram daripada mangga",
      "Melon lebih berat 600 gram daripada mangga"
    ],
    answer: 3,
    isAudioQuestion: false,
    appreciation: "Analisa yang tajam! Kamu mengubah satuan agar adil lalu membandingkannya!",
    explanation: "Berat Mangga = 1 kg 200 g = 1.200 g. Berat Melon = 1.800 g. Jadi Melon lebih berat sebesar 1.800 g - 1.200 g = 600 gram daripada mangga."
  },
  {
    id: 22,
    subBabId: 3,
    subBabTitle: "C. Mengukur Berat Benda",
    difficulty: "easy",
    question: "Dengarkan baik-baik: Di toko perhiasan, penjual menimbang cincin emas yang sangat ringan dan butuh ketelitian tinggi menggunakan...",
    image: null,
    options: [
      "Timbangan badan",
      "Neraca (timbangan dua lengan/emas)",
      "Meteran rol",
      "Timbangan karung beras"
    ],
    answer: 1,
    isAudioQuestion: true,
    appreciation: "Tepat sekali! Neraca digunakan untuk menimbang benda kecil yang sangat ringan!",
    explanation: "Neraca atau timbangan emas memiliki kepekaan sangat tinggi hingga satuan miligram/gram sehingga pas menimbang perhiasan."
  },
  {
    id: 23,
    subBabId: 3,
    subBabTitle: "C. Mengukur Berat Benda",
    difficulty: "easy",
    question: "Pedagang beras di pasar tradisional biasa menimbang beras 5 kg hingga 10 kg menggunakan anak timbangan besi. Nama timbangan tersebut adalah...",
    image: null,
    options: [
      "Timbangan pasar (timbangan bebek/kodok)",
      "Timbangan gantung bayi",
      "Penggaris kayu",
      "Timbangan badan"
    ],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Bagus! Kamu mengenali alat ukur berat di kehidupan pasar tradisional!",
    explanation: "Timbangan pasar sering disebut timbangan bebek atau kodok karena bentuk paruh penunjuk keseimbangannya, yang menggunakan batu anak timbangan besi."
  },

  // ==========================================
  // SUB-BAB 4: HUBUNGAN ANTARSATUAN BERAT & SOAL CERITA (7 SOAL)
  // ==========================================
  {
    id: 24,
    subBabId: 4,
    subBabTitle: "D. Satuan Berat & Aplikasi",
    difficulty: "easy",
    question: "Satuan berat baku 1 kilogram (kg) sama nilainya dengan berapa gram (g)?",
    image: null,
    options: [
      "10 gram",
      "100 gram",
      "1.000 gram",
      "500 gram"
    ],
    answer: 2,
    isAudioQuestion: false,
    appreciation: "Mantap! Dasar konversi kilogram ke gram sudah kamu kuasai!",
    explanation: "Berdasarkan tangga satuan berat baku, 1 kilogram sama dengan 1.000 gram (1 kg = 1.000 g)."
  },
  {
    id: 25,
    subBabId: 4,
    subBabTitle: "D. Satuan Berat & Aplikasi",
    difficulty: "easy",
    question: "Berat sebuah pepaya matang adalah 2 kg. Berapakah berat pepaya tersebut dalam satuan gram?",
    image: null,
    options: [
      "20 gram",
      "200 gram",
      "1.200 gram",
      "2.000 gram"
    ],
    answer: 3,
    isAudioQuestion: false,
    appreciation: "Cepat dan tepat! Mengubah 2 kg ke gram sangat mudah bagimu!",
    explanation: "Karena 1 kg = 1.000 gram, maka 2 kg = 2 × 1.000 gram = 2.000 gram."
  },
  {
    id: 26,
    subBabId: 4,
    subBabTitle: "D. Satuan Berat & Aplikasi",
    difficulty: "medium",
    question: "Di lemari dapur terdapat 3.000 gram gula pasir. Berat gula pasir tersebut setara dengan...",
    image: null,
    options: [
      "30 kg",
      "3 kg",
      "300 kg",
      "13 kg"
    ],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Pintar! Membagi 1.000 untuk mengubah gram ke kilogram sudah sangat lancar!",
    explanation: "Karena 1.000 gram = 1 kg, maka 3.000 gram = 3.000 ÷ 1.000 = 3 kg."
  },
  {
    id: 27,
    subBabId: 4,
    subBabTitle: "D. Satuan Berat & Aplikasi",
    difficulty: "medium",
    question: "Dengarkan baik-baik: 1 kilogram sama dengan 10 ons. Ibu membeli 4 kg telur ayam di warung. Berapa ons berat seluruh telur tersebut?",
    image: null,
    options: [
      "4 ons",
      "400 ons",
      "40 ons",
      "14 ons"
    ],
    answer: 2,
    isAudioQuestion: true,
    appreciation: "Hebat sekali! Kamu mengenal satuan ons (hektogram) dan mengalikannya dengan benar!",
    explanation: "Karena 1 kg = 10 ons (1 hg), maka 4 kg = 4 × 10 ons = 40 ons."
  },
  {
    id: 28,
    subBabId: 4,
    subBabTitle: "D. Satuan Berat & Aplikasi",
    difficulty: "medium",
    question: "Ibu membeli 2 kg tepung terigu dan 750 gram mentega untuk membuat kue. Berapakah total berat belanjaan Ibu dalam satuan gram?",
    image: null,
    options: [
      "2.750 gram",
      "950 gram",
      "2.075 gram",
      "770 gram"
    ],
    answer: 0,
    isAudioQuestion: false,
    appreciation: "Teliti sekali! Kamu menyamakan semua ke gram terlebih dahulu sebelum menjumlahkan!",
    explanation: "Tepung = 2 kg = 2.000 gram. Mentega = 750 gram. Total belanjaan = 2.000 + 750 = 2.750 gram."
  },
  {
    id: 29,
    subBabId: 4,
    subBabTitle: "D. Satuan Berat & Aplikasi",
    difficulty: "hard",
    question: "Di dalam kardus ada 4 bungkus gula pasir. Masing-masing bungkus memiliki berat 500 gram. Berapa kilogram (kg) berat seluruh gula pasir itu?",
    image: null,
    options: [
      "1 kg",
      "2 kg",
      "4 kg",
      "20 kg"
    ],
    answer: 1,
    isAudioQuestion: false,
    appreciation: "Luar biasa cerdas! Soal perkalian lalu ubah ke kg kamu selesaikan sempurna!",
    explanation: "Berat seluruh gula = 4 × 500 gram = 2.000 gram. Karena 1.000 gram = 1 kg, maka 2.000 gram = 2 kg."
  },
  {
    id: 30,
    subBabId: 4,
    subBabTitle: "D. Satuan Berat & Aplikasi",
    difficulty: "hard",
    question: "Persediaan beras di rumah ada 5 kg. Setelah dimasak sebanyak 1.500 gram, berapa gram sisa beras yang masih ada sekarang?",
    image: null,
    options: [
      "4.500 gram",
      "2.500 gram",
      "4.000 gram",
      "3.500 gram"
    ],
    answer: 3,
    isAudioQuestion: false,
    appreciation: "Juara Bab 3! Soal tantangan pengurangan berat berhasil kamu taklukkan dengan sempurna!",
    explanation: "Persediaan beras awal = 5 kg = 5.000 gram. Beras yang dimasak = 1.500 gram. Sisa beras = 5.000 - 1.500 = 3.500 gram."
  }
];

// Metadata Sub-bab untuk Analisis Diagnostik Dasbor Siswa & Guru
const SUBBAB_META = {
  "1": {
    title: "A. Alat Ukur & Pengukuran Panjang",
    shortTitle: "Sub-bab A",
    totalQuestions: 8,
    color: "#0ea5e9"
  },
  "2": {
    title: "B. Satuan Panjang & Soal Cerita",
    shortTitle: "Sub-bab B",
    totalQuestions: 7,
    color: "#a855f7"
  },
  "3": {
    title: "C. Alat Ukur & Pengukuran Berat",
    shortTitle: "Sub-bab C",
    totalQuestions: 8,
    color: "#f97316"
  },
  "4": {
    title: "D. Satuan Berat & Soal Cerita",
    shortTitle: "Sub-bab D",
    totalQuestions: 7,
    color: "#22c55e"
  }
};

