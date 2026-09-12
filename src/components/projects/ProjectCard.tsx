import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import type { Project } from "./projectData";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group">
      <Link href={`/projects/${project.id}`} className="block">
        <Image
          src={project.imagePath}
          alt={project.title}
          width={800}
          height={600}
          className="rounded-lg transition-transform duration-500 group-hover:scale-[1.01]"
        />
        <p className="my-4 text-xl font-semibold text-gray-200 sm:text-2xl">
          {project.title}
        </p>
        <p className="font-medium text-gray-400">{project.description}</p>
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
