"use client";

import { useRef } from "react";
import { ClipboardCheck, PackageCheck, ScanLine, type LucideIcon } from "lucide-react";
import { useScrollReveal } from "@/lib/animations";
import { inspectionStages, qualityStatement } from "@/data/manufacturing";

const icons: Record<string, LucideIcon> = {
  inbound: PackageCheck,
  impression: ScanLine,
  finished: ClipboardCheck,
};

const accents = [
  { tile: "bg-emerald-light text-emerald-accent", dot: "bg-emerald-accent" },
  { tile: "bg-ocean-light text-ocean", dot: "bg-ocean" },
  { tile: "bg-amber-light text-amber-accent", dot: "bg-amber-accent" },
];

/**
 * Quality statement beside the three inspection gates, each gate carrying its
 * own accent colour. Everything is open by default — no accordion, no counters.
 */
export function QualityGates() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section
      ref={root}
      className="bg-[#fbfaf7] py-20 lg:py-28"
      aria-labelledby="quality-heading"
    >
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-emerald-accent">
            Quality
          </p>

          <h2 id="quality-heading" className="sr-only">
            {qualityStatement.eyebrow}
          </h2>

          <blockquote
            className="mt-5 border-l-2 border-emerald-accent pl-5 font-display text-[clamp(1.6rem,2.4vw,2.2rem)] font-semibold leading-[1.26] tracking-[-0.02em] text-ink sm:pl-6"
            data-reveal="letters"
          >
            {qualityStatement.quote}
          </blockquote>

          <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-mid" data-reveal>
            {qualityStatement.note}
          </p>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid gap-4">
            {inspectionStages.map((stage, index) => {
              const Icon = icons[stage.icon] ?? PackageCheck;
              const accent = accents[index] ?? accents[0];

              return (
                <li
                  key={stage.index}
                  data-reveal
                  data-reveal-delay={String(index * 0.06)}
                  className="group flex gap-5 rounded-[20px] bg-white p-6 transition-all duration-500 hover:shadow-[0_18px_45px_-28px_rgba(17,17,17,0.35)] sm:p-7"
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] transition-transform duration-500 group-hover:-translate-y-0.5 ${accent.tile}`}
                  >
                    <Icon aria-hidden className="h-5 w-5" strokeWidth={1.7} />
                  </span>

                  <div>
                    <h3 className="font-display text-[18px] font-semibold leading-snug text-ink">
                      {stage.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg text-[14px] leading-relaxed text-mid">
                      {stage.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
