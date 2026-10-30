import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type ColorCTAProps = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
};

/**
 * Closing band shared by /process and /technologies: a solid brand panel with
 * the plant photograph held beside it rather than behind it, so nothing is
 * washed out under an overlay.
 */
export function ColorCTA({
  eyebrow,
  heading,
  body,
  ctaLabel,
  image,
  imageAlt,
}: ColorCTAProps) {
  return (
    <section className="bg-white pb-16 pt-12 lg:pb-24 lg:pt-16">
      <Reveal className="shell">
        <div className="grid overflow-hidden rounded-[30px] bg-brand lg:grid-cols-12">
          <div className="px-7 py-11 sm:px-11 lg:col-span-7 lg:px-14 lg:py-16">
            <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white/70" data-reveal>
              {eyebrow}
            </p>

            <h2
              className="mt-4 max-w-lg font-display text-[clamp(1.6rem,2.6vw,2.25rem)] font-semibold leading-[1.14] tracking-[-0.025em] text-white"
              data-reveal="letters"
            >
              {heading}
            </h2>

            <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-white/85" data-reveal>
              {body}
            </p>

            <Link
              href="/contact"
              className="group mt-8 inline-flex h-12 items-center gap-2.5 rounded-[10px] bg-white px-6 text-[14px] font-semibold text-brand transition-colors duration-300 hover:bg-brand-light"
              data-reveal
            >
              {ctaLabel}
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="relative min-h-[220px] lg:col-span-5">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
