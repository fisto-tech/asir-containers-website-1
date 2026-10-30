import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { allHomeClients } from "@/data/manufacturing";

export function ClientsSection() {
  // Duplicate array to ensure perfectly seamless loop
  const marqueeList = [...allHomeClients, ...allHomeClients];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white py-18 lg:py-24">
      {/* Background soft color blurs */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-rose-100/30 blur-3xl" />

      <Reveal className="shell mb-10">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <SectionLabel index="07">Our Clients</SectionLabel>
            <h2 className="display-sm mt-3 font-display font-semibold tracking-tight text-ink">
              Packaging brands rely on ASIR.
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-relaxed text-slate-600">
            Supplying precision injection-moulded and decorated pails to leading paint, agrochemical, food and lube manufacturers.
          </p>
        </div>
      </Reveal>

      {/* Edge gradient mask for clean marquee fade */}
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white via-white/80 to-transparent" />

        {/* Marquee Track with colorful hover card elevation */}
        <div className="animate-marquee flex gap-5 py-4">
          {marqueeList.map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="group flex h-24 w-56 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-6 py-4 shadow-xs transition-all duration-300 hover:border-brand/40 hover:bg-gradient-to-br hover:from-white hover:to-rose-50/30 hover:shadow-lg hover:-translate-y-1"
            >
              <Image
                src={client.logo}
                alt={client.alt}
                width={180}
                height={46}
                className="h-9 w-auto max-w-[145px] object-contain transition-transform duration-300 group-hover:scale-108"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
