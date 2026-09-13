"use client";

import { usePathname } from "next/navigation";
import AnimationLayout from "../../../layouts/AnimationLayout";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import Navbar from "./navbar/Navbar";
import { projects } from "../projects/projectData";
import { Toaster } from "react-hot-toast";

const staticRoutes = new Set(["/", "/about", "/contact", "/projects", "/skills"]);

function isValidPortfolioRoute(pathname: string) {
  const normalizedPath = pathname.replace(/\/$/, "") || "/";

  if (staticRoutes.has(normalizedPath)) {
    return true;
  }

  const projectId = normalizedPath.match(/^\/projects\/([^/]+)$/)?.[1];
  return projectId !== undefined && projects.some((project) => project.id === projectId);
}

export default function SiteChrome({
  children,
  skipSplash,
}: {
  children: React.ReactNode;
  skipSplash: boolean;
}) {
  const pathname = usePathname();

  if (!isValidPortfolioRoute(pathname)) {
    return children;
  }

  return (
    <>
      <Navbar />
      <AnimationLayout skipIntro={skipSplash}>{children}</AnimationLayout>
      <Footer />
      <ScrollTopButton />
      <Toaster />
    </>
  );
}
