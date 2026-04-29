import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { fetch, find } from "@/services/product";
import { BuildParamsOptions } from "@/types/interfaces/BuildParamsOptions";
import { type ProductOutput } from "@/schemas/productSchema";
import { ApiMultipleResponse } from "@/types/interfaces/ApiMultipleResponse";
import { ApiSingleResponse } from "@/types/interfaces/ApiSingleResponse";

export const useProductsFetch = (
  options: BuildParamsOptions = {},
): UseQueryResult<ApiMultipleResponse<ProductOutput>, Error> => {
  return useQuery({
    queryKey: ["fetchProducts", options],
    queryFn: () => fetch(options),
    retry: 0,
    staleTime: 30_000,
  });
};

export const useProductFetchById = (
  id: string,
  enabled: boolean = true,
): UseQueryResult<ApiSingleResponse<ProductOutput>, Error> => {
  return useQuery({
    queryKey: ["fetchProductById", id],
    queryFn: () => find(id),
    enabled: enabled && !!id,
    retry: 0,
  });
};
