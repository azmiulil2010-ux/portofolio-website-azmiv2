import { getProjects } from "./projectData";
import ProjectSectionView from "./ProjectSectionView";
import type { ProjectCategory } from "@/types/project.types";

interface ProjectSectionProps {
  searchTerm?: string;
  category?: ProjectCategory | "";
  heading?: string;
  showAllLink?: boolean;
}

export default async function ProjectSection({
  searchTerm = "",
  category = "",
  heading = "Recent Projects",
  showAllLink = false,
}: ProjectSectionProps) {
  const projects = await getProjects();

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
