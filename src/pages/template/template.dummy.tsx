import { ISteps } from "component/progression-step/progression-step.interface";
import { IPreviewSoal, ITemplateSoal } from "./template.interface";

export const dummyTemplateSoal: ITemplateSoal[] = [
  {
    title: "Soal Matematika Dasar",
    desc: "Kumpulan soal aritmatika dasar untuk siswa kelas 4–6.",
    tag: [
      { name: "Matematika", type: "Kategori" },
      { name: "Pilihan Ganda", type: "Tipe" },
      { name: "Mudah", type: "Kesulitan" },
      { name: "Dipilih 150x", type: "Statistik" },
      { name: "Aritmatika", type: "Topik" },
      { name: "Level SD", type: "Level" },
    ],
  },
  {
    title: "Pemahaman Teks Bacaan",
    desc: "Evaluasi kemampuan membaca dan memahami bacaan pendek.",
    tag: [
      { name: "Bahasa Indonesia", type: "Kategori" },
      { name: "Essay", type: "Tipe" },
      { name: "Sedang", type: "Kesulitan" },
      { name: "Dipilih 88x", type: "Statistik" },
      { name: "Reading", type: "Topik" },
      { name: "Kelas 6", type: "Level" },
    ],
  },
  {
    title: "Soal IPA: Sistem Pencernaan",
    desc: "Latihan soal seputar sistem pencernaan pada manusia.",
    tag: [
      { name: "IPA", type: "Kategori" },
      { name: "Pilihan Ganda", type: "Tipe" },
      { name: "Mudah", type: "Kesulitan" },
      { name: "Dipilih 98x", type: "Statistik" },
      { name: "Biologi", type: "Topik" },
      { name: "SMP", type: "Level" },
    ],
  },
  {
    title: "Logika dan Penalaran",
    desc: "Tes logika dasar dan kemampuan penalaran matematis.",
    tag: [
      { name: "Logika", type: "Kategori" },
      { name: "Essay", type: "Tipe" },
      { name: "Sulit", type: "Kesulitan" },
      { name: "Dipilih 65x", type: "Statistik" },
      { name: "Logika Matematika", type: "Topik" },
      { name: "Level SMA", type: "Level" },
    ],
  },
  {
    title: "Soal Sejarah Indonesia",
    desc: "Menguji pengetahuan tentang masa kemerdekaan RI.",
    tag: [
      { name: "Sejarah", type: "Kategori" },
      { name: "Pilihan Ganda", type: "Tipe" },
      { name: "Sedang", type: "Kesulitan" },
      { name: "Dipilih 105x", type: "Statistik" },
      { name: "Kemerdekaan", type: "Topik" },
      { name: "Sumber Nasional", type: "Sumber" },
    ],
  },
  {
    title: "Soal Fisika: Gaya & Gerak",
    desc: "Pertanyaan dasar tentang hukum Newton dan gaya.",
    tag: [
      { name: "Fisika", type: "Kategori" },
      { name: "Pilihan Ganda", type: "Tipe" },
      { name: "Sedang", type: "Kesulitan" },
      { name: "Dipilih 77x", type: "Statistik" },
      { name: "Gerak", type: "Topik" },
      { name: "Level SMP", type: "Level" },
    ],
  },
  {
    title: "Soal Matematika Dasar",
    desc: "Kumpulan soal aritmatika dasar untuk siswa kelas 4–6.",
    tag: [
      { name: "Matematika", type: "Kategori" },
      { name: "Pilihan Ganda", type: "Tipe" },
      { name: "Mudah", type: "Kesulitan" },
      { name: "Dipilih 150x", type: "Statistik" },
      { name: "Aritmatika", type: "Topik" },
      { name: "Level SD", type: "Level" },
    ],
  },
  {
    title: "Pemahaman Teks Bacaan",
    desc: "Evaluasi kemampuan membaca dan memahami bacaan pendek.",
    tag: [
      { name: "Bahasa Indonesia", type: "Kategori" },
      { name: "Essay", type: "Tipe" },
      { name: "Sedang", type: "Kesulitan" },
      { name: "Dipilih 88x", type: "Statistik" },
      { name: "Reading", type: "Topik" },
      { name: "Kelas 6", type: "Level" },
    ],
  },
  {
    title: "Soal IPA: Sistem Pencernaan",
    desc: "Latihan soal seputar sistem pencernaan pada manusia.",
    tag: [
      { name: "IPA", type: "Kategori" },
      { name: "Pilihan Ganda", type: "Tipe" },
      { name: "Mudah", type: "Kesulitan" },
      { name: "Dipilih 98x", type: "Statistik" },
      { name: "Biologi", type: "Topik" },
      { name: "SMP", type: "Level" },
    ],
  },
  {
    title: "Logika dan Penalaran",
    desc: "Tes logika dasar dan kemampuan penalaran matematis.",
    tag: [
      { name: "Logika", type: "Kategori" },
      { name: "Essay", type: "Tipe" },
      { name: "Sulit", type: "Kesulitan" },
      { name: "Dipilih 65x", type: "Statistik" },
      { name: "Logika Matematika", type: "Topik" },
      { name: "Level SMA", type: "Level" },
    ],
  },
  {
    title: "Soal Sejarah Indonesia",
    desc: "Menguji pengetahuan tentang masa kemerdekaan RI.",
    tag: [
      { name: "Sejarah", type: "Kategori" },
      { name: "Pilihan Ganda", type: "Tipe" },
      { name: "Sedang", type: "Kesulitan" },
      { name: "Dipilih 105x", type: "Statistik" },
      { name: "Kemerdekaan", type: "Topik" },
      { name: "Sumber Nasional", type: "Sumber" },
    ],
  },
  {
    title: "Soal Fisika: Gaya & Gerak",
    desc: "Pertanyaan dasar tentang hukum Newton dan gaya.",
    tag: [
      { name: "Fisika", type: "Kategori" },
      { name: "Pilihan Ganda", type: "Tipe" },
      { name: "Sedang", type: "Kesulitan" },
      { name: "Dipilih 77x", type: "Statistik" },
      { name: "Gerak", type: "Topik" },
      { name: "Level SMP", type: "Level" },
    ],
  },
  {
    title: "Soal Matematika Dasar",
    desc: "Kumpulan soal aritmatika dasar untuk siswa kelas 4–6.",
    tag: [
      { name: "Matematika", type: "Kategori" },
      { name: "Pilihan Ganda", type: "Tipe" },
      { name: "Mudah", type: "Kesulitan" },
      { name: "Dipilih 150x", type: "Statistik" },
      { name: "Aritmatika", type: "Topik" },
      { name: "Level SD", type: "Level" },
    ],
  },
  {
    title: "Pemahaman Teks Bacaan",
    desc: "Evaluasi kemampuan membaca dan memahami bacaan pendek.",
    tag: [
      { name: "Bahasa Indonesia", type: "Kategori" },
      { name: "Essay", type: "Tipe" },
      { name: "Sedang", type: "Kesulitan" },
      { name: "Dipilih 88x", type: "Statistik" },
      { name: "Reading", type: "Topik" },
      { name: "Kelas 6", type: "Level" },
    ],
  },
  {
    title: "Soal IPA: Sistem Pencernaan",
    desc: "Latihan soal seputar sistem pencernaan pada manusia.",
    tag: [
      { name: "IPA", type: "Kategori" },
      { name: "Pilihan Ganda", type: "Tipe" },
      { name: "Mudah", type: "Kesulitan" },
      { name: "Dipilih 98x", type: "Statistik" },
      { name: "Biologi", type: "Topik" },
      { name: "SMP", type: "Level" },
    ],
  },
  {
    title: "Logika dan Penalaran",
    desc: "Tes logika dasar dan kemampuan penalaran matematis.",
    tag: [
      { name: "Logika", type: "Kategori" },
      { name: "Essay", type: "Tipe" },
      { name: "Sulit", type: "Kesulitan" },
      { name: "Dipilih 65x", type: "Statistik" },
      { name: "Logika Matematika", type: "Topik" },
      { name: "Level SMA", type: "Level" },
    ],
  },
  {
    title: "Soal Sejarah Indonesia",
    desc: "Menguji pengetahuan tentang masa kemerdekaan RI.",
    tag: [
      { name: "Sejarah", type: "Kategori" },
      { name: "Pilihan Ganda", type: "Tipe" },
      { name: "Sedang", type: "Kesulitan" },
      { name: "Dipilih 105x", type: "Statistik" },
      { name: "Kemerdekaan", type: "Topik" },
      { name: "Sumber Nasional", type: "Sumber" },
    ],
  },
  {
    title: "Soal Fisika: Gaya & Gerak",
    desc: "Pertanyaan dasar tentang hukum Newton dan gaya.",
    tag: [
      { name: "Fisika", type: "Kategori" },
      { name: "Pilihan Ganda", type: "Tipe" },
      { name: "Sedang", type: "Kesulitan" },
      { name: "Dipilih 77x", type: "Statistik" },
      { name: "Gerak", type: "Topik" },
      { name: "Level SMP", type: "Level" },
    ],
  },
];

