"use client";

import { Button, Typography } from "@/components/ui";
import { t } from "@/lib/i18n";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { useInfiniteProducts } from "../hooks/useInfiniteProducts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const SKELETON_COUNT = 8;

export function ProductGrid() {
  const {
    data: products,
    isPending,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts();

  const loadMoreRef = useInfiniteScroll({
    onLoadMore: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <Typography variant="body-md">{t("products.error")}</Typography>
        <Button textVariant="body-md" variant="link" onClick={() => refetch()}>
          {t("products.retry")}
        </Button>
      </div>
    );
  }

  if (!isPending && products?.length === 0) {
    return (
      <Typography variant="body-md" className="block py-16 text-center">
        {t("products.empty")}
      </Typography>
    );
  }

  return (
    <div>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
        {products?.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}

        {(isPending || isFetchingNextPage) &&
          Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <li key={`skeleton-${index}`}>
              <ProductCardSkeleton />
            </li>
          ))}
      </ul>

      <div ref={loadMoreRef} aria-hidden className="h-px" />
    </div>
  );
}
