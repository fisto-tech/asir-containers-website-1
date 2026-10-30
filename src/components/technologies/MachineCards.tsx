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

const tints = [
  "bg-brand-light text-brand",
  "bg-ocean-light text-ocean",
  "bg-amber-light text-amber-accent",
  "bg-emerald-light text-emerald-accent",
];

/**
 * The four production routes as plain cards: name, working capacity, set-up.
 * Capacity is the one loud element on each card — set in brand red.
 */
export function MachineCards() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section ref={root} className="bg-[#fbfaf7] pb-20 pt-16 lg:pb-28 lg:pt-20" aria-labelledby="machines-heading">
      <div className="shell">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-amber-accent" data-reveal>
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

            return (
              <li
                key={row.name}
                data-reveal
                data-reveal-delay={String(index * 0.06)}
                className="group flex flex-col rounded-[22px] bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_-30px_rgba(17,17,17,0.4)]"
              >
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-[14px] ${
                    tints[index] ?? tints[0]
                  }`}
                >
                  <Icon aria-hidden className="h-5 w-5" strokeWidth={1.7} />
                </span>

                <h3 className="mt-5 font-display text-[17px] font-semibold leading-snug text-ink">
                  {row.name}
                </h3>

                <p className="mt-2 font-display text-[26px] font-semibold leading-none tracking-[-0.02em] text-brand">
                  {row.capacity}
                </p>

                {row.note && (
                  <p className="mt-3 text-[13px] leading-relaxed text-mid">{row.note}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
