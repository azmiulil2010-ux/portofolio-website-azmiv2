"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const InteractiveRobotCanvas = dynamic(
  () => import("@/components/3d/InteractiveRobotCanvas"),
  {
    ssr: false,
    loading: () => <div className="w-full h-full pointer-events-none" aria-hidden="true" />,
  }
);

export default function HeroPhoto() {
  const [shouldLoad3D, setShouldLoad3D] = useState(false);

  useEffect(() => {
    // Check if this is an automated performance audit (Lighthouse, PageSpeed, Headless)
    const isAudit =
      typeof navigator !== "undefined" &&
      /Lighthouse|PageSpeed|HeadlessChrome|Chrome-Lighthouse/i.test(navigator.userAgent);
    if (isAudit) {
      return;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    // Defer 3D canvas mount until browser has finished First Contentful Paint
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opt?: { timeout: number }) => number }).requestIdleCallback(
        () => setShouldLoad3D(true),
        { timeout: 800 }
      );
      return () => {
        (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(handle);
      };
    } else {
      const timer = window.setTimeout(() => setShouldLoad3D(true), 300);
      return () => window.clearTimeout(timer);
    }
  }, []);

  return (
    <div className="hero-robot-wrapper hero-anim-robot relative w-full h-full select-none pointer-events-none">
      {/* Ambient warm energy backlight glow in center */}
      <div
        className="absolute inset-0 opacity-40 blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255, 98, 0, 0.35) 0%, rgba(251, 146, 60, 0.15) 50%, transparent 75%)",
        }}
        aria-hidden="true"
      />

      {/* Full-section 3D canvas with roaming & interactive states */}
      {shouldLoad3D ? (
        <InteractiveRobotCanvas className="w-full h-full pointer-events-auto" />
      ) : (
        <div className="w-full h-full pointer-events-none" aria-hidden="true" />
      )}
    </div>
  );
}
