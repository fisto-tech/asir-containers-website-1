"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Settings, 
  Layers, 
  ShieldCheck, 
  Play, 
  ArrowRight,
  TrendingUp,
  Droplet,
  ArrowUpRight
} from "lucide-react";
import { VideoModal } from "@/components/ui/VideoModal";

// Top 3 feature pill metrics
const keyMetrics = [
  {
    icon: Settings,
    title: "Precision equipment",
    desc: "Modern, well-maintained lines",
  },
  {
    icon: Layers,
    title: "Consistent quality",
    desc: "Repeatable, reliable output",
  },
  {
    icon: ShieldCheck,
    title: "Production ready scale",
    desc: "From short runs to high volume",
  },
];

// 4 Precision Timeline Steps
const processTimeline = [
  {
    step: "01",
    numBg: "bg-[#0070f3] text-white",
    iconBg: "bg-[#0070f3]/10 text-[#0070f3] border-[#0070f3]/25",
    connectorColor: "bg-[#00d084]",
    title: "Tooling & format",
    desc: "Every format starts with its mould — body and closure tooled as one assembly.",
    tag1: "Tool design",
    tag2: "& engineering",
    img: "/images/process/step-1.png",
    href: "/process#tooling",
  },
  {
    step: "02",
    numBg: "bg-[#00d084] text-white",
    iconBg: "bg-[#00d084]/10 text-[#00d084] border-[#00d084]/25",
    connectorColor: "bg-[#ffb020]",
    title: "Injection moulding",
    desc: "Moulded to the capacity the format calls for, in the application's colours.",
    tag1: "High-precision",
    tag2: "moulding",
    img: "/images/process/step-2.png",
    href: "/process#moulding",
  },
  {
    step: "03",
    numBg: "bg-[#ffb020] text-white",
    iconBg: "bg-[#ffb020]/10 text-[#ffb020] border-[#ffb020]/25",
    connectorColor: "bg-[#ff3b30]",
    title: "Closures & finish",
    desc: "Plain and Tin/Sp. variants are lidded before dispatch — flat, Tind, interlock or outer lock.",
    tag1: "Multiple closure",
    tag2: "options",
    img: "/images/process/step-3.png",
    href: "/process#closures",
  },
  {
    step: "04",
    numBg: "bg-[#ff3b30] text-white",
    iconBg: "bg-[#ff3b30]/10 text-[#ff3b30] border-[#ff3b30]/25",
    connectorColor: "bg-transparent",
    title: "Batch & dispatch",
    desc: "Packed by product code and colour, so delivery matches the purchase order.",
    tag1: "Packed &",
    tag2: "ready to ship",
    img: "/images/process/step-4.png",
    href: "/process#dispatch",
  },
];

// SVG line icons for timeline
function ChartBoxIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 16V12" />
      <path d="M12 16V8" />
      <path d="M17 16V10" />
      <path d="M7 12l5-4 5 2" />
    </svg>
  );
}

function TrendingGraphIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m7 15 4-4 3 3 3-4" />
      <path d="M7 18h10" />
    </svg>
  );
}

function LockOutlineIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="11" x="4" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1" />
    </svg>
  );
}

function BoxCubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21 8-9-5-9 5 9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="m12 13 9-5" />
      <path d="M12 13v8" />
      <path d="M12 13 3 8" />
    </svg>
  );
}

const stepIcons = [ChartBoxIcon, TrendingGraphIcon, LockOutlineIcon, BoxCubeIcon];

