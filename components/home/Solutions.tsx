"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { homepageServices, solutionsSection } from "@/data/services";

/* --------------------------------------------------------------------------
   01 · SOLUTIONS

   Dark band. Header inside the shell; tiles break out and run edge to edge.

   MASK REVEAL — read before editing the heading.
   The trigger lives on the OUTER span and propagates to the inner one via
   variants. It cannot live on the inner span: that element starts parked at
   y:105%, entirely outside its overflow-hidden parent, and IntersectionObserver
   accounts for ancestor clipping — so it reports 0% visible, never triggers,
   and never unparks. Parent triggers, child animates.
   -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

export function Solutions() {
  const prefersReducedMotion = useReducedMotion();
  const d = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-ink-000 md:py-24">
      {/* ---- HEADER --------------------------------------------------- */}
      <div className="shell">
        <motion.p
          className="eyebrow flex items-center gap-3 text-ink-500"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: d(0.5), ease: EASE }}
        >
          <span className="text-accent-500">{solutionsSection.index}</span>
          <span className="text-ink-700">/</span>
          {solutionsSection.eyebrow}
          <span aria-hidden="true" className="h-px w-10 bg-ink-700" />
        </motion.p>

        {/* Trigger on the outer span — see the note above. */}
        <h2 className="mt-6 text-display-lg font-semibold tracking-[-0.03em]">
          <motion.span
            className="block overflow-hidden pb-[0.12em]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.span
              className="block"
              variants={{
                hidden: { y: "105%" },
                visible: {
                  y: "0%",
                  transition: { duration: d(0.9), ease: EASE },
                },
              }}
            >
              {solutionsSection.headingLead}{" "}
              {/* The one typographic flourish in the section — it marks the
                  resolution of the statement rather than decorating it. */}
              <span className="italic text-ink-500">
                {solutionsSection.headingEmphasis}
              </span>
            </motion.span>
          </motion.span>
        </h2>

        {/* Description and link share a row, separated by a rule that fills
            the space between them. Left prose with a far-right link and
            nothing between reads as two orphans. */}
        <motion.div
          className="mt-7 flex flex-col gap-5 md:flex-row md:items-center md:gap-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: d(0.7), delay: d(0.18), ease: EASE }}
        >
          <p className="max-w-lg text-[0.9375rem] leading-relaxed text-ink-400">
            {solutionsSection.description}
          </p>

          <span
            aria-hidden="true"
            className="hidden h-px flex-1 bg-linear-to-r from-ink-800 to-transparent md:block"
          />

          <Link
            href={solutionsSection.linkHref}
            className="group inline-flex shrink-0 items-center gap-2.5 border-b border-ink-700 pb-1 text-sm font-semibold text-ink-100 transition-colors duration-300 hover:border-accent-500 hover:text-accent-400"
          >
            {solutionsSection.linkLabel}
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>

      {/* ---- TILES — full bleed, outside the shell --------------------
          No gap, no radius. Hairline dividers keep the strip continuous
          rather than turning it into a row of cards. */}
      <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {homepageServices.map((service, index) => (
          <motion.li
            key={service.slug}
            className="relative border-b border-ink-800/60 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: d(0.8),
              /* Capped: past the third tile the delay would exceed the time
                 taken to scroll there, so later tiles would lag. */
              delay: d(Math.min(index, 2) * 0.1),
              ease: EASE,
            }}
          >
            <Link
              href={`/services/${service.slug}`}
              className="group relative flex min-h-[21rem] flex-col justify-end overflow-hidden md:min-h-[24rem]"
            >
              {/* ---- MEDIA ------------------------------------------
                  The gradient sits underneath permanently, so a service with
                  no image yet — or a slow connection — degrades to a
                  designed panel rather than a hole. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(125%_115%_at_25%_0%,#26313f_0%,#151a1f_58%,#0b0d0f_100%)]"
              />

              {service.image && (
                <Image
                  src={service.image}
                  /* Decorative: the tile heading already names the service,
                     so alt text would announce it twice. */
                  alt=""
                  fill
                  /* One tile wide on phones, two on tablet, three on desktop.
                     Without this the browser fetches a full-width image for a
                     third-width slot. */
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
              )}

              <span
                aria-hidden="true"
                className="texture-grid pointer-events-none absolute inset-0 text-ink-500 opacity-20"
              />
              {/* Scrim. Heavier than the gradient-only version needed —
                  photographs carry far more visual noise than a gradient, and
                  the copy has to stay legible over any of them. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/70 to-ink-950/25 transition-opacity duration-700 group-hover:opacity-85"
              />

              <span className="eyebrow absolute left-7 top-7 text-ink-400 transition-colors duration-500 group-hover:text-accent-400">
                {service.index}
              </span>

              <span
                aria-hidden="true"
                className="absolute right-7 top-7 text-lg text-ink-400 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-accent-400"
              >
                →
              </span>

              {/* Title and tagline at rest; the block lifts on hover to make
                  room for the summary expanding beneath it. */}
              <div className="relative p-7 md:p-8">
                <div className="transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
                  <h3 className="text-display-sm font-semibold leading-tight text-ink-000">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] text-ink-300 transition-colors duration-500 group-hover:text-accent-400">
                    {service.tagline}
                  </p>
                </div>

                {/* Collapsed to zero height at rest. grid-rows is the one
                    reliable way to animate to an auto height. */}
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="max-w-md pt-4 text-[0.8125rem] leading-relaxed text-ink-200">
                      {service.summary}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}