import type { ContentStatus } from "@/data/company";

/**
 * About page content.
 *
 * Source: Alpha's existing website ("Our Competitive Advantages"). Every
 * claim below is Alpha's own, already published by them — we are restating,
 * not asserting anything new.
 *
 * WORDING: lightly edited for grammar and rhythm. No claim has been added,
 * removed or strengthened. Marked `unverified` because the edited phrasing
 * has not yet been signed off, even though the underlying facts have.
 *
 * TWO CLAIMS WORTH KNOWING ABOUT:
 *   - "No. 2 in India for Control Techniques sales"
 *   - "the only one in India serving this breadth of industries"
 * Both appear on Alpha's live site, so they are Alpha's to make. Both are
 * also competitive rankings a rival could contest. Kept verbatim in
 * substance; flagged here so it stays a decision rather than an oversight.
 */

export interface Advantage {
  index: string;
  /** Short label for the eyebrow, e.g. "Engineering". */
  label: string;
  /** Heading. `emphasis` renders in italic accent. */
  headingLead: string;
  headingEmphasis: string;
  /** One paragraph — the argument. */
  description: string;
  /** Three or four lines — the substance. Concrete, not adjectives. */
  points: string[];
  image?: string;
  status: ContentStatus;
}

export const aboutHero = {
  eyebrow: "About Alpha",
  headingLead: "Nineteen years of",
  headingEmphasis: "getting panels right.",
  description:
    "Alpha Automation & Controls has designed, built and commissioned industrial control panels from Coimbatore since 2007 — for machine builders, process plants and OEMs whose equipment ships worldwide.",
  status: "unverified" as ContentStatus,
};

export const advantages: Advantage[] = [
  {
    index: "01",
    label: "Engineering",
    headingLead: "Every panel starts",
    headingEmphasis: "as a drawing.",
    description:
      "We design in one of the industry's leading electrical panel design packages, so the schematic and the bill of materials come from the same source. Nothing is cut or wired before the drawing is approved.",
    points: [
      "Panel drawings and BOM generated from a single model",
      "Component selection reviewed before procurement",
      "Customer approval on drawings before build begins",
      "As-built documentation handed over at commissioning",
    ],
    image: "/images/about/engineering.jpg",
    status: "unverified",
  },
  {
    index: "02",
    label: "Partnership",
    headingLead: "A decade with",
    headingEmphasis: "Control Techniques.",
    description:
      "Alpha has been an authorised channel partner for Control Techniques for more than ten years, and ranks second in India for sales of their products — with the widest spread of industries served of any partner in the country.",
    points: [
      "Authorised Control Techniques channel partner, 10+ years",
      "Second in India by Control Techniques product sales",
      "Applied across process, machine and material handling",
      "Drive selection, configuration and support in-house",
    ],
    image: "/images/about/control-techniques.jpg",
    status: "unverified",
  },
  {
    index: "03",
    label: "Export",
    headingLead: "Panels that cleared",
    headingEmphasis: "every border.",
    description:
      "Our panels leave the country inside our OEM customers' machinery, which means they have to satisfy whichever standards the destination demands. We hold the certifications those markets require.",
    points: [
      "Supplied to OEMs exporting worldwide",
      "Certified to the standards each destination market requires",
      "UL and CE certified manufacturing",
      "Documentation prepared for export compliance",
    ],
    image: "/images/about/export.jpg",
    status: "unverified",
  },
  {
    index: "04",
    label: "Relationships",
    headingLead: "Fifteen years.",
    headingEmphasis: "Same customers.",
    description:
      "Our five largest customers have been with us for over fifteen years. So have our first four employees. Neither happens by accident — both come from doing the work properly and standing behind it afterwards.",
    points: [
      "Top five customers with Alpha for 15+ years",
      "The first four employees are still with the company",
      "After-sales support treated as part of the job",
      "Long-term spares and retrofit continuity",
    ],
    image: "/images/about/team.jpg",
    status: "unverified",
  },
];

/** Closing statement above the CTA. */
export const aboutClosing = {
  headingLead: "Built to last.",
  headingEmphasis: "Supported to match.",
  description:
    "A control panel is a twenty-year asset. We build it that way, and we stay reachable for the whole of it.",
  status: "unverified" as ContentStatus,
};