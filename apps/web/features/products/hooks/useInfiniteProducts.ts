"use client";

import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import {
  useAppliedFilters,
  useSearchKeyword,
} from "@/stores/productFilterStore";
import { getProductList } from "../api/products";
import type { ProductList } from "../types";

const PRODUCTS_PER_PAGE = 12;

const toProducts = (pages: InfiniteData<ProductList>) =>
  pages.pages.flatMap((page) => page.items);

export function useInfiniteProducts() {
  const filters = useAppliedFilters();
  const searchKeyword = useSearchKeyword();

  return useInfiniteQuery({
    queryKey: [
      "products",
      { limit: PRODUCTS_PER_PAGE, filters, searchKeyword },
    ],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getProductList({
        limit: PRODUCTS_PER_PAGE,
        offset: pageParam,
        filters,
        searchKeyword,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.offset + lastPage.limit : undefined,
    select: toProducts,
  });
}
