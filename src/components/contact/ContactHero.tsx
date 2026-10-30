"use client";

import { useRef } from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { gsap, useGSAP, revealLines, reduceMotion, EASE } from "@/lib/animations";
import { site } from "@/data/site";

/**
 * Contact masthead: the page title and the two ways to reach the plant on the
 * left, a photograph of the finished container on the right. The plate wipes up
 * on load and then keeps a slow zoom so the header never sits still.
 */
export function ContactHero({
  title,
  intro,
}: {
  title: string;
  intro: string;
}) {
  const root = useRef<HTMLElement | null>(null);
  const { phone, email } = site.contact;

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      let cancelled = false;
      const heading = scope.querySelector<HTMLElement>("[data-contact-heading]");
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
        scope.querySelector("[data-contact-plate]"),
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.out" },
      );

      gsap.from(scope.querySelectorAll("[data-contact-fade]"), {
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
    <section ref={root} className="relative overflow-hidden border-b border-ink/10 bg-white">
      <div
        aria-hidden
        className="drift pointer-events-none absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-brand/[0.07] blur-3xl"
      />
      <div
        aria-hidden
        className="drift pointer-events-none absolute -right-36 bottom-0 h-[460px] w-[460px] rounded-full bg-ocean/[0.08] blur-3xl [animation-delay:-7s]"
      />

      <div className="shell relative grid items-center gap-10 pb-12 pt-28 lg:grid-cols-12 lg:gap-14 lg:pb-16 lg:pt-36">
        <div className="lg:col-span-6">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-brand">
            Contact
          </p>

          <h1
            data-contact-heading
            className="mt-5 font-display text-[clamp(2.4rem,4.6vw,3.9rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-ink"
          >
            {title}
          </h1>

          <p
            className="mt-6 max-w-md text-[15.5px] leading-relaxed text-mid"
            data-contact-fade
          >
            {intro}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8" data-contact-fade>
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="group inline-flex items-center gap-3 text-[15px] font-medium text-ink transition-colors duration-300 hover:text-brand"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-brand-light text-brand">
                  <Phone aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </span>
                {phone}
              </a>
            )}

            {email && (
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center gap-3 text-[15px] font-medium text-ink transition-colors duration-300 hover:text-brand"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-ocean-light text-ocean">
                  <Mail aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </span>
                {email}
              </a>
            )}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div
            data-contact-plate
            className="relative h-[280px] overflow-hidden rounded-[26px] bg-light shadow-[0_40px_80px_-55px_rgba(17,17,17,0.6)] sm:h-[360px] lg:h-[470px]"
          >
            <Image
              src="/images/hero/hero-02.jpg"
              alt="Stacked ASIR Containers pails"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="ambient-media-slow object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
