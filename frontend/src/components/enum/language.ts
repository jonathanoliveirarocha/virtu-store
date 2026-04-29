export const LanguageEnum = {
    "pt-BR": "Português",
    "en": "English",
    "es": "Español",
    "fr-FR": "Français",
    "de": "Deutsch",
    "ru": "Русский",
} as const;


export const getLanguagesLabels = () => {
    const labels = Object.entries(LanguageEnum).map(([key, value]) => {
        return { code: key, label: value };
    });

    return labels;
};