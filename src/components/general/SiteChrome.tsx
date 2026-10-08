"use client";

import { usePathname } from "next/navigation";
import AnimationLayout from "../../../layouts/AnimationLayout";
import Footer from "./Footer";
import ScrollTopButton from "./ScrollTopButton";
import Navbar from "./navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CustomCursor from "./CustomCursor";

const staticRoutes = new Set(["/", "/about", "/services", "/contact", "/projects", "/skills"]);

function isValidPortfolioRoute(pathname: string) {
  const normalizedPath = pathname.replace(/\/$/, "") || "/";

  if (staticRoutes.has(normalizedPath)) {
    return true;
  }

  const projectId = normalizedPath.match(/^\/projects\/([^/]+)$/)?.[1];
  return projectId !== undefined && projectId.length > 0;
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
      <CustomCursor />
      <AnimationLayout skipIntro={skipSplash}>
        <Navbar />
        {children}
        <Footer />
        <ScrollTopButton />
      </AnimationLayout>
      <Toaster />
    </>
  );
}
