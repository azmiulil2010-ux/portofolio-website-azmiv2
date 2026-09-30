import { supabase } from "@/lib/supabase";
import type { Project, ProjectInput, ProjectRow } from "@/types/project.types";
import type { SupabaseClient } from "@supabase/supabase-js";

export function mapProject(row: ProjectRow | any): Project {
  const imageVal = row.image || row.image_path || "/project1.png";
  const webVal = row.demo_url || row.website_url || "#";
  const techStack = Array.isArray(row.tech_stack)
    ? row.tech_stack
    : typeof row.tech_stack === "string"
      ? row.tech_stack.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

  return {
    id: String(row.id),
    title: row.title || "",
    description: row.description || "",
    image: imageVal,
    imagePath: imageVal,
    image_path: imageVal,
    tech_stack: techStack,
    github_url: row.github_url || "",
    demo_url: webVal,
    websiteUrl: webVal,
    website_url: webVal,
    is_published: row.is_published ?? true,
    display_order: row.display_order ?? 0,
    category: row.category || "website",
    created_at: row.created_at || new Date().toISOString(),
  };
}

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  return `${base || "proyek"}-${randomSuffix}`;
}

export async function getProjects(options?: {
  includeUnpublished?: boolean;
  client?: SupabaseClient;
}): Promise<Project[]> {
  const activeClient = options?.client ?? supabase;
  if (!activeClient) {
    console.error("Supabase client is not initialized.");
    return [];
  }

  let query = activeClient
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (!options?.includeUnpublished) {
    query = query.eq("is_published", true);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching projects:", error.message);
    return [];
  }

  return (data || []).map(mapProject);
}

export async function getProjectById(
  id: string,
  options?: {
    includeUnpublished?: boolean;
    client?: SupabaseClient;
  }
): Promise<Project | null> {
  const activeClient = options?.client ?? supabase;
  if (!activeClient) return null;

  let query = activeClient.from("projects").select("*").eq("id", id);
  if (!options?.includeUnpublished) {
    query = query.eq("is_published", true);
  }

  const { data, error } = await query.maybeSingle();
  if (error || !data) {
    return null;
  }

  return mapProject(data);
}

export async function createProject(
  data: ProjectInput,
  client?: SupabaseClient
): Promise<{ data: Project | null; error: string | null }> {
  const activeClient = client ?? supabase;
  if (!activeClient) {
    return { data: null, error: "Database client tidak tersedia." };
  }

  const imageVal = (data.image || data.image_path || "").trim();
  const webVal = (data.demo_url || data.website_url || "").trim();
  const techStackArray = Array.isArray(data.tech_stack)
    ? data.tech_stack
    : typeof data.tech_stack === "string"
      ? data.tech_stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

  const projectId = data.id?.trim() || generateSlug(data.title);

  // Payload with both schemas (standard and legacy)
  const fullPayload = {
    id: projectId,
    title: data.title.trim(),
    description: data.description.trim(),
    image: imageVal,
    image_path: imageVal,
    website_url: webVal,
    demo_url: webVal,
    tech_stack: techStackArray,
    github_url: (data.github_url || "").trim(),
    is_published: data.is_published ?? true,
    display_order: Number(data.display_order) || 0,
    category: data.category,
  };

  // Attempt insert with extended fields
  let { data: inserted, error } = await activeClient
    .from("projects")
    .insert([fullPayload])
    .select()
    .single();

  // If column does not exist (code 42703), retry with base schema
  if (error && error.code === "42703") {
    const basePayload = {
      id: projectId,
      title: data.title.trim(),
      description: data.description.trim(),
      image_path: imageVal,
      website_url: webVal,
      is_published: data.is_published ?? true,
      display_order: Number(data.display_order) || 0,
      category: data.category,
    };

    const retry = await activeClient
      .from("projects")
      .insert([basePayload])
      .select()
      .single();

    inserted = retry.data;
    error = retry.error;
  }

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: inserted ? mapProject(inserted) : null, error: null };
}

