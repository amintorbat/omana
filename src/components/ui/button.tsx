import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold tracking-tight transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rtl:flex-row-reverse",
  {
    variants: {
      variant: {
        primary:
          "bg-oman-red text-white shadow-soft hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-oman-red",
        outline:
          "border border-white/40 bg-white/20 text-white backdrop-blur hover:bg-white/40 focus-visible:ring-white",
        subtle:
          "bg-oman-surface text-oman-text shadow-subtle hover:-translate-y-0.5 focus-visible:ring-oman-green",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
