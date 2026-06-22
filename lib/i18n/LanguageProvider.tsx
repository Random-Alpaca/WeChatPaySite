"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Dictionary, type Locale } from "./dictionaries";

const STORAGE_KEY = "wcp-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Restore persisted preference on mount.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "zh") {
      setLocaleState(stored);
    } else if (navigator.language?.toLowerCase().startsWith("zh")) {
      setLocaleState("zh");
    }
  }, []);

  // Keep <html lang> in sync and persist.
  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = (next: Locale) => setLocaleState(next);
  const toggleLocale = () =>
    setLocaleState((prev) => (prev === "en" ? "zh" : "en"));

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, toggleLocale, t: dictionaries[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
