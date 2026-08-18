import type { Metadata } from "next";
import { Customers } from "@/components/home/Customers";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { Metrics } from "@/components/home/Metrics";
import { Process } from "@/components/home/Process";
import { Solutions } from "@/components/home/Solutions";

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
      <Solutions />
      <Process />
      <Customers />
      <FinalCta />
    </>
  );
}