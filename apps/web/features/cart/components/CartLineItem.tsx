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
      <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-surface md:size-32">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="128px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
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

        <Typography variant="body-sm" className="text-text-secondary">
          {t("cart.size")}: {sizeName(product.sizeId) ?? "-"}
        </Typography>
        <Typography variant="body-sm" className="text-text-secondary">
          {t("cart.color")}: {colorName(product.colorId) ?? "-"}
        </Typography>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <Typography variant="heading-3">
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