export async function updateProject(
  id: string,
  data: Partial<ProjectInput>,
  client?: SupabaseClient
): Promise<{ data: Project | null; error: string | null }> {
  const activeClient = client ?? supabase;
  if (!activeClient) {
    return { data: null, error: "Database client tidak tersedia." };
  }

  const imageVal = data.image !== undefined ? data.image.trim() : (data.image_path || "").trim();
  const webVal = data.demo_url !== undefined ? data.demo_url.trim() : (data.website_url || "").trim();
  const techStackArray = Array.isArray(data.tech_stack)
    ? data.tech_stack
    : typeof data.tech_stack === "string"
      ? data.tech_stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : undefined;

  const fullUpdate: Record<string, any> = {
    updated_at: new Date().toISOString(),
  };

  if (data.title !== undefined) fullUpdate.title = data.title.trim();
  if (data.description !== undefined) fullUpdate.description = data.description.trim();
  if (imageVal) {
    fullUpdate.image = imageVal;
    fullUpdate.image_path = imageVal;
  }
  if (webVal) {
    fullUpdate.demo_url = webVal;
    fullUpdate.website_url = webVal;
  }
  if (techStackArray !== undefined) fullUpdate.tech_stack = techStackArray;
  if (data.github_url !== undefined) fullUpdate.github_url = data.github_url.trim();
  if (data.is_published !== undefined) fullUpdate.is_published = data.is_published;
  if (data.display_order !== undefined) fullUpdate.display_order = Number(data.display_order);
  if (data.category !== undefined) fullUpdate.category = data.category;

  let { data: updated, error } = await activeClient
    .from("projects")
    .update(fullUpdate)
    .eq("id", id)
    .select()
    .single();

  // If column does not exist (code 42703), retry with base fields only
  if (error && error.code === "42703") {
    const baseUpdate: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (data.title !== undefined) baseUpdate.title = data.title.trim();
    if (data.description !== undefined) baseUpdate.description = data.description.trim();
    if (imageVal) baseUpdate.image_path = imageVal;
    if (webVal) baseUpdate.website_url = webVal;
    if (data.is_published !== undefined) baseUpdate.is_published = data.is_published;
    if (data.display_order !== undefined) baseUpdate.display_order = Number(data.display_order);
    if (data.category !== undefined) baseUpdate.category = data.category;

    const retry = await activeClient
      .from("projects")
      .update(baseUpdate)
      .eq("id", id)
      .select()
      .single();

    updated = retry.data;
    error = retry.error;
  }

  if (error) {
    return { data: null, error: error.message };
  }

  return { data: updated ? mapProject(updated) : null, error: null };
}

export async function deleteProject(
  id: string,
  client?: SupabaseClient
): Promise<{ success: boolean; error: string | null }> {
  const activeClient = client ?? supabase;
  if (!activeClient) {
    return { success: false, error: "Database client tidak tersedia." };
  }

  const { error } = await activeClient.from("projects").delete().eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, error: null };
}

export async function uploadProjectImage(
  file: File,
  client?: SupabaseClient
): Promise<{ url: string | null; error: string | null }> {
  if (!file || file.size === 0) {
    return { url: null, error: null };
  }

  if (!file.type.startsWith("image/")) {
    return {
      url: null,
      error: "File yang dipilih harus berupa file gambar (PNG, JPG, WEBP, SVG, dll).",
    };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { url: null, error: "Ukuran gambar melebihi batas maksimal 5MB." };
  }

  const activeClient = client ?? supabase;
  if (!activeClient) {
    return { url: null, error: "Supabase client tidak tersedia." };
  }

  const fileExt = file.name.split(".").pop()?.toLowerCase() || "png";
  const cleanName = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const fileName = `${Date.now()}-${cleanName || "project"}.${fileExt}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await activeClient.storage
    .from("projects")
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (uploadError) {
    return {
      url: null,
      error: `Gagal upload gambar ke Supabase Storage: ${uploadError.message}. Pastikan bucket 'projects' sudah dibuat dan diset Public di Supabase Storage.`,
    };
  }

  const { data } = activeClient.storage.from("projects").getPublicUrl(fileName);

  return { url: data.publicUrl, error: null };
}
