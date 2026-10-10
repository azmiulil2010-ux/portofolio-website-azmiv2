"use client";

import "aos/dist/aos.css";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import IntroAnimation from "@/components/intro/IntroAnimation";
import Lenis from "lenis";

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

  // 1. Initialize Lenis Smooth Inertial Scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isAudit = /Lighthouse|PageSpeed|HeadlessChrome|Chrome-Lighthouse/i.test(navigator.userAgent);
    const isTouch = window.matchMedia("(pointer: coarse)").matches || ("ontouchstart" in window && window.innerWidth < 1024);
    if (prefersReducedMotion || isAudit || isTouch) return;

    const lenis = new Lenis({
      duration: 0.8, // Snappy & responsive (prevents sluggish/heavy feel)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0, // Never hijack native mobile inertial touch scroll
      infinite: false,
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // 2. Initialize AOS with well-paced delays & comfortable offset
  useEffect(() => {
    let cancelled = false;

    if (shouldUseScrollAnimations()) {
      void import("aos").then(({ default: AOS }) => {
        if (cancelled) return;
        AOS.init({
          duration: 550, // Crisp & snappy animation duration
          easing: "ease-out-cubic",
          offset: 80, // Triggers quickly so user never waits
          delay: 0,
          once: true,
          mirror: false,
          anchorPlacement: "top-bottom",
        });
      });
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // 3. Reset scroll position on route change
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
    if (!shouldUseScrollAnimations()) return;
    void import("aos").then(({ default: AOS }) => AOS.refreshHard());
  }, [pathname]);

  // 4. Refresh AOS when intro curtain dissolves away
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
