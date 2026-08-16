import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui";
import { t } from "@/lib/i18n";

export function SiteHeader() {
  return (
    <header className="border-b border-black/10 mx-4 md:mx-8 lg:mx-26">
      <div className="flex items-center py-4 gap-4 md:gap-10">
        <Button variant="icon" className="md:hidden">
          <Menu className="size-5" />
        </Button>

        <Link
          href="/"
          className="text-heading-2 md:text-heading-1 hover:opacity-70"
        >
          {t("siteHeader.home.label")}
        </Link>

        <SearchBar className="hidden flex-1 md:flex" />

        <div className="ml-auto flex items-center gap-2">
          <Button variant="icon" className="md:hidden">
            <Search className="size-5" />
          </Button>

          <Link href="/cart" className="rounded-full p-1 hover:opacity-70">
            <ShoppingCart className="size-5" />
          </Link>

          <Button variant="icon">
            <CircleUserRound className="size-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
