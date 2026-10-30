"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { gsap, useGSAP, revealLines, reduceMotion, EASE } from "@/lib/animations";
import { machinery } from "@/data/manufacturing";

const rowDots = ["bg-ocean", "bg-emerald-accent", "bg-amber-accent", "bg-brand"];

/**
 * Technologies masthead — a different shape from the process page: the copy
 * runs across the top, then one long plate of the press floor runs edge to edge
 * beneath it, with the machine routes listed on a hairline below.
 */
export function TechHero() {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      let cancelled = false;
      const heading = scope.querySelector<HTMLElement>("[data-tech-heading]");
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
        scope.querySelector("[data-tech-plate]"),
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" },
      );

      gsap.from(scope.querySelectorAll("[data-tech-fade]"), {
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
    <section ref={root} className="relative overflow-hidden bg-white pb-10 lg:pb-14">
      <div
        aria-hidden
        className="drift pointer-events-none absolute -left-36 -top-44 h-[540px] w-[540px] rounded-full bg-ocean/10 blur-3xl"
      />
      <div
        aria-hidden
        className="drift pointer-events-none absolute -right-40 top-10 h-[460px] w-[460px] rounded-full bg-amber-accent/10 blur-3xl [animation-delay:-9s]"
      />

      <div className="shell relative pt-28 lg:pt-36">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-8">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ocean">
              Technologies
            </p>

            <h1
              data-tech-heading
              className="mt-5 max-w-[18ch] font-display text-[clamp(2.4rem,4.8vw,4rem)] font-semibold leading-[1.02] tracking-[-0.032em] text-ink"
            >
              Technologies &amp; Machinery
            </h1>

            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-mid">
              State-of-the-art production floor equipped with microprocessor-controlled injection
              moulding presses, high-speed automated decoration lines, and closed-loop auxiliary
              systems.
            </p>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Link
              href="/contact"
              data-tech-fade
              className="group inline-flex h-12 items-center gap-2.5 rounded-[10px] bg-brand px-6 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-brand-dark"
            >
              Inquire capacity
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* One long plate, edge to edge */}
      <div data-tech-plate className="relative mt-11 h-[300px] bg-light sm:h-[400px] lg:mt-14 lg:h-[540px]">
        <Image
          src="/images/facility/machinery-01.jpg"
          alt="Injection moulding machines running in the plant"
          fill
          priority
          sizes="100vw"
          className="ambient-media-slow object-cover"
        />
      </div>

      <div className="shell relative">
        <ul className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {machinery.production.rows.map((row, index) => (
            <li
              key={row.name}
              data-tech-fade
              className="flex items-center gap-3 border-b border-line py-4 text-[13.5px] text-ink/80 sm:py-5 lg:border-b-0 lg:border-r lg:last:border-r-0 lg:px-5 lg:first:pl-0"
            >
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${rowDots[index % rowDots.length]}`} />
              {row.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
