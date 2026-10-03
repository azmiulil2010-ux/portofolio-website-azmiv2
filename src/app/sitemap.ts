import type { MetadataRoute } from "next";
import { getProjects } from "@/components/projects/projectData";
import { absoluteSiteUrl } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();

  return [
    {
      url: absoluteSiteUrl("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteSiteUrl("/projects"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: absoluteSiteUrl(`/projects/${encodeURIComponent(project.id)}`),
      ...(project.created_at ? { lastModified: new Date(project.created_at) } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
