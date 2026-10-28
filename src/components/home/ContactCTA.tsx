import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cta } from "@/data/home";

/**
 * Closing CTA — a dark photo panel with the red set as an inset block that
 * overlaps the image edge, so it reads as an editorial plate rather than a
 * full-width red band.
 */
export function ContactCTA() {
  return (
    <section className="bg-white pt-2 pb-14 lg:pb-18">
      <Reveal className="shell">
        <div className="relative overflow-hidden rounded-[24px] bg-charcoal shadow-xl">
          {/* Backdrop with higher visibility */}
          <div className="absolute inset-0">
            <Image
              src="/images/facility/dispatch.jpg"
              alt="Dispatch bay and factory floor packaging line"
              fill
              sizes="100vw"
              className="object-cover opacity-60"
            />
            {/* Subtle gradient so text stays 100% crisp while keeping plant image visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/40" />
          </div>

          <div className="relative z-10 flex flex-col justify-between gap-6 px-7 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:px-12 lg:py-11">
            <div className="max-w-xl">
              <SectionLabel index="08" tone="light" reveal>
                {cta.eyebrow}
              </SectionLabel>

              <h2 className="display-md mt-2.5 font-display font-semibold text-white" data-reveal="letters">
                {cta.heading}
              </h2>

              <p className="mt-2.5 max-w-lg text-[14.5px] leading-relaxed text-white/80" data-reveal>
                {cta.body}
              </p>
            </div>

            {/* Clean Enquiry Action */}
            <div className="shrink-0" data-reveal>
              <Link
                href="/contact"
                className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-brand px-7 text-[14.5px] font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/35 hover:scale-[1.02] active:scale-[0.98]"
              >
                Start an enquiry
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
