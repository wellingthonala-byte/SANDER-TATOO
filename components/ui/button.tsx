import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-sans font-medium tracking-[0.14em] uppercase transition-all duration-500 ease-premium disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-white shadow-[0_18px_40px_-18px_rgba(179,38,38,0.9)] hover:bg-brand-hover hover:shadow-[0_22px_50px_-16px_rgba(213,58,58,0.75)] hover:-translate-y-0.5",
        outline:
          "border border-hairline-strong bg-transparent text-white hover:border-white/45 hover:bg-white/5 hover:-translate-y-0.5",
        ghost: "text-muted hover:text-white",
        link: "text-brand-hover underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-5 text-[0.6875rem]",
        md: "h-12 px-7 text-xs",
        lg: "h-14 px-9 text-xs sm:text-[0.8125rem]",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
