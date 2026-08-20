import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { Advantages } from "@/components/about/Advantages";
import { FacilityVideo } from "@/components/about/FacilityVideo";
import { FinalCta } from "@/components/home/FinalCta";

/* --------------------------------------------------------------------------
   ABOUT

   Deliberately short. Metrics and Process both appear on the homepage, and
   repeating them here would pad the page without adding an argument — a
   visitor who reached About wants the company, not a second pass at the
   numbers.

   Hero, four advantages, the facility footage, then the ask.
   -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  title: "About",
  description:
    "Industrial control panels and automation from Coimbatore since 2007. Authorised Control Techniques channel partner, UL and CE certified manufacturing, supplying OEMs exporting worldwide.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Advantages />
      {/* After the four arguments: the visitor has just read the claims, and
          footage of the real plant is the proof. */}
      <FacilityVideo />
      <FinalCta />
    </>
  );
}