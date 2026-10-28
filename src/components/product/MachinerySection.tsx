import {
  Factory,
  Printer,
  Flame,
  Bot,
  Snowflake,
  SunMedium,
  Thermometer,
  Recycle,
  Wind,
  Droplets,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { machinery } from "@/data/manufacturing";

const productionIcons: Record<string, LucideIcon> = {
  "Direct machineries": Factory,
  "Screen printing": Printer,
  "HTL": Flame,
  "Inmould labeling (IML)": Bot,
};

const auxiliaryIcons: Record<string, LucideIcon> = {
  "Chilling plant": Snowflake,
  "Hopper dryers": SunMedium,
  "Mould temperature controllers": Thermometer,
  "Granulators": Recycle,
  "Air compressors": Wind,
  "Cooling tower": Droplets,
};

type MachinerySectionProps = {
  index?: string;
};

/**
 * Machine ledger — human-crafted editorial layout.
 * Emphasizes typography, clean hierarchy, and authentic industrial catalog aesthetics
 * with purpose-specific icons instead of sequential numbers.
 */
export function MachinerySection({ index = "05" }: MachinerySectionProps = {}) {
  return (
    <section className="border-t border-line bg-white py-14 text-ink lg:py-20">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel index={index} tone="dark">
                {machinery.eyebrow}
              </SectionLabel>
              <h2 className="display-md mt-4 max-w-xl text-ink">
                Machines and the envelope they run.
              </h2>
            </div>
            <p className="max-w-sm text-[14.5px] leading-relaxed text-mid">
              {machinery.intro}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main Production Machineries — Editorial Clean Grid */}
          <div className="lg:col-span-7">
            <div className="border-b-2 border-ink pb-3">
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                {machinery.production.title}
              </h3>
            </div>

            <div className="divide-y divide-line">
              {machinery.production.rows.map((row) => {
                const Icon = productionIcons[row.name] || Factory;
                return (
                  <Reveal
                    key={row.name}
                    className="group py-6 transition-colors duration-300 first:pt-5 hover:bg-soft/50"
                  >
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-light/70 text-mid/70 transition-colors duration-300 group-hover:bg-brand/10 group-hover:text-brand">
                          <Icon className="h-4 w-4" />
                        </span>
                        <h4 className="font-display text-lg font-medium text-ink transition-colors duration-300 group-hover:text-brand">
                          {row.name}
                        </h4>
                      </div>

                      <div className="pl-[46px] sm:pl-0 sm:text-right">
                        <span className="font-display text-xl font-semibold text-brand">
                          {row.capacity}
                        </span>
                      </div>
                    </div>

                    {row.note && (
                      <p className="mt-2 pl-[46px] text-[13.5px] leading-relaxed text-mid">
                        {row.note}
                      </p>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Plant Auxiliaries — Clean Editorial Spec Column */}
          <div className="lg:col-span-5">
            <div className="border-b-2 border-ink pb-3">
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
                {machinery.auxiliaries.title}
              </h3>
            </div>

            <div className="divide-y divide-line">
              {machinery.auxiliaries.rows.map((row) => {
                const Icon = auxiliaryIcons[row.name] || Droplets;
                return (
                  <Reveal
                    key={row.name}
                    className="group flex items-center justify-between py-3.5 text-[14px] transition-colors duration-300 first:pt-5 hover:bg-soft/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-light/70 text-mid/70 transition-colors duration-300 group-hover:bg-brand/10 group-hover:text-brand">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-medium text-ink transition-colors duration-300 group-hover:text-brand">
                        {row.name}
                      </span>
                    </div>
                    <span className="font-mono text-[13.5px] font-semibold text-ink">
                      {row.capacity}
                    </span>
                  </Reveal>
                );
              })}
            </div>

            <p className="mt-8 border-t border-line pt-4 text-[12.5px] leading-relaxed text-mid">
              Continuous preventive calibration across all secondary units to ensure 100% operational uptime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

