"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { Reveal } from "@/components/motion/Reveal";

export function ManufacturingSection() {
  const steps = [
    {
      title: "Precision Injection",
      desc: "Microprocessor-controlled 80T–650T hydraulic presses ensuring structural wall uniformity.",
      icon: "solar:settings-bold",
    },
    {
      title: "Robotic Labelling",
      desc: "Dual-axis side-entry servo robotics placing peel-proof, photo-grade IML & HTL labels.",
      icon: "solar:printer-bold",
    },
    {
      title: "Hermetic Tooling",
      desc: "Hardened steel moulds built for leak-proof snap locks and tamper-evident tear strips.",
      icon: "solar:shield-check-bold",
    },
    {
      title: "Triple-Gate QC",
      desc: "Raw resin testing, impression wall caliper verification, and drop-impact dispatch audits.",
      icon: "solar:check-circle-bold",
    },
    {
      title: "Automated Packaging",
      desc: "Conveyor accumulation and robotic stacking for dust-free, palletized transport.",
      icon: "solar:box-bold",
    },
    {
      title: "Dispatch & Logistics",
      desc: "Systematic barcode verification ensuring orders reach commercial facilities in mint condition.",
      icon: "solar:delivery-bold",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24 border-y border-slate-100">
      <div className="shell relative z-10">
        
        {/* Top Eyebrow with Gear Icon matching user reference mockup */}
        <div className="flex items-center gap-2 mb-8">
          <Icon icon="fa6-solid:gear" className="h-4 w-4 text-[#e51827]" />
          <span className="font-display text-xs sm:text-[13px] font-extrabold uppercase tracking-widest text-[#002b49]">
            ENGINEERED UNDER ONE ROOF
          </span>
          <span className="h-[2px] w-10 bg-[#e51827] ml-1" />
        </div>

        {/* 2-Column Grid: Left Content / Right Image */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          
          {/* Left Column (7 cols): Heading, Brief Paragraph, and 6-Item Technical Grid */}
          <div className="lg:col-span-7">
            <Reveal>
              {/* Bold Dual-Color Heading */}
              <h2 className="font-display text-[2.6rem] sm:text-[3.2rem] lg:text-[3.6rem] font-black tracking-tight leading-[1.04]">
                <span className="text-[#002b49] block">Where Design</span>
                <span className="text-[#e51827] block">Meets Manufacturing</span>
              </h2>

              {/* Concise Narrative */}
              <p className="mt-4 text-[14.5px] sm:text-[15.5px] leading-relaxed text-slate-600 font-normal max-w-xl">
                Our manufacturing facility brings moulding, robotic decoration, and quality auditing together under one roof—ensuring airtight seal integrity and reliable production timelines.
              </p>

              {/* 6 Capabilities in a 2x3 Grid with Orange/Red Linear Outlined Icons matching mockup */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                {steps.map((step) => (
                  <div key={step.title} className="flex items-start gap-3.5">
                    {/* Outline Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50/80 text-[#e51827] transition-transform hover:scale-105">
                      <Icon icon={step.icon} className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-display text-[14.5px] font-bold text-[#002b49] leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">
                        {step.desc}
                      </p>
                    </div>
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
