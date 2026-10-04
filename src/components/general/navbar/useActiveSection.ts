"use client";

import { useEffect, useState } from "react";

const sectionIds = ["home", "about", "skills", "projects", "contact"];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let currentHashSection = window.location.hash.replace("#", "");
    let hashNavigationActive = sectionIds.includes(currentHashSection);

    if (hashNavigationActive) {
      setActiveSection(currentHashSection);
    }

    const handleHashChange = () => {
      const nextSection = window.location.hash.replace("#", "");
      currentHashSection = nextSection;

      if (sectionIds.includes(nextSection)) {
        hashNavigationActive = true;
        setActiveSection(nextSection);
      }
    };

    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const hashTarget = hashNavigationActive ? document.getElementById(currentHashSection) : null;

        if (hashNavigationActive && hashTarget) {
          const targetEntry = entries.find((entry) => entry.target === hashTarget);
          if (!targetEntry) {
            return;
          }

          const targetBounds = targetEntry.boundingClientRect;
          const targetIsVisible = targetBounds.top < window.innerHeight * 0.72 && targetBounds.bottom > window.innerHeight * 0.18;

          if (!targetIsVisible) {
            return;
          }

          hashNavigationActive = false;
        }

        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

        if (visibleSections[0]) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeSection;
}