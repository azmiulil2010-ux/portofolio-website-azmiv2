"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase-server";
import { PROJECT_CATEGORIES, type ProjectCategory } from "@/types/project.types";
import {
  createDoorpassToken,
  verifyDoorpassToken,
  DOORPASS_COOKIE_NAME,
  DOORPASS_COOKIE_OPTIONS,
  DOORPASS_PENDING_COOKIE_NAME,
  DOORPASS_PENDING_COOKIE_OPTIONS,
  DOORPASS_PENDING_USER_ID,
} from "@/lib/doorpass";
import {
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImage,
} from "@/services/projectService";

export type ActionState = {
  success?: boolean;
  error?: string | null;
  message?: string | null;
};

// Layer 1: Supabase Login Action
export async function loginAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Email dan password wajib diisi." };
  }

  const cookieStore = await cookies();
  const pendingDoorpass = cookieStore.get(DOORPASS_PENDING_COOKIE_NAME)?.value;
  if (!(await verifyDoorpassToken(pendingDoorpass, DOORPASS_PENDING_USER_ID))) {
    return { success: false, error: "Doorpass tidak valid." };
  }

  let shouldRedirect = false;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return { success: false, error: "Email atau password salah." };
    }

    const token = await createDoorpassToken(data.user.id);
    cookieStore.set(DOORPASS_COOKIE_NAME, token, DOORPASS_COOKIE_OPTIONS);
    cookieStore.delete(DOORPASS_PENDING_COOKIE_NAME);

    shouldRedirect = true;
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Terjadi kesalahan saat login.",
    };
  }

  if (shouldRedirect) {
    redirect("/dashboard/admin");
  }

  return { success: true };
}

// Logout Action
export async function logoutAction(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const cookieStore = await cookies();
  cookieStore.delete(DOORPASS_COOKIE_NAME);

  // Buat token doorpass pending agar admin yang baru logout tetap bisa mengakses halaman /admin/login
  const pendingToken = await createDoorpassToken(
    DOORPASS_PENDING_USER_ID,
    60 * 60 // 1 jam masa berlaku
  );
  cookieStore.set(
    DOORPASS_PENDING_COOKIE_NAME,
    pendingToken,
    {
      ...DOORPASS_PENDING_COOKIE_OPTIONS,
      maxAge: 60 * 60,
    }
  );

  redirect("/admin/login");
}

// Helper for security verification across CRUD Server Actions
async function verifyAdminAccess() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Unauthorized: Sesi login Supabase tidak valid.");
  }

  const cookieStore = await cookies();
  const doorpassCookie = cookieStore.get(DOORPASS_COOKIE_NAME)?.value;
  const isDoorpassValid = await verifyDoorpassToken(doorpassCookie, user.id);

  if (!isDoorpassValid) {
    throw new Error("Unauthorized: Verifikasi Doorpass diperlukan.");
  }

  return { supabase, user };
}

// Layer 3 & CRUD: Create Project Action
export async function createProjectAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  let shouldRedirect = false;

  try {
    const { supabase } = await verifyAdminAccess();

    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const category = formData.get("category") as ProjectCategory;
    const imageFile = formData.get("image_file") as File | null;
    const imageUrl = (formData.get("image_url") as string)?.trim();
    const techStackRaw = (formData.get("tech_stack") as string)?.trim();
    const githubUrl = (formData.get("github_url") as string)?.trim();
    const demoUrl = (formData.get("demo_url") as string)?.trim();
    const displayOrder = parseInt(formData.get("display_order") as string, 10) || 0;
    const isPublished = formData.get("is_published") === "on" || formData.get("is_published") === "true";

    if (!title) {
      return { success: false, error: "Judul project wajib diisi." };
    }
    if (!description) {
      return { success: false, error: "Deskripsi project wajib diisi." };
    }
    if (!PROJECT_CATEGORIES.some((item) => item.value === category)) {
      return { success: false, error: "Kategori project tidak valid." };
    }

    // Upload gambar ke Supabase Storage jika ada file yang dikirim
    let resolvedImageUrl = imageUrl || "/project1.png";
    if (imageFile && imageFile.size > 0) {
      const { url: uploadedUrl, error: uploadError } = await uploadProjectImage(imageFile, supabase);
      if (uploadError) {
        return { success: false, error: uploadError };
      }
      if (uploadedUrl) {
        resolvedImageUrl = uploadedUrl;
      }
    }

    const techStack = techStackRaw
      ? techStackRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const { error } = await createProject(
      {
        title,
        description,
        category,
        image: resolvedImageUrl,
        image_path: resolvedImageUrl,
        tech_stack: techStack,
        github_url: githubUrl,
        demo_url: demoUrl,
        website_url: demoUrl,
        display_order: displayOrder,
        is_published: isPublished,
      },
      supabase
    );

    if (error) {
      return { success: false, error: `Gagal membuat project: ${error}` };
    }

    revalidatePath("/projects");
    revalidatePath("/");
    revalidatePath("/admin/proyek");
    shouldRedirect = true;
  } catch (err: any) {
    return { success: false, error: err.message || "Terjadi kesalahan internal." };
  }

  if (shouldRedirect) {
    redirect("/admin/proyek");
  }

  return { success: true };
}

