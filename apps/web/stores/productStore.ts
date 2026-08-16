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

interface ProductStore {
  appliedFilters: ProductFilters;
  searchKeyword: string;
  applyFilters: (filters: ProductFilters) => void;
  setSearchKeyword: (searchKeyword: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  appliedFilters: DEFAULT_PRODUCT_FILTERS,
  searchKeyword: "",
  applyFilters: (filters) => set({ appliedFilters: filters }),
  setSearchKeyword: (searchKeyword) => set({ searchKeyword }),
}));

export const useAppliedFilters = () =>
  useProductStore((store) => store.appliedFilters);

export const useApplyFilters = () =>
  useProductStore((store) => store.applyFilters);

export const useSearchKeyword = () =>
  useProductStore((store) => store.searchKeyword);

export const useSetSearchKeyword = () =>
  useProductStore((store) => store.setSearchKeyword);
