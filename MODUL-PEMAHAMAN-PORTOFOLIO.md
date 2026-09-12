# Modul Pemahaman Web Portofolio Azmi

## 1. Gambaran Umum

Web ini adalah portofolio pribadi berbasis **Next.js**, **React**, **TypeScript**, dan **Tailwind CSS**. Isinya berupa profil, layanan, pengalaman, proyek, skill, dan kontak.

Alur sederhananya:

```text
layout.tsx
  -> Navbar
  -> page.tsx
       -> AnimationLayout
            -> Hero
            -> Services
            -> Resume
            -> Projects
            -> Skills
            -> Contact
  -> Footer
  -> ScrollTopButton
```

## 2. Fungsi File Utama

### `src/app/layout.tsx`

Layout global yang dipakai semua halaman. Fungsinya:

- Mengatur metadata judul dan deskripsi website.
- Memasang font Poppins.
- Memuat `globals.css`.
- Menampilkan `Navbar`, isi halaman, `Footer`, dan `ScrollTopButton`.

### `src/app/page.tsx`

Halaman utama portofolio. File ini tidak mengatur detail tampilan, tetapi menyusun urutan section:

1. Hero
2. Services
3. Resume
4. Projects
5. Skills
6. Contact

### `src/app/globals.css`

Berisi style global, konfigurasi tema terang/gelap, animasi skill card, animasi intro, dan aturan responsive tertentu.

### `layouts/AnimationLayout.tsx`

Pembungkus isi halaman yang menangani:

- Splash screen/loading saat website dibuka.
- Sapaan dalam beberapa bahasa.
- Inisialisasi animasi AOS saat elemen masuk layar.

## 3. Penjelasan Setiap Component

### Komponen umum: `src/components/general`

- `Header.tsx`: Judul section yang dapat digunakan ulang. Menerima `title` dan jenis heading.
- `LinkButton.tsx`: Tombol link reusable, termasuk link proyek, download CV, ikon, dan animasi.
- `Footer.tsx`: Menampilkan copyright dan tahun otomatis.
- `ScrollTopButton.tsx`: Tombol kembali ke atas yang muncul setelah pengguna scroll lebih dari 300px.

### Navbar: `src/components/general/navbar`

- `Navbar.tsx`: Mengatur navbar desktop/mobile, menu saat scroll, tema terang/gelap, dan penyimpanan tema di `localStorage`.
- `Logo.tsx`: Logo yang mengarah ke halaman utama.
- `MobileNav.tsx`: Menu navigasi khusus layar kecil dan tombol download CV.

### Hero: `src/components/home/hero`

- `HeroSection.tsx`: Area pembuka yang berisi foto, nama, deskripsi, tombol proyek, dan efek visual.
- `AnimatedIntro.tsx`: Menampilkan beberapa profesi menggunakan efek typewriter.
- `Particels.tsx`: Membuat animasi partikel WebGL menggunakan library OGL. Nama file mengikuti kode yang tersedia.

### Services: `src/components/services`

- `ServiceSection.tsx`: Menampilkan daftar layanan yang ditawarkan.
- `ServiceCard.tsx`: Kartu reusable untuk satu layanan, terdiri dari ikon, nama, dan deskripsi.

### Resume: `src/components/resume`

- `ResumeSection.tsx`: Menampilkan informasi About Me dan pengalaman kerja.
- `ResumeCard.tsx`: Kartu reusable untuk jabatan, tanggal, ikon, dan deskripsi pengalaman.

### Projects: `src/components/projects`

- `ProjectSection.tsx`: Menyiapkan data dan menampilkan daftar proyek.
- `ProjectCard.tsx`: Menampilkan gambar, judul, deskripsi, dan link website proyek.

### Skills: `src/components/skills`

- `SkillSection.tsx`: Menampilkan grid teknologi dan tools yang dikuasai, seperti HTML, JavaScript, Python, React, Next.js, Node.js, Tailwind CSS, Supabase, dan Figma.

### Contact: `src/components/contact`

- `ContactSection.tsx`: Menampilkan informasi kontak, sosial media, serta form pesan.
- Form dikirim ke Web3Forms dan hasilnya diberi notifikasi menggunakan `react-hot-toast`.

## 4. Konsep Penting

- **Component**: Bagian UI kecil yang dapat digunakan kembali, contohnya `ProjectCard`.
- **Props**: Data yang dikirim dari component induk ke component anak, contohnya judul dan deskripsi pada card.
- **State**: Data yang dapat berubah saat website digunakan, contohnya status menu mobile atau tema.
- **Client component**: Component yang boleh memakai `useState`, `useEffect`, `window`, atau interaksi browser. Contohnya `Navbar` dan `ContactSection`.
- **Server component**: Component tampilan yang tidak membutuhkan state atau event browser. Contohnya `ServiceCard` dan `ProjectCard`.
- **Reusable component**: Component yang dibuat sekali dan dipakai berkali-kali agar kode tidak berulang.

## 5. Library yang Dipakai

- `next`: Framework utama untuk routing, layout, image, dan font.
- `react`: Membuat component dan interaksi UI.
- `tailwindcss`: Styling menggunakan class utility.
- `react-icons`: Koleksi ikon.
- `aos`: Animasi ketika elemen muncul saat scroll.
- `ogl`: Animasi partikel WebGL.
- `typewriter-effect`: Efek tulisan berjalan.
- `react-hot-toast`: Notifikasi hasil pengiriman form.

## 6. Cara Menjalankan

Pastikan Node.js sudah terpasang, lalu jalankan:

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser.

Perintah lain:

```bash
npm run build   # membuat build production
npm run start   # menjalankan hasil build production
```

## 7. Cara Membaca dan Mengubah Project

Urutan belajar yang disarankan:

1. Baca `src/app/layout.tsx` untuk memahami kerangka global.
2. Baca `src/app/page.tsx` untuk melihat urutan halaman.
3. Pilih satu section, misalnya `ProjectSection.tsx`.
4. Lanjutkan ke component anaknya, yaitu `ProjectCard.tsx`.
5. Periksa props untuk melihat data yang dikirim.
6. Periksa `globals.css` dan class Tailwind untuk memahami tampilannya.

Untuk mengubah isi, biasanya edit data di file section. Untuk mengubah struktur tampilan card, edit file card. Untuk mengubah style global atau tema, edit `src/app/globals.css`.