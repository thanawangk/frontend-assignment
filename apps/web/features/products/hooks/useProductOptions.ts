"use client";

import { useQueries } from "@tanstack/react-query";
import { getColors, getSizes } from "../api/products";

const OPTIONS_STALE_TIME = Infinity;

export function useProductOptions() {
  const [colorsQuery, sizesQuery] = useQueries({
    queries: [
      {
        queryKey: ["colors"],
        queryFn: getColors,
        staleTime: OPTIONS_STALE_TIME,
      },
      { queryKey: ["sizes"], queryFn: getSizes, staleTime: OPTIONS_STALE_TIME },
    ],
  });

  const colors = colorsQuery.data ?? [];
  const sizes = sizesQuery.data ?? [];

  return {
    colors,
    sizes,
    colorName: (colorId: string | null) =>
      colors.find((color) => color.id === colorId)?.name,
    sizeName: (sizeId: string | null) =>
      sizes.find((size) => size.id === sizeId)?.name,
  };
}
