"use client";

import { useRef } from "react";
import {
  ChevronRight,
  ClipboardCheck,
  Factory,
  PackageCheck,
  Printer,
  type LucideIcon,
} from "lucide-react";
import { useScrollReveal } from "@/lib/animations";
import { inspectionStages, inProcess } from "@/data/manufacturing";

type Step = {
  title: string;
  icon: LucideIcon;
  tile: string;
  icon_: string;
  surface: string;
};

const steps: Step[] = [
  {
    title: inspectionStages[0].title,
    icon: PackageCheck,
    tile: "bg-emerald-accent",
    icon_: "text-white",
    surface: "bg-emerald-light",
  },
  {
    title: inProcess.moulding.title,
    icon: Factory,
    tile: "bg-ocean",
    icon_: "text-white",
    surface: "bg-ocean-light",
  },
  {
    title: inProcess.printing.title,
    icon: Printer,
    tile: "bg-amber-accent",
    icon_: "text-white",
    surface: "bg-amber-light",
  },
  {
    title: inspectionStages[2].title,
    icon: ClipboardCheck,
    tile: "bg-brand",
    icon_: "text-white",
    surface: "bg-brand-light",
  },
];

/**
 * The whole line at a glance: four colour-coded stages, left to right on
 * desktop and top to bottom on mobile. Titles only — the detail lives in the
 * sections either side.
 */
export function FlowStrip() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section ref={root} className="bg-[#f7f8fa] py-16 lg:py-20" aria-label="Process flow">
      <div className="shell">
        <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-brand" data-reveal>
          Process flow
        </p>

        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              data-reveal
              data-reveal-delay={String(index * 0.07)}
              className="relative"
            >
              <div
                className={`flex h-full items-center gap-3.5 rounded-[18px] px-5 py-5 ${step.surface}`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] ${step.tile} ${step.icon_}`}
                >
                  <step.icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </span>
                <p className="font-display text-[15.5px] font-semibold leading-snug text-ink">
                  {step.title}
                </p>
              </div>

              {index < steps.length - 1 && (
                <ChevronRight
                  aria-hidden
                  className="absolute right-0 top-1/2 hidden h-4 w-4 -translate-y-1/2 translate-x-1/2 text-ink/20 lg:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
