import { DiJavascript, DiReact } from "react-icons/di";
import Header from "../general/Header";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { FaHtml5, FaNodeJs, FaPython } from "react-icons/fa";
import { SiSupabase } from "react-icons/si";
import { FiFigma } from "react-icons/fi";
import { VscVscode } from "react-icons/vsc";

const skillGroups = [
  {
    number: "01",
    name: "Frontend",
    description: "Teknologi yang saya gunakan untuk membangun tampilan website yang responsif dan interaktif.",
    skills: [
      { name: "HTML5", icon: <FaHtml5 /> },
      { name: "JavaScript", icon: <DiJavascript /> },
      { name: "React", icon: <DiReact /> },
      { name: "Next.js", icon: <RiNextjsFill /> },
      { name: "Tailwind", icon: <RiTailwindCssFill /> },
    ],
  },
  {
    number: "02",
    name: "Backend & Database",
    description: "Teknologi untuk mengolah data, membuat fungsi server, dan menghubungkan aplikasi.",
    skills: [
      { name: "Python", icon: <FaPython /> },
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Supabase", icon: <SiSupabase /> },
    ],
  },
  {
    number: "03",
    name: "Tools & Design",
    description: "Tools yang membantu proses desain, perencanaan, dan pengembangan project.",
    skills: [
      { name: "Figma", icon: <FiFigma /> },
      { name: "VS Code", icon: <VscVscode /> },
    ],
  },
];

export default function SkillSection() {
  return (
    <section className="skill-section py-10 sm:py-16">
      <div className="mx-auto w-[90%] max-w-6xl">
        <Header title="Skills & Tech Stack" />
        <p className="skill-intro mx-auto -mt-8 mb-12 max-w-2xl text-center text-sm leading-relaxed sm:text-base">
          Teknologi yang benar-benar saya gunakan untuk belajar dan mengerjakan project nyata.
        </p>
        <div className="skill-groups space-y-10">
          {skillGroups.map((group, groupIndex) => (
            <div key={group.name} className="skill-group grid items-center gap-6 lg:grid-cols-[minmax(190px,0.6fr)_minmax(0,1.8fr)] lg:gap-10" data-aos="fade-up" data-aos-delay={groupIndex * 120}>
              <div className="skill-group-copy">
                <p className="skill-group-number">{group.number}</p>
                <h3 className="skill-group-title">{group.name}</h3>
                <p className="skill-group-description">{group.description}</p>
              </div>
              <div className="skill-grid grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="skill-card flex min-h-32 flex-col items-center justify-center rounded-xl text-center shadow-lg transition hover:-translate-y-1 sm:min-h-36">
                    <div className="skill-icon text-5xl">{skill.icon}</div>
                    <p className="mt-3 text-sm font-semibold">{skill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
