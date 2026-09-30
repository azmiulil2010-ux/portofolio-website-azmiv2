import ProjectSection from "@/components/projects/ProjectSection";
import ProjectSearch from "@/components/projects/ProjectSearch";
import PageLead from "@/components/general/PageLead";
import SpaceDecorations from "@/components/general/SpaceDecorations";
import ProjectCategoryFilter from "@/components/projects/ProjectCategoryFilter";
import { PROJECT_CATEGORIES, type ProjectCategory } from "@/types/project.types";

export const dynamic = "force-dynamic";

interface ProjectsPageProps {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function Projects({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const searchTerm = params.search?.trim() ?? "";
  const category = PROJECT_CATEGORIES.some((item) => item.value === params.category)
    ? (params.category as ProjectCategory)
    : "";

  return (
    <main className="relative overflow-hidden pt-18">
      <SpaceDecorations />
      <PageLead
        eyebrow="Selected work"
        title="Small experiments, real problems, and lessons that stick."
        description="A collection of websites and product ideas built while learning how design, code, and useful functionality come together."
      />
      <ProjectSearch searchTerm={searchTerm} category={category} />
      <ProjectCategoryFilter category={category} searchTerm={searchTerm} />
      <ProjectSection searchTerm={searchTerm} category={category} heading="All Projects" />
    </main>
  );
}