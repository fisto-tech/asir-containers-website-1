"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, revealLines, reduceMotion, EASE } from "@/lib/animations";

/**
 * Contact masthead as a banner: the title and one line of copy on the left, the
 * stacked pails fading out of the page on the right. Nothing else sits in the
 * band — the form below carries the detail.
 */
export function ContactHero({ title, intro }: { title: string; intro: string }) {
  const root = useRef<HTMLElement | null>(null);

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

      gsap.from(scope.querySelector("[data-contact-image]"), {
        autoAlpha: 0,
        scale: 1.04,
        duration: 1.2,
        delay: 0.15,
        ease: EASE.out,
      });

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
    <section
      ref={root}
      className="relative overflow-hidden border-b border-ink/10 bg-[linear-gradient(100deg,#ffffff_0%,#fdfaf5_46%,#f7eee0_100%)]"
    >
      {/* Faint brand rings behind the product */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-brand/[0.12] lg:block"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-1/2 hidden h-[280px] w-[280px] -translate-y-1/2 rounded-full border border-brand/[0.08] lg:block"
      />
      <span
        aria-hidden
        className="drift pointer-events-none absolute -left-32 -top-32 h-[380px] w-[380px] rounded-full bg-brand/[0.06] blur-3xl"
      />

      <div className="shell relative grid items-stretch gap-6 pb-7 pt-24 lg:grid-cols-12 lg:gap-10 lg:pb-9 lg:pt-28">
        <div className="flex flex-col justify-center lg:col-span-7">
          <h1
            data-contact-heading
            className="font-display text-[clamp(2.1rem,3.4vw,2.9rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink"
          >
            {title === "Contact Us" ? (
              <>
                Contact <span className="text-brand">Us</span>
              </>
            ) : (
              title
            )}
          </h1>

          <p
            className="mt-3 max-w-md text-[14.5px] leading-relaxed text-mid"
            data-contact-fade
          >
            {intro}
          </p>
        </div>

        <div className="relative lg:col-span-5">
          <div
            data-contact-image
            className="fade-left relative h-[150px] w-full sm:h-[165px] lg:h-full lg:min-h-[165px]"
          >
            <Image
              src="/images/contact/contact-hero.jpg"
              alt="Stacked ASIR Containers pails with red lids on a warm studio ground"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="ambient-media-slow object-cover object-[center_55%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
