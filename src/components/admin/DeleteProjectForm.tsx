"use client";

import { useActionState } from "react";
import Link from "next/link";
import Image from "next/image";
import { deleteProjectAction, type ActionState } from "@/app/admin/actions";
import type { Project } from "@/types/project.types";
import { LuTrash2, LuTriangleAlert, LuArrowLeft, LuCircleAlert } from "react-icons/lu";

interface DeleteProjectFormProps {
  project: Project;
}

const initialState: ActionState = {
  success: false,
  error: null,
};

export default function DeleteProjectForm({ project }: DeleteProjectFormProps) {
  const deleteWithId = deleteProjectAction.bind(null, project.id);
  const [state, formAction, isPending] = useActionState(
    deleteWithId,
    initialState
  );

  return (
    <div className="max-w-xl mx-auto rounded-2xl border border-rose-500/20 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
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

      {/* Warning Icon & Heading */}
      <div className="text-center mb-6">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4 shadow-inner">
          <LuTriangleAlert className="text-2xl" />
        </div>
        <h2 className="text-xl font-bold text-white">
          Apakah Anda yakin ingin menghapus project ini?
        </h2>
        <p className="mt-2 text-xs text-slate-400 max-w-sm mx-auto">
          Tindakan ini permanen. Data project akan dihapus dari Supabase Database dan tidak lagi muncul di website publik.
        </p>
      </div>

      {/* Error alert */}
      {state?.error && (
        <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
          <LuCircleAlert className="text-base shrink-0" />
          <p>{state.error}</p>
        </div>
      )}

      {/* Project Card Preview */}
      <div className="my-6 p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center gap-4">
        <div className="relative h-16 w-20 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700/60">
          <Image
            src={project.imagePath || "/project1.png"}
            alt={project.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-white truncate">
            {project.title}
          </h4>
          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
            {project.description}
          </p>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">
            ID: {project.id}
          </p>
        </div>
      </div>

      {/* Confirmation Actions */}
      <form action={formAction}>
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Link
            href="/admin/proyek"
            className="rounded-xl border border-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Batalkan
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-rose-600/25 hover:from-rose-500 hover:to-red-500 disabled:opacity-50 cursor-pointer"
          >
            <LuTrash2 className="text-base" />
            <span>{isPending ? "Menghapus..." : "Hapus"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
