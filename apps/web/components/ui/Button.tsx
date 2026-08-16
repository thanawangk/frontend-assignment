import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { typographyVariantClass, type TypographyVariant } from "./Typography";

export type ButtonVariant = "primary" | "link" | "icon";

const baseClass =
  "inline-flex cursor-pointer items-center justify-center gap-2 " +
  "disabled:cursor-not-allowed disabled:opacity-50";

const buttonVariantClass: Record<ButtonVariant, string> = {
  primary: "rounded-full bg-black px-8 py-3 text-white hover:opacity-90",
  link: "font-medium hover:underline underline-offset-4",
  icon: "rounded-full p-1 hover:opacity-70",
};

const defaultTextVariant: Record<ButtonVariant, TypographyVariant> = {
  primary: "body-md",
  link: "body-default",
  icon: "body-default",
};

interface ButtonProps {
  variant?: ButtonVariant;
  textVariant?: TypographyVariant;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  textVariant,
  type = "button",
  onClick,
  disabled,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClass,
        buttonVariantClass[variant],
        typographyVariantClass[textVariant ?? defaultTextVariant[variant]],
        className,
      )}
    >
      {children}
    </button>
  );
}
