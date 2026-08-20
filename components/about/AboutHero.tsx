"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { aboutHero } from "@/data/about";

/* --------------------------------------------------------------------------
   ABOUT · HERO

   Shorter than the homepage hero — roughly two thirds of the viewport rather
   than filling it. A secondary page hero that demands a full screen delays
   the content the visitor actually navigated for.

   Carries a breadcrumb, which the homepage does not: once a visitor is a
   level deep, knowing where they are is worth the two lines of markup.
   -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();
  const d = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-ink-000">
      {/* Gradient stays beneath the photograph as a fallback, so a missing
          or slow-loading file degrades to a designed panel rather than a
          black hole.

          priority: this is the largest element above the fold on this route,
          so it is the Largest Contentful Paint. Without it Next defers the
          fetch and the hero renders empty for a beat. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_100%_at_75%_-10%,#1c2735_0%,#0d0f11_52%,#08090a_100%)]"
      />
      <Image
        src="/images/about/hero.jpg"
        /* Decorative — the heading over it carries the meaning, and a
           description here would be noise for screen reader users. */
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />

      <div
        aria-hidden="true"
        className="texture-grid pointer-events-none absolute inset-0 -z-10 text-ink-500 opacity-20"
      />
      {/* Scrim. Heavier on the left where the copy sits, opening to the right
          so the image reads. A flat wash would either wash out the photograph
          or leave the heading fighting for contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950/95 via-ink-950/75 to-ink-950/45"
      />
      {/* Bottom lift, so the advantages band below transitions into this
          rather than butting against a bright edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-linear-to-t from-ink-950 to-transparent"
      />

      {/* Top padding clears the fixed navbar. */}
      <div className="shell relative pb-20 pt-40 md:pb-28 md:pt-48">
        {/* Breadcrumb. nav + ol so assistive tech announces it as a
            navigation landmark rather than loose text. */}
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: d(0.5), ease: EASE }}
        >
          <ol className="eyebrow flex items-center gap-3 text-ink-400">
            <li>
              <Link
                href="/"
                className="transition-colors duration-300 hover:text-ink-100"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-ink-600">
              /
            </li>
            <li className="text-accent-400" aria-current="page">
              {aboutHero.eyebrow}
            </li>
          </ol>
        </motion.nav>

        {/* Mount-triggered, not scroll-triggered: this is above the fold, so
            it must not wait on an intersection observer. */}
        <h1 className="mt-9 max-w-[20ch] text-display-xl font-semibold">
          <motion.span
            className="block overflow-hidden pb-[0.1em]"
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="block"
              variants={{
                hidden: { y: "105%" },
                visible: {
                  y: "0%",
                  transition: { duration: d(0.9), delay: d(0.1), ease: EASE },
                },
              }}
            >
              {aboutHero.headingLead}
            </motion.span>
          </motion.span>
          <motion.span
            className="block overflow-hidden pb-[0.1em]"
            initial="hidden"
            animate="visible"
          >
            <motion.span
              className="block italic text-accent-400"
              variants={{
                hidden: { y: "105%" },
                visible: {
                  y: "0%",
                  transition: { duration: d(0.9), delay: d(0.24), ease: EASE },
                },
              }}
            >
              {aboutHero.headingEmphasis}
            </motion.span>
          </motion.span>
        </h1>

        <motion.p
          className="mt-9 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-200"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: d(0.8), delay: d(0.45), ease: EASE }}
        >
          {aboutHero.description}
        </motion.p>
      </div>
    </section>
  );
}