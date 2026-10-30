"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { reduceMotion, useScrollReveal } from "@/lib/animations";
import { inProcess } from "@/data/manufacturing";
import { capacityEnvelope, processStages } from "@/data/process";

const CYCLE = 6500;

const dots = ["bg-brand", "bg-ocean", "bg-amber-accent", "bg-emerald-accent"];

/**
 * Moulding and the three printing routes, shown as one photograph beside a
 * plain list. The open stage reveals its detail and, where it has them, its
 * client marks. Colour comes from the dot beside each stage name.
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

  return (
    <section
      ref={root}
      className="bg-white py-20 lg:py-28"
      aria-labelledby="inprocess-heading"
    >
      <div className="shell">
        <div className="max-w-2xl">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ocean">
            {inProcess.eyebrow}
          </p>
          <h2
            id="inprocess-heading"
            className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.85rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink"
            data-reveal="letters"
          >
            Moulded, printed and packed on one floor.
          </h2>
          <p className="mt-4 text-[14.5px] leading-relaxed text-mid" data-reveal>
            {inProcess.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Photograph */}
          <div className="lg:col-span-7" data-reveal-mask>
            <div
              className="group relative aspect-4/3 w-full overflow-hidden rounded-[26px] bg-white shadow-[0_30px_60px_-45px_rgba(17,17,17,0.45)] sm:aspect-16/11"
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
            >
              {processStages.map((stage, index) => (
                <div
                  key={stage.id}
                  aria-hidden={index !== active}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    index === active ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={stage.image}
                    alt={index === active ? stage.imageAlt : ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-mid/80">
              Representative photography — plant imagery to be supplied.
            </p>
          </div>

          {/* Stage list */}
          <div className="lg:col-span-5">
            <ul>
              {processStages.map((stage, index) => {
                const open = index === active;

                return (
                  <li
                    key={stage.id}
                    className="border-b border-ink/10 first:border-t"
                  >
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onPointerEnter={() => {
                        setActive(index);
                        setPaused(true);
                      }}
                      onPointerLeave={() => setPaused(false)}
                      onFocus={() => setActive(index)}
                      aria-pressed={open}
                      className="w-full py-5 text-left"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300 ${
                            dots[index] ?? dots[0]
                          } ${open ? "scale-100" : "scale-75 opacity-50"}`}
                        />
                        <span
                          className={`font-display text-[17.5px] font-semibold transition-colors duration-300 ${
                            open ? "text-ink" : "text-ink/60"
                          }`}
                        >
                          {stage.name}
                        </span>
                      </span>

                      <span
                        className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          open ? "mt-2.5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <span className="overflow-hidden">
                          <span className="block pl-[22px] text-[13.5px] leading-relaxed text-mid">
                            {stage.detail}
                          </span>

                          {stage.bullets && stage.bullets.length > 0 && (
                            <span className="mt-3 grid gap-1.5 pl-[22px] sm:grid-cols-2">
                              {stage.bullets.map((bullet) => (
                                <span
                                  key={bullet}
                                  className="flex items-start gap-1.5 text-[12.5px] leading-snug text-ink/75"
                                >
                                  <Check
                                    aria-hidden
                                    className="mt-[3px] h-3 w-3 shrink-0 text-brand"
                                    strokeWidth={2.6}
                                  />
                                  {bullet}
                                </span>
                              ))}
                            </span>
                          )}

                          {stage.logos.length > 0 && (
                            <span className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 pl-[22px]">
                              {stage.logos.map((client) => (
                                <Image
                                  key={client.name}
                                  src={client.logo}
                                  alt={client.alt}
                                  width={130}
                                  height={34}
                                  className="h-6 w-auto max-w-[104px] object-contain opacity-75 transition-opacity duration-300 hover:opacity-100"
                                />
                              ))}
                            </span>
                          )}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 text-[13px] leading-relaxed text-mid">
              <span className="font-medium text-ink">Capacity envelope:</span> {capacityEnvelope}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
