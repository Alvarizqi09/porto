import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold font-display transition-all duration-300 ease-out active:scale-95 disabled:pointer-events-none disabled:opacity-50 border border-primary/30 shadow-nature hover:shadow-nature-lg",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white font-bold hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-glow",
        primary:
          "bg-accent text-white font-bold hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-glow-accent",
        outline:
          "bg-card/95 backdrop-blur-md text-foreground border-foreground/25 hover:bg-primary/10 hover:border-primary hover:text-primary hover:-translate-y-0.5 font-bold",
        ghost:
          "bg-transparent text-foreground hover:bg-primary/10 hover:text-primary border-transparent shadow-none font-bold",
        glass:
          "glass-card text-foreground border-foreground/20 hover:bg-card hover:-translate-y-0.5 font-bold",
      },
      size: {
        default: "h-[46px] px-7",
        sm: "h-[38px] px-5 text-sm",
        lg: "h-[54px] tracking-wide px-9 text-lg",
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
