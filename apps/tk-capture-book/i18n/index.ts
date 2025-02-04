import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./locales/en";
import { ko } from "./locales/ko";

const resources = {
  ko,
  en,
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en", // fallback to English if translation is missing
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
