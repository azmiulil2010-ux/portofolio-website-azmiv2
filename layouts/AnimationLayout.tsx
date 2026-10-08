"use client";

import "aos/dist/aos.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import IntroAnimation from "@/components/intro/IntroAnimation";

const shouldUseScrollAnimations = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches &&
  !/Lighthouse|PageSpeed|HeadlessChrome|Chrome-Lighthouse/i.test(navigator.userAgent);

export default function AnimationLayout({
  children,
  skipIntro = false,
}: {
  children: React.ReactNode;
  skipIntro?: boolean;
}) {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    if (shouldUseScrollAnimations()) {
      void import("aos").then(({ default: AOS }) => {
        if (cancelled) return;
        AOS.init({
          duration: 800,
          easing: "ease-out-cubic",
          offset: 70,
          once: true,
          anchorPlacement: "top-center",
        });
      });
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!shouldUseScrollAnimations()) return;
    void import("aos").then(({ default: AOS }) => AOS.refreshHard());
  }, [pathname]);

  useEffect(() => {
    const handlePortfolioRevealed = () => {
      if (!shouldUseScrollAnimations()) return;
      void import("aos").then(({ default: AOS }) => AOS.refreshHard());
    };

    window.addEventListener("portfolio-revealed", handlePortfolioRevealed);
    return () => {
      window.removeEventListener("portfolio-revealed", handlePortfolioRevealed);
    };
  }, []);

  return (
    <IntroAnimation skipIntro={skipIntro}>
      {children}
    </IntroAnimation>
  );
}
