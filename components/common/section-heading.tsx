import { cn } from "@/lib/utils";
import { Reveal } from "@/components/common/reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal direction="up" className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-brand" aria-hidden />
          <span className="text-eyebrow text-bronze">{eyebrow}</span>
          {align === "center" ? <span className="h-px w-8 bg-brand" aria-hidden /> : null}
        </Reveal>
      ) : null}

      <Reveal direction="up" delay={0.06}>
        <h2 className="text-balance text-3xl leading-[1.08] uppercase sm:text-4xl lg:text-[2.9rem]">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal
          direction="up"
          delay={0.12}
          className={cn("mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base", {
            "mx-auto": align === "center",
          })}
        >
          {description}
        </Reveal>
      ) : null}
    </div>
  );
}
