"use client";

import { useEffect, useRef } from "react";

const PREFETCH_MARGIN = "600px";

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  enabled: boolean;
}

// Returns a ref to place on an element at the end of the list.
// Loading starts when that element approaches the viewport.
export function useInfiniteScroll({
  onLoadMore,
  enabled,
}: UseInfiniteScrollOptions) {
  const triggerRef = useRef<HTMLDivElement>(null);

  const onLoadMoreRef = useRef(onLoadMore);
  onLoadMoreRef.current = onLoadMore;

  useEffect(() => {
    const trigger = triggerRef.current;

    if (!trigger || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) onLoadMoreRef.current();
      },
      { rootMargin: PREFETCH_MARGIN },
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [enabled]);

  return triggerRef;
}
