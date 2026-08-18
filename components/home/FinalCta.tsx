"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { primaryCta } from "@/data/navigation";

/* --------------------------------------------------------------------------
   FINAL CTA

   Full-bleed closing band. The background holds still while the content
   scrolls over it.

   CLIPPING THE FIXED LAYER — the bug this file previously had.
   A `fixed` element positions against the viewport and escapes every
   ancestor's overflow, so the image painted across the entire page and sat
   on top of the hero. overflow-hidden does not contain it; a fixed child is
   only confined when an ancestor creates a containing block for it, which
   requires a transform, filter or clip-path.

   So the outer wrapper is absolute, clipped with clip-path: inset(0), and
   the fixed layer lives inside it. The result is a window onto a stationary
   image, confined to this section.

   On touch the fixed layer is dropped entirely: mobile browsers resize the
   viewport as their chrome hides and shows, which makes any viewport-locked
   background shudder.
   -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

export function FinalCta() {
  const prefersReducedMotion = useReducedMotion();
  const d = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  const email = company.contact.email.value;

  return (
    <section className="relative isolate overflow-hidden bg-ink-950 text-ink-000">
      {/* ---- DESKTOP: clipped window onto a fixed image --------------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 hidden overflow-hidden [clip-path:inset(0)] lg:block"
      >
        <div className="fixed inset-0">
          <Image
            src="/images/cta/factory-floor.jpg"
            /* Decorative — the heading beside it carries the meaning, and a
               description here would be noise for screen reader users. */
            alt=""
            fill
            /* Full-bleed at every breakpoint, so the widest variant is
               always the right one to fetch. */
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* ---- MOBILE: same image, ordinary scrolling ------------------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-20 lg:hidden">
        <Image
          src="/images/cta/factory-floor.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="texture-grid pointer-events-none absolute inset-0 -z-10 text-ink-500 opacity-20"
      />
      {/* Scrim. Deeper than a gradient background would need — a photograph
          carries far more visual noise, and the copy has to hold contrast
          over whatever part of it sits behind. Horizontal, so the left stays
          dark for the text while the right opens up and the image reads. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950/95 via-ink-950/80 to-ink-950/55"
      />

                  <div className="shell relative py-20 md:py-24">
        <div className="max-w-4xl">
          <motion.p
            className="eyebrow flex items-center gap-3 text-ink-400"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: d(0.5), ease: EASE }}
          >
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500"
            />
            Ready when you are
          </motion.p>

          {/* Two masked lines, the second trailing the first. */}
          <h2 className="mt-8 text-display-lg font-semibold tracking-[-0.03em]">
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
                Have an automation
              </motion.span>
            </motion.span>
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
                    transition: {
                      duration: d(0.9),
                      delay: d(0.12),
                      ease: EASE,
                    },
                  },
                }}
              >
                challenge?{" "}
                <span className="italic text-accent-400">
                  Let&rsquo;s engineer it.
                </span>
              </motion.span>
            </motion.span>
          </h2>

          <motion.p
            className="mt-8 max-w-xl text-[1.0625rem] leading-relaxed text-ink-300"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: d(0.7), delay: d(0.25), ease: EASE }}
          >
            Send us your specification, single-line diagram or a description of
            the problem. Our engineers will come back with a scope and a
            quotation.
          </motion.p>

          <motion.div
            className="mt-11 flex flex-col gap-5 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: d(0.7), delay: d(0.35), ease: EASE }}
          >
            <Link
              href={primaryCta.href}
              className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-accent-500 px-8 py-4 text-sm font-semibold text-ink-000 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent-600 hover:shadow-[0_10px_36px_-8px_rgb(63_163_91/0.6)]"
            >
              {primaryCta.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            {/* Email as a secondary route. Some buyers will not fill in a
                form, and losing them for want of an address is careless.

                Link rather than a bare anchor: it passes mailto: straight
                through to an anchor element, so behaviour is identical. */}
            {email ? (
              <Link
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-2.5 text-sm font-medium text-ink-300 transition-colors duration-300 hover:text-ink-000"
              >
                <span className="border-b border-ink-700 pb-0.5 transition-colors duration-300 group-hover:border-accent-500">
                  {email}
                </span>
              </Link>
            ) : null}
          </motion.div>

          {/* Location line — a small credibility marker at the close. */}
          <motion.p
            className="eyebrow mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-600"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: d(0.8), delay: d(0.5), ease: EASE }}
          >
            <span>Coimbatore, Tamil Nadu</span>
            <span aria-hidden="true" className="h-px w-6 bg-ink-800" />
            <span>UL &amp; CE certified manufacturing</span>
            <span aria-hidden="true" className="h-px w-6 bg-ink-800" />
            <span>Since 2007</span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}