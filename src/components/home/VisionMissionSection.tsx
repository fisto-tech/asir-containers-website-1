"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Props = {
  index?: string;
};

/* Precise SVG Icons matching the reference graphic */
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LeafIcon({ className, fill }: { className?: string; fill?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function CustomersIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 18c0-3.3 2.7-6 6-6s6 2.7 6 6v1H3v-1z" />
      <circle cx="16.5" cy="8.5" r="2.5" />
      <path d="M15 15.1c1.3-.7 2.8-.7 4 0 1.2.7 2 1.8 2 3.1v.8h-6v-.8c0-1.2.5-2.4 1.5-3.1h-1.5z" />
    </svg>
  );
}

function LightbulbIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function HandshakeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L13 12" />
      <path d="m18 10 1.6-1.6a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L14 6" />
      <path d="m2 14 6 6" />
      <path d="m7 9 4-4a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4L11 13" />
      <path d="m2 19 3 3" />
    </svg>
  );
}

function UsersGroupIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M2.5 19c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5v1h-13v-1z" />
      <circle cx="16.5" cy="9.5" r="2.7" />
      <path d="M15.5 15.5c1.4-.7 3.1-.7 4.5 0 1.4.7 2.3 2 2.3 3.5v1h-6.8v-1c0-1.4.6-2.7 1.7-3.5h-1.7z" />
    </svg>
  );
}

