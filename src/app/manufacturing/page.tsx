import type { Metadata } from "next";
import { PageMasthead } from "@/components/ui/PageMasthead";
import { Reveal } from "@/components/motion/Reveal";
import { ProcessSection } from "@/components/product/ProcessSection";
import { MachinerySection } from "@/components/product/MachinerySection";
import { InspectionSection } from "@/components/product/InspectionSection";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Manufacturing & Capabilities — Process & Machineries",
  description:
    "Explore ASIR Containers' manufacturing process: in-house injection moulding cells, 3 printing routes (Screen Printing, HTL, IML), and direct production & auxiliary machinery ledger.",
  alternates: { canonical: "/manufacturing" },
  openGraph: {
    title: "Manufacturing & Capabilities — ASIR Containers",
    description:
      "Moulded, printed, and packed on one floor. Industrial-grade injection moulding and precision container printing.",
    url: `${site.url}/manufacturing`,
  },
};

export default function ManufacturingPage() {
  return (
    <>
      <Reveal>
        <PageMasthead
          compact
          label="Capabilities"
          index="01"
          title="Manufacturing & Facilities"
          intro="Fully integrated in-house manufacturing: precision injection moulding cells, versatile multi-color container printing, and rigorous multi-stage quality control under one roof."
        />
      </Reveal>

      {/* Quality Statement & Inspection Gates */}
      <InspectionSection />

      {/* In-Process Activities: Moulding + 3 Printing Routes */}
      <ProcessSection index="02" />

      {/* Machines and Auxiliaries Ledger */}
      <MachinerySection index="03" />

      {/* Call to Action Banner */}
      <section className="border-t border-line bg-charcoal py-14 text-white lg:py-16">
        <div className="shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand">
              Custom Tooling & Branding
            </span>
            <h2 className="display-sm mt-2 text-white">
              Need custom volume moulding or specialized printing?
            </h2>
            <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-white/75">
              Discuss mold development, high-volume production schedules, and custom decorative branding with our engineering team.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button href="/contact" variant="primary" size="md" withArrow>
              Discuss your project
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
