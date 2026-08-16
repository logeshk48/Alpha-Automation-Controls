import type { ContentStatus } from "@/data/company";

/**
 * Services shown on the homepage.
 *
 * The six below are verbatim from the client-approved landing page concept.
 * The concept also references "All 11 services", so Alpha maintains a longer
 * official list — that list has not been supplied and MUST NOT be guessed at.
 *
 * `tagline` is a compression of the approved `summary`, not a new claim.
 * Adding a service here asserts Alpha performs it; a wrong entry generates
 * enquiries they cannot fulfil, which is worse than omitting it.
 */

export interface Service {
  index: string;
  slug: string;
  title: string;
  /** Four to six words. Sits under the title on the tile face. */
  tagline: string;
  summary: string;
  /**
   * Tile background. Landscape, 1600px wide or better — tiles are roughly
   * 4:3 and object-cover crops from the centre, so keep the subject clear of
   * the edges. Omit until real photography exists: the tile falls back to a
   * designed gradient panel rather than a hole, and per the content rules we
   * do not present stock imagery as Alpha's own facility.
   */
  image?: string;
  video?: string;
  status: ContentStatus;
}

export const homepageServices: Service[] = [
  {
    index: "01",
    slug: "industrial-control-panels",
    title: "Industrial Control Panels",
    tagline: "Wired and tested in-house",
    summary:
      "Custom PCC, MCC and control panels — designed, wired and tested in-house to UL & CE standards.",
    image: "/images/services/industrial-control-panels.jpg",
    status: "verified",
  },
  {
    index: "02",
    slug: "plc-automation",
    title: "PLC Automation",
    tagline: "Machines and full processes",
    summary:
      "Programming and integration across Siemens, Allen-Bradley, ABB and more — for machines and full processes.",
    image: "/images/services/plc-automation.jpg",
    status: "verified",
  },
  {
    index: "03",
    slug: "vfd-drive-panels",
    title: "VFD & Drive Panels",
    tagline: "Energy saved, motors controlled",
    summary:
      "Drive panels engineered for energy savings and smooth motor control, from soft starters to servo systems.",
    image: "/images/services/vfd-drive-panels.jpg",
    status: "verified",
  },
  {
    index: "04",
    slug: "scada-hmi",
    title: "SCADA & HMI",
    tagline: "The whole plant, one screen",
    summary:
      "Plant visibility from a single screen — supervisory control, data logging and operator interfaces.",
    image: "/images/services/scada-hmi.jpg",
    status: "verified",
  },
  {
    index: "05",
    slug: "installation-commissioning",
    title: "Installation & Commissioning",
    tagline: "Our own engineers, on site",
    summary:
      "On-site erection, wiring and startup by our own engineers — in India and at customer sites abroad.",
    image: "/images/services/installation-commissioning.jpg",
    status: "verified",
  },
  {
    index: "06",
    slug: "amc-after-sales-support",
    title: "AMC & After-Sales Support",
    tagline: "Long after handover",
    summary:
      "Preventive maintenance, breakdown support and an in-house repair centre — long after handover.",
    image: "/images/services/amc-after-sales-support.jpg",
    status: "verified",
  },
];

/** Section heading copy, from the approved concept. */
export const solutionsSection = {
  eyebrow: "Solutions",
  index: "01",
  headingLead: "Every panel.",
  headingEmphasis: "One partner.",
  description:
    "From design engineering to lifetime support — automation your production line can depend on.",
  /* "All 11 services" is Alpha's own claim from the approved mockup; the
     list behind it is still outstanding. */
  linkLabel: "All 11 services",
  linkHref: "/services",
  status: "verified" as ContentStatus,
};