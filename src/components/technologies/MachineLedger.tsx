"use client";

import { useRef } from "react";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollReveal } from "@/lib/animations";
import { machinery } from "@/data/manufacturing";

/** Reads the leading figure out of a capacity string ("6 colour" → 6). */
const segmentsFor = (capacity: string) => {
  const match = capacity.match(/\d+/);
  return match ? Math.min(Number(match[0]), 8) : 0;
};

/**
 * Production machinery ledger on the plant floor plate. Each row states the
 * working envelope, with a segmented readout standing in for the set-up count,
 * and a hairline red survey line that draws on hover.
 */
export function MachineLedger() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-[#080a0e] py-20 text-white lg:py-28"
      aria-labelledby="ledger-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <Image
          src="/images/facility/machinery-01.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080a0e] via-[#080a0e]/85 to-[#080a0e]" />
        <div className="tech-grid edge-fade-y absolute inset-0 opacity-50" />
      </div>

      <div className="shell relative">
          <div className="flex flex-col justify-between gap-6 border-b border-white/12 pb-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel index="03" tone="light">
                Machinery
              </SectionLabel>
              <h2
                id="ledger-heading"
                className="mt-4 font-display text-[clamp(1.85rem,3.2vw,2.85rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-white"
                data-reveal="letters"
              >
                {machinery.production.title}
              </h2>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/55">
              {String(machinery.production.rows.length).padStart(2, "0")} entries
            </p>
          </div>

        <div className="mt-2">
          {machinery.production.rows.map((row, index) => {
            const isRange = /–|-/.test(row.capacity);
            const segments = segmentsFor(row.capacity);

            return (
              <div
                key={row.name}
                data-reveal
                data-reveal-delay={String(index * 0.06)}
                className="tech-row group grid grid-cols-1 items-baseline gap-x-6 gap-y-3 border-b border-white/10 py-7 pl-5 sm:grid-cols-12 sm:pl-6 lg:py-9"
              >
                <p className="readout text-[11px] font-semibold text-brand sm:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div className="sm:col-span-5">
                  <h3 className="font-display text-[clamp(1.25rem,2.1vw,1.85rem)] font-semibold leading-tight text-white">
                    {row.name}
                  </h3>
                  {row.note && (
                    <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-white/85">
                      {row.note}
                    </p>
                  )}
                </div>

                {/* Segmented set-up readout */}
                <div className="hidden items-center gap-1.5 sm:col-span-3 sm:flex" aria-hidden>
                  {isRange ? (
                    <span className="relative block h-[3px] w-full max-w-[150px] bg-white/12">
                      <span className="absolute inset-y-0 left-[12%] right-[7%] bg-white/30 transition-colors duration-500 group-hover:bg-brand/70" />
                    </span>
                  ) : (
                    Array.from({ length: segments }).map((_, segment) => (
                      <span
                        key={segment}
                        className="block h-2.5 w-2.5 bg-white/20 transition-colors duration-500 group-hover:bg-brand/80"
                        style={{ transitionDelay: `${segment * 55}ms` }}
                      />
                    ))
                  )}
                </div>

                <p className="readout text-left font-display text-[clamp(1.4rem,2.4vw,2.1rem)] font-semibold leading-none text-white transition-colors duration-500 group-hover:text-brand sm:col-span-3 sm:text-right">
                  {row.capacity}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/55">
            Tooling decides the actual format a machine runs
          </p>
        </div>
      </div>
    </section>
  );
}
