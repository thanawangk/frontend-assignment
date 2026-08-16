import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TypographyVariant =
  | "body-sm"
  | "body-default"
  | "body-md"
  | "body-lg"
  | "heading-1"
  | "heading-2"
  | "heading-3"
  | "heading-4"
  | "display-lg";

const typographyVariantClass: Record<TypographyVariant, string> = {
  "body-sm": "text-body-sm",
  "body-default": "text-body-sm md:text-body-default",
  "body-md": "text-body-default md:text-body-md",
  "body-lg": "text-body-md md:text-body-lg",
  "heading-1": "text-heading-2 md:text-heading-1",
  "heading-2": "text-heading-3 md:text-heading-2",
  "heading-3": "text-heading-4 md:text-heading-3",
  "heading-4": "text-heading-4",
  "display-lg": "text-heading-1 md:text-display-lg",
};

const typographyVariantElement: Record<TypographyVariant, ElementType> = {
  "body-sm": "span",
  "body-default": "span",
  "body-md": "span",
  "body-lg": "span",
  "heading-1": "h1",
  "heading-2": "h2",
  "heading-3": "h3",
  "heading-4": "h4",
  "display-lg": "h1",
};

interface TypographyProps {
  variant?: TypographyVariant;
  className?: string;
  children: ReactNode;
}

export function Typography({
  variant = "body-default",
  className,
  children,
}: TypographyProps) {
  const Component = typographyVariantElement[variant];

  return (
    <Component className={cn(typographyVariantClass[variant], className)}>
      {children}
    </Component>
  );
}
