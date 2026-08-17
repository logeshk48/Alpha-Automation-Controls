import type { ContentStatus } from "@/data/company";

/**
 * How we work — the five delivery stages from the approved concept.
 *
 * Each stage's `detail` lines describe what happens at that stage. They are
 * derived from the approved concept copy, not invented capability claims.
 */

export interface ProcessStage {
  index: string;
  slug: string;
  title: string;
  /** One line, shown beside the title in the stage list. */
  tagline: string;
  /** Two sentences maximum — this sits in the detail panel. */
  description: string;
  /** Three or four short lines. Concrete, not adjectives. */
  detail: string[];
  image?: string;
  status: ContentStatus;
}

export const processStages: ProcessStage[] = [
  {
    index: "01",
    slug: "design",
    title: "Design",
    tagline: "Drawings before metal",
    description:
      "Every project starts with electrical design engineering — load lists, schematics, panel layouts and bill of materials, approved by you before anything is cut or wired.",
    detail: [
      "Load schedules and single-line diagrams",
      "Panel GA and internal layout drawings",
      "Component selection and BOM",
      "Customer approval before build",
    ],
    status: "verified",
  },
  {
    index: "02",
    slug: "manufacture",
    title: "Manufacture",
    tagline: "Built and tested in-house",
    description:
      "Panels are fabricated, wired and inspected in our own facility to UL and CE standards — not subcontracted out and hoped for.",
    detail: [
      "Enclosure fabrication and powder coating",
      "Busbar, wiring and component assembly",
      "In-house quality inspection",
      "Routine testing before dispatch",
    ],
    status: "verified",
  },
  {
    index: "03",
    slug: "integrate",
    title: "Integrate",
    tagline: "Logic, drives and screens",
    description:
      "PLC programming, drive configuration and SCADA or HMI development — the software layer that turns a panel into a working control system.",
    detail: [
      "PLC logic development and simulation",
      "VFD and servo parameterisation",
      "SCADA and HMI screen development",
      "Network and I/O integration",
    ],
    status: "verified",
  },
  {
    index: "04",
    slug: "commission",
    title: "Commission",
    tagline: "On your floor, by our engineers",
    description:
      "Our own engineers handle installation, loop checking and startup on site — in India and at customer sites abroad.",
    detail: [
      "Site installation and termination",
      "Loop checks and I/O verification",
      "Live commissioning and trial runs",
      "Operator handover and training",
    ],
    status: "verified",
  },
  {
    index: "05",
    slug: "support",
    title: "Support",
    tagline: "Long after handover",
    description:
      "Annual maintenance contracts, breakdown response and an in-house repair centre — because a panel is a twenty-year asset, not a delivery.",
    detail: [
      "Preventive maintenance visits",
      "Breakdown response and diagnostics",
      "In-house drive and panel repair",
      "Spares and retrofit support",
    ],
    status: "verified",
  },
];

/** Section heading copy. */
export const processSection = {
  index: "02",
  eyebrow: "How we work",
  headingLead: "Five stages.",
  headingEmphasis: "One accountable team.",
  description:
    "No handoffs between vendors, no gaps where responsibility gets lost. Design through support, under one roof.",
  status: "verified" as ContentStatus,
};