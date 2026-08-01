"use client";

import { LazyMotion } from "framer-motion";

/**
 * Framer Motion's DOM feature set is loaded in its own chunk, after hydration.
 * Components use the lightweight `m.*` primitives, so the initial bundle only
 * carries the renderer — not the whole animation engine.
 */
const loadFeatures = () => import("framer-motion").then((mod) => mod.domAnimation);

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
