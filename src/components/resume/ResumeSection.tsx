import { LuAward, LuBookOpen, LuGraduationCap, LuLayers3, LuMail, LuMapPin } from "react-icons/lu";
import Header from "../general/Header";
import ResumeCard from "./ResumeCard";

export default function ResumeSection() {
  return (
    <section className="about-section my-12">
      <div className="mx-auto w-[90%] max-w-7xl">
        <Header title="About Me" as="h2" />
        <div className="about-layout grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(320px,1fr)_minmax(0,1.25fr)] lg:gap-16">
          <div className="about-portrait-wrap mx-auto w-full max-w-lg">
            <div className="about-portrait relative mx-auto aspect-square w-[min(100%,30rem)]">
              <div className="about-portrait-circle absolute inset-0 rounded-full" />
              <div className="about-portrait-image-frame absolute inset-[5%] overflow-hidden rounded-full border-8">
                <img src="/profil2.png" alt="Foto Muhammad Ulil Azmi" className="about-portrait-image h-full w-full object-cover object-[58%_27%]" />
              </div>
              <span className="about-portrait-status absolute bottom-[3%] left-[2%] whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold shadow-lg">● Open to work &amp; freelance</span>
            </div>
          </div>

          <div className="space-y-5">
            <ResumeCard
              icon={LuGraduationCap}
              role="Student Smkn 1 Pasuruan"
              description="Saya Muhammad Ulil Azmi merupakan siswa SMK Negeri 1 Pasuruan dari jurusan Rekayasa Perangkat Lunak (RPL). Saya memiliki ketertarikan dan fokus pada bidang teknologi, khususnya pengembangan website dan aplikasi. Saya terus mengembangkan kemampuan dalam pemrograman, desain antarmuka, serta pembuatan aplikasi menggunakan teknologi modern seperti React, Next.js, dan database."
              date="July 2025 - April 2028"
            />
            <ResumeCard
              icon={LuBookOpen}
              role="Lesson Learned"
              description="Saya mempelajari berbagai bidang dalam pengembangan perangkat lunak, mulai dari pembuatan dan pengelolaan database menggunakan XAMPP dan Supabase, hingga pengembangan website menggunakan JavaScript, React, Next.js, dan Tailwind CSS. Selain itu, saya juga mempelajari desain antarmuka menggunakan Figma serta dasar-dasar pemrograman menggunakan Python. Fokus saya adalah mengembangkan kemampuan dalam membuat website dan aplikasi yang modern, responsif, dan mudah digunakan."
            />
            <ResumeCard
              icon={LuAward}
              role="Future Goals"
              description="Future goals saya adalah terus mengembangkan kemampuan di bidang teknologi dan pemrograman, terutama dalam pengembangan website dan aplikasi. Saya ingin memperdalam skill seperti React, Next.js, JavaScript, Python, database, dan UI/UX. Ke depannya, saya berharap dapat menjadi seorang developer yang profesional, mampu membuat karya yang bermanfaat, serta terus belajar mengikuti perkembangan teknologi."
            />
            <div className="about-facts grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a href="https://maps.google.com/?q=Pasuruan,+Jawa+Timur" target="_blank" rel="noreferrer" className="about-fact">
                <LuMapPin aria-hidden="true" />
                <span><small>Lokasi</small>Pasuruan, Jawa Timur</span>
              </a>
              <div className="about-fact">
                <LuLayers3 aria-hidden="true" />
                <span><small>Fokus</small>Web &amp; UI/UX</span>
              </div>
              <a href="mailto:azmiulil2010@gmail.com" className="about-fact">
                <LuMail aria-hidden="true" />
                <span><small>Email</small>azmiulil2010@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
