import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { rangeStats } from "@/data/products";
import { site } from "@/data/site";
import { cta } from "@/data/home";

/**
 * Closing CTA — a dark photo panel with the red set as an inset block that
 * overlaps the image edge, so it reads as an editorial plate rather than a
 * full-width red band.
 */
export function ContactCTA() {
  return (
    <section className="bg-white pt-4 pb-20 lg:pb-28">
      <Reveal className="shell">
        <div className="relative overflow-hidden rounded-[28px] bg-charcoal">
          {/* Backdrop */}
          <Image
            src="/images/facility/dispatch.jpg"
            alt="Placeholder photograph — pallets of stacked plastic pails in a dispatch bay"
            fill
            sizes="100vw"
            className="ambient-media-slow object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,#111111_0%,rgba(17,17,17,0.92)_48%,rgba(17,17,17,0.55)_100%)]" />

          <div className="relative grid items-end gap-10 p-8 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14">
            <div className="lg:col-span-7">
              <SectionLabel index="08" tone="light" reveal>
                {cta.eyebrow}
              </SectionLabel>

              <h2 className="display-lg mt-5 whitespace-pre-line text-white" data-reveal="letters">
                {cta.heading}
              </h2>

              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/85" data-reveal>
                {cta.body}
              </p>
            </div>

            {/* Overlapping red action block */}
            <div className="lg:col-span-5">
              <div className="rounded-[22px] bg-brand p-7 text-white" data-reveal>
                <p className="font-display text-[19px] font-semibold leading-snug">
                  {rangeStats.products} containers · {rangeStats.codes} codes
                </p>
                <p className="mt-1.5 text-[13px] text-white/85">
                  Tell us the code and quantity — we confirm the rest.
                </p>

                <a
                  href={`mailto:${site.contact.email}`}
                  className="group mt-6 flex items-center justify-between rounded-full bg-white px-5 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-light"
                >
                  <span>{site.contact.email}</span>
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>

                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
                  <a
                    href={`tel:${(site.contact.phone ?? "").replace(/\s/g, "")}`}
                    className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    {site.contact.phone}
                  </a>
                  <a
                    href="/products"
                    className="group inline-flex items-center gap-1.5 text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    Browse the range
                    <ArrowUpRight
                      aria-hidden
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
