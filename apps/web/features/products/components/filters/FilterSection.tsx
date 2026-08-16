"use client";

import { ChevronUp } from "lucide-react";
import { useId, useState } from "react";
import type { ReactNode } from "react";
import { Typography } from "@/components/ui";
import { cn } from "@/lib/cn";

interface FilterSectionProps {
  title: string;
  children: ReactNode;
}

export function FilterSection({ title, children }: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const contentId = useId();

  return (
    <div className="border-t border-black/10 py-6">
      <button
        type="button"
        onClick={() => setIsExpanded((expanded) => !expanded)}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className="flex w-full cursor-pointer items-center justify-between"
      >
        <Typography variant="heading-3">{title}</Typography>
        <ChevronUp
          className={cn(
            "size-5 transition-transform",
            !isExpanded && "rotate-180",
          )}
        />
      </button>

      {isExpanded && (
        <div id={contentId} className="pt-5">
          {children}
        </div>
      )}
    </div>
  );
}
