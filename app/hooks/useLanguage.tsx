"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: any) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState<any>(null);
  const [translationsForm, setTranslationsForm] = useState<any>(null);


  const setFolder = async (folder: string) => {
    const res = await fetch(`/${folder}/${language}.json`);
    const data = await res.json();
    if(folder === "homeLang"){
        setTranslations(data);
    }else if(folder === "formLang"){
        setTranslationsForm(data);
    }
  };

  useEffect(() => {
    setFolder("formLang");
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, translations, translationsForm, setFolder }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);
