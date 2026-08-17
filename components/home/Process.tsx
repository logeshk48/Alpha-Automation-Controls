"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { processSection, processStages } from "@/data/process";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   02 · HOW WE WORK

   Dark band. Stage list left, detail panel right; hover, focus or tap swaps
   the panel.

   The indicator uses layoutId, so Framer animates one physical element
   between list positions rather than fading five separate highlights in and
   out. That travelling motion is what makes the list feel like a mechanism
   rather than a set of buttons — and it is the reason this section reads as
   deliberate rather than decorated.

   The oversized numeral behind the panel is set at very low contrast on
   purpose. It should register as texture on first glance and only resolve as
   a number on second look; if it competes with the copy it is wrong.

   MOBILE: no panel. Stages stack and stay expanded — a side panel on a
   narrow screen sits below the list anyway, which is what stacking already
   does more clearly.
   -------------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

export function Process() {
  const prefersReducedMotion = useReducedMotion();
  const d = (seconds: number) => (prefersReducedMotion ? 0 : seconds);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = processStages[activeIndex];

  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 text-ink-000 md:py-28">
      {/* Ambient wash that drifts as the stage changes — the section's
          background responds to the interaction rather than sitting inert. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{
          background: `radial-gradient(90% 60% at ${18 + activeIndex * 16}% 0%, rgba(63,163,91,0.10) 0%, rgba(13,15,17,0) 60%)`,
        }}
        transition={{ duration: d(1.2), ease: EASE }}
      />
      <div
        aria-hidden="true"
        className="texture-grid pointer-events-none absolute inset-0 text-ink-500 opacity-15"
      />

      <div className="shell relative">
        {/* ---- HEADER ------------------------------------------------- */}
        <motion.p
          className="eyebrow flex items-center gap-3 text-ink-500"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: d(0.5), ease: EASE }}
        >
          <span className="text-accent-500">{processSection.index}</span>
          <span className="text-ink-700">/</span>
          {processSection.eyebrow}
          <span aria-hidden="true" className="h-px w-10 bg-ink-700" />
        </motion.p>

        <h2 className="mt-6 max-w-4xl text-display-lg font-semibold tracking-[-0.03em]">
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
              {processSection.headingLead}{" "}
              <span className="italic text-ink-500">
                {processSection.headingEmphasis}
              </span>
            </motion.span>
          </motion.span>
        </h2>

        <motion.p
          className="mt-7 max-w-xl text-[0.9375rem] leading-relaxed text-ink-400"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: d(0.7), delay: d(0.18), ease: EASE }}
        >
          {processSection.description}
        </motion.p>

        {/* ---- DESKTOP ------------------------------------------------ */}
        <motion.div
          className="mt-16 hidden lg:grid lg:grid-cols-12 lg:gap-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: d(0.8), delay: d(0.1), ease: EASE }}
        >
          {/* Left rail. */}
          <div className="col-span-5">
            <ol className="relative border-t border-ink-800">
              {processStages.map((stage, index) => {
                const isActive = index === activeIndex;

                return (
                  <li key={stage.slug} className="border-b border-ink-800">
                    <button
                      type="button"
                      onMouseEnter={() => setActiveIndex(index)}
                      onFocus={() => setActiveIndex(index)}
                      onClick={() => setActiveIndex(index)}
                      aria-current={isActive ? "step" : undefined}
                      className="group relative flex w-full items-center gap-6 py-6 pl-6 pr-4 text-left"
                    >
                      {/* Travelling indicator. One element moving between
                          rows, not five fading — see the note above. */}
                      {isActive && (
                        <motion.span
                          layoutId="process-indicator"
                          aria-hidden="true"
                          className="absolute inset-0 border-l-2 border-accent-500 bg-linear-to-r from-accent-500/12 to-transparent"
                          transition={{
                            duration: d(0.5),
                            ease: EASE,
                          }}
                        />
                      )}

                      {/* Stage number, large. The list should read as a
                          numbered sequence at a glance. */}
                      <span
                        className={cn(
                          "relative shrink-0 font-display text-[2rem] font-semibold leading-none tabular-nums transition-colors duration-500",
                          isActive ? "text-accent-500" : "text-ink-700",
                        )}
                      >
                        {stage.index}
                      </span>

                      <span
                        className={cn(
                          "relative block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isActive ? "translate-x-1.5" : "translate-x-0",
                        )}
                      >
                        <span
                          className={cn(
                            "block font-display text-[1.375rem] font-semibold leading-tight transition-colors duration-400",
                            isActive ? "text-ink-000" : "text-ink-400",
                          )}
                        >
                          {stage.title}
                        </span>
                        <span
                          className={cn(
                            "mt-1 block text-[0.8125rem] transition-colors duration-400",
                            isActive ? "text-accent-400" : "text-ink-600",
                          )}
                        >
                          {stage.tagline}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "relative ml-auto text-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                          isActive
                            ? "translate-x-0 text-accent-500 opacity-100"
                            : "-translate-x-3 text-ink-700 opacity-0",
                        )}
                      >
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right — detail panel. */}
          <div className="col-span-7">
            <div className="sticky top-32">
              <div className="relative min-h-[27rem] overflow-hidden rounded-2xl border border-ink-800 bg-ink-950">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(120%_110%_at_20%_0%,#1e2a36_0%,#111417_55%,#0a0c0e_100%)]"
                />

                {/* Oversized ghost numeral. Texture first, number second. */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`ghost-${active.slug}`}
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-4 -top-10 font-display text-[13rem] font-bold leading-none text-ink-000/[0.035]"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: d(0.6), ease: EASE }}
                  >
                    {active.index}
                  </motion.span>
                </AnimatePresence>

                {/* Accent rule redrawing across the top on every change. */}
                <motion.span
                  key={`rule-${active.slug}`}
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px origin-left bg-linear-to-r from-accent-500 via-accent-500/40 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: d(0.8), ease: EASE }}
                />

                <div className="relative p-10">
                  {/* mode="wait" so the outgoing panel clears first —
                      crossfading two blocks of prose is unreadable. */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.slug}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: d(0.35), ease: EASE }}
                    >
                      <span className="eyebrow flex items-center gap-3 text-accent-400">
                        <span
                          aria-hidden="true"
                          className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500"
                        />
                        Stage {active.index}
                      </span>

                      <h3 className="mt-6 font-display text-display-sm font-semibold text-ink-000">
                        {active.title}
                      </h3>

                      <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-300">
                        {active.description}
                      </p>

                      <ul className="mt-10 grid gap-x-8 gap-y-4 border-t border-ink-800 pt-8 sm:grid-cols-2">
                        {active.detail.map((line, lineIndex) => (
                          <motion.li
                            key={line}
                            className="flex items-baseline gap-3 text-[0.875rem] leading-snug text-ink-400"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: d(0.4),
                              delay: d(0.1 + lineIndex * 0.06),
                              ease: EASE,
                            }}
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.4rem] inline-block h-1 w-1 shrink-0 rotate-45 bg-accent-500"
                            />
                            {line}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ---- MOBILE: stacked, always expanded ----------------------- */}
        <ol className="mt-12 border-t border-ink-800 lg:hidden">
          {processStages.map((stage, index) => (
            <motion.li
              key={stage.slug}
              className="border-b border-ink-800 py-7"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: d(0.6),
                delay: d(Math.min(index, 3) * 0.07),
                ease: EASE,
              }}
            >
              <div className="flex items-baseline gap-4">
                <span className="shrink-0 font-display text-[1.5rem] font-semibold leading-none tabular-nums text-accent-500">
                  {stage.index}
                </span>
                <div>
                  <h3 className="text-display-sm font-semibold leading-tight text-ink-000">
                    {stage.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] text-accent-400">
                    {stage.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-400">
                    {stage.description}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {stage.detail.map((line) => (
                      <li
                        key={line}
                        className="flex items-baseline gap-3 text-[0.8125rem] text-ink-500"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.4rem] inline-block h-1 w-1 shrink-0 rotate-45 bg-accent-500"
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}