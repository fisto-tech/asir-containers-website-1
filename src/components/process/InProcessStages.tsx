"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Boxes, Bot, Flame, Printer, type LucideIcon } from "lucide-react";
import { reduceMotion, useScrollReveal } from "@/lib/animations";
import { inProcess, machinery } from "@/data/manufacturing";

const routes = inProcess.printing.routes;
const machines = machinery.production.rows;

type Stage = {
  title: string;
  detail: string;
  capacity: string;
  note?: string;
  image: string;
  alt: string;
  icon: LucideIcon;
  tile: string;
  tileActive: string;
  accentText: string;
  accentBar: string;
  surface: string;
  ring: string;
  glow: string;
};

const stages: Stage[] = [
  {
    title: inProcess.moulding.title,
    detail: inProcess.moulding.detail,
    capacity: machines[0].capacity,
    note: machines[0].note,
    image: "/images/facility/machinery-01.jpg",
    alt: "Injection moulding machines running in the plant",
    icon: Boxes,
    tile: "bg-violet-50 text-violet-600",
    tileActive: "bg-violet-600 text-white",
    accentText: "text-violet-600",
    accentBar: "bg-violet-600",
    surface: "bg-violet-50",
    ring: "ring-violet-600/25",
    glow: "bg-violet-500/20",
  },
  {
    title: routes[0].name,
    detail: routes[0].detail,
    capacity: machines[1].capacity,
    note: machines[1].note,
    image: "/images/facility/labelling.jpg",
    alt: "Containers moving through an in-line printing station",
    icon: Printer,
    tile: "bg-emerald-light text-emerald-accent",
    tileActive: "bg-emerald-accent text-white",
    accentText: "text-emerald-accent",
    accentBar: "bg-emerald-accent",
    surface: "bg-emerald-light",
    ring: "ring-emerald-accent/30",
    glow: "bg-emerald-accent/20",
  },
  {
    title: routes[1].name,
    detail: routes[1].detail,
    capacity: machines[2].capacity,
    note: machines[2].note,
    image: "/images/hero/hero-03.jpg",
    alt: "Heat-transfer labelled containers on the line",
    icon: Flame,
    tile: "bg-ocean-light text-ocean",
    tileActive: "bg-ocean text-white",
    accentText: "text-ocean",
    accentBar: "bg-ocean",
    surface: "bg-ocean-light",
    ring: "ring-ocean/30",
    glow: "bg-ocean/20",
  },
  {
    title: routes[2].name,
    detail: routes[2].detail,
    capacity: machines[3].capacity,
    note: machines[3].note,
    image: "/images/families/paint-pail.jpg",
    alt: "Container whose label is moulded into the wall of the pail",
    icon: Bot,
    tile: "bg-amber-light text-amber-accent",
    tileActive: "bg-amber-accent text-white",
    accentText: "text-amber-accent",
    accentBar: "bg-amber-accent",
    surface: "bg-amber-light",
    ring: "ring-amber-accent/30",
    glow: "bg-amber-accent/20",
  },
];

const CYCLE = 6000;

/**
 * In-process activities: moulding plus the three decoration routes. One plate
 * changes with the selected row, a colour glow behind it follows the selection,
 * and every row carries its own icon and working capacity.
 */
export function InProcessStages() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  useEffect(() => {
    if (paused || reduceMotion()) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % stages.length),
      CYCLE,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section ref={root} className="bg-white py-20 lg:py-28" aria-labelledby="stages-heading">
      <div className="shell">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <h2
            id="stages-heading"
            className="max-w-md font-display text-[clamp(1.8rem,3.2vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
            data-reveal="letters"
          >
            {inProcess.eyebrow}
          </h2>
          <p className="max-w-sm text-[14px] leading-relaxed text-mid" data-reveal>
            {inProcess.intro}
          </p>
        </div>

        <div
          className="mt-10 grid items-stretch gap-6 lg:grid-cols-12 lg:gap-10"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="relative lg:col-span-7">
            {/* Colour glow that follows the selected route */}
            {stages.map((stage, index) => (
              <span
                key={`glow-${stage.title}`}
                aria-hidden
                className={`pointer-events-none absolute -inset-6 rounded-[40px] blur-2xl transition-opacity duration-1000 ${
                  stage.glow
                } ${index === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}

            <div className="relative h-[300px] overflow-hidden rounded-[26px] bg-light shadow-[0_40px_80px_-55px_rgba(17,17,17,0.6)] sm:h-[400px] lg:h-full lg:min-h-[500px]">
              {stages.map((stage, index) => (
                <div
                  key={stage.image + stage.title}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    index === active ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden={index !== active}
                >
                  <Image
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className={`object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      index === active ? "scale-100" : "scale-[1.05]"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <ul className="flex h-full flex-col justify-center gap-2.5">
              {stages.map((stage, index) => {
                const open = index === active;
                const Icon = stage.icon;

                return (
                  <li key={stage.title} data-reveal data-reveal-delay={String(index * 0.07)}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      aria-pressed={open}
                      className={`group flex w-full items-start gap-4 rounded-[18px] px-4 py-4 text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-5 ${
                        open
                          ? `${stage.surface} shadow-[0_24px_46px_-38px_rgba(17,17,17,0.6)] ring-1 ${stage.ring}`
                          : "bg-white ring-1 ring-line hover:bg-light"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] transition-all duration-700 ${
                          open ? `${stage.tileActive} scale-105` : stage.tile
                        }`}
                      >
                        <Icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.8} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <span
                            className={`font-display text-[18px] font-semibold leading-snug tracking-[-0.015em] transition-colors duration-500 sm:text-[20px] ${
                              open ? "text-ink" : "text-ink/70"
                            }`}
                          >
                            {stage.title}
                          </span>
                          <span
                            className={`text-[11.5px] font-semibold uppercase tracking-[0.1em] transition-colors duration-500 ${
                              open ? stage.accentText : "text-mid/70"
                            }`}
                          >
                            {stage.capacity}
                          </span>
                        </span>

                        <span
                          className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <span className="overflow-hidden">
                            <span className="mt-1.5 block text-[13.5px] leading-relaxed text-mid">
                              {stage.detail}
                            </span>
                            {stage.note && (
                              <span className="mt-1.5 flex items-center gap-2 text-[12.5px] text-mid/85">
                                <span
                                  aria-hidden
                                  className={`h-1 w-1 shrink-0 rounded-full ${stage.accentBar}`}
                                />
                                {stage.note}
                              </span>
                            )}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
