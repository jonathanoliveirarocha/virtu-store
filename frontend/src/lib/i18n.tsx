import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import de from "./locales/de.json";
import en from "./locales/en-US.json";
import es from "./locales/es.json";
import fr_FR from "./locales/fr-FR.json";
import pt_BR from "./locales/pt-BR.json";
import ru from "./locales/ru.json";

const resources = {
  en,
  "pt-BR": pt_BR,
  pt: pt_BR,
  "fr-FR": fr_FR,
  es,
  ru,
  de,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,

    fallbackLng: "pt-BR",

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
  });

export default i18n;
