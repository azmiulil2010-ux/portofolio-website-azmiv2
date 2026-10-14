"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { LANGUAGE_OPTIONS, Language } from "@/lib/i18n";
import { Globe, ChevronDown } from "lucide-react";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeOption = LANGUAGE_OPTIONS.find((opt) => opt.code === language) || LANGUAGE_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Switcher Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 px-2.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer"
        title="Ganti Bahasa / Change Language / 言語切替"
        aria-label="Pilih Bahasa"
      >
        <span className="text-sm">{activeOption.flag}</span>
        <span className="font-mono text-[11px] font-bold">{activeOption.label}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="language-dropdown-menu absolute right-0 mt-2 w-48 rounded-2xl border border-orange-500/30 bg-white/95 text-slate-800 dark:bg-slate-950/95 dark:text-slate-100 p-1.5 text-xs shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="language-dropdown-header px-2.5 py-1.5 text-[10px] font-mono font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase border-b border-slate-200 dark:border-slate-800">
            Language / 言語
          </div>
          <div className="mt-1 space-y-0.5">
            {LANGUAGE_OPTIONS.map((opt) => {
              const isSelected = opt.code === language;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => {
                    setLanguage(opt.code);
                    setIsOpen(false);
                  }}
                  className={`language-dropdown-item w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-left transition-all cursor-pointer ${
                    isSelected
                      ? "is-selected bg-orange-500/10 border border-orange-500/40 text-orange-600 font-bold dark:bg-gradient-to-r dark:from-orange-500/20 dark:to-amber-500/20 dark:border-orange-500/40 dark:text-orange-400"
                      : "text-slate-700 hover:bg-orange-50/80 hover:text-orange-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{opt.flag}</span>
                    <span className="text-xs font-semibold">{opt.nativeName}</span>
                  </div>
                  <span
                    className={`lang-code font-mono text-[10px] ${
                      isSelected
                        ? "text-orange-600 dark:text-orange-400 font-bold"
                        : "text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
