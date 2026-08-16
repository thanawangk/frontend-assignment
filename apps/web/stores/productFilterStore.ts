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
  searchKeyword: string;
  applyFilters: (filters: ProductFilters) => void;
  setSearchKeyword: (searchKeyword: string) => void;
  clearFilters: () => void;
}

export const useProductFilterStore = create<ProductFilterStore>((set) => ({
  appliedFilters: DEFAULT_PRODUCT_FILTERS,
  searchKeyword: "",
  applyFilters: (filters) => set({ appliedFilters: filters }),
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
  clearFilters: () =>
    set({ appliedFilters: DEFAULT_PRODUCT_FILTERS, searchKeyword: "" }),
}));

export const useAppliedFilters = () =>
  useProductFilterStore((store) => store.appliedFilters);

export const useApplyFilters = () =>
  useProductFilterStore((store) => store.applyFilters);

export const useSearchKeyword = () =>
  useProductFilterStore((store) => store.searchKeyword);

export const useSetSearchKeyword = () =>
  useProductFilterStore((store) => store.setSearchKeyword);
