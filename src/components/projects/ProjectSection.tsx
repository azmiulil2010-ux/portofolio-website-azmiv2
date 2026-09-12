import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "MyApp Belajar Next.js",
    imagePath: "/project1.png",
    websiteUrl: "https://belajar-nextjs-indol.vercel.app/",
    description: "MyApp adalah website yang saya kembangkan menggunakan Next.js, React, TypeScript, dan Tailwind CSS. Website ini terintegrasi dengan Supabase sebagai backend dan database untuk mengelola data secara dinamis. Dalam proyek ini, saya mempelajari cara membangun antarmuka yang responsif, menghubungkan frontend dengan database, serta mengembangkan fitur website menggunakan teknologi modern.",
  },
  {
    title: "SIMMAS (Sistem Manajmenen Magang Siswa)",
    imagePath: "/project2.png",
    websiteUrl: "http://manajemen-magang-smkn.vercel.app/",
    description: "SIMMAS (Sistem Manajemen Magang Siswa) adalah website yang dibuat untuk membantu sekolah dalam mengelola kegiatan magang siswa secara lebih terstruktur. Sistem ini mencakup pengelolaan data siswa, tempat magang, pembimbing, serta informasi dan perkembangan kegiatan magang. SIMMAS dikembangkan menggunakan teknologi web modern dengan fokus pada kemudahan penggunaan dan pengelolaan data.",
  },
  {
    title: "FIGMA Design (Smart Study)",
    imagePath: "/project3.png",
    websiteUrl: "https://www.figma.com/design/DsBjQ3ua0onks0EqAtJU8s/Smart-Study?node-id=0-1&t=YjU9t78hAB05TfIN-1",
    description: "Smart Study adalah desain UI/UX aplikasi pembelajaran yang dibuat menggunakan Figma. Desain ini berfokus pada tampilan yang sederhana, modern, dan mudah digunakan untuk membantu pengguna dalam mengakses materi, mengatur pembelajaran, serta memantau perkembangan belajar. Dalam proyek ini, saya mempelajari proses perancangan layout, pemilihan warna, typography, pembuatan komponen, dan user interface.",
  },
] as const;

interface ProjectSectionProps {
  searchTerm?: string;
}

export default function ProjectSection({ searchTerm = "" }: ProjectSectionProps) {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredProjects = projects.filter((project) =>
    `${project.title} ${project.description}`.toLowerCase().includes(normalizedSearchTerm),
  );

  return (
    <section>
      <div className="mx-auto w-[90%] max-w-5xl pb-8 pt-14 md:pt-16">
        <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-200 to-gray-300 sm:text-3xl">
          {searchTerm ? `Search results for "${searchTerm}"` : "Recent Projects"}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} found
        </p>
      </div>
      <div className="mx-auto grid w-[90%] max-w-5xl grid-cols-1 gap-10 overflow-hidden pb-20 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <div
            key={project.title}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            className={filteredProjects.length === 1 ? "md:col-span-2 md:w-1/2 md:justify-self-center" : ""}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
      {filteredProjects.length === 0 && (
        <p className="mx-auto w-[90%] max-w-2xl pb-20 text-center text-gray-400">
          No projects found for <span className="font-semibold text-gray-200">{searchTerm}</span>.
        </p>
      )}
    </section>
  );
}
