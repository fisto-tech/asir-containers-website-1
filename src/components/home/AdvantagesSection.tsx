"use client";

import Image from "next/image";
import { ShieldCheck, Leaf, Truck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export function AdvantagesSection() {
  const statCards = [
    {
      icon: ShieldCheck,
      value: "99.8%",
      label: "LEAK-FREE",
      subLabel: "QUALITY",
    },
    {
      icon: Leaf,
      value: "100%",
      label: "VIRGIN PP",
      subLabel: "MATERIAL",
    },
    {
      icon: Truck,
      value: "DIRECT",
      label: "DISPATCH",
      subLabel: "TO KEEP YOU MOVING",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 border-b border-slate-100/80">
      {/* Background soft red/pink curved ribbon wave in top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-0 h-[480px] w-[600px] opacity-45 blur-3xl [background:radial-gradient(ellipse_at_top_right,#fecdd3_0%,#fff1f2_45%,transparent_75%)]"
      />
      {/* Subtle container yard watermark in bottom right */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-0 h-40 w-80 opacity-20"
      >
        <Image
          src="/images/facility/containers-watermark.png"
          alt=""
          fill
          className="object-cover object-bottom"
        />
      </div>

      <div className="shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          {/* Left Column: Machinery Graphic with Offset Red Decorative Backdrop */}
          <div className="lg:col-span-5">
            <Reveal>
              <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1" className="relative mx-auto max-w-[440px] lg:max-w-none">
                {/* Asymmetrical Curved Red Decorative Ribbon Backing matching exact design */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-4 -left-4 h-24 w-28 rounded-tl-[44px] bg-brand sm:-top-5 sm:-left-5 sm:h-28 sm:w-32 sm:rounded-tl-[52px]"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-28 rounded-br-[44px] bg-brand sm:-bottom-5 sm:-right-5 sm:h-28 sm:w-32 sm:rounded-br-[52px]"
                />

                {/* Primary Machinery Photo Card with smooth continuous rounded corners */}
                <div className="relative aspect-[1/0.88] w-full overflow-hidden rounded-[36px] bg-slate-100 shadow-2xl ring-4 ring-white sm:rounded-[44px]">
                  <Image
                    src="/images/why-choose/why-choose.webp"
                    alt="Automated bucket lifting and packaging line at ASIR Containers"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover object-center transition-transform duration-700 hover:scale-104"
                  />
                  {/* Subtle inner border */}
                  <div className="pointer-events-none absolute inset-0 rounded-[36px] border border-black/5 sm:rounded-[44px]" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Title, Narrative Copy, and 3 Stat Cards */}
          <div className="lg:col-span-7">
            <Reveal>
              {/* Header Label: WHY CHOOSE US with horizontal accent line */}
              <div data-reveal data-reveal-dir="down" data-reveal-delay="0.1" className="flex items-center gap-3">
                <span className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-brand">
                  WHY CHOOSE US
                </span>
                <span className="h-[1.5px] w-24 bg-gradient-to-r from-brand to-rose-200" />
              </div>

              {/* Main Headline */}
              <h2 data-reveal data-reveal-dir="right" data-reveal-delay="0.15" className="mt-3.5 font-display text-[2.5rem] font-bold tracking-tight text-ink sm:text-[3.25rem] lg:text-[3.5rem] leading-[1.06]">
                Engineered for <br className="hidden sm:inline" />
                <span className="text-brand">Reliability</span>
              </h2>

              {/* Descriptive Paragraph */}
              <p data-reveal data-reveal-dir="up" data-reveal-delay="0.2" className="mt-4 max-w-xl text-[15.5px] font-medium leading-relaxed text-slate-600 sm:text-[16.5px]">
                We manufacture high-quality plastic components with precision, consistency and on-time delivery — ensuring your supply chain never stops.
              </p>

              {/* 3 Metric Cards Grid */}
              <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4.5">
                {statCards.map((card, idx) => {
                  const IconComponent = card.icon;
                  return (
                    <div
                      key={card.label}
                      data-reveal
                      data-reveal-dir="scale"
                      data-reveal-delay={(0.25 + idx * 0.08).toFixed(2)}
                      className="group flex flex-col items-center justify-center rounded-[22px] border border-slate-200/90 bg-white px-4 py-6 text-center shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                    >
                      {/* Red Stroke Outline Icon */}
                      <div className="mb-3.5 flex h-11 w-11 items-center justify-center text-brand transition-transform duration-300 group-hover:scale-110">
                        <IconComponent
                          className="h-8 w-8 text-brand"
                          strokeWidth={1.8}
                        />
                      </div>

                      {/* Primary Value */}
                      <div className="font-display text-[26px] font-extrabold tracking-tight text-ink sm:text-[28px]">
                        {card.value}
                      </div>

                      {/* Upper Label */}
                      <div className="mt-1 font-mono text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        {card.label}
                      </div>

                      {/* Lower Sub-label */}
                      <div className="mt-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {card.subLabel}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
