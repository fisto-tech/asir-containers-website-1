"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, revealLines, parallax, reduceMotion, EASE } from "@/lib/animations";
import { machinery } from "@/data/manufacturing";

/**
 * Technologies masthead — a two-plate composition over an engineering grid.
 * The press plate wipes open, a second detail plate floats over it with its own
 * slower parallax, and the headline rises letter by letter.
 */
export function TechHero() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      /* Wait for the variable face before splitting, so line masks measure the
         real letterforms rather than the fallback. */
      const heading = scope.querySelector<HTMLElement>("[data-tech-heading]");
      let cancelled = false;
      const splitHeading = () => {
        if (cancelled || !heading) return;
        revealLines(heading, { delay: 0.35, scrollTrigger: false });
      };
      if (heading) {
        if (document.fonts?.status === "loaded") splitHeading();
        else void document.fonts?.ready.then(splitHeading);
      }

      const mainPlate = scope.querySelector<HTMLElement>("[data-tech-plate]");
      const insetPlate = scope.querySelector<HTMLElement>("[data-tech-inset]");

      if (reduceMotion()) {
        gsap.set([mainPlate, insetPlate].filter(Boolean), { clipPath: "none", autoAlpha: 1 });
      } else {
        if (mainPlate) {
          gsap.fromTo(
            mainPlate,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, delay: 0.15, ease: "expo.out" },
          );
        }
        if (insetPlate) {
          gsap.fromTo(
            insetPlate,
            { clipPath: "inset(100% 0% 0% 0%)", y: 30, autoAlpha: 0 },
            { clipPath: "inset(0% 0% 0% 0%)", y: 0, autoAlpha: 1, duration: 1.3, delay: 0.5, ease: "expo.out" },
          );
          parallax(insetPlate, 70);
        }

        gsap.from(scope.querySelectorAll("[data-tech-fade]"), {
          y: 24,
          autoAlpha: 0,
          duration: 1.1,
          delay: 0.6,
          stagger: 0.09,
          ease: EASE.out,
        });
      }

      const plateImage = scope.querySelector<HTMLElement>("[data-tech-plate-image]");
      if (plateImage && !reduceMotion()) parallax(plateImage, 40);

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
      aria-labelledby="tech-hero-title"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="tech-grid edge-fade-y absolute inset-0 opacity-70" />
        <div className="tech-glow absolute inset-0 opacity-80" />
      </div>

      <span
        aria-hidden
        className="ghost-numeral pointer-events-none absolute -bottom-16 left-2 hidden select-none font-display text-[20vw] font-semibold leading-none lg:block"
      >
        01
      </span>

      <div className="shell relative pb-12 pt-28 lg:pb-16 lg:pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-6">
            <p
              data-tech-fade
              className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white"
            >
              <span className="readout text-brand">01</span>
              Technologies
            </p>

            <h1
              id="tech-hero-title"
              data-tech-heading
              className="mt-6 max-w-[13ch] font-display text-[clamp(2.6rem,6vw,5.2rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white"
            >
              Technologies &amp; Machinery
            </h1>

            <p
              data-tech-fade
              className="mt-7 max-w-md text-[15px] leading-relaxed text-white/85"
            >
              State-of-the-art production floor equipped with microprocessor-controlled injection
              moulding presses, high-speed automated decoration lines, and closed-loop auxiliary
              systems.
            </p>

            <div data-tech-fade className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 border-b border-white/30 pb-1.5 text-[14px] font-medium text-white transition-colors duration-300 hover:border-brand hover:text-white"
              >
                Inquire capacity
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-white/60">
                {machinery.production.rows.length} production machineries · {machinery.auxiliaries.rows.length} auxiliaries
              </p>
            </div>
          </div>

          {/* Plates */}
          <div className="relative lg:col-span-6">
            <div
              data-tech-plate
              className="corner-ticks relative aspect-4/3 w-full overflow-hidden rounded-[26px] bg-[#11151c] shadow-[0_40px_90px_-45px_rgba(0,0,0,0.9)] sm:aspect-5/4 lg:aspect-auto lg:h-[600px]"
            >
              <div data-tech-plate-image className="absolute inset-[-8%]">
                <Image
                  src="/images/facility/machinery-01.jpg"
                  alt="Injection moulding machines running in the ASIR Containers plant"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080a0e] via-[#080a0e]/25 to-transparent" />

              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-4 p-6 sm:p-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/60">
                    Production floor
                  </p>
                  <p className="mt-2 font-display text-[19px] font-semibold leading-snug text-white drop-shadow-sm">
                    {machinery.production.rows[0]?.name}
                  </p>
                </div>
                <span className="readout border border-white/25 bg-[#080a0e]/40 px-2.5 py-1 text-[11px] text-white/85 backdrop-blur-sm">
                  80–650 T
                </span>
              </div>
            </div>

            {/* Floating detail plate */}
            <div
              data-tech-inset
              className="absolute -bottom-8 -left-4 hidden w-[38%] overflow-hidden rounded-[18px] border-[6px] border-[#080a0e] sm:block lg:-left-10"
            >
              <div className="relative aspect-square w-full bg-[#11151c]">
                <Image
                  src="/images/hero/hero-03.jpg"
                  alt="Close detail of a moulding machine under operation"
                  fill
                  sizes="220px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[#080a0e]/20" />
                <p className="absolute bottom-2.5 left-3 font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/85">
                  Mould detail
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Spec strip */}
        <dl
          data-tech-fade
          className="mt-16 grid gap-px border-t border-white/12 pt-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {machinery.production.rows.map((row, index) => (
            <div
              key={row.name}
              className="group flex items-baseline justify-between gap-4 border-white/8 py-3 sm:border-l sm:pl-5 sm:first:border-l-0 sm:first:pl-0 lg:py-1"
            >
              <dt className="flex items-baseline gap-2.5 text-[12.5px] text-white/78 transition-colors group-hover:text-white">
                <span className="readout text-[10px] text-brand">0{index + 1}</span>
                {row.name}
              </dt>
              <dd className="readout text-[13px] font-semibold text-white">{row.capacity}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
