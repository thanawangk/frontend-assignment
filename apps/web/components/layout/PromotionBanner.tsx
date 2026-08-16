"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { t } from "@/lib/i18n";
import { Button, Typography } from "@/components/ui";

export function PromotionBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-black text-white">
      <div className="flex items-center py-2 mx-4 md:mx-8 lg:mx-26">
        <Typography className="flex-1 text-center">
          {t("promotionBanner.message")}
          <Button variant="link" className="ml-1">
            <Typography className="font-medium">
              {t("promotionBanner.signUpAction")}
            </Typography>
          </Button>
        </Typography>

        <div className="hidden shrink-0 md:block">
          <Button variant="icon" onClick={() => setIsDismissed(true)}>
            <X className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
