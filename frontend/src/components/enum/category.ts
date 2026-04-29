import i18next from "i18next";

export const CategoryEnum = {
    ALL: "all",
    MAN: "man",
    WOMAN: "woman",
    CHILD: "child",
} as const;


export const getCategoriesLabels = () => {
    const labels = Object.values(CategoryEnum).map((category) => {
        return i18next.t(`categories.${category}`);
    });

    return labels;
};