"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { AnimatedIcon, type IconMotion, type IconName } from "@/components/ui/AnimatedIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap, ScrollTrigger, useGSAP, revealLines, reduceMotion } from "@/lib/animations";
import { advantages } from "@/data/home";

const iconMap: Record<string, IconName> = {
  codes: "codes",
  finish: "finish",
  lock: "lock",
  scale: "scale",
  shapes: "shapes",
  palette: "palette",
};

const motionMap: Record<string, IconMotion> = {
  codes: "pulse",
  finish: "swing",
  lock: "swing",
  scale: "float",
  shapes: "spin-slow",
  palette: "float",
};

const tabThemes = [
  {
    name: "sky",
    color: "text-sky-600",
    bg: "bg-sky-500",
    disc: "bg-sky-50 text-sky-600 border border-sky-200/60",
    panelGradient: "from-sky-500/10 via-white to-transparent",
    accentBorder: "border-sky-300",
    glow: "bg-sky-400/15",
  },
  {
    name: "emerald",
    color: "text-emerald-600",
    bg: "bg-emerald-500",
    disc: "bg-emerald-50 text-emerald-600 border border-emerald-200/60",
    panelGradient: "from-emerald-500/10 via-white to-transparent",
    accentBorder: "border-emerald-300",
    glow: "bg-emerald-400/15",
  },
  {
    name: "indigo",
    color: "text-indigo-600",
    bg: "bg-indigo-500",
    disc: "bg-indigo-50 text-indigo-600 border border-indigo-200/60",
    panelGradient: "from-indigo-500/10 via-white to-transparent",
    accentBorder: "border-indigo-300",
    glow: "bg-indigo-400/15",
  },
  {
    name: "amber",
    color: "text-amber-600",
    bg: "bg-amber-500",
    disc: "bg-amber-50 text-amber-600 border border-amber-200/60",
    panelGradient: "from-amber-500/10 via-white to-transparent",
    accentBorder: "border-amber-300",
    glow: "bg-amber-400/15",
  },
  {
    name: "purple",
    color: "text-purple-600",
    bg: "bg-purple-500",
    disc: "bg-purple-50 text-purple-600 border border-purple-200/60",
    panelGradient: "from-purple-500/10 via-white to-transparent",
    accentBorder: "border-purple-300",
    glow: "bg-purple-400/15",
  },
  {
    name: "rose",
    color: "text-rose-600",
    bg: "bg-rose-500",
    disc: "bg-rose-50 text-rose-600 border border-rose-200/60",
    panelGradient: "from-rose-500/10 via-white to-transparent",
    accentBorder: "border-rose-300",
    glow: "bg-rose-400/15",
  },
];

/**
 * Why Choose Us — dynamic color-stepped tabs with fluid gradients and rich visual hierarchy.
 */