export function ManufacturingSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="machinery" className="relative bg-[#fcfdff] py-16 lg:py-24 overflow-hidden">
      {/* Light ambient atmosphere matching reference */}
      <div className="pointer-events-none absolute -left-20 top-0 h-[500px] w-[500px] rounded-full bg-blue-100/40 blur-[100px] -z-10" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[500px] w-[500px] rounded-full bg-sky-100/40 blur-[100px] -z-10" />

      <div className="shell relative z-10">
        {/* Top Header Row */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            {/* Section Index / Eyebrow */}
            <div className="flex items-center gap-2 text-[12.5px] font-bold tracking-[0.16em] uppercase text-brand">
              <span>05</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500 font-semibold">MACHINERY &amp; MANUFACTURING</span>
            </div>

            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[42px] lg:leading-[1.12]">
              Moulding discipline<br />behind every container<span className="text-[#0066f5]">.</span>
            </h2>

            <p className="mt-3 text-[14.5px] leading-relaxed text-slate-500 max-w-xl">
              Injection moulded pails, with the range organised around the tooling each format needs. Code, capacity and closure are specified together.
            </p>
          </div>

          {/* 3 Key Metrics Pills on Top Right */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-2">
            {keyMetrics.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50/80 border border-blue-100 text-[#0070f3] shadow-2xs">
                    <Icon className="h-5 w-5 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="text-[13.5px] font-bold leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="text-[12px] text-slate-400 font-medium">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Grid: Left Video Card + Right Timeline Card */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-stretch">
          
          {/* Left Column: Machinery Video Stage (5 cols) */}
          <div className="flex flex-col lg:col-span-5 justify-between">
            {/* Large Image Card with single crisp baked graphic */}
            <div className="group relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11] w-full overflow-hidden rounded-2xl shadow-xs border border-slate-150">
              <Image
                src="/images/facility/machinery-main.png"
                alt="Tooling, moulding and closures specified together - 80T - 650T operational envelope"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              />
              
              {/* Invisible/Subtle interactive click zone over the play button */}
              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                aria-label="Watch our process video"
                className="absolute inset-0 z-20 cursor-pointer focus:outline-none"
              />
            </div>

            {/* Bottom 3 Capability Callouts */}
            <div className="mt-5 grid grid-cols-3 divide-x divide-slate-100 rounded-xl border border-slate-200/70 bg-white py-3.5 px-2 shadow-2xs">
              {/* Callout 1: 80T - 650T */}
              <div className="flex items-center gap-2.5 px-3">
                <div className="text-slate-800 shrink-0">
                  <svg className="h-5 w-5 stroke-[1.8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-[13px] font-bold text-ink leading-tight">
                    80T – 650T
                  </div>
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">
                    OPERATIONAL ENVELOPE
                  </div>
                </div>
              </div>

              {/* Callout 2: MULTI-CAVITY */}
              <div className="flex items-center gap-2.5 px-3">
                <div className="text-[#0070f3] shrink-0">
                  <TrendingUp className="h-5 w-5 stroke-[2]" />
                </div>
                <div>
                  <div className="font-display text-[13px] font-bold text-ink leading-tight">
                    MULTI-CAVITY
                  </div>
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">
                    HIGH-VOLUME EFFICIENCY
                  </div>
                </div>
              </div>

              {/* Callout 3: COLOUR ACCURACY */}
              <div className="flex items-center gap-2.5 px-3">
                <div className="text-slate-800 shrink-0">
                  <Droplet className="h-5 w-5 stroke-[2]" />
                </div>
                <div>
                  <div className="font-display text-[13px] font-bold text-ink leading-tight">
                    COLOUR ACCURACY
                  </div>
                  <div className="text-[9.5px] uppercase font-bold tracking-wider text-slate-400">
                    CONSISTENT BATCHES
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Precision Process Timeline Card (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-7 shadow-xs lg:col-span-7">
            {/* Timeline Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-display text-[17px] font-bold text-ink tracking-tight">
                Precision Process Timeline
              </h3>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                FROM TOOLING TO DISPATCH
              </span>
            </div>

            {/* 4 Process Rows with Connected Timeline */}
            <div className="my-5 space-y-4">
              {processTimeline.map((item, idx) => {
                const Icon = stepIcons[idx];
                return (
                  <div key={item.step} className="relative flex items-center justify-between gap-3">
                    {/* Step Number + Continuous Connector Line */}
                    <div className="relative flex flex-col items-center shrink-0">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold font-mono shadow-xs ${item.numBg}`}>
                        {item.step}
                      </div>
                      {/* Vertical line connecting to next item */}
                      {idx < processTimeline.length - 1 && (
                        <span className={`absolute top-7 w-[2px] h-12 ${item.connectorColor}`} />
                      )}
                    </div>

                    {/* Step Icon circle */}
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-2xs ${item.iconBg}`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    {/* Content text */}
                    <div className="flex-1 min-w-0 pr-3">
                      <h4 className="font-display text-[14.5px] font-bold leading-tight text-ink">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 text-[12px] leading-relaxed text-slate-500 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>

                    {/* Image Preview & Action Pill */}
                    <Link
                      href={item.href}
                      className="group/pill flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 py-1 px-1.5 pr-2.5 transition-all duration-200 hover:border-brand/40 hover:bg-white hover:shadow-xs shrink-0 w-[190px]"
                    >
                      <div className="relative h-10 w-16 overflow-hidden rounded-lg bg-white shrink-0 border border-slate-100">
                        <Image
                          src={item.img}
                          alt={item.title}
                          fill
                          className="object-contain p-0.5 transition-transform duration-300 group-hover/pill:scale-105"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block text-[11px] font-medium text-slate-700 leading-tight">
                          {item.tag1}
                        </span>
                        <span className="block text-[11px] font-medium text-slate-700 leading-tight">
                          {item.tag2}
                        </span>
                      </div>
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-200 text-[#0070f3] group-hover/pill:border-brand group-hover/pill:text-brand transition-colors shrink-0">
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/pill:translate-x-0.5" />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Bottom Action Footer */}
            <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-100 pt-5">
              <Link
                href="/process"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#0066f5] px-6 py-3 text-[13px] font-bold text-white shadow-xs transition-all duration-200 hover:bg-blue-600 hover:shadow-md"
              >
                <span>Explore all machineries &amp; capacity</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <p className="text-[12px] text-slate-400 font-normal">
                Product code, capacity and closure confirmed before dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        open={videoOpen}
        onClose={() => setVideoOpen(false)}
        title="ASIR Containers — Precision Injection Moulding"
        videoSrc=""
        poster="/images/facility/machinery-main.png"
        fallback={
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-brand">
              <Play className="h-6 w-6 fill-current ml-0.5" />
            </div>
            <h4 className="mt-4 font-display text-lg font-bold text-ink">
              Moulding Facility Video Preview
            </h4>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Interactive video tour of our Sivakasi injection facility, automated tooling lines, and quality testing lab.
            </p>
          </div>
        }
      />
    </section>
  );
}
