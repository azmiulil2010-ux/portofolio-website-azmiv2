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
    // Cache section layout positions to eliminate layout thrashing during scroll
    let sectionMetrics: { id: string; top: number; bottom: number }[] = [];

    const measureSections = () => {
      sectionMetrics = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          return {
            id,
            top,
            bottom: top + rect.height,
          };
        })
        .filter((item): item is { id: string; top: number; bottom: number } => item !== null);
    };

    measureSections();

    const computeActiveSection = () => {
      if (isManualLockRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. Near the very top of page -> always "home"
      if (scrollY < 100) {
        setActiveSection("home");
        return;
      }

      // 2. Near bottom of page -> always "contact"
      if (scrollY + windowHeight >= docHeight - 60) {
        setActiveSection("contact");
        return;
      }

      // 3. Focal line at ~35% viewport height
      const targetY = scrollY + windowHeight * 0.35;

      for (const section of sectionMetrics) {
        if (targetY >= section.top && targetY < section.bottom) {
          setActiveSection(section.id);
          return;
        }
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

    let resizeTimer: number;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measureSections();
        computeActiveSection();
      }, 200);
    };

    const handleHashChange = () => {
      const nextSection = window.location.hash.replace("#", "");
      if (sectionIds.includes(nextSection)) {
        setActiveSectionManual(nextSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("hashchange", handleHashChange);
      if (lockTimeoutRef.current) {
        clearTimeout(lockTimeoutRef.current);
      }
    };
  }, []);

  return { activeSection, setActiveSectionManual };
}