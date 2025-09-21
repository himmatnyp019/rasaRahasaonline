// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your JSON translation files
import en from "./locales/en.json";
import ko from "./locales/ko.json";
import si from "./locales/sn.json";
import np from "./locales/np.json";

i18n
  .use(initReactI18next) 
  .init({
    resources: {
      en: { translation: en },
      ko: { translation: ko },
      si: { translation: si },
      np: { translation: np },
    },
    lng: "en", // Default language
    fallbackLng: "en", // Fallback language if translation not found
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
