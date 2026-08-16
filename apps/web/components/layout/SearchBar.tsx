"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import { useSearchKeyword, useSetSearchKeyword } from "@/stores/productStore";

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({ className, autoFocus }: SearchBarProps) {
  const searchKeyword = useSearchKeyword();
  const setSearchKeyword = useSetSearchKeyword();

  const [inputValue, setInputValue] = useState(searchKeyword);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setSearchKeyword(inputValue.trim()), 800);
    return () => clearTimeout(timer);
  }, [inputValue, setSearchKeyword]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchKeyword(inputValue.trim());
    inputRef.current?.blur();
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-3 rounded-full bg-surface px-4 py-3",
        className,
      )}
    >
      <Search className="size-5 shrink-0" />
      <input
        ref={inputRef}
        type="search"
        name="search"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        autoFocus={autoFocus}
        placeholder={t("siteHeader.searchBar.placeholder")}
        className="w-full bg-transparent text-body-default outline-none placeholder:text-text-tertiary"
      />
    </form>
  );
}
