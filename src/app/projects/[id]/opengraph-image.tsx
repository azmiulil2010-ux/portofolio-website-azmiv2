import { ImageResponse } from "next/og";
import { getProjectById } from "@/components/projects/projectData";
import { PortfolioOgImage, ogImageSize } from "@/lib/og-image";
import { getSeoDescription } from "@/lib/seo";

export const alt = "Project Muhammad Ulil Azmi";
export const size = ogImageSize;
export const contentType = "image/png";

interface ProjectOpenGraphImageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectOpenGraphImage({
  params,
}: ProjectOpenGraphImageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  return new ImageResponse(
    <PortfolioOgImage
      label="PROJECT"
      title={project?.title || "Project Muhammad Ulil Azmi"}
      description={
        project?.description
          ? getSeoDescription(project.description)
          : "Karya pengembangan website dan aplikasi."
      }
    />,
    size
  );
}
