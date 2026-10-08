"use client";

import { useEffect, useRef, useState } from "react";

const sectionIds = ["home", "about", "services", "skills", "projects", "contact"];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");
  const isManualLockRef = useRef(false);
  const lockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setActiveSectionManual = (section: string) => {
    if (sectionIds.includes(section)) {
      setActiveSection(section);
      isManualLockRef.current = true;
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
      lockTimeoutRef.current = setTimeout(() => {
        isManualLockRef.current = false;
      }, 750);
    }
  };

  useEffect(() => {
    const computeActiveSection = () => {
      if (isManualLockRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. Near the very top of page -> always "home"
      if (scrollY < 120) {
        setActiveSection("home");
        return;
      }

      // 2. Near bottom of page -> always "contact"
      if (scrollY + windowHeight >= docHeight - 80) {
        setActiveSection("contact");
        return;
      }

      // 3. Focal point check: line at 36% down viewport where user naturally reads section titles
      const focalLine = windowHeight * 0.36;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Element boundary contains focal reading line
          if (rect.top <= focalLine && rect.bottom > focalLine) {
            setActiveSection(id);
            return;
          }
        }
      }

      // 4. Fallback: select section with highest visible pixel height in viewport
      let bestSection = "home";
      let maxCoverage = -1;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);

          if (visibleHeight > maxCoverage) {
            maxCoverage = visibleHeight;
            bestSection = id;
          }
        }
      }

      if (maxCoverage > 0) {
        setActiveSection(bestSection);
      }
    };

    computeActiveSection();

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          computeActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleHashChange = () => {
      const nextSection = window.location.hash.replace("#", "");
      if (sectionIds.includes(nextSection)) {
        setActiveSectionManual(nextSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
    };
  }, []);

  return { activeSection, setActiveSectionManual };
}
