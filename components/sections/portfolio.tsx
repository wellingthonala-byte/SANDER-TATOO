"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Expand } from "lucide-react";

import { SectionHeading } from "@/components/common/section-heading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { itemsByCategory, portfolioCategories, type PortfolioItem } from "@/data/portfolio";
import { EASE } from "@/lib/motion";
import { siteConfig } from "@/lib/site";

export function Portfolio() {
  const [category, setCategory] = React.useState(portfolioCategories[0].id);
  const [preview, setPreview] = React.useState<PortfolioItem | null>(null);

  const items = React.useMemo(() => itemsByCategory(category), [category]);

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="relative bg-ink py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Portfólio"
          title={
            <span id="portfolio-title">
              Trabalhos que <span className="text-brand-hover">marcam</span> histórias
            </span>
          }
          description="Uma seleção de projetos autorais desenvolvidos no estúdio, organizados por estilo."
        />

        <Tabs value={category} onValueChange={setCategory} className="mt-14 lg:mt-16">
          <TabsList aria-label="Filtrar portfólio por estilo" className="border-y border-hairline">
            {portfolioCategories.map((item) => (
              <TabsTrigger key={item.id} value={item.id} className="group">
                {item.label}
                <span
                  aria-hidden
                  className="absolute inset-x-2 bottom-0 h-0.5 origin-center scale-x-0 bg-brand transition-transform duration-500 ease-premium group-data-[state=active]:scale-x-100"
                />
              </TabsTrigger>
            ))}
          </TabsList>

          {portfolioCategories.map((item) => (
            <TabsContent key={item.id} value={item.id} className="mt-10 lg:mt-12">
              <AnimatePresence mode="wait">
                <m.ul
                  key={category}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.06 } },
                    exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
                  }}
                  className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5"
                >
                  {items.map((work) => (
                    <m.li
                      key={work.id}
                      variants={{
                        hidden: { opacity: 0, y: 26, scale: 0.98 },
                        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
                        exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: EASE } },
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setPreview(work)}
                        className="group relative block w-full overflow-hidden border border-hairline bg-surface"
                      >
                        <span className="relative block aspect-4/5 overflow-hidden">
                          <Image
                            src={work.src}
                            alt={work.alt}
                            fill
                            loading="lazy"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 30vw"
                            className="object-cover transition-transform duration-[1.1s] ease-premium group-hover:scale-108"
                          />
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-70 transition-opacity duration-700 ease-premium group-hover:opacity-95"
                          />
                        </span>

                        <span className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4 text-left sm:p-5">
                          {/* Shown outright on phones — there is no hover to
                              trigger it there — and revealed on hover from the
                              tablet breakpoint up. */}
                          <span className="translate-y-0 opacity-100 transition-all duration-600 ease-premium sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                            <span className="flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.24em] text-brand-hover">
                              <Expand className="size-3.5" />
                              Visualizar
                            </span>
                          </span>
                          <span className="mt-2.5 font-display text-lg text-white sm:text-xl">
                            {work.title}
                          </span>
                          <span className="mt-1 text-[0.6875rem] tracking-[0.12em] text-muted uppercase">
                            {work.meta}
                          </span>
                        </span>

                        <span
                          aria-hidden
                          className="absolute inset-0 border border-brand/0 transition-colors duration-700 ease-premium group-hover:border-brand/50"
                        />
                      </button>
                    </m.li>
                  ))}
                </m.ul>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-14 flex justify-center">
          <Button asChild variant="outline" size="lg">
            <a href={siteConfig.contact.instagramUrl} target="_blank" rel="noopener noreferrer">
              Ver mais trabalhos
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-premium group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
            </a>
          </Button>
        </div>
      </div>

      <Dialog open={preview !== null} onOpenChange={(open) => !open && setPreview(null)}>
        <DialogContent>
          {preview ? (
            <figure className="border border-hairline bg-surface">
              {/* Capped in viewport units so the panel always fits the screen,
                  caption included, without the page scrolling behind it. */}
              <div className="relative h-[62svh] w-full sm:aspect-16/10 sm:h-auto">
                <Image
                  src={preview.src}
                  alt={preview.alt}
                  fill
                  sizes="(max-width: 1024px) 94vw, 60rem"
                  className="object-cover"
                />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-hairline px-4 py-4 sm:px-5">
                <DialogTitle className="font-display text-xl text-white">
                  {preview.title}
                </DialogTitle>
                <DialogDescription className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
                  {preview.meta}
                </DialogDescription>
              </figcaption>
            </figure>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
