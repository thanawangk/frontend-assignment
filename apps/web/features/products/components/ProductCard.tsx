import Image from "next/image";
import { Typography } from "@/components/ui";
import { formatPrice } from "@/lib/formatPrice";
import { ProductRating } from "./ProductRating";
import type { Product } from "../types";
import { ProductCartControl } from "./ProductCartControl";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.percentageDiscount > 0;

  return (
    <article className="group flex flex-col gap-2">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface transition-shadow duration-300 group-hover:shadow-lg">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
        />

        <div className="absolute right-3 bottom-3">
          <ProductCartControl productId={product.id} />
        </div>
      </div>

      <Typography variant="heading-3" className="mt-2">
        {product.name}
      </Typography>

      <ProductRating value={product.rating} />

      <div className="flex flex-wrap items-center gap-2">
        <Typography variant="heading-3">
          {formatPrice(product.discountedPrice)}
        </Typography>

        {hasDiscount && (
          <>
            <Typography
              variant="heading-3"
              className="text-text-tertiary line-through"
            >
              {formatPrice(product.price)}
            </Typography>

            <Typography
              variant="body-sm"
              className="rounded-full bg-danger-surface px-2 py-1 text-danger font-medium"
            >
              -{product.percentageDiscount}%
            </Typography>
          </>
        )}
      </div>
    </article>
  );
}
