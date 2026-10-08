"use client";

import { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

export default function ScrollTopButton() {
  const [showButton, setShowButton] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    const toggleVisibility = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        const shouldShow = window.scrollY > 300;
        setShowButton((current) => current === shouldShow ? current : shouldShow);
        
        // Calculate scroll percentage
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const percent = docHeight > 0 ? Math.min((window.scrollY / docHeight) * 100, 100) : 0;
        setScrollPercent(percent);
      });
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG circle progress calculations
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Kembali ke atas"
      className={`scroll-top-button group fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full border border-cyan-400/30 bg-slate-900/90 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)] backdrop-blur-md transition-all duration-500 hover:border-cyan-400 hover:bg-cyan-950/90 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-110 ${
        showButton
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      {/* Progress ring */}
      <svg
        className="absolute inset-0 -rotate-90 pointer-events-none"
        width="48"
        height="48"
        viewBox="0 0 48 48"
      >
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="rgba(6, 182, 212, 0.15)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="rgba(6, 182, 212, 0.6)"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>
      <LuArrowUp size={18} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
