import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border-3 border-foreground bg-background px-4 py-3 text-base text-foreground placeholder:text-foreground/50 outline-none focus:shadow-neobrutal focus:bg-primary/5 transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
