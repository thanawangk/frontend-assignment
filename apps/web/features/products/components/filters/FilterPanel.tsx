"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button, Typography } from "@/components/ui";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";
import { ColorSwatches } from "./ColorSwatches";
import { FilterSection } from "./FilterSection";
import { PriceRangeSlider } from "./PriceRangeSlider";
import { SizePills } from "./SizePills";
import { useProductFilterForm } from "../../hooks/useProductFilterForm";

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
  const { colors, sizes, draft, setPrice, toggleColor, toggleSize, submit } =
    useProductFilterForm();

  const handleApply = () => {
    submit();
    onApplied?.();
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {showHeading && (
        <div className="flex items-center justify-between pb-6">
          <Typography variant="heading-3">{t("filters.title")}</Typography>
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

      <div className="border-t border-black/10 pt-6 md:py-6">
        <Button className="w-full" onClick={handleApply}>
          {t("filters.apply")}
        </Button>
      </div>
    </div>
  );
}
