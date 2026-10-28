"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { type Application } from "@/data/products";
import { SectionLabel } from "@/components/ui/SectionLabel";

type ProductApplicationsShowcaseProps = {
  applications: Application[];
  productName: string;
};

export function ProductApplicationsShowcase({
  applications,
  productName,
}: ProductApplicationsShowcaseProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotating timer (continuously updating)
  useEffect(() => {
    if (applications.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % applications.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [applications.length, isPaused]);

  if (!applications.length) return null;

  const currentApp = applications[activeIdx] ?? applications[0];

  return (
    <section className="border-t border-line/60 bg-soft/40 py-16 lg:py-20">
      <div className="shell">
        <div className="mb-8">
          <SectionLabel index="02">Applications</SectionLabel>
          <h2 className="display-md mt-2 text-ink">Where this container is used.</h2>
        </div>

        <div
          className="grid gap-6 lg:grid-cols-12 lg:gap-8 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left: Interactive Single Column Cards */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-3.5">
            {applications.map((app, index) => {
              const isActive = index === activeIdx;
              const formattedIndex = String(index + 1).padStart(2, "0");

              return (
                <div
                  key={app.slug}
                  onMouseEnter={() => setActiveIdx(index)}
                  onClick={() => setActiveIdx(index)}
                  className={`group relative flex cursor-pointer flex-col justify-between rounded-xl px-5 py-4 transition-all duration-300 select-none ${
                    isActive
                      ? "bg-brand text-white shadow-lg scale-[1.01]"
                      : "bg-white text-ink border border-line/80 hover:border-brand/40 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`text-[14px] font-bold tabular tracking-tight ${
                          isActive ? "text-white" : "text-brand"
                        }`}
                      >
                        {formattedIndex}
                      </span>
                      <span
                        className={`h-0.5 w-6 rounded-full transition-colors ${
                          isActive ? "bg-white/70" : "bg-brand/40"
                        }`}
                      />
                      <h3
                        className={`font-display text-[18px] font-bold tracking-tight transition-colors ${
                          isActive ? "text-white" : "text-ink"
                        }`}
                      >
                        {app.name} Industry
                      </h3>
                    </div>

                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full transition-colors ${
                        isActive ? "bg-white/20 text-white" : "bg-soft text-mid"
                      }`}
                    >
                      {app.slug}
                    </span>
                  </div>

                  {/* Active bottom indicator line for auto-progress */}
                  {isActive && (
                    <div className="mt-3.5 h-1 w-full overflow-hidden rounded-full bg-white/25">
                      <div
                        key={activeIdx}
                        className={`h-full bg-white rounded-full ${
                          !isPaused ? "animate-progress" : "w-full"
                        }`}
                        style={{
                          animationDuration: "3800ms",
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Plate: Synchronized High-Resolution Imagery */}
          <div className="lg:col-span-7 flex">
            <div className="relative w-full min-h-[360px] lg:min-h-[420px] overflow-hidden rounded-2xl border border-line bg-charcoal shadow-xl">
              {applications.map((app, index) => {
                const isCurrent = index === activeIdx;

                return (
                  <div
                    key={app.slug}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isCurrent
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-105 pointer-events-none"
                    }`}
                  >
                    <Image
                      src={app.image}
                      alt={app.imageAlt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover"
                    />

                    {/* Aesthetic gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                    {/* Clean minimal overlay info */}
                    <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white">
                      <div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-brand px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-white shadow-sm">
                          {app.slug}
                        </div>
                        <h4 className="mt-1.5 font-display text-[22px] font-bold tracking-tight text-white drop-shadow-md">
                          {app.name} Applications
                        </h4>
                      </div>

                      {/* Micro slide indicator dots */}
                      {applications.length > 1 && (
                        <div className="flex items-center gap-2 pb-1">
                          {applications.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              onClick={() => setActiveIdx(dotIdx)}
                              aria-label={`Go to application ${dotIdx + 1}`}
                              className={`h-2 transition-all rounded-full ${
                                dotIdx === activeIdx
                                  ? "w-6 bg-brand"
                                  : "w-2 bg-white/40 hover:bg-white/80"
                              }`}
                            />
                          ))}
                        </div>
                      )}
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
