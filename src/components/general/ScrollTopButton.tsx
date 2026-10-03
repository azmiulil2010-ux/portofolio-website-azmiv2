"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let animationFrame = 0;

    const toggleVisibility = () => {
      if (animationFrame) return;

      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        const shouldShow = window.scrollY > 300;
        setShowButton((current) => current === shouldShow ? current : shouldShow);
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
        top:0,
        behavior:"smooth"
    })
  }
  return (
    <>
    {showButton && (
        <button onClick={scrollToTop} aria-label="Kembali ke atas" className="scroll-top-button w-12 h-12 bg-slate-800 cursor-pointer text-white rounded-full grid place-items-center fixed bottom-4 right-4">
      <FaArrowUp />
    </button>
    )}
    </>
  );
}
