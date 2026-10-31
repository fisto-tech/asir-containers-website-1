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
  stepNum: string;
  tile: string;
  tileSoft: string;
  rule: string;
  ring: string;
  glow: string;
};

const steps: Step[] = [
  {
    title: inspectionStages[0].title,
    detail: inspectionStages[0].detail,
    icon: PackageCheck,
    stepNum: "01",
    tile: "bg-emerald-accent text-white",
    tileSoft: "bg-emerald-light text-emerald-accent",
    rule: "bg-emerald-accent",
    ring: "ring-emerald-accent/35",
    glow: "rgba(5,150,105,0.08)",
  },
  {
    title: inProcess.moulding.title,
    detail: inProcess.moulding.detail,
    icon: Boxes,
    stepNum: "02",
    tile: "bg-ocean text-white",
    tileSoft: "bg-ocean-light text-ocean",
    rule: "bg-ocean",
    ring: "ring-ocean/35",
    glow: "rgba(2,132,199,0.08)",
  },
  {
    title: inProcess.printing.title,
    detail: inProcess.printing.detail,
    icon: Printer,
    stepNum: "03",
    tile: "bg-amber-accent text-white",
    tileSoft: "bg-amber-light text-amber-accent",
    rule: "bg-amber-accent",
    ring: "ring-amber-accent/35",
    glow: "rgba(217,119,6,0.08)",
  },
  {
    title: inspectionStages[2].title,
    detail: inspectionStages[2].detail,
    icon: ClipboardCheck,
    stepNum: "04",
    tile: "bg-brand text-white",
    tileSoft: "bg-brand-light text-brand",
    rule: "bg-brand",
    ring: "ring-brand/35",
    glow: "rgba(229,24,39,0.08)",
  },
];

const CYCLE = 3600;

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
    <section
      ref={root}
      className="relative overflow-hidden bg-[#FAF8F5] py-14 lg:py-20 border-y border-slate-200/60"
      aria-labelledby="flow-heading"
    >
      {/* 1. Fine Technical Line Grid (Engineering blueprint feel) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #111 1px, transparent 1px),
            linear-gradient(to bottom, #111 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* 2. Top-Right Ambient Terracotta/Warm Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-28 h-[540px] w-[540px] rounded-full opacity-45 blur-3xl [background:radial-gradient(circle_at_center,#fecdd3_0%,#fff1f2_40%,transparent_70%)]"
      />

      {/* 3. Bottom-Left Ocean/Cool Tech Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 -bottom-28 h-[480px] w-[480px] rounded-full opacity-35 blur-3xl [background:radial-gradient(circle_at_center,#e0f2fe_0%,#f0f9ff_45%,transparent_70%)]"
      />

      <div className="shell relative z-10">
        <div className="w-full" data-reveal data-reveal-dir="up" data-reveal-delay="0.1">
          <h2
            id="flow-heading"
            className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-extrabold leading-tight tracking-tight text-ink whitespace-normal sm:whitespace-nowrap"
          >
            Moulded, printed and packed on one floor.
          </h2>
        </div>

        <div
          className="relative mt-9 sm:mt-11"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {/* Travelling dashed run connecting the workflow cards */}
          <span
            aria-hidden
            className="animate-dash absolute left-8 right-8 top-[54px] hidden h-px bg-[repeating-linear-gradient(to_right,rgba(17,17,17,0.2)_0_7px,transparent_7px_14px)] lg:block"
          />

          <ol className="relative grid gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const open = index === active;

              return (
                <li
                  key={step.title}
                  data-reveal
                  data-reveal-dir="scale"
                  data-reveal-delay={(0.12 + index * 0.08).toFixed(2)}
                  className="flex"
                  onMouseEnter={() => setActive(index)}
                >
                  <div
                    className={`relative flex h-full w-full flex-col overflow-hidden rounded-[24px] bg-white p-5 sm:p-6 transition-all duration-500 ease-out border ${
                      open
                        ? `-translate-y-2 border-transparent shadow-[0_22px_44px_-16px_rgba(15,23,42,0.18)] ring-2 ${step.ring}`
                        : "translate-y-0 border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    {/* Top Accent Active Line */}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 top-0 h-[3.5px] origin-left transition-transform duration-500 ${step.rule} ${
                        open ? "scale-x-100" : "scale-x-0"
                      }`}
                    />

                    {/* Header Row: Icon + Step Counter */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-[14px] transition-all duration-500 ${
                          open ? `${step.tile} scale-105 shadow-sm` : step.tileSoft
                        }`}
                      >
                        <step.icon aria-hidden className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.9} />
                      </span>

                      <span className="font-mono text-[11px] font-bold tracking-wider text-slate-400">
                        STAGE {step.stepNum}
                      </span>
                    </div>

                    <h3 className="mt-4 sm:mt-5 font-display text-[17.5px] sm:text-[18.5px] font-bold leading-snug text-ink">
                      {step.title}
                    </h3>

                    <p
                      className={`mt-2 text-[13px] sm:text-[13.5px] leading-relaxed transition-colors duration-300 ${
                        open ? "text-slate-600 font-medium" : "text-slate-500"
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
