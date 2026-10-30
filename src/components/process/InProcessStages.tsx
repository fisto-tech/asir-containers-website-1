"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { reduceMotion, useScrollReveal } from "@/lib/animations";
import { inProcess } from "@/data/manufacturing";
import { capacityEnvelope, processStages } from "@/data/process";

const CYCLE = 6500;

/**
 * In-process activities as a stage switcher: one large plate on the left, the
 * four stages on the right. The open stage carries its own detail — bullets for
 * moulding, client marks for each printing route — and the group advances on
 * its own so the plate always reads as a running line.
 */
export function InProcessStages() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  useEffect(() => {
    if (paused || reduceMotion()) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % processStages.length),
      CYCLE,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  const current = processStages[active];

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-[#f6f7f9] py-20 text-ink lg:py-28"
      aria-labelledby="inprocess-heading"
    >
      <div className="tech-grid-light edge-fade-y pointer-events-none absolute inset-0 opacity-70" />

      <div className="shell relative">
        {/* Section head */}
          <div className="flex flex-col justify-between gap-6 border-b border-ink/12 pb-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel index="03">{inProcess.eyebrow}</SectionLabel>
              <h2
                id="inprocess-heading"
                className="mt-4 max-w-2xl font-display text-[clamp(1.85rem,3.4vw,3.1rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink"
                data-reveal="letters"
              >
                Moulded, printed and packed on one floor.
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-mid" data-reveal>
              {inProcess.intro}
            </p>
          </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Media plate */}
          <div className="lg:col-span-7" data-reveal-mask>
            <div
              className="corner-ticks group relative aspect-4/3 w-full overflow-hidden rounded-[24px] bg-charcoal shadow-[0_30px_80px_-40px_rgba(8,10,14,0.55)] sm:aspect-16/11"
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
            >
              {processStages.map((stage, index) => (
                <div
                  key={stage.id}
                  aria-hidden={index !== active}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    index === active ? "opacity-100" : "scale-105 opacity-0"
                  }`}
                >
                  <Image
                    src={stage.image}
                    alt={index === active ? stage.imageAlt : ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className={`object-cover ${index === active ? "ambient-media" : ""}`}
                  />
                </div>
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e] via-[#080a0e]/25 to-transparent" />

              {/* Top meta */}
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-white/70">
                  {current.kind}
                </p>
                <p className="readout text-[11px] font-semibold text-white/78">
                  {String(active + 1).padStart(2, "0")}
                  <span className="text-white/85"> / {String(processStages.length).padStart(2, "0")}</span>
                </p>
              </div>

              {/* Bottom caption */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
                <div>
                  <p className="readout text-[11px] font-semibold text-brand">{current.code}</p>
                  <p className="mt-1 font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-semibold leading-tight text-white">
                    {current.name}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="hidden h-10 w-10 shrink-0 items-center justify-center border border-white/25 text-[10px] text-white/70 sm:flex"
                >
                  {current.code}
                </span>
              </div>

              {/* Progress rule */}
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20">
                <span
                  key={`stage-bar-${active}`}
                  className="ambient-progress block h-full bg-brand"
                  style={{ ["--ambient-duration" as string]: `${CYCLE}ms` }}
                />
              </span>
            </div>

            <p className="mt-3 text-[11.5px] leading-relaxed text-mid/80">
              Representative photography — plant imagery to be supplied.
            </p>
          </div>

          {/* Stage rail */}
          <div className="lg:col-span-5">
            <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.26em] text-mid">
                In-process activities
              </p>
              <p className="readout text-[11px] text-mid">
                {String(processStages.length).padStart(2, "0")} stages
              </p>
            </div>

            <ol
              className="mt-1"
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
            >
              {processStages.map((stage, index) => {
                const open = index === active;

                return (
                  <li key={stage.id} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onPointerEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      aria-pressed={open}
                      data-open={open}
                      className="tech-row group flex w-full items-start gap-4 py-5 pl-5 text-left"
                    >
                      <span
                        className={`readout pt-0.5 text-[11.5px] font-semibold transition-colors duration-400 ${
                          open ? "text-brand" : "text-mid/55"
                        }`}
                      >
                        {stage.code}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-3">
                          <span
                            className={`font-display text-[17px] font-semibold leading-snug transition-colors duration-400 ${
                              open ? "text-ink" : "text-ink/65 group-hover:text-ink"
                            }`}
                          >
                            {stage.name}
                          </span>
                          <span
                            aria-hidden
                            className={`text-[15px] leading-none transition-all duration-500 ${
                              open
                                ? "translate-x-0 text-brand opacity-100"
                                : "-translate-x-2 text-mid/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                            }`}
                          >
                            →
                          </span>
                        </span>

                        <span
                          className={`grid transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            open ? "mt-2.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <span className="overflow-hidden">
                            <span className="block text-[13.5px] leading-relaxed text-mid">
                              {stage.detail}
                            </span>

                            {stage.bullets && stage.bullets.length > 0 && (
                              <span className="mt-3.5 grid gap-1.5 sm:grid-cols-2">
                                {stage.bullets.map((bullet) => (
                                  <span
                                    key={bullet}
                                    className="flex items-start gap-1.5 text-[12.5px] leading-snug text-ink/80"
                                  >
                                    <Check
                                      aria-hidden
                                      className="mt-[3px] h-3 w-3 shrink-0 text-brand"
                                      strokeWidth={2.4}
                                    />
                                    {bullet}
                                  </span>
                                ))}
                              </span>
                            )}

                            {stage.logos.length > 0 && (
                              <span className="mt-3.5 block">
                                <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-mid/80">
                                  Client brands
                                </span>
                                <span className="mt-2 grid grid-cols-2 gap-2">
                                  {stage.logos.map((client, logoIndex) => (
                                    <span
                                      key={client.name}
                                      className="flex h-11 items-center justify-center border border-line bg-white px-2.5 transition-colors duration-300 hover:border-brand/40"
                                      style={{
                                        transitionDelay: open ? `${logoIndex * 70}ms` : "0ms",
                                      }}
                                    >
                                      <Image
                                        src={client.logo}
                                        alt={client.alt}
                                        width={120}
                                        height={32}
                                        className="h-6 w-auto max-w-[92px] object-contain opacity-80"
                                      />
                                    </span>
                                  ))}
                                </span>
                              </span>
                            )}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-ink/15 pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mid">
                Capacity envelope
              </p>
              <p className="text-right text-[12.5px] font-medium text-ink">{capacityEnvelope}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
