import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

type ColorCTAProps = {
  eyebrow: string;
  heading: string;
  body: string;
  ctaLabel: string;
  image: string;
  imageAlt: string;
};

/**
 * Closing banner shared by /process and /technologies. The colour runs edge to
 * edge inside one rounded band; the photograph is cut on a diagonal so the two
 * halves meet on a line instead of a seam. Nothing sits on top of the image.
 */
export function ColorCTA({
  eyebrow,
  heading,
  body,
  ctaLabel,
  image,
  imageAlt,
}: ColorCTAProps) {
  const phone = site.contact.phone;

  return (
    <section className="bg-white pb-16 pt-4 lg:pb-24">
      <Reveal className="shell">
        <div className="relative overflow-hidden rounded-[30px] bg-brand">
          {/* Slow light washes inside the band — always moving, never loud */}
          <div
            aria-hidden
            className="drift pointer-events-none absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-white/15 blur-3xl"
          />
          <div
            aria-hidden
            className="drift pointer-events-none absolute bottom-[-12rem] left-1/3 h-[360px] w-[360px] rounded-full bg-brand-dark/60 blur-3xl [animation-delay:-8s]"
          />

          <div className="relative flex flex-col lg:flex-row lg:items-stretch">
            <div className="w-full px-7 py-11 sm:px-11 lg:w-[56%] lg:px-14 lg:py-16">
              <p className="text-[12.5px] font-semibold uppercase tracking-[0.16em] text-white/70" data-reveal>
                {eyebrow}
              </p>

              <h2
                className="mt-4 max-w-lg font-display text-[clamp(1.7rem,2.8vw,2.45rem)] font-semibold leading-[1.1] tracking-[-0.028em] text-white"
                data-reveal="letters"
              >
                {heading}
              </h2>

              <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/85" data-reveal>
                {body}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4" data-reveal>
                <Link
                  href="/contact"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-[10px] bg-white px-6 text-[14px] font-semibold text-brand transition-colors duration-300 hover:bg-brand-light"
                >
                  {ctaLabel}
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                {phone && (
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2.5 text-[14px] font-medium text-white/85 transition-colors duration-300 hover:text-white"
                  >
                    <Phone aria-hidden className="h-4 w-4" strokeWidth={1.8} />
                    {phone}
                  </a>
                )}
              </div>
            </div>

            <div className="banner-slant relative min-h-[240px] w-full lg:min-h-0 lg:w-[44%]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="ambient-media-slow object-cover"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
