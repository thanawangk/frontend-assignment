import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <span role="status" className="inline-flex">
      <Loader2
        className={cn("size-8 animate-spin text-text-tertiary", className)}
      />
    </span>
  );
}
