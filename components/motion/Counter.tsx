"use client";

import {
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  /** Value to count up to. */
  to: number;
  /** Rendered immediately after the number, e.g. "+". */
  suffix?: string;
  /** Seconds. Longer for larger numbers so the pace stays readable. */
  duration?: number;
  className?: string;
}

/**
 * Count-up number, triggered when scrolled into view.
 *
 * Two details worth knowing:
 *
 * The displayed value lives in state, but the animation itself runs through
 * Framer's imperative `animate()` rather than a spring on a DOM node. That
 * keeps the number an actual text node, so it stays selectable and readable
 * by screen readers.
 *
 * The element is given its final value in `aria-label` and the animating
 * text is hidden from assistive tech. A screen reader announcing "one,
 * four, nine, three hundred, seven hundred, one thousand" as it ticks is
 * worse than useless.
 */
export function Counter({
  to,
  suffix = "",
  duration = 1.8,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setDisplay(to);
      return;
    }

    /* easeOut: the number sprints early and settles slowly, which reads as
       deliberate. A linear count feels mechanical. */
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setDisplay(Math.round(value)),
    });

    return () => controls.stop();
  }, [isInView, to, duration, prefersReducedMotion]);

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
        {suffix}
      </span>
    </span>
  );
}