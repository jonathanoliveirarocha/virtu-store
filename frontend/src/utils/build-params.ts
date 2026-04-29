import { BuildParamsOptions } from "@/types/interfaces/BuildParamsOptions";
import { PRODUCTS_PER_PAGE } from "@/components/const";
import { CategoryEnum } from "@/components/enum/category";

export const buildParams = (
  url: string,
  {
    page = 1,
    search = "",
    category = CategoryEnum.ALL,
  }: BuildParamsOptions,
): string => {
  let queryString = `${url}?_page=${page}&_per_page=${PRODUCTS_PER_PAGE}`;

  if (category !== CategoryEnum.ALL) {
    queryString += `&category=${category}`;
  }

  if (search) {
    queryString += `&name:contains=${encodeURIComponent(search)}`;
  }

  return queryString;
};
