import { getLanguagesLabels } from "@/components/enum/language";
import { useTranslation } from "react-i18next";
import globeIcon from "@/assets/icons/globe.svg";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const LANGUAGES = getLanguagesLabels();
  return (
    <div className="relative group/lang">
      <button className="flex items-center gap-1 bg-surface border border-border rounded-full py-2 px-3 text-xs font-medium text-text-secondary transition-all hover:border-accent hover:text-text-main cursor-pointer">
        <img src={globeIcon} alt="" className="w-3.5 h-3.5" />
        {i18n.language?.split('-')[0].toUpperCase() || "PT"}
      </button>
      <div className="absolute right-0 top-full w-32 bg-surface border border-border rounded-xl shadow-custom-lg opacity-0 pointer-events-none translate-y-2 transition-all duration-200 group-hover/lang:opacity-100 group-hover/lang:pointer-events-auto group-hover/lang:translate-y-0 overflow-hidden">
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            className={`w-full text-left px-4 py-2 text-xs transition-colors hover:bg-neutral-100 border-none bg-transparent cursor-pointer ${i18n.language === lang.code ? "font-bold text-accent" : "text-text-secondary"}`}
            onClick={() => i18n.changeLanguage(lang.code)}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>

  )
}

export default LanguageSelector;