"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "../hooks/useCart";

const MAX_BADGE_COUNT = 99;

export function CartLink() {
  const { cart } = useCart();
  const itemCount = cart?.totalItems ?? 0;

  return (
    <Link href="/cart" className="relative rounded-full p-1 hover:opacity-70">
      <ShoppingCart className="size-5" />
      {itemCount > 0 && (
        <span
          aria-hidden
          className="absolute -top-1 -right-1 flex min-w-[18px] items-center justify-center rounded-full bg-danger px-1 py-0.5 text-[10px] leading-none font-medium text-white"
        >
          {itemCount > MAX_BADGE_COUNT ? `${MAX_BADGE_COUNT}+` : itemCount}
        </span>
      )}
    </Link>
  );
}
