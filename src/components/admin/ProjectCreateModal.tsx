"use client";

import { useState, useActionState, useRef } from "react";
import { createProjectAction, type ActionState } from "@/app/admin/actions";
import { PROJECT_CATEGORIES } from "@/types/project.types";
import {
  LuPlus,
  LuX,
  LuUpload,
  LuImage,
  LuLayers,
  LuGithub,
  LuGlobe,
  LuCircleCheck,
  LuCircleAlert,
} from "react-icons/lu";

const initialState: ActionState = {
  success: false,
  error: null,
};

export default function ProjectCreateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    createProjectAction,
    initialState
  );
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

  function handleClose() {
    setIsOpen(false);
    setPreviewUrl(null);
    setFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-600/20 hover:from-cyan-500 hover:to-indigo-500 transition-all cursor-pointer"
      >
        <LuPlus className="text-base" />
        <span>+ Tambah Project</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl my-8">
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Tambah Project Baru</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Gambar akan diupload ke Supabase Storage secara otomatis
                </p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
              >
                <LuX className="text-lg" />
              </button>
            </div>

            {/* Error message */}
            {state?.error && (
              <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                <LuCircleAlert className="text-base shrink-0" />
                <p>{state.error}</p>
              </div>
            )}

            {/* Form */}
            <form action={formAction} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Judul Project <span className="text-rose-400">*</span>
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="Contoh: Modern SaaS Dashboard"
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
                  rows={3}
                  placeholder="Ceritakan tentang project ini, fitur utama, dan tujuan pembuatannya..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label htmlFor="project-category-create" className="mb-1.5 block text-xs font-semibold text-slate-300">
                  Kategori Project
                </label>
                <select
                  id="project-category-create"
                  name="category"
                  defaultValue="website"
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  {PROJECT_CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upload Gambar */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <LuImage className="text-slate-400" />
                  <span>Gambar Project (Upload ke Supabase Storage)</span>
                </label>
                <div className="space-y-2">
                  {/* File Upload Area */}
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
                          alt="Pratinjau gambar project yang dipilih"
                          className="h-20 w-28 object-cover rounded-lg border border-slate-700"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                            <LuCircleCheck className="text-sm shrink-0" />
                            Gambar dipilih
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5 truncate">{fileName}</p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            Klik untuk mengganti gambar
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-2 text-center">
                        <LuUpload className="text-2xl text-slate-500" />
                        <div>
                          <p className="text-xs font-semibold text-cyan-400">
                            Klik untuk pilih gambar
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            PNG, JPG, WEBP, SVG — Maks. 5MB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Fallback URL jika tidak upload file */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-slate-800" />
                    <span className="text-[11px] text-slate-500">atau masukkan URL gambar</span>
                    <div className="flex-1 h-px bg-slate-800" />
                  </div>
                  <input
                    name="image_url"
                    type="text"
                    placeholder="https://... atau /project1.png"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                  <p className="text-[11px] text-slate-500">
                    Jika keduanya diisi, <span className="text-cyan-400">upload file lebih diprioritaskan</span>.
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
                    placeholder="Next.js, TypeScript, Tailwind, Supabase"
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
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
                    placeholder="https://..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
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
                  placeholder="https://github.com/..."
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
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
                    defaultValue={0}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/60 px-3.5 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <input
                    id="is_published_create"
                    name="is_published"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                  />
                  <label
                    htmlFor="is_published_create"
                    className="text-xs font-medium text-slate-300 cursor-pointer"
                  >
                    Publikasikan ke Website Portfolio
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center justify-end gap-3 pt-5 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-600/25 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 cursor-pointer"
                >
                  <LuCircleCheck className="text-base" />
                  <span>{isPending ? "Menyimpan & Mengupload..." : "Simpan Project"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
