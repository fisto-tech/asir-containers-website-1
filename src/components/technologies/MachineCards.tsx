"use client";

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
  { tile: "bg-brand-light text-brand", value: "text-brand", rule: "bg-brand", wash: "bg-brand/10" },
  { tile: "bg-ocean-light text-ocean", value: "text-ocean", rule: "bg-ocean", wash: "bg-ocean/10" },
  {
    tile: "bg-amber-light text-amber-accent",
    value: "text-amber-accent",
    rule: "bg-amber-accent",
    wash: "bg-amber-accent/10",
  },
  {
    tile: "bg-emerald-light text-emerald-accent",
    value: "text-emerald-accent",
    rule: "bg-emerald-accent",
    wash: "bg-emerald-accent/10",
  },
];

/**
 * The four production routes: name, working capacity and the set-up behind it.
 * Each card carries its own accent, and a soft tint drifts inside the corner so
 * the row keeps a little life without any hover.
 */
export function MachineCards() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section
      ref={root}
      className="bg-[#fbfaf7] pb-20 pt-16 lg:pb-28 lg:pt-20"
      aria-labelledby="machines-heading"
    >
      <div className="shell">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p
              className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-amber-accent"
              data-reveal
            >
              Production
            </p>
            <h2
              id="machines-heading"
              className="mt-3 max-w-xl font-display text-[clamp(1.7rem,2.8vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink"
              data-reveal="letters"
            >
              {machinery.production.title}
            </h2>
          </div>
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
                className="group relative flex flex-col overflow-hidden rounded-[22px] bg-white p-6 ring-1 ring-black/[0.05] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_54px_-32px_rgba(17,17,17,0.42)]"
              >
                <span
                  aria-hidden
                  className={`drift pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full blur-2xl ${accent.wash}`}
                  style={{ animationDelay: `${index * -4.5}s` }}
                />

                <span
                  className={`relative flex h-11 w-11 items-center justify-center rounded-[14px] transition-transform duration-500 group-hover:-translate-y-0.5 ${accent.tile}`}
                >
                  <Icon aria-hidden className="h-5 w-5" strokeWidth={1.7} />
                </span>

                <h3 className="relative mt-5 font-display text-[17px] font-semibold leading-snug text-ink">
                  {row.name}
                </h3>

                <p
                  className={`relative mt-2 font-display text-[25px] font-semibold leading-none tracking-[-0.02em] ${accent.value}`}
                >
                  {row.capacity}
                </p>

                {row.note && (
                  <p className="relative mt-3 text-[13px] leading-relaxed text-mid">{row.note}</p>
                )}

                <div className="relative mt-auto pt-6">
                  <span
                    aria-hidden
                    className={`block h-[3px] w-8 rounded-full transition-all duration-500 group-hover:w-14 ${accent.rule}`}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
