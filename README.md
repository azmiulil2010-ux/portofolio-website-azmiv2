# Azmi Portfolio

Website portfolio personal Azmi yang dibangun dengan Next.js App Router, React,
TypeScript, dan Tailwind CSS.

## Menjalankan Project

Pastikan Node.js dan npm sudah terpasang, kemudian jalankan:

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

Perintah lain yang tersedia:

```bash
npm run build  # membuat build production
npm run start  # menjalankan build production
```

## Tailwind Styling

Styling menggunakan Tailwind CSS v4 melalui `@tailwindcss/postcss`. Import
utama Tailwind berada di `src/app/globals.css`:

```css
@import "tailwindcss";
```

Class utility Tailwind digunakan langsung pada elemen JSX untuk mengatur layout,
spacing, warna, typography, responsive breakpoint, hover state, dan animasi.
Style global di `globals.css` melengkapi utility tersebut untuk:

- tema dark dan light melalui atribut `data-theme`;
- transisi tema dan styling halaman;
- animasi kartu skill dan pengaturan reduced motion;
- styling khusus komponen yang digunakan berulang.

Konfigurasi PostCSS terdapat di `postcss.config.mjs`.

## Struktur Komponen

Seluruh komponen UI berada di `src/components` dan dikelompokkan berdasarkan
bagian halaman.

### `contact/`

- `ContactSection.tsx` - bagian kontak dan form/interaksi kontak.

### `general/`

- `Footer.tsx` - footer portfolio.
- `Header.tsx` - komponen header umum.
- `LinkButton.tsx` - tombol berbasis link dengan dukungan icon, animasi, dan download.
- `ScrollTopButton.tsx` - tombol untuk kembali ke bagian atas halaman.
- `navbar/Navbar.tsx` - navbar desktop, tema dark/light, dan tombol download CV.
- `navbar/Logo.tsx` - logo pada navbar.
- `navbar/MobileNav.tsx` - sidebar navigasi mobile dengan animasi buka/tutup.
- `navbar/navLinks.ts` - daftar route yang dipakai navbar desktop dan mobile.

### `home/hero/`

- `HeroSection.tsx` - bagian pembuka portfolio.
- `AnimatedIntro.tsx` - animasi intro saat halaman dimuat.
- `Particels.tsx` - efek partikel pada area hero.

### `projects/`

- `ProjectSection.tsx` - daftar project portfolio.
- `ProjectCard.tsx` - kartu individual untuk setiap project.

### `resume/`

- `ResumeSection.tsx` - bagian riwayat pendidikan dan pengalaman.
- `ResumeCard.tsx` - kartu individual resume.

### `services/`

- `ServiceSection.tsx` - daftar layanan yang ditawarkan.
- `ServiceCard.tsx` - kartu individual layanan.

### `skills/`

- `SkillSection.tsx` - daftar skill dan teknologi.

## Struktur Halaman

- `src/app/page.tsx` menampilkan halaman Home.
- `src/app/about/page.tsx` menampilkan layanan dan resume sebagai halaman About.
- `src/app/skills/page.tsx` menampilkan halaman Skills.
- `src/app/projects/page.tsx` menampilkan halaman Projects.
- `src/app/contact/page.tsx` menampilkan halaman Contact.
- `src/app/layout.tsx` menyediakan layout HTML dan font global.
- Navbar, footer, animasi intro, tombol kembali ke atas, dan toaster dipakai bersama melalui root layout.
- `src/app/not-found.tsx` menampilkan halaman khusus ketika URL tidak ditemukan.
- `public/cv.png` merupakan file CV yang dapat diunduh melalui tombol Download CV.

## Teknologi

- Next.js 16 dan React 19
- TypeScript
- Tailwind CSS 4
- React Icons
- AOS dan OGL untuk kebutuhan animasi/visual
- React Hot Toast untuk notifikasi
