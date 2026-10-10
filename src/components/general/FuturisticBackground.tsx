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

      {/* 2. Floating Ambient Glow Orbs - Warm Orange & Amber Energy without heavy blur convolution */}
      <div
        className="ambient-glow ambient-glow-1 absolute -top-[10%] left-[10%] w-[460px] h-[460px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(249, 115, 22, 0.14) 0%, rgba(249, 115, 22, 0.04) 50%, transparent 70%)",
        }}
      />
      <div
        className="ambient-glow ambient-glow-2 absolute top-[40%] -right-[5%] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 158, 11, 0.13) 0%, rgba(245, 158, 11, 0.04) 50%, transparent 70%)",
        }}
      />
      <div
        className="ambient-glow ambient-glow-3 absolute -bottom-[10%] left-[25%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(234, 88, 12, 0.12) 0%, rgba(234, 88, 12, 0.03) 50%, transparent 70%)",
        }}
      />

      {/* 3. Interactive Particle Constellations */}
      <ParticleField />

      {/* 4. Floating 3D Geometric Objects */}
      {show3D && <Floating3DCanvas />}

      {/* 5. Vignette Overlay for Depth */}
      <div className="depth-vignette absolute inset-0 pointer-events-none" />
    </div>
  );
}
