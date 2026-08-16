import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Metrics } from "@/components/home/Metrics";

export const metadata: Metadata = {
  title:
    "Alpha Automation & Controls — Industrial Control Panels & Automation, Coimbatore",
  description:
    "UL & CE certified control panels and turnkey industrial automation. Design, manufacture, commissioning and support from Coimbatore, exporting to 15+ countries since 2007.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />

      {/* Sections 01–05 and the closing CTA mount here as they are built. */}
    </>
  );
}