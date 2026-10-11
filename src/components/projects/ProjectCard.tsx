"use client";

import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuExternalLink } from "react-icons/lu";
import type { Project } from "./projectData";
import TiltCard from "@/components/ui/TiltCard";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useLanguage();
  return (
    <TiltCard maxTilt={6} scale={1.015} className="h-full">
      <article className="project-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-cyan-950/40 p-4 sm:p-5 shadow-xl shadow-slate-950/50 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]">
        {/* Subtle border beam highlight on hover */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          aria-hidden="true"
        />

        <Link href={`/projects/${project.id}`} className="block flex-1">
          {/* Thumbnail Container with Zoom */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950">
            <Image
              src={project.imagePath}
              alt={`Pratinjau project ${project.title}`}
              width={800}
              height={600}
              sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 40vw"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-30" />
            <div className="absolute top-3 right-3 rounded-full bg-slate-900/80 p-2 text-cyan-300 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
              <LuExternalLink size={16} />
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="my-3.5 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-300 sm:text-2xl">
            {project.title}
          </h3>

          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-300">
            {project.description}
          </p>

          {/* Tech stack badges */}
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5" aria-label="Tools used">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-cyan-400/20 bg-slate-800/70 px-2.5 py-1 text-xs font-semibold text-cyan-300 transition-colors duration-200 group-hover:border-cyan-400/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </Link>

        {/* Action Link */}
        {project.websiteUrl && (
          <div className="mt-2 border-t border-slate-800/80 pt-3">
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="project-live-link inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 transition-all duration-300 hover:text-cyan-200"
            >
              <span>{t("visitLiveProject")}</span>
              <LuArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </a>
          </div>
        )}
      </article>
    </TiltCard>
  );
}
