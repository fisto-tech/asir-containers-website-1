"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { allHomeClients } from "@/data/manufacturing";

export function ClientsSection() {
  // Duplicate array to ensure perfectly seamless infinite loop
  const marqueeList = [...allHomeClients, ...allHomeClients];

  return (
    <section className="relative overflow-hidden bg-slate-50/80 py-16 lg:py-20 border-b border-slate-200/60">
      {/* Background soft color blurs */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-rose-100/30 blur-3xl" />

      <Reveal className="shell mb-10">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
            <h2 className="mt-3 font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.5rem] font-bold tracking-tight text-ink leading-[1.06]">
              Packaging brands rely on ASIR.
            </h2>
          </div>
          <p data-reveal data-reveal-dir="right" data-reveal-delay="0.18" className="max-w-md text-[14px] leading-relaxed text-slate-600">
            Supplying precision injection-moulded and decorated pails to leading paint, agrochemical, food and lube manufacturers.
          </p>
        </div>
      </Reveal>

      {/* Edge gradient mask for clean marquee fade */}
      <Reveal className="relative w-full overflow-hidden">
        <div data-reveal data-reveal-dir="scale" data-reveal-delay="0.2">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent" />

          {/* Marquee Track with clean white cards */}
          <div className="animate-marquee flex gap-5 py-3">
          {marqueeList.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="group flex h-24 w-56 shrink-0 items-center justify-center rounded-2xl border border-slate-200/90 bg-white px-6 py-4 shadow-sm transition-all duration-300 hover:border-brand/40 hover:bg-gradient-to-br hover:from-white hover:to-rose-50/30 hover:shadow-lg hover:-translate-y-1"
            >
              <Image
                src={client.logo}
                alt={client.alt}
                width={180}
                height={46}
                unoptimized
                className="h-9 w-auto max-w-[145px] object-contain transition-transform duration-300 group-hover:scale-108"
              />
            </div>
          ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
