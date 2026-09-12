"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuSearch, LuX } from "react-icons/lu";

interface ProjectSearchProps {
  searchTerm: string;
  basePath?: string;
}

export default function ProjectSearch({ searchTerm, basePath = "/projects" }: ProjectSearchProps) {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextSearchTerm = String(formData.get("search") ?? "").trim();
    const query = nextSearchTerm ? `?search=${encodeURIComponent(nextSearchTerm)}` : "";

    router.replace(`${basePath}${query}`, { scroll: false });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="project-search mx-auto flex w-[90%] max-w-5xl items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-2 shadow-lg shadow-slate-950/20 backdrop-blur-sm"
    >
      <LuSearch className="ml-3 shrink-0 text-cyan-400" size={20} aria-hidden="true" />
      <label htmlFor="project-search" className="sr-only">
        Search projects
      </label>
      <input
        id="project-search"
        name="search"
        type="search"
        defaultValue={searchTerm}
        placeholder="Search projects..."
        className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-gray-100 outline-none placeholder:text-gray-500"
      />
      {searchTerm && (
        <Link
          href={basePath}
          aria-label="Clear project search"
          title="Clear search"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LuX size={18} />
        </Link>
      )}
      <button
        type="submit"
        className="rounded-xl bg-linear-to-r from-blue-900 to-purple-800 px-5 py-3 text-sm font-semibold text-white transition-all hover:from-blue-800 hover:to-purple-700"
      >
        Search
      </button>
    </form>
  );
}