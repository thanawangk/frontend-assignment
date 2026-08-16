import { Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
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
        placeholder={t("siteHeader.searchBar.placeholder")}
        className="w-full text-body-default outline-none placeholder:text-text-tertiary"
      />
    </div>
  );
}
