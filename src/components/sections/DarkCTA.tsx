"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, parallax, reduceMotion, revealLines } from "@/lib/animations";

type DarkCTAProps = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  image: string;
  imageAlt?: string;
};

/**
 * Closing band shared by /process and /technologies: a full-bleed plant plate
 * with the copy anchored low-left, the CTA set as an underlined link, and the
 * image drifting slowly behind it.
 */
export function DarkCTA({
  eyebrow,
  heading,
  body,
  ctaLabel,
  image,
  imageAlt = "",
}: DarkCTAProps) {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const title = scope.querySelector<HTMLElement>("[data-cta-heading]");
      if (title) revealLines(title, { mode: "words" });

      const plate = scope.querySelector<HTMLElement>("[data-cta-plate]");
      if (plate && !reduceMotion()) parallax(plate, 60);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden bg-[#080a0e] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div data-cta-plate className="absolute inset-[-10%]">
          <Image src={image} alt={imageAlt} fill sizes="100vw" className="object-cover opacity-35" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#080a0e] via-[#080a0e]/78 to-[#080a0e]/35" />
        <div className="tech-grid edge-fade-y absolute inset-0 opacity-40" />
      </div>

      <div className="shell relative py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
              <span className="readout text-brand">05</span>
              {eyebrow}
            </p>

            <h2
              data-cta-heading
              className="mt-5 font-display text-[clamp(1.75rem,3.4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-white"
            >
              {heading}
            </h2>

            <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-white/85">{body}</p>
          </div>

          <div className="shrink-0">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border-b-2 border-white/25 pb-2 font-display text-[17px] font-semibold text-white transition-colors duration-300 hover:border-brand"
            >
              {ctaLabel}
              <span className="flex h-9 w-9 items-center justify-center border border-white/25 transition-all duration-500 group-hover:border-brand group-hover:bg-brand">
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