export function VisionMissionSection({ index = "06" }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white py-14 lg:py-20">
      <div className="shell relative z-10">


        {/* Vision & Mission Banner Composition */}
        <div className="relative mt-8 sm:mt-10">
          <div className="relative flex flex-col gap-3.5 sm:gap-4 overflow-visible">
            
            {/* 1. TOP CARD: MISSION */}
            <Reveal className="relative overflow-hidden rounded-[26px] sm:rounded-[36px] lg:rounded-[40px] border border-slate-200/90 bg-white shadow-[0_12px_36px_rgba(0,0,0,0.05)]">
              {/* Reduced height across viewports: h-[200px] to lg:h-[240px] xl:h-[260px] */}
              <div className="relative h-auto min-h-[220px] md:h-[230px] lg:h-[245px] xl:h-[260px] flex items-center">
                {/* Full-width Mission background image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/mission-vission/mission-image.webp"
                    alt="Sustainable industrial manufacturing and seedling in hands"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[center_35%]"
                  />
                  {/* Smooth horizontal gradient to keep left text clean */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent w-full md:w-[62%] lg:w-[46%] pointer-events-none" />
                </div>

                {/* Content Layout - md:flex-row lock for all desktop/tablet sizes */}
                <div className="relative z-10 w-full px-6 py-6 sm:px-10 md:px-10 lg:px-14 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4">
                  {/* Left: Mission Title & Description */}
                  <div className="max-w-sm lg:max-w-[380px] xl:max-w-[420px]">
                    <h3 className="font-display text-[2.2rem] sm:text-[2.6rem] lg:text-[2.9rem] font-bold tracking-tight text-[#d91424] leading-none">
                      Mission
                    </h3>
                    <div className="mt-2.5 h-[3px] w-12 bg-[#d91424]" />
                    <p className="mt-3.5 sm:mt-4 text-[13px] sm:text-[14px] lg:text-[14.5px] font-semibold leading-[1.55] text-[#242b35]">
                      To provide high-quality, safe and sustainable containers, ensuring the health and satisfaction of our customers.
                    </p>
                  </div>

                  {/* Right: 3 Red Outline Badges with Labels */}
                  <div className="flex flex-col gap-2.5 sm:gap-3 lg:gap-3.5 md:pr-4 lg:pr-8 shrink-0">
                    {/* Badge 1: Safety First */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#d91424] bg-white text-[#d91424] shadow-xs">
                        <ShieldIcon className="h-5 w-5 sm:h-5 sm:w-5" />
                      </div>
                      <div className="border-l border-slate-300 pl-2.5 py-0.5">
                        <p className="text-[11px] sm:text-[12px] font-bold text-[#1f2937] leading-tight">Safety</p>
                        <p className="text-[11px] sm:text-[12px] font-bold text-[#1f2937] leading-tight">First</p>
                      </div>
                    </div>

                    {/* Badge 2: Sustainable Future */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#d91424] bg-white text-[#d91424] shadow-xs">
                        <LeafIcon className="h-5 w-5 sm:h-5 sm:w-5" />
                      </div>
                      <div className="border-l border-slate-300 pl-2.5 py-0.5">
                        <p className="text-[11px] sm:text-[12px] font-bold text-[#1f2937] leading-tight">Sustainable</p>
                        <p className="text-[11px] sm:text-[12px] font-bold text-[#1f2937] leading-tight">Future</p>
                      </div>
                    </div>

                    {/* Badge 3: Customer Satisfaction */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#d91424] bg-white text-[#d91424] shadow-xs">
                        <CustomersIcon className="h-5 w-5 sm:h-5 sm:w-5" />
                      </div>
                      <div className="border-l border-slate-300 pl-2.5 py-0.5">
                        <p className="text-[11px] sm:text-[12px] font-bold text-[#1f2937] leading-tight">Customer</p>
                        <p className="text-[11px] sm:text-[12px] font-bold text-[#1f2937] leading-tight">Satisfaction</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 2. BOTTOM CARD: VISION */}
            <Reveal className="relative overflow-hidden rounded-[26px] sm:rounded-[36px] lg:rounded-[40px] bg-[#c71120] text-white shadow-[0_12px_36px_rgba(199,17,32,0.18)]">
              {/* Reduced height across viewports */}
              <div className="relative h-auto min-h-[220px] md:h-[230px] lg:h-[245px] xl:h-[260px] flex items-center">
                {/* Full-width Vision background image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/mission-vission/vission-image.webp"
                    alt="Vision summit sunrise"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[center_35%]"
                  />
                  {/* Rich red blend gradient on left */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#c71120] via-[#c71120]/90 to-transparent w-full md:w-[62%] lg:w-[46%] pointer-events-none" />
                </div>

                {/* Content Layout - md:flex-row lock */}
                <div className="relative z-10 w-full px-6 py-6 sm:px-10 md:px-10 lg:px-14 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4">
                  {/* Left: Vision Title & Description */}
                  <div className="max-w-sm lg:max-w-[380px] xl:max-w-[420px]">
                    <h3 className="font-display text-[2.2rem] sm:text-[2.6rem] lg:text-[2.9rem] font-bold tracking-tight text-white leading-none">
                      Vision
                    </h3>
                    <div className="mt-2.5 h-[3px] w-12 bg-white" />
                    <p className="mt-3.5 sm:mt-4 text-[13px] sm:text-[14px] lg:text-[14.5px] font-semibold leading-[1.55] text-white/95">
                      To be a globally trusted and preferred partner for container coating solutions, recognized for innovation, quality, sustainability and customer value.
                    </p>
                  </div>

                  {/* Right: 2x2 Grid of Circular Outlined Icons */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-3.5 md:pr-4 lg:pr-8 shrink-0">
                    {/* Icon 1: Innovation */}
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white shadow-xs transition-transform hover:scale-105">
                      <LightbulbIcon className="h-5 w-5 sm:h-5 sm:w-5" />
                    </div>

                    {/* Icon 2: Sustainability */}
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white shadow-xs transition-transform hover:scale-105">
                      <LeafIcon className="h-5 w-5 sm:h-5 sm:w-5" fill={false} />
                    </div>

                    {/* Icon 3: Partnership */}
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white shadow-xs transition-transform hover:scale-105">
                      <HandshakeIcon className="h-5 w-5 sm:h-5 sm:w-5" />
                    </div>

                    {/* Icon 4: Customer Value */}
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 border-white bg-transparent text-white shadow-xs transition-transform hover:scale-105">
                      <UsersGroupIcon className="h-5 w-5 sm:h-5 sm:w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

          {/* 3. CENTER OVERLAPPING FLOATING GLOBE BADGE - Dynamically responsive on md, lg, and xl screens */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <div className="relative h-44 w-44 lg:h-52 lg:w-52 xl:h-56 xl:w-56 overflow-hidden rounded-full border-[6px] lg:border-[7px] border-white bg-white shadow-[0_12px_40px_rgba(0,0,0,0.32)]">
              <Image
                src="/images/mission-vission/mission-vission-globe.webp"
                alt="Global connected logistics network"
                fill
                priority
                sizes="(max-width: 1024px) 180px, 230px"
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
