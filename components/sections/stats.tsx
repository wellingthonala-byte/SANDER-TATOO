"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

import { stats } from "@/data/about";

/**
 * Numeric proof strip. Counters start once, when the strip first enters view.
 */
export function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "-80px 0px" });

  return (
    <dl
      ref={ref}
      className="mt-16 grid grid-cols-2 gap-px border-t border-hairline bg-hairline lg:mt-20 lg:grid-cols-4"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="bg-ink-soft px-2 pt-8 pb-2 text-center lg:text-left">
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span className="font-display text-4xl leading-none text-white lg:text-5xl">
              {inView ? (
                <CountUp
                  end={stat.value}
                  duration={2.4}
                  decimals={stat.decimals ?? 0}
                  decimal=","
                  separator="."
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  useEasing
                />
              ) : (
                <span aria-hidden>0</span>
              )}
            </span>
            <span className="mt-3 block text-[0.625rem] uppercase tracking-[0.24em] text-faint">
              {stat.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
