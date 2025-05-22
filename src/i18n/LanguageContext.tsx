
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { es } from './es';

// Default language is Spanish
const defaultLanguage = 'es';

// Define available languages
const languages = {
  es
};

type Languages = typeof languages;
type LanguageKeys = keyof Languages;

interface LanguageContextType {
  language: LanguageKeys;
  t: Languages['es'];
  setLanguage: (lang: LanguageKeys) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  t: languages[defaultLanguage],
  setLanguage: () => {}
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageKeys>(defaultLanguage);
  
  const value = {
    language,
    t: languages[language],
    setLanguage: (lang: LanguageKeys) => {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
