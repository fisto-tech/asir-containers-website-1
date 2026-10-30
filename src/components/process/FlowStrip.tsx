"use client";

import { useEffect, useRef, useState } from "react";
import {
  Boxes,
  ClipboardCheck,
  PackageCheck,
  Printer,
  type LucideIcon,
} from "lucide-react";
import { reduceMotion, useScrollReveal } from "@/lib/animations";
import { inspectionStages, inProcess } from "@/data/manufacturing";

type Step = {
  title: string;
  detail: string;
  icon: LucideIcon;
  tile: string;
  tileSoft: string;
  rule: string;
  ring: string;
};

const steps: Step[] = [
  {
    title: inspectionStages[0].title,
    detail: inspectionStages[0].detail,
    icon: PackageCheck,
    tile: "bg-emerald-accent text-white",
    tileSoft: "bg-emerald-light text-emerald-accent",
    rule: "bg-emerald-accent",
    ring: "ring-emerald-accent/35",
  },
  {
    title: inProcess.moulding.title,
    detail: inProcess.moulding.detail,
    icon: Boxes,
    tile: "bg-ocean text-white",
    tileSoft: "bg-ocean-light text-ocean",
    rule: "bg-ocean",
    ring: "ring-ocean/35",
  },
  {
    title: inProcess.printing.title,
    detail: inProcess.printing.detail,
    icon: Printer,
    tile: "bg-amber-accent text-white",
    tileSoft: "bg-amber-light text-amber-accent",
    rule: "bg-amber-accent",
    ring: "ring-amber-accent/35",
  },
  {
    title: inspectionStages[2].title,
    detail: inspectionStages[2].detail,
    icon: ClipboardCheck,
    tile: "bg-brand text-white",
    tileSoft: "bg-brand-light text-brand",
    rule: "bg-brand",
    ring: "ring-brand/35",
  },
];

const CYCLE = 3600;

/**
 * The line at a glance: four colour-coded stages on a dashed run. The stages
 * take turns lifting out of the row, so the band is never still.
 */
export function FlowStrip() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  useEffect(() => {
    if (paused || reduceMotion()) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % steps.length),
      CYCLE,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section ref={root} className="bg-[#fbfaf7] py-20 lg:py-28" aria-labelledby="flow-heading">
      <div className="shell">
        <div className="max-w-xl">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            Process flow
          </p>
          <h2
            id="flow-heading"
            className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.75rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink"
            data-reveal="letters"
          >
            Moulded, printed and packed on one floor.
          </h2>
        </div>

        <div
          className="relative mt-12"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {/* Travelling dashed run behind the cards */}
          <span
            aria-hidden
            className="animate-dash absolute left-8 right-8 top-[54px] hidden h-px bg-[repeating-linear-gradient(to_right,rgba(17,17,17,0.22)_0_7px,transparent_7px_14px)] lg:block"
          />

          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const open = index === active;

              return (
                <li
                  key={step.title}
                  data-reveal
                  data-reveal-delay={String(index * 0.07)}
                  className="flex"
                  onMouseEnter={() => setActive(index)}
                >
                  <div
                    className={`relative flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-white p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      open
                        ? `-translate-y-1.5 shadow-[0_28px_54px_-34px_rgba(17,17,17,0.5)] ring-2 ${step.ring}`
                        : "translate-y-0 shadow-[0_14px_36px_-32px_rgba(17,17,17,0.5)] ring-1 ring-black/[0.06]"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 top-0 h-[3px] origin-left transition-transform duration-700 ${step.rule} ${
                        open ? "scale-x-100" : "scale-x-0"
                      }`}
                    />

                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-[14px] transition-all duration-700 ${
                        open ? `${step.tile} scale-105` : step.tileSoft
                      }`}
                    >
                      <step.icon aria-hidden className="h-5 w-5" strokeWidth={1.8} />
                    </span>

                    <h3 className="mt-6 font-display text-[18px] font-semibold leading-snug text-ink">
                      {step.title}
                    </h3>

                    <p
                      className={`mt-2 text-[13px] leading-relaxed transition-colors duration-500 ${
                        open ? "text-mid" : "text-mid/70"
                      }`}
                    >
                      {step.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
