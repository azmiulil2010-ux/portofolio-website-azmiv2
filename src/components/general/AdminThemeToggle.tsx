"use client";

import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

interface AdminThemeToggleProps {
  className?: string;
}

export default function AdminThemeToggle({ className = "" }: AdminThemeToggleProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const darkMode = savedTheme ? savedTheme === "dark" : prefersDark;

    setIsDarkMode(darkMode);
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDarkMode;
    setIsDarkMode(nextTheme);
    document.documentElement.dataset.theme = nextTheme ? "dark" : "light";
    window.localStorage.setItem("theme", nextTheme ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Aktifkan mode terang" : "Aktifkan mode malam"}
      title={isDarkMode ? "Mode terang" : "Mode malam"}
      className={`admin-theme-toggle grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-700 bg-slate-800 text-slate-200 transition-colors hover:border-cyan-500 hover:text-cyan-500 ${className}`}
    >
      {isDarkMode ? <LuSun size={18} aria-hidden="true" /> : <LuMoon size={18} aria-hidden="true" />}
    </button>
  );
}