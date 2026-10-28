"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, reduceMotion } from "@/lib/animations";

type ProductMediaProps = {
  src: string;
  alt: string;
  capacity: string;
  category: string;
};

/** Representative detail shots shown beneath the main packshot. */
const detailShots = [
  {
    src: "/images/detail/lid-tind.jpg",
    alt: "Representative close-up of a lid with a tear-off tamper band",
    caption: "Closure detail",
  },
  {
    src: "/images/detail/stacked-pails.jpg",
    alt: "Representative photograph of stacked plastic pails with red lids",
    caption: "Stacked",
  },
] as const;

/**
 * Product hero image: masked clip reveal on load, gentle parallax on scroll and
 * a subtle continuous float that stops under reduced-motion.
 */
export function ProductMedia({ src, alt, capacity, category }: ProductMediaProps) {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const frame = root.current?.querySelector<HTMLElement>("[data-pm-frame]");
      const image = root.current?.querySelector<HTMLElement>("[data-pm-image]");
      const meta = root.current?.querySelectorAll<HTMLElement>("[data-pm-meta]");
      if (!frame || !image) return;

      if (reduceMotion()) {
        gsap.set([frame, image, ...Array.from(meta ?? [])], { opacity: 1, clearProps: "clipPath" });
        return;
      }

      const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });
      timeline
        .fromTo(frame, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15 })
        .fromTo(image, { scale: 1.16 }, { scale: 1, duration: 1.5 }, 0.1)
        .fromTo(meta ?? [], { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.5);
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative flex h-full flex-col">
      <div className="group/main relative min-h-[380px] flex-1 overflow-hidden rounded-[20px] bg-light lg:min-h-[480px]">
        <div data-pm-frame className="absolute inset-0">
          <div data-pm-image className="relative h-full w-full">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover/main:scale-105"
            />
          </div>
        </div>

        <span
          data-pm-meta
          className="absolute left-5 top-5 text-[13px] font-semibold text-ink tabular"
        >
          {capacity}
        </span>

        <span
          data-pm-meta
          className="absolute bottom-5 right-5 text-[12px] font-medium text-ink"
        >
          {category}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {detailShots.map((shot) => (
          <figure key={shot.src} className="group/shot">
            <span className="relative block aspect-4/3 overflow-hidden rounded-[14px] bg-light">
              <Image
                src={shot.src}
                alt={shot.alt}
                fill
                sizes="(max-width: 1024px) 46vw, 24vw"
                className="ambient-media-slow object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover/shot:scale-108"
              />
            </span>
            <figcaption className="mt-1.5 text-[12px] text-mid">{shot.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
