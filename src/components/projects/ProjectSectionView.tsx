"use client";

import Link from "next/link";
import {
  LuArrowRight,
  LuGlobe,
  LuCpu,
  LuSmartphone,
  LuPalette,
  LuFolder,
} from "react-icons/lu";
import ProjectCard from "./ProjectCard";
import Header from "@/components/general/Header";
import { PROJECT_CATEGORIES, type Project, type ProjectCategory } from "@/types/project.types";
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

  const getCategoryMeta = (cat: string) => {
    switch (cat) {
      case "website":
        return {
          label: t("filterWebsite"),
          Icon: LuGlobe,
          badgeColor: "border-cyan-400/40 bg-cyan-950/40 text-cyan-300",
        };
      case "iot":
        return {
          label: t("filterIot"),
          Icon: LuCpu,
          badgeColor: "border-emerald-400/40 bg-emerald-950/40 text-emerald-300",
        };
      case "mobile-app":
        return {
          label: t("filterMobile"),
          Icon: LuSmartphone,
          badgeColor: "border-purple-400/40 bg-purple-950/40 text-purple-300",
        };
      case "UI/UX":
        return {
          label: t("filterDesign"),
          Icon: LuPalette,
          badgeColor: "border-amber-400/40 bg-amber-950/40 text-amber-300",
        };
      default:
        return {
          label: cat,
          Icon: LuFolder,
          badgeColor: "border-slate-700/60 bg-slate-900/40 text-slate-300",
        };
    }
  };

  // Localized section heading
  const getHeadingText = () => {
    if (searchTerm) {
      if (language === "ja") {
        return `"${searchTerm}" ${t("searchResultsFor")}`;
      }
      return `${t("searchResultsFor")} "${searchTerm}"`;
    }
    if (category) {
      const meta = getCategoryMeta(category);
      if (language === "ja") {
        return `${meta.label}のプロジェクト`;
      }
      if (language === "id") {
        return `Proyek ${meta.label}`;
      }
      return `${meta.label} Projects`;
    }
    if (heading.toLowerCase().includes("all")) {
      return t("allProjectsHeading");
    }
    return t("projectsTitle");
  };

  // Determine if we should separate projects into categorized groups
  // (Only when viewing all projects on /projects without search term)
  const isCategorizedView = !showAllLink && !searchTerm && !category;

  const groupedCategories = isCategorizedView
    ? PROJECT_CATEGORIES.map((catItem) => {
        const items = filteredProjects.filter((p) => p.category === catItem.value);
        return {
          category: catItem.value,
          meta: getCategoryMeta(catItem.value),
          projects: items,
        };
      }).filter((g) => g.projects.length > 0)
    : [];

  // Check for any projects outside the standard categories
  if (isCategorizedView) {
    const knownCats = new Set(PROJECT_CATEGORIES.map((c) => c.value));
    const others = filteredProjects.filter((p) => !knownCats.has(p.category));
    if (others.length > 0) {
      groupedCategories.push({
        category: "other" as any,
        meta: getCategoryMeta("other"),
        projects: others,
      });
    }
  }

  return (
    <section className="relative z-10 pb-16">
      {/* Top Heading */}
      {showAllLink ? (
        <div className="pb-4">
          <Header title={getHeadingText()} />
          <p className="mx-auto -mt-8 mb-10 max-w-xl text-center text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base w-[90%]">
            {t("projectsSubtitle")}
          </p>
        </div>
      ) : (
        <div className="mx-auto w-[90%] max-w-5xl pb-6 pt-10 md:pt-14">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-indigo-200 dark:to-gray-300 sm:text-3xl">
            {getHeadingText()}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-gray-400">
            {filteredProjects.length} {t("projectsFound")}
          </p>
        </div>
      )}

      {/* Case 1: Categorized View (Separated per category with headers) */}
      {isCategorizedView ? (
        <div className="space-y-14">
          {groupedCategories.map((group) => (
            <div key={group.category} className="category-group">
              {/* Category Header Bar */}
              <div className="mx-auto mb-6 flex w-[90%] max-w-7xl items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`grid h-9 w-9 place-items-center rounded-xl border ${group.meta.badgeColor}`}
                  >
                    <group.meta.Icon size={18} />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                      {group.meta.label}
                    </h3>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${group.meta.badgeColor}`}
                    >
                      {group.projects.length}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/projects?category=${group.category}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  <span>{t("viewCategoryOnly")}</span>
                </Link>
              </div>

              {/* Grid of cards for this category */}
              <div className="mx-auto grid w-[90%] max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
                {group.projects.map((project, index) => (
                  <div
                    key={project.id}
                    className={
                      group.projects.length === 1
                        ? "md:col-span-2 md:w-2/3 md:justify-self-center"
                        : ""
                    }
                  >
                    <ProjectCard project={project} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Case 2: Single Filtered Grid (Search, Category selected, or Home preview) */
        <div className="mx-auto grid w-[90%] max-w-7xl grid-cols-1 gap-8 overflow-hidden pb-8 md:grid-cols-2 lg:gap-10">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className={
                displayedProjects.length === 1
                  ? "md:col-span-2 md:w-2/3 md:justify-self-center"
                  : ""
              }
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}

      {/* Show All Link on Home Page */}
      {showAllLink && (
        <div className="mx-auto flex w-[90%] max-w-7xl justify-end pt-4 pb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
          >
            {t("viewAllProjects")}
            <LuArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <p className="mx-auto w-[90%] max-w-2xl py-12 text-center text-gray-400">
          {t("noProjectsFound")}{" "}
          <span className="font-semibold text-gray-200">{searchTerm || category}</span>.
        </p>
      )}
    </section>
  );
}
