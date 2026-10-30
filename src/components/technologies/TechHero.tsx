"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { gsap, useGSAP, revealLines, reduceMotion, EASE } from "@/lib/animations";
import { machinery } from "@/data/manufacturing";

/**
 * Technologies masthead — light and colour-washed, with the plant photograph
 * given the room. No overlays sit on the image; the copy lives beside it.
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

      const plate = scope.querySelector<HTMLElement>("[data-tech-plate]");
      const inset = scope.querySelector<HTMLElement>("[data-tech-inset]");

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

        gsap.from(scope.querySelectorAll("[data-tech-fade]"), {
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
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-ocean/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[440px] w-[440px] rounded-full bg-amber-accent/10 blur-3xl"
      />

      <div className="shell relative grid items-center gap-12 pb-16 pt-28 lg:grid-cols-12 lg:gap-16 lg:pb-24 lg:pt-36">
        <div className="lg:col-span-6">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ocean">
            Technologies
          </p>

          <h1
            data-tech-heading
            className="mt-5 max-w-[14ch] font-display text-[clamp(2.4rem,5vw,4.15rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink"
          >
            Technologies &amp; Machinery
          </h1>

          <p className="mt-6 max-w-lg text-[15.5px] leading-relaxed text-mid">
            State-of-the-art production floor equipped with microprocessor-controlled injection
            moulding presses, high-speed automated decoration lines, and closed-loop auxiliary
            systems.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3">
            {machinery.production.rows.map((row) => (
              <li
                key={row.name}
                className="flex items-center gap-2.5 text-[13.5px] text-ink/80"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-ocean" />
                {row.name}
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="group mt-9 inline-flex h-12 items-center gap-2.5 rounded-[10px] bg-brand px-6 text-[14px] font-semibold text-white transition-colors duration-300 hover:bg-brand-dark"
          >
            Inquire capacity
            <ArrowRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="relative lg:col-span-6">
          <div
            data-tech-plate
            className="group overflow-hidden rounded-[26px] bg-light shadow-[0_36px_70px_-45px_rgba(17,17,17,0.5)]"
          >
            <div className="relative aspect-4/3 w-full">
              <Image
                src="/images/facility/machinery-01.jpg"
                alt="Injection moulding machines running in the plant"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </div>
          </div>

          <div
            data-tech-inset
            className="absolute -bottom-10 -right-6 hidden w-[40%] overflow-hidden rounded-[18px] shadow-[0_24px_50px_-30px_rgba(17,17,17,0.55)] ring-8 ring-white sm:block lg:-right-8"
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
