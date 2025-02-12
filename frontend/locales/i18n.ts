// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en.json';  // English translations
import ar from './ar.json';  // Arabic translations
import tr from './tr.json';  // Turkish translations
import es from './es.json';  // Spanish translations

i18n
  .use(LanguageDetector) // Detect language from browser or user settings
  .use(initReactI18next) // Connects React with i18next
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      tr: { translation: tr },
      es: { translation: es },
    },
    fallbackLng: 'en', // Default language if detection fails
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    react: {
      useSuspense: false, // Allows for asynchronous loading of translations
    },
  });

export default i18n;
