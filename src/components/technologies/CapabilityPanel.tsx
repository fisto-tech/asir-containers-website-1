"use client";

import { useRef } from "react";
import { Counter } from "@/components/ui/Counter";
import { gsap, ScrollTrigger, useGSAP, reduceMotion, useScrollReveal } from "@/lib/animations";
import { machinery } from "@/data/manufacturing";

const direct = machinery.production.rows[0];

/**
 * Capability panel — the press envelope set as a big number over a colour bar
 * that fills as the panel comes into view. Soft tinted ground, no instruments.
 */
export function CapabilityPanel() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const bar = scope.querySelector<HTMLElement>("[data-cap-bar]");
      if (!bar) return;

      if (reduceMotion()) {
        gsap.set(bar, { width: "100%" });
        return;
      }

      gsap.set(bar, { width: "0%" });
      const trigger = ScrollTrigger.create({
        trigger: bar,
        start: "top 92%",
        end: "top 55%",
        scrub: 0.6,
        onUpdate: (self) => {
          bar.style.width = `${Math.round(self.progress * 100)}%`;
        },
      });

      return () => trigger.kill();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-white py-16 lg:py-24" aria-labelledby="capability-heading">
      <div className="shell">
        <div className="relative overflow-hidden rounded-[30px] bg-ocean-light px-7 py-10 sm:px-12 lg:px-14 lg:py-14">
          <span
            aria-hidden
            className="drift pointer-events-none absolute -right-16 -top-20 h-[280px] w-[280px] rounded-full bg-ocean/10 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-5">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ocean" data-reveal>
                Machinery
              </p>

              <h2 id="capability-heading" className="sr-only">
                {direct?.name ?? machinery.production.title}
              </h2>

              <p className="mt-4 flex flex-wrap items-baseline gap-x-3" data-reveal>
                <span className="font-display text-[clamp(2.9rem,5.4vw,4.4rem)] font-semibold leading-none tracking-[-0.035em] text-ink">
                  80
                </span>
                <span aria-hidden className="h-[3px] w-7 rounded-full bg-brand" />
                <span className="font-display text-[clamp(2.9rem,5.4vw,4.4rem)] font-semibold leading-none tracking-[-0.035em] text-brand">
                  <Counter value={650} />
                </span>
                <span className="font-display text-[22px] font-semibold text-mid">T</span>
              </p>

              <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-mid" data-reveal>
                {direct?.note}
              </p>
            </div>

            <div className="lg:col-span-7">
              <div
                className="relative h-3 w-full overflow-hidden rounded-full bg-white"
                data-reveal
              >
                <div
                  data-cap-bar
                  className="h-full rounded-full bg-gradient-to-r from-ocean to-brand"
                  style={{ width: "0%" }}
                />
                <span
                  aria-hidden
                  className="ambient-sheen pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                />
              </div>
              <div className="mt-2.5 flex items-center justify-between text-[12.5px] text-mid">
                <span>80 T</span>
                <span>650 T</span>
              </div>

              <p className="mt-7 max-w-xl text-[14px] leading-relaxed text-mid" data-reveal>
                {machinery.intro}
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
