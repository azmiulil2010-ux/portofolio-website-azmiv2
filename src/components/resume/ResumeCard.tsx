"use client";

import { IconType } from "react-icons";
import TiltCard from "@/components/ui/TiltCard";

interface ResumeCardProps {
  role: string;
  icon: IconType;
  date?: string;
  description: string;
}

export default function ResumeCard({
  role,
  icon: Icon,
  date,
  description,
}: ResumeCardProps) {
  return (
    <TiltCard maxTilt={5} scale={1.015} glare={true}>
      <div className="resume-card group relative flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 sm:p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-900/80 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]">
        {/* Futuristic Icon Badge */}
        <div className="resume-icon grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-950/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-400">
          <Icon className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:rotate-6" />
        </div>

        <div className="flex-1">
          {date && (
            <span className="mb-2.5 inline-block rounded-full border border-cyan-400/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 shadow-xs">
              {date}
            </span>
          )}
          <h3 className="text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-300 sm:text-xl">
            {role}
          </h3>
          <p className="mt-2.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
            {description}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}