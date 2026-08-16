import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { Reveal } from "@/components/motion/Reveal";
import { hero } from "@/data/company";
import { primaryCta, secondaryCta } from "@/data/navigation";

/* --------------------------------------------------------------------------
   HERO

   Full-viewport dark band. A Server Component — only the motion wrappers
   inside are client-side.

   The metrics used to live at the base of this section. They now have their
   own band below, because once video sits behind the hero the imagery needs
   the full frame — a row of counters eating a fifth of it would fight the
   footage rather than support it.

   Everything here uses trigger="mount": scroll-triggered reveals start fully
   hidden, so anything visible before the first scroll must not depend on an
   intersection observer firing.

   IMAGERY: background is currently a layered gradient plus grid texture.
   Photography or video drops into the marked slot with no other change — the
   scrim below is already tuned for it.
   -------------------------------------------------------------------------- */

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden bg-ink-950 text-ink-000">
      {/* ---- BACKGROUND -----------------------------------------------
          For a still:
            <Image src="/images/hero/..." alt="" fill priority
                   className="object-cover" />

          For video, per the brief: muted, autoplay, loop, playsInline, with
          a poster, and suppressed under prefers-reduced-motion. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(120%_100%_at_78%_-10%,#1c2735_0%,#0d0f11_52%,#08090a_100%)]"
      />
      <div
        aria-hidden="true"
        className="texture-grid pointer-events-none absolute inset-0 -z-10 text-ink-500 opacity-25"
      />
      {/* Bottom scrim. Guarantees text contrast whatever sits behind it. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-linear-to-t from-ink-950 via-ink-950/60 to-transparent"
      />

      {/* ---- CONTENT ---------------------------------------------------
          Padding clears the fixed navbar. min-h-svh with justify-center keeps
          the block optically centred rather than top-anchored. */}
      <div className="shell relative w-full pb-20 pt-40 md:pb-24 md:pt-44">
        <FadeIn distance={10} trigger="mount">
          <p className="eyebrow flex items-center gap-3 text-ink-400">
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
              <span className="text-ink-400">{hero.headingTail}</span>
            </Reveal>
          </span>
        </h1>

        <FadeIn delay={0.5} trigger="mount">
          <p className="mt-8 max-w-xl text-[0.9375rem] leading-relaxed text-ink-300 md:text-base">
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

            <Link
              href={secondaryCta.href}
              className="group flex items-center justify-center gap-2 rounded-lg border border-ink-700 px-7 py-4 text-sm font-semibold text-ink-100 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-ink-500 hover:bg-ink-000/5"
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
        <span className="eyebrow text-ink-600">Scroll</span>
        <span className="relative block h-9 w-px overflow-hidden bg-ink-800">
          <span className="absolute inset-x-0 top-0 h-3 animate-[scrollCue_2.4s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-accent-500" />
        </span>
      </div>
    </section>
  );
}