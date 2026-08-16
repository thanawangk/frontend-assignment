import { api } from "@/lib/eden";
import type { ProductList } from "../types";

export interface ListProductsParams {
  limit: number;
  offset: number;
}

export async function getListProducts(
  params: ListProductsParams,
): Promise<ProductList> {
  const { data, error } = await api.products.get({ query: params });

  if (error) throw error;

  return data;
}