export const stepForm: ISteps[] = [
    {
        textIcon: '01',
        label: 'Informasi',
        value: 'informasi',
    },
    {
        textIcon: '02',
        label: 'Pilih Soal',
        value: 'pilihsoal',
    },
]

export const dummyOptionsSoal: IPreviewSoal = {
  title: 'Ibu Kota Negara Indonesia',
  desc: 'Soal pilihan ganda sederhana tentang geografi.',
  tag: { label: 'Geografi', value: 'geografi' },
  kategori: { label: 'SD', value: 'sd' },
  type: { label: 'options', value: 'options' },
  soal: '<p>Apa ibu kota negara Indonesia?</p>',
  options: [
    { type: 'text', value: 'Jakarta', isCorrect: true },
    { type: 'text', value: 'Bandung' },
    { type: 'text', value: 'Surabaya' },
    { type: 'text', value: 'Medan' },
  ],
};


export const dummyCheckboxSoal: IPreviewSoal = {
  title: 'Contoh Bilangan Ganjil',
  desc: 'Pilih semua bilangan ganjil dari opsi berikut.',
  tag: { label: 'Matematika', value: 'matematika' },
  kategori: { label: 'SMP', value: 'smp' },
  type: { label: 'checkbox', value: 'checkbox' },
  soal: '<p>Manakah dari bilangan berikut yang merupakan bilangan ganjil?</p>',
  options: [
    { type: 'text', value: '1', isCorrect: true },
    { type: 'text', value: '2' },
    { type: 'text', value: '3', isCorrect: true },
    { type: 'text', value: '4' },
  ],
};

export const dummyTextSoal: IPreviewSoal = {
  title: 'Penemu Lampu Pijar',
  desc: 'Isilah jawaban singkat.',
  tag: { label: 'IPA', value: 'ipa' },
  kategori: { label: 'SMP', value: 'smp' },
  type: { label: 'text', value: 'text' },
  soal: '<p>Sebutkan nama penemu lampu pijar!</p>',
};


export const dummyFileSoal: IPreviewSoal = {
  title: 'Unggah Tugas Gambar',
  desc: 'Tugas praktik untuk siswa menggambar peta.',
  tag: { label: 'Seni', value: 'seni' },
  kategori: { label: 'SMA', value: 'sma' },
  type: { label: 'file', value: 'file' },
  soal: '<p>Silakan unggah gambar peta provinsi tempat tinggalmu.</p>',
};

export const dummyCodeSoal: IPreviewSoal = {
  title: 'Cetak Hello World',
  desc: 'Soal latihan dasar pemrograman.',
  tag: { label: 'Informatika', value: 'informatika' },
  kategori: { label: 'SMA', value: 'sma' },
  type: { label: 'code', value: 'code' },
  soal: '<p>Buatlah program dalam bahasa Python yang mencetak <strong>Hello World</strong>!</p>',
};
