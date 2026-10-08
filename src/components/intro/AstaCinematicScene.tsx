"use client";

import Image from "next/image";
import { useState } from "react";
import AstaEmbersCanvas from "./AstaEmbersCanvas";

export type IntroPhase =
  | "loading"
  | "initial"
  | "focus"
  | "zoomOut"
  | "dissolving"
  | "complete";

interface AstaCinematicSceneProps {
  phase: IntroPhase;
  imageSrc?: string;
}

export default function AstaCinematicScene({
  phase,
  imageSrc = "/asta.webp",
}: AstaCinematicSceneProps) {
  const [imgSrc, setImgSrc] = useState(imageSrc);

  // Compute camera transforms based on cinematic phase
  const getCameraStyle = () => {
    switch (phase) {
      case "loading":
      case "initial":
        return {
          transform: "scale(2.35) translate3d(0, 8%, 0) rotate(0.6deg)",
          filter: "blur(8px) brightness(0.6)",
          opacity: 0,
          transition: "none",
        };
      case "focus":
        return {
          transform: "scale(2.2) translate3d(0, 6%, 0) rotate(0.4deg)",
          filter: "blur(0px) brightness(1.05)",
          opacity: 1,
          transition:
            "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease-out, filter 0.8s ease-out",
        };
      case "zoomOut":
        return {
          transform: "scale(1.0) translate3d(0, 0, 0) rotate(0deg)",
          filter: "blur(0px) brightness(1)",
          opacity: 1,
          transition:
            "transform 2.2s cubic-bezier(0.22, 1, 0.36, 1), filter 1.5s ease-out",
        };
      case "dissolving":
        return {
          transform: "scale(1.04) translate3d(0, -1%, 0)",
          filter: "blur(6px) brightness(1.2)",
          opacity: 0,
          transition:
            "transform 0.9s ease-out, opacity 0.85s ease-out, filter 0.85s ease-out",
        };
      case "complete":
      default:
        return {
          display: "none",
        };
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[110] flex items-center justify-center overflow-hidden bg-black select-none pointer-events-auto transition-opacity duration-700 ${
        phase === "dissolving" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-label="Opening Scene - Asta Black Clover"
      role="dialog"
      aria-modal="true"
    >
      {/* 1. Deep Atmospheric Dark Background & Ambient Glowing Aura */}
      <div className="absolute inset-0 bg-[#050508] z-0" />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,700px)] h-[min(90vw,700px)] rounded-full bg-radial from-rose-950/30 via-purple-950/20 to-transparent blur-[140px] pointer-events-none transition-opacity duration-1000 ${
          phase === "initial" ? "opacity-20" : "opacity-80"
        }`}
      />

      {/* 2. Anti-Magic Embers & Sparks */}
      <AstaEmbersCanvas
        active={phase !== "complete"}
        fading={phase === "dissolving"}
      />

      {/* 3. Main Camera Viewport (Holds Character Image & Lighting) */}
      <div
        style={getCameraStyle()}
        className="relative z-10 flex h-full w-full items-center justify-center will-change-transform"
      >
        {/* Character Image Container */}
        <div className="relative aspect-video h-full max-h-screen w-full max-w-[1920px] overflow-hidden">
          <Image
            src={imgSrc}
            alt="Asta - Black Clover Opening Scene"
            fill
            priority
            sizes="100vw"
            quality={95}
            onError={() => {
              // Fallback to asta.png if asta.webp fails or vice versa
              if (imgSrc.endsWith(".webp")) {
                setImgSrc("/asta.png");
              }
            }}
            className="h-full w-full object-cover object-[center_35%]"
          />

          {/* Cinematic Light Sweep / Flare */}
          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-rose-500/10 to-transparent transition-opacity duration-1000 ${
              phase === "zoomOut" ? "opacity-70" : "opacity-0"
            }`}
          />

          {/* Soft Fog/Smoke Layer */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </div>
      </div>

      {/* 4. Cinematic Vignette (Dark edges simulating optical lens) */}
      <div
        className="pointer-events-none absolute inset-0 z-30 bg-radial-[circle_at_center,transparent_45%,rgba(0,0,0,0.85)_100%]"
        aria-hidden="true"
      />

      {/* 5. Anamorphic Cinematic Letterbox Bars */}
      <div
        className={`pointer-events-none absolute top-0 inset-x-0 bg-black z-40 transition-all duration-1000 ease-out ${
          phase === "dissolving" ? "h-0" : "h-6 sm:h-10 md:h-14"
        }`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute bottom-0 inset-x-0 bg-black z-40 transition-all duration-1000 ease-out ${
          phase === "dissolving" ? "h-0" : "h-6 sm:h-10 md:h-14"
        }`}
        aria-hidden="true"
      />

      {/* 6. Cinematic Subtle Subtitle / Motto Overlay */}
      <div
        className={`pointer-events-none absolute bottom-10 sm:bottom-16 left-1/2 -translate-x-1/2 z-40 text-center transition-all duration-700 ease-out ${
          phase === "zoomOut"
            ? "opacity-90 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <p className="font-mono text-[0.65rem] sm:text-xs tracking-[0.35em] uppercase text-rose-300 drop-shadow-[0_2px_10px_rgba(244,63,94,0.6)]">
          // SURPASS YOUR LIMITS &bull; BLACK BULLS
        </p>
        <p className="mt-1 font-sans text-xs sm:text-sm font-semibold tracking-wider text-slate-300/80 italic">
          &ldquo;My magic is never giving up!&rdquo;
        </p>
      </div>
    </div>
  );
}
