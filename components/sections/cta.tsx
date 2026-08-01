"use client";

import * as React from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { WhatsappIcon } from "@/components/icons/whatsapp";
import { Button } from "@/components/ui/button";
import { EASE, viewportOnce } from "@/lib/motion";
import { siteConfig } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Cta() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden border-y border-hairline"
    >
      <m.div
        aria-hidden
        style={reduceMotion ? undefined : { y }}
        className="grain-overlay absolute inset-[-14%] -z-10"
      >
        <Image
          src="/images/cta-bg.webp"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
      </m.div>

      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/78" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-transparent to-ink"
      />

      <div className="container-page py-24 text-center lg:py-36">
        <m.h2
          id="cta-title"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-balance text-3xl leading-[1.1] uppercase sm:text-5xl lg:text-[3.4rem]"
        >
          Pronto para eternizar
          <span className="mt-1 block text-brand-hover">sua ideia na pele?</span>
        </m.h2>

        <m.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
          className="mx-auto mt-7 max-w-lg text-sm leading-relaxed text-muted sm:text-base"
        >
          Agenda aberta para novos projetos. Chame no WhatsApp e receba seu orçamento hoje mesmo.
        </m.p>

        <m.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, delay: 0.24, ease: EASE }}
          className="mt-11 flex flex-col items-center gap-5"
        >
          <Button asChild size="lg" className="h-16 px-12 text-sm">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon className="size-5" />
              Agendar pelo WhatsApp
            </a>
          </Button>

          <span className="text-[0.625rem] uppercase tracking-[0.28em] text-faint">
            {siteConfig.contact.phoneLabel} · {siteConfig.address.district}
          </span>
        </m.div>
      </div>
    </section>
  );
}
