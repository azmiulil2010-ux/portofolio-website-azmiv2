"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Language, TRANSLATIONS, LANGUAGE_OPTIONS } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS.id) => any;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "id",
  setLanguage: () => {},
  t: (key) => TRANSLATIONS.id[key],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_lang") as Language;
    if (saved && (saved === "id" || saved === "en" || saved === "ja")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio_lang", lang);
      window.dispatchEvent(new CustomEvent("languagechange", { detail: lang }));
    }
  }, []);

  const t = useCallback(
    (key: keyof typeof TRANSLATIONS.id) => {
      const currentDict = TRANSLATIONS[language] || TRANSLATIONS.id;
      return currentDict[key] ?? TRANSLATIONS.id[key] ?? "";
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
