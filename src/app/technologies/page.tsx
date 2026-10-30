import type { Metadata } from "next";
import { TechHero } from "@/components/technologies/TechHero";
import { CapabilityPanel } from "@/components/technologies/CapabilityPanel";
import { MachineCards } from "@/components/technologies/MachineCards";
import { Auxiliaries } from "@/components/technologies/Auxiliaries";
import { ColorCTA } from "@/components/sections/ColorCTA";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Technologies & Machinery Ledger",
  description:
    "Production and auxiliary machinery at ASIR Containers: advanced injection moulding machines, precision robotic printing lines, chilling plants, hopper dryers, and mould temperature controllers.",
  alternates: { canonical: "/technologies" },
  openGraph: {
    title: "Technologies & Machinery — ASIR Containers",
    description:
      "Modern machine park featuring high-tonnage injection moulding equipment, automated IML robotics, HTL transfer presses, and industrial auxiliary equipment.",
    url: `${site.url}/technologies`,
  },
};

export default function TechnologiesPage() {
  return (
    <>
      <TechHero />
      <CapabilityPanel />
      <MachineCards />
      <Auxiliaries />
      <ColorCTA
        eyebrow="Production Capacity"
        heading="Have volume requirements or specific machine tooling?"
        body="Inquire about machine availability, tonnage allocation, cycle times, and automated in-mould labelling capabilities."
        ctaLabel="Inquire capacity"
        image="/images/facility/labelling.jpg"
        imageAlt="Containers moving along the in-house printing and labelling line"
      />
    </>
  );
}
