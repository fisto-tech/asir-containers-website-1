import {
  ShieldCheck,
  Target,
  Sparkles,
  Zap,
  Lock,
  Layers,
  ArrowRight,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type FeatureItem = {
  icon: LucideIcon;
  title: string;
  category: string;
  description: string;
  highlight: string;
  colorScheme: {
    bg: string;
    border: string;
    iconBg: string;
    iconColor: string;
    accent: string;
    pillBg: string;
    tagColor: string;
    gradient: string;
  };
};

const keyFeatures: FeatureItem[] = [
  {
    icon: Lock,
    title: "Triple Seal & Tamper Lock",
    category: "Closure Engineering",
    description: "Tear-tab lids, interlock and outer lock rim profiles that provide hermetic sealing against transport leaks and contamination.",
    highlight: "100% Spillage-Free",
    colorScheme: {
      bg: "bg-white",
      border: "border-sky-200/80 hover:border-sky-400",
      iconBg: "bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",
      iconColor: "text-sky-600",
      accent: "bg-sky-500",
      pillBg: "bg-sky-50/70 text-sky-700",
      tagColor: "text-sky-600",
      gradient: "from-sky-500/10 via-transparent to-transparent",
    },
  },
  {
    icon: Layers,
    title: "High Stacking Load Stability",
    category: "Structural Strength",
    description: "Reinforced load-bearing ribs and precision bottom-to-lid nesting geometries engineered for multi-tier warehouse palletizing.",
    highlight: "Optimized Palletizing",
    colorScheme: {
      bg: "bg-white",
      border: "border-indigo-200/80 hover:border-indigo-400",
      iconBg: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
      iconColor: "text-indigo-600",
      accent: "bg-indigo-500",
      pillBg: "bg-indigo-50/70 text-indigo-700",
      tagColor: "text-indigo-600",
      gradient: "from-indigo-500/10 via-transparent to-transparent",
    },
  },
  {
    icon: Sparkles,
    title: "In-House Multi-Route Printing",
    category: "Branding & Finish",
    description: "Up to 6-color direct screen printing, photorealistic Heat Transfer Labelling (HTL), and scratch-proof In-Mould Labelling (IML).",
    highlight: "Screen · HTL · IML",
    colorScheme: {
      bg: "bg-white",
      border: "border-rose-200/80 hover:border-rose-400",
      iconBg: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
      iconColor: "text-rose-600",
      accent: "bg-rose-500",
      pillBg: "bg-rose-50/70 text-rose-700",
      tagColor: "text-rose-600",
      gradient: "from-rose-500/10 via-transparent to-transparent",
    },
  },
  {
    icon: ShieldCheck,
    title: "100% Virgin Food-Grade Polymers",
    category: "Material Purity",
    description: "Formulated using certified prime virgin polypropylene, compliant with strict food contact and heavy chemical packaging mandates.",
    highlight: "Non-Toxic & Durable",
    colorScheme: {
      bg: "bg-white",
      border: "border-emerald-200/80 hover:border-emerald-400",
      iconBg: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
      iconColor: "text-emerald-600",
      accent: "bg-emerald-500",
      pillBg: "bg-emerald-50/70 text-emerald-700",
      tagColor: "text-emerald-600",
      gradient: "from-emerald-500/10 via-transparent to-transparent",
    },
  },
  {
    icon: Target,
    title: "Application-Tailored Colorways",
    category: "Application Ready",
    description: "Dedicated color lines: classic white, vivid red, and safety green for paint & lubricants, deep green for agro, and hygienic white/black for food.",
    highlight: "Paint · Agro · Food · Lube",
    colorScheme: {
      bg: "bg-white",
      border: "border-amber-200/80 hover:border-amber-400",
      iconBg: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
      iconColor: "text-amber-600",
      accent: "bg-amber-500",
      pillBg: "bg-amber-50/70 text-amber-700",
      tagColor: "text-amber-600",
      gradient: "from-amber-500/10 via-transparent to-transparent",
    },
  },
  {
    icon: Zap,
    title: "Code-Quoted Exact Specification",
    category: "Catalog Precision",
    description: "Every format holds a dedicated product code (Plain or Tin/Sp.). Capacity, wall gauge, and handle configuration strictly preserved.",
    highlight: "17 Packs · 26 Codes",
    colorScheme: {
      bg: "bg-white",
      border: "border-violet-200/80 hover:border-violet-400",
      iconBg: "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white",
      iconColor: "text-violet-600",
      accent: "bg-violet-500",
      pillBg: "bg-violet-50/70 text-violet-700",
      tagColor: "text-violet-600",
      gradient: "from-violet-500/10 via-transparent to-transparent",
    },
  },
];

type Props = {
  index?: string;
};

export function FeaturesSection({ index = "02" }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-sky-50/30 py-20 lg:py-28">
      {/* Dynamic ambient color glows in background */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-40 h-96 w-96 rounded-full bg-emerald-200/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-rose-200/25 blur-3xl" />

      <div className="shell relative z-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel index={index}>Features &amp; Highlights</SectionLabel>
              <h2 className="display-lg sheen-ink mt-5 max-w-2xl text-ink">
                Engineered for peak performance on modern filling lines.
              </h2>
            </div>
            <p className="max-w-md text-[14.5px] leading-relaxed text-mid">
              Explore key functional features built into every ASIR pail — from tamper-evident closure systems to high-impact decoration.
            </p>
          </div>
        </Reveal>

        {/* Feature Grid with Modern Colorful Industrial Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {keyFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            const cs = feature.colorScheme;
            return (
              <Reveal
                key={feature.title}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[24px] border ${cs.border} ${cs.bg} p-7 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5`}
              >
                {/* Subtle colorful top corner wash */}
                <div className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${cs.gradient} blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className={`flex h-13 w-13 items-center justify-center rounded-2xl ${cs.iconBg} shadow-xs transition-all duration-300 group-hover:scale-110`}>
                      <Icon className="h-6 w-6 transition-transform duration-300" />
                    </span>
                    <span className="font-mono text-[12px] font-bold tracking-wider text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="mt-6">
                    <span className={`text-[11.5px] font-bold uppercase tracking-[0.16em] ${cs.tagColor}`}>
                      {feature.category}
                    </span>
                    <h3 className="font-display text-[20px] font-semibold text-ink transition-colors group-hover:text-ink">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold ${cs.pillBg}`}>
                    <TrendingUp className="h-3.5 w-3.5" />
                    {feature.highlight}
                  </span>
                  <span className={`h-2 w-2 rounded-full ${cs.accent} opacity-0 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100`} />
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom CTA row with colorful border & accent */}
        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50/60 via-white to-indigo-50/50 px-6 py-4.5 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[14px] font-medium text-slate-700">
              Need custom drop-impact test ratings or specific neck diameter specifications?
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-brand hover:shadow-md"
          >
            Explore all 17 container models
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
