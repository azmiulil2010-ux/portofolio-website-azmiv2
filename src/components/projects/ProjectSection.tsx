import ProjectCard from "./ProjectCard";
import { projects } from "./projectData";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

interface ProjectSectionProps {
  searchTerm?: string;
  heading?: string;
  showAllLink?: boolean;
}

export default function ProjectSection({
  searchTerm = "",
  heading = "Recent Projects",
  showAllLink = false,
}: ProjectSectionProps) {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredProjects = projects.filter((project) =>
    `${project.title} ${project.description}`.toLowerCase().includes(normalizedSearchTerm),
  );

  return (
    <section>
      <div className="mx-auto w-[90%] max-w-5xl pb-8 pt-14 md:pt-16">
        <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-200 to-gray-300 sm:text-3xl">
          {searchTerm ? `Search results for "${searchTerm}"` : heading}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} found
        </p>
      </div>
      <div className="mx-auto grid w-[90%] max-w-5xl grid-cols-1 gap-10 overflow-hidden pb-8 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            className={filteredProjects.length === 1 ? "md:col-span-2 md:w-1/2 md:justify-self-center" : ""}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      {showAllLink && (
        <div className="mx-auto flex w-[90%] max-w-5xl justify-end pb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
          >
            View all projects
            <LuArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      )}
      {filteredProjects.length === 0 && (
        <p className="mx-auto w-[90%] max-w-2xl pb-8 text-center text-gray-400">
          No projects found for <span className="font-semibold text-gray-200">{searchTerm}</span>.
        </p>
      )}
    </section>
  );
}
