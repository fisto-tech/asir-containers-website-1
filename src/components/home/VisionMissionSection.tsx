"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Props = {
  index?: string;
};

import { Icon } from "@iconify/react";

export function VisionMissionSection({ index = "06" }: Props) {
  return (
    <section className="relative overflow-hidden bg-white py-8 lg:py-12 border-b border-slate-100/80">
      <div className="shell relative z-10">


        {/* Vision & Mission Banner Composition */}
        <div className="relative">
          <div className="relative flex flex-col gap-3.5 sm:gap-4 overflow-visible">
            
            {/* 1. TOP CARD: MISSION (Slides from Left) */}
            <Reveal data-reveal data-reveal-dir="left" data-reveal-delay="0.1" className="group/mission relative overflow-hidden rounded-[26px] sm:rounded-[36px] lg:rounded-[40px] border border-slate-200/90 bg-white shadow-[0_12px_36px_rgba(0,0,0,0.05)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)]">
              {/* Reduced height across viewports: h-[200px] to lg:h-[240px] xl:h-[260px] */}
              <div className="relative h-auto min-h-[220px] md:h-[230px] lg:h-[245px] xl:h-[260px] flex items-center">
                {/* Full-width Mission background image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src="/images/mission-vission/mission-image.webp"
                    alt="Sustainable industrial manufacturing and seedling in hands"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover/mission:scale-105"
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
                    <div className="group/item flex items-center gap-3 ">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#d91424] bg-white text-[#d91424] shadow-xs transition-all duration-300 ease-out group-hover/item:scale-110 group-hover/item:bg-[#d91424] group-hover/item:text-white group-hover/item:shadow-md">
                        <Icon icon="lucide:shield-check" className="h-5 w-5 transition-transform duration-300 ease-out group-hover/item:scale-110" />
                      </div>
                      <div className="border-l border-slate-300 pl-2.5 py-0.5 transition-colors duration-300 group-hover/item:border-[#d91424]">
                        <p className="text-[11px] sm:text-[12px] font-bold text-[#1f2937] leading-tight">Safety</p>
                        <p className="text-[11px] sm:text-[12px] font-bold text-[#1f2937] leading-tight">First</p>
                      </div>
                    </div>

                    {/* Badge 2: Sustainable Future */}
                    <div className="group/item flex items-center gap-3 ">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#d91424] bg-white text-[#d91424] shadow-xs transition-all duration-300 ease-out group-hover/item:scale-110 group-hover/item:bg-[#d91424] group-hover/item:text-white group-hover/item:shadow-md">
                        <Icon icon="lucide:leaf" className="h-5 w-5 transition-transform duration-300 ease-out group-hover/item:scale-110" />
                      </div>
                      <div className="border-l border-slate-300 pl-2.5 py-0.5 transition-colors duration-300 group-hover/item:border-[#d91424]">
                        <p className="text-[11px] sm:text-[12px] font-bold text-[#1f2937] leading-tight">Sustainable</p>
                        <p className="text-[11px] sm:text-[12px] font-bold text-[#1f2937] leading-tight">Future</p>
                      </div>
                    </div>

                    {/* Badge 3: Customer Satisfaction */}
                    <div className="group/item flex items-center gap-3 ">
                      <div className="flex h-9 w-9 sm:h-10 sm:w-10 lg:h-11 lg:w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#d91424] bg-white text-[#d91424] shadow-xs transition-all duration-300 ease-out group-hover/item:scale-110 group-hover/item:bg-[#d91424] group-hover/item:text-white group-hover/item:shadow-md">
                        <Icon icon="solar:users-group-two-rounded-bold" className="h-5 w-5 transition-transform duration-300 ease-out group-hover/item:scale-110" />
                      </div>
                      <div className="border-l border-slate-300 pl-2.5 py-0.5 transition-colors duration-300 group-hover/item:border-[#d91424]">
                        <p className="text-[11px] sm:text-[12px] font-bold text-[#1f2937] leading-tight">Customer</p>
                        <p className="text-[11px] sm:text-[12px] font-bold text-[#1f2937] leading-tight">Satisfaction</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* 2. BOTTOM CARD: VISION (Slides from Right) */}
            <Reveal data-reveal data-reveal-dir="right" data-reveal-delay="0.2" className="group/vision relative overflow-hidden rounded-[26px] sm:rounded-[36px] lg:rounded-[40px] bg-[#c71120] text-white shadow-[0_12px_36px_rgba(199,17,32,0.18)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(199,17,32,0.3)]">
              {/* Reduced height across viewports */}
              <div className="relative h-auto min-h-[220px] md:h-[230px] lg:h-[245px] xl:h-[260px] flex items-center">
                {/* Full-width Vision background image */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src="/images/mission-vission/vission-image.webp"
                    alt="Vision summit sunrise"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[center_35%] transition-transform duration-700 ease-out group-hover/vision:scale-105"
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
                    <div className="group/icon flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-xs text-white shadow-xs transition-all duration-300 ease-out hover:scale-115 hover:border-white hover:bg-white hover:text-[#c71120] hover:shadow-lg ">
                      <Icon icon="lucide:lightbulb" className="h-5 w-5 transition-transform duration-300 ease-out group-hover/icon:scale-110" />
                    </div>

                    {/* Icon 2: Sustainability */}
                    <div className="group/icon flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-xs text-white shadow-xs transition-all duration-300 ease-out hover:scale-115 hover:border-white hover:bg-white hover:text-[#c71120] hover:shadow-lg ">
                      <Icon icon="lucide:leaf" className="h-5 w-5 transition-transform duration-300 ease-out group-hover/icon:scale-110" />
                    </div>

                    {/* Icon 3: Partnership */}
                    <div className="group/icon flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-xs text-white shadow-xs transition-all duration-300 ease-out hover:scale-115 hover:border-white hover:bg-white hover:text-[#c71120] hover:shadow-lg ">
                      <Icon icon="lucide:handshake" className="h-5 w-5 transition-transform duration-300 ease-out group-hover/icon:scale-110" />
                    </div>

                    {/* Icon 4: Customer Value */}
                    <div className="group/icon flex h-10 w-10 sm:h-11 sm:w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-xs text-white shadow-xs transition-all duration-300 ease-out hover:scale-115 hover:border-white hover:bg-white hover:text-[#c71120] hover:shadow-lg ">
                      <Icon icon="solar:users-group-two-rounded-bold" className="h-5 w-5 transition-transform duration-300 ease-out group-hover/icon:scale-110" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>

          {/* 3. CENTER OVERLAPPING FLOATING GLOBE BADGE - Dynamically responsive on md, lg, and xl screens */}
          <div className="pointer-events-auto group/globe absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block ">
            <div className="relative h-44 w-44 lg:h-52 lg:w-52 xl:h-56 xl:w-56 overflow-hidden rounded-full border-[6px] lg:border-[7px] border-white bg-white shadow-[0_12px_40px_rgba(0,0,0,0.32)] transition-all duration-500 ease-out group-hover/globe:scale-108 group-hover/globe:shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              <Image
                src="/images/mission-vission/mission-vission-globe.webp"
                alt="Global connected logistics network"
                fill
                priority
                sizes="(max-width: 1024px) 180px, 230px"
                className="object-cover transition-transform duration-700 ease-out group-hover/globe:scale-112 group-hover/globe:rotate-3"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
