"use client";

import { ArrowRight } from "lucide-react";
import { Button, Typography } from "@/components/ui";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/formatPrice";
import { t } from "@/lib/i18n";
import { useCheckout } from "../hooks/useCheckout";
import type { Cart } from "../types";

const DELIVERY_FEE = 15;

interface CartSummaryProps {
  cart: Cart;
}

interface SummaryRowProps {
  label: string;
  value: string;
  emphasis?: boolean;
  danger?: boolean;
}

function SummaryRow({ label, value, emphasis, danger }: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Typography
        variant={emphasis ? "body-lg" : "body-md"}
        className={emphasis ? undefined : "text-text-secondary"}
      >
        {label}
      </Typography>

      <Typography
        variant={emphasis ? "heading-2" : "body-md"}
        className={cn("font-bold", danger && "text-danger")}
      >
        {value}
      </Typography>
    </div>
  );
}

export function CartSummary({ cart }: CartSummaryProps) {
  const checkout = useCheckout();
  const isCheckingOut = checkout.isPending || checkout.isSuccess;

  const discountPercent =
    cart.subtotal > 0
      ? Math.round((cart.totalDiscount / cart.subtotal) * 100)
      : 0;

  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-black/10 p-5 md:p-6">
      <Typography variant="heading-2">{t("cart.summary")}</Typography>

      <div className="flex flex-col gap-3">
        <SummaryRow
          label={t("cart.subtotal")}
          value={formatPrice(cart.subtotal)}
        />

        <SummaryRow
          label={`${t("cart.discount")} (-${discountPercent}%)`}
          value={`-${formatPrice(cart.totalDiscount)}`}
          danger
        />

        <SummaryRow
          label={t("cart.deliveryFee")}
          value={formatPrice(DELIVERY_FEE)}
        />

        <hr className="border-black/10" />

        <SummaryRow
          label={t("cart.total")}
          value={formatPrice(cart.total + DELIVERY_FEE)}
          emphasis
        />
      </div>

      <div className="flex flex-col gap-2 md:pb-10">
        <Button
          className="w-full"
          disabled={isCheckingOut}
          onClick={() => checkout.mutate()}
        >
          {isCheckingOut
            ? t("cart.checkout.pending")
            : t("cart.checkout.button")}
          {!isCheckingOut && <ArrowRight className="size-5" />}
        </Button>

        {checkout.isError && (
          <div role="alert" className="text-center">
            <Typography variant="body-sm" className="text-danger">
              {t("cart.checkout.error")}
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
