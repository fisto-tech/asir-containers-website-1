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
    glow: "bg-violet-500/5",
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
    glow: "bg-emerald-accent/5",
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
    glow: "bg-ocean/5",
  },
  {
    title: routes[2].name,
    detail: routes[2].detail,
    capacity: machines[3].capacity,
    note: machines[3].note,
    image: "/images/products/detail/detail-paint-01.jpg",
    alt: "In-mould labelled containers in inspection",
    icon: Bot,
    tile: "bg-amber-light text-amber-accent",
    tileActive: "bg-amber-accent text-white",
    accentText: "text-amber-accent",
    accentBar: "bg-amber-accent",
    surface: "bg-amber-light",
    ring: "ring-amber-accent/30",
    glow: "bg-amber-accent/5",
  },
];

const CYCLE = 4200;

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
    <section
      ref={root}
      className="relative overflow-hidden bg-slate-50/70 py-12 lg:py-16 border-b border-slate-200/60"
      aria-labelledby="stages-heading"
    >
      {/* Background Graphic Accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -top-20 h-[520px] w-[520px] rounded-full border-[36px] border-[#0284c7]/[0.035] blur-[1px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-10 -bottom-24 h-[440px] w-[440px] rounded-full bg-gradient-to-tl from-[#e51827]/[0.05] via-[#7c3aed]/[0.03] to-transparent blur-3xl"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute right-16 top-12 h-36 w-36 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#111 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="shell relative z-10">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
            <h2
              id="stages-heading"
              className="font-display text-[clamp(1.9rem,3.2vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-ink"
            >
              {inProcess.eyebrow}
            </h2>
          </div>
          <div data-reveal data-reveal-dir="right" data-reveal-delay="0.15">
            <p className="max-w-md text-[14px] sm:text-[14.5px] leading-relaxed text-slate-600">
              {inProcess.intro}
            </p>
          </div>
        </div>

        <div
          className="mt-8 grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Left Column: Machinery Photo Carousel with Scale Reveal */}
          <div className="relative lg:col-span-7">
            {stages.map((stage, index) => (
              <span
                key={`glow-${stage.title}`}
                aria-hidden
                className={`pointer-events-none absolute -inset-4 rounded-[36px] blur-2xl transition-opacity duration-1000 ${
                  stage.glow
                } ${index === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}

            <div
              data-reveal
              data-reveal-dir="scale"
              data-reveal-delay="0.2"
              className="relative h-[280px] overflow-hidden rounded-[26px] bg-slate-900 border border-slate-200/90 shadow-sm sm:h-[340px] lg:h-full lg:min-h-[420px]"
            >
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
                    className="object-cover object-center transition-transform duration-700"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Stage Cards with Staggered Directional Reveal */}
          <div className="flex flex-col gap-3 lg:col-span-5">
            {stages.map((stage, index) => {
              const open = index === active;

              return (
                <div
                  key={stage.title}
                  data-reveal
                  data-reveal-dir="right"
                  data-reveal-delay={(0.2 + index * 0.08).toFixed(2)}
                  className="w-full"
                >
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className={`group relative flex w-full flex-col text-left overflow-hidden rounded-[20px] p-4.5 sm:p-5 transition-all duration-300 border ${
                      open
                        ? `bg-white border-transparent shadow-[0_16px_36px_-12px_rgba(15,23,42,0.14)] ring-2 ${stage.ring}`
                        : "bg-white/90 border-slate-200/80 hover:border-slate-300 hover:bg-white hover:shadow-xs"
                    }`}
                  >
                    {/* Left edge active indicator bar */}
                    <span
                      aria-hidden
                      className={`absolute inset-y-0 left-0 w-[3.5px] origin-top transition-transform duration-300 ${
                        stage.accentBar
                      } ${open ? "scale-y-100" : "scale-y-0"}`}
                    />

                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] transition-all duration-300 ${
                            open ? `${stage.tileActive} scale-105 shadow-xs` : stage.tile
                          }`}
                        >
                          <stage.icon aria-hidden className="h-5 w-5" strokeWidth={1.9} />
                        </span>

                        <h3 className="font-display text-[16px] sm:text-[17px] font-bold text-ink leading-tight">
                          {stage.title}
                        </h3>
                      </div>

                      <span
                        className={`font-mono text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md transition-colors ${
                          open ? "bg-slate-100 text-slate-800" : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      >
                        {stage.capacity}
                      </span>
                    </div>

                    {open && (
                      <div className="mt-2.5 pl-[52px]">
                        <p className="text-[13px] leading-relaxed text-slate-600 font-normal">
                          {stage.detail}
                        </p>
                        {stage.note && (
                          <p className="mt-1 text-[11.5px] font-medium text-slate-400">
                            • {stage.note}
                          </p>
                        )}
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
