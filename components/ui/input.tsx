import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * `text-base` on small screens is deliberate: iOS Safari zooms the viewport
 * when a focused field renders below 16px, which throws the layout off.
 */
const fieldStyles =
  "w-full border border-hairline bg-surface/60 px-4 py-3.5 text-base text-white placeholder:text-faint transition-colors duration-400 ease-premium hover:border-hairline-strong focus:border-brand/60 focus:bg-surface focus:outline-none disabled:opacity-50 sm:text-sm aria-[invalid=true]:border-brand/70";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => (
    <input ref={ref} type={type} className={cn(fieldStyles, className)} {...props} />
  ),
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea ref={ref} className={cn(fieldStyles, "min-h-32 resize-y", className)} {...props} />
  ),
);
Textarea.displayName = "Textarea";

const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(fieldStyles, "appearance-none bg-[right_1rem_center] bg-no-repeat pr-10", className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8' fill='none'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%23B8B8B8' stroke-width='1.4'/%3E%3C/svg%3E\")",
      }}
      {...props}
    />
  ),
);
Select.displayName = "Select";

export { Input, Textarea, Select, fieldStyles };
