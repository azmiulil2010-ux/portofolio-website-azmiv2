import type { Metadata } from "next";
import ProjectSection from "@/components/projects/ProjectSection";
import ProjectSearch from "@/components/projects/ProjectSearch";
import PageLead from "@/components/general/PageLead";
import FuturisticBackground from "@/components/general/FuturisticBackground";
import ProjectCategoryFilter from "@/components/projects/ProjectCategoryFilter";
import { PROJECT_CATEGORIES, type ProjectCategory } from "@/types/project.types";
import { absoluteSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const projectsDescription =
  "Jelajahi project website dan aplikasi yang dibuat Muhammad Ulil Azmi menggunakan teknologi web modern.";

export const metadata: Metadata = {
  title: "Projects",
  description: projectsDescription,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: absoluteSiteUrl("/projects"),
    siteName: "Portofolio Muhammad Ulil Azmi",
    title: "Projects | Portofolio Muhammad Ulil Azmi",
    description: projectsDescription,
    images: [
      {
        url: absoluteSiteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Project Muhammad Ulil Azmi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Portofolio Muhammad Ulil Azmi",
    description: projectsDescription,
    images: [absoluteSiteUrl("/opengraph-image")],
  },
};

interface ProjectsPageProps {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function Projects({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const searchTerm = params.search?.trim() ?? "";
  const category = PROJECT_CATEGORIES.some((item) => item.value === params.category)
    ? (params.category as ProjectCategory)
    : "";

  return (
    <main className="relative overflow-hidden pt-18 bg-slate-950 text-slate-100">
      <FuturisticBackground show3D={false} />
      <PageLead
        eyebrow="Selected work"
        title="Small experiments, real problems, and lessons that stick."
        description="A collection of websites and product ideas built while learning how design, code, and useful functionality come together."
      />
      <ProjectSearch searchTerm={searchTerm} category={category} />
      <ProjectCategoryFilter category={category} searchTerm={searchTerm} />
      <ProjectSection searchTerm={searchTerm} category={category} heading="All Projects" />
    </main>
  );
}