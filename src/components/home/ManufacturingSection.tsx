"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { Reveal } from "@/components/motion/Reveal";

export function ManufacturingSection() {
  const features = [
    {
      title: "Precision Injection",
      icon: "solar:settings-bold",
    },
    {
      title: "Robotic Labelling",
      icon: "solar:printer-bold",
    },
    {
      title: "Hermetic Tooling",
      icon: "solar:shield-check-bold",
    },
    {
      title: "Triple-Gate QC",
      icon: "solar:check-circle-bold",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 border-y border-slate-100">
      <div className="shell relative z-10">
        

        {/* 2-Column Grid: Left Content / Right Image */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column (7 cols): Heading, 2-line Paragraph, and 4-Item Single Line Feature Row */}
          <div className="lg:col-span-7">
            <Reveal>
              {/* Bold Dual-Color Heading */}
              <h2 className="font-display text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] font-black tracking-tight leading-[1.04]">
                <span className="text-[#002b49] block">Where Design</span>
                <span className="text-[#e51827] block">Meets Manufacturing</span>
              </h2>

              {/* 2-Line Formatted Narrative */}
              <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.65] text-slate-600 font-normal max-w-[540px]">
                Our manufacturing facility brings moulding, robotic decoration, and quality auditing together under one roof—ensuring airtight seal integrity and reliable production timelines.
              </p>

              {/* 4 Features in a Single Row / Line (icon and title only) */}
              <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 pt-2">
                {features.map((feature) => (
                  <div key={feature.title} className="flex flex-col items-start gap-3 group">
                    {/* Soft icon container */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#fff2f1] text-[#e51827] shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#e51827] group-hover:text-white">
                      <Icon icon={feature.icon} className="h-6 w-6 transition-colors" />
                    </div>

                    <h3 className="font-display text-[14px] sm:text-[14.5px] font-bold text-[#002b49] leading-snug">
                      {feature.title}
                    </h3>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column (5 cols): Rounded Corner High-Impact Facility Photo */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative w-full aspect-[4/4.3] min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] overflow-hidden rounded-[32px] border border-slate-200/90 bg-slate-900 shadow-2xl transition-all duration-500 hover:shadow-3xl">
                <Image
                  src="/images/manufacturing/manufacturing-unit.webp"
                  alt="High-tonnage injection moulding plant floor at ASIR Containers"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-103"
                />
                {/* Subtle soft gradient */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
