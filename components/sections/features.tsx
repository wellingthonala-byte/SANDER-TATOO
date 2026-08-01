import { Reveal, RevealGroup, RevealItem } from "@/components/common/reveal";
import { features } from "@/data/features";

export function Features() {
  return (
    <section
      id="diferenciais"
      aria-labelledby="diferenciais-title"
      className="border-y border-hairline bg-ink-soft"
    >
      <div className="container-page py-14 lg:py-16">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-center xl:gap-14">
          <Reveal direction="right" className="flex shrink-0 items-center gap-3">
            <span className="h-px w-8 bg-brand" aria-hidden />
            <h2 id="diferenciais-title" className="text-eyebrow font-sans text-bronze">
              Nossos diferenciais
            </h2>
          </Reveal>

          <RevealGroup
            as="ul"
            staggerChildren={0.08}
            className="grid flex-1 grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-4"
          >
            {features.map(({ icon: Icon, label }) => (
              <RevealItem
                key={label}
                as="li"
                direction="up"
                className="group flex items-center gap-3"
              >
                <Icon
                  className="size-6 shrink-0 text-muted transition-colors duration-500 ease-premium group-hover:text-brand-hover"
                  strokeWidth={1.1}
                  aria-hidden
                />
                <span className="text-[0.6875rem] leading-tight uppercase tracking-[0.16em] text-muted transition-colors duration-500 group-hover:text-white">
                  {label}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
