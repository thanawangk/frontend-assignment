"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui";
import { CartQuantityStepper } from "@/features/cart/components/CartQuantityStepper";
import { useCart } from "@/features/cart/hooks/useCart";

interface ProductCartControlProps {
  productId: string;
}

export function ProductCartControl({ productId }: ProductCartControlProps) {
  const { cart, addItem, setQuantity, removeItem, isUpdating } = useCart();

  const line = cart?.items.find((item) => item.productId === productId);

  if (!line) {
    return (
      <Button
        variant="icon"
        disabled={isUpdating}
        onClick={() => addItem.mutate(productId)}
        className="size-10 bg-background shadow-md"
      >
        <Plus className="size-5" />
      </Button>
    );
  }

  return (
    <CartQuantityStepper
      quantity={line.quantity}
      disabled={isUpdating}
      onDecrease={() =>
        line.quantity === 1
          ? removeItem.mutate(line.id)
          : setQuantity.mutate({ itemId: line.id, quantity: line.quantity - 1 })
      }
      onIncrease={() =>
        setQuantity.mutate({ itemId: line.id, quantity: line.quantity + 1 })
      }
      className="bg-background p-0.5 shadow-md md:p-1"
    />
  );
}
