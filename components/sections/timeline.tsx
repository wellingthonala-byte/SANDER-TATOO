"use client";

import { m } from "framer-motion";

import { SectionHeading } from "@/components/common/section-heading";
import { timelineSteps } from "@/data/timeline";
import { EASE, viewportOnce } from "@/lib/motion";

export function Timeline() {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="bg-ink py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Como funciona"
          title={
            <span id="como-funciona-title">
              Do primeiro contato à <span className="text-brand-hover">agulha</span>
            </span>
          }
          description="Um processo transparente, pensado para você acompanhar cada etapa do seu projeto."
        />

        <div className="relative mt-16 lg:mt-24">
          {/* Connector: horizontal on desktop, vertical on mobile */}
          <m.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.5, ease: EASE }}
            className="absolute top-8 right-[10%] left-[10%] hidden h-px origin-left bg-linear-to-r from-transparent via-hairline-strong to-transparent lg:block"
          />
          <m.span
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.5, ease: EASE }}
            className="absolute top-6 bottom-6 left-8 w-px origin-top bg-linear-to-b from-transparent via-hairline-strong to-transparent lg:hidden"
          />

          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {timelineSteps.map(({ step, icon: Icon, title, description }, index) => (
              <m.li
                key={step}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.75, delay: index * 0.13, ease: EASE }}
                className="group flex items-start gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                <div className="relative shrink-0">
                  <span
                    aria-hidden
                    className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 border border-hairline bg-ink px-2 py-0.5 font-sans text-[0.625rem] tracking-[0.14em] text-bronze sm:text-[0.5625rem] transition-colors duration-600 group-hover:border-brand/50 group-hover:text-brand-hover"
                  >
                    {String(step).padStart(2, "0")}
                  </span>
                  <span className="flex size-16 items-center justify-center rounded-full border border-hairline bg-surface transition-all duration-700 ease-premium group-hover:-translate-y-1 group-hover:border-brand/60 group-hover:bg-surface-raised group-hover:shadow-[0_20px_50px_-24px_rgba(179,38,38,0.85)]">
                    <Icon
                      className="size-6 text-muted transition-colors duration-500 group-hover:text-brand-hover"
                      strokeWidth={1.15}
                      aria-hidden
                    />
                  </span>
                </div>

                <div className="lg:mt-6">
                  <h3 className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.18em] text-white">
                    {title}
                  </h3>
                  <p className="mt-2.5 max-w-56 text-[0.8125rem] leading-relaxed text-muted lg:mx-auto">
                    {description}
                  </p>
                </div>
              </m.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
