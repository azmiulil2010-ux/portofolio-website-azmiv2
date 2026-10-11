"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export type IntroPhase =
  | "loading"
  | "active"
  | "dissolving"
  | "complete";

interface SimpleIntroSceneProps {
  phase: IntroPhase;
}

export default function SimpleIntroScene({ phase }: SimpleIntroSceneProps) {
  const [progress, setProgress] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    if (phase === "complete" || phase === "dissolving") {
      setProgress(100);
      return;
    }

    // Smooth counter from 0 to 100 over ~1.1s with natural deceleration
    const startTime = performance.now();
    const duration = 1100;

    let animId: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const linear = Math.min(1, elapsed / duration);
      // Gentle ease-out curve so progress decelerates smoothly towards 100%
      const ease = 1 - Math.pow(1 - linear, 2.5);
      const p = Math.min(100, Math.round(ease * 100));
      setProgress(p);

      if (elapsed < duration) {
        animId = requestAnimationFrame(updateProgress);
      }
    };

    animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  if (phase === "complete") return null;

  const isDissolving = phase === "dissolving";

  return (
    <div
      className={`fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[#070b14] select-none pointer-events-auto transition-all ${
        isDissolving
          ? "opacity-0 scale-[1.02] pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      style={{
        transitionDuration: "750ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      aria-label="Opening Scene"
      role="dialog"
      aria-modal="true"
    >
      {/* 1. Subtle warm radial glow in background */}
      <div
        className={`absolute w-[min(90vw,600px)] h-[min(90vw,600px)] rounded-full blur-[130px] pointer-events-none transition-all duration-700 ease-out ${
          isDissolving ? "opacity-0 scale-125" : "opacity-35 scale-100"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(255, 98, 0, 0.45) 0%, rgba(245, 158, 11, 0.2) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* 2. Minimalist Center Card with subtle upward float during dissolve */}
      <div
        className={`relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full transition-all duration-700 ease-out ${
          isDissolving ? "-translate-y-4 opacity-0 scale-95" : "translate-y-0 opacity-100 scale-100"
        }`}
      >
        {/* Top Minimalist Tag */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/35 bg-slate-900/80 px-3.5 py-1 text-[11px] font-mono tracking-widest uppercase text-orange-400 backdrop-blur-md shadow-md">
          <span
            className={`h-1.5 w-1.5 rounded-full shrink-0 ${
              progress === 100
                ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                : "bg-emerald-400 animate-ping"
            }`}
          />
          <span>Azmi.Dev • Portfolio</span>
        </div>

        {/* Name / Logo Typography */}
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-2">
          AZMI<span className="text-orange-500">.</span>DEV
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm font-medium text-slate-400 tracking-wide mb-8">
          {t("introSubtitle")}
        </p>

        {/* Minimalist Glowing Progress Bar */}
        <div className="w-full max-w-[260px] space-y-2.5">
          <div className="h-1.5 w-full bg-slate-800/90 rounded-full overflow-hidden border border-white/5 p-[0.5px]">
            <div
              className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_12px_rgba(255,98,0,0.85)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status info & Percentage counter */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-0.5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  progress === 100
                    ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                    : "bg-orange-400 animate-pulse"
                }`}
              />
              <span className={progress === 100 ? "text-emerald-400 font-semibold" : ""}>
                {progress < 100 ? t("introInitializing") : t("introReady")}
              </span>
            </span>
            <span
              className={`font-bold transition-colors duration-300 ${
                progress === 100 ? "text-emerald-400" : "text-orange-400"
              }`}
            >
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
