import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import type { Project } from "./projectData";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card group rounded-2xl border border-cyan-300/15 bg-linear-to-br from-slate-900/95 via-slate-900/85 to-cyan-950/70 p-4 shadow-lg shadow-slate-950/20 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:shadow-cyan-950/30 sm:p-5">
      <Link href={`/projects/${project.id}`} className="block">
        <Image
          src={project.imagePath}
          alt={`Pratinjau project ${project.title}`}
          width={800}
          height={600}
          sizes="(max-width: 767px) 90vw, (max-width: 1023px) 45vw, 40vw"
          className="rounded-lg transition-transform duration-500 group-hover:scale-[1.01]"
        />
        <p className="my-4 text-xl font-semibold text-gray-200 sm:text-2xl">
          {project.title}
        </p>
        <p className="mb-4 line-clamp-3 text-sm leading-6 text-gray-400">
          {project.description}
        </p>
        {project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Tools used">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-slate-700/60 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </Link>
      <a
        href={project.websiteUrl}
        target="_blank"
        rel="noreferrer"
        className="project-live-link mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-cyan-300"
      >
        Visit live project
        <LuArrowUpRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}
