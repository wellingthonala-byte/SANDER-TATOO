"use client";

import * as React from "react";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";

import { Logo } from "@/components/common/logo";
import { WhatsappIcon } from "@/components/icons/whatsapp";
import { Button } from "@/components/ui/button";
import { navItems, sectionIds } from "@/data/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import { useScrolled } from "@/hooks/use-scrolled";
import { EASE } from "@/lib/motion";
import { siteConfig } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Header() {
  const scrolled = useScrolled(32);
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = React.useState(false);

  useLockBodyScroll(menuOpen);

  // Close the drawer when the viewport grows past the mobile breakpoint.
  React.useEffect(() => {
    const list = window.matchMedia("(min-width: 1024px)");
    const close = () => list.matches && setMenuOpen(false);
    list.addEventListener("change", close);
    return () => list.removeEventListener("change", close);
  }, []);

  const bookingHref = whatsappLink(
    `Olá! Vim pelo site da ${siteConfig.name} e gostaria de agendar uma sessão.`,
  );

  return (
    <>
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-brand focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-widest"
      >
        Ir para o conteúdo
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-premium",
          scrolled
            ? "border-b border-hairline bg-ink/85 backdrop-blur-xl supports-[backdrop-filter]:bg-ink/70"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-page flex items-center justify-between transition-[height] duration-700 ease-premium",
            scrolled ? "h-[4.5rem]" : "h-20 lg:h-24",
          )}
        >
          <a
            href="#inicio"
            className="shrink-0 text-white transition-opacity duration-400 hover:opacity-80"
          >
            <Logo />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block px-3.5 py-2 text-[0.6875rem] font-medium uppercase tracking-[0.18em] transition-colors duration-400 ease-premium xl:px-4",
                        isActive ? "text-white" : "text-muted hover:text-white",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3.5 -bottom-0.5 h-px origin-center bg-brand-hover transition-transform duration-500 ease-premium xl:inset-x-4",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={bookingHref} target="_blank" rel="noopener noreferrer">
                Agendar
                <WhatsappIcon className="size-4" />
              </a>
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              className="flex size-11 items-center justify-center border border-hairline text-white transition-colors duration-400 hover:border-hairline-strong lg:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-40 bg-ink/97 backdrop-blur-xl lg:hidden"
          >
            <nav
              aria-label="Navegação mobile"
              className="container-page flex h-full flex-col justify-center pt-20 pb-12"
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <m.li
                    key={item.id}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.05 + index * 0.045, ease: EASE }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-baseline gap-4 border-b border-hairline py-4 font-display text-2xl uppercase transition-colors duration-300 sm:text-3xl",
                        active === item.id ? "text-white" : "text-muted hover:text-white",
                      )}
                    >
                      <span className="text-[0.625rem] font-sans tracking-[0.3em] text-brand">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  </m.li>
                ))}
              </ul>

              <m.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.42, ease: EASE }}
                className="mt-10"
              >
                <Button asChild size="lg" className="w-full">
                  <a href={bookingHref} target="_blank" rel="noopener noreferrer">
                    <WhatsappIcon className="size-5" />
                    Agendar pelo WhatsApp
                  </a>
                </Button>
                <p className="mt-6 text-center text-xs tracking-[0.2em] text-faint uppercase">
                  {siteConfig.contact.phoneLabel}
                </p>
              </m.div>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
