"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/* --------------------------------------------------------------------------
   Stagger — parent/child orchestration.

   Wrap a list in <Stagger>; each <StaggerItem> inside reveals in sequence.
   The parent owns the timing, so delay maths stays in one place.

   StaggerItem must be a DIRECT child of Stagger — an intervening plain
   element breaks the variant chain and nothing animates.
   -------------------------------------------------------------------------- */

interface StaggerProps {
  children: ReactNode;
  /** Seconds between children. 0.06-0.1 reads well; beyond that it drags. */
  interval?: number;
  delay?: number;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
}

export function Stagger({
  children,
  interval = 0.07,
  delay = 0,
  className,
  as = "div",
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      /* The parent animates nothing itself — it only propagates the state
         down to its children on a timer. Reduced motion removes the timer
         so all children resolve together, instantly. */
      variants={{
        hidden: {},
        visible: {
          transition: prefersReducedMotion
            ? { staggerChildren: 0, delayChildren: 0 }
            : { staggerChildren: interval, delayChildren: delay },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

/* -------------------------------------------------------------------------- */

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "span" | "article";
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}