import { getProjects } from "./projectData";
import ProjectSectionView from "./ProjectSectionView";
import type { Project, ProjectCategory } from "@/types/project.types";

interface ProjectSectionProps {
  searchTerm?: string;
  category?: ProjectCategory | "";
  heading?: string;
  showAllLink?: boolean;
  projects?: Project[];
}

export default async function ProjectSection({
  searchTerm = "",
  category = "",
  heading = "Recent Projects",
  showAllLink = false,
  projects: initialProjects,
}: ProjectSectionProps) {
  const projects = initialProjects ?? (await getProjects());

  return (
    <ProjectSectionView
      projects={projects}
      searchTerm={searchTerm}
      category={category}
      heading={heading}
      showAllLink={showAllLink}
    />
  );
}
