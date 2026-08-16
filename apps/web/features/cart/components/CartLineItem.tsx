"use client";

import Image from "next/image";
import { Button, Typography } from "@/components/ui";
import { useProductOptions } from "@/features/products/hooks/useProductOptions";
import { formatPrice } from "@/lib/formatPrice";
import { t } from "@/lib/i18n";
import { CartQuantityStepper } from "./CartQuantityStepper";
import { useCart } from "../hooks/useCart";
import type { CartLine } from "../types";
import { Trash2 } from "lucide-react";

interface CartLineItemProps {
  line: CartLine;
}

export function CartLineItem({ line }: CartLineItemProps) {
  const { setQuantity, removeItem, isUpdating } = useCart();
  const { colorName, sizeName } = useProductOptions();
  const { product } = line;

  if (!product) return null;

  return (
    <article className="flex gap-4">
      <div className="relative size-24 md:size-32 shrink-0 self-start overflow-hidden rounded-lg bg-surface">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="128px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between">
          <Typography variant="heading-4" className="line-clamp-2">
            {product.name}
          </Typography>

          <Button
            variant="icon"
            disabled={isUpdating}
            onClick={() => removeItem.mutate(line.id)}
            className="text-danger"
          >
            <Trash2 className="size-5" />
          </Button>
        </div>

        <Typography variant="body-sm">
          {t("cart.size")}:{" "}
          <span className="text-text-secondary">
            {sizeName(product.sizeId) ?? "-"}
          </span>
        </Typography>
        <Typography variant="body-sm">
          {t("cart.color")}:{" "}
          <span className="text-text-secondary">
            {colorName(product.colorId) ?? "-"}
          </span>
        </Typography>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <Typography variant="heading-2">
            {formatPrice(product.discountedPrice)}
          </Typography>

          <CartQuantityStepper
            quantity={line.quantity}
            disabled={isUpdating}
            onDecrease={() =>
              line.quantity === 1
                ? removeItem.mutate(line.id)
                : setQuantity.mutate({
                    itemId: line.id,
                    quantity: line.quantity - 1,
                  })
            }
            onIncrease={() =>
              setQuantity.mutate({
                itemId: line.id,
                quantity: line.quantity + 1,
              })
            }
            className="bg-surface px-2 py-1"
          />
        </div>
      </div>
    </article>
  );
}
