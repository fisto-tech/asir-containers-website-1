"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollReveal } from "@/lib/animations";

export function ProcessHero() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section ref={root} className="relative overflow-hidden bg-white">
      {/* Background Soft Ambient Graphic Atmosphere */}
      <div
        aria-hidden
        className="drift pointer-events-none absolute -right-32 -top-40 h-[540px] w-[540px] rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden
        className="drift pointer-events-none absolute -left-44 top-1/3 h-[420px] w-[420px] rounded-full bg-ocean/10 blur-3xl [animation-delay:-6s]"
      />

      <div className="shell relative grid items-center gap-10 pb-12 pt-28 sm:pt-32 lg:grid-cols-12 lg:gap-14 lg:pb-16 lg:pt-36">
        {/* Left Column: Heading, description, and CTA button */}
        <div className="lg:col-span-5 flex flex-col items-start">
          <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
            <h1
              className="font-display text-[clamp(2.3rem,4.4vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-ink"
            >
              Manufacturing &amp; Process Flow
            </h1>
          </div>

          <div data-reveal data-reveal-dir="up" data-reveal-delay="0.2">
            <p className="mt-5 max-w-md text-[15px] sm:text-[16px] leading-relaxed text-slate-600 font-normal">
              Fully integrated in-house manufacturing process: precision injection moulding
              cycles, versatile multi-color container printing, and rigorous multi-stage quality
              control under one roof.
            </p>
          </div>

          <div data-reveal data-reveal-dir="up" data-reveal-delay="0.3">
            <Link
              href="/contact"
              className="group mt-8 inline-flex h-12 items-center gap-2.5 rounded-[12px] bg-brand px-7 text-[14.5px] font-semibold text-white shadow-xs transition-all duration-300 hover:bg-brand-dark hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
            >
              Contact engineering
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* Right Column: Two Plates With Staggered Two-Way Reveal & Responsive Aspect Ratios */}
        <div className="lg:col-span-7">
          <div className="grid h-[280px] grid-cols-5 gap-3 sm:h-[340px] sm:gap-4 lg:h-[460px]">
            {/* Plate 1: Wide Plant Floor Image */}
            <div
              data-reveal
              data-reveal-dir="scale"
              data-reveal-delay="0.2"
              className="relative col-span-3 overflow-hidden rounded-[24px] bg-slate-900 border border-slate-200/80 shadow-md transition-all duration-500 hover:shadow-xl"
            >
              <Image
                src="/images/hero/hero-01.jpg"
                alt="Containers stacked on the plant floor"
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 36vw"
                className="ambient-media-slow object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
            </div>

            {/* Plate 2: Narrow Machinery Detail Image */}
            <div
              data-reveal
              data-reveal-dir="scale"
              data-reveal-delay="0.32"
              className="relative col-span-2 overflow-hidden rounded-[24px] bg-slate-900 border border-slate-200/80 shadow-md transition-all duration-500 hover:shadow-xl"
            >
              <Image
                src="/images/facility/machinery-01.jpg"
                alt="Injection moulding machines running in the plant"
                fill
                priority
                sizes="(max-width: 1024px) 40vw, 24vw"
                className="ambient-media object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
