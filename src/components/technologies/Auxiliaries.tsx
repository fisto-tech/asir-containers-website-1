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

const rows = machinery.auxiliaries.rows;
const columns = [rows.slice(0, 3), rows.slice(3)];

/**
 * Plant auxiliaries as one ledger panel: two columns of rows, each carrying its
 * animated icon, its unit count and a hairline between. No tile grid — the
 * counts line up on the right like a stock sheet.
 */
export function Auxiliaries() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section ref={root} className="bg-[#f7f8fa] py-20 lg:py-28" aria-labelledby="auxiliaries-heading">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[30px] bg-white px-6 py-10 ring-1 ring-black/[0.05] sm:px-10 lg:px-14 lg:py-14">
          <span
            aria-hidden
            className="drift pointer-events-none absolute -right-24 -top-28 h-[320px] w-[320px] rounded-full bg-brand/[0.06] blur-3xl"
          />

          <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
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
            </div>
            <p className="max-w-xs text-[13.5px] leading-relaxed text-mid" data-reveal>
              Continuous preventive calibration across all secondary units to ensure 100%
              operational uptime.
            </p>
          </div>

          <div className="relative mt-10 grid gap-x-16 gap-y-1 lg:grid-cols-2">
            {columns.map((column, columnIndex) => (
              <ul key={columnIndex}>
                {column.map((row, index) => {
                  const Icon = icons[row.name] ?? Droplets;
                  const motion = motions[row.name] ?? "icon-float";
                  const accent = accents[(columnIndex * 3 + index) % accents.length];

                  return (
                    <li
                      key={row.name}
                      data-reveal
                      data-reveal-delay={String((columnIndex * 3 + index) * 0.05)}
                      className="group -mx-3 flex items-center gap-4 rounded-[12px] border-b border-line px-3 py-4 transition-colors duration-300 last:border-b-0 hover:bg-[#f7f8fa]"
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
                          className={`font-display text-[26px] font-semibold leading-none tabular-nums ${accent.value}`}
                        />
                        <span className="text-[11px] uppercase tracking-[0.1em] text-mid/70">
                          {unitOf(row.capacity)}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
