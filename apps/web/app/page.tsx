import { Typography } from "@/components/ui";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { t } from "@/lib/i18n";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 py-6 md:py-12">
      <Typography variant="heading-1">{t("products.title")}</Typography>
      <ProductGrid />
    </div>
  );
}
