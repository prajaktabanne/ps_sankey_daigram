import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// //local imports
import en from "./locales/en.json";
import sv from "./locales/sv.json";

let language = localStorage.getItem("language");

if (language === undefined) {
  language = "en";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translations: en },
    sv: { translations: sv },
  },
  fallbackLng: "en",
  lng: "en",
  // debug only when not in production
  debug: process.env.NODE_ENV !== "production",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
});

export default i18n;
