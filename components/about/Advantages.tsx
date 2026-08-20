"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { advantages } from "@/data/about";
import type { Advantage } from "@/data/about";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   ABOUT · ADVANTAGES

   Dark band. Four numbered blocks, image alternating side to side.

   WHY DARK: the light version read flat — white background, grey text, and
   four photographs that had nothing to sit against. On dark the images
   become the light source in the section, which is what makes a media-led
   layout feel deliberate rather than assembled.

   AMBIENT FIELD: two soft accent blooms drift behind the content on long
   cycles. They are barely perceptible frame to frame, which is the point —
   the section should feel alive without anything visibly moving. Anything
   faster reads as a screensaver.

   ASPECT: 3:2, matching the supplied 1536x1024 source files. A mismatched
   container crops the subject rather than framing it.

   CLIP REVEAL — read before editing.
   The trigger sits on an OUTER wrapper and propagates inward via variants.
   It cannot sit on the clipped element: that starts clipped to zero width,
   reports as not visible, and the observer never fires — the image stays
   invisible permanently. Wrapper triggers, child animates.
   -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

function AdvantageBlock({ item, index }: { item: Advantage; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const d = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  const blockRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: blockRef,
    offset: ["start end", "end start"],
  });

  /* Parallax. 8% of container height registers without exposing an edge —
     the inner frame is oversized to cover the travel. */
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-8%", "8%"],
  );

  /* Odd blocks put the image first on desktop. Below lg both stack and the
     image always leads — an image arriving after its own explanation reads
     backwards. */
  const imageFirst = index % 2 === 1;

  /* Wipe opens from the side the image sits on. */
  const closed = imageFirst ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)";

  return (
    <div
      ref={blockRef}
      className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16"
    >
      {/* ---- MEDIA ----------------------------------------------------
          Outer wrapper carries the trigger — see the note at the top. */}
      <motion.div
        className={cn("lg:col-span-6", imageFirst ? "lg:order-1" : "lg:order-2")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={{
            hidden: { clipPath: closed },
            visible: {
              clipPath: "inset(0% 0% 0% 0%)",
              transition: { duration: d(1.1), ease: EASE },
            },
          }}
        >
          {/* Ring plus glow. On a dark field a bare image floats; a hairline
              and a soft cast underneath give it a place to sit. */}
          <div className="group relative aspect-[3/2] overflow-hidden rounded-2xl border border-ink-800 bg-ink-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
            <motion.div
              style={{ y: imageY }}
              className="absolute inset-x-0 -inset-y-[10%]"
            >
              {/* Fallback sits permanently beneath, so a missing or slow file
                  degrades to a designed panel rather than a hole. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(125%_115%_at_25%_0%,#26313f_0%,#151a1f_58%,#0b0d0f_100%)]"
              />
              {item.image ? (
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              ) : null}
            </motion.div>

            <span
              aria-hidden="true"
              className="texture-grid pointer-events-none absolute inset-0 text-ink-500 opacity-15"
            />
            {/* Accent hairline along the top edge — a small technical marker,
                brightening on hover. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent-500/50 to-transparent transition-opacity duration-700 group-hover:via-accent-500"
            />

            {/* Oversized numeral. Very low contrast — texture first, number
                second. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-1 right-5 font-display text-[7rem] font-bold leading-none text-ink-000/[0.1]"
            >
              {item.index}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ---- COPY ------------------------------------------------------ */}
      <motion.div
        className={cn("lg:col-span-6", imageFirst ? "lg:order-2" : "lg:order-1")}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: d(0.9), delay: d(0.15), ease: EASE }}
      >
        <p className="eyebrow flex items-center gap-3 text-ink-400">
          <span className="text-accent-500">{item.index}</span>
          <span className="text-ink-700">/</span>
          {item.label}
          <span aria-hidden="true" className="h-px w-10 bg-ink-700" />
        </p>

        <h2 className="mt-6 text-display-md font-semibold tracking-[-0.025em] text-ink-000">
          <motion.span
            className="block overflow-hidden pb-[0.1em]"
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
              {item.headingLead}{" "}
              {/* Italic on the resolving half — one flourish per block. */}
              <span className="italic text-accent-400">
                {item.headingEmphasis}
              </span>
            </motion.span>
          </motion.span>
        </h2>

        <p className="mt-7 max-w-xl text-[1.0625rem] leading-[1.65] text-ink-300">
          {item.description}
        </p>

        <ul className="mt-9 space-y-4 border-t border-ink-800 pt-8">
          {item.points.map((point, pointIndex) => (
            <motion.li
              key={point}
              className="flex items-baseline gap-4 text-[0.9375rem] leading-relaxed text-ink-200"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: d(0.55),
                delay: d(0.25 + pointIndex * 0.08),
                ease: EASE,
              }}
            >
              {/* Rotated square rather than a dot — a more technical mark,
                  consistent with the Process section. */}
              <span
                aria-hidden="true"
                className="mt-[0.45rem] inline-block h-1.5 w-1.5 shrink-0 rotate-45 bg-accent-500"
              />
              {point}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export function Advantages() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 text-ink-000 md:py-28">
      {/* ---- AMBIENT FIELD ---------------------------------------------
          Two accent blooms on long, offset cycles. Suppressed under reduced
          motion by the global rule in globals.css. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/4 top-0 h-[45rem] w-[45rem] animate-[driftA_26s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(63,163,91,0.11)_0%,rgba(8,9,10,0)_65%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[40rem] w-[40rem] animate-[driftB_32s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgba(99,189,124,0.09)_0%,rgba(8,9,10,0)_65%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="texture-grid pointer-events-none absolute inset-0 text-ink-500 opacity-[0.12]"
      />

      <div className="shell relative">
        <div className="space-y-28 md:space-y-40">
          {advantages.map((item, index) => (
            <AdvantageBlock key={item.index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}