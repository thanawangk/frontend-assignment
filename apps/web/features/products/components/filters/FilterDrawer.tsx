"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button, Typography } from "@/components/ui";
import { t } from "@/lib/i18n";
import { FilterPanel } from "./FilterPanel";

export function FilterDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    // Stops the page behind the sheet from scrolling with it.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <Button
        variant="icon"
        className="bg-surface p-2"
        onClick={() => setIsOpen(true)}
      >
        <SlidersHorizontal className="size-5" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-black/50"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("filters.title")}
            className="absolute inset-x-0 bottom-0 flex h-[50dvh] flex-col rounded-t-3xl bg-background px-4 pb-6"
          >
            <div className="flex shrink-0 items-center justify-between py-5">
              <Typography variant="heading-3">{t("filters.title")}</Typography>
              <Button variant="icon" onClick={() => setIsOpen(false)}>
                <X className="size-5" />
              </Button>
            </div>

            <FilterPanel
              showHeading={false}
              onApplied={() => setIsOpen(false)}
              className="min-h-0 flex-1"
            />
          </div>
        </div>
      )}
    </>
  );
}
