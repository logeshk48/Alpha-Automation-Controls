import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";

/* --------------------------------------------------------------------------
   HOMEPAGE

   A composition root and nothing else. Every section is its own component in
   components/home/, and each reads its content from data/ rather than holding
   copy inline. That keeps this file readable as the remaining sections land,
   and means the eventual CMS swap touches the data layer only.

   Section order follows the approved concept:
     Hero + metrics
     01 Solutions        (next)
     02 How we work
     03 Why Alpha
     04 Customers
     05 More
     Final CTA
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  /* Overrides the root template. The homepage carries the full company name
     rather than the "%s — Alpha Automation & Controls" pattern, since
     appending the name to itself would read badly in search results. */
  title:
    "Alpha Automation & Controls — Industrial Control Panels & Automation, Coimbatore",
  description:
    "UL & CE certified control panels and turnkey industrial automation. Design, manufacture, commissioning and support from Coimbatore, exporting to 15+ countries since 2007.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Sections 01–05 and the closing CTA mount here as they are built. */}
    </>
  );
}