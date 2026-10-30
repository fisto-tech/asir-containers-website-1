"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, reduceMotion, revealLines } from "@/lib/animations";
import { inspectionStages, inProcess, qualityStatement } from "@/data/manufacturing";

/**
 * The plant read as one continuous run: incoming gate, moulding cell, printing
 * line, finished-goods gate. The red rule draws itself as the band is scrolled
 * and each stage lights as the draw reaches it.
 */
const flow = [
  {
    label: "Inspection",
    title: inspectionStages[0].title,
    body: inspectionStages[0].detail,
  },
  {
    label: "Moulding",
    title: inProcess.moulding.title,
    body: inProcess.moulding.detail,
  },
  {
    label: "Printing",
    title: inProcess.printing.title,
    body: inProcess.printing.detail,
  },
  {
    label: "Inspection",
    title: inspectionStages[2].title,
    body: inspectionStages[2].detail,
  },
];

export function FlowRail() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const heading = scope.querySelector<HTMLElement>("[data-flow-heading]");
      if (heading) revealLines(heading);

      const rail = scope.querySelector<HTMLElement>("[data-flow-rail]");
      const fill = scope.querySelector<HTMLElement>("[data-flow-fill]");
      const nodes = gsap.utils.toArray<HTMLElement>("[data-flow-node]", scope);
      if (!rail || !fill || !nodes.length) return;

      if (reduceMotion()) {
        gsap.set(fill, { scaleX: 1, scaleY: 1 });
        gsap.set(nodes, { opacity: 1, y: 0, x: 0 });
        return;
      }

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      gsap.set(fill, isDesktop ? { scaleX: 0 } : { scaleY: 0 });
      gsap.set(nodes, { opacity: 0.18, y: isDesktop ? 26 : 0, x: isDesktop ? 0 : 18 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rail,
          start: isDesktop ? "top 78%" : "top 82%",
          end: isDesktop ? "bottom 68%" : "bottom 70%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(fill, isDesktop ? { scaleX: 1, ease: "none", duration: 1 } : { scaleY: 1, ease: "none", duration: 1 }, 0)
        .to(
          nodes,
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.42,
            stagger: 0.22,
            ease: "none",
          },
          0,
        );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-[#080a0e] py-20 text-white lg:py-28"
      aria-labelledby="flow-heading"
    >
      <div className="tech-grid edge-fade-y pointer-events-none absolute inset-0 opacity-60" />
      <div className="tech-glow pointer-events-none absolute inset-0 opacity-60" />
      <span
        aria-hidden
        className="ghost-numeral pointer-events-none absolute -bottom-10 right-2 hidden select-none font-display text-[18vw] font-semibold leading-none lg:block"
      >
        04
      </span>

      <div className="shell relative">
        <div className="flex flex-col justify-between gap-6 border-b border-white/12 pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              <span className="readout text-brand">04</span>
              Process flow
            </p>
            <h2
              id="flow-heading"
              data-flow-heading
              className="mt-4 max-w-2xl font-display text-[clamp(1.6rem,2.7vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white"
            >
              {qualityStatement.note}
            </h2>
          </div>
        </div>

        {/* Rail */}
        <div data-flow-rail className="relative mt-12 lg:mt-16">
          {/* Track */}
          <div
            aria-hidden
            className="absolute left-0 top-0 h-full w-px bg-white/12 lg:h-px lg:w-full"
          >
            <div
              data-flow-fill
              className="h-full w-full origin-top bg-gradient-to-b from-brand to-brand/40 lg:origin-left lg:bg-gradient-to-r"
            />
          </div>

          <ol className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-8">
            {flow.map((stage, index) => (
              <li
                key={`${stage.label}-${stage.title}`}
                data-flow-node
                className="group relative pl-8 lg:pl-0 lg:pt-8"
              >
                <span
                  aria-hidden
                  className="absolute left-[-3px] top-[6px] h-[7px] w-[7px] rounded-full bg-white/30 ring-4 ring-[#080a0e] transition-colors duration-500 group-hover:bg-brand lg:left-[-3px] lg:top-[-3px]"
                />
                <div>
                  <p className="flex items-baseline gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/65">
                    <span className="readout text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {stage.label}
                  </p>
                  <h3 className="mt-2.5 font-display text-[20px] font-semibold leading-snug text-white lg:text-[22px]">
                    {stage.title}
                  </h3>
                  <p className="mt-2 max-w-[30ch] text-[13px] leading-relaxed text-white/85">
                    {stage.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Printing routes read-out */}
        <div className="mt-14 grid gap-6 border-t border-white/12 pt-6 sm:grid-cols-3">
          {inProcess.printing.routes.map((route) => (
            <div key={route.id} className="group flex items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-3">
                <span className="readout text-[10.5px] font-semibold text-brand">{route.code}</span>
                <span className="text-[13.5px] font-medium text-white/85 transition-colors group-hover:text-white">
                  {route.name}
                </span>
              </div>
              <span className="h-px flex-1 bg-white/12 transition-colors duration-500 group-hover:bg-brand/60" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
