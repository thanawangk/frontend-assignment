import { api } from "@/lib/eden";
import type { ProductFilters } from "@/stores/productStore";
import type { Color, ProductList, Size } from "../types";

export interface GetProductListParams {
  limit: number;
  offset: number;
  filters: ProductFilters;
  searchKeyword: string;
}

const toIdList = (ids: string[]) => (ids.length > 0 ? ids : undefined);

export async function getColors(): Promise<Color[]> {
  const { data, error } = await api.colors.get();
  if (error) throw error;
  return data;
}

export async function getSizes(): Promise<Size[]> {
  const { data, error } = await api.sizes.get();
  if (error) throw error;
  return data;
}

export async function getProductList({
  limit,
  offset,
  filters,
  searchKeyword,
}: GetProductListParams): Promise<ProductList> {
  const { data, error } = await api.products.get({
    query: {
      limit,
      offset,
      q: searchKeyword || undefined,
      minPrice: filters.price.min,
      maxPrice: filters.price.max,
      colorIds: toIdList(filters.colorIds),
      sizeIds: toIdList(filters.sizeIds),
    },
  });
  if (error) throw error;
  return data;
}
