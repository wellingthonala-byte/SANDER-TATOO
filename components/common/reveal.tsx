"use client";

import { m, type Variants } from "framer-motion";
import * as React from "react";

import { fade, stagger, viewportOnce } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right";

type RevealProps = React.ComponentProps<typeof m.div> & {
  direction?: Direction;
  delay?: number;
  /** Renders as a stagger container: direct <Reveal.Item> children animate in sequence. */
  as?: "div" | "section" | "ul" | "li" | "span" | "article" | "header" | "footer";
  variants?: Variants;
};

/** Scroll-triggered entrance. One-shot: elements never re-animate on scroll back. */
export function Reveal({
  direction = "up",
  delay = 0,
  as = "div",
  variants,
  children,
  ...props
}: RevealProps) {
  const Component = m[as] as typeof m.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants ?? fade(direction, delay)}
      {...props}
    >
      {children}
    </Component>
  );
}

/** Container whose children animate one after another. */
export function RevealGroup({
  staggerChildren = 0.09,
  delayChildren = 0,
  as = "div",
  children,
  ...props
}: Omit<RevealProps, "direction" | "delay" | "variants"> & {
  staggerChildren?: number;
  delayChildren?: number;
}) {
  const Component = m[as] as typeof m.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={stagger(staggerChildren, delayChildren)}
      {...props}
    >
      {children}
    </Component>
  );
}

/** Child of <RevealGroup>. Inherits the parent's orchestration. */
export function RevealItem({
  direction = "up",
  as = "div",
  variants,
  children,
  ...props
}: Omit<RevealProps, "delay">) {
  const Component = m[as] as typeof m.div;

  return (
    <Component variants={variants ?? fade(direction)} {...props}>
      {children}
    </Component>
  );
}
