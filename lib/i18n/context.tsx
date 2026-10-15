"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SupportedLocale, SUPPORTED_LANGUAGES, LanguageMeta } from "./types";
import { DICTIONARIES } from "./dictionaries";

interface LanguageContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string, fallback?: string) => string;
  languages: LanguageMeta[];
  currentLanguage: LanguageMeta;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "ritvya_preferred_language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLocale | null;
      if (saved && DICTIONARIES[saved]) {
        setLocaleState(saved);
      }
    } catch {
      // Ignore local storage error
    }
  }, []);

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    } catch {
      // Ignore local storage error
    }
  };

  const t = (key: string, fallback?: string): string => {
    const dict = DICTIONARIES[locale] || DICTIONARIES.en;
    if (dict && dict[key]) {
      return dict[key];
    }
    // Fallback to English
    if (DICTIONARIES.en[key]) {
      return DICTIONARIES.en[key];
    }
    return fallback || key;
  };

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === locale) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
        languages: SUPPORTED_LANGUAGES,
        currentLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return safe fallback for components rendered outside provider (e.g. tests)
    return {
      locale: "en",
      setLocale: () => {},
      t: (key: string, fallback?: string) => DICTIONARIES.en[key] || fallback || key,
      languages: SUPPORTED_LANGUAGES,
      currentLanguage: SUPPORTED_LANGUAGES[0],
    };
  }
  return context;
}
