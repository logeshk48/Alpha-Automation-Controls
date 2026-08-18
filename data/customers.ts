import type { ContentStatus } from "@/data/company";

/**
 * Customer logos for the marquee.
 *
 * Sourced from the approved landing concept, which took them from Alpha's
 * live site — so these are customers Alpha already publishes publicly. We are
 * reusing an existing claim, not making a new one.
 *
 * Every entry renders its `name` as text if the logo file is missing, so the
 * band degrades to a typographic list rather than breaking. That fallback is
 * deliberate: it means the section works from day one and improves as logo
 * files arrive.
 *
 * LOGO FILES: download from alphaaac.com/img/ into
 * /public/images/customers/ using the `logo` filenames below. Transparent PNG
 * or SVG preferred — the marquee greyscales them and restores colour on
 * hover, which only reads well without a baked-in white box.
 */

export interface Customer {
  name: string;
  logo?: string;
  status: ContentStatus;
}

export const customers: Customer[] = [
  { name: "Ambuja Cement", logo: "/images/customers/ambuja-cement.jpg", status: "verified" },
  { name: "Apollo Tyres", logo: "/images/customers/apollo-tyres.jpg", status: "verified" },
  { name: "Autoprint", logo: "/images/customers/autoprint.png", status: "verified" },
  { name: "Cheran", logo: "/images/customers/cheran.png", status: "verified" },
  { name: "CRI", logo: "/images/customers/cri.png", status: "verified" },
  { name: "Eppinger", logo: "/images/customers/eppinger.jpg", status: "verified" },
  { name: "Italindia", logo: "/images/customers/italindia.jpg", status: "verified" },
  { name: "KPR Mill", logo: "/images/customers/kpr-mill.jpg", status: "verified" },
  { name: "KRS", logo: "/images/customers/krs.png", status: "verified" },
  { name: "LGB", logo: "/images/customers/lgb.png", status: "verified" },
  { name: "LMW", logo: "/images/customers/lmw.png", status: "verified" },
  { name: "LRT", logo: "/images/customers/lrt.jpg", status: "verified" },
  { name: "Moglix", logo: "/images/customers/moglix.png", status: "verified" },
  { name: "RVR Machinery Tech", logo: "/images/customers/rvr-machinery.jpg", status: "verified" },
  { name: "Siruvani", logo: "/images/customers/siruvani.png", status: "verified" },
  { name: "Spectra", logo: "/images/customers/spectra.jpg", status: "verified" },
  { name: "Texmo Precision", logo: "/images/customers/texmo-precision.png", status: "verified" },
  { name: "Veejay", logo: "/images/customers/veejay.jpg", status: "verified" },
];
/** Section heading copy, from the approved concept. */
export const customersSection = {
  index: "03",
  eyebrow: "Customers",
  headingLead: "Trusted on",
  headingEmphasis: "real shop floors.",
  description:
    "From textile mills to machine builders — manufacturers who run Alpha panels every shift.",
  status: "verified" as ContentStatus,
};