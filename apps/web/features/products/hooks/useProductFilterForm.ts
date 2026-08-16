"use client";

import { useCallback, useState } from "react";
import {
  useApplyFilters,
  useAppliedFilters,
  type ProductFilters,
} from "@/stores/productStore";
import { useProductOptions } from "./useProductOptions";
import type { PriceRange } from "../types";

const toggleId = (ids: string[], id: string) =>
  ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id];

export function useProductFilterForm() {
  const { colors, sizes } = useProductOptions();

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

  const submit = useCallback(() => applyFilters(draft), [applyFilters, draft]);

  return {
    colors,
    sizes,
    draft,
    setPrice,
    toggleColor,
    toggleSize,
    submit,
  };
}
