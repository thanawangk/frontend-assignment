import type { Metadata } from "next";
import { Typography } from "@/components/ui";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: "Your cart - SHOP.CO" };

export default function CartPage() {
  return (
    <div className="flex flex-col gap-4 py-6 md:py-8">
      <Typography variant="display-lg">{t("cart.title")}</Typography>
    </div>
  );
}
