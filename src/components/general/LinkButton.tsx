import Link from "next/link";
import { IconType } from "react-icons";

interface LinkButtonProps {
  href: string;
  text: string;
  icon?: IconType;
  iconPosition?: "right" | "left";
  rounded?: boolean;
  download?: boolean | string;
  className?: string;

  // aos Animation
  animate?: boolean;
  aosType?: string;
  aosDelay?: number;
}

export default function LinkButton({
  href,
  text,
  icon: Icon,
  iconPosition = "left",
  rounded = true,
  download = false,
  className = "",
  animate = false,
  aosType = "fade-up",
  aosDelay = 0,
}: LinkButtonProps) {
  return (
    <Link
      {...(animate && {
        "data-aos": aosType,
        "data-aos-delay": aosDelay,
      })}
      href={href}
      download={download}
      aria-label={text}
      className={`brand-action group relative inline-flex items-center justify-center gap-2.5 overflow-hidden ${
        rounded ? "rounded-full" : "rounded-xl"
      } border border-orange-400/40 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 px-5 py-2 sm:px-6 sm:py-2.5 font-bold text-xs sm:text-sm tracking-wider uppercase text-white shadow-[0_4px_16px_rgba(255,98,0,0.35)] backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.04] hover:border-orange-300 hover:shadow-[0_8px_28px_rgba(255,98,0,0.55),0_0_12px_rgba(245,158,11,0.4)] active:scale-[0.97] active:shadow-[0_2px_8px_rgba(255,98,0,0.3)] select-none cursor-pointer ${className}`}
    >
      {/* Top Glassmorphic Specular Highlight Line */}
      <span
        className="pointer-events-none absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent"
        aria-hidden="true"
      />

      {/* Light Flare Sweep Shimmer Effect on Hover */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-[130%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[130%]"
        aria-hidden="true"
      />

      {/* Left Icon with Micro-bounce & capsule highlight */}
      {Icon && iconPosition === "left" && (
        <span className="relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-xs transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
          <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white transition-transform duration-300 group-hover:translate-y-0.5" />
        </span>
      )}

      {/* Button Text */}
      <span className="relative z-10 font-extrabold tracking-wider text-white drop-shadow-xs">
        {text}
      </span>

      {/* Right Icon */}
      {Icon && iconPosition === "right" && (
        <span className="relative flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-xs transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
          <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white transition-transform duration-300 group-hover:translate-y-0.5" />
        </span>
      )}
    </Link>
  );
}

