export interface Project {
  id: string;
  title: string;
  imagePath: string;
  websiteUrl: string;
  description: string;
}

export const projects: Project[] = [
  {
    id: "myapp-belajar-nextjs",
    title: "MyApp Belajar Next.js",
    imagePath: "/project1.png",
    websiteUrl: "https://belajar-nextjs-indol.vercel.app/",
    description: "MyApp adalah website yang saya kembangkan menggunakan Next.js, React, TypeScript, dan Tailwind CSS. Website ini terintegrasi dengan Supabase sebagai backend dan database untuk mengelola data secara dinamis. Dalam proyek ini, saya mempelajari cara membangun antarmuka yang responsif, menghubungkan frontend dengan database, serta mengembangkan fitur website menggunakan teknologi modern.",
  },
  {
    id: "simmas",
    title: "SIMMAS (Sistem Manajmenen Magang Siswa)",
    imagePath: "/project2.png",
    websiteUrl: "http://manajemen-magang-smkn.vercel.app/",
    description: "SIMMAS (Sistem Manajemen Magang Siswa) adalah website yang dibuat untuk membantu sekolah dalam mengelola kegiatan magang siswa secara lebih terstruktur. Sistem ini mencakup pengelolaan data siswa, tempat magang, pembimbing, serta informasi dan perkembangan kegiatan magang. SIMMAS dikembangkan menggunakan teknologi web modern dengan fokus pada kemudahan penggunaan dan pengelolaan data.",
  },
  {
    id: "smart-study",
    title: "FIGMA Design (Smart Study)",
    imagePath: "/project3.png",
    websiteUrl: "https://www.figma.com/design/DsBjQ3ua0onks0EqAtJU8s/Smart-Study?node-id=0-1&t=YjU9t78hAB05TfIN-1",
    description: "Smart Study adalah desain UI/UX aplikasi pembelajaran yang dibuat menggunakan Figma. Desain ini berfokus pada tampilan yang sederhana, modern, dan mudah digunakan untuk membantu pengguna dalam mengakses materi, mengatur pembelajaran, serta memantau perkembangan belajar. Dalam proyek ini, saya mempelajari proses perancangan layout, pemilihan warna, typography, pembuatan komponen, dan user interface.",
  },
];

export function getProjectById(id: string) {
  return projects.find((project) => project.id === id);
}