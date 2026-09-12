import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageLead from "@/components/general/PageLead";
import SpaceDecorations from "@/components/general/SpaceDecorations";
import { getProjectById, projects } from "@/components/projects/projectData";

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden pt-18">
      <SpaceDecorations />
      <PageLead
        eyebrow="Project detail"
        title={project.title}
        description="A closer look at the idea, technology, and lessons behind this project."
      />
      <section className="relative z-10 mx-auto mt-8 grid w-[90%] max-w-6xl items-start gap-10 pb-24 lg:mt-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="relative flex items-start justify-center lg:-my-6">
          <Image
            src={project.imagePath}
            alt={project.title}
            width={1000}
            height={750}
            sizes="(min-width: 1024px) 60vw, 90vw"
            className="block h-auto w-full rounded-2xl shadow-2xl shadow-slate-950/40 lg:w-[115%] lg:translate-x-[-7.5%]"
            priority
          />
        </div>
        <div className="project-detail-surface rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm">
          <p className="text-lg leading-8 text-gray-300">{project.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="project-live-link rounded-xl bg-linear-to-r from-blue-900 to-purple-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:from-blue-800 hover:to-purple-700"
            >
              Visit live project
            </a>
            <Link
              href="/#projects"
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-cyan-400 hover:text-cyan-300"
            >
              Back to projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
