import { supabase } from "@/lib/supabase";

export interface Project {
  id: string;
  title: string;
  imagePath: string;
  websiteUrl: string;
  description: string;
}

type ProjectRow = {
  id: string;
  title: string;
  image_path: string;
  website_url: string;
  description: string;
};

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    imagePath: row.image_path,
    websiteUrl: row.website_url,
    description: row.description,
  };
}

export async function getProjects(): Promise<Project[]> {
  if (!supabase) {
    console.error("Supabase environment variables are missing.");
    return [];
  }

  const { data, error } = await supabase
    .from("projects")
    .select("id, title, image_path, website_url, description")
    .eq("is_published", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Unable to load projects from Supabase:", error.message);
    return [];
  }

  return (data as ProjectRow[]).map(mapProject);
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  if (!supabase) {
    console.error("Supabase environment variables are missing.");
    return undefined;
  }

  const { data, error } = await supabase
    .from("projects")
    .select("id, title, image_path, website_url, description")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("Unable to load project from Supabase:", error.message);
    return undefined;
  }

  return data ? mapProject(data as ProjectRow) : undefined;
}