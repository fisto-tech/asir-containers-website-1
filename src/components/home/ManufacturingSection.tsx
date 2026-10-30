"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedIcon, type IconMotion, type IconName } from "@/components/ui/AnimatedIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap, ScrollTrigger, useGSAP, revealLines, revealMasks, parallax, reduceMotion } from "@/lib/animations";
import { manufacturing } from "@/data/home";

const stepIcons: Record<string, IconName> = {
  tool: "tool",
  mould: "mould",
  lock: "lock",
  truck: "truck",
};

const stepMotions: Record<string, IconMotion> = {
  tool: "spin-slow",
  mould: "pulse",
  lock: "swing",
  truck: "travel",
};

const stepColorMap: Record<string, { iconBg: string; text: string; glow: string; badge: string }> = {
  "01": {
    iconBg: "bg-sky-500/15 border-sky-400/40 text-sky-400",
    text: "text-sky-400",
    glow: "hover:border-sky-400/50",
    badge: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  },
  "02": {
    iconBg: "bg-emerald-500/15 border-emerald-400/40 text-emerald-400",
    text: "text-emerald-400",
    glow: "hover:border-emerald-400/50",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  "03": {
    iconBg: "bg-amber-500/15 border-amber-400/40 text-amber-400",
    text: "text-amber-400",
    glow: "hover:border-amber-400/50",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  "04": {
    iconBg: "bg-rose-500/15 border-rose-400/40 text-rose-400",
    text: "text-rose-400",
    glow: "hover:border-rose-400/50",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  },
};

/**
 * Machinery & manufacturing — enriched dark stage with neon-precise industrial accents,
 * illuminated process timeline, and authentic engineering cues.
 */
export function ManufacturingSection() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const heading = root.current?.querySelector<HTMLElement>("[data-mfg-heading]");
      if (heading) revealLines(heading);
      revealMasks(root.current);

      const media = root.current?.querySelector<HTMLElement>("[data-mfg-media]");
      if (media) parallax(media, 60);

      if (reduceMotion()) return;

      const steps = gsap.utils.toArray<HTMLElement>("[data-mfg-step]");
      gsap.set(steps, { opacity: 0, y: 34 });
      const play = () =>
        gsap.to(steps, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", overwrite: "auto" });

      ScrollTrigger.create({
        trigger: "[data-mfg-steps]",
        start: "top 85%",
        end: "top 25%",
        invalidateOnRefresh: true,
        onEnter: play,
        onEnterBack: play,
        onLeaveBack: () => gsap.to(steps, { opacity: 0, y: 34, duration: 0.4, ease: "power2.in", overwrite: "auto" }),
      });
    },
    { scope: root },
  );

  return (
    <section id="manufacturing" ref={root} className="relative overflow-hidden bg-gradient-to-b from-[#0f1218] via-[#141923] to-[#0f1218] py-20 text-white lg:py-28">
      {/* Subtle colorful backlights */}
      <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="shell relative z-10">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index="05" tone="light">
              {manufacturing.eyebrow}
            </SectionLabel>
            <h2 data-mfg-heading className="display-lg mt-5 max-w-xl whitespace-pre-line text-white">
              {manufacturing.heading}
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-slate-300">{manufacturing.intro}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Tall stage image with illuminated border */}
          <div className="lg:col-span-5">
            <div className="group relative aspect-4/5 overflow-hidden rounded-[26px] border border-cyan-500/20 bg-[#161c28] shadow-2xl lg:aspect-3/4">
              <div data-mfg-media className="absolute inset-[-8%]" data-reveal-mask>
                <Image
                  src={manufacturing.image.src}
                  alt={manufacturing.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="ambient-media-slow object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105 opacity-90"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1218]/95 via-[#0f1218]/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <span
                  aria-hidden
                  className="mb-4 flex h-13 w-13 animate-[icon-pulse_4s_ease-in-out_infinite] items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                >
                  <AnimatedIcon name="mould" motion="none" className="h-6 w-6 text-white" />
                </span>
                <p className="font-display text-xl font-semibold leading-snug text-white">
                  Tooling, moulding and closures specified together.
                </p>
                <p className="mt-2 text-[13px] text-cyan-200/80">
                  Precision injection cell · 80T – 650T operational envelope.
                </p>
              </div>
            </div>
          </div>

          {/* Process timeline with colored nodes */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between border-b border-white/10 pb-3">
              <p className="text-[15px] font-semibold text-white">Precision Process Timeline</p>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3 py-0.5 font-mono text-[11px] font-bold text-cyan-300">
                04 STAGES IN-HOUSE
              </span>
            </div>

            <ol data-mfg-steps className="relative mt-2 pl-12">
              {/* Multicolored continuous gradient connecting rule */}
              <span
                aria-hidden
                className="absolute bottom-6 left-[19px] top-6 w-0.5 bg-gradient-to-b from-sky-400 via-emerald-400 to-rose-400 opacity-70"
              />

              {manufacturing.steps.map((step) => {
                const sc = stepColorMap[step.index] || {
                  iconBg: "bg-brand/15 border-brand/40 text-brand",
                  text: "text-brand",
                  glow: "hover:border-brand/50",
                  badge: "bg-brand/20 text-brand border-brand/30",
                };
                return (
                  <li key={step.index} data-mfg-step className="relative py-6">
                    <span
                      aria-hidden
                      className={`absolute -left-12 top-6 flex h-10 w-10 items-center justify-center rounded-full border shadow-md transition-all duration-300 ${sc.iconBg}`}
                    >
                      <AnimatedIcon
                        name={stepIcons[step.icon] ?? "pack"}
                        motion={stepMotions[step.icon] ?? "none"}
                        className={`h-5 w-5 ${sc.text}`}
                      />
                    </span>

                    <div className="flex items-baseline gap-3">
                      <span className={`tabular text-[12px] font-bold ${sc.text}`}>STAGE {step.index}</span>
                      <h3 className="font-display text-[21px] font-semibold text-white">{step.title}</h3>
                    </div>
                    <p className="mt-1.5 max-w-lg text-[14px] leading-relaxed text-slate-300">{step.body}</p>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link
                href="/manufacturing"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2.5 text-[14px] font-semibold text-white shadow-md shadow-cyan-600/20 transition-all duration-300 hover:shadow-cyan-600/35 hover:scale-102"
              >
                Explore all machineries &amp; capacity
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <p className="text-[13px] text-slate-400">
                Product code, capacity and closure confirmed before dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
