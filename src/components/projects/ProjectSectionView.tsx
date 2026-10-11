"use client";

import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import ProjectCard from "./ProjectCard";
import type { Project, ProjectCategory } from "@/types/project.types";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectSectionViewProps {
  projects: Project[];
  searchTerm?: string;
  category?: ProjectCategory | "";
  heading?: string;
  showAllLink?: boolean;
}

export default function ProjectSectionView({
  projects,
  searchTerm = "",
  category = "",
  heading = "Recent Projects",
  showAllLink = false,
}: ProjectSectionViewProps) {
  const { t, language } = useLanguage();

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = `${project.title} ${project.description}`
      .toLowerCase()
      .includes(normalizedSearchTerm);
    return matchesSearch && (!category || project.category === category);
  });
  const displayedProjects = showAllLink ? filteredProjects.slice(0, 4) : filteredProjects;

  // Localized section heading
  const getHeadingText = () => {
    if (searchTerm) {
      if (language === "ja") {
        return `"${searchTerm}" ${t("searchResultsFor")}`;
      }
      return `${t("searchResultsFor")} "${searchTerm}"`;
    }
    if (heading.toLowerCase().includes("all")) {
      return t("allProjectsHeading");
    }
    return t("projectsTitle");
  };

  return (
    <section>
      <div className="mx-auto w-[90%] max-w-5xl pb-8 pt-14 md:pt-16">
        <h2 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-indigo-200 to-gray-300 sm:text-3xl">
          {getHeadingText()}
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {showAllLink && filteredProjects.length > displayedProjects.length
            ? `${t("showingProjects")} ${displayedProjects.length} ${t("ofProjects")} ${filteredProjects.length} ${t("projectsFound")}`
            : `${filteredProjects.length} ${t("projectsFound")}`}
        </p>
      </div>

      <div className="mx-auto grid w-[90%] max-w-7xl grid-cols-1 gap-8 overflow-hidden pb-8 md:grid-cols-2 lg:gap-10">
        {displayedProjects.map((project, index) => (
          <div
            key={project.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className={displayedProjects.length === 1 ? "md:col-span-2 md:w-2/3 md:justify-self-center" : ""}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {showAllLink && (
        <div className="mx-auto flex w-[90%] max-w-7xl justify-end pb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
          >
            {t("viewAllProjects")}
            <LuArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      )}

      {filteredProjects.length === 0 && (
        <p className="mx-auto w-[90%] max-w-2xl pb-8 text-center text-gray-400">
          {t("noProjectsFound")}{" "}
          <span className="font-semibold text-gray-200">{searchTerm}</span>.
        </p>
      )}
    </section>
  );
}
