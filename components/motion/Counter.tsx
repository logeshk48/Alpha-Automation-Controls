"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  /** Value to count up to. */
  to: number;
  /** Rendered immediately after the number, e.g. "+". */
  suffix?: string;
  /** Seconds. Longer for larger numbers so the pace stays readable. */
  duration?: number;
  /** Seconds to wait after entering view. Used to stagger a row. */
  delay?: number;
  className?: string;
}

/**
 * Count-up number, triggered when scrolled into view.
 *
 * The easing is the whole effect. A linear count is a progress bar; a hard
 * decelerating curve makes the number sprint and then settle, which reads as
 * a value arriving rather than a loop finishing. Most of the duration is
 * spent in the last 20% of the range.
 *
 * Accessibility: the element carries its final value in aria-label and the
 * ticking text is hidden. A screen reader announcing every intermediate
 * number would be worse than useless.
 */
export function Counter({
  to,
  suffix = "",
  duration = 2.4,
  delay = 0,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplay(to);
      return;
    }

    const controls = animate(0, to, {
      duration,
      delay,
      /* expo-out: ~80% of the range covered in the first third, then a long
         settle. This is what makes the number feel like it lands. */
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => setDisplay(Math.round(value)),
    });

    return () => controls.stop();
  }, [isInView, to, duration, delay, prefersReducedMotion]);

  return (
    <span
      ref={ref}
      className={className}
      /* Assistive tech gets the final value immediately, not the ticking. */
      aria-label={`${to}${suffix}`}
      role="text"
    >
      <span aria-hidden="true">
        {display.toLocaleString("en-IN")}
        <span className="text-accent-500">{suffix}</span>
      </span>
    </span>
  );
}