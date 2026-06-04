import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-bold transition-all duration-150 active:translate-x-[1.5px] active:translate-y-[1.5px] active:shadow-none disabled:pointer-events-none disabled:opacity-50 border-3 border-foreground shadow-neobrutal hover:translate-x-[-1.5px] hover:translate-y-[-1.5px] hover:shadow-neobrutal-hover",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-accent hover:text-white",
        primary: "bg-accent text-white hover:bg-primary hover:text-primary-foreground",
        outline: "bg-transparent text-foreground hover:bg-accent hover:text-white",
      },
      size: {
        default: "h-[44px] px-6",
        sm: "h-[38px] px-4 text-sm",
        lg: "h-[56px] uppercase tracking-[2px] px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
