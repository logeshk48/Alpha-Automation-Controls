"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "top";
}

/**
 * Clip-path mask reveal — text rises out from behind an edge rather than
 * fading in. Reserved for headings and section statements.
 *
 * Same hydration rule as FadeIn: identical markup regardless of motion
 * preference, duration collapsed to zero when reduced motion is set.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  from = "bottom",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const closed =
    from === "bottom" ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";

  return (
    <motion.span
      className={className}
      style={{ display: "inline-block", willChange: "clip-path, transform" }}
      initial={{ clipPath: closed, y: from === "bottom" ? 20 : -20 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration: 0.7, delay, ease: [0.25, 1, 0.5, 1] }
      }
    >
      {children}
    </motion.span>
  );
}