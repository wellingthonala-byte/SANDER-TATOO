"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { hideClose?: boolean }
>(({ className, children, hideClose = false, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-90 bg-ink/92 backdrop-blur-md data-[state=open]:animate-fade-in" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-90 w-[min(94vw,60rem)] -translate-x-1/2 -translate-y-1/2 focus:outline-none data-[state=open]:animate-zoom-in",
        className,
      )}
      {...props}
    >
      {children}
      {!hideClose ? (
        // Above the panel where there is room; tucked into the corner on
        // phones, where placing it outside would push it off-screen.
        <DialogPrimitive.Close
          aria-label="Fechar"
          className="absolute top-2 right-2 flex size-11 items-center justify-center border border-hairline bg-ink/70 text-white backdrop-blur-sm transition-colors duration-400 hover:border-hairline-strong hover:bg-white/10 sm:-top-12 sm:right-0 sm:size-10 sm:bg-transparent sm:backdrop-blur-none"
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      ) : null}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogDescription,
};
