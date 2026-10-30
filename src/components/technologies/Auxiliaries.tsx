"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  Droplets,
  Recycle,
  Snowflake,
  SunMedium,
  Thermometer,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { useScrollReveal } from "@/lib/animations";
import { machinery } from "@/data/manufacturing";

const icons: Record<string, LucideIcon> = {
  "Chilling plant": Snowflake,
  "Hopper dryers": SunMedium,
  "Mould temperature controllers": Thermometer,
  Granulators: Recycle,
  "Air compressors": Wind,
  "Cooling tower": Droplets,
};

const motions: Record<string, string> = {
  "Chilling plant": "icon-spin-slow",
  "Hopper dryers": "icon-pulse",
  "Mould temperature controllers": "icon-swing",
  Granulators: "icon-spin",
  "Air compressors": "icon-travel",
  "Cooling tower": "icon-float",
};

const accents = [
  { tile: "bg-ocean-light text-ocean", value: "text-ocean" },
  { tile: "bg-amber-light text-amber-accent", value: "text-amber-accent" },
  { tile: "bg-brand-light text-brand", value: "text-brand" },
  { tile: "bg-emerald-light text-emerald-accent", value: "text-emerald-accent" },
  { tile: "bg-ocean-light text-ocean", value: "text-ocean" },
  { tile: "bg-amber-light text-amber-accent", value: "text-amber-accent" },
];

const countOf = (capacity: string) => Number(capacity.match(/\d+/)?.[0] ?? 0);
const unitOf = (capacity: string) => capacity.replace(/[\d\s]/g, "");

/**
 * Plant auxiliaries: one ledger panel. The unit list runs down the left with
 * animated icons and right-aligned counts; a plant photograph holds the right
 * half so the panel does not read as a table of words.
 */
export function Auxiliaries() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section ref={root} className="bg-[#f7f8fa] py-20 lg:py-28" aria-labelledby="auxiliaries-heading">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[30px] bg-white p-6 ring-1 ring-black/[0.05] sm:p-10 lg:p-12">
          <span
            aria-hidden
            className="drift pointer-events-none absolute -right-24 -top-28 h-[320px] w-[320px] rounded-full bg-brand/[0.06] blur-3xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
            <div className="lg:col-span-7">
              <p
                className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-brand"
                data-reveal
              >
                Plant support
              </p>
              <h2
                id="auxiliaries-heading"
                className="mt-3 font-display text-[clamp(1.7rem,2.8vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink"
                data-reveal="letters"
              >
                {machinery.auxiliaries.title}
              </h2>
              <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-mid" data-reveal>
                Continuous preventive calibration across all secondary units to ensure 100%
                operational uptime.
              </p>

              <ul className="mt-8">
                {machinery.auxiliaries.rows.map((row, index) => {
                  const Icon = icons[row.name] ?? Droplets;
                  const motion = motions[row.name] ?? "icon-float";
                  const accent = accents[index % accents.length];

                  return (
                    <li
                      key={row.name}
                      data-reveal
                      data-reveal-delay={String(index * 0.05)}
                      className="flex items-center gap-4 border-b border-line py-3.5 transition-colors duration-300 first:border-t first:border-line hover:bg-[#f7f8fa]"
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${accent.tile}`}
                      >
                        <Icon
                          aria-hidden
                          className={`h-[18px] w-[18px] ${motion}`}
                          strokeWidth={1.7}
                        />
                      </span>

                      <span className="text-[14.5px] font-medium leading-snug text-ink">
                        {row.name}
                      </span>

                      <span className="ml-auto flex shrink-0 items-baseline gap-1.5">
                        <Counter
                          value={countOf(row.capacity)}
                          className={`font-display text-[24px] font-semibold leading-none tabular-nums ${accent.value}`}
                        />
                        <span className="text-[11px] uppercase tracking-[0.1em] text-mid/70">
                          {unitOf(row.capacity)}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-[260px] overflow-hidden rounded-[22px] bg-light sm:h-[320px] lg:h-full lg:min-h-[420px]">
                <Image
                  src="/images/facility/dispatch.jpg"
                  alt="Auxiliary units and packed stock on the plant floor"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="ambient-media-slow object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