// Layer 3 & CRUD: Update Project Action
export async function updateProjectAction(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  let shouldRedirect = false;

  try {
    const { supabase } = await verifyAdminAccess();

    const title = (formData.get("title") as string)?.trim();
    const description = (formData.get("description") as string)?.trim();
    const category = formData.get("category") as ProjectCategory;
    const imageFile = formData.get("image_file") as File | null;
    const imageUrl = (formData.get("image_url") as string)?.trim();
    const techStackRaw = (formData.get("tech_stack") as string)?.trim();
    const githubUrl = (formData.get("github_url") as string)?.trim();
    const demoUrl = (formData.get("demo_url") as string)?.trim();
    const displayOrder = parseInt(formData.get("display_order") as string, 10) || 0;
    const isPublished = formData.get("is_published") === "on" || formData.get("is_published") === "true";

    if (!title) {
      return { success: false, error: "Judul project wajib diisi." };
    }
    if (!description) {
      return { success: false, error: "Deskripsi project wajib diisi." };
    }
    if (!PROJECT_CATEGORIES.some((item) => item.value === category)) {
      return { success: false, error: "Kategori project tidak valid." };
    }

    // Upload gambar baru ke Supabase Storage jika ada file yang dikirim
    let resolvedImageUrl = imageUrl; // Jika tidak upload file, gunakan URL yang diketik
    if (imageFile && imageFile.size > 0) {
      const { url: uploadedUrl, error: uploadError } = await uploadProjectImage(imageFile, supabase);
      if (uploadError) {
        return { success: false, error: uploadError };
      }
      if (uploadedUrl) {
        resolvedImageUrl = uploadedUrl;
      }
    }

    const techStack = techStackRaw
      ? techStackRaw.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const updatePayload: Record<string, any> = {
      title,
      description,
      category,
      tech_stack: techStack,
      github_url: githubUrl,
      demo_url: demoUrl,
      website_url: demoUrl,
      display_order: displayOrder,
      is_published: isPublished,
    };

    // Hanya update image jika ada perubahan (upload file baru atau URL diisi)
    if (resolvedImageUrl) {
      updatePayload.image = resolvedImageUrl;
      updatePayload.image_path = resolvedImageUrl;
    }

    const { error } = await updateProject(id, updatePayload, supabase);

    if (error) {
      return { success: false, error: `Gagal memperbarui project: ${error}` };
    }

    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);
    revalidatePath("/");
    revalidatePath("/admin/proyek");
    shouldRedirect = true;
  } catch (err: any) {
    return { success: false, error: err.message || "Terjadi kesalahan internal." };
  }

  if (shouldRedirect) {
    redirect("/admin/proyek");
  }

  return { success: true };
}

// Layer 3 & CRUD: Delete Project Action
export async function deleteProjectAction(id: string): Promise<ActionState> {
  let shouldRedirect = false;

  try {
    const { supabase } = await verifyAdminAccess();

    const { success, error } = await deleteProject(id, supabase);
    if (!success || error) {
      return { success: false, error: error || "Gagal menghapus project." };
    }

    revalidatePath("/projects");
    revalidatePath(`/projects/${id}`);
    revalidatePath("/");
    revalidatePath("/admin/proyek");
    shouldRedirect = true;
  } catch (err: any) {
    return { success: false, error: err.message || "Terjadi kesalahan internal." };
  }

  if (shouldRedirect) {
    redirect("/admin/proyek");
  }

  return { success: true };
}
