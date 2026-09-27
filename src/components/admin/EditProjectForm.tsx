"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { updateProjectAction, type ActionState } from "@/app/admin/actions";
import type { Project } from "@/types/project.types";
import {
  LuUpload,
  LuImage,
  LuLayers,
  LuGlobe,
  LuGithub,
  LuCircleCheck,
  LuArrowLeft,
  LuCircleAlert,
} from "react-icons/lu";

interface EditProjectFormProps {
  project: Project;
}

const initialState: ActionState = {
  success: false,
  error: null,
};

export default function EditProjectForm({ project }: EditProjectFormProps) {
  const updateWithId = updateProjectAction.bind(null, project.id);
  const [state, formAction, isPending] = useActionState(
    updateWithId,
    initialState
  );

  const existingImage = project.image || project.image_path || project.imagePath || "";
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      setFileName("");
      return;
    }
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  }

  const initialTechStack = Array.isArray(project.tech_stack)
    ? project.tech_stack.join(", ")
    : "";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 shadow-xl">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/admin/proyek"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <LuArrowLeft />
          <span>Kembali ke Daftar Proyek</span>
        </Link>
      </div>

      <div className="border-b border-slate-800 pb-5 mb-6">
        <h2 className="text-xl font-bold text-white">Edit Proyek</h2>
        <p className="text-xs text-slate-400 mt-1">
          ID: <code className="font-mono text-cyan-400">{project.id}</code>
        </p>
      </div>

      {state?.error && (
        <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
          <LuCircleAlert className="text-base shrink-0" />
          <p>{state.error}</p>
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Judul Project <span className="text-rose-400">*</span>
          </label>
          <input
            name="title"
            type="text"
            required
            defaultValue={project.title}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Deskripsi <span className="text-rose-400">*</span>
          </label>
          <textarea
            name="description"
            required
            rows={4}
            defaultValue={project.description}
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        {/* Upload Gambar */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <LuImage className="text-slate-400" />
            <span>Gambar Project</span>
          </label>

          {/* Tampilkan gambar yang sudah tersimpan */}
          {existingImage && (
            <div className="mb-3 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={existingImage}
                alt="Gambar saat ini"
                className="h-16 w-24 object-cover rounded-lg border border-slate-700 shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).src = "/project1.png"; }}
              />
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-slate-400">Gambar saat ini:</p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{existingImage}</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative cursor-pointer rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/40 p-4 hover:border-cyan-500/50 hover:bg-slate-900/60 transition-all"
            >
              <input
                ref={fileInputRef}
                name="image_file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
              {previewUrl ? (
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="Preview baru"
                    className="h-16 w-24 object-cover rounded-lg border border-cyan-700"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                      <LuCircleCheck className="text-sm shrink-0" />
                      Gambar baru dipilih
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">{fileName}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Klik untuk mengganti</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <LuUpload className="text-xl text-slate-500 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-cyan-400">
                      Upload gambar baru (opsional)
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Kosongkan jika tidak ingin mengganti gambar. PNG, JPG, WEBP — Maks. 5MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* URL fallback */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-[11px] text-slate-500">atau ganti dengan URL gambar</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>
            <input
              name="image_url"
              type="text"
              defaultValue={existingImage}
              placeholder="https://... atau /project1.png"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <p className="text-[11px] text-slate-500">
              Jika upload file & URL keduanya diisi, <span className="text-cyan-400">upload file lebih diprioritaskan</span>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <LuLayers className="text-slate-400" />
              <span>Tech Stack (pisahkan koma)</span>
            </label>
            <input
              name="tech_stack"
              type="text"
              defaultValue={initialTechStack}
              placeholder="Next.js, TypeScript, Tailwind CSS, Supabase"
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <LuGlobe className="text-slate-400" />
              <span>Demo / Website Live URL</span>
            </label>
            <input
              name="demo_url"
              type="url"
              defaultValue={project.demo_url || project.website_url || project.websiteUrl}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
            <LuGithub className="text-slate-400" />
            <span>GitHub Repository URL</span>
          </label>
          <input
            name="github_url"
            type="url"
            defaultValue={project.github_url || ""}
            placeholder="https://github.com/..."
            className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Urutan Tampilan (Display Order)
            </label>
            <input
              name="display_order"
              type="number"
              defaultValue={project.display_order ?? 0}
              className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              id="is_published"
              name="is_published"
              type="checkbox"
              defaultChecked={project.is_published ?? true}
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
            />
            <label
              htmlFor="is_published"
              className="text-xs font-medium text-slate-300 cursor-pointer"
            >
              Publikasikan ke Website Portfolio
            </label>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-slate-800">
          <Link
            href="/admin/proyek"
            className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Batalkan
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-600/25 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 cursor-pointer"
          >
            <LuCircleCheck className="text-base" />
            <span>{isPending ? "Menyimpan..." : "Simpan Perubahan"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
