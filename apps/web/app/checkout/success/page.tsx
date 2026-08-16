import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonClass, Typography } from "@/components/ui";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: "Order confirmed - SHOP.CO" };

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const { orderId } = await searchParams;

  // Reaching this page without an order id means no checkout happened.
  if (!orderId) redirect("/");

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center md:py-24">
      <CheckCircle2 className="size-14" color="green" />

      <Typography variant="heading-1">{t("checkout.success.title")}</Typography>

      <Typography variant="body-md" className="text-text-secondary">
        {t("checkout.success.message")}
      </Typography>

      <div className="mt-2 flex flex-col items-center gap-1 rounded-2xl bg-surface px-6 py-4">
        <Typography variant="body-sm" className="text-text-secondary">
          {t("checkout.success.orderId")}
        </Typography>
        <Typography variant="heading-4">{orderId}</Typography>
      </div>

      <Link href="/" className={buttonClass({ className: "mt-4" })}>
        {t("checkout.success.continue")}
        <ArrowRight className="size-5" />
      </Link>
    </div>
  );
}
