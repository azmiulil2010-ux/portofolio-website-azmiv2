"use client";

import { LuDownload, LuMenu, LuMoon, LuSun } from "react-icons/lu";
import LinkButton from "../LinkButton";
import Logo from "./Logo";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { navLinks } from "./navLinks";
import { useActiveSection } from "./useActiveSection";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { activeSection, setActiveSectionManual } = useActiveSection();

  const isLinkActive = (section: string) => {
    if (pathname === "/") {
      return activeSection === section;
    }
    return pathname.startsWith(`/${section}`);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize and synchronize theme across all pages
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const isDark = savedTheme ? savedTheme === "dark" : true;

    setIsDarkMode(isDark);
    const themeStr = isDark ? "dark" : "light";
    document.documentElement.dataset.theme = themeStr;
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    const themeStr = nextTheme ? "dark" : "light";
    document.documentElement.dataset.theme = themeStr;
    if (nextTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    window.localStorage.setItem("theme", themeStr);
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <nav
      className={`site-navbar hero-anim-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "h-16 border-b border-orange-500/20 bg-slate-950/90 dark:bg-slate-950/95 shadow-md shadow-black/20 backdrop-blur-xl"
          : "h-20 border-b border-transparent bg-slate-950/40 dark:bg-slate-950/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-full w-[92%] max-w-7xl items-center justify-between">
        {/* LOGO */}
        <Logo />

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-100/90 p-1.5 shadow-inner backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 lg:flex">
          {navLinks.map((link) => {
            const active = isLinkActive(link.section);
            return (
              <li key={link.url}>
                <Link
                  href={link.url}
                  onClick={(e) => handleNavClick(e, link.section)}
                  className={`nav-pill-link relative rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    active
                      ? "is-active bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30"
                      : "text-slate-700 hover:text-orange-600 hover:bg-orange-100/80 dark:text-slate-300 dark:hover:text-orange-400 dark:hover:bg-slate-800/90"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute bottom-0 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_#fff]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
            title={isDarkMode ? "Mode terang" : "Mode gelap"}
            className="theme-toggle grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-800 shadow-sm transition-all duration-300 hover:border-orange-500 hover:text-orange-600 hover:scale-105 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/90 dark:text-orange-400 dark:hover:border-orange-500/60"
          >
            {isDarkMode ? <LuSun size={19} /> : <LuMoon size={19} />}
          </button>

          <div className="hidden lg:block">
            <LinkButton
              href="/cv.png"
              text="Download CV"
              download="CV-Muhammad-Ulil-Azmi.png"
              icon={LuDownload}
              iconPosition="left"
              rounded={true}
            />
          </div>

          <button
            type="button"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Buka menu navigasi"
            className="mobile-menu-toggle grid h-10 w-10 place-items-center rounded-xl border border-slate-300 bg-white text-slate-800 shadow-sm transition-all hover:border-orange-500 hover:text-orange-600 dark:border-slate-800 dark:bg-slate-900/90 dark:text-white lg:hidden"
          >
            <LuMenu size={24} />
          </button>
        </div>

        <MobileNav
          navOpen={navOpen}
          setNavOpen={setNavOpen}
          activeSection={activeSection}
          setActiveSectionManual={setActiveSectionManual}
        />
      </div>
    </nav>
  );
}