import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type LogoProps = {
  className?: string;
  /** Hides the wordmark, keeping only the monogram. */
  compact?: boolean;
};

export function Logo({ className, compact = false }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="relative flex size-10 items-center justify-center">
        <svg viewBox="0 0 40 40" className="size-10" aria-hidden focusable="false">
          <circle cx="20" cy="20" r="18.6" fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
          <circle cx="20" cy="20" r="15.4" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="0.7" />
          <text
            x="20"
            y="26.4"
            textAnchor="middle"
            fontFamily="var(--font-display), Georgia, serif"
            fontSize="19"
            fontWeight="300"
            fill="currentColor"
          >
            S
          </text>
        </svg>
      </span>

      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-light uppercase tracking-[0.2em] text-white">
            Sander
          </span>
          <span className="mt-1 text-[0.5rem] font-medium uppercase tracking-[0.42em] text-muted">
            Tattoo Ink
          </span>
        </span>
      ) : null}

      {compact ? <span className="sr-only">{siteConfig.name}</span> : null}
    </span>
  );
}
