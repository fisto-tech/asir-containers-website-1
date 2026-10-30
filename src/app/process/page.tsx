import type { Metadata } from "next";
import { PageMasthead } from "@/components/ui/PageMasthead";
import { Reveal } from "@/components/motion/Reveal";
import { ProcessSection } from "@/components/product/ProcessSection";
import { InspectionSection } from "@/components/product/InspectionSection";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

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
      <Reveal>
        <PageMasthead
          compact
          label="Process"
          index="01"
          title="Manufacturing & Process Flow"
          intro="Fully integrated in-house manufacturing process: precision injection moulding cycles, versatile multi-color container printing, and rigorous multi-stage quality control under one roof."
        />
      </Reveal>

      {/* Quality Statement & Inspection Gates */}
      <InspectionSection />

      {/* In-Process Activities: Moulding + 3 Printing Routes */}
      <ProcessSection index="02" />

      {/* Call to Action Banner */}
      <section className="border-t border-line bg-charcoal py-14 text-white lg:py-16">
        <div className="shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand">
              Quality Assurance & Custom Runs
            </span>
            <h2 className="display-sm mt-2 text-white">
              Looking for process validation or custom batches?
            </h2>
            <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-white/75">
              Review batch inspection criteria, in-process quality checklists, and decorative finishes with our technical engineers.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button href="/contact" variant="primary" size="md" withArrow>
              Contact engineering
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
