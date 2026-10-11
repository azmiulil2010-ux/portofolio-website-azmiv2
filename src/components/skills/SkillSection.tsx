"use client";

import { DiJavascript, DiReact } from "react-icons/di";
import Header from "../general/Header";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { FaHtml5, FaNodeJs, FaPython } from "react-icons/fa";
import { SiSupabase, SiTypescript } from "react-icons/si";
import { FiFigma } from "react-icons/fi";
import { VscVscode } from "react-icons/vsc";
import { SiXampp } from "react-icons/si";
import TiltCard from "@/components/ui/TiltCard";
import { useLanguage } from "@/context/LanguageContext";

export default function SkillSection() {
  const { t } = useLanguage();

  const skillGroups = [
    {
      number: "01",
      name: t("skillGroupFrontend"),
      tag: t("skillGroupFrontendTag"),
      description: t("skillGroupFrontendDesc"),
      skills: [
        { name: "Next.js", icon: <RiNextjsFill />, color: "text-white", glow: "hover:shadow-white/20" },
        { name: "React", icon: <DiReact />, color: "text-cyan-400", glow: "hover:shadow-cyan-400/30" },
        { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-400", glow: "hover:shadow-blue-400/30" },
        { name: "JavaScript", icon: <DiJavascript />, color: "text-yellow-400", glow: "hover:shadow-yellow-400/30" },
        { name: "Tailwind CSS", icon: <RiTailwindCssFill />, color: "text-teal-400", glow: "hover:shadow-teal-400/30" },
        { name: "HTML5", icon: <FaHtml5 />, color: "text-orange-500", glow: "hover:shadow-orange-500/30" },
      ],
    },
    {
      number: "02",
      name: t("skillGroupBackend"),
      tag: t("skillGroupBackendTag"),
      description: t("skillGroupBackendDesc"),
      skills: [
        { name: "Python", icon: <FaPython />, color: "text-yellow-400", glow: "hover:shadow-yellow-400/30" },
        { name: "Supabase", icon: <SiSupabase />, color: "text-emerald-400", glow: "hover:shadow-emerald-400/30" },
        { name: "Node.js", icon: <FaNodeJs />, color: "text-green-500", glow: "hover:shadow-green-500/30" },
        { name: "XAMPP (MySQL)", icon: <SiXampp />, color: "text-orange-400", glow: "hover:shadow-orange-400/30" },
      ],
    },
    {
      number: "03",
      name: t("skillGroupTools"),
      tag: t("skillGroupToolsTag"),
      description: t("skillGroupToolsDesc"),
      skills: [
        { name: "Figma", icon: <FiFigma />, color: "text-purple-400", glow: "hover:shadow-purple-400/30" },
        { name: "VS Code", icon: <VscVscode />, color: "text-blue-400", glow: "hover:shadow-blue-400/30" },
      ],
    },
  ];

  return (
    <div className="skill-section relative py-4 sm:py-8">
      <div className="mx-auto w-[90%] max-w-6xl">
        <Header title={t("skillsTitle")} />
        <p className="skill-intro mx-auto -mt-8 mb-14 max-w-2xl text-center text-sm leading-relaxed text-slate-400 sm:text-base">
          {t("skillsIntro")}
        </p>

        <div className="skill-groups space-y-12">
          {skillGroups.map((group, groupIndex) => (
            <div
              key={group.name}
              className="skill-group rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md grid items-center gap-6 lg:grid-cols-[minmax(210px,0.65fr)_minmax(0,1.75fr)] lg:gap-10 sm:p-8"
              data-aos="fade-up"
              data-aos-delay={groupIndex * 120}
            >
              <div className="skill-group-copy space-y-2">
                <div className="flex items-center gap-3">
                  <span className="skill-group-number font-mono text-2xl font-black text-cyan-400 sm:text-3xl">
                    {group.number}
                  </span>
                  <span className="rounded-full border border-cyan-400/20 bg-cyan-950/40 px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-cyan-300">
                    {group.tag}
                  </span>
                </div>
                <h3 className="skill-group-title text-xl font-bold text-white sm:text-2xl">
                  {group.name}
                </h3>
                <p className="skill-group-description text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {group.description}
                </p>
              </div>

              <div className="skill-grid grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {group.skills.map((skill) => (
                  <TiltCard key={skill.name} maxTilt={10} scale={1.04} glare={true}>
                    <div
                      className={`skill-card group relative flex min-h-32 flex-col items-center justify-center rounded-xl border border-slate-800/90 bg-slate-950/70 p-4 text-center shadow-md backdrop-blur-xs transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-900/80 hover:shadow-lg ${skill.glow} sm:min-h-36`}
                    >
                      <div
                        className={`skill-icon text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-115 group-hover:rotate-6 ${skill.color}`}
                      >
                        {skill.icon}
                      </div>
                      <p className="mt-3 text-xs font-semibold text-slate-200 transition-colors group-hover:text-white sm:text-sm">
                        {skill.name}
                      </p>
                    </div>
                  </TiltCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
