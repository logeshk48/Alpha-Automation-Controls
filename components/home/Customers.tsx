"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { customers, customersSection } from "@/data/customers";

/* --------------------------------------------------------------------------
   03 · CUSTOMERS

   One row, dark band.

   WHITE BOXES ON DARK — the problem this section is built around.
   Several supplied logos are JPGs with baked white backgrounds. On a light
   band, mix-blend-multiply drops that white cleanly; on dark it does
   nothing. So the logos are inverted instead: invert(1) turns white to black,
   which disappears into the surface, and turns dark marks white, which read.

   Do NOT add brightness-0 alongside invert. It flattens every pixel to black
   first, so inversion then produces a solid white silhouette with no internal
   detail — the logos become unreadable blobs. That was a real bug here.

   The trade-off is that inverted logos are monochrome; brand colour cannot
   survive inversion. That is why the hover state lifts and glows rather than
   restoring colour — with these source files, colour is not available. When
   Alpha supplies transparent PNGs or SVGs, drop `invert`, add `grayscale`,
   and swap the hover to `grayscale-0` for true brand colour.

   VELOCITY COUPLING: the row drifts at rest and surges while the page
   scrolls, then settles. It should register as weight, not performance.
   -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Pixels per second at rest. */
const REST_SPEED = -100;

export function Customers() {
  const prefersReducedMotion = useReducedMotion();
  const d = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  const x = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  /* Raw velocity is far too twitchy to drive anything visible. The spring
     smooths it; the clamp stops a flick gesture from launching the row. */
  const smoothed = useSpring(scrollVelocity, { damping: 50, stiffness: 300 });
  const velocityFactor = useSpring(
    useTransform(smoothed, [-2000, 0, 2000], [-2.2, 0, 2.2], { clamp: true }),
    { damping: 40, stiffness: 200 },
  );

  /* The track holds the list twice, so wrapping at exactly half its width
     puts the second copy where the first began — an invisible reset. */
  useAnimationFrame((_, delta) => {
    if (isPaused.current || prefersReducedMotion) return;

    const track = trackRef.current;
    if (!track) return;

    const half = track.scrollWidth / 2;
    if (half === 0) return;

    const drift = (REST_SPEED * delta) / 1000;
    /* Velocity adds on top of the resting drift rather than replacing it, so
       the row never stalls when the reader stops scrolling. */
    const boost = velocityFactor.get() * REST_SPEED * (delta / 1000);

    let next = x.get() + drift + boost;

    if (next <= -half) next += half;
    if (next >= 0) next -= half;

    x.set(next);
  });

  const doubled = [...customers, ...customers];

  return (
        <section className="relative overflow-hidden border-y border-ink-800 bg-ink-950 pb-14 pt-20 text-ink-000 md:pb-16 md:pt-24">
      {/* Faint accent wash — stops the band reading as a flat black rectangle
          between two other dark sections. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(63,163,91,0.07)_0%,rgba(8,9,10,0)_70%)]"
      />
      <div
        aria-hidden="true"
        className="texture-grid pointer-events-none absolute inset-0 text-ink-500 opacity-15"
      />

      <div className="shell relative">
        {/* Centred header. A centred line above a centred row composes as one
            object; mixing alignments makes them read as two elements. */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            className="eyebrow inline-flex items-center gap-3 text-ink-500"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: d(0.5), ease: EASE }}
          >
            <span aria-hidden="true" className="h-px w-8 bg-ink-700" />
            <span className="text-accent-500">{customersSection.index}</span>
            <span className="text-ink-700">/</span>
            {customersSection.eyebrow}
            <span aria-hidden="true" className="h-px w-8 bg-ink-700" />
          </motion.p>

          <h2 className="mt-7 text-display-md font-semibold tracking-[-0.03em]">
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
                {customersSection.headingLead}{" "}
                <span className="italic text-ink-500">
                  {customersSection.headingEmphasis}
                </span>
              </motion.span>
            </motion.span>
          </h2>

          <motion.p
            className="mx-auto mt-6 max-w-lg text-[0.9375rem] leading-relaxed text-ink-400"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: d(0.7), delay: d(0.18), ease: EASE }}
          >
            {customersSection.description}
          </motion.p>
        </div>
      </div>

      {/* The row sits outside the shell so it runs the full width. */}
      <motion.div
                className="marquee-mask marquee-row mt-14"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: d(1.1), delay: d(0.25), ease: EASE }}
        onMouseEnter={() => (isPaused.current = true)}
        onMouseLeave={() => (isPaused.current = false)}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-center gap-16 py-6 md:gap-24"
        >
          {doubled.map((customer, index) => (
            <div
              key={`${customer.name}-${index}`}
              className="group relative flex shrink-0 items-center justify-center px-8 py-5"
              /* The duplicate half is decorative — announcing every customer
                 name twice would be noise for screen reader users. */
              aria-hidden={index >= customers.length ? "true" : undefined}
            >
              {/* Hover plate. Scales up from 92% behind the logo, so the
                  highlight arrives as a surface rather than a border
                  switching on. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 scale-92 rounded-xl border border-accent-500/30 bg-ink-800/60 opacity-0 shadow-[0_0_40px_-8px_rgba(63,163,91,0.35)] backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100"
              />

              {customer.logo ? (
                <Image
                  src={customer.logo}
                  alt={customer.name}
                  width={220}
                  height={72}
                  /* invert alone — see the note at the top of this file about
                     why brightness-0 must not be added here. */
                  className="relative h-12 w-auto object-contain opacity-70 invert transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:opacity-100 md:h-14"
                />
              ) : (
                <span className="relative whitespace-nowrap font-mono text-sm tracking-[0.08em] text-ink-500 transition-colors duration-500 group-hover:text-ink-000">
                  {customer.name}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}