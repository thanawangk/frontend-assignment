"use client";

import Link from "next/link";
import { Typography } from "@/components/ui";
import { t } from "@/lib/i18n";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";
import { useCart } from "../hooks/useCart";

export function CartView() {
  const { cart, isPending } = useCart();

  if (isPending) {
    return (
      <Typography variant="body-md" className="block py-16 text-center">
        {t("cart.loading")}
      </Typography>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16">
        <Typography variant="body-md">{t("cart.empty")}</Typography>
        <Link href="/" className="underline underline-offset-2">
          <Typography variant="body-md">
            {t("cart.continueShopping")}
          </Typography>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <div className="flex flex-col divide-y divide-black/10 rounded-3xl border border-black/10 px-4 md:px-5 lg:flex-1">
        {cart.items.map((line) => (
          <div key={line.id} className="py-4 md:py-5">
            <CartLineItem line={line} />
          </div>
        ))}
      </div>

      <div className="lg:w-[400px] lg:shrink-0">
        <CartSummary cart={cart} />
      </div>
    </div>
  );
}
