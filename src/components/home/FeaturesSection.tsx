"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Reveal } from "@/components/motion/Reveal";

type FeatureItem = {
  title: string;
  subtitle: string;
  theme: {
    accentColor: string;
    iconBgFilled: string;
    iconColorFilled: string;
    iconColorOutline: string;
    borderColor: string;
  };
  icon: string;
};

const featuresList: FeatureItem[] = [
  {
    title: "Oven Safe",
    subtitle: "Microwave Friendly",
    theme: {
      accentColor: "#f43f5e",
      iconBgFilled: "bg-[#ffe5ea]",
      iconColorFilled: "text-[#f43f5e]",
      iconColorOutline: "text-[#f43f5e]",
      borderColor: "border-[#f43f5e]",
    },
    icon: "tabler:microwave",
  },
  {
    title: "Hygienic",
    subtitle: "Untouched by Hand",
    theme: {
      accentColor: "#10b981",
      iconBgFilled: "bg-[#dcfce7]",
      iconColorFilled: "text-[#10b981]",
      iconColorOutline: "text-[#10b981]",
      borderColor: "border-[#10b981]",
    },
    icon: "lucide:shield-check",
  },
  {
    title: "Stackable",
    subtitle: "Compact Storage",
    theme: {
      accentColor: "#2563eb",
      iconBgFilled: "bg-[#dbeafe]",
      iconColorFilled: "text-[#2563eb]",
      iconColorOutline: "text-[#2563eb]",
      borderColor: "border-[#2563eb]",
    },
    icon: "fluent:stack-24-regular",
  },
  {
    title: "BPA Free",
    subtitle: "100% Non-Toxic",
    theme: {
      accentColor: "#f97316",
      iconBgFilled: "bg-[#ffedd5]",
      iconColorFilled: "text-[#f97316]",
      iconColorOutline: "text-[#f97316]",
      borderColor: "border-[#f97316]",
    },
    icon: "tabler:leaf",
  },
  {
    title: "Food Safe",
    subtitle: "Food Grade Certified",
    theme: {
      accentColor: "#9333ea",
      iconBgFilled: "bg-[#f3e8ff]",
      iconColorFilled: "text-[#9333ea]",
      iconColorOutline: "text-[#9333ea]",
      borderColor: "border-[#9333ea]",
    },
    icon: "tabler:tools-kitchen-2",
  },
  {
    title: "Freezer Safe",
    subtitle: "Freezer Proof",
    theme: {
      accentColor: "#0284c7",
      iconBgFilled: "bg-[#e0f2fe]",
      iconColorFilled: "text-[#0284c7]",
      iconColorOutline: "text-[#0284c7]",
      borderColor: "border-[#0284c7]",
    },
    icon: "tabler:snowflake",
  },
  {
    title: "Recyclable",
    subtitle: "Eco & Sustainable",
    theme: {
      accentColor: "#059669",
      iconBgFilled: "bg-[#d1fae5]",
      iconColorFilled: "text-[#059669]",
      iconColorOutline: "text-[#059669]",
      borderColor: "border-[#059669]",
    },
    icon: "tabler:recycle",
  },
  {
    title: "Printable",
    subtitle: "Custom Branding",
    theme: {
      accentColor: "#d97706",
      iconBgFilled: "bg-[#fef3c7]",
      iconColorFilled: "text-[#d97706]",
      iconColorOutline: "text-[#d97706]",
      borderColor: "border-[#d97706]",
    },
    icon: "tabler:box",
  },
];

type Props = {
  index?: string;
};

export function FeaturesSection({ index = "02" }: Props) {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Auto-cycle through cards every 2.4 seconds, pausing when user hovers
  useEffect(() => {
    if (hoveredIdx !== null) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % featuresList.length);
    }, 2400);

    return () => clearInterval(timer);
  }, [hoveredIdx]);

  return (
    <section className="relative bg-white py-16 lg:py-24 border-b border-slate-100/80">
      <div className="shell relative z-10">
        {/* Header */}
        <Reveal>
          <div data-reveal data-reveal-dir="down" data-reveal-delay="0.1" className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="font-display text-[2.5rem] font-bold tracking-tight text-slate-900 sm:text-[3.25rem] lg:text-[3.5rem] leading-[1.06]">
              Product Features
            </h2>
            <p className="mt-3.5 text-[15.5px] font-medium leading-relaxed text-slate-500 sm:text-[16.5px]">
              Thoughtfully designed for safer, cleaner and more convenient storage.
            </p>
          </div>
        </Reveal>

        {/* 4x2 Horizontal Pill Card Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {featuresList.map((item, idx) => {
            const t = item.theme;
            const isHighlighted = hoveredIdx !== null ? hoveredIdx === idx : activeIdx === idx;
            // Diverse directional reveals across the 4-column grid
            const cardDir = idx % 4 === 0 ? "left" : idx % 4 === 1 ? "scale" : idx % 4 === 2 ? "scale-rotate" : "right";

            return (
              <Reveal key={item.title}>
                <div
                  data-reveal
                  data-reveal-dir={cardDir}
                  data-reveal-delay={(0.06 * (idx % 4)).toFixed(2)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`group relative flex items-center overflow-hidden rounded-[28px] bg-white p-6 transition-all duration-300 ${
                    isHighlighted
                      ? "border-2 -translate-y-1 shadow-md"
                      : "border hover:border-2 hover:shadow-md"
                  }`}
                  style={{
                    borderColor: isHighlighted ? t.accentColor : `${t.accentColor}40`,
                  }}
                >
                  {/* Clean Sweeping Organic Wave in bottom-right corner - VISIBLE ONLY WHEN ACTIVE/HOVERED */}
                  <div
                    className={`pointer-events-none absolute -bottom-0.5 -right-0.5 h-36 w-44 overflow-hidden transition-all duration-500 ${
                      isHighlighted
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  >
                    <svg
                      viewBox="0 0 180 150"
                      className="h-full w-full"
                      fill="none"
                    >
                      {/* Outer clean pastel wave */}
                      <path
                        d="M0 150 C 40 130, 80 110, 105 75 C 130 40, 145 15, 180 0 L 180 150 Z"
                        fill={t.accentColor}
                        fillOpacity="0.16"
                      />
                      {/* Inner clean accent wave crest */}
                      <path
                        d="M45 150 C 75 135, 105 118, 125 90 C 145 62, 155 35, 180 10 L 180 150 Z"
                        fill={t.accentColor}
                        fillOpacity="0.24"
                      />
                    </svg>
                  </div>

                  {/* Content: Circle Icon Pod + Text */}
                  <div className="relative z-10 flex items-center gap-4.5">
                    {/* Circle Icon Badge */}
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isHighlighted
                          ? `${t.iconBgFilled} ${t.iconColorFilled} border-transparent scale-105`
                          : `bg-transparent ${t.iconColorOutline} border-current/25 group-hover:${t.iconBgFilled} group-hover:${t.iconColorFilled} group-hover:border-transparent group-hover:scale-105`
                      }`}
                    >
                      <Icon icon={item.icon} className="h-7 w-7 transition-colors duration-300" />
                    </div>


                    {/* Text block */}
                    <div className="text-left">
                      <h3
                        className={`font-display text-[17.5px] font-bold tracking-tight leading-snug transition-colors duration-300 ${
                          isHighlighted ? "text-slate-900" : "text-slate-800 group-hover:text-slate-900"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`mt-1 text-[13.5px] font-medium transition-colors duration-300 ${
                          isHighlighted ? "text-slate-600" : "text-slate-400 group-hover:text-slate-600"
                        }`}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}









