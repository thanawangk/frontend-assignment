"use client";

import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getListProducts } from "../api/products";
import type { ProductList } from "../types";

const PRODUCTS_PER_PAGE = 12;

const toProductList = (pages: InfiniteData<ProductList>) =>
  pages.pages.flatMap((page) => page.items);

export function useInfiniteProducts() {
  return useInfiniteQuery({
    queryKey: ["products", { limit: PRODUCTS_PER_PAGE }],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getListProducts({ limit: PRODUCTS_PER_PAGE, offset: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.offset + lastPage.limit : undefined,
    select: toProductList,
  });
}
