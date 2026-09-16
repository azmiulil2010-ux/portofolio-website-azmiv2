import ProjectSection from "@/components/projects/ProjectSection";
import ProjectSearch from "@/components/projects/ProjectSearch";
import PageLead from "@/components/general/PageLead";
import SpaceDecorations from "@/components/general/SpaceDecorations";

interface ProjectsPageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function Projects({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const searchTerm = params.search?.trim() ?? "";

  return (
    <main className="relative overflow-hidden pt-18">
      <SpaceDecorations />
      <PageLead
        eyebrow="Selected work"
        title="Small experiments, real problems, and lessons that stick."
        description="A collection of websites and product ideas built while learning how design, code, and useful functionality come together."
      />
      <ProjectSearch searchTerm={searchTerm} />
      <ProjectSection searchTerm={searchTerm} heading="All Projects" />
    </main>
  );
}