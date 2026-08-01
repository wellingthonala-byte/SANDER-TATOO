"use client";

import { AnimatePresence, m } from "framer-motion";

import { WhatsappIcon } from "@/components/icons/whatsapp";
import { useScrolled } from "@/hooks/use-scrolled";
import { EASE } from "@/lib/motion";
import { whatsappLink } from "@/lib/whatsapp";

/** Floating WhatsApp shortcut. Appears after the hero and stays put. */
export function WhatsappButton() {
  const visible = useScrolled(340);

  return (
    <AnimatePresence>
      {visible ? (
        <m.a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com o estúdio pelo WhatsApp"
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="group fixed right-5 bottom-5 z-60 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-[#04160b] shadow-[0_18px_40px_-12px_rgba(37,211,102,0.55)] transition-transform duration-500 ease-premium hover:scale-105 sm:right-7 sm:bottom-7"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring"
          />
          <WhatsappIcon className="relative size-7" />
        </m.a>
      ) : null}
    </AnimatePresence>
  );
}
