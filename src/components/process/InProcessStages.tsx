"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { reduceMotion, useScrollReveal } from "@/lib/animations";
import { inProcess } from "@/data/manufacturing";

const routes = inProcess.printing.routes;

type Stage = {
  title: string;
  detail: string;
  image: string;
  alt: string;
  accentText: string;
  accentBar: string;
  surface: string;
};

const stages: Stage[] = [
  {
    title: routes[0].name,
    detail: routes[0].detail,
    image: "/images/facility/labelling.jpg",
    alt: "Containers moving through an in-line printing station",
    accentText: "text-emerald-accent",
    accentBar: "bg-emerald-accent",
    surface: "bg-emerald-light",
  },
  {
    title: routes[1].name,
    detail: routes[1].detail,
    image: "/images/hero/hero-03.jpg",
    alt: "Heat-transfer labelled containers on the line",
    accentText: "text-ocean",
    accentBar: "bg-ocean",
    surface: "bg-ocean-light",
  },
  {
    title: routes[2].name,
    detail: routes[2].detail,
    image: "/images/families/paint-pail.jpg",
    alt: "Container whose label is moulded into the wall of the pail",
    accentText: "text-amber-accent",
    accentBar: "bg-amber-accent",
    surface: "bg-amber-light",
  },
];

const CYCLE = 6500;

/**
 * In-process activities. One large plate changes with the selected route; the
 * chosen route is filled with its own colour so the eye lands on it instantly.
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
        <div className="max-w-2xl">
          <h2
            id="stages-heading"
            className="font-display text-[clamp(1.8rem,3.2vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink"
            data-reveal="letters"
          >
            {inProcess.eyebrow}
          </h2>
        </div>

        <div
          className="mt-10 grid items-stretch gap-6 lg:grid-cols-12 lg:gap-10"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="lg:col-span-7">
            <div className="relative h-[300px] overflow-hidden rounded-[26px] bg-light shadow-[0_40px_80px_-55px_rgba(17,17,17,0.6)] sm:h-[400px] lg:h-full lg:min-h-[460px]">
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
            <ul className="flex h-full flex-col justify-center gap-3">
              {stages.map((stage, index) => {
                const open = index === active;

                return (
                  <li key={stage.title} data-reveal data-reveal-delay={String(index * 0.08)}>
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      aria-pressed={open}
                      className={`group flex w-full items-start gap-4 rounded-[20px] px-5 py-5 text-left transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                        open
                          ? `${stage.surface} shadow-[0_24px_46px_-38px_rgba(17,17,17,0.6)]`
                          : "bg-transparent hover:bg-light"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`mt-1 w-[3px] shrink-0 rounded-full transition-all duration-700 ${stage.accentBar} ${
                          open ? "h-9" : "h-4 opacity-40"
                        }`}
                      />
                      <span className="min-w-0 flex-1">
                        <span
                          className={`block font-display text-[20px] font-semibold leading-snug tracking-[-0.015em] transition-colors duration-500 sm:text-[22px] ${
                            open ? "text-ink" : "text-ink/60"
                          }`}
                        >
                          {stage.title}
                        </span>

                        <span
                          className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <span className="overflow-hidden">
                            <span className="mt-2 block text-[14px] leading-relaxed text-mid">
                              {stage.detail}
                            </span>
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
