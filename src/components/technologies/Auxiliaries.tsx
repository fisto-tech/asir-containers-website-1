"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  Activity,
  Droplets,
  Recycle,
  Snowflake,
  SunMedium,
  Thermometer,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Counter } from "@/components/ui/Counter";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "@/lib/animations";
import { machinery } from "@/data/manufacturing";

const icons: Record<string, { icon: LucideIcon; color: string; bg: string; anim: string }> = {
  "Chilling plant": { icon: Snowflake, color: "text-sky-500", bg: "bg-sky-50", anim: "animate-spin [animation-duration:12s]" },
  "Hopper dryers": { icon: SunMedium, color: "text-amber-500", bg: "bg-amber-50", anim: "animate-pulse" },
  "Mould temperature controllers": { icon: Thermometer, color: "text-rose-500", bg: "bg-rose-50", anim: "animate-bounce [animation-duration:3s]" },
  Granulators: { icon: Recycle, color: "text-emerald-500", bg: "bg-emerald-50", anim: "animate-spin [animation-duration:8s]" },
  "Air compressors": { icon: Wind, color: "text-indigo-500", bg: "bg-indigo-50", anim: "animate-pulse [animation-duration:2s]" },
  "Cooling tower": { icon: Droplets, color: "text-blue-500", bg: "bg-blue-50", anim: "animate-bounce [animation-duration:2.5s]" },
};

const countOf = (capacity: string) => Number(capacity.match(/\d+/)?.[0] ?? 0);
const unitOf = (capacity: string) => capacity.replace(/[\d\s]/g, "");

export function Auxiliaries() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope || reduceMotion()) return;

      const media = scope.querySelector<HTMLElement>("[data-aux-media]");
      if (media) {
        gsap.fromTo(
          media,
          { clipPath: "inset(0% 10% 0% 10%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: media,
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
      aria-labelledby="auxiliaries-heading"
    >
      <div className="shell relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Dual Visual Plate */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div
              data-aux-media
              className="sm:col-span-8 relative h-[260px] sm:h-[340px] lg:h-[380px] rounded-[28px] overflow-hidden shadow-lg group"
            >
              <Image
                src="/images/facility/dispatch.jpg"
                alt="Plant dispatch floor"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 text-white flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <div>
                  <p className="text-xs uppercase text-emerald-400 font-bold">24/7 Redundant Telemetry</p>
                  <p className="font-display font-bold text-lg">Automated Auxiliary Network</p>
                </div>
              </div>
            </div>

            <div className="sm:col-span-4 relative h-[140px] sm:h-[340px] lg:h-[380px] rounded-[28px] overflow-hidden shadow-md group">
              <Image
                src="/images/detail/stacked-pails.jpg"
                alt="Finished packaged containers"
                fill
                sizes="(max-width: 1024px) 100vw, 20vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/30 flex items-end p-4 text-white">
                <p className="text-xs font-semibold">Zero Thermal Drift</p>
              </div>
            </div>
          </div>

          {/* Right: Clean Natural Ledger with active running icon animations */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#059669]">
              <Activity className="h-3.5 w-3.5 animate-pulse text-[#059669]" />
              <span>Plant Infrastructure</span>
            </div>

            <h2
              id="auxiliaries-heading"
              className="mt-2 font-display text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Continuous Plant Support.
            </h2>

            <p className="mt-3 text-slate-600 text-sm leading-relaxed max-w-lg">
              Closed-circuit chilling, automated dehumidifying hopper dryers, and mould temperature regulators maintain uninterrupted operational stability.
            </p>

            {/* Clean Line-Item Ledger with animated icon badges */}
            <div className="mt-6 border-t border-b border-slate-200 divide-y divide-slate-100">
              {machinery.auxiliaries.rows.map((row) => {
                const conf = icons[row.name] ?? {
                  icon: Droplets,
                  color: "text-blue-500",
                  bg: "bg-blue-50",
                  anim: "animate-pulse",
                };
                const Icon = conf.icon;

                return (
                  <div
                    key={row.name}
                    className="flex items-center justify-between py-2.5 px-1 hover:bg-white transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${conf.bg} ${conf.color}`}>
                        <Icon className={`h-4 w-4 ${conf.anim}`} />
                      </span>
                      <span className="font-display text-sm font-semibold text-slate-800">
                        {row.name}
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 font-display">
                      <Counter
                        value={countOf(row.capacity)}
                        className="text-base font-bold text-slate-900"
                      />
                      <span className="text-xs text-slate-400 font-medium">
                        {unitOf(row.capacity)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-4 text-xs font-medium text-emerald-700 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              All 24 secondary support units operating at 99.9% uptime.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
