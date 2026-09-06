import { DiJavascript, DiReact } from "react-icons/di";
import Header from "../general/Header";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";

const skills = [
  {
    name: "JavaScript",
    icon: <DiJavascript />,
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
];

export default function SkillSection() {
  return (
    <section id="skills" className="py-16">
      <Header title="My Skills" />
      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill, index) => {
          return (
            <div
              key={index}
              data-aos="flip-right"
              data-aos0delay={index * 100 }
              className="bg-slate-900 text-center w-40 h-48
                        rounded-3xl flex flex-col items-center justify-center shadow-lg
                        transition hover:scale-110"
            >
              <div className="text-5xl text-gray-300">{skill.icon}</div>
              <p className="text-indigo-500 font-semibold">{skill.name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
