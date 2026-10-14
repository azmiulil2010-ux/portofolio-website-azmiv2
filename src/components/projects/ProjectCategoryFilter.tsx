"use client";

import Link from "next/link";
import {
  LuGlobe,
  LuCpu,
  LuSmartphone,
  LuPalette,
  LuLayers,
} from "react-icons/lu";
import { PROJECT_CATEGORIES, type ProjectCategory } from "@/types/project.types";
import { useLanguage } from "@/context/LanguageContext";

interface ProjectCategoryFilterProps {
  category: ProjectCategory | "";
  searchTerm: string;
  categoryCounts?: Record<string, number>;
}

export default function ProjectCategoryFilter({
  category,
  searchTerm,
  categoryCounts,
}: ProjectCategoryFilterProps) {
  const { t } = useLanguage();

  const getCategoryLabel = (val: string, defaultLabel: string) => {
    switch (val) {
      case "":
        return t("filterAll");
      case "website":
        return t("filterWebsite");
      case "iot":
        return t("filterIot");
      case "mobile-app":
        return t("filterMobile");
      case "UI/UX":
        return t("filterDesign");
      default:
        return defaultLabel;
    }
  };

  const getCategoryIcon = (val: string) => {
    switch (val) {
      case "website":
        return LuGlobe;
      case "iot":
        return LuCpu;
      case "mobile-app":
        return LuSmartphone;
      case "UI/UX":
        return LuPalette;
      default:
        return LuLayers;
    }
  };

  const filters = [{ value: "" as const, label: t("filterAll") }, ...PROJECT_CATEGORIES];

  return (
    <nav
      aria-label="Filter projects by category"
      className="project-category-filter flex flex-wrap items-center gap-2 pt-1"
    >
      {filters.map((filter) => {
        const count = categoryCounts ? categoryCounts[filter.value] : undefined;
        const params = new URLSearchParams();
        if (searchTerm) params.set("search", searchTerm);
        if (filter.value) params.set("category", filter.value);
        const href = params.size ? `/projects?${params.toString()}` : "/projects";
        const isActive = category === filter.value;
        const displayLabel = getCategoryLabel(filter.value, filter.label);
        const Icon = getCategoryIcon(filter.value);

        return (
          <Link
            key={filter.value || "all"}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
              isActive
                ? "border-cyan-400 bg-cyan-400/20 text-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/30"
                : "border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:bg-slate-800/80 hover:text-slate-200"
            }`}
          >
            <Icon
              size={14}
              className={`shrink-0 transition-colors ${
                isActive ? "text-cyan-300" : "text-slate-400 group-hover:text-cyan-300"
              }`}
            />
            <span>{displayLabel}</span>
            {count !== undefined && (
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold transition-colors ${
                  isActive
                    ? "bg-cyan-400/30 text-cyan-200"
                    : "bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200"
                }`}
              >
                {count}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}