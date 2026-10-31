"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Cog, Crosshair } from "lucide-react";
import { gsap, useGSAP, reduceMotion } from "@/lib/animations";

export function TechHero() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope || reduceMotion()) return;

      const imgPlate = scope.querySelector<HTMLElement>("[data-hero-img]");
      if (imgPlate) {
        gsap.fromTo(
          imgPlate,
          { opacity: 0, scale: 0.97, y: 16 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: 0.15,
          }
        );
      }
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-[#FAF7F2] pt-28 pb-14 lg:pt-32 lg:pb-20 border-b border-line/60"
    >
      <div className="shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading, Metrics & CTA */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="font-mono text-[11.5px] font-bold uppercase tracking-[0.22em] text-slate-500">
              PRECISION PLASTIC PACKAGING
            </span>

            <h1 className="mt-3 font-display text-[2.7rem] sm:text-[3.4rem] lg:text-[4rem] font-bold tracking-tight text-ink leading-[1.05]">
              High-Tonnage <br />
              Precision <br />
              Moulding<span className="text-brand">.</span>
            </h1>

            <p className="mt-4 text-[15.5px] sm:text-[16.5px] leading-relaxed text-slate-600 max-w-lg">
              Advanced injection moulding solutions for stronger, safer and more reliable plastic packaging.
            </p>

            {/* 3 Metric Badges */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 pb-5 border-t border-slate-200/80">
              {/* Metric 1 */}
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-200/60 shadow-xs">
                  <Box className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-[15px] font-bold text-ink leading-tight">
                    80T–650T
                  </div>
                  <div className="text-[11.5px] font-medium text-slate-500">
                    Clamping Force
                  </div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-200/60 shadow-xs">
                  <Cog className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-[15px] font-bold text-ink leading-tight">
                    Dual-Axis IML
                  </div>
                  <div className="text-[11.5px] font-medium text-slate-500">
                    In-Mould Labelling
                  </div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/60 shadow-xs">
                  <Crosshair className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-[15px] font-bold text-ink leading-tight">
                    ±0.015mm
                  </div>
                  <div className="text-[11.5px] font-medium text-slate-500">
                    Precision Tolerance
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-3 flex items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-brand text-white font-semibold text-sm transition-all duration-300 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/20 active:scale-[0.99]"
              >
                <span>Request Allocation</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Bottom tagline marker */}
            <div className="mt-8 flex items-center gap-3">
              <div className="h-[2px] w-6 bg-brand shrink-0" />
              <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-slate-400">
                BUILT FOR A CLEANER, SAFER TOMORROW
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual */}
          <div className="lg:col-span-6">
            <div
              data-hero-img
              className="group relative aspect-[4/3.4] sm:aspect-[4/3] lg:aspect-[16/13] w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white p-2 shadow-xl shadow-slate-200/60"
            >
              <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-2xl bg-slate-100">
                <Image
                  src="/images/technologies/tech-hero-photo.webp"
                  alt="High-Tonnage Precision Moulding line at Asir Containers"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
