import Image from "next/image";

import { asset } from "@/lib/assets";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Hides the wordmark, keeping only the badge. */
  compact?: boolean;
  /** Rendered size of the badge, in pixels. */
  size?: number;
};

/**
 * The studio's badge plus the wordmark. The badge carries the studio name in
 * its ring, but at header size that lettering is decorative rather than
 * readable — hence the wordmark beside it.
 */
export function Logo({ className, compact = false, size = 44 }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Image
        src={asset("/images/logo-mark.webp")}
        alt={compact ? siteConfig.name : ""}
        aria-hidden={compact ? undefined : true}
        width={size}
        height={size}
        className="shrink-0"
        style={{ width: size, height: "auto" }}
      />

      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-light uppercase tracking-[0.2em] text-white">
            Sander
          </span>
          <span className="mt-1 text-[0.5625rem] font-medium uppercase tracking-[0.36em] text-muted sm:text-[0.5rem] sm:tracking-[0.42em]">
            Tattoo Ink
          </span>
        </span>
      ) : null}
    </span>
  );
}
