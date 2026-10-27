"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP, revealLines, parallax, reduceMotion, useScrollReveal } from "@/lib/animations";
import { aboutContent } from "@/data/home";
import { SectionLabel } from "@/components/ui/SectionLabel";


export function AboutSection() {
  const root = useRef<HTMLElement | null>(null);
  /* Generic `[data-reveal]` / `[data-reveal-mask]` passes (eyebrow, links, plates). */
  useScrollReveal(root);

  useGSAP(
    () => {
      const heading = root.current?.querySelector<HTMLElement>("[data-about-heading]");
      if (heading) revealLines(heading, { scrollTrigger: true });


      if (reduceMotion()) {
        gsap.set("[data-about-copy] > *", { opacity: 1, y: 0 });
        return;
      }

      const copy = gsap.utils.toArray<HTMLElement>("[data-about-copy] > *");
      gsap.set(copy, { opacity: 0, y: 22 });
      const playCopy = () =>
        gsap.to(copy, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", overwrite: "auto" });

      ScrollTrigger.create({
        trigger: "[data-about-copy]",
        start: "top 85%",
        end: "top 25%",
        invalidateOnRefresh: true,
        onEnter: playCopy,
        onEnterBack: playCopy,
        onLeaveBack: () => gsap.to(copy, { opacity: 0, y: 22, duration: 0.4, ease: "power2.in", overwrite: "auto" }),
      });

      const media = root.current?.querySelector<HTMLElement>("[data-about-media]");
      if (media) parallax(media, 60);

      const inset = root.current?.querySelector<HTMLElement>("[data-about-inset]");
      if (inset) {
        gsap.set(inset, { yPercent: 18, opacity: 0 });
        const playInset = () =>
          gsap.to(inset, { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", overwrite: "auto" });

        ScrollTrigger.create({
          trigger: inset,
          start: "top 95%",
          end: "top 25%",
          invalidateOnRefresh: true,
          onEnter: playInset,
          onEnterBack: playInset,
          onLeaveBack: () =>
            gsap.to(inset, { yPercent: 18, opacity: 0, duration: 0.5, ease: "power2.in", overwrite: "auto" }),
        });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Copy column */}
          <div className="lg:col-span-6 lg:pr-8">
            <div data-reveal>
              <SectionLabel index="01">{aboutContent.eyebrow}</SectionLabel>
            </div>

            <h2
              data-about-heading
              className="display-lg sheen-ink mt-6 whitespace-pre-line text-ink"
            >
              {aboutContent.heading}
            </h2>

            <div data-about-copy className="mt-8 max-w-xl space-y-5">
              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[15px] leading-[1.75] text-mid">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                data-reveal
              >
                See the full range
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-mid underline decoration-line underline-offset-4 transition-colors hover:text-brand"
                data-reveal
              >
                Talk to the sales team
              </Link>
            </div>

          </div>

          {/* Media column — one tall plate with a smaller plate lapping its corner */}
          <div className="relative lg:col-span-5 lg:col-start-8">
            <div className="relative">
              <figure className="zoom-plate relative aspect-4/5 overflow-hidden rounded-[24px] bg-light">
                <Image
                  src={aboutContent.image.src}
                  alt={aboutContent.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-2/5 bg-[linear-gradient(to_bottom,rgba(17,17,17,0.6),transparent)]"
                />
                <figcaption className="absolute inset-x-0 top-0 p-6 text-white">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/85">
                    Moulding floor
                  </span>
                  <span className="mt-1.5 block font-display text-[17px] font-semibold leading-snug">
                    Every format tooled for the closure it carries.
                  </span>
                </figcaption>
              </figure>

              <figure className="zoom-plate absolute -bottom-10 -left-6 hidden w-[44%] overflow-hidden rounded-[18px] border-[6px] border-white bg-light shadow-[0_24px_60px_-24px_rgba(17,17,17,0.45)] sm:block">
                <span className="relative block aspect-square">
                  <Image
                    src="/images/detail/stacked-pails.jpg"
                    alt="Representative photograph of stacked plastic pails"
                    fill
                    sizes="(max-width: 1024px) 40vw, 18vw"
                    className="object-cover"
                  />
                </span>
              </figure>
            </div>

            {/* Red keyline detail — reads as a drawing annotation, not a card */}
            <div className="mt-14 flex items-start gap-3 sm:mt-16">
              <span aria-hidden className="mt-2.5 h-px w-12 shrink-0 bg-brand" />
              <p className="text-[12px] leading-relaxed text-mid">
                Moulding, closures and dispatch — one site, one record per pack.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
