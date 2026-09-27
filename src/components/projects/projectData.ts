import {
  getProjects as fetchProjects,
  getProjectById as fetchProjectById,
} from "@/services/projectService";
import type { Project } from "@/types/project.types";

export type { Project };

export async function getProjects(): Promise<Project[]> {
  return fetchProjects();
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  const project = await fetchProjectById(id);
  return project ?? undefined;
}