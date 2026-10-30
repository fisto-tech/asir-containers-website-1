"use client";

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

const tints = [
  "bg-ocean-light text-ocean",
  "bg-amber-light text-amber-accent",
  "bg-brand-light text-brand",
  "bg-emerald-light text-emerald-accent",
];

const countOf = (capacity: string) => Number(capacity.match(/\d+/)?.[0] ?? 0);
const unitOf = (capacity: string) => capacity.replace(/[\d\s]/g, "");

/**
 * Plant auxiliaries — six soft tiles, each with its unit count and a coloured
 * icon. Counts run up as the row arrives.
 */
export function Auxiliaries() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section ref={root} className="bg-[#f7f8fa] py-20 lg:py-28" aria-labelledby="auxiliaries-heading">
      <div className="shell">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-brand" data-reveal>
              Plant support
            </p>
            <h2
              id="auxiliaries-heading"
              className="mt-3 font-display text-[clamp(1.7rem,2.8vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink"
              data-reveal="letters"
            >
              {machinery.auxiliaries.title}
            </h2>
          </div>
          <p className="max-w-xs text-[13.5px] leading-relaxed text-mid" data-reveal>
            Continuous preventive calibration across all secondary units to ensure 100%
            operational uptime.
          </p>
        </div>

        <ul className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {machinery.auxiliaries.rows.map((row, index) => {
            const Icon = icons[row.name] ?? Droplets;
            const motion = motions[row.name] ?? "icon-float";

            return (
              <li
                key={row.name}
                data-reveal
                data-reveal-delay={String(index * 0.05)}
                className="group flex flex-col justify-between gap-7 rounded-[20px] bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_-30px_rgba(17,17,17,0.35)]"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    tints[index % tints.length]
                  }`}
                >
                  <Icon aria-hidden className={`h-[18px] w-[18px] ${motion}`} strokeWidth={1.7} />
                </span>

                <div>
                  <p className="flex items-baseline gap-1.5">
                    <Counter
                      value={countOf(row.capacity)}
                      className="font-display text-[26px] font-semibold leading-none text-ink"
                    />
                    <span className="text-[11.5px] uppercase tracking-[0.1em] text-mid/70">
                      {unitOf(row.capacity)}
                    </span>
                  </p>
                  <p className="mt-2 text-[12.5px] font-medium leading-snug text-ink/75">
                    {row.name}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
