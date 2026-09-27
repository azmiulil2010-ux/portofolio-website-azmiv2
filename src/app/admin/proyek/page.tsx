import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/services/projectService";
import ProjectCreateModal from "@/components/admin/ProjectCreateModal";
import {
  LuFolderGit2,
  LuExternalLink,
  LuPencil,
  LuTrash2,
  LuCircleCheck,
  LuClock,
} from "react-icons/lu";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjects({ includeUnpublished: true });

  const publishedCount = projects.filter((p) => p.is_published).length;
  const draftCount = projects.length - publishedCount;

  return (
    <div className="space-y-8">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <LuFolderGit2 className="text-cyan-400" />
            <span>Manajemen Projects</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Tambah, edit, dan hapus project portofolio yang tersimpan di Supabase.
          </p>
        </div>
        <div>
          <ProjectCreateModal />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs font-medium text-slate-400">Total Proyek</p>
          <p className="text-2xl font-bold text-white mt-1">{projects.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs font-medium text-slate-400">Status Terbit</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {publishedCount}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <p className="text-xs font-medium text-slate-400">Draft / Nonaktif</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{draftCount}</p>
        </div>
      </div>

      {/* Projects List */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Daftar Seluruh Proyek</h3>
          <span className="text-xs text-slate-400">
            {projects.length} item ditemukan
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="p-12 text-center">
            <LuFolderGit2 className="mx-auto text-4xl text-slate-600 mb-3" />
            <p className="text-sm font-medium text-slate-300">
              Belum ada project di database
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Gunakan tombol &quot;+ Tambah Project&quot; di atas untuk menambahkan portofolio pertama Anda.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-800/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="relative h-16 w-24 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700/60">
                    <Image
                      src={project.imagePath || "/project1.png"}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-semibold text-white">
                        {project.title}
                      </h4>
                      {project.is_published ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <LuCircleCheck size={11} /> Terbit
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                          <LuClock size={11} /> Draft
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 max-w-xl">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-3 pt-1 text-xs text-slate-500">
                      <span>ID: <code className="text-slate-400 font-mono text-[11px]">{project.id}</code></span>
                      {project.websiteUrl && project.websiteUrl !== "#" && (
                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
                        >
                          <span>Live Site</span>
                          <LuExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions: Edit & Hapus */}
                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <Link
                    href={`/admin/proyek/edit/${project.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700/60"
                  >
                    <LuPencil size={13} className="text-cyan-400" />
                    <span>Edit</span>
                  </Link>

                  <Link
                    href={`/admin/proyek/hapus/${project.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 transition-colors border border-rose-500/20"
                  >
                    <LuTrash2 size={13} />
                    <span>Hapus</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