export function AdvantagesSection() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const heading = root.current?.querySelector<HTMLElement>("[data-adv-heading]");
      if (heading) revealLines(heading);
      if (reduceMotion()) return;

      const rows = gsap.utils.toArray<HTMLElement>("[data-adv-row]");
      gsap.set(rows, { opacity: 0, x: -22 });
      const play = () =>
        gsap.to(rows, { opacity: 1, x: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", overwrite: "auto" });

      ScrollTrigger.create({
        trigger: "[data-adv-list]",
        start: "top 85%",
        end: "top 25%",
        invalidateOnRefresh: true,
        onEnter: play,
        onEnterBack: play,
        onLeaveBack: () => gsap.to(rows, { opacity: 0, x: -22, duration: 0.4, ease: "power2.in", overwrite: "auto" }),
      });
    },
    { scope: root },
  );

  /* Each tab change re-plays the panel content. */
  useGSAP(
    () => {
      if (reduceMotion() || !panel.current) return;
      const items = panel.current.querySelectorAll("[data-panel-item]");
      gsap.fromTo(
        items,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "power3.out", overwrite: "auto" },
      );
    },
    { scope: panel, dependencies: [active] },
  );

  /* Slow autoplay so the group reads as live */
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || reduceMotion()) return;
    const id = window.setInterval(() => {
      setActive((index) => (index + 1) % advantages.length);
    }, 6200);
    return () => window.clearInterval(id);
  }, [paused]);

  const current = advantages[active];
  const theme = tabThemes[active % tabThemes.length];

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-white py-20 lg:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className={`pointer-events-none absolute -right-20 top-1/3 h-96 w-96 rounded-full ${theme.glow} blur-3xl transition-colors duration-700`} />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-blue-100/30 blur-3xl" />

      <div className="shell relative z-10">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index="04">Why choose us</SectionLabel>
            <h2 data-adv-heading className="display-lg sheen-ink mt-5 max-w-xl text-ink">
              Engineered advantages that protect your bottom line.
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-slate-600">
            Six practical reasons packaging managers and industrial buyers partner with ASIR Containers.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Tab rail with individual color dots & hover states */}
          <ul data-adv-list className="lg:col-span-5">
            {advantages.map((item, index) => {
              const isActive = index === active;
              const itemTheme = tabThemes[index % tabThemes.length];
              return (
                <li key={item.title} data-adv-row className="border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    aria-pressed={isActive}
                    className={`group flex w-full items-center gap-4 py-4.5 text-left transition-all duration-300 rounded-xl ${
                      isActive ? "pl-4 bg-white shadow-xs border border-slate-200/80" : "pl-1 hover:pl-3 hover:bg-slate-50/60"
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-500 ${
                        isActive ? `scale-125 ${itemTheme.bg}` : "bg-slate-300 group-hover:bg-slate-500"
                      }`}
                    />
                    <span
                      className={`flex-1 font-display text-[18.5px] font-semibold transition-colors duration-300 ${
                        isActive ? "text-ink" : "text-slate-600 group-hover:text-ink"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`tabular text-[12px] font-bold transition-colors duration-300 ${
                        isActive ? itemTheme.color : "text-slate-400"
                      }`}
                    >
                      0{index + 1}
                    </span>
                  </button>
                </li>
              );
            })}

            <li data-adv-row className="pt-6">
              <Link
                href="/products#range"
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-slate-900 transition-colors hover:text-brand"
              >
                Filter products by what you need
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          </ul>

          {/* Panel with dynamic color wash & vibrant badge */}
          <div ref={panel} className="lg:col-span-7">
            <div className={`relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[26px] border border-slate-200/90 bg-white p-8 shadow-lg transition-all duration-500 lg:p-10`}>
              {/* Dynamic top gradient wash based on active tab */}
              <div className={`pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gradient-to-br ${theme.panelGradient} blur-2xl transition-all duration-500`} />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span
                    data-panel-item
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-xs ${theme.disc} transition-all duration-500`}
                  >
                    <AnimatedIcon
                      name={iconMap[current.icon] ?? "pack"}
                      motion={motionMap[current.icon] ?? "float"}
                      className={`h-8 w-8 ${theme.color}`}
                    />
                  </span>
                  <span className={`rounded-full px-3 py-1 font-mono text-[11.5px] font-bold uppercase tracking-wider ${theme.color} bg-slate-50 border border-slate-200`}>
                    Key Advantage 0{active + 1}
                  </span>
                </div>

                <p
                  data-panel-item
                  className="mt-7 font-display text-[26px] font-semibold leading-tight text-ink lg:text-[32px]"
                >
                  {current.title}
                </p>

                <p data-panel-item className="mt-4 max-w-lg text-[16px] leading-relaxed text-slate-600">
                  {current.body}
                </p>
              </div>

              <div data-panel-item className="relative z-10 mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <CheckCircle2 className={`h-4 w-4 ${theme.color}`} /> Certified Industrial Standard
                </span>
                <span className="text-[12px] font-bold text-slate-400 tabular">
                  0{active + 1} / 0{advantages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
