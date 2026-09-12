import { LuAward, LuBookOpen, LuGraduationCap, LuPackage, LuServer } from "react-icons/lu";
import Header from "../general/Header";
import ResumeCard from "./ResumeCard";
import { RiNextjsFill } from "react-icons/ri";

export default function ResumeSection() {
  return (
    <section className="my-12">
      <div className="w-[90%] sm:w-[70%] mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10">
        {/* education section */}
        <div data-aos="zoom-out">
          <Header title="About Me" as="h2" />
          <div className="space-y-6">
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
          </div>
        </div>

        {/* work experience */}
        <div data-aos="zoom-in" data-aos-delay={200}>
        <Header title="My Work Experience" as="h2" />
          <div className="space-y-6">
            <ResumeCard 
            icon={RiNextjsFill}
            role="FrontEnd Developer"
            description="Membangun antarmuka yang responsif dan aksesibel menggunakan framework modern seperti React & Next.js, dengan fokus pada performa, UX, dan implementasi yang presisi hingga ke detail terkecil (pixel-perfect)."
            />
            <ResumeCard 
            icon={LuServer}
            role="Backend Developer"
            description="Backend Developer yang berfokus pada pengembangan sistem di balik sebuah aplikasi, seperti pembuatan API, pengelolaan database, autentikasi, serta pengolahan dan keamanan data. Saya terus mengembangkan kemampuan menggunakan JavaScript, Next.js, Python, dan Supabase untuk membangun backend yang terstruktur, aman, dan dapat diandalkan."
            />
            <ResumeCard 
            icon={LuPackage}
            role="Fullstack Developer"
            description="Fullstack Developer yang mempelajari dan mengembangkan aplikasi dari sisi frontend hingga backend. Saya memiliki ketertarikan dalam membangun website yang interaktif, mengelola database, membuat API, serta menghubungkan frontend dan backend menggunakan teknologi seperti JavaScript, React, Next.js, Python, dan Supabase."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
