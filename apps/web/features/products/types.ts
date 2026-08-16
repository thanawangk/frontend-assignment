import type { api } from "@/lib/eden";

type ProductListResponse = Awaited<ReturnType<typeof api.products.get>>["data"];
type ColorsResponse = Awaited<ReturnType<typeof api.colors.get>>["data"];
type SizesResponse = Awaited<ReturnType<typeof api.sizes.get>>["data"];

export type ProductList = NonNullable<ProductListResponse>;
export type Product = ProductList["items"][number];

export type Color = NonNullable<ColorsResponse>[number];
export type Size = NonNullable<SizesResponse>[number];

export interface PriceRange {
  min: number;
  max: number;
}
