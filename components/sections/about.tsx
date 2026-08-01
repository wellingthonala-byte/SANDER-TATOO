import Image from "next/image";

import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { Stats } from "@/components/sections/stats";
import { aboutContent, pillars } from "@/data/about";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative bg-ink-soft">
      <div className="grid lg:grid-cols-[1fr_auto]">
        <div className="container-page py-24 lg:py-32 lg:pr-16">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
            {/* Intro */}
            <div>
              <Reveal direction="up" className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-brand" aria-hidden />
                <span className="text-eyebrow text-bronze">{aboutContent.eyebrow}</span>
              </Reveal>

              <Reveal direction="up" delay={0.06}>
                <h2
                  id="sobre-title"
                  className="text-3xl leading-[1.1] uppercase sm:text-4xl lg:text-[2.75rem]"
                >
                  {aboutContent.title.map((word, index) => (
                    <span key={word} className={index === 1 ? "text-brand-hover" : undefined}>
                      {word}{" "}
                    </span>
                  ))}
                </h2>
              </Reveal>

              <RevealGroup className="mt-7 space-y-5" staggerChildren={0.12}>
                {aboutContent.paragraphs.map((paragraph) => (
                  <RevealItem
                    key={paragraph.slice(0, 24)}
                    as="span"
                    className="block text-sm leading-relaxed text-muted"
                  >
                    {paragraph}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            {/* Pillars */}
            <RevealGroup className="grid gap-px bg-hairline sm:grid-cols-2" staggerChildren={0.1}>
              {pillars.map(({ icon: Icon, title, description }) => (
                <RevealItem
                  key={title}
                  direction="up"
                  className="group relative bg-ink-soft p-7 transition-colors duration-600 ease-premium hover:bg-surface"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px scale-x-0 bg-brand transition-transform duration-700 ease-premium group-hover:scale-x-100"
                  />
                  <Icon
                    className="size-6 text-bronze transition-colors duration-500 group-hover:text-brand-hover"
                    strokeWidth={1.2}
                    aria-hidden
                  />
                  <h3 className="mt-5 font-sans text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">{description}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Stats />
        </div>

        {/* Studio photograph — bleeds off the right edge on large screens */}
        <Reveal
          direction="left"
          className="relative hidden w-[26vw] max-w-[30rem] min-w-[20rem] lg:block"
        >
          <div className="grain-overlay absolute inset-0">
            <Image
              src={aboutContent.image.src}
              alt={aboutContent.image.alt}
              fill
              loading="lazy"
              sizes="30vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-r from-ink-soft via-ink-soft/35 to-transparent"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
