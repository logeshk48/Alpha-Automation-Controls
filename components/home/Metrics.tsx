"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Counter } from "@/components/motion/Counter";
import { metrics } from "@/data/company";

/* --------------------------------------------------------------------------
   METRICS BAND

   Lifted out of the hero so the hero can be entirely imagery once video
   lands. Proof deserves its own moment anyway — squeezed into the bottom of
   a hero it reads as decoration.

   The band is near-black against the hero's graphite, so the transition
   between them registers as a section change without needing a divider.
   -------------------------------------------------------------------------- */

export function Metrics() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 md:py-28">
      {/* Accent hairline along the top edge, drawing outward from the left as
          the section arrives. A static rule would be invisible; a drawn one
          announces the band. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left bg-linear-to-r from-accent-500 via-accent-500/40 to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      <div className="shell">
        <motion.p
          className="eyebrow text-ink-600"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          By the numbers
        </motion.p>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4 lg:gap-x-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              className="group relative"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.8,
                /* Cells arrive left to right, each trailing the last. The
                   counters inside carry the same delay, so the number starts
                   running as its cell settles rather than before it. */
                delay: prefersReducedMotion ? 0 : index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Vertical rule that grows downward on hover. The metrics are
                  static content, so this is the only signal available that
                  they are worth reading. */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-full w-px origin-top scale-y-100 bg-ink-800 transition-colors duration-500 group-hover:bg-accent-500"
              />

              <div className="pl-5 md:pl-7">
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <Counter
                    to={metric.to}
                    suffix={metric.suffix}
                    delay={prefersReducedMotion ? 0 : index * 0.12}
                    className="block text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[0.9] tracking-[-0.03em] tabular-nums text-ink-000"
                  />
                  <span className="mt-4 block max-w-[14ch] text-sm leading-snug text-ink-400 transition-colors duration-500 group-hover:text-ink-200">
                    {metric.label}
                  </span>
                </dd>
              </div>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}