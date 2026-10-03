import { ImageResponse } from "next/og";
import { PortfolioOgImage, ogImageSize } from "@/lib/og-image";

export const alt = "Project Muhammad Ulil Azmi";
export const size = ogImageSize;
export const contentType = "image/png";

export default function ProjectOpenGraphImage() {
  return new ImageResponse(<PortfolioOgImage />, size);
}
