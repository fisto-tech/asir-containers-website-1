"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, revealLines, reduceMotion, EASE } from "@/lib/animations";
import { inspectionStages } from "@/data/manufacturing";

const gateColours = ["text-emerald-accent", "text-ocean", "text-amber-accent"];
const gateDots = ["bg-emerald-accent", "bg-ocean", "bg-amber-accent"];

/**
 * Process masthead.
 *
 * Copy on the left, two photographs of equal height on the right — one wide,
 * one narrow — so the plate reads as a spread rather than a stack of cards.
 */
export function ProcessHero() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      let cancelled = false;
      const heading = scope.querySelector<HTMLElement>("[data-hero-heading]");
      const splitHeading = () => {
        if (cancelled || !heading) return;
        revealLines(heading, { mode: "words", delay: 0.2, scrollTrigger: false });
      };
      if (heading) {
        if (document.fonts?.status === "loaded") splitHeading();
        else void document.fonts?.ready.then(splitHeading);
      }

      if (reduceMotion()) return () => { cancelled = true; };

      gsap.fromTo(
        scope.querySelectorAll("[data-hero-plate]"),
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.3,
          stagger: 0.14,
          ease: "expo.out",
        },
      );

      gsap.from(scope.querySelectorAll("[data-hero-fade]"), {
        y: 20,
        autoAlpha: 0,
        duration: 0.9,
        delay: 0.3,
        stagger: 0.08,
        ease: EASE.out,
      });

      return () => {
        cancelled = true;
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-white">
      {/* Slow colour wash — always in motion, never in the way */}
      <div
        aria-hidden
        className="drift pointer-events-none absolute -right-32 -top-40 h-[540px] w-[540px] rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden
        className="drift pointer-events-none absolute -left-44 top-1/3 h-[420px] w-[420px] rounded-full bg-ocean/10 blur-3xl [animation-delay:-6s]"
      />

      <div className="shell relative grid items-center gap-12 pb-16 pt-28 lg:grid-cols-12 lg:gap-14 lg:pb-24 lg:pt-36">
        <div className="lg:col-span-5">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            Process
          </p>

          <h1
            data-hero-heading
            className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.9rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-ink"
          >
            Manufacturing &amp; Process Flow
          </h1>

          <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-mid">
            Fully integrated in-house manufacturing process: precision injection moulding
            cycles, versatile multi-color container printing, and rigorous multi-stage quality
            control under one roof.
          </p>

          <ul className="mt-8 space-y-2.5">
            {inspectionStages.map((stage, index) => (
              <li
                key={stage.index}
                className="flex items-center gap-3 text-[14px] text-ink/80"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${gateDots[index]}`} />
                {stage.title}
                <span className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${gateColours[index]}`}>
                  Gate
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="group mt-9 inline-flex h-12 items-center gap-2.5 rounded-[10px] bg-brand px-6 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-brand-dark"
          >
            Contact engineering
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Two plates, one height */}
        <div className="lg:col-span-7">
          <div className="grid h-[300px] grid-cols-5 gap-3 sm:h-[380px] sm:gap-4 lg:h-[520px]">
            <div
              data-hero-plate
              className="relative col-span-3 overflow-hidden rounded-[24px] bg-light shadow-[0_40px_80px_-55px_rgba(17,17,17,0.6)]"
            >
              <Image
                src="/images/hero/hero-01.jpg"
                alt="Containers stacked on the plant floor"
                fill
                priority
                sizes="(max-width: 1024px) 60vw, 36vw"
                className="ambient-media-slow object-cover"
              />
            </div>

            <div
              data-hero-plate
              className="relative col-span-2 overflow-hidden rounded-[24px] bg-light shadow-[0_40px_80px_-55px_rgba(17,17,17,0.6)]"
            >
              <Image
                src="/images/facility/machinery-01.jpg"
                alt="Injection moulding machines running in the plant"
                fill
                priority
                sizes="(max-width: 1024px) 40vw, 24vw"
                className="ambient-media object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
