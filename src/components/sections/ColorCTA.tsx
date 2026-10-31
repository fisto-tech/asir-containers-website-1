import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";

type ColorCTAProps = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel?: string;
  image: string;
  imageAlt: string;
};

/**
 * Editorial full-width dark photographic banner matching the product details page design.
 * Features background photograph with rich charcoal gradient overlay.
 * Excludes standalone CTA buttons and phone numbers per user instruction.
 */
export function ColorCTA({
  eyebrow,
  heading,
  body,
  image,
  imageAlt,
}: ColorCTAProps) {
  return (
    <section className="bg-white pt-2 pb-14 lg:pb-18">
      <Reveal className="shell">
        <div
          data-reveal
          data-reveal-dir="scale"
          data-reveal-delay="0.1"
          className="relative overflow-hidden rounded-[24px] bg-charcoal shadow-xl"
        >
          {/* Backdrop with page-specific industrial photograph */}
          <div className="absolute inset-0 z-0">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="100vw"
              className="object-cover opacity-60"
            />
            {/* Rich dark gradient overlay from left */}
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/40" />
          </div>

          <div className="relative z-10 flex flex-col justify-center px-7 py-9 sm:px-11 sm:py-11 lg:px-14 lg:py-12">
            <div className="max-w-2xl">
              {/* Eyebrow marker */}
              <div
                data-reveal
                data-reveal-dir="left"
                data-reveal-delay="0.15"
                className="flex items-center gap-2 mb-2"
              >
                <span className="h-[2px] w-5 bg-brand" />
                <span className="font-mono text-[11px] sm:text-[11.5px] font-bold uppercase tracking-[0.2em] text-white/70">
                  {eyebrow}
                </span>
              </div>

              {/* Heading */}
              <h2
                data-reveal
                data-reveal-dir="left"
                data-reveal-delay="0.22"
                className="mt-2.5 font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-extrabold text-white leading-[1.12] tracking-tight"
              >
                {heading}
              </h2>

              {/* Narrative description */}
              <p
                data-reveal
                data-reveal-dir="up"
                data-reveal-delay="0.3"
                className="mt-3 max-w-xl text-[14.5px] sm:text-[15.5px] leading-relaxed text-white/80 font-normal"
              >
                {body}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
