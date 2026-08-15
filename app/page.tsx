import { company } from "@/data/company";

/* --------------------------------------------------------------------------
   HOMEPAGE — Phase 1 holding state.

   Deliberately minimal. The cinematic hero, capability strip and storytelling
   sections arrive in Phases 4 and 5. This exists to prove the design tokens
   render correctly: dark surface, display scale, mono eyebrow, accent, grid.

   NOTE: every string here is either the company name, wording taken from the
   brief and marked unverified in data/company.ts, or a neutral description.
   Nothing is invented.
   -------------------------------------------------------------------------- */

export default function HomePage() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink-950 text-ink-000">
      {/* Engineering texture. Very low contrast by design — it should be
          felt rather than noticed. */}
      <div
        aria-hidden="true"
        className="texture-grid pointer-events-none absolute inset-0 text-ink-500 opacity-40"
      />

      {/* Accent hairline pinned to the top edge — a small technical marker. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-accent-500"
      />

      <div className="shell relative py-32 md:py-40">
        {/* Eyebrow — mono, uppercase, wide tracking. */}
        <p className="eyebrow flex items-center gap-3 text-ink-400">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 bg-accent-500"
          />
          Coimbatore, Tamil Nadu
        </p>

        {/* H1. The only h1 on the page. */}
        <h1 className="mt-8 max-w-5xl text-display-xl font-semibold">
          Industrial Automation
          <br />
          <span className="text-ink-400">&amp; Control Solutions</span>
        </h1>

        {/* Supporting copy — descriptive, no claims about scale or history. */}
        <p className="mt-10 max-w-xl text-base leading-relaxed text-ink-300 md:text-lg">
          {company.legalName} designs and builds industrial control panels and
          automation systems for manufacturing and process plants.
        </p>

        {/* Capability strip. These are descriptions of what the company does,
            not statistics — see rule 28. Numbers appear only once Alpha
            supplies verified figures. */}
        <ul className="mt-20 grid max-w-4xl grid-cols-1 gap-px border-t border-ink-800 sm:grid-cols-2 lg:grid-cols-4">
          {company.capabilities.map((capability, index) => (
            <li
              key={capability}
              className="border-b border-ink-800 py-6 pr-6 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <span className="eyebrow block text-ink-600">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-3 block text-sm font-medium text-ink-100">
                {capability}
              </span>
            </li>
          ))}
        </ul>

        {/* Build marker — a visible reminder of which phase is live.
            Remove once Phase 4 lands. */}
        <p className="eyebrow mt-24 text-ink-600">
          Phase 1 — Design system verification
        </p>
      </div>
    </section>
  );
}