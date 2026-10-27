"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedIcon, type IconMotion, type IconName } from "@/components/ui/AnimatedIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap, ScrollTrigger, useGSAP, revealLines, reduceMotion } from "@/lib/animations";
import { advantages } from "@/data/home";

const iconMap: Record<string, IconName> = {
  codes: "codes",
  finish: "finish",
  lock: "lock",
  scale: "scale",
  shapes: "shapes",
  palette: "palette",
};

const motionMap: Record<string, IconMotion> = {
  codes: "pulse",
  finish: "swing",
  lock: "swing",
  scale: "float",
  shapes: "spin-slow",
  palette: "float",
};

/**
 * Features & advantages — a numbered tab rail on the left that swaps a large
 * panel on the right. The open panel carries an oversized icon in a red disc,
 * the benefit as display type and the detail underneath, with the six entries
 * listed as a colour-washed rail so the whole block reads as one instrument.
 */
export function AdvantagesSection() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const heading = root.current?.querySelector<HTMLElement>("[data-adv-heading]");
      if (heading) revealLines(heading);
      if (reduceMotion()) return;

      const rows = gsap.utils.toArray<HTMLElement>("[data-adv-row]");
      gsap.set(rows, { opacity: 0, x: -22 });
      const play = () =>
        gsap.to(rows, { opacity: 1, x: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", overwrite: "auto" });

      ScrollTrigger.create({
        trigger: "[data-adv-list]",
        start: "top 85%",
        end: "top 25%",
        invalidateOnRefresh: true,
        onEnter: play,
        onEnterBack: play,
        onLeaveBack: () => gsap.to(rows, { opacity: 0, x: -22, duration: 0.4, ease: "power2.in", overwrite: "auto" }),
      });
    },
    { scope: root },
  );

  /* Each tab change re-plays the panel content. */
  useGSAP(
    () => {
      if (reduceMotion() || !panel.current) return;
      const items = panel.current.querySelectorAll("[data-panel-item]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power3.out", overwrite: "auto" },
      );
    },
    { scope: panel, dependencies: [active] },
  );

  /* Slow autoplay so the group reads as live; any pointer or focus input stops it. */
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || reduceMotion()) return;
    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % advantages.length);
    }, 6200);
    return () => window.clearInterval(id);
  }, [paused]);

  const current = advantages[active];

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-soft py-20 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index="04">Features &amp; advantages</SectionLabel>
            <h2 data-adv-heading className="display-lg sheen-ink mt-5 max-w-xl text-ink">
              Practical detail, pack by pack.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-mid">
            Six things that decide whether a pail works on your line — pick one.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Tab rail */}
          <ul data-adv-list className="lg:col-span-5">
            {advantages.map((item, index) => {
              const isActive = index === active;
              return (
                <li key={item.title} data-adv-row className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    aria-pressed={isActive}
                    className={`group flex w-full items-center gap-4 py-4 text-left transition-all duration-300 ${
                      isActive ? "pl-3" : "pl-0 hover:pl-2"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-500 ${
                        isActive ? "scale-150 bg-brand" : "bg-mid/40 group-hover:bg-brand"
                      }`}
                    />
                    <span
                      className={`flex-1 font-display text-[19px] font-semibold transition-colors duration-300 ${
                        isActive ? "text-ink" : "text-mid group-hover:text-ink"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`tabular text-[12px] font-semibold transition-colors duration-300 ${
                        isActive ? "text-brand" : "text-mid"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                </li>
              );
            })}

            <li data-adv-row className="pt-6">
              <Link
                href="/products#range"
                className="group inline-flex items-center gap-2 text-[15px] font-medium text-ink transition-colors hover:text-brand"
              >
                Filter products by what you need
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          </ul>

          {/* Panel */}
          <div ref={panel} className="lg:col-span-7">
            <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[24px] bg-white p-8 lg:p-10">
              <div className="relative">
                <span
                  data-panel-item
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-brand"
                >
                  <AnimatedIcon
                    name={iconMap[current.icon] ?? "pack"}
                    motion={motionMap[current.icon] ?? "float"}
                    className="h-8 w-8 text-brand"
                  />
                </span>

                <p
                  data-panel-item
                  className="mt-7 font-display text-[26px] font-semibold leading-tight text-ink lg:text-[32px]"
                >
                  {current.title}
                </p>

                <p data-panel-item className="mt-4 max-w-md text-[16px] leading-relaxed text-mid">
                  {current.body}
                </p>
              </div>

              <div data-panel-item className="relative mt-8 flex items-center gap-3">
                <span aria-hidden className="h-px flex-1 bg-line" />
                <span className="text-[12px] text-mid tabular">
                  {String(active + 1).padStart(2, "0")} / {String(advantages.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
