"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, useGSAP, revealLines, reduceMotion, EASE } from "@/lib/animations";
import { inspectionStages, inProcess } from "@/data/manufacturing";

const stageColors = ["bg-emerald-accent", "bg-ocean", "bg-amber-accent"];

/**
 * Process masthead — light, warm, and photographic.
 *
 * One big plant plate with a smaller detail plate tucked behind it, the
 * headline rising line by line, and the three inspection gates written out
 * as plain text beneath the copy.
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

      const plate = scope.querySelector<HTMLElement>("[data-hero-plate]");
      const inset = scope.querySelector<HTMLElement>("[data-hero-inset]");

      if (reduceMotion()) {
        gsap.set([plate, inset].filter(Boolean), { clipPath: "none", autoAlpha: 1 });
      } else {
        if (plate) {
          gsap.fromTo(
            plate,
            { clipPath: "inset(0% 0% 100% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" },
          );
        }
        if (inset) {
          gsap.fromTo(
            inset,
            { y: 26, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1, delay: 0.45, ease: EASE.out },
          );
        }

        gsap.from(scope.querySelectorAll("[data-hero-fade]"), {
          y: 20,
          autoAlpha: 0,
          duration: 0.9,
          delay: 0.35,
          stagger: 0.08,
          ease: EASE.out,
        });
      }

      return () => {
        cancelled = true;
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-white">
      {/* Soft brand wash — colour, not a dark overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-40 h-[520px] w-[520px] rounded-full bg-brand/8 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-ocean/10 blur-3xl"
      />

      <div className="shell relative grid items-center gap-12 pb-16 pt-28 lg:grid-cols-12 lg:gap-16 lg:pb-24 lg:pt-36">
        <div className="lg:col-span-6">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            Process
          </p>

          <h1
            data-hero-heading
            className="mt-5 max-w-[16ch] font-display text-[clamp(2.4rem,5vw,4.15rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink"
          >
            Manufacturing &amp; Process Flow
          </h1>

          <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-mid">
            Fully integrated in-house manufacturing process: precision injection moulding
            cycles, versatile multi-color container printing, and rigorous multi-stage quality
            control under one roof.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            {inspectionStages.map((stage, index) => (
              <li
                key={stage.index}
                className="flex items-center gap-2.5 text-[13.5px] text-ink/80"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${stageColors[index]}`} />
                {stage.title}
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

        {/* Photography */}
        <div className="relative lg:col-span-6">
          <div
            data-hero-plate
            className="group overflow-hidden rounded-[26px] bg-light shadow-[0_36px_70px_-45px_rgba(17,17,17,0.5)]"
          >
            <div className="relative aspect-4/3 w-full">
              <Image
                src="/images/hero/hero-01.jpg"
                alt="Containers stacked on the ASIR plant floor"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
          </div>

          <div
            data-hero-inset
            className="absolute -bottom-10 -left-6 hidden w-[42%] overflow-hidden rounded-[18px] shadow-[0_24px_50px_-30px_rgba(17,17,17,0.55)] ring-8 ring-white sm:block lg:-left-10"
          >
            <div className="relative aspect-square w-full bg-light">
              <Image
                src="/images/hero/hero-03.jpg"
                alt="Moulding machine detail"
                fill
                sizes="(max-width: 1024px) 40vw, 220px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <p className="shell relative pb-10 text-[12px] text-mid/80">
        Representative photography — plant imagery to be supplied.
      </p>
    </section>
  );
}
