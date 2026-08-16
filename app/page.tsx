import { FadeIn } from "@/components/motion/FadeIn";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { company } from "@/data/company";
import { sectionNumber } from "@/lib/utils";

/* --------------------------------------------------------------------------
   HOMEPAGE — Phase 3 holding state.

   Still not the real homepage. This proves the motion primitives work
   together and that the sequencing reads correctly before sixteen sections
   depend on them.

   Note there is no "use client" directive. This is a Server Component — only
   the motion wrappers are client-side. That boundary is the point of the
   architecture: content stays on the server, interaction does not.

   Everything above the fold uses trigger="mount". Scroll-triggered reveals
   start fully hidden, so anything the visitor sees before scrolling must not
   depend on an intersection observer firing.
   -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink-950 text-ink-000">
      {/* Engineering texture — felt rather than noticed. */}
      <div
        aria-hidden="true"
        className="texture-grid pointer-events-none absolute inset-0 text-ink-500 opacity-40"
      />

      {/* Accent hairline pinned to the top edge. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-accent-500"
      />

      {/* Top padding clears the navbar, which is fixed and overlays this
          section. Replaced by the real hero in Phase 4. */}
      <div className="shell relative py-40 md:py-48">
        {/* Eyebrow enters first — the smallest element sets the pace. */}
        <FadeIn distance={12} trigger="mount">
          <p className="eyebrow flex items-center gap-3 text-ink-400">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 bg-accent-500"
            />
            Coimbatore, Tamil Nadu
          </p>
        </FadeIn>

        {/* Heading: each line masked separately, the second trailing the
            first. The block wrapper keeps the lines stacked — Reveal is
            inline-block, so two adjacent Reveals would sit side by side. */}
        <h1 className="mt-8 max-w-5xl text-display-xl font-semibold">
          <span className="block overflow-hidden">
            <Reveal delay={0.15} trigger="mount">
              Industrial Automation
            </Reveal>
          </span>
          <span className="block overflow-hidden text-ink-400">
            <Reveal delay={0.28} trigger="mount">
              &amp; Control Solutions
            </Reveal>
          </span>
        </h1>

        <FadeIn delay={0.45} trigger="mount">
          <p className="mt-10 max-w-xl text-base leading-relaxed text-ink-300 md:text-lg">
            {company.legalName} designs and builds industrial control panels and
            automation systems for manufacturing and process plants.
          </p>
        </FadeIn>

        {/* Capability strip — staggered, so the four columns resolve left to
            right rather than snapping in together.

            Capability statements, not statistics. Numbers appear only once
            Alpha supplies verified figures. */}
        <Stagger
          as="ul"
          delay={0.6}
          className="mt-20 grid max-w-4xl grid-cols-1 gap-px border-t border-ink-800 sm:grid-cols-2 lg:grid-cols-4"
        >
          {company.capabilities.map((capability, index) => (
            <StaggerItem
              as="li"
              key={capability}
              className="border-b border-ink-800 py-6 pr-6 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <span className="eyebrow block text-ink-600">
                {sectionNumber(index + 1)}
              </span>
              <span className="mt-3 block text-sm font-medium text-ink-100">
                {capability}
              </span>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeIn delay={1.1}>
          <p className="eyebrow mt-24 text-ink-600">
            Phase 3 — Navigation system
          </p>
        </FadeIn>
      </div>
    </section>
  );
}