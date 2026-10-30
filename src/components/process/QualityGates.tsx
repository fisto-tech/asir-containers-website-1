"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardCheck, PackageCheck, ScanLine, type LucideIcon } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { reduceMotion, useScrollReveal } from "@/lib/animations";
import { inspectionStages, qualityStatement } from "@/data/manufacturing";

const icons: Record<string, LucideIcon> = {
  inbound: PackageCheck,
  impression: ScanLine,
  finished: ClipboardCheck,
};

const CYCLE = 6000;

/**
 * Quality statement + the three inspection gates.
 *
 * The statement is set as a pull quote against a red survey line; the gates
 * behave as an accordion that advances on its own, opening the depth each gate
 * carries. Hovering hands control back to the pointer.
 */
export function QualityGates() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  useEffect(() => {
    if (paused || reduceMotion()) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % inspectionStages.length),
      CYCLE,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-white py-20 text-ink lg:py-28"
      aria-labelledby="quality-heading"
    >
      <span
        aria-hidden
        className="ghost-numeral-light pointer-events-none absolute -top-6 right-4 hidden select-none font-display text-[16vw] font-semibold leading-none lg:block"
      >
        02
      </span>

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Statement */}
          <div className="lg:col-span-5">
              <SectionLabel index="02">Quality</SectionLabel>
              <h2 id="quality-heading" className="sr-only">
                {qualityStatement.eyebrow}
              </h2>

              <figure className="relative mt-8 pl-6 lg:pl-7">
                <span
                  aria-hidden
                  className="absolute left-0 top-1 block h-[calc(100%-0.5rem)] w-[2px] bg-brand"
                />
                <blockquote
                  className="font-display text-[clamp(1.6rem,2.5vw,2.35rem)] font-semibold leading-[1.24] tracking-[-0.02em] text-ink"
                  data-reveal="letters"
                >
                  {qualityStatement.quote}
                </blockquote>
              </figure>

          </div>

          {/* Gates */}
          <div className="lg:col-span-7">
              <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.26em] text-mid">
                  Inspection gates
                </p>
                <p className="readout text-[11px] text-mid">
                  {String(inspectionStages.length).padStart(2, "0")} checks
                </p>
              </div>

            <ol
              className="mt-1"
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
            >
              {inspectionStages.map((stage, index) => {
                const Icon = icons[stage.icon] ?? PackageCheck;
                const open = index === active;

                return (
                  <li key={stage.index} className="border-b border-line" data-reveal>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onPointerEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      aria-expanded={open}
                      data-open={open}
                      className="tech-row group flex w-full items-start gap-5 py-6 pl-5 text-left sm:gap-7 sm:pl-6"
                    >
                      <span
                        className={`readout pt-1 text-[12px] font-semibold transition-colors duration-400 ${
                          open ? "text-brand" : "text-mid/60"
                        }`}
                      >
                        {stage.index}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between gap-4">
                          <span
                            className={`font-display text-[19px] font-semibold leading-snug transition-colors duration-400 sm:text-[21px] ${
                              open ? "text-ink" : "text-ink/70 group-hover:text-ink"
                            }`}
                          >
                            {stage.title}
                          </span>
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-500 ${
                              open
                                ? "border-brand bg-brand text-white"
                                : "border-line bg-white text-mid/70 group-hover:border-ink/30 group-hover:text-ink"
                            }`}
                          >
                            <Icon aria-hidden className="h-4 w-4" strokeWidth={1.6} />
                          </span>
                        </span>

                        <span
                          className={`grid transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            open
                              ? "mt-3 grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <span className="overflow-hidden">
                            <span className="block max-w-xl text-[13.5px] leading-relaxed text-mid">
                              {stage.detail}
                            </span>
                          </span>
                        </span>

                        {open && (
                          <span aria-hidden className="mt-4 block h-[2px] w-full bg-line/70">
                            <span
                              key={`gate-${active}`}
                              className="ambient-progress block h-full bg-brand"
                              style={{ ["--ambient-duration" as string]: `${CYCLE}ms` }}
                            />
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
