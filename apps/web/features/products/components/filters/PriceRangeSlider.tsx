"use client";

import { Typography } from "@/components/ui";
import { formatPrice } from "@/lib/formatPrice";
import { PRICE_CEILING, PRICE_FLOOR } from "@/stores/productFilterStore";
import type { PriceRange } from "../../types";

const THUMB_SIZE_PX = 16;

const toTrackPercent = (amount: number) =>
  ((amount - PRICE_FLOOR) / (PRICE_CEILING - PRICE_FLOOR)) * 100;

const toThumbCenter = (amount: number) => {
  const percent = toTrackPercent(amount);

  return `calc(${percent}% + ${((50 - percent) * THUMB_SIZE_PX) / 100}px)`;
};

const rangeInputClass =
  "pointer-events-none absolute inset-x-0 h-5 appearance-none bg-transparent " +
  "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 " +
  "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full " +
  "[&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-grab " +
  "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 " +
  "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full " +
  "[&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-black";

interface ThumbPriceLabelProps {
  amount: number;
}

function ThumbPriceLabel({ amount }: ThumbPriceLabelProps) {
  return (
    <span
      className="absolute -translate-x-1/2"
      style={{ left: toThumbCenter(amount) }}
    >
      <Typography variant="body-md" className="font-medium whitespace-nowrap">
        {formatPrice(amount)}
      </Typography>
    </span>
  );
}

interface PriceRangeSliderProps {
  value: PriceRange;
  onChange: (value: PriceRange) => void;
}

export function PriceRangeSlider({ value, onChange }: PriceRangeSliderProps) {
  const changeLowerBound = (amount: number) =>
    onChange({ ...value, min: Math.min(amount, value.max) });

  const changeUpperBound = (amount: number) =>
    onChange({ ...value, max: Math.max(amount, value.min) });

  return (
    <div className="flex flex-col gap-4">
      <div className="relative h-5">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-surface" />
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-black"
          style={{
            left: `${toTrackPercent(value.min)}%`,
            right: `${100 - toTrackPercent(value.max)}%`,
          }}
        />

        <input
          type="range"
          min={PRICE_FLOOR}
          max={PRICE_CEILING}
          value={value.min}
          onChange={(event) => changeLowerBound(Number(event.target.value))}
          className={rangeInputClass}
        />
        <input
          type="range"
          min={PRICE_FLOOR}
          max={PRICE_CEILING}
          value={value.max}
          onChange={(event) => changeUpperBound(Number(event.target.value))}
          className={rangeInputClass}
        />
      </div>

      <div className="relative h-5">
        <ThumbPriceLabel amount={value.min} />
        <ThumbPriceLabel amount={value.max} />
      </div>
    </div>
  );
}
