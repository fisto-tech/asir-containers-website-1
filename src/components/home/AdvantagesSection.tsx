"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@iconify/react";
import { Reveal } from "@/components/motion/Reveal";

export function AdvantagesSection() {
  const points = [
    {
      title: "Hardened Steel Tooling",
      detail: "Zero leakage under vibration",
      description: "Precision-machined cavity moulds guarantee airtight closure from the 1st to the 100,000th cycle.",
      icon: "tabler:tool",
    },
    {
      title: "100% Virgin Polymer",
      detail: "Certified food-safe & non-toxic",
      description: "Zero regrind or filler contamination, providing superior drop impact resistance and puncture strength.",
      icon: "tabler:shield-check",
    },
    {
      title: "In-House Label & IML",
      detail: "High-definition vibrant branding",
      description: "High-resolution screen, heat-transfer, and in-mould labelling printed directly on the production line.",
      icon: "tabler:palette",
    },
    {
      title: "Direct Factory Dispatch",
      detail: "Synchronized logistics supply",
      description: "Palletized, shrink-wrapped batch shipments timed precisely to your plant's filling schedules.",
      icon: "tabler:truck-delivery",
    },
  ];

  return (
    <section className="relative bg-white py-16 lg:py-24">
      <div className="shell relative z-10">
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Pure Image stretched to fill full height of content */}
          <div className="flex flex-col lg:col-span-5">
            <Reveal className="h-full w-full">
              <div className="relative h-full min-h-[380px] w-full overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-100 shadow-md">
                <Image
                  src="/images/facility/machinery-01.jpg"
                  alt="Precision injection moulding facility at ASIR Containers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </Reveal>
          </div>

          {/* Right Column: Clean Typography, Stats, and Minimal Feature List */}
          <div className="lg:col-span-7">
            <Reveal>
              {/* Header Label */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                <span className="h-[1px] w-6 bg-slate-300" />
                <span className="font-mono font-bold text-brand">04</span>
                <span className="text-slate-800">WHY CHOOSE US</span>
              </div>

              <h2 className="mt-3.5 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-[40px] lg:leading-[1.18]">
                Engineered advantages that protect your bottom line.
              </h2>

              <p className="mt-3.5 text-[15px] leading-relaxed text-slate-600 sm:text-base">
                Four fundamental manufacturing disciplines industrial buyers trust for uninterrupted supply and zero leakage.
              </p>

              {/* 2 Clean Stat Highlights */}
              <div className="mt-7 flex items-center gap-10 border-y border-slate-100 py-5">
                <div>
                  <div className="font-display text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">
                    99.8%
                  </div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Seal Integrity
                  </div>
                  <p className="text-xs text-slate-500">Drop-tested leak-free</p>
                </div>
                <div className="h-10 w-[1px] bg-slate-200" />
                <div>
                  <div className="font-display text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">
                    100%
                  </div>
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Virgin Polymer
                  </div>
                  <p className="text-xs text-slate-500">Prime food-grade PP</p>
                </div>
              </div>

              {/* 4 Essential Capabilities List (Clean minimal cards with hover) */}
              <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {points.map((pt) => (
                  <div
                    key={pt.title}
                    className="group relative flex items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all duration-300 hover:border-brand/40 hover:bg-white hover:shadow-xs"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-700 shadow-xs border border-slate-200/60 transition-colors group-hover:bg-brand group-hover:text-white group-hover:border-transparent">
                      <Icon icon={pt.icon} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-[15px] font-bold text-slate-900 transition-colors group-hover:text-brand">
                        {pt.title}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-slate-500">
                        {pt.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Link */}
              <div className="mt-8">
                <Link
                  href="/products#range"
                  className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-xs font-bold text-white shadow-xs transition-all hover:bg-brand hover:shadow-md"
                >
                  <span>Explore Container Catalog</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
