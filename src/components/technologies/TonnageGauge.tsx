"use client";

import { useRef } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap, ScrollTrigger, useGSAP, reduceMotion, useScrollReveal } from "@/lib/animations";
import { machinery } from "@/data/manufacturing";

const MIN = 80;
const MAX = 650;
const SCALE_MAX = 700;
const pct = (value: number) => `${(value / SCALE_MAX) * 100}%`;

const ticks = Array.from({ length: 15 }, (_, index) => index * 50);
const direct = machinery.production.rows[0];
const directNote = direct?.note ?? "";

/**
 * Capability scale — the press envelope read as a measuring instrument.
 * A ruled scale runs 0–700 tonnes; the red band is the range the plant works
 * in, and the marker travels the band as the section is scrolled while the
 * readout counts with it.
 */
export function TonnageGauge() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const marker = scope.querySelector<HTMLElement>("[data-gauge-marker]");
      const band = scope.querySelector<HTMLElement>("[data-gauge-band]");
      const readout = scope.querySelector<HTMLElement>("[data-gauge-readout]");
      const track = scope.querySelector<HTMLElement>("[data-gauge-track]");
      if (!marker || !band || !readout || !track) return;

      const place = (value: number) => {
        marker.style.left = pct(value);
        readout.textContent = String(Math.round(value));
        const filled = Math.max(0, Math.min(1, (value - MIN) / (MAX - MIN)));
        band.style.transform = `scaleX(${filled})`;
      };

      if (reduceMotion()) {
        place(MAX);
        return;
      }

      place(MIN);

      const trigger = ScrollTrigger.create({
        trigger: track,
        start: "top 88%",
        end: "bottom 62%",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const eased = Math.min(1, self.progress / 0.85);
          place(MIN + (MAX - MIN) * eased);
        },
      });

      return () => trigger.kill();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-white py-20 text-ink lg:py-28"
      aria-labelledby="gauge-heading"
    >
      <div className="tech-grid-light edge-fade-y pointer-events-none absolute inset-0 opacity-50" />

      <div className="shell relative">
          <div className="flex flex-col justify-between gap-6 border-b border-ink/12 pb-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel index="02">Machinery</SectionLabel>
              <h2
                id="gauge-heading"
                className="mt-4 max-w-xl font-display text-[clamp(1.85rem,3.2vw,2.85rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-ink"
                data-reveal="letters"
              >
                Machines and the envelope they run.
              </h2>
            </div>
            <p className="max-w-sm text-[13.5px] leading-relaxed text-mid" data-reveal>
              {machinery.intro}
            </p>
          </div>

        <div className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Readout */}
          <div className="lg:col-span-5">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.26em] text-mid" data-reveal>
                {direct?.name}
              </p>

              <div className="mt-4 flex items-end gap-3" data-reveal>
                <span className="readout font-display text-[clamp(3.6rem,8vw,6.4rem)] font-semibold leading-[0.8] tracking-[-0.045em] text-ink">
                  80
                </span>
                <span aria-hidden className="mb-3 h-[3px] w-6 bg-brand sm:mb-5" />
                <span className="readout font-display text-[clamp(3.6rem,8vw,6.4rem)] font-semibold leading-[0.8] tracking-[-0.045em] text-brand">
                  650
                </span>
                <span className="mb-2 font-display text-[22px] font-semibold text-mid sm:mb-4">T</span>
              </div>

              <p className="mt-6 max-w-sm border-t border-line pt-4 text-[13.5px] leading-relaxed text-mid">
                {directNote}
              </p>
              </div>

          {/* Instrument */}
          <div className="lg:col-span-7 lg:pt-2">
            <div data-reveal>
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-mid">
                  Clamp force
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-mid">Tonnes</p>
              </div>

              <div data-gauge-track className="relative mt-4 h-[152px] select-none">
                {/* Ticks */}
                {ticks.map((tick) => {
                  const major = tick % 100 === 0;
                  return (
                    <span key={tick} className="absolute top-0 h-full" style={{ left: pct(tick) }}>
                      <span
                        aria-hidden
                        className={`absolute top-[58px] w-px ${major ? "h-4 bg-ink/35" : "h-2 bg-ink/15"}`}
                      />
                      {major && (
                        <span className="readout absolute top-[86px] -translate-x-1/2 font-mono text-[10px] text-mid/70">
                          {tick}
                        </span>
                      )}
                    </span>
                  );
                })}

                {/* Working band */}
                <span
                  aria-hidden
                  className="absolute top-[47px] h-[3px] bg-brand/12"
                  style={{ left: pct(MIN), width: pct(MAX - MIN) }}
                >
                  <span data-gauge-band className="block h-full origin-left bg-brand" />
                </span>

                {/* Marker */}
                <span
                  data-gauge-marker
                  aria-hidden
                  className="absolute top-[30px] bottom-[40px] z-10 w-px bg-ink"
                  style={{ left: pct(MIN) }}
                >
                  <span className="absolute -top-8 left-1/2 flex -translate-x-1/2 items-baseline gap-1 whitespace-nowrap bg-ink px-2 py-1 font-mono text-[10.5px] font-semibold text-white">
                    <span data-gauge-readout>80</span>
                    <span className="text-white/85">T</span>
                  </span>
                  <span className="absolute -bottom-[3px] left-1/2 h-[7px] w-[7px] -translate-x-1/2 rotate-45 bg-ink" />
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-line pt-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mid/70">
                  Envelope 80 – 650 T
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mid/70">
                  Scale 0 – 700 T
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
