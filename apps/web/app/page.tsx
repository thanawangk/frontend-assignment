import { Typography } from "@/components/ui";
import { FilterDrawer } from "@/features/products/components/filters/FilterDrawer";
import { FilterPanel } from "@/features/products/components/filters/FilterPanel";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { t } from "@/lib/i18n";

export default function CategoryPage() {
  return (
    <div className="flex gap-5 py-6 md:py-16">
      <aside className="hidden w-[295px] lg:block">
        <FilterPanel className="rounded-3xl border border-black/10 p-6" />
      </aside>

      <section className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <Typography variant="heading-1">{t("products.title")}</Typography>
          <div className="lg:hidden">
            <FilterDrawer />
          </div>
        </div>
        <ProductGrid />
      </section>
    </div>
  );
}
