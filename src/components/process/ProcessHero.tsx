"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, revealLines, parallax, reduceMotion, EASE } from "@/lib/animations";
import { inspectionStages, inProcess } from "@/data/manufacturing";

/**
 * Process masthead — a drawing-office hero.
 *
 * The factory plate sits behind a measured grid, the headline rises letter by
 * letter, and the three inspection gates are issued as a spec strip along the
 * bottom rule. Everything is derived from `src/data/manufacturing.ts`.
 */
export function ProcessHero() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      /* Wait for the variable face before splitting, so line masks measure the
         real letterforms rather than the fallback. */
      const heading = scope.querySelector<HTMLElement>("[data-hero-heading]");
      let cancelled = false;
      const splitHeading = () => {
        if (cancelled || !heading) return;
        revealLines(heading, { delay: 0.35, scrollTrigger: false });
      };
      if (heading) {
        if (document.fonts?.status === "loaded") splitHeading();
        else void document.fonts?.ready.then(splitHeading);
      }

      const plate = scope.querySelector<HTMLElement>("[data-hero-plate]");
      if (plate) {
        if (!reduceMotion()) {
          gsap.fromTo(
            plate,
            { scale: 1.16, autoAlpha: 0.35 },
            { scale: 1, autoAlpha: 1, duration: 2.4, ease: "expo.out" },
          );
          parallax(plate, 58);
        } else {
          gsap.set(plate, { autoAlpha: 1 });
        }
      }

      if (reduceMotion()) return () => {
        cancelled = true;
      };

      gsap.from(scope.querySelectorAll("[data-hero-fade]"), {
        y: 26,
        autoAlpha: 0,
        duration: 1.15,
        delay: 0.7,
        stagger: 0.1,
        ease: EASE.out,
      });

      gsap.fromTo(
        scope.querySelectorAll("[data-hero-rule]"),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.7,
          delay: 0.35,
          stagger: 0.14,
          ease: "expo.out",
          transformOrigin: "left center",
        },
      );

      return () => {
        cancelled = true;
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-[#080a0e] text-white"
      aria-labelledby="process-hero-title"
    >
      {/* Photographic ground */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden" aria-hidden>
        <div data-hero-plate className="absolute inset-[-9%]">
          <Image
            src="/images/hero/hero-01.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#080a0e]/72 via-[#080a0e]/58 to-[#080a0e]" />
        <div className="tech-grid edge-fade-y absolute inset-0 opacity-70" />
        <div className="tech-glow absolute inset-0 opacity-90" />
      </div>

      <span
        aria-hidden
        className="ghost-numeral pointer-events-none absolute right-6 top-[22vh] hidden select-none font-display text-[19vw] font-semibold leading-none lg:block"
      >
        01
      </span>

      <div className="shell relative flex min-h-[100svh] flex-col justify-between pb-8 pt-28 lg:pb-10 lg:pt-32">
        {/* Meta rule */}
        <div className="flex items-end justify-between gap-6">
          <p
            data-hero-fade
            className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white"
          >
            <span className="readout text-brand">01</span>
            Process
          </p>
          <p
            data-hero-fade
            className="hidden text-right font-mono text-[10.5px] uppercase tracking-[0.28em] text-white/60 sm:block"
          >
            Moulding · Printing · Inspection
          </p>
        </div>
        <span data-hero-rule aria-hidden className="mt-4 block h-px w-full bg-white/20" />

        {/* Title block */}
        <div className="relative mt-12 lg:mt-16">
          <h1
            id="process-hero-title"
            data-hero-heading
            className="max-w-[15ch] font-display text-[clamp(2.6rem,6.4vw,5.75rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white"
          >
            Manufacturing &amp; Process Flow
          </h1>

          <div className="mt-9 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <p
              data-hero-fade
              className="max-w-md text-[15px] leading-relaxed text-white/85 lg:col-span-5"
            >
              Fully integrated in-house manufacturing process: precision injection moulding
              cycles, versatile multi-color container printing, and rigorous multi-stage quality
              control under one roof.
            </p>

            <div className="lg:col-span-5 lg:col-start-8">
              <p
                data-hero-fade
                className="text-[10.5px] font-semibold uppercase tracking-[0.26em] text-white/60"
              >
                {inProcess.eyebrow}
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
                {[inProcess.moulding.title, ...inProcess.printing.routes.map((route) => route.name)].map(
                  (label, index) => (
                    <li
                      key={label}
                      data-hero-fade
                      className="group flex items-baseline gap-2 text-[13px] text-white/85 transition-colors duration-300 hover:text-white"
                    >
                      <span className="readout text-[10px] text-brand">0{index + 1}</span>
                      {label}
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Inspection gate strip */}
        <div className="mt-14 lg:mt-20">
          <span data-hero-rule aria-hidden className="block h-px w-full bg-white/20" />
          <ol className="grid gap-px sm:grid-cols-3">
            {inspectionStages.map((stage) => (
              <li
                key={stage.index}
                data-hero-fade
                className="group relative border-t border-white/10 py-4 sm:border-t-0 sm:border-l sm:py-5 sm:pl-6 sm:first:border-l-0 sm:first:pl-0"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-0 bg-brand transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full sm:first:left-0"
                />
                <span className="readout text-[11px] font-semibold text-brand">{stage.index}</span>
                <p className="mt-1.5 font-display text-[16px] font-medium leading-snug text-white">
                  {stage.title}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 right-5 hidden h-24 w-px bg-white/15 lg:block"
      >
        <span className="cue-run block h-full w-full" />
      </div>
    </section>
  );
}
