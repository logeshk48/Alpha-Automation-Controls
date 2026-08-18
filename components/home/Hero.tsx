import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { Reveal } from "@/components/motion/Reveal";
import { hero } from "@/data/company";
import { primaryCta, secondaryCta } from "@/data/navigation";

/* --------------------------------------------------------------------------
   HERO

   Full-viewport dark band. A Server Component — only the motion wrappers
   inside are client-side.

   The metrics used to sit at the base of this section. They now have their
   own band below, because the imagery needs the full frame — a row of
   counters eating a fifth of it fought the photograph rather than
   supporting it.

   Everything here uses trigger="mount": scroll-triggered reveals start fully
   hidden, so anything visible before the first scroll must not depend on an
   intersection observer firing.

   FOR VIDEO LATER: replace the Image below with a <video> carrying muted,
   autoPlay, loop, playsInline and a poster, and suppress it under
   prefers-reduced-motion. The gradient and scrim layers stay exactly as they
   are — they are already tuned for moving footage.
   -------------------------------------------------------------------------- */

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-ink-950 text-ink-000">
      {/* ---- BACKGROUND -----------------------------------------------
          The gradient stays beneath the photograph as a fallback, so a slow
          connection shows a designed panel rather than a black hole while
          the image loads.

          priority: this is the largest element above the fold, so it is the
          Largest Contentful Paint. Without it Next defers the fetch and the
          hero renders empty for a beat. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_100%_at_78%_-10%,#1c2735_0%,#0d0f11_52%,#08090a_100%)]"
      />
      <Image
        src="/images/hero/hero.jpg"
        /* Decorative — the headline over it carries the meaning, and a
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
      {/* Scrim. Heavier on the left where the copy sits, opening up to the
          right so the machinery reads. A flat wash would either wash out the
          image or leave the headline fighting for contrast. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-ink-950/95 via-ink-950/75 to-ink-950/40"
      />
      {/* Bottom lift, so the metrics band below transitions into this rather
          than butting against a bright edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-linear-to-t from-ink-950 to-transparent"
      />

      {/* ---- CONTENT ---------------------------------------------------
          Padding clears the fixed navbar. min-h-svh with justify-center keeps
          the block optically centred rather than top-anchored. */}
      <div className="shell relative w-full pb-20 pt-40 md:pb-24 md:pt-44">
        <FadeIn distance={10} trigger="mount">
          <p className="eyebrow flex items-center gap-3 text-ink-300">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500"
            />
            {hero.eyebrow}
          </p>
        </FadeIn>

        {/* Heading.

            Two masked lines, the second trailing the first. The stagger is
            what makes it read as a sentence assembling rather than a block
            appearing — the eye follows the reveal downward.

            pb-[0.08em] matters: descenders in "panels" were being clipped by
            the overflow-hidden mask, which is much of what looked rough.

            max-w in ch rather than rem — the constraint that matters is
            characters per line, so the break holds as the type scales. */}
        <h1 className="mt-8 max-w-[24ch] text-display-xl font-semibold">
          <span className="block overflow-hidden pb-[0.08em]">
            <Reveal delay={0.12} trigger="mount">
              {hero.headingLead}
            </Reveal>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
            <Reveal delay={0.28} trigger="mount">
              {/* The single accent word on the page. It carries the
                  proposition, so nothing else competes with it. */}
              <span className="text-accent-400">{hero.headingEmphasis}</span>{" "}
              <span className="text-ink-300">{hero.headingTail}</span>
            </Reveal>
          </span>
        </h1>

        <FadeIn delay={0.5} trigger="mount">
          <p className="mt-8 max-w-xl text-[0.9375rem] leading-relaxed text-ink-200 md:text-base">
            {hero.description}
          </p>
        </FadeIn>

        {/* Calls to action. One filled, one outlined — the hierarchy should
            be obvious without reading the labels. */}
        <FadeIn delay={0.64} trigger="mount">
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={primaryCta.href}
              className="group flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-7 py-4 text-sm font-semibold text-ink-000 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-accent-600 hover:shadow-[0_8px_28px_-8px_rgb(63_163_91/0.6)]"
            >
              {primaryCta.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            {/* Backdrop blur on the outlined button: over a photograph a
                plain border reads as weak, and a solid fill would compete
                with the primary action. */}
            <Link
              href={secondaryCta.href}
              className="group flex items-center justify-center gap-2 rounded-lg border border-ink-600 bg-ink-950/30 px-7 py-4 text-sm font-semibold text-ink-100 backdrop-blur-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-ink-400 hover:bg-ink-950/50"
            >
              {secondaryCta.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* Scroll cue. Decorative, so hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-7 right-[--shell-gutter] hidden items-center gap-3 lg:flex"
      >
        <span className="eyebrow text-ink-500">Scroll</span>
        <span className="relative block h-9 w-px overflow-hidden bg-ink-700">
          <span className="absolute inset-x-0 top-0 h-3 animate-[scrollCue_2.4s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-accent-500" />
        </span>
      </div>
    </section>
  );
}