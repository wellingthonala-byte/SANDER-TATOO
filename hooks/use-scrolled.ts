"use client";

import { useEffect, useState } from "react";

/**
 * True once the page has scrolled past `offset`.
 * Reads are throttled to animation frames so the header never thrashes layout.
 */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > offset);
        frame = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [offset]);

  return scrolled;
}
