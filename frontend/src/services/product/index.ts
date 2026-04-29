import { ApiMultipleResponse } from "@/types/interfaces/ApiMultipleResponse";
import { ApiSingleResponse } from "@/types/interfaces/ApiSingleResponse";
import { type ProductOutput } from "@/schemas/productSchema";
import { makeRequest } from "../../api/api";
import { buildParams } from "@/utils/build-params";
import { BuildParamsOptions } from "@/types/interfaces/BuildParamsOptions";

const BASE_SRC = "products";

export const fetch = (
  options: BuildParamsOptions = {},
): Promise<ApiMultipleResponse<ProductOutput>> => {
  const url = buildParams(BASE_SRC, options);

  return makeRequest.getList<ProductOutput>(url);
};


export const find = (id: string): Promise<ApiSingleResponse<ProductOutput>> => {
  return makeRequest.get<ProductOutput>(`${BASE_SRC}/${id}`);
};