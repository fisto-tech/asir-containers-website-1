import type { Metadata } from "next";
import { ProcessHero } from "@/components/process/ProcessHero";
import { QualityGates } from "@/components/process/QualityGates";
import { InProcessStages } from "@/components/process/InProcessStages";
import { FlowRail } from "@/components/process/FlowRail";
import { DarkCTA } from "@/components/sections/DarkCTA";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Manufacturing Process & Inspection",
  description:
    "Explore ASIR Containers' manufacturing process: in-house injection moulding cells, 3 printing routes (Screen Printing, HTL, IML), and multi-stage quality inspection gates.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Manufacturing Process & Inspection — ASIR Containers",
    description:
      "Moulded, printed, and packed on one floor. Industrial-grade injection moulding and precision container printing.",
    url: `${site.url}/process`,
  },
};

export default function ProcessPage() {
  return (
    <>
      <ProcessHero />
      <QualityGates />
      <InProcessStages />
      <FlowRail />
      <DarkCTA
        eyebrow="Quality Assurance & Custom Runs"
        heading="Looking for process validation or custom batches?"
        body="Review batch inspection criteria, in-process quality checklists, and decorative finishes with our technical engineers."
        ctaLabel="Contact engineering"
        image="/images/facility/dispatch.jpg"
        imageAlt="Pallets of finished containers waiting at the dispatch bay"
      />
    </>
  );
}
