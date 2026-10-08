"use client";

import dynamic from "next/dynamic";
import ParticleField from "./ParticleField";

// Dynamic import for Three.js floating canvas to avoid SSR issues
const Floating3DCanvas = dynamic(
  () => import("@/components/3d/Floating3DCanvas"),
  { ssr: false }
);

interface FuturisticBackgroundProps {
  show3D?: boolean;
}

export default function FuturisticBackground({
  show3D = true,
}: FuturisticBackgroundProps) {
  return (
    <div
      className="futuristic-background-root absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* 1. Cyber Grid Layer with smooth radial mask */}
      <div className="cyber-grid absolute inset-0 opacity-[0.14]" />

      {/* 2. Floating Ambient Glow Orbs - Warm Orange & Amber Energy */}
      <div className="ambient-glow ambient-glow-1 absolute -top-[10%] left-[10%] w-[420px] h-[420px] rounded-full bg-orange-500/15 blur-[120px]" />
      <div className="ambient-glow ambient-glow-2 absolute top-[40%] -right-[5%] w-[480px] h-[480px] rounded-full bg-amber-500/15 blur-[130px]" />
      <div className="ambient-glow ambient-glow-3 absolute -bottom-[10%] left-[25%] w-[450px] h-[450px] rounded-full bg-orange-600/12 blur-[140px]" />

      {/* 3. Interactive Particle Constellations */}
      <ParticleField />

      {/* 4. Floating 3D Geometric Objects */}
      {show3D && <Floating3DCanvas />}

      {/* 5. Vignette Overlay for Depth */}
      <div className="depth-vignette absolute inset-0 pointer-events-none" />
    </div>
  );
}
