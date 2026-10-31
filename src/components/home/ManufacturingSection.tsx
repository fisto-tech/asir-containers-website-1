"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { Reveal } from "@/components/motion/Reveal";

export function ManufacturingSection() {
  const features = [
    {
      title: "Precision Injection",
      subtitle: "High-tonnage hydraulic & electric moulding with micron accuracy",
      icon: "solar:settings-bold",
      color: "#0284c7", // Technical cyan/blue
    },
    {
      title: "Robotic Labelling",
      subtitle: "In-mould labelling (IML) and automated multi-axis transfer",
      icon: "solar:printer-bold",
      color: "#e51827", // Primary brand red
    },
    {
      title: "Hermetic Tooling",
      subtitle: "Custom-built multi-cavity dies ensuring zero leakage",
      icon: "solar:shield-check-bold",
      color: "#059669", // Precision emerald green
    },
    {
      title: "Triple-Gate QC",
      subtitle: "Comprehensive drop-weight, seal load and pressure testing",
      icon: "solar:check-circle-bold",
      color: "#7c3aed", // Industrial violet
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-12 lg:py-16 border-b border-slate-200/60">
      {/* Architectural Background Graphic Elements (similar to Who We Are) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-[500px] w-[500px] rounded-full border-[36px] border-[#0284c7]/[0.04] blur-[1px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-10 -bottom-20 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#e51827]/[0.05] via-[#0284c7]/[0.03] to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/3 top-10 h-32 w-32 opacity-20"
        style={{
          backgroundImage: "radial-gradient(#002b49 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="shell relative z-10">
        {/* 2-Column Grid: Left Content / Right Image */}
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column (7 cols): Heading, Paragraph, and 2-per-row Icon + Text features */}
          <div className="lg:col-span-7">
            <Reveal>
              {/* Bold Dual-Color Heading */}
              <h2
                data-reveal
                data-reveal-delay="0.1"
                className="font-display text-[2.35rem] sm:text-[2.85rem] lg:text-[3.2rem] font-black tracking-tight leading-[1.05]"
              >
                <span className="text-[#002b49] block">Where Design</span>
                <span className="text-[#e51827] block">Meets Manufacturing</span>
              </h2>

              {/* Formatted Narrative */}
              <p
                data-reveal
                data-reveal-delay="0.15"
                className="mt-3.5 text-[14.5px] sm:text-[15.5px] leading-[1.6] text-slate-600 font-normal max-w-[520px]"
              >
                Our manufacturing facility brings moulding, robotic decoration, and quality auditing together under one roof—ensuring airtight seal integrity and reliable production timelines.
              </p>

              {/* 2 Per Row Grid: [Icon] [Text] horizontal alignment without card box */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-5 pt-1">
                {features.map((feature, idx) => (
                  <div
                    key={feature.title}
                    data-reveal
                    data-reveal-delay={(0.2 + idx * 0.08).toFixed(2)}
                    className="group flex items-start gap-3.5 transition-transform duration-300 hover:translate-x-1"
                  >
                    {/* Big Icon without card box - direct colored icon */}
                    <div
                      className="shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: feature.color }}
                    >
                      <Icon
                        icon={feature.icon}
                        className="h-9 w-9 sm:h-10 sm:w-10"
                      />
                    </div>

                    {/* Text block: Title + concise descriptor */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-[15.5px] sm:text-[16.5px] font-bold text-[#002b49] leading-snug tracking-tight group-hover:text-ink transition-colors">
                        {feature.title}
                      </h3>
                      <p className="mt-0.5 text-[12.5px] sm:text-[13px] leading-relaxed text-slate-500 font-normal">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Column (5 cols): Rounded Corner High-Impact Facility Photo - Reduced Height */}
          <div className="lg:col-span-5">
            <Reveal>
              <div
                data-reveal
                data-reveal-delay="0.25"
                className="relative w-full aspect-[4/3.8] min-h-[320px] sm:min-h-[380px] lg:min-h-[430px] overflow-hidden rounded-[28px] border border-slate-200/90 bg-slate-900 shadow-xl transition-all duration-500 hover:shadow-2xl"
              >
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
