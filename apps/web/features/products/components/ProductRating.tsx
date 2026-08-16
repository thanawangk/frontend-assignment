import { Star } from "lucide-react";
import { Typography } from "@/components/ui";

const MAX_RATING = 5;
const STARS = Array.from({ length: MAX_RATING }, (_, index) => index);

interface ProductRatingProps {
  value: number;
}

export function ProductRating({ value }: ProductRatingProps) {
  const filledWidth = `${(value / MAX_RATING) * 100}%`;

  return (
    <div className="flex items-center gap-2">
      <span className="relative inline-flex" role="img">
        <span className="flex gap-1">
          {STARS.map((index) => (
            <Star
              key={index}
              className="size-4 shrink-0 fill-black/10 stroke-none"
            />
          ))}
        </span>

        <span
          className="absolute inset-y-0 left-0 flex gap-1 overflow-hidden"
          style={{ width: filledWidth }}
        >
          {STARS.map((index) => (
            <Star
              key={index}
              className="size-4 shrink-0 fill-[#ffc633] stroke-none"
            />
          ))}
        </span>
      </span>

      <Typography variant="body-sm">
        {value.toFixed(1)}
        <span className="text-text-secondary">/{MAX_RATING}</span>
      </Typography>
    </div>
  );
}
