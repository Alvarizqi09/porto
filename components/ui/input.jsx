import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-[48px] w-full rounded-md border-3 border-foreground bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground/50 outline-none focus:shadow-neobrutal focus:bg-primary/5 transition-all duration-150",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
