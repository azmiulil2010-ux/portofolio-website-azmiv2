"use client";

import Link from "next/link";
import { navLinks } from "./navLinks";
import LinkButton from "../LinkButton";
import { LuDownload, LuX } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import LanguageSwitcher from "../LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

interface MobileNavProps {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeSection: string;
  setActiveSectionManual: (section: string) => void;
}

export default function MobileNav({
  navOpen,
  setNavOpen,
  activeSection,
  setActiveSectionManual,
}: MobileNavProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navLabelMap: Record<string, string> = {
    home: t("navHome"),
    about: t("navAbout"),
    services: t("navServices"),
    skills: t("navSkills"),
    projects: t("navProjects"),
    contact: t("navContact"),
  };

  const isLinkActive = (section: string) =>
    pathname === "/" ? activeSection === section : pathname.startsWith(`/${section}`);

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    setNavOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      setActiveSectionManual(section);

      const win = typeof window !== "undefined" ? (window as unknown as { __lenis?: { scrollTo: (target: string | number, options?: { offset?: number; duration?: number }) => void } }) : null;

      if (section === "home") {
        if (win?.__lenis) {
          win.__lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        window.history.pushState(null, "", "/");
        return;
      }

      const targetEl = document.getElementById(section);
      if (targetEl) {
        if (win?.__lenis) {
          win.__lenis.scrollTo(`#${section}`, { offset: -72, duration: 1.2 });
        } else {
          const navHeight = 72;
          const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - navHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
        window.history.pushState(null, "", `/#${section}`);
      }
    }
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (navOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [navOpen]);

  const panelTransform = navOpen ? "translate-x-0" : "translate-x-full";
  const backdropVisibility = navOpen
    ? "pointer-events-auto opacity-60"
    : "pointer-events-none opacity-0";

  return (
    <>
      <div
        onClick={() => setNavOpen(false)}
        className={`mobile-nav-backdrop fixed inset-0 z-55 h-screen w-full bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ease-out ${backdropVisibility} lg:hidden`}
      />
      <ul
        aria-label="Menu navigasi mobile"
        data-state={navOpen ? "open" : "closed"}
        className={`mobile-sidebar fixed right-0 top-0 z-60 flex h-dvh w-[82%] sm:w-[65%] transform flex-col items-center justify-start gap-2 overflow-y-auto overscroll-contain border-l border-orange-500/30 bg-white/95 text-slate-900 shadow-2xl backdrop-blur-2xl transition-transform duration-500 ease-out dark:border-orange-500/20 dark:bg-slate-950/95 dark:text-white ${panelTransform} lg:hidden px-6 pb-8 pt-24`}
      >
        <button
          type="button"
          onClick={() => setNavOpen(false)}
          aria-label="Tutup menu navigasi"
          className="mobile-sidebar-close absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-slate-100 text-slate-800 transition-colors hover:border-orange-500 hover:text-orange-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-white dark:hover:border-orange-400"
        >
          <LuX size={24} aria-hidden="true" />
        </button>

        {navLinks.map((link) => {
          const active = isLinkActive(link.section);
          return (
            <li key={link.url} className="w-full">
              <Link
                onClick={(e) => handleMobileNavClick(e, link.section)}
                href={link.url}
                className={`mobile-nav-link flex w-full items-center justify-between rounded-xl border px-5 py-3.5 text-base font-bold transition-all duration-300 ${
                  active
                    ? "is-active border-orange-500 bg-orange-500 text-white shadow-md shadow-orange-500/25"
                    : "border-slate-200 bg-slate-50 text-slate-800 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-200 dark:hover:border-orange-500/40 dark:hover:bg-slate-900"
                }`}
              >
                <span>{navLabelMap[link.section] || link.label}</span>
                {active && (
                  <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" />
                )}
              </Link>
            </li>
          );
        })}

        <div className="mt-4 w-full flex flex-col items-center gap-3">
          <div className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Language:</span>
            <LanguageSwitcher />
          </div>

          <LinkButton
            href="/cv.png"
            text={t("downloadCv")}
            download="CV-Muhammad-Ulil-Azmi.png"
            icon={LuDownload}
            iconPosition="left"
            rounded={true}
            className="w-full max-w-[280px] py-3 text-sm justify-center"
          />
        </div>
      </ul>
    </>
  );
}