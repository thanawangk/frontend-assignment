"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Color } from "../../types";

interface ColorSwatchesProps {
  colors: Color[];
  selectedIds: string[];
  onToggle: (colorId: string) => void;
}

const LIGHT_SWATCH = ["white", "yellow"];

export function ColorSwatches({
  colors,
  selectedIds,
  onToggle,
}: ColorSwatchesProps) {
  return (
    <div className="flex flex-wrap gap-2 md:gap-4">
      {colors.map((color) => {
        const isSelected = selectedIds.includes(color.id);

        return (
          <button
            key={color.id}
            type="button"
            onClick={() => onToggle(color.id)}
            aria-pressed={isSelected}
            aria-label={color.name}
            style={{ backgroundColor: color.hex }}
            className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-black/10"
          >
            {isSelected && (
              <Check
                className={cn(
                  "size-4",
                  LIGHT_SWATCH.includes(color.id) ? "text-black" : "text-white",
                )}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
