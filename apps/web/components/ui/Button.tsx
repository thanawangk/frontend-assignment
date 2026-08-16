import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "link" | "icon";

const baseClass =
  "inline-flex cursor-pointer items-center justify-center gap-2" +
  "disabled:cursor-not-allowed disabled:opacity-50";

const buttonVariantClass: Record<ButtonVariant, string> = {
  primary:
    "rounded-full bg-black px-8 py-3 text-body-md text-white hover:opacity-90",
  link: "hover:opacity-80",
  icon: "rounded-full p-1 hover:opacity-70",
};

interface ButtonProps {
  variant?: ButtonVariant;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
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
      className={cn(baseClass, buttonVariantClass[variant], className)}
    >
      {children}
    </button>
  );
}
