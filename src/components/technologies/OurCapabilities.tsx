"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Bot, Droplets, Printer } from "lucide-react";

const capabilities = [
  {
    title: "Injection Moulding",
    image: "/images/technologies/capability-injection-moulding.webp",
    alt: "Precision multi-cavity injection moulding tooling",
    icon: Box,
    iconColor: "text-brand bg-red-50 ring-red-100",
    href: "/contact",
  },
  {
    title: "In-Mould Labelling",
    image: "/images/technologies/capability-in-mould-labelling.webp",
    alt: "High-speed robotic arm fusing label into mould",
    icon: Bot,
    iconColor: "text-blue-600 bg-blue-50 ring-blue-100",
    href: "/contact",
  },
  {
    title: "Heat Transfer Labelling",
    image: "/images/technologies/capability-heat-transfer.webp",
    alt: "Industrial heat transfer labelling application on plastic container",
    icon: Droplets,
    iconColor: "text-emerald-600 bg-emerald-50 ring-emerald-100",
    href: "/contact",
  },
  {
    title: "Screen Printing",
    image: "/images/technologies/capability-screen-printing.webp",
    alt: "High-volume conveyor screen printing line",
    icon: Printer,
    iconColor: "text-orange-600 bg-orange-50 ring-orange-100",
    href: "/contact",
  },
];

export function OurCapabilities() {
  return (
    <section className="bg-white py-14 lg:py-20 border-b border-line/60">
      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 lg:pb-10">
          <div>
            <h2 className="font-display text-[2.2rem] sm:text-[2.6rem] font-bold text-ink tracking-tight">
              Our Capabilities
            </h2>
          </div>
          <Link
            href="/about"
            className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:text-brand-dark transition-colors"
          >
            <span>View facility</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
              >
                {/* Card Top Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={cap.image}
                    alt={cap.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                  />
                </div>

                {/* Card Bottom: Icon + Title + Arrow */}
                <div className="flex items-center justify-between pt-4 px-1 pb-1">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1 shadow-xs ${cap.iconColor}`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-display text-[15px] font-bold text-ink truncate group-hover:text-brand transition-colors">
                      {cap.title}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-1 ml-2" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
