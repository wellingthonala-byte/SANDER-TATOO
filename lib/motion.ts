import type { Transition, Variants } from "framer-motion";

/** Shared easing — long, soft deceleration. Nothing snappy, nothing bouncy. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const baseTransition: Transition = { duration: 0.8, ease: EASE };

type Direction = "up" | "down" | "left" | "right";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 40 },
  right: { x: -40 },
};

export function fade(direction: Direction = "up", delay = 0, distance = 1): Variants {
  const offset = offsets[direction];
  return {
    hidden: {
      opacity: 0,
      x: (offset.x ?? 0) * distance,
      y: (offset.y ?? 0) * distance,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { ...baseTransition, delay },
    },
  };
}

export const fadeUp = fade("up");
export const fadeLeft = fade("left");
export const fadeRight = fade("right");

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

export function stagger(staggerChildren = 0.09, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

/** Default viewport config for scroll-triggered sections. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
