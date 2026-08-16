"use client";

import { Minus, Plus } from "lucide-react";
import { Button, Typography } from "@/components/ui";
import { cn } from "@/lib/cn";

export const MAX_QUANTITY = 99;

interface CartQuantityStepperProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  disabled?: boolean;
  className?: string;
}

export function CartQuantityStepper({
  quantity,
  onDecrease,
  onIncrease,
  disabled,
  className,
}: CartQuantityStepperProps) {
  return (
    <div className={cn("flex items-center gap-1 rounded-full", className)}>
      <Button variant="icon" disabled={disabled} onClick={onDecrease}>
        <Minus className="size-4" />
      </Button>

      <Typography variant="body-default" className="min-w-5 text-center">
        {quantity}
      </Typography>

      <Button
        variant="icon"
        disabled={disabled || quantity >= MAX_QUANTITY}
        onClick={onIncrease}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
