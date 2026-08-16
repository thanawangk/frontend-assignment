import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PageContainerProps {
  className?: string;
  children: ReactNode;
}

export function PageContainer({ className, children }: PageContainerProps) {
  return (
    <div className={cn("mx-4 md:mx-8 lg:mx-26", className)}>{children}</div>
  );
}
