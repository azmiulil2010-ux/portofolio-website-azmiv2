import { cache } from "react";
import {
  getProjects as fetchProjects,
  getProjectById as fetchProjectById,
} from "@/services/projectService";
import type { Project } from "@/types/project.types";

export type { Project };

export async function getProjects(): Promise<Project[]> {
  return fetchProjects();
}

export const getProjectById = cache(async (id: string): Promise<Project | undefined> => {
  const project = await fetchProjectById(id);
  return project ?? undefined;
});