"use client";

import * as React from "react";
import { AnimatePresence, m } from "framer-motion";

import { WhatsappIcon } from "@/components/icons/whatsapp";
import { useScrolled } from "@/hooks/use-scrolled";
import { EASE } from "@/lib/motion";
import { whatsappLink } from "@/lib/whatsapp";

/** Sections that already offer a prominent WhatsApp action of their own. */
const REDUNDANT_SECTIONS = ["#contato", "#cta"];

/**
 * Floating WhatsApp shortcut. Appears after the hero and steps aside over the
 * contact form and the closing CTA — on a phone it would otherwise sit on top
 * of the very fields and buttons it duplicates.
 */
export function WhatsappButton() {
  const scrolledPastHero = useScrolled(340);
  const [overRedundantSection, setOverRedundantSection] = React.useState(false);

  React.useEffect(() => {
    const targets = REDUNDANT_SECTIONS.map((id) => document.querySelector(id)).filter(
      (el): el is Element => el !== null,
    );
    if (targets.length === 0) return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setOverRedundantSection(visible.size > 0);
      },
      // Only once the section really occupies the lower half of the screen.
      { rootMargin: "-45% 0px -10% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const visible = scrolledPastHero && !overRedundantSection;

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
          className="group fixed right-4 bottom-4 z-60 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-[#04160b] shadow-[0_18px_40px_-12px_rgba(37,211,102,0.55)] transition-transform duration-500 ease-premium hover:scale-105 sm:right-7 sm:bottom-7"
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
