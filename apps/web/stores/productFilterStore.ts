import { create } from "zustand";
import type { PriceRange } from "@/features/products/types";

export const PRICE_FLOOR = 0;
export const PRICE_CEILING = 300;

export interface ProductFilters {
  price: PriceRange;
  colorIds: string[];
  sizeIds: string[];
}

export const DEFAULT_PRODUCT_FILTERS: ProductFilters = {
  price: { min: PRICE_FLOOR, max: PRICE_CEILING },
  colorIds: [],
  sizeIds: [],
};

interface ProductFilterStore {
  appliedFilters: ProductFilters;
  applyFilters: (filters: ProductFilters) => void;
  clearFilters: () => void;
}

export const useProductFilterStore = create<ProductFilterStore>((set) => ({
  appliedFilters: DEFAULT_PRODUCT_FILTERS,
  applyFilters: (filters) => set({ appliedFilters: filters }),
  clearFilters: () => set({ appliedFilters: DEFAULT_PRODUCT_FILTERS }),
}));

export const useAppliedFilters = () =>
  useProductFilterStore((store) => store.appliedFilters);

export const useApplyFilters = () =>
  useProductFilterStore((store) => store.applyFilters);
