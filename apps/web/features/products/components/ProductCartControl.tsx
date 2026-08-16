"use client";

import { Minus, Plus } from "lucide-react";
import { Button, Typography } from "@/components/ui";
import { useCart } from "@/features/cart/hooks/useCart";

const MAX_QUANTITY = 99;

interface ProductCartControlProps {
  productId: string;
}

export function ProductCartControl({ productId }: ProductCartControlProps) {
  const { cart, addItem, setQuantity, removeItem, isUpdating } = useCart();

  const line = cart?.items.find((item) => item.productId === productId);

  const handleAddToCart = () => {
    addItem.mutate(productId);
  };

  if (!line) {
    return (
      <Button
        variant="icon"
        disabled={isUpdating}
        onClick={handleAddToCart}
        className="size-10 bg-background shadow-md"
      >
        <Plus className="size-5" />
      </Button>
    );
  }

  const decrease = () =>
    line.quantity === 1
      ? removeItem.mutate(line.id)
      : setQuantity.mutate({ itemId: line.id, quantity: line.quantity - 1 });

  return (
    <div className="flex items-center gap-1 rounded-full bg-background p-0.5 md:p-1 shadow-md">
      <Button variant="icon" disabled={isUpdating} onClick={decrease}>
        <Minus className="size-4" />
      </Button>

      <Typography variant="body-default" className="min-w-5 text-center">
        {line.quantity}
      </Typography>

      <Button
        variant="icon"
        disabled={isUpdating || line.quantity >= MAX_QUANTITY}
        onClick={() =>
          setQuantity.mutate({ itemId: line.id, quantity: line.quantity + 1 })
        }
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
}
