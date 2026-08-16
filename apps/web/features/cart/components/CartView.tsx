"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { buttonClass, Spinner, Typography } from "@/components/ui";
import { t } from "@/lib/i18n";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";
import { useCart } from "../hooks/useCart";

export function CartView() {
  const { cart, isPending } = useCart();

  if (isPending) {
    return (
      <div className="flex justify-center py-16">
        <Spinner />
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-6 py-16">
        <Typography variant="body-md" className="text-text-secondary">
          {t("cart.empty")}
        </Typography>

        <Link href="/" className={buttonClass()}>
          {t("cart.continue")}
          <ArrowRight className="size-5" />
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
