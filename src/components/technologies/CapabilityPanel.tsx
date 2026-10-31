"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Counter } from "@/components/ui/Counter";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "@/lib/animations";

export function CapabilityPanel() {
  const root = useRef<HTMLElement | null>(null);
  const [tonnage, setTonnage] = useState<number>(350);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope || reduceMotion()) return;

      const maskEl = scope.querySelector<HTMLElement>("[data-mask-cap]");
      if (maskEl) {
        gsap.fromTo(
          maskEl,
          { clipPath: "inset(0% 10% 0% 10%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: maskEl,
              start: "top 85%",
              end: "bottom 40%",
              scrub: 0.8,
            },
          }
        );
      }
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-[#fafafa] min-h-[60vh] max-h-[78vh] flex flex-col justify-center py-12 border-b border-slate-100"
      aria-labelledby="capability-heading"
    >
      <div className="shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Masked Facility Image Plate */}
          <div className="lg:col-span-6">
            <div
              data-mask-cap
              className="relative h-[300px] sm:h-[380px] lg:h-[420px] rounded-[32px] overflow-hidden shadow-xl group"
            >
              <Image
                src="/images/facility/machinery-02.jpg"
                alt="Injection press clamping unit"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-white flex justify-between items-end">
                <div>
                  <p className="text-xs uppercase text-amber-300 font-bold">Closed-Loop Precision</p>
                  <p className="font-display font-bold text-lg">Proportional Hydraulic Clamping</p>
                </div>
                <span className="text-xs font-semibold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
                  ±0.015mm
                </span>
              </div>
            </div>
          </div>

          {/* Right: Clean Interactive Tuner */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0284c7]">
              Clamping Envelope
            </span>

            <h2
              id="capability-heading"
              className="mt-2 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold tracking-tight text-slate-900 leading-[1.05]"
            >
              80 to 650 Tonnes Capacity.
            </h2>

            <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-lg">
              Equipped to produce everything from 500ml food tubs up to heavy-duty 25L chemical containers with complete leak-proof structural integrity.
            </p>

            {/* Slider Widget */}
            <div className="mt-6 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm">
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs font-bold uppercase text-slate-500">Selected Tonnage</span>
                <span className="font-display text-3xl font-extrabold text-slate-900">{tonnage} T</span>
              </div>

              <input
                type="range"
                min="80"
                max="650"
                step="10"
                value={tonnage}
                onChange={(e) => setTonnage(Number(e.target.value))}
                aria-label="Tonnage capacity slider"
                className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0284c7]"
              />

              <div className="flex justify-between text-xs text-slate-400 font-semibold mt-2">
                <span>80T Small Containers</span>
                <span>350T Pails</span>
                <span>650T Drums</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
