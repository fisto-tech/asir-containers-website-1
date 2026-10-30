import type { Metadata } from "next";
import { PageMasthead } from "@/components/ui/PageMasthead";
import { Reveal } from "@/components/motion/Reveal";
import { MachinerySection } from "@/components/product/MachinerySection";
import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";

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
      <Reveal>
        <PageMasthead
          compact
          label="Technologies"
          index="01"
          title="Technologies & Machinery"
          intro="State-of-the-art production floor equipped with microprocessor-controlled injection moulding presses, high-speed automated decoration lines, and closed-loop auxiliary systems."
        />
      </Reveal>

      {/* Machines and Auxiliaries Ledger */}
      <MachinerySection index="02" />

      {/* Call to Action Banner */}
      <section className="border-t border-line bg-charcoal py-14 text-white lg:py-16">
        <div className="shell flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand">
              Production Capacity
            </span>
            <h2 className="display-sm mt-2 text-white">
              Have volume requirements or specific machine tooling?
            </h2>
            <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-white/75">
              Inquire about machine availability, tonnage allocation, cycle times, and automated in-mould labelling capabilities.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <Button href="/contact" variant="primary" size="md" withArrow>
              Inquire capacity
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
