"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  translations: any | null;
  translationsForm: any | null;
  setFolder: (folder: "homeLang" | "formLang") => Promise<void>;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize language from localStorage so selection persists across refreshes
  const [language, setLanguageState] = useState<string>(() => {
    try {
      return localStorage.getItem("language") || "en";
    } catch (err) {
      return "en";
    }
  });
  // wrapper setter that persists selection
  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch (err) {
      // ignore
    }
  }, []);
  const [translations, setTranslations] = useState<any | null>(null);
  const [translationsForm, setTranslationsForm] = useState<any | null>(null);

  // load folder helper - stable reference per language (depends on language)
  const setFolder = useCallback(
  async (folder: "homeLang" | "formLang") => {
      try {
  // Disable cache so developers can edit JSON and see immediate updates without restarting dev server
  const res = await fetch(`/${folder}/${language}.json`, { cache: "no-store" });
        if (!res.ok) {
          console.warn(`Failed to load ${folder}/${language}.json - ${res.status}`);
          return;
        }
        const data = await res.json();
        // Dev-time debug to confirm that the correct JSON is being loaded
        if (process.env.NODE_ENV === "development") {
          console.debug("[useLanguage] loaded", folder, language, data);
        }

        // Only update if data actually changed (simple JSON string compare)
        if (folder === "homeLang") {
          const prev = translations;
          const prevJson = prev ? JSON.stringify(prev) : null;
          const newJson = JSON.stringify(data);
          if (prevJson !== newJson) setTranslations(data);
        } else {
          const prev = translationsForm;
          const prevJson = prev ? JSON.stringify(prev) : null;
          const newJson = JSON.stringify(data);
          if (prevJson !== newJson) setTranslationsForm(data);
        }
      } catch (err) {
        console.error("setFolder error:", err);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language, translations, translationsForm] // keep these so update happens when language changes
  );

  // Preload both formLang and homeLang when language changes.
  useEffect(() => {
    // load both - provider ensures they are set
    setFolder("formLang");
    setFolder("homeLang");
    // We intentionally do not include translations/translationsForm here to avoid infinite loops.
    // setFolder is stable because of useCallback and depends on `language`.
  }, [language, setFolder]);

  // Sync DOM attributes so global CSS can target the current language.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      document.documentElement.lang = language;
      document.body.setAttribute("data-lang", language);
    } catch (err) {
      // ignore
    }
  }, [language]);

  // Memoize the context value so consumers don't rerender unnecessarily
  const value = useMemo(
    () => ({
      language,
      setLanguage,
      translations,
      translationsForm,
      setFolder,
    }),
    [language, translations, translationsForm, setFolder, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguageContext = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguageContext must be used within LanguageProvider");
  return ctx;
};
