"use client";

import { CircleUserRound, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { Button, Typography } from "@/components/ui";
import { CartLink } from "@/features/cart/components/CartLink";
import { t } from "@/lib/i18n";

export function SiteHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="border-b border-black/10 mx-4 md:mx-8 lg:mx-26">
      <div className="flex items-center py-4 md:py-6 gap-4 md:gap-10">
        {isSearchOpen ? (
          <>
            <SearchBar className="flex-1 md:hidden" autoFocus />
            <Button variant="icon" onClick={() => setIsSearchOpen(false)}>
              <X className="size-5" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="icon" className="md:hidden">
              <Menu className="size-5" />
            </Button>

            <Link href="/" className="hover:opacity-70">
              <Typography variant="heading-1">
                {t("siteHeader.home.label")}
              </Typography>
            </Link>

            <SearchBar className="hidden flex-1 md:flex" />

            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="icon"
                className="md:hidden"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="size-5" />
              </Button>

              <CartLink />

              <Button variant="icon">
                <CircleUserRound className="size-5" />
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
