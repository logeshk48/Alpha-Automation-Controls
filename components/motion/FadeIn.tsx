"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  distance?: number;
  from?: "bottom" | "top" | "left" | "right";
  className?: string;
  as?: "div" | "section" | "article" | "li" | "span";
  /**
   * When the reveal fires.
   *
   *   "mount" — immediately on render. Use for above-the-fold content.
   *   "view"  — when scrolled into view. Use for everything below the fold.
   *
   * This distinction matters more than it looks. A scroll-triggered reveal
   * starts fully hidden, so if the observer never fires the content stays
   * invisible. Above the fold there is nothing to wait for, and the observer
   * is a liability rather than a feature.
   */
  trigger?: "mount" | "view";
}

/**
 * The workhorse scroll reveal: fade plus a short translate.
 *
 * HYDRATION NOTE
 * The server cannot know the visitor's motion preference, so the rendered
 * markup must be identical either way. Branching on useReducedMotion() to
 * return a different element guarantees a hydration mismatch.
 *
 * Instead the element and its initial style are always the same, and the
 * preference collapses the transition to zero — the element snaps to its
 * final state on the first frame rather than travelling there.
 */
export function FadeIn({
  children,
  delay = 0,
  distance = 24,
  from = "bottom",
  className,
  as = "div",
  trigger = "view",
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  const offset = {
    bottom: { y: distance, x: 0 },
    top: { y: -distance, x: 0 },
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
  }[from];

  const target = { opacity: 1, x: 0, y: 0 };

  const shared = {
    className,
    initial: { opacity: 0, ...offset },
    transition: prefersReducedMotion
      ? { duration: 0 }
      : { duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] as const },
  };

  if (trigger === "mount") {
    return (
      <MotionTag {...shared} animate={target}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      {...shared}
      whileInView={target}
      /* amount rather than a negative margin: margin shrinks the detection
         area, which on short viewports can push the trigger point past the
         element entirely and leave it permanently hidden. */
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </MotionTag>
  );
}