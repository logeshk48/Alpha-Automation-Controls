"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "top";
  /**
   * When the reveal fires.
   *
   *   "mount" — immediately on render. Use for above-the-fold content.
   *   "view"  — when scrolled into view. Use for everything below the fold.
   *
   * This distinction matters more than it looks. A scroll-triggered reveal
   * starts fully hidden, so if the observer never fires the content is
   * invisible forever. Above the fold there is nothing to wait for, and the
   * observer is a liability rather than a feature.
   */
  trigger?: "mount" | "view";
}

/**
 * Clip-path mask reveal — text rises out from behind an edge rather than
 * fading in. Reserved for headings and section statements.
 *
 * Markup is identical regardless of motion preference; reduced motion
 * collapses the duration to zero rather than returning a different element,
 * which would cause a hydration mismatch.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  from = "bottom",
  trigger = "view",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const closed =
    from === "bottom" ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
  const open = "inset(0% 0% 0% 0%)";

  const initial = { clipPath: closed, y: from === "bottom" ? 20 : -20 };
  const target = { clipPath: open, y: 0 };

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] as const };

  const shared = {
    className,
    style: { display: "inline-block", willChange: "clip-path, transform" },
    initial,
    transition,
  };

  if (trigger === "mount") {
    return (
      <motion.span {...shared} animate={target}>
        {children}
      </motion.span>
    );
  }

  return (
    <motion.span
      {...shared}
      whileInView={target}
      /* amount rather than a negative margin: margin shrinks the detection
         area, which on short viewports can mean the trigger point sits past
         the element entirely. */
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.span>
  );
}