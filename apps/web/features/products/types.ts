import type { api } from "@/lib/eden";

type ListProductsResponse = Awaited<
  ReturnType<typeof api.products.get>
>["data"];

export type ProductList = NonNullable<ListProductsResponse>;
export type Product = ProductList["items"][number];
