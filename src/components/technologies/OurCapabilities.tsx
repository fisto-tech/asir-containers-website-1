"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Bot, Droplets, Printer } from "lucide-react";
import { useScrollReveal } from "@/lib/animations";

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
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  return (
    <section ref={root} className="bg-white py-14 lg:py-20 border-b border-line/60">
      <div className="shell">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 pb-8 lg:pb-10">
          <div data-reveal data-reveal-dir="left" data-reveal-delay="0.1">
            <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold text-ink tracking-tight">
              Our Capabilities
            </h2>
          </div>
          <div data-reveal data-reveal-dir="right" data-reveal-delay="0.15">
            <Link
              href="/about"
              className="group inline-flex items-center gap-1.5 text-[14.5px] sm:text-[15px] font-semibold text-brand hover:text-brand-dark transition-colors"
            >
              <span>View facility</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* 4 Cards Grid with Bidirectional Staggered Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                data-reveal
                data-reveal-dir="scale"
                data-reveal-delay={(0.18 + idx * 0.08).toFixed(2)}
                className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:-translate-y-1"
              >
                {/* Card Top Image */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={cap.image}
                    alt={cap.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                  />
                </div>

                {/* Card Bottom: Floating Overlapping Icon Badge + Title + Arrow */}
                <div className="relative flex items-center justify-between pt-1 px-1 pb-1">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Circular double-ring badge straddling the image border */}
                    <span
                      className={`relative -mt-6 z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-4 ring-white shadow-md transition-transform duration-300 group-hover:scale-105 ${cap.iconColor}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-[15px] font-bold text-ink truncate group-hover:text-brand transition-colors pt-1.5">
                      {cap.title}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform duration-300 group-hover:translate-x-1 ml-2 pt-1.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
