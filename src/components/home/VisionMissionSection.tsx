import {
  ShieldCheck,
  Target,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  Gem,
  Award,
} from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Props = {
  index?: string;
};

export function VisionMissionSection({ index = "06" }: Props) {
  const pillars = [
    {
      title: "Precision Tooling",
      detail: "Mould geometries and locking ribs engineered to eliminate line spillage and lid deformities.",
      badge: "Mould Tech",
      color: "border-sky-200 bg-sky-50/50 text-sky-700",
      accent: "text-sky-600",
    },
    {
      title: "Material Integrity",
      detail: "100% prime food-grade and virgin industrial polypropylene formulations, never compromised.",
      badge: "Pure Polymer",
      color: "border-emerald-200 bg-emerald-50/50 text-emerald-700",
      accent: "text-emerald-600",
    },
    {
      title: "Integrated Decoration",
      detail: "In-house Screen, HTL, and IML printing to turn functional pails into shelf-ready brand assets.",
      badge: "In-House Print",
      color: "border-purple-200 bg-purple-50/50 text-purple-700",
      accent: "text-purple-600",
    },
    {
      title: "Batch Repeatability",
      detail: "Three-gate incoming, impression, and finished QC checks guaranteeing exact fit from first pail to millionth.",
      badge: "Zero Defect",
      color: "border-amber-200 bg-amber-50/50 text-amber-700",
      accent: "text-amber-600",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white py-20 lg:py-28">
      {/* Background ambient color spheres */}
      <div className="pointer-events-none absolute -top-24 right-10 h-80 w-80 rounded-full bg-indigo-100/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-10 h-80 w-80 rounded-full bg-teal-100/40 blur-3xl" />

      <div className="shell relative z-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel index={index}>Strategic Direction</SectionLabel>
              <h2 className="display-lg sheen-ink mt-5 text-ink">
                Vision &amp; Mission
              </h2>
            </div>
            <p className="max-w-md text-[14.5px] leading-relaxed text-slate-600">
              Guiding principles behind our moulding floor, tooling commitments, and lasting partnerships with industrial packaging leaders.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Vision Card — Regal Deep Indigo & Sapphire Palette */}
          <Reveal className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-indigo-200/90 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-8 text-white shadow-xl transition-all duration-500 hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-950/20 sm:p-10">
            {/* Ambient inner glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-md shadow-indigo-500/25 transition-transform duration-500 group-hover:scale-110">
                  <Compass className="h-7 w-7" />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-900/60 px-3.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-indigo-200 uppercase">
                  <Gem className="h-3 w-3 text-sky-400" />
                  Our Vision
                </span>
              </div>

              <div className="mt-8">
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-sky-400">
                  Strategic Horizon
                </span>
                <h3 className="display-sm mt-3 font-display font-semibold text-white">
                  To be India&apos;s benchmark for high-integrity rigid industrial packaging.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
                  Setting the industry standard for precision injection-moulded pails where zero leakage, flawless stack stability, and high-impact shelf aesthetics empower chemicals, paint, food, and lubricant manufacturers across nationwide supply chains.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-8 border-t border-indigo-800/60 pt-6">
              <p className="text-[13.5px] font-medium text-indigo-200 flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-sky-400 shrink-0" />
                Engineering packaging reliability that protects your product and builds brand equity.
              </p>
            </div>
          </Reveal>

          {/* Mission Card — Crisp Emerald & Teal Precision Palette */}
          <Reveal className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-teal-200/90 bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 p-8 text-white shadow-xl transition-all duration-500 hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-950/20 sm:p-10">
            {/* Ambient inner glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white shadow-md shadow-emerald-500/25 transition-transform duration-500 group-hover:scale-110">
                  <Target className="h-7 w-7" />
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/30 bg-teal-900/60 px-3.5 py-1 font-mono text-[11px] font-semibold tracking-wider text-teal-200 uppercase">
                  <Award className="h-3 w-3 text-emerald-400" />
                  Our Mission
                </span>
              </div>

              <div className="mt-8">
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-teal-400">
                  Execution Discipline
                </span>
                <h3 className="display-sm mt-3 font-display font-semibold text-white">
                  Consistently deliver zero-defect containers with speed, clarity, and precision.
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-slate-300">
                  We achieve this by uniting modern high-tonnage moulding cells, dedicated in-house multi-route container decoration, rigorous quality gates, and transparent code-based cataloguing so every order delivers exact performance on your filling lines.
                </p>
              </div>
            </div>

            <div className="relative z-10 mt-8 border-t border-teal-800/60 pt-6">
              <p className="text-[13.5px] font-medium text-teal-200 flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                Three-gate quality discipline from raw resin intake to final dispatch.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Commitment Banner / 4 Core Pillars with Color Highlights */}
        <Reveal className="mt-10 overflow-hidden rounded-[26px] border border-slate-200 bg-white p-7 sm:p-9 shadow-md">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {pillars.map((item, idx) => (
              <div key={item.title} className={`${idx !== 0 ? "pt-5 sm:pt-0 sm:pl-6" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className={`inline-block rounded-md border px-2.5 py-0.5 text-[11px] font-bold ${item.color}`}>
                    {item.badge}
                  </span>
                  <CheckCircle2 className={`h-4 w-4 ${item.accent}`} />
                </div>
                <h4 className="font-display mt-3 text-[16px] font-semibold text-ink">
                  {item.title}
                </h4>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center">
            <p className="text-[13.5px] font-medium text-slate-600">
              Want to review tooling specs, sample trial batches, or custom decoration proofs?
            </p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:shadow-md hover:scale-102"
            >
              Consult with our engineers
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
