"use client";

import Image from "next/image";
import { useRef } from "react";
import { Bot, Factory, Flame, Printer, type LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/lib/animations";
import { machinery } from "@/data/manufacturing";

const icons: Record<string, LucideIcon> = {
  "Direct machineries": Factory,
  "Screen printing": Printer,
  HTL: Flame,
  "Inmould labeling (IML)": Bot,
};

const accents = [
  {
    tile: "bg-brand-light text-brand",
    value: "text-brand",
    rule: "bg-brand",
    image: "/images/facility/machinery-02.jpg",
    alt: "Injection moulding machine on the production floor",
  },
  {
    tile: "bg-ocean-light text-ocean",
    value: "text-ocean",
    rule: "bg-ocean",
    image: "/images/facility/labelling.jpg",
    alt: "Containers moving through the in-line printing station",
  },
  {
    tile: "bg-amber-light text-amber-accent",
    value: "text-amber-accent",
    rule: "bg-amber-accent",
    image: "/images/hero/hero-03.jpg",
    alt: "Heat-transfer labelling line in the plant",
  },
  {
    tile: "bg-emerald-light text-emerald-accent",
    value: "text-emerald-accent",
    rule: "bg-emerald-accent",
    image: "/images/families/paint-pail.jpg",
    alt: "Container with its label moulded into the wall",
  },
];

/**
 * The four production routes, each opening on a photograph of the line it runs
 * on. The photographs carry a slow ambient zoom and colour washes drift behind
 * the row, so the block is alive before anyone hovers it.
 */
export function MachineCards() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-[#fbfaf7] pb-20 pt-16 lg:pb-28 lg:pt-20"
      aria-labelledby="machines-heading"
    >
      <span
        aria-hidden
        className="drift pointer-events-none absolute -left-32 top-24 h-[420px] w-[420px] rounded-full bg-ocean/[0.07] blur-3xl"
      />
      <span
        aria-hidden
        className="drift pointer-events-none absolute -right-28 bottom-0 h-[380px] w-[380px] rounded-full bg-amber-accent/[0.07] blur-3xl [animation-delay:-11s]"
      />

      <div className="shell relative">
        <div className="max-w-xl">
          <p
            className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-amber-accent"
            data-reveal
          >
            Production
          </p>
          <h2
            id="machines-heading"
            className="mt-3 font-display text-[clamp(1.7rem,2.8vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink"
            data-reveal="letters"
          >
            {machinery.production.title}
          </h2>
        </div>

        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {machinery.production.rows.map((row, index) => {
            const Icon = icons[row.name] ?? Factory;
            const accent = accents[index % accents.length];

            return (
              <li
                key={row.name}
                data-reveal
                data-reveal-delay={String(index * 0.06)}
                className="group flex flex-col overflow-hidden rounded-[22px] bg-white ring-1 ring-black/[0.05] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_54px_-32px_rgba(17,17,17,0.42)]"
              >
                <div className="relative h-[148px] overflow-hidden bg-light">
                  <span className="absolute inset-0 block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
                    <Image
                      src={accent.image}
                      alt={accent.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="ambient-media object-cover"
                    />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-[11px] ${accent.tile}`}
                  >
                    <Icon aria-hidden className="h-4 w-4" strokeWidth={1.8} />
                  </span>

                  <h3 className="mt-3 font-display text-[16.5px] font-semibold leading-snug text-ink">
                    {row.name}
                  </h3>

                  <p
                    className={`mt-1.5 font-display text-[23px] font-semibold leading-none tracking-[-0.02em] ${accent.value}`}
                  >
                    {row.capacity}
                  </p>

                  {row.note && (
                    <p className="mt-2.5 text-[13px] leading-relaxed text-mid">{row.note}</p>
                  )}

                  <div className="mt-auto pt-5">
                    <span
                      aria-hidden
                      className={`block h-[3px] w-8 rounded-full transition-all duration-500 group-hover:w-14 ${accent.rule}`}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
