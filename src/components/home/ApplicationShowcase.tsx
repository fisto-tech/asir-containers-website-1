"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedIcon, applicationIcons, type IconMotion } from "@/components/ui/AnimatedIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { reduceMotion, useScrollReveal } from "@/lib/animations";
import { applications, applicationCount, rangeStats } from "@/data/products";

const motions: Record<string, IconMotion> = {
  paint: "swing",
  agro: "float",
  food: "pulse",
  lube: "float",
};

const CYCLE = 5600;

/**
 * Applications: four rounded image panels that widen on hover. The active panel
 * advances on its own so the group always reads as live; hovering pauses the
 * cycle and hands control to the pointer.
 */
export function ApplicationShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLElement | null>(null);
  useScrollReveal(root);

  useEffect(() => {
    if (paused || reduceMotion()) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % applications.length),
      CYCLE,
    );
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section ref={root} className="bg-white py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-8 border-b border-line pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="03" reveal>
              Applications
            </SectionLabel>
            <h2 className="display-lg sheen-ink mt-5 text-ink" data-reveal="letters">
              Four applications.
              <br />
              One range.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-relaxed text-mid" data-reveal>
              Filed under the applications the product table marks for it. Open one for its
              pack sizes, codes and closures.
            </p>
            <Link
              href="/products"
              className="group mt-5 inline-flex items-center gap-2 text-[15px] font-medium text-ink transition-colors hover:text-brand"
              data-reveal
            >
              All {rangeStats.products} containers
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Desktop: widening panels */}
        <div
          className="mt-10 hidden gap-4 lg:flex lg:h-[520px]"
          data-reveal
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          {applications.map((application, index) => {
            const isActive = index === active;
            const count = applicationCount(application.slug);
            return (
              <Link
                key={application.slug}
                href={`/products?application=${application.slug}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                aria-label={`${application.name} — ${count} containers`}
                className={`group relative overflow-hidden rounded-[20px] bg-light transition-[flex-grow,filter] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive ? "grow-[2.7] basis-0" : "grow basis-0"
                }`}
              >
                <Image
                  src={application.image}
                  alt={application.imageAlt}
                  fill
                  sizes="(max-width: 1536px) 45vw, 620px"
                  className={`ambient-media-slow object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105 ${
                    isActive ? "opacity-100" : "opacity-80"
                  }`}
                />
                <span className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-ink via-ink/55 to-transparent" />

                <span
                  className={`absolute inset-x-0 bottom-0 flex items-center justify-between p-6 text-white transition-opacity duration-500 ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <AnimatedIcon
                      name={applicationIcons[application.slug]}
                      motion={motions[application.slug]}
                      className="h-5 w-5 text-brand"
                    />
                    <span className="text-[13px] font-semibold uppercase tracking-[0.18em] [writing-mode:vertical-rl] rotate-180">
                      {application.name}
                    </span>
                  </span>
                  <span className="tabular text-[13px] text-white">
                    {String(count).padStart(2, "0")}
                  </span>
                </span>

                {isActive && (
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] bg-white/25">
                    <span
                      key={`${active}-bar`}
                      className="ambient-progress block h-full bg-brand"
                      style={{ ["--ambient-duration" as string]: `${CYCLE}ms` }}
                    />
                  </span>
                )}

                <span
                  className={`absolute inset-x-0 bottom-0 p-8 pb-10 text-white transition-[opacity,transform] duration-[700ms] ${
                    isActive ? "translate-y-0 opacity-100 delay-150" : "translate-y-4 opacity-0"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <AnimatedIcon
                      name={applicationIcons[application.slug]}
                      motion={motions[application.slug]}
                      className="h-5 w-5 text-brand"
                    />
                    <span className="font-display text-3xl font-semibold">{application.name}</span>
                    <span className="tabular text-[13px] text-white">{count} containers</span>
                  </span>
                  <span className="mt-3 block max-w-sm text-[14px] leading-relaxed text-white/85">
                    {application.longBlurb}
                  </span>
                  <span className="mt-5 inline-flex items-center gap-2 border-b border-white/50 pb-1 text-[14px] font-medium">
                    View containers
                    <ArrowUpRight
                      aria-hidden
                      className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile: stacked images, text underneath */}
        <ul className="mt-8 space-y-8 lg:hidden">
          {applications.map((application) => {
            const count = applicationCount(application.slug);
            return (
              <li key={application.slug}>
                <Link href={`/products?application=${application.slug}`} className="group block">
                  <span className="relative block aspect-16/10 w-full overflow-hidden rounded-[16px] bg-light">
                    <Image
                      src={application.image}
                      alt={application.imageAlt}
                      fill
                      sizes="100vw"
                      className="ambient-media-slow object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
                    />
                    <span className="absolute inset-x-0 bottom-0 h-[75%] bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-white">
                      <span className="flex items-center gap-2.5">
                        <AnimatedIcon
                          name={applicationIcons[application.slug]}
                          motion={motions[application.slug]}
                          className="h-5 w-5 text-brand"
                        />
                        <span className="font-display text-xl font-semibold">
                          {application.name}
                        </span>
                      </span>
                      <span className="tabular text-[13px] text-white">{String(count).padStart(2, "0")}</span>
                    </span>
                  </span>
                  <span className="mt-3 flex items-start justify-between gap-4">
                    <span className="text-[14px] leading-relaxed text-mid">{application.blurb}</span>
                    <ArrowUpRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-ink" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
