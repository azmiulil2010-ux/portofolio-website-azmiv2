# Portofolio Azmi

Portofolio personal berbasis Next.js yang menampilkan profil, layanan, pengalaman, skill, project, dan kontak. Proyek ini dibuat untuk menampilkan karya dan informasi diri secara modern, responsif, dan terstruktur.

## Tentang Project

Project ini dirancang sebagai landing page portfolio personal dengan tampilan yang elegan dan interaktif. Fokus utama aplikasi ini adalah:

- menampilkan biodata dan profil singkat
- menampilkan service dan pengalaman kerja/pendidikan
- menampilkan katalog skill
- menampilkan project yang telah dibuat
- menyediakan halaman detail project
- menyiapkan form kontak untuk komunikasi

Aplikasi dibuat dengan Next.js App Router, React, TypeScript, dan Tailwind CSS.

## Fitur Utama

- Hero section dengan animasi, intro, dan dekorasi visual
- Navigasi yang responsif untuk desktop dan mobile
- Theme dark/light mode
- Section About, Skills, Projects, dan Contact
- Halaman project list dan detail project
- Pencarian project berdasarkan kata kunci
- Scroll to top button
- Footer dan layout global yang konsisten
- Notifikasi toast untuk feedback interaksi
- Custom not found page

## Teknologi yang Digunakan

- Next.js 16.3
- React 19
- TypeScript
- Tailwind CSS 4
- React Icons
- AOS
- OGL
- React Hot Toast
- Web3Forms
- Supabase client

## Integrasi Supabase

Project ini sudah terhubung dengan Supabase untuk mengambil data project secara dinamis. Koneksi Supabase dibuat melalui [src/lib/supabase.ts](src/lib/supabase.ts) menggunakan environment variable, sehingga URL dan key tidak ditulis langsung di dalam source code.

### Fitur Supabase yang Digunakan

- mengambil seluruh data project dari tabel `projects`
- mengambil detail satu project berdasarkan `id`
- menampilkan data project dari database pada halaman project list dan project detail
- menangani kondisi ketika konfigurasi environment variable belum tersedia
- menangani error saat proses pengambilan data dari Supabase

### Konfigurasi Environment Variable

Buat file `.env.local` di root project dan isi dengan kredensial project Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Project juga mendukung `NEXT_PUBLIC_SUPABASE_ANON_KEY` sebagai fallback untuk key Supabase. Pastikan tabel `projects` sudah tersedia dan memiliki data yang sesuai dengan struktur project pada aplikasi.

## Struktur Project

```bash
portofolio-azmi/
├─ layouts/
│  └─ AnimationLayout.tsx
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ global-not-found.tsx
│  │  ├─ page.tsx
│  │  └─ projects/
│  │     ├─ page.tsx
│  │     └─ [id]/
│  │        └─ page.tsx
│  ├─ components/
│  │  ├─ contact/
│  │  │  └─ ContactSection.tsx
│  │  ├─ general/
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ LinkButton.tsx
│  │  │  ├─ PageLead.tsx
│  │  │  ├─ ReturnHomeLink.tsx
│  │  │  ├─ ScrollTopButton.tsx
│  │  │  ├─ SiteChrome.tsx
│  │  │  ├─ SpaceDecorations.tsx
│  │  │  └─ navbar/
│  │  │     ├─ Logo.tsx
│  │  │     ├─ MobileNav.tsx
│  │  │     ├─ Navbar.tsx
│  │  │     ├─ navLinks.ts
│  │  │     └─ useActiveSection.ts
│  │  ├─ home/
│  │  │  └─ hero/
│  │  │     ├─ AnimatedIntro.tsx
│  │  │     ├─ HeroSection.tsx
│  │  │     └─ Particels.tsx
│  │  ├─ projects/
│  │  │  ├─ ProjectCard.tsx
│  │  │  ├─ ProjectSearch.tsx
│  │  │  ├─ ProjectSection.tsx
│  │  │  └─ projectData.ts
│  │  ├─ resume/
│  │  │  └─ ResumeSection.tsx
│  │  ├─ services/
│  │  │  └─ ServiceSection.tsx
│  │  └─ skills/
│  │     └─ SkillSection.tsx
│  └─ lib/
│     └─ supabase.ts
├─ AGENTS.md
├─ CLAUDE.md
├─ MODUL-PEMAHAMAN-PORTOFOLIO.md
├─ next-env.d.ts
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ README.md
├─ tsconfig.json
└─ ...
```

## Alur Aplikasi

### 1. Akses pertama kali
Saat aplikasi dibuka, request dari browser masuk ke root layout di [src/app/layout.tsx](src/app/layout.tsx). Di sini:

- metadata website dibentuk
- font global di-load
- stylesheet global di-import
- cookie `skipSplash` dicek
- app dibungkus dengan `SiteChrome`

### 2. Layout global
File [src/components/general/SiteChrome.tsx](src/components/general/SiteChrome.tsx) berperan penting dalam menentukan apakah user sedang membuka halaman portfolio valid atau tidak.

Jika path valid, maka aplikasi menampilkan:

- navbar
- animasi intro
- footer
- tombol scroll to top
- notifikasi toast

Jika path tidak valid, aplikasi akan menampilkan halaman tanpa chrome portfolio tambahan.

