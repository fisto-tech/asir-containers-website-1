"use client";

import Image from "next/image";
import {
  CheckCircle2,
  CircleDot,
  Factory,
  Globe2,
  Layers,
  Leaf,
  Pipette,
  Radio,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const accessoriesList = [
  {
    name: "Lids",
    icon: CircleDot,
    iconColor: "text-red-500 bg-red-50 ring-red-100",
  },
  {
    name: "Seals & Gaskets",
    icon: ShieldCheck,
    iconColor: "text-emerald-500 bg-emerald-50 ring-emerald-100",
  },
  {
    name: "Handles",
    icon: Radio,
    iconColor: "text-orange-500 bg-orange-50 ring-orange-100",
  },
  {
    name: "Caps & Closures",
    icon: Layers,
    iconColor: "text-blue-500 bg-blue-50 ring-blue-100",
  },
  {
    name: "Spouts & Taps",
    icon: Pipette,
    iconColor: "text-purple-500 bg-purple-50 ring-purple-100",
  },
  {
    name: "Custom Accessories",
    icon: Wrench,
    iconColor: "text-violet-500 bg-violet-50 ring-violet-100",
  },
];

const stats = [
  {
    value: "99.9%",
    label: "Uptime",
    icon: CheckCircle2,
    iconColor: "text-brand bg-red-50 ring-red-100",
  },
  {
    value: "24/7",
    label: "Operations",
    icon: Leaf,
    iconColor: "text-emerald-600 bg-emerald-50 ring-emerald-100",
  },
  {
    value: "Single",
    label: "Facility",
    icon: Factory,
    iconColor: "text-purple-600 bg-purple-50 ring-purple-100",
  },
  {
    value: "Global",
    label: "Standards",
    icon: Globe2,
    iconColor: "text-blue-600 bg-blue-50 ring-blue-100",
  },
];

export function AccessoriesSection() {
  return (
    <section className="bg-white py-14 lg:py-20 border-b border-line/60">
      <div className="shell">
        {/* Main Content: Image & Checklist without outer card wrapping */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Image & Caption */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200/80">
              <Image
                src="/images/technologies/technology-accessories.webp"
                alt="Asir containers accessories collection: lids, handles, seals and spouts"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

          </div>

          {/* Right: Accessories Header & 6 Categories */}
          <div className="lg:col-span-6 flex flex-col">
            <h2 className="font-display text-[2.2rem] sm:text-[2.75rem] font-bold text-ink tracking-tight leading-tight">
              Accessories
            </h2>
            <p className="mt-2.5 text-[15px] sm:text-[16px] leading-relaxed text-slate-600 max-w-lg">
              A complete range of accessories to enhance functionality, safety and brand value.
            </p>

            {/* 6 Accessories grid (2 columns) */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {accessoriesList.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-3.5 py-1"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 shadow-xs ${item.iconColor}`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="font-display text-[15px] font-bold text-ink">
                      {item.name}
                    </span>
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
