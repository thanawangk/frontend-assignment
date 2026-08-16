"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button, Typography } from "@/components/ui";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import { ColorSwatches } from "./ColorSwatches";
import { FilterSection } from "./FilterSection";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { SizePills } from "./SizePills";
import { useFilterPanel } from "../../hooks/useFilterPanel";

interface FilterPanelProps {
  showHeading?: boolean;
  onApplied?: () => void;
  className?: string;
}

export function FilterPanel({
  showHeading = true,
  onApplied,
  className,
}: FilterPanelProps) {
  const {
    colors,
    sizes,
    draft,
    setPrice,
    toggleColor,
    toggleSize,
    applyDraft,
  } = useFilterPanel();

  const handleApply = () => {
    applyDraft();
    onApplied?.();
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {showHeading && (
        <div className="flex items-center justify-between pb-5">
          <Typography variant="heading-4">{t("filters.title")}</Typography>
          <SlidersHorizontal className="size-5 text-text-tertiary" />
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto">
        <FilterSection title={t("filters.price")}>
          <PriceRangeSlider value={draft.price} onChange={setPrice} />
        </FilterSection>

        <FilterSection title={t("filters.colors")}>
          <ColorSwatches
            colors={colors}
            selectedIds={draft.colorIds}
            onToggle={toggleColor}
          />
        </FilterSection>

        <FilterSection title={t("filters.size")}>
          <SizePills
            sizes={sizes}
            selectedIds={draft.sizeIds}
            onToggle={toggleSize}
          />
        </FilterSection>
      </div>

      <Button className="mt-5 w-full shrink-0" onClick={handleApply}>
        <Typography variant="body-md">{t("filters.apply")}</Typography>
      </Button>
    </div>
  );
}
