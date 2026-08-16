import type { Metadata } from "next";
import { Typography } from "@/components/ui";
import { CartView } from "@/features/cart/components/CartView";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: "Your cart - SHOP.CO" };

export default function CartPage() {
  return (
    <div className="flex flex-col gap-4 py-8 md:py-16">
      <Typography variant="display-lg">{t("cart.title")}</Typography>
      <CartView />
    </div>
  );
}
