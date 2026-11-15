import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-[50px] w-full rounded-2xl border border-foreground/20 bg-card/80 backdrop-blur-sm px-5 py-3 text-base text-foreground placeholder:text-foreground/45 outline-none transition-all duration-300 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/15 focus:bg-card hover:border-foreground/35",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
