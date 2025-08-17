// Content mapping to external HTML partials (no HTML strings here)
const contentData = {
  dasar: {
    4: {
      title: "Level Dasar: Prasyarat Aljabar",
      description: "Menguasai konsep dasar sebelum belajar Bentuk Aljabar",
      partial: "/partials/dasar/bab4.html",
      exercise: {
        question: "Sederhanakan bentuk: 7 × (2 - 6)",
        options: [
          { text: "7 × 2 - 7 × 6", correct: true },
          { text: "7 × 2 + 7 × 6", correct: false },
          { text: "2 × (7 - 6)", correct: false },
          { text: "6 × 7", correct: false },
        ],
      },
    },
    5: {
      title: "Level Dasar: Prasyarat Kesebangunan",
      description: "Menguasai konsep dasar sebelum belajar Kesebangunan",
      partial: "/partials/dasar/bab5.html",
      exercise: {
        question: "Diketahui sudut p dan q saling berpelurus, p = 20°. Berapakah q?",
        options: [
          { text: "160°", correct: true },
          { text: "150°", correct: false },
          { text: "170°", correct: false },
          { text: "140°", correct: false },
        ],
      },
    },
    6: {
      title: "Level Dasar: Prasyarat Data dan Diagram",
      description: "Menguasai konsep dasar sebelum belajar Data dan Diagram",
      partial: "/partials/dasar/bab6.html",
      exercise: {
        question: "Diketahui total siswa kelas D sebanyak 29, banyak siswa laki-laki 14 siswa. Berapakah banyak siswi perempuan?",
        options: [
          { text: "15", correct: true },
          { text: "14", correct: false },
          { text: "43", correct: false },
          { text: "13", correct: false },
        ],
      },
    },
  },
  menengah: {
    title: "Level Menengah: Konsep Inti Matematika",
    description: "Mempelajari Bentuk Aljabar, Kesebangunan, dan Data & Diagram",
    chapters: [
      { id: 4, title: "Bab 4: Bentuk Aljabar", description: "Bentuk aljabar", partial: "/partials/menengah/bab4.html",
        exercise: {
          question: "Sederhanakan: 2x + 3x - x",
          options: [
            { text: "4x", correct: true },
            { text: "6x", correct: false },
            { text: "5x - x", correct: false },
            { text: "x + 3", correct: false },
          ],
        },
      },
      { id: 5, title: "Bab 5: Kesebangunan", description: "Kesebangunan", partial: "/partials/menengah/bab5.html",
        exercise: {
          question: "Dua bangun sebangun memiliki perbandingan sisi 2:5. Jika sisi pertama 8 cm, sisi kedua adalah...",
          options: [
            { text: "16 cm", correct: false },
            { text: "20 cm", correct: true },
            { text: "25 cm", correct: false },
            { text: "32 cm", correct: false },
          ],
        },
      },
      { id: 6, title: "Bab 6: Data dan Diagram", description: "Data dan Diagram", partial: "/partials/menengah/bab6.html",
        exercise: {
          question: "Rata-rata dari data 6, 8, 10, 12, 14 adalah...",
          options: [
            { text: "8", correct: false },
            { text: "10", correct: true },
            { text: "11", correct: false },
            { text: "12", correct: false },
          ],
        },
      },
    ],
  },
  lanjut: {
    title: "Level Lanjut: Aplikasi Kontekstual",
    description: "Menerapkan konsep matematika dalam situasi nyata",
    chapters: [
      { id: 4, title: "Bab 4: Aljabar dalam Kehidupan Sehari-hari", partial: "/partials/lanjut/bab4.html",
        exercise: {
          question: "Jika y = 2x + 5 menyatakan biaya (dalam ribu rupiah) untuk x barang, berapa biaya untuk 7 barang?",
          options: [
            { text: "14", correct: false },
            { text: "17", correct: false },
            { text: "19", correct: true },
            { text: "21", correct: false },
          ],
        },
      },
      { id: 5, title: "Bab 5: Kesebangunan di Dunia Nyata", partial: "/partials/lanjut/bab5.html",
        exercise: {
          question: "Sebuah model memiliki skala 1:50. Jika panjang model 6 cm, panjang sebenarnya adalah...",
          options: [
            { text: "30 cm", correct: false },
            { text: "300 cm (3 m)", correct: true },
            { text: "60 cm", correct: false },
            { text: "150 cm (1,5 m)", correct: false },
          ],
        },
      },
      { id: 6, title: "Bab 6: Data untuk Pengambilan Keputusan", partial: "/partials/lanjut/bab6.html",
        exercise: {
          question: "Pendapatan harian sebuah kios: 100, 120, 80 (dalam ribu rupiah). Rata-ratanya adalah...",
          options: [
            { text: "90", correct: false },
            { text: "100", correct: true },
            { text: "105", correct: false },
            { text: "110", correct: false },
          ],
        },
      },
    ],
  },
};
const placementTests = {
  4: [
    { question: "Manakah operasi perkalian yang sesuai dengan 3 + 3 + 3 + 3 + 3?", options: [ { text: "5 x 3", correct: true }, { text: "3 x 5", correct: false }, { text: "5 x 5", correct: false }, { text: "3 : 5", correct: false } ] },
    { question: "Bentuk yang sama dengan 3 x (3 + 4) adalah …", options: [ { text: "3:3 + 3:7", correct: false }, { text: "3 x 3 - 3 x 4", correct: false }, { text: "4 x 4 + 3 x 3", correct: false }, { text: "3 x 3 + 3 x 4", correct: true } ] },
    { question: "Bentuk yang sama dengan 7 x 2 - 7 x 6 adalah …", options: [ { text: "7 x 2 + 7x 6", correct: false }, { text: "2 x (7 - 6)", correct: false }, { text: "7 x (2 - 6)", correct: true }, { text: "6 x 7", correct: false } ] },
    { question: "FPB dari 24 dan 12 adalah …", options: [ { text: "12", correct: true }, { text: "24", correct: false }, { text: "2", correct: false }, { text: "6", correct: false } ] },
    { question: "5 x (-2) = …", options: [ { text: "-7", correct: false }, { text: "10", correct: false }, { text: "-10", correct: true }, { text: "7", correct: false } ] },
    { question: "-½ + 4 = …", options: [ { text: "¼", correct: false }, { text: "2/4", correct: false }, { text: "7/2", correct: true }, { text: "1", correct: false } ] },
  ],
  5: [
    { question: "Diketahui sudut a dan b saling berpenyiku, a = 30 derajat, berapakah b?", options: [ { text: "50", correct: false }, { text: "60", correct: true }, { text: "70", correct: false }, { text: "80", correct: false } ] },
    { question: "Diketahui sudut p dan q saling berpelurus, p = 20 derajat, berapakah q?", options: [ { text: "140", correct: false }, { text: "150", correct: false }, { text: "160", correct: true }, { text: "170", correct: false } ] },
    { question: "Bentuk yang senilai dengan ⅔ adalah…", options: [ { text: "6/9", correct: true }, { text: "⅓", correct: false }, { text: "2/7", correct: false }, { text: "4/3", correct: false } ] },
    { question: "FPB dari 8 dan 14 adalah …", options: [ { text: "2", correct: true }, { text: "3", correct: false }, { text: "4", correct: false }, { text: "5", correct: false } ] },
    { question: "KPK dari 4 dan 6 adalah …", options: [ { text: "10", correct: false }, { text: "14", correct: false }, { text: "12", correct: true }, { text: "13", correct: false } ] },
  ],
  6: [
    { question: "Berapakah 20% dari 80?", options: [ { text: "40", correct: false }, { text: "60", correct: false }, { text: "16", correct: true }, { text: "20", correct: false } ] },
    { question: "½ + ¼ + ¼ = …", options: [ { text: "⅔", correct: false }, { text: "¾", correct: false }, { text: "1", correct: true }, { text: "2", correct: false } ] },
    { question: "Bentuk persen dari ⅖ adalah …", options: [ { text: "30", correct: false }, { text: "40", correct: true }, { text: "50", correct: false }, { text: "60", correct: false } ] },
    { question: "Diketahui semua siswa memilih satu jenis buah yang berbeda, 12 siswa suka apel, 14 suka jeruk, dan 11 suka mangga. Berapakah jumlah siswa?", options: [ { text: "26", correct: false }, { text: "25", correct: false }, { text: "36", correct: false }, { text: "37", correct: true } ] },
    { question: "Diketahui total siswa kelas D sebanyak 29, banyak siswa laki-laki 14 siswa. Berapakah banyak siswi perempuan?", options: [ { text: "43", correct: false }, { text: "14", correct: false }, { text: "15", correct: true }, { text: "13", correct: false } ] },
  ],
};
const evaluationTests = {
  4: [
    { question: "Sederhanakan bentuk aljabar: (2x + 3y) + (4x - 2y)", options: [ { text: "6x + y", correct: true }, { text: "6x + 5y", correct: false }, { text: "2x + y", correct: false }, { text: "2x + 5y", correct: false } ] },
    { question: "Faktorkan bentuk aljabar: x² - 9", options: [ { text: "(x - 3)(x + 3)", correct: true }, { text: "(x - 9)(x + 1)", correct: false }, { text: "(x - 3)²", correct: false }, { text: "x(x - 9)", correct: false } ] },
    { question: "Manakah dua bentuk aljabar yang ekuivalen?", options: [ { text: "5x dengan 5x + 4", correct: false }, { text: "-x + 1 dengan 1 - x", correct: true }, { text: "10", correct: false }, { text: "14", correct: false } ] },
    { question: "Hasil dari (x + 2)² adalah...", options: [ { text: "x² + 4", correct: false }, { text: "x² + 4x + 4", correct: true }, { text: "x² + 2x + 4 dengan (x-2)²", correct: false }, { text: "x² + 4x dengan x(2x + 1)", correct: false } ] },
    { question: "Sebuah persegi panjang memiliki panjang (2x + 3) cm dan lebar (x - 1) cm. Luasnya adalah...", options: [ { text: "2x² + x - 3", correct: true }, { text: "2x² + 5x - 3", correct: false }, { text: "3x² + 2x - 3", correct: false }, { text: "2x² - x - 3", correct: false } ] },
  ],
  5: [
    { question: "Dua segitiga ABC dan PQR sebangun. Jika AB = 6 cm, PQ = 9 cm, dan BC = 8 cm, panjang QR adalah...", options: [ { text: "10 cm", correct: false }, { text: "12 cm", correct: false }, { text: "16/3 cm", correct: true }, { text: "16 cm", correct: false } ] },
    { question: "Sebuah foto berukuran 4 cm × 6 cm akan diperbesar menjadi sebangun dengan ukuran 12 cm × ... cm", options: [ { text: "16 cm", correct: false }, { text: "18 cm", correct: true }, { text: "20 cm", correct: false }, { text: "24 cm", correct: false } ] },
    { question: "Pada segitiga sebangun, perbandingan sisi-sisi yang bersesuaian adalah 3:5. Jika keliling segitiga pertama 24 cm, keliling segitiga kedua adalah...", options: [ { text: "30 cm", correct: false }, { text: "35 cm", correct: false }, { text: "40 cm", correct: true }, { text: "45 cm", correct: false } ] },
    { question: "Sebuah peta memiliki skala 1:250.000. Jarak dua kota di peta 8 cm, jarak sebenarnya adalah...", options: [ { text: "20 km", correct: true }, { text: "25 km", correct: false }, { text: "30 km", correct: false }, { text: "35 km", correct: false } ] },
    { question: "Dua segitiga sebangun memiliki perbandingan luas 4:9. Perbandingan sisi-sisi yang bersesuaian adalah...", options: [ { text: "2:3", correct: true }, { text: "4:9", correct: false }, { text: "1:3", correct: false }, { text: "3:5", correct: false } ] },
  ],
  6: [
    { question: "Dalam sebuah kelas, nilai rata-rata matematika adalah 75. Jika ada 30 siswa, jumlah nilai semua siswa adalah...", options: [ { text: "2150", correct: false }, { text: "2250", correct: true }, { text: "2350", correct: false }, { text: "2450", correct: false } ] },
    { question: "Median dari data 5, 7, 8, 10, 12, 15, 18 adalah...", options: [ { text: "8", correct: false }, { text: "10", correct: true }, { text: "12", correct: false }, { text: "15", correct: false } ] },
    { question: "Modus dari data 2, 3, 4, 4, 5, 5, 5, 6, 7, 7 adalah...", options: [ { text: "4", correct: false }, { text: "5", correct: true }, { text: "6", correct: false }, { text: "7", correct: false } ] },
    { question: "Dalam survei preferensi warna, 40% menyukai merah, 30% biru, 20% hijau, dan 10% kuning. Diagram yang paling tepat adalah...", options: [ { text: "Diagram batang", correct: false }, { text: "Diagram lingkaran", correct: true }, { text: "Diagram garis", correct: false }, { text: "Peta", correct: false } ] },
    { question: "Jangkauan dari data 12, 15, 18, 22, 25, 28, 30 adalah...", options: [ { text: "12", correct: false }, { text: "16", correct: false }, { text: "18", correct: true }, { text: "20", correct: false } ] },
  ],
};
window.contentData = contentData;
window.placementTests = placementTests;
window.evaluationTests = evaluationTests;
