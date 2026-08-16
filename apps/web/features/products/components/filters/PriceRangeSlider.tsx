"use client";

import { Typography } from "@/components/ui";
import { formatPrice } from "@/lib/formatPrice";
import { PRICE_CEILING, PRICE_FLOOR } from "@/stores/productFilterStore";
import type { PriceRange } from "../../types";

interface PriceRangeSliderProps {
  value: PriceRange;
  onChange: (value: PriceRange) => void;
}

const toPercent = (amount: number) =>
  ((amount - PRICE_FLOOR) / (PRICE_CEILING - PRICE_FLOOR)) * 100;

const thumbClass =
  "pointer-events-none absolute inset-x-0 h-5 appearance-none bg-transparent " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 " +
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full " +
  "[&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-grab " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 " +
  "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full " +
  "[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-black";

export function PriceRangeSlider({ value, onChange }: PriceRangeSliderProps) {
  const handleMinChange = (next: number) =>
    onChange({ ...value, min: Math.min(next, value.max) });

  const handleMaxChange = (next: number) =>
    onChange({ ...value, max: Math.max(next, value.min) });

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-5">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-surface" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-black"
          style={{
            left: `${toPercent(value.min)}%`,
            right: `${100 - toPercent(value.max)}%`,
          }}
        />

        <input
          type="range"
          min={PRICE_FLOOR}
          max={PRICE_CEILING}
          value={value.min}
          onChange={(event) => handleMinChange(Number(event.target.value))}
          aria-label="Minimum price"
          className={thumbClass}
        />
        <input
          type="range"
          min={PRICE_FLOOR}
          max={PRICE_CEILING}
          value={value.max}
          onChange={(event) => handleMaxChange(Number(event.target.value))}
          aria-label="Maximum price"
          className={thumbClass}
        />
      </div>

      <div className="flex justify-between">
        <Typography variant="body-md" className="font-medium">
          {formatPrice(value.min)}
        </Typography>
        <Typography variant="body-md" className="font-medium">
          {formatPrice(value.max)}
        </Typography>
      </div>
    </div>
  );
}
