"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Bot, Factory, Flame, Printer, Sparkles, CheckCircle2 } from "lucide-react";
import { gsap, useGSAP, reduceMotion } from "@/lib/animations";

const routes = [
  {
    id: "moulding",
    title: "Injection Moulding",
    metric: "80T – 650T",
    icon: Factory,
    iconColor: "text-amber-500",
    iconBg: "bg-amber-50",
    summary: "Microprocessor-governed toggle injection presses producing seamless, impact-resistant pails.",
    image: "/images/facility/machinery-02.jpg",
    sampleImage: "/images/families/round-pail.jpg",
  },
  {
    id: "iml",
    title: "Robotic In-Mould Labelling",
    metric: "3-Cavity",
    icon: Bot,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    summary: "Fused polypropylene labels bonded directly during moulding for 100% peel-proof finish.",
    image: "/images/families/paint-pail.jpg",
    sampleImage: "/images/applications/food.webp",
  },
  {
    id: "htl",
    title: "Heat Transfer Labelling",
    metric: "4-Colour",
    icon: Flame,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50",
    summary: "Multi-colour thermal transfer delivering sharp gradients and rich, opaque prints.",
    image: "/images/hero/hero-03.jpg",
    sampleImage: "/images/applications/lube.jpg",
  },
  {
    id: "screen",
    title: "Screen Printing Line",
    metric: "6-Colour",
    icon: Printer,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-50",
    summary: "In-line flame pre-treatment and instant UV quartz curing built for chemical & solvent resilience.",
    image: "/images/facility/labelling.jpg",
    sampleImage: "/images/applications/agro.webp",
  },
];

export function MachineCards() {
  const [activeIdx, setActiveIdx] = useState(0);
  const root = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);

  const active = routes[activeIdx];

  const handleSelect = (idx: number) => {
    if (idx === activeIdx) return;
    if (reduceMotion()) {
      setActiveIdx(idx);
      return;
    }

    if (mediaRef.current) {
      gsap.fromTo(
        mediaRef.current,
        { opacity: 0.4, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }
      );
    }
    setActiveIdx(idx);
  };

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-white min-h-[60vh] max-h-[78vh] flex flex-col justify-center py-12 border-b border-slate-100"
      aria-labelledby="machinery-station-heading"
    >
      <div className="shell relative z-10">
        
        {/* Header with animated icon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#e51827]">
              <Sparkles className="h-3.5 w-3.5 animate-spin [animation-duration:5s]" />
              <span>Integrated Operations</span>
            </div>
            <h2
              id="machinery-station-heading"
              className="mt-2 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Moulding &amp; Printing Lines.
            </h2>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm max-w-sm">
            All four decoration and moulding operations are executed under one roof.
          </p>
        </div>

        {/* Content Split: Left Navigation / Right Dual Images */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: 4-Line Button Selector with dedicated animated icons */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-2.5">
            {routes.map((r, i) => {
              const isCur = i === activeIdx;
              const Icon = r.icon;

              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleSelect(i)}
                  className={`text-left p-4 rounded-2xl transition-all duration-200 border cursor-pointer flex items-start gap-3.5 ${
                    isCur
                      ? "bg-[#fafafa] border-[#e51827] shadow-sm"
                      : "bg-white border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                      isCur
                        ? `${r.iconBg} ${r.iconColor} scale-110 shadow-sm`
                        : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <p className={`font-display text-base font-bold ${isCur ? "text-slate-900" : "text-slate-600"}`}>
                        {r.title}
                      </p>
                      <span className="text-xs font-bold text-[#e51827]">
                        {r.metric}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {r.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Dual Visual Showcase */}
          <div ref={mediaRef} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            {/* Primary Machinery Image */}
            <div className="sm:col-span-8 relative min-h-[260px] lg:min-h-[380px] rounded-[28px] overflow-hidden shadow-lg group">
              <Image
                src={active.image}
                alt={active.title}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-amber-300 font-bold">Active Machine Route</p>
                  <p className="font-display font-bold text-xl">{active.title}</p>
                </div>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  100% In-House
                </span>
              </div>
            </div>

            {/* Secondary Product Output Image */}
            <div className="sm:col-span-4 relative min-h-[140px] lg:min-h-[380px] rounded-[28px] overflow-hidden shadow-md group">
              <Image
                src={active.sampleImage}
                alt={`${active.title} sample`}
                fill
                sizes="(max-width: 1024px) 100vw, 22vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-xs uppercase text-emerald-300 font-bold">Finished Format</p>
                <p className="font-display font-semibold text-sm">Industrial Grade</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
