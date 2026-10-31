"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, revealLines, reduceMotion, EASE } from "@/lib/animations";

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
      className="relative overflow-hidden border-b border-ink/10 h-[220px] sm:h-[250px] lg:h-[280px] flex items-center bg-[#fdfbf9]"
    >
      {/* Background Graphic Image - full bleed contact-us-bg.webp */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/contact/contact-us-bg.webp"
          alt="ASIR Containers Contact Us background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center pointer-events-none"
        />

        {/* Soft subtle gradient overlay on the left to ensure headline readability */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/90 via-white/50 to-transparent w-full sm:w-[55%] lg:w-[45%]"
        />
      </div>

      {/* Main Text Content */}
      <div className="shell relative z-10 w-full pt-16 sm:pt-18 lg:pt-20">
        <div className="max-w-md lg:max-w-lg">
          <h1
            data-contact-heading
            className="font-display text-[clamp(2.1rem,3.4vw,2.9rem)] font-extrabold leading-[1.05] tracking-tight text-ink drop-shadow-xs"
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
            className="mt-2.5 max-w-sm sm:max-w-md text-[14px] sm:text-[15px] leading-relaxed text-slate-700 font-medium"
            data-contact-fade
          >
            {intro}
          </p>
        </div>
      </div>
    </section>
  );
}
