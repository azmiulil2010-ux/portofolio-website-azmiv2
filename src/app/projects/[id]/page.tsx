import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FuturisticBackground from "@/components/general/FuturisticBackground";
import { getProjectById } from "@/components/projects/projectData";
import ProjectDetailClientView from "@/components/projects/ProjectDetailClientView";
import {
  absoluteSiteUrl,
  getAbsoluteImageUrl,
  getSeoDescription,
  siteUrl,
} from "@/lib/seo";

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
    metadataBase: siteUrl,
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
    <main className="relative min-h-screen overflow-hidden pt-18 bg-slate-950 text-slate-100">
      <FuturisticBackground show3D={false} />
      <ProjectDetailClientView project={project} />
    </main>
  );
}
