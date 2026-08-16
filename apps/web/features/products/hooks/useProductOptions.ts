"use client";

import { useQueries } from "@tanstack/react-query";
import { getColors, getSizes } from "../api/products";
import type { Size } from "../types";

const OPTIONS_STALE_TIME = Infinity;

const SIZE_ORDER = [
  "xx-small",
  "x-small",
  "small",
  "medium",
  "large",
  "x-large",
  "xx-large",
  "3x-large",
  "4x-large",
];

const sizeRank = (size: Size) => {
  const rank = SIZE_ORDER.indexOf(size.id);
  return rank === -1 ? SIZE_ORDER.length : rank;
};

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
  const sizes = [...(sizesQuery.data ?? [])].sort(
    (a, b) => sizeRank(a) - sizeRank(b),
  );

  return {
    colors,
    sizes,
    colorName: (colorId: string | null) =>
      colors.find((color) => color.id === colorId)?.name,
    sizeName: (sizeId: string | null) =>
      sizes.find((size) => size.id === sizeId)?.name,
  };
}
