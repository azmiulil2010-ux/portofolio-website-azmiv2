import Link from "next/link";
import { PROJECT_CATEGORIES, type ProjectCategory } from "@/types/project.types";

interface ProjectCategoryFilterProps {
  category: ProjectCategory | "";
  searchTerm: string;
}

export default function ProjectCategoryFilter({
  category,
  searchTerm,
}: ProjectCategoryFilterProps) {
  const filters = [{ value: "" as const, label: "All" }, ...PROJECT_CATEGORIES];

  return (
    <nav
      aria-label="Filter projects by category"
      className="project-category-filter mx-auto mt-5 flex w-[90%] max-w-5xl flex-wrap gap-2"
    >
      {filters.map((filter) => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("search", searchTerm);
        if (filter.value) params.set("category", filter.value);
        const href = params.size ? `/projects?${params.toString()}` : "/projects";
        const isActive = category === filter.value;

        return (
          <Link
            key={filter.value || "all"}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-cyan-300 bg-cyan-300 text-slate-950"
                : "border-slate-700 bg-slate-900/70 text-slate-300 hover:border-cyan-400/60 hover:text-cyan-200"
            }`}
          >
            {filter.label}
          </Link>
        );
      })}
    </nav>
  );
}