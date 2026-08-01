import Image from "next/image";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";

/** Splits the questions into two balanced columns, as in the reference layout. */
const columns = [
  faqItems.filter((_, index) => index % 2 === 0),
  faqItems.filter((_, index) => index % 2 === 1),
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="relative overflow-hidden bg-ink py-24 lg:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src="/images/faq-bg.webp"
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink" />
        <div className="absolute inset-0 bg-linear-to-b from-ink via-transparent to-ink" />
      </div>

      <div className="container-page">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <span id="faq-title">
              Perguntas <span className="text-brand-hover">frequentes</span>
            </span>
          }
          description="Tudo o que você precisa saber antes da sua sessão. Ficou alguma dúvida? Fale com a gente."
        />

        <div className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-2 lg:gap-5">
          {columns.map((column, columnIndex) => (
            <Reveal
              key={columnIndex}
              direction={columnIndex === 0 ? "left" : "right"}
              delay={columnIndex * 0.08}
            >
              <Accordion type="single" collapsible className="flex flex-col gap-4 lg:gap-5">
                {column.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
