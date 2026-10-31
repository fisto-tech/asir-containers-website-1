"use client";

import Image from "next/image";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import { gsap, useGSAP, revealLines, reduceMotion, useScrollReveal } from "@/lib/animations";

export function AboutSection() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      let cancelled = false;
      const heading = scope.querySelector<HTMLElement>("[data-about-heading]");
      const splitHeading = () => {
        if (cancelled || !heading) return;
        revealLines(heading, { mode: "words", delay: 0.1 });
      };

      if (heading) {
        if (document.fonts?.status === "loaded") splitHeading();
        else void document.fonts?.ready.then(splitHeading);
      }

      return () => {
        cancelled = true;
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-slate-50/80 py-16 lg:py-24 border-b border-slate-200/60">
      {/* Background Decorative Graphic Elements */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-[550px] w-[550px] rounded-full border-[40px] border-[#e51827]/[0.05] blur-[1px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-6 -bottom-16 h-[340px] w-[340px] rounded-full bg-gradient-to-tl from-[#e51827]/[0.06] to-transparent blur-2xl"
      />

      <div className="shell relative z-10">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column */}
          <div className="lg:col-span-6 lg:pr-4 flex flex-col justify-between">
            <div>
              {/* Title: Who We Are */}
              <h2
                data-about-heading
                className="font-display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.5rem] font-bold tracking-tight text-slate-900 leading-[1.06]"
              >
                Who <span className="text-[#e51827]">We Are</span>
              </h2>

              {/* Subtitle */}
              <p data-reveal data-reveal-dir="left" data-reveal-delay="0.1" className="mt-4 font-display text-[18px] sm:text-[20px] lg:text-[21px] font-bold text-slate-800 leading-snug">
                Precision Packaging for a Safer, Brighter Tomorrow
              </p>

              {/* Narrative Paragraphs */}
              <div data-reveal data-reveal-dir="up" data-reveal-delay="0.18" className="mt-5 space-y-4 text-[16px] sm:text-[17px] leading-[1.7] text-slate-600 font-normal">
                <p>
                  At ASIR Containers, we specialize in high-tonnage precision injection moulding, engineering world-class rigid plastic pails and containers for paint, agro-chemicals, food products, and industrial lubricants.
                </p>
                <p>
                  Crafted from 100% food-grade virgin polymers, every product is engineered with tamper-evident, hermetic closures to ensure zero leakage and withstand rigorous logistics across India and global supply chains.
                </p>
              </div>

              {/* 3 Left-Aligned Icon Blocks with Crisp Vector Icons */}
              <div className="mt-10 flex flex-wrap items-start justify-start gap-6 sm:gap-10">
                
                {/* 1. Precision Engineering: Left aligned */}
                <div data-reveal data-reveal-dir="scale" data-reveal-delay="0.22" className="flex flex-col items-start text-left">
                  <div className="flex h-[72px] w-[72px] sm:h-[80px] sm:w-[80px] items-center justify-center rounded-[24px] bg-[#eff6ff] transition-transform duration-300 hover:scale-105">
                    {/* High-definition gear icon with circular center hole */}
                    <Icon icon="fa6-solid:gear" className="h-8 w-8 sm:h-9 sm:w-9 text-[#0066cc]" />
                  </div>
                  <p className="mt-3 font-display text-[13.5px] sm:text-[14.5px] font-bold text-[#1a233a] leading-tight">
                    Precision<br />Engineering
                  </p>
                </div>

                {/* 2. Trusted Protection: Left aligned */}
                <div data-reveal data-reveal-dir="scale" data-reveal-delay="0.3" className="flex flex-col items-start text-left">
                  <div className="flex h-[72px] w-[72px] sm:h-[80px] sm:w-[80px] items-center justify-center rounded-[24px] bg-[#eff6ff] transition-transform duration-300 hover:scale-105">
                    {/* High-definition shield with checkmark */}
                    <Icon icon="fluent:shield-task-24-filled" className="h-9 w-9 sm:h-10 sm:w-10 text-[#0066cc]" />
                  </div>
                  <p className="mt-3 font-display text-[13.5px] sm:text-[14.5px] font-bold text-[#1a233a] leading-tight">
                    Trusted<br />Protection
                  </p>
                </div>

                {/* 3. Built for Your Brand: Left aligned */}
                <div data-reveal data-reveal-dir="scale" data-reveal-delay="0.38" className="flex flex-col items-start text-left">
                  <div className="flex h-[72px] w-[72px] sm:h-[80px] sm:w-[80px] items-center justify-center rounded-[24px] bg-[#eff6ff] transition-transform duration-300 hover:scale-105">
                    {/* High-definition 3-person team silhouette */}
                    <Icon icon="fluent:people-community-24-filled" className="h-9 w-9 sm:h-10 sm:w-10 text-[#0066cc]" />
                  </div>
                  <p className="mt-3 font-display text-[13.5px] sm:text-[14.5px] font-bold text-[#1a233a] leading-tight">
                    Built for<br />Your Brand
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Tall 2-Image Composition */}
          <div className="relative flex flex-col justify-center lg:col-span-6">
            {/* Dot Pattern Matrix Backdrop */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-6 -top-6 z-0 h-28 w-28 opacity-25"
              style={{
                backgroundImage: "radial-gradient(#e51827 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -bottom-6 z-0 h-28 w-28 opacity-25"
              style={{
                backgroundImage: "radial-gradient(#e51827 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* Height-focused aspect ratio */}
            <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[580px]">
              {/* Primary Large Image: Building Infrastructure (Slides from right) */}
              <figure data-reveal data-reveal-dir="right" data-reveal-delay="0.15" className="relative h-full w-full overflow-hidden rounded-[32px] border border-slate-200/90 bg-white shadow-2xl">
                <Image
                  src="/images/about/about-image-infrastructure.webp"
                  alt="ASIR Containers modern manufacturing facility"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-[center_60%]"
                />
              </figure>

              {/* Secondary Overlapping Front Image (Lifts with scale & tilt from left) */}
              <figure data-reveal data-reveal-dir="scale-rotate" data-reveal-delay="0.32" className="absolute -bottom-6 -left-6 w-[52%] overflow-hidden rounded-[24px] border-[6px] border-white bg-white shadow-[0_24px_50px_rgba(0,0,0,0.25)]">
                <span className="relative block aspect-[4/3.5]">
                  <Image
                    src="/images/about/about-us-image-2.png"
                    alt="Containers on automated plant conveyor line"
                    fill
                    sizes="(max-width: 1024px) 50vw, 26vw"
                    className="object-cover"
                  />
                </span>
              </figure>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
