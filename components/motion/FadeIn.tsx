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
}: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  const offset = {
    bottom: { y: distance, x: 0 },
    top: { y: -distance, x: 0 },
    left: { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
  }[from];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }
      }
    >
      {children}
    </MotionTag>
  );
}