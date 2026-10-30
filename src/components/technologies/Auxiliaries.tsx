import {
  Droplets,
  Recycle,
  Snowflake,
  SunMedium,
  Thermometer,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/ui/Counter";
import { SectionLabel } from "@/components/ui/SectionLabel";
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

const countOf = (capacity: string) => Number(capacity.match(/\d+/)?.[0] ?? 0);
const unitOf = (capacity: string) => capacity.replace(/[\d\s]/g, "");

/**
 * Plant auxiliaries as a measured register: six hairline cells, each counting
 * its own units as the section arrives. The little red rule draws across the
 * top edge of the cell on hover.
 */
export function Auxiliaries() {
  return (
    <section
      className="relative overflow-hidden bg-[#f6f7f9] py-20 text-ink lg:py-28"
      aria-labelledby="auxiliaries-heading"
    >
      <div className="tech-grid-light edge-fade-y pointer-events-none absolute inset-0 opacity-60" />

      <div className="shell relative">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-ink/12 pb-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel index="04">Auxiliaries</SectionLabel>
              <h2
                id="auxiliaries-heading"
                className="mt-4 font-display text-[clamp(1.85rem,3.2vw,2.85rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-ink"
                data-reveal="letters"
              >
                {machinery.auxiliaries.title}
              </h2>
            </div>
            <p className="max-w-xs text-[13px] leading-relaxed text-mid">
              Continuous preventive calibration across all secondary units to ensure 100%
              operational uptime.
            </p>
          </div>
        </Reveal>

        <Reveal as="ul" className="mt-px grid grid-cols-2 gap-px border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {machinery.auxiliaries.rows.map((row, index) => {
            const Icon = icons[row.name] ?? Droplets;
            const motion = motions[row.name] ?? "icon-float";

            return (
              <li
                key={row.name}
                data-reveal
                data-reveal-delay={String(index * 0.05)}
                className="group relative flex flex-col justify-between gap-8 bg-white px-5 pb-5 pt-6 transition-colors duration-500 hover:bg-white"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />

                <span className="flex items-start justify-between">
                  <Icon
                    aria-hidden
                    className={`h-5 w-5 text-mid/70 transition-colors duration-500 group-hover:text-brand ${motion}`}
                    strokeWidth={1.5}
                  />
                  <span className="readout text-[10px] font-semibold text-mid/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </span>

                <span>
                  <span className="flex items-baseline gap-1.5">
                    <Counter
                      value={countOf(row.capacity)}
                      className="readout font-display text-[clamp(2rem,3vw,2.6rem)] font-semibold leading-none text-ink transition-colors duration-500 group-hover:text-brand"
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mid/70">
                      {unitOf(row.capacity)}
                    </span>
                  </span>
                  <span className="mt-2 block text-[12.5px] font-medium leading-snug text-ink/80">
                    {row.name}
                  </span>
                </span>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
