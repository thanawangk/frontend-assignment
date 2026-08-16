"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import {
  useSearchKeyword,
  useSetSearchKeyword,
} from "@/stores/productFilterStore";

const SEARCH_DEBOUNCE_MS = 800;

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({ className, autoFocus }: SearchBarProps) {
  const searchKeyword = useSearchKeyword();
  const setSearchKeyword = useSetSearchKeyword();

  const [inputValue, setInputValue] = useState(searchKeyword);

  useEffect(() => {
    const timer = setTimeout(
      () => setSearchKeyword(inputValue.trim()),
      SEARCH_DEBOUNCE_MS,
    );

    return () => clearTimeout(timer);
  }, [inputValue, setSearchKeyword]);

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-full bg-surface px-4 py-3",
        className,
      )}
    >
      <Search className="size-5 shrink-0" />
      <input
        type="search"
        name="search"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        autoFocus={autoFocus}
        placeholder={t("siteHeader.searchBar.placeholder")}
        className="w-full bg-transparent text-body-default outline-none placeholder:text-text-tertiary"
      />
    </div>
  );
}
