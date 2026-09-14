# Azmi Portfolio

Website portfolio personal yang menampilkan profil, layanan, pengalaman,
keahlian, project, dan kontak Azmi. Aplikasi dibuat dengan Next.js App Router,
React, TypeScript, dan Tailwind CSS v4.

## Fitur Yang Ditambahkan

### Pengalaman halaman

- Hero section dengan intro animasi, typewriter, status availability, dan
	dekorasi partikel/ruang.
- Splash screen saat pertama kali membuka website, dengan cookie untuk
	melewati intro pada kunjungan berikutnya.
- Navigasi desktop dan mobile dengan sidebar, active section, smooth scroll,
	logo, tombol tema, dan tombol download CV.
- Tombol scroll to top serta footer yang digunakan pada route portfolio yang
	valid.
- Layout responsif untuk desktop, tablet, dan mobile.

### Tema dan tampilan

- Dark mode sebagai tema utama dan light mode yang dapat diubah dari navbar.
- Override warna, border, shadow, form, kartu, navbar, hero, dan sidebar pada
	light mode melalui atribut `data-theme="light"`.
- Transisi tema, hover state, kartu interaktif, gradient text, backdrop blur,
	dan efek animasi saat komponen muncul.
- Dukungan `prefers-reduced-motion` untuk mengurangi animasi bagi pengguna yang
	membutuhkannya.

### Project portfolio

- Daftar project dengan kartu berisi gambar, deskripsi, teknologi, dan link
	project live.
- Pencarian project menggunakan query URL `?search=` sehingga hasil dapat
	dibagikan atau dibuka kembali.
- Tombol untuk menghapus kata pencarian.
- Halaman detail dinamis di `/projects/[id]` dengan gambar, deskripsi, tombol
	project live, dan link kembali ke daftar project.
- Static generation untuk route detail project dari data project yang tersedia.

### Kontak dan navigasi route

- Halaman About, Skills, Projects, dan Contact dengan `PageLead` dan dekorasi
	visual yang konsisten.
- Form kontak yang mengirim data melalui Web3Forms.
- Loading state pada tombol kirim dan notifikasi berhasil/gagal menggunakan
	React Hot Toast.
- Link email, lokasi Pasuruan, Instagram, TikTok, dan YouTube.
- Custom not-found page dan global not-found page untuk URL yang tidak valid.
- Navbar, splash screen, footer, toaster, dan scroll-to-top hanya ditampilkan
	pada route portfolio yang valid.

## Tailwind CSS Yang Digunakan

Tailwind CSS v4 diaktifkan melalui `@tailwindcss/postcss`. Import utamanya
berada di `src/app/globals.css`:

```css
@import "tailwindcss";
```

Sebagian besar styling ditulis langsung pada `className` JSX. Utility Tailwind
yang dipakai dan ditambahkan untuk fitur terbaru meliputi:

- **Layout responsif:** `flex`, `grid`, `grid-cols-*`, `lg:grid-cols-*`,
	`items-center`, `justify-center`, `max-w-*`, `w-[90%]`, `gap-*`, dan
	`space-y-*`.
- **Spacing dan ukuran:** `p-*`, `px-*`, `py-*`, `m-*`, `mt-*`, `mb-*`,
	`w-full`, `min-w-0`, `h-*`, serta `min-h-screen`.
- **Tema warna:** `bg-slate-*`, `bg-white/*`, `text-white`, `text-gray-*`,
	`text-cyan-400`, `text-indigo-*`, dan `border-slate-*`.
- **Responsive typography:** `text-sm`, `text-base`, `text-lg`, `text-3xl`,
	`md:text-4xl`, `font-medium`, `font-semibold`, `font-bold`, dan
	`leading-relaxed`.
- **Visual modern:** `rounded-*`, `shadow-*`, `backdrop-blur-sm`,
	`bg-linear-to-r`, `bg-clip-text`, `text-transparent`, dan opacity utilities.
- **Interaksi:** `hover:*`, `focus:*`, `transition-*`, `hover:-translate-y-1`,
	`hover:scale-105`, `outline-none`, serta `disabled:*`.
- **Animasi:** `animate-spin`, class animasi intro, dan class `data-aos` untuk
	mengatur kemunculan section dan kartu.
- **Aksesibilitas dan kontrol tampilan:** `sr-only`, `aria-hidden`,
	`cursor-pointer`, `select-none`, `isolate`, `relative`, `absolute`, dan
	`z-*` untuk mengatur layer dekorasi.

### Styling tambahan di `globals.css`

Utility Tailwind dilengkapi selector CSS khusus agar perubahan tema tetap
konsisten pada komponen yang kompleks. Styling terbaru mencakup:

- `data-theme="light"` untuk mengganti `color-scheme`, background, teks,
	border, shadow, input, kartu, hero, navbar, dan mobile sidebar.
- `.theme-transition` untuk perpindahan warna yang halus.
- `.project-search` dan `.project-detail-surface` untuk surface halaman project.
- `.contact-form` dan `.contact-input` untuk tampilan form kontak dan focus ring.
- `.skill-card`, `.service-card`, dan `.resume-card` untuk border, hover, dan
	shadow yang sesuai pada kedua tema.
- `scroll-behavior: smooth` dan `scroll-padding-top` agar navigasi anchor tidak
	tertutup navbar.
- Media query reduced motion agar animasi dapat dikurangi ketika diperlukan.

Konfigurasi PostCSS berada di `postcss.config.mjs`.

## Menjalankan Project

Pastikan Node.js dan npm sudah terpasang, lalu jalankan:

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

Perintah production:

```bash
npm run build
npm run start
```

## Teknologi

- Next.js 16.3 dan React 19
- TypeScript
- Tailwind CSS 4 dan `@tailwindcss/postcss`
- React Icons
- AOS dan OGL untuk animasi/visual
- React Hot Toast untuk notifikasi
- Web3Forms untuk pengiriman form kontak
