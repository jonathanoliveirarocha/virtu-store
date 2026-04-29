import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Environment from "@/config/env";
import { PRODUCTS_PER_PAGE } from "@/components/const";
import { ApiMultipleResponse } from "@/types/interfaces/ApiMultipleResponse";
import { ApiSingleResponse } from "@/types/interfaces/ApiSingleResponse";

const axiosAPI: AxiosInstance = axios.create({
  baseURL: Environment.VITE_BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

const makeRequest = {
  getList: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiMultipleResponse<T>> => {
    const response = await axiosAPI.get(url, config);

    if (response.data && Array.isArray(response.data.data)) {
      return {
        success: response.data.success,
        rows: response.data.data,
        total: response.data.items ?? response.data.data.length,
        limit: Number(config?.params?._per_page ?? PRODUCTS_PER_PAGE),
        offset: 0,
      };
    }

    return {
      success: response.data.success,
      rows: Array.isArray(response.data) ? response.data : [],
      total: Array.isArray(response.data) ? response.data.length : 0,
      limit: Number(config?.params?._per_page ?? PRODUCTS_PER_PAGE),
      offset: 0,
    };
  },

  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiSingleResponse<T>> => {
    const response = await axiosAPI.get<any>(url, config);

    return { success: response.data.success, row: response.data };
  },
};

export { makeRequest };
