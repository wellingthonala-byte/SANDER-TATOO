"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { SectionHeading } from "@/components/common/section-heading";
import { testimonials } from "@/data/testimonials";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const reduceMotion = usePrefersReducedMotion();

  const autoplay = React.useRef(
    Autoplay({ delay: 5200, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false, containScroll: "trimSnaps" },
    reduceMotion ? [] : [autoplay.current],
  );

  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    setSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = React.useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      className="relative overflow-hidden border-y border-hairline bg-ink-soft py-24 lg:py-32"
    >
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Depoimentos"
            title={
              <span id="depoimentos-title">
                Quem já saiu <span className="text-brand-hover">marcado</span> daqui
              </span>
            }
            className="max-w-lg"
          />

          <div className="flex items-center gap-2">
            <CarouselButton label="Depoimento anterior" onClick={scrollPrev}>
              <ChevronLeft className="size-4" />
            </CarouselButton>
            <CarouselButton label="Próximo depoimento" onClick={scrollNext}>
              <ChevronRight className="size-4" />
            </CarouselButton>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <div
            ref={emblaRef}
            className="overflow-hidden"
            role="region"
            aria-roledescription="carrossel"
            aria-label="Depoimentos de clientes"
          >
            <ul className="-ml-4 flex touch-pan-y lg:-ml-6">
              {testimonials.map((item) => (
                <li
                  key={item.id}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-4 sm:basis-1/2 lg:basis-1/3 lg:pl-6"
                >
                  <figure className="group flex h-full flex-col border border-hairline bg-surface p-6 sm:p-7 transition-all duration-700 ease-premium hover:-translate-y-1 hover:border-hairline-strong hover:bg-surface-raised lg:p-8">
                    <Quote
                      className="size-7 text-brand/45 transition-colors duration-600 group-hover:text-brand"
                      strokeWidth={1}
                      aria-hidden
                    />

                    <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted">
                      “{item.quote}”
                    </blockquote>

                    <div
                      role="img"
                      className="mt-6 flex items-center gap-1"
                      aria-label={`Avaliação ${item.rating} de 5 estrelas`}
                    >
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          aria-hidden
                          className={cn(
                            "size-3.5",
                            index < item.rating
                              ? "fill-bronze text-bronze"
                              : "text-faint",
                          )}
                        />
                      ))}
                    </div>

                    <figcaption className="mt-6 flex items-center gap-4 border-t border-hairline pt-6">
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-hairline">
                        <Image
                          src={item.avatar}
                          alt={`Foto de ${item.name}`}
                          fill
                          loading="lazy"
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-display text-lg leading-tight text-white">
                          {item.name}
                        </span>
                        <span className="mt-1 text-[0.6875rem] uppercase tracking-[0.2em] text-faint sm:text-[0.625rem]">
                          {item.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          {/* The visible indicator is a hairline, but the button around it is a
              full-size touch target. */}
          <div className="mt-6 flex justify-center lg:mt-8">
            {snaps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Ir para o depoimento ${index + 1}`}
                aria-current={selected === index}
                className="group/dot flex size-11 items-center justify-center"
              >
                <span
                  aria-hidden
                  className={cn(
                    "block h-0.5 w-8 transition-colors duration-600 ease-premium",
                    selected === index
                      ? "bg-brand-hover"
                      : "bg-hairline-strong group-hover/dot:bg-white/40",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-11 items-center justify-center border border-hairline text-muted transition-all duration-500 ease-premium hover:border-brand/60 hover:bg-brand/10 hover:text-white"
    >
      {children}
    </button>
  );
}
