"use client";

import { LuFastForward } from "react-icons/lu";

interface SkipButtonProps {
  onSkip: () => void;
  visible?: boolean;
}

export default function SkipButton({ onSkip, visible = true }: SkipButtonProps) {
  return (
    <button
      type="button"
      onClick={onSkip}
      aria-label="Lewati opening animation"
      className={`skip-intro-btn group fixed bottom-6 right-6 z-[120] flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/70 px-4 py-2 text-xs font-semibold tracking-wider text-slate-300 shadow-xl backdrop-blur-xl transition-all duration-400 ease-out hover:scale-105 hover:border-orange-500/50 hover:bg-slate-900/90 hover:text-white hover:shadow-[0_0_25px_rgba(255,98,0,0.35)] active:scale-95 cursor-pointer ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <span className="uppercase text-[0.7rem] tracking-widest font-mono">
        Skip Intro
      </span>
      <LuFastForward
        size={14}
        className="text-orange-400 transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </button>
  );
}
