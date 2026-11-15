import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-2xl border border-foreground/20 bg-card/80 backdrop-blur-sm px-5 py-4 text-base text-foreground placeholder:text-foreground/45 outline-none transition-all duration-300 shadow-sm focus:border-primary focus:ring-4 focus:ring-primary/15 focus:bg-card hover:border-foreground/35 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
