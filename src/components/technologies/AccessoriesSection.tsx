"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  CircleDot,
  Layers,
  Pipette,
  Radio,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useScrollReveal } from "@/lib/animations";

const accessoriesList = [
  {
    name: "Lids",
    desc: "Tamper-evident, snap-lock & threaded options",
    icon: CircleDot,
    iconColor: "text-red-500 bg-red-50 ring-red-100",
  },
  {
    name: "Seals & Gaskets",
    desc: "EPDM and polyurethane hermetic seal lines",
    icon: ShieldCheck,
    iconColor: "text-emerald-500 bg-emerald-50 ring-emerald-100",
  },
  {
    name: "Handles",
    desc: "High-tensile wire bails and ergonomic plastic",
    icon: Radio,
    iconColor: "text-orange-500 bg-orange-50 ring-orange-100",
  },
  {
    name: "Caps & Closures",
    desc: "Flex-spouts, vented caps and pour apertures",
    icon: Layers,
    iconColor: "text-blue-500 bg-blue-50 ring-blue-100",
  },
  {
    name: "Spouts & Taps",
    desc: "Precision dispensing spouts for chemicals & agro",
    icon: Pipette,
    iconColor: "text-purple-500 bg-purple-50 ring-purple-100",
  },
  {
    name: "Custom Accessories",
    desc: "Tailored mould tooling for bespoke formats",
    icon: Wrench,
    iconColor: "text-violet-500 bg-violet-50 ring-violet-100",
  },
];

export function AccessoriesSection() {
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section ref={root} className="bg-slate-50/70 py-14 lg:py-20 border-b border-line/60">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Image with Directional Left Reveal */}
          <div className="lg:col-span-6 flex flex-col">
            <div
              data-reveal
              data-reveal-dir="scale"
              data-reveal-delay="0.15"
              className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200/80 transition-all duration-500 hover:shadow-md"
            >
              <Image
                src="/images/technologies/technology-accessories.webp"
                alt="Asir containers accessories collection: lids, handles, seals and spouts"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Title, Subtitle & 6 Accessories Checklist */}
          <div className="lg:col-span-6 flex flex-col">
            <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
              <h2 className="font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extrabold text-ink tracking-tight leading-tight">
                Accessories
              </h2>
            </div>

            <div data-reveal data-reveal-dir="up" data-reveal-delay="0.18">
              <p className="mt-2 text-[14.5px] sm:text-[15.5px] leading-relaxed text-slate-600 max-w-lg">
                A complete range of accessories to enhance functionality, safety and brand value.
              </p>
            </div>

            {/* 6 Accessories grid (2 columns) with Staggered Two-Way Entrance */}
            <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {accessoriesList.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    data-reveal
                    data-reveal-dir="up"
                    data-reveal-delay={(0.22 + idx * 0.06).toFixed(2)}
                    className="flex items-start gap-3.5 py-1.5 transition-transform duration-200 hover:translate-x-1"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 shadow-xs mt-0.5 ${item.iconColor}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <span className="font-display text-[15px] font-bold text-ink block leading-snug">
                        {item.name}
                      </span>
                      <span className="text-[12px] text-slate-500 block leading-tight mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
