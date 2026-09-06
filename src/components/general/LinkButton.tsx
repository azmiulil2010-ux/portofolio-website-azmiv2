import Link from "next/link";
import { IconType } from "react-icons";

interface LinkButtonProps {
  href: string;
  text: string;
  icon?: IconType;
  iconPosition: "right" | "left";
  rounded: boolean;
  download?: boolean;

  // aos Animation
  animate?: boolean;
  aosType?: string;
  aosDelay?: number;
}

export default function LinkButton({
  href,
  text,
  icon: Icon,
  iconPosition = "right",
  rounded,
  download = false,
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
      className={`px-8 py-3 bg-linear-to-r from-blue-900 to-purple-800 hover:from-blue-800 hover:to-purple-700 text-white font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] inline-flex itemscenter justify-center gap-2 ${rounded ? "rounded-full" : "rounded-lg"}`}
    >
      {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
      {text}
      {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
    </Link>
  );
}
