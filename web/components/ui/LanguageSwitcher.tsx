"use client";

import { createContext, useContext, useState } from "react";

export type Language = "en" | "sw" | "guz";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

const labels: Record<Language, string> = {
  en: "EN",
  sw: "SW",
  guz: "GUZ",
};

const fullLabels: Record<Language, string> = {
  en: "English",
  sw: "Kiswahili",
  guz: "Ekegusii",
};

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`flex items-center gap-1 ${className ?? ""}`} role="group" aria-label="Language selector">
      {(["en", "sw", "guz"] as Language[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          aria-label={`Switch to ${fullLabels[l]}`}
          className={`text-xs tracking-widest px-2 py-1 transition-all duration-200 ${
            lang === l
              ? "text-[var(--accent-umber)] border-b border-[var(--accent-bronze)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
