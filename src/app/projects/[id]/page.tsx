import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageLead from "@/components/general/PageLead";
import SpaceDecorations from "@/components/general/SpaceDecorations";
import { getProjectById } from "@/components/projects/projectData";
import { absoluteSiteUrl, getAbsoluteImageUrl, getSeoDescription } from "@/lib/seo";

export const dynamic = "force-dynamic";

interface ProjectDetailProps {
  params: Promise<{ id: string }>;
}

const fallbackDescription =
  "Lihat project dan karya pengembangan website Muhammad Ulil Azmi.";

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  const title = project?.title || "Project tidak ditemukan";
  const description = project?.description
    ? getSeoDescription(project.description)
    : fallbackDescription;
  const projectUrl = absoluteSiteUrl(`/projects/${encodeURIComponent(id)}`);
  const imageUrl =
    getAbsoluteImageUrl(project?.imagePath) ||
    absoluteSiteUrl(`/projects/${encodeURIComponent(id)}/opengraph-image`);

  return {
    title,
    description,
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      type: "article",
      url: projectUrl,
      siteName: "Portofolio Muhammad Ulil Azmi",
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `Project ${title}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const { id } = await params;
  const project = await getProjectById(id);

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
      <section className="relative z-10 mx-auto mt-8 flex w-[90%] max-w-5xl flex-col gap-6 pb-24 lg:mt-12 lg:gap-8">
        <div className="relative flex w-full items-start justify-center">
          <Image
            src={project.imagePath}
            alt={`Pratinjau project ${project.title}`}
            width={1000}
            height={750}
            sizes="(min-width: 1024px) 60vw, 90vw"
            className="block h-auto w-full rounded-2xl shadow-2xl shadow-slate-950/40"
            preload
          />
        </div>
        <div className="project-detail-surface rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm">
          <p className="text-lg leading-8 text-gray-300">{project.description}</p>
          {project.tech_stack && project.tech_stack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-slate-700/60 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.websiteUrl && project.websiteUrl !== "#" && (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="project-live-link rounded-xl bg-linear-to-r from-blue-900 to-purple-800 px-5 py-3 text-sm font-semibold text-white transition-colors hover:from-blue-800 hover:to-purple-700"
              >
                Visit live project
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              >
                GitHub Repository
              </a>
            )}
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
