"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Cog, Crosshair } from "lucide-react";
import { useScrollReveal } from "@/lib/animations";

export function TechHero() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-white pt-24 sm:pt-28 lg:pt-0 border-b border-line/60 w-full"
    >
      {/* Full width split grid without containerisation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] xl:min-h-[660px] items-stretch w-full">
        
        {/* Left Column: Heading, Metrics & CTA */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center pl-6 sm:pl-12 lg:pl-[5vw] xl:pl-[7vw] pr-6 lg:pr-10 py-10 lg:py-24 z-10">
          <div className="max-w-xl">
            {/* Title with Bidirectional Entrance */}
            <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
              <h1 className="font-display text-[clamp(2.4rem,4.2vw,4rem)] font-extrabold tracking-tight text-ink leading-[1.05]">
                High-Tonnage <br />
                Precision <br />
                <span className="text-brand">Moulding.</span>
              </h1>
            </div>

            {/* Description */}
            <div data-reveal data-reveal-dir="up" data-reveal-delay="0.2">
              <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-slate-600 max-w-lg">
                Advanced injection moulding solutions for stronger, safer and more reliable plastic packaging.
              </p>
            </div>

            {/* 3 Metric Badges */}
            <div className="mt-7 flex flex-wrap sm:flex-nowrap items-center gap-4 sm:gap-6">
              {/* Metric 1 */}
              <div
                data-reveal
                data-reveal-dir="scale"
                data-reveal-delay="0.25"
                className="flex items-center gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-200/60 shadow-xs">
                  <Box className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-[14px] sm:text-[14.5px] font-bold text-ink leading-tight">
                    80T–650T
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">
                    Clamping Force
                  </div>
                </div>
              </div>

              {/* Metric 2 */}
              <div
                data-reveal
                data-reveal-dir="scale"
                data-reveal-delay="0.32"
                className="flex items-center gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-200/60 shadow-xs">
                  <Cog className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-[14px] sm:text-[14.5px] font-bold text-ink leading-tight">
                    Dual-Axis IML
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">
                    In-Mould Labelling
                  </div>
                </div>
              </div>

              {/* Metric 3 */}
              <div
                data-reveal
                data-reveal-dir="scale"
                data-reveal-delay="0.39"
                className="flex items-center gap-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200/60 shadow-xs">
                  <Crosshair className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-[14px] sm:text-[14.5px] font-bold text-ink leading-tight">
                    ±0.015mm
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">
                    Precision Tolerance
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div data-reveal data-reveal-dir="up" data-reveal-delay="0.45" className="mt-8 flex items-center">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-brand text-white font-semibold text-sm shadow-xs transition-all duration-300 hover:bg-brand-dark hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request Allocation</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Full-Bleed Hero Visual with Two-Way Animation */}
        <div className="lg:col-span-6 xl:col-span-7 relative min-h-[340px] sm:min-h-[420px] lg:min-h-full w-full overflow-hidden">
          <div
            data-reveal
            data-reveal-dir="scale"
            data-reveal-delay="0.2"
            className="relative h-full w-full min-h-[340px] sm:min-h-[420px] lg:min-h-full"
          >
            <Image
              src="/images/technologies/technology-hero.webp"
              alt="High-Tonnage Precision Moulding line at Asir Containers"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center lg:object-left"
            />

            {/* Top ambient scrim under transparent header for crisp text contrast */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/95 via-white/50 to-transparent z-10" />

            {/* Diagonal Architectural Cut & Red Accent Stroke */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full hidden sm:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="0,0 12,0 0,28" fill="#ffffff" />
              <line
                x1="12"
                y1="0"
                x2="0"
                y2="28"
                stroke="#E51827"
                strokeWidth="1.6"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
