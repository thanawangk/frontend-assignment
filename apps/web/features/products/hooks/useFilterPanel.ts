"use client";

import { useQueries } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
  useApplyFilters,
  useAppliedFilters,
  type ProductFilters,
} from "@/stores/productFilterStore";
import { getColors, getSizes } from "../api/products";
import type { PriceRange } from "../types";

const OPTIONS_STALE_TIME = Infinity;

const toggleId = (ids: string[], id: string) =>
  ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id];

export function useFilterPanel() {
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

  const appliedFilters = useAppliedFilters();
  const applyFilters = useApplyFilters();
  const [draft, setDraft] = useState<ProductFilters>(appliedFilters);

  const setPrice = useCallback(
    (price: PriceRange) => setDraft((current) => ({ ...current, price })),
    [],
  );

  const toggleColor = useCallback(
    (colorId: string) =>
      setDraft((current) => ({
        ...current,
        colorIds: toggleId(current.colorIds, colorId),
      })),
    [],
  );

  const toggleSize = useCallback(
    (sizeId: string) =>
      setDraft((current) => ({
        ...current,
        sizeIds: toggleId(current.sizeIds, sizeId),
      })),
    [],
  );

  const applyDraft = useCallback(
    () => applyFilters(draft),
    [applyFilters, draft],
  );

  return {
    colors: colorsQuery.data ?? [],
    sizes: sizesQuery.data ?? [],
    draft,
    setPrice,
    toggleColor,
    toggleSize,
    applyDraft,
  };
}
