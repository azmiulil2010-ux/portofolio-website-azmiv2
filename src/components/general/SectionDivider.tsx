"use client";

interface SectionDividerProps {
  variant?: "glow" | "wave" | "gradient";
  className?: string;
}

export default function SectionDivider({
  variant = "glow",
  className = "",
}: SectionDividerProps) {
  if (variant === "wave") {
    return (
      <div className={`section-divider relative w-full h-16 sm:h-20 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
        >
          <path
            d="M0,40 C200,10 400,70 600,40 C800,10 1000,70 1200,40 L1200,80 L0,80 Z"
            fill="url(#wave-gradient)"
            opacity="0.12"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff6200" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent" />
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className={`section-divider relative w-full py-6 flex items-center justify-center ${className}`} aria-hidden="true">
        <div className="flex items-center gap-3 w-[80%] max-w-2xl">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
          <div className="flex gap-1.5">
            <span className="h-1 w-1 rounded-full bg-orange-500/50" />
            <span className="h-1 w-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-400" />
            <span className="h-1 w-1 rounded-full bg-amber-400/50" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </div>
      </div>
    );
  }

  // Default: glow variant
  return (
    <div className={`section-divider relative w-full h-8 pointer-events-none ${className}`} aria-hidden="true">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-lg h-px bg-gradient-to-r from-transparent via-orange-500/35 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] max-w-sm h-4 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent blur-xl rounded-full" />
    </div>
  );
}
