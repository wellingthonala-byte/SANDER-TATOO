"use client";

import * as React from "react";
import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

import { WhatsappIcon } from "@/components/icons/whatsapp";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

type HeadlinePart = { text: string; accent?: boolean };

const headline: HeadlinePart[][] = [
  [{ text: "Sua próxima" }],
  [{ text: "tatuagem", accent: true }],
  [{ text: "começa com" }],
  [{ text: "uma obra de arte." }],
];

export function Hero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Início"
      className="relative flex min-h-svh items-center overflow-hidden bg-ink"
    >
      {/* Artwork — full bleed, then masked back to the right half by gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-reveal-image">
          <m.div
            style={reduceMotion ? undefined : { y: imageY, scale: imageScale }}
            className="grain-overlay absolute inset-[-8%]"
          >
            <Image
              src="/images/hero-tattoo.webp"
              alt="Detalhe de tatuagem em realismo sendo finalizada no estúdio Sander Tattoo Ink"
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-[70%_center] lg:object-center"
            />
          </m.div>
        </div>

        {/* Overlays: keep the left column readable, let the artwork breathe on the right */}
        <div aria-hidden className="absolute inset-0 bg-ink/74 lg:hidden" />
        <div
          aria-hidden
          className="absolute inset-0 hidden bg-linear-to-r from-ink from-20% via-ink/70 via-50% to-ink/5 lg:block"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/40"
        />
      </div>

      <m.div
        style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-page relative z-10 pt-32 pb-28 lg:pt-40 lg:pb-36"
      >
        <div className="max-w-2xl">
          <div
            className="mb-8 flex animate-rise-soft items-center gap-3"
            style={{ animationDelay: "0.15s" }}
          >
            <span className="h-px w-10 bg-brand" aria-hidden />
            <span className="text-eyebrow text-bronze">
              {siteConfig.address.district} · {siteConfig.address.city}
            </span>
          </div>

          <h1 className="font-display text-[2.6rem] leading-[1.03] uppercase sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]">
            {headline.map((line, lineIndex) => (
              <span key={lineIndex} className="block overflow-hidden">
                <span
                  className="block animate-rise"
                  style={{ animationDelay: `${0.1 + lineIndex * 0.07}s` }}
                >
                  {line.map((part, partIndex) => (
                    <span
                      key={partIndex}
                      className={part.accent ? "text-brand-hover" : undefined}
                    >
                      {part.text}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="mt-8 max-w-md animate-rise-soft text-sm leading-relaxed text-muted sm:text-base"
            style={{ animationDelay: "0.68s" }}
          >
            Transformamos ideias em tatuagens exclusivas, com qualidade, segurança e
            acabamento impecável.
          </p>

          <div
            className="mt-11 flex animate-rise-soft flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: "0.82s" }}
          >
            <Button asChild size="lg">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <WhatsappIcon className="size-5" />
                Agendar pelo WhatsApp
              </a>
            </Button>

            <Button asChild size="lg" variant="outline">
              <a href="#portfolio">
                Ver portfólio
                <ArrowRight className="size-4 transition-transform duration-500 ease-premium group-hover/button:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </m.div>

      <a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        style={{ animationDelay: "1.3s" }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 animate-rise-soft flex-col items-center gap-2 text-faint transition-colors duration-400 hover:text-white lg:flex"
      >
        <span className="text-[0.5625rem] uppercase tracking-[0.34em]">Role</span>
        <m.span
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4" />
        </m.span>
      </a>
    </section>
  );
}
