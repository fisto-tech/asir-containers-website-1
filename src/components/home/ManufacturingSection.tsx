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

/**
 * Machinery & manufacturing — a dark stage built as a horizontal process:
 * one tall image plate on the left, then four numbered stages stacked as a
 * timeline on the right, joined by a red rule that runs through them.
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
    <section id="manufacturing" ref={root} className="relative overflow-hidden bg-charcoal py-20 text-white lg:py-28">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index="05" tone="light">
              {manufacturing.eyebrow}
            </SectionLabel>
            <h2 data-mfg-heading className="display-lg mt-5 max-w-xl whitespace-pre-line">
              {manufacturing.heading}
            </h2>
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-white/85">{manufacturing.intro}</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Tall stage image */}
          <div className="lg:col-span-5">
            <div className="group relative aspect-4/5 overflow-hidden rounded-[24px] bg-charcoal-soft lg:aspect-3/4">
              <div data-mfg-media className="absolute inset-[-8%]" data-reveal-mask>
                <Image
                  src={manufacturing.image.src}
                  alt={manufacturing.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="ambient-media-slow object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
                <span
                  aria-hidden
                  className="mb-4 flex h-12 w-12 animate-[icon-pulse_4s_ease-in-out_infinite] items-center justify-center rounded-full bg-brand text-white"
                >
                  <AnimatedIcon name="mould" motion="none" className="h-6 w-6 text-white" />
                </span>
                <p className="font-display text-xl font-semibold leading-snug">
                  Tooling, moulding and closures specified together.
                </p>
                <p className="mt-1.5 text-[13px] text-white/85">
                  Representative facility image — to be replaced with plant photography.
                </p>
              </div>
            </div>
          </div>

          {/* Process timeline */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between border-b border-white/15 pb-3">
              <p className="text-[15px] font-semibold text-white">Process</p>
              <p className="text-[13px] text-white/85 tabular">
                {String(manufacturing.steps.length).padStart(2, "0")} stages
              </p>
            </div>

            <ol data-mfg-steps className="relative mt-2 pl-12">
              <span
                aria-hidden
                className="absolute bottom-6 left-[19px] top-6 w-px bg-[linear-gradient(to_bottom,#e51827,#e51827_20%,rgba(255,255,255,0.16)_20%,rgba(255,255,255,0.16))]"
              />

              {manufacturing.steps.map((step) => (
                <li key={step.index} data-mfg-step className="relative py-6">
                  <span
                    aria-hidden
                    className="absolute -left-12 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-charcoal text-brand"
                  >
                    <AnimatedIcon
                      name={stepIcons[step.icon] ?? "pack"}
                      motion={stepMotions[step.icon] ?? "none"}
                      className="h-5 w-5 text-brand"
                    />
                  </span>

                  <div className="flex items-baseline gap-3">
                    <span className="tabular text-[12px] font-semibold text-brand">{step.index}</span>
                    <h3 className="font-display text-[21px] font-semibold text-white">{step.title}</h3>
                  </div>
                  <p className="mt-1.5 max-w-lg text-[14px] leading-relaxed text-white/85">{step.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-[14px] font-medium text-white transition-all duration-300 hover:border-brand hover:bg-brand"
              >
                Talk to the plant team
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <p className="text-[13px] text-white/85">
                Product code, capacity and closure confirmed before dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
