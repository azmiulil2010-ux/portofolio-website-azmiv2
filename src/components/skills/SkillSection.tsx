import { DiJavascript, DiReact } from "react-icons/di";
import Header from "../general/Header";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { FaHtml5, FaNodeJs, FaPython } from "react-icons/fa";
import { SiSupabase } from "react-icons/si";
import { FiFigma } from "react-icons/fi";

const skills = [
  {
    name: "HTML",
    icon: <FaHtml5 />,
  },
  {
    name: "JavaScript",
    icon: <DiJavascript />,
  },
  {
    name: "Python",
    icon: <FaPython />,
  },
  {
    name: "React Js",
    icon: <DiReact />,
  },
  {
    name: "Next Js",
    icon: <RiNextjsFill />,
  },
  {
    name: "Node Js",
    icon: <FaNodeJs />,
  },
  {
    name: "TailwindCSS",
    icon: <RiTailwindCssFill />,
  },
  {
    name: "Supabase",
    icon: <SiSupabase />,
  },
  {
    name: "Figma",
    icon: <FiFigma />,
  }
];

export default function SkillSection() {
  return (
    <section id="skills" className="py-16">
      <Header title="My Skills" />
      <div className="skill-grid mx-auto grid w-[calc(100%-2rem)] max-w-4xl grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {skills.map((skill, index) => {
          return (
            <div
              key={index}
              data-aos="flip-right"
              data-aos0delay={index * 100 }
              className="skill-card flex h-44 w-full max-w-40 flex-col items-center justify-center rounded-3xl bg-slate-900 text-center shadow-lg transition hover:scale-110 sm:h-48"
            >
              <div className="skill-icon text-5xl text-gray-300">{skill.icon}</div>
              <p className="text-indigo-500 font-semibold">{skill.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
