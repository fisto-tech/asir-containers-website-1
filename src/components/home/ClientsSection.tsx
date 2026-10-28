import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { allHomeClients } from "@/data/manufacturing";

export function ClientsSection() {
  // Duplicate array to ensure perfectly seamless loop
  const marqueeList = [...allHomeClients, ...allHomeClients];

  return (
    <section className="relative overflow-hidden border-y border-line bg-white py-16 lg:py-22">
      <Reveal className="shell mb-10">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <SectionLabel index="06">Trusted by industry</SectionLabel>
            <h2 className="display-sm mt-3 font-display font-semibold tracking-tight text-ink">
              Packaging brands rely on ASIR.
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-relaxed text-mid">
            Supplying precision injection-moulded and decorated pails to leading paint, agrochemical, food and lube manufacturers.
          </p>
        </div>
      </Reveal>

      {/* Edge gradient mask for clean marquee fade */}
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        {/* Marquee Track */}
        <div className="animate-marquee flex gap-5 py-3">
          {marqueeList.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="group flex h-24 w-56 shrink-0 items-center justify-center rounded-2xl border border-line/90 bg-soft/40 px-6 py-4 shadow-2xs transition-all duration-300 hover:border-brand/40 hover:bg-white hover:shadow-md hover:-translate-y-1"
            >
              <Image
                src={client.logo}
                alt={client.alt}
                width={180}
                height={46}
                className="h-9 w-auto max-w-[145px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
