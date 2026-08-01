"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-spy: returns the id of the section currently occupying the viewport.
 * Uses a single IntersectionObserver with a band just under the header.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }

        if (visible.size === 0) return;

        // The section with the largest visible area wins.
        const [topId] = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        setActive(topId);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.05, 0.25, 0.5, 0.75],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
