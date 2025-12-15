import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, glow = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl border border-white/40 bg-white/95 p-6 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:border-oman-green/30 hover:shadow-soft",
        glow &&
          "bg-gradient-to-br from-white via-oman-cream/80 to-white shadow-soft",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";
