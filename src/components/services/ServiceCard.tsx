"use client";

import type { IconType } from "react-icons";
import TiltCard from "@/components/ui/TiltCard";

interface ServiceCardProps {
  icon: IconType;
  name: string;
  description: string;
  accent?: string;
  iconAccent?: string;
  number?: string;
}

export default function ServiceCard({
  icon: Icon,
  name,
  description,
  accent = "from-cyan-500/20 to-indigo-500/20",
  iconAccent = "border-cyan-400/30 bg-cyan-950/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]",
  number,
}: ServiceCardProps) {
  return (
    <TiltCard maxTilt={8} scale={1.02} glare={true} className="h-full">
      <div className="service-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 sm:p-7 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-900/80 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]">
        {/* Subtle top glow highlight */}
        <div
          className={`pointer-events-none absolute -top-24 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-gradient-to-b ${accent} blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-40`}
          aria-hidden="true"
        />

        {/* Number indicator */}
        {number && (
          <span className="absolute top-4 right-5 font-mono text-3xl font-black text-slate-800/40 transition-colors duration-300 group-hover:text-cyan-400/15 select-none" aria-hidden="true">
            {number}
          </span>
        )}

        <div>
          {/* Icon badge */}
          <div className={`mb-5 inline-grid h-14 w-14 place-items-center rounded-xl border ${iconAccent} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
            <Icon size={26} className="transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
          </div>

          <h3 className="mb-3 text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-300 md:text-2xl">
            {name}
          </h3>

          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            {description}
          </p>
        </div>

        {/* Bottom accent indicator */}
        <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
          <span>Professional Service</span>
        </div>

        {/* Animated bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent transition-all duration-500 group-hover:via-cyan-400/60" aria-hidden="true" />
      </div>
    </TiltCard>
  );
}