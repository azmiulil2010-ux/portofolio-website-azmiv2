import { ImageResponse } from "next/og";
import { PortfolioOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Portofolio Muhammad Ulil Azmi";
export const size = ogImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <PortfolioOgImage
      label="PERSONAL WEBSITE"
      title="Portofolio Muhammad Ulil Azmi"
      description="Project, skill, dan pengalaman dalam pengembangan website dan aplikasi."
    />,
    size
  );
}