### 3. Halaman utama
File [src/app/page.tsx](src/app/page.tsx) adalah halaman landing page utama. Di sini beberapa section dipasang menjadi satu:

- Hero
- About / Services
- Resume
- Skills
- Projects
- Contact

### 4. Halaman project
Route project dikelola di:

- [src/app/projects/page.tsx](src/app/projects/page.tsx) untuk list semua project
- [src/app/projects/[id]/page.tsx](src/app/projects/[id]/page.tsx) untuk halaman detail per project

Data project berasal dari [src/components/projects/projectData.ts](src/components/projects/projectData.ts). Jadi halaman list dan detail project mengambil data dari file ini.

### 5. Search dan filter project
Project search diatur oleh:

- [src/components/projects/ProjectSearch.tsx](src/components/projects/ProjectSearch.tsx)
- [src/components/projects/ProjectSection.tsx](src/components/projects/ProjectSection.tsx)

Search term biasanya dibawa lewat query string `?search=...`, sehingga hasil pencarian bisa dibagikan atau dibuka kembali.

### 6. Navbar aktif
Navbar dan active section diproses oleh:

- [src/components/general/navbar/navLinks.ts](src/components/general/navbar/navLinks.ts)
- [src/components/general/navbar/useActiveSection.ts](src/components/general/navbar/useActiveSection.ts)

File ini membantu menandai menu yang sedang aktif saat user scroll ke section tertentu.

## Komponen Navbar dan File Terkait

Berikut penjelasan singkat untuk file-file yang membentuk navigasi di bagian atas aplikasi.

### [src/components/general/navbar/Navbar.tsx](src/components/general/navbar/Navbar.tsx)
File utama navbar. Komponen ini menampilkan navigasi desktop dan tombol aksi di sisi kanan, seperti:

- logo brand
- daftar menu navigasi
- tombol toggle dark/light mode
- tombol download CV
- tombol buka menu mobile

Komponen ini juga memanggil `useActiveSection()` untuk memberi highlight pada menu yang sedang aktif. Selain itu, Navbar juga membaca theme dari `localStorage` dan mengubah atribut `data-theme` pada document.

### [src/components/general/navbar/MobileNav.tsx](src/components/general/navbar/MobileNav.tsx)
File ini menangani menu navigasi versi mobile. Fungsinya:

- menampilkan sidebar dari sisi kanan
- membuka dan menutup menu saat tombol hamburger ditekan
- menutup body scroll saat menu terbuka
- menampilkan daftar menu yang sama seperti navbar desktop
- menyediakan tombol close dan tombol download CV

Pada mobile, menu ini tampil sebagai overlay yang bergerak dari kanan ke kiri.

### [src/components/general/navbar/Logo.tsx](src/components/general/navbar/Logo.tsx)
Komponen logo brand di navbar. Berisi:

- ikon brand dengan simbol code
- teks "Portfolio Azmi"
- link kembali ke halaman utama ketika diklik

Fungsi utamanya adalah branding, agar navigasi di bagian atas tetap konsisten dan mudah dikenali.

### [src/components/general/navbar/navLinks.ts](src/components/general/navbar/navLinks.ts)
File konfigurasi isi menu navbar. Di sini disimpan data seperti:

- nama menu
- label yang tampil
- url tujuan
- section target untuk active link

Contohnya:

- Home -> /
- About -> /#about
- Skills -> /#skills
- Projects -> /#projects
- Contact -> /#contact

File ini memisahkan data menu dari komponen UI agar lebih rapi dan mudah diubah.

### [src/components/general/navbar/useActiveSection.ts](src/components/general/navbar/useActiveSection.ts)
File logic untuk menentukan section yang sedang aktif berdasarkan scroll atau hash URL. Fungsinya:

- memantau section seperti home, about, skills, projects, dan contact
- memakai `IntersectionObserver` untuk melihat section yang paling terlihat
- menghitung active section agar menu navbar sesuai dengan posisi user
- juga menangani perubahan hash URL seperti `/#projects`

Singkatnya, file ini adalah “otak” yang membuat navbar tahu section mana yang sedang aktif.

## Cara Menjalankan Project

Pastikan Node.js dan npm sudah terinstall di komputer Anda.

### Install dependency

```bash
npm install
```

### Jalankan development server

```bash
npm run dev
```

Lalu buka browser ke:

```bash
http://localhost:3000
```

### Build untuk production

```bash
npm run build
```

### Jalankan hasil build

```bash
npm run start
```

## Catatan Penting

- Project ini menggunakan App Router dari Next.js.
- Styling umum dikelola di [src/app/globals.css](src/app/globals.css).
- Theme dan interaksi visual didesain supaya tampil modern dan responsif.
- Route portfolio tertentu didesain agar tidak menampilkan navbar/footer pada halaman non-portfolio.

## Kesimpulan

Project ini merupakan portfolio personal yang dibangun dengan struktur modul yang cukup rapi untuk dipelajari. Setiap komponen dipisah berdasarkan fungsinya, sehingga lebih mudah dikembangkan, diubah, atau ditambahkan fitur baru di masa depan.

Jika Anda ingin, saya juga bisa bantu membuat:

1. versi README yang lebih formal untuk GitHub
2. versi README yang lebih singkat dan profesional
3. diagram alur project dalam bentuk teks atau mermaid
4. versi README untuk portfolio yang siap dijadikan portfolio pribadi di LinkedIn/GitHub
