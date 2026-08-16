"use client";

import { Typography } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Size } from "../../types";

interface SizePillsProps {
  sizes: Size[];
  selectedIds: string[];
  onToggle: (sizeId: string) => void;
}

export function SizePills({ sizes, selectedIds, onToggle }: SizePillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => {
        const isSelected = selectedIds.includes(size.id);

        return (
          <button
            key={size.id}
            type="button"
            onClick={() => onToggle(size.id)}
            aria-pressed={isSelected}
            className={cn(
              "cursor-pointer rounded-full px-4 py-2 transition-colors",
              isSelected
                ? "bg-black text-white"
                : "bg-surface text-text-secondary hover:bg-black/10",
            )}
          >
            <Typography variant="body-default">{size.name}</Typography>
          </button>
        );
      })}
    </div>
  );
}
