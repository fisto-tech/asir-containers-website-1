"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Play, ShieldCheck, Layers, Link as LinkIcon } from "lucide-react";
import { gsap, SplitText, reduceMotion } from "@/lib/animations";

const SLIDE_DURATION = 3000;

export const heroSlidesData = [
  {
    id: "square",
    eyebrow: "SQUARE INTERLOCK SYSTEMS",
    titleLine1: "Built to",
    titleLine2: "Hold More.",
    descLine1: "Stackable square formats with airtight hermetic locks,",
    descLine2: "tamper-evident seals, and reinforced logistics handles.",
    image: "/images/hero/home-hero-1.webp",
    imageAlt: "Square interlock rigid plastic pails on multi-tier stone podium showcase",
    thumbnail: "/images/hero/home-hero-1.webp",
    thumbTitle: "Square Range",
    primary: { label: "Explore Products", href: "/products?application=food" },
    colors: {
      eyebrow: "text-[#002b49]",
      title1: "text-[#002b49]",
      title2: "text-[#E51827]",
      btnBg: "bg-[#9e6938] hover:bg-[#88572b] shadow-[#9e6938]/25 hover:shadow-[#9e6938]/35",
      accentText: "text-[#E51827]",
    },
  },
  {
    id: "industrial",
    eyebrow: "FOOD & EDIBLE OIL CONTAINERS",
    titleLine1: "Airtight Seal,",
    titleLine2: "Pure Quality.",
    descLine1: "100% food-grade packaging with tamper-evident lids,",
    descLine2: "certified for dairy, edible oils, and food distribution.",
    image: "/images/hero/home-hero-2.webp",
    imageAlt: "Airtight food-grade white containers with secure yellow sealing lids on display",
    thumbnail: "/images/hero/home-hero-2.webp",
    thumbTitle: "Food Range",
    primary: { label: "Explore Products", href: "/products?application=food" },
    colors: {
      eyebrow: "text-[#c26d1b]",
      title1: "text-[#002b49]",
      title2: "text-[#d97706]",
      btnBg: "bg-[#002b49] hover:bg-[#001c30] shadow-[#002b49]/25 hover:shadow-[#002b49]/35",
      accentText: "text-[#d97706]",
    },
  },
  {
    id: "paint",
    eyebrow: "HEAVY-DUTY INDUSTRIAL PAILS",
    titleLine1: "Toughened for",
    titleLine2: "Heavy Duty.",
    descLine1: "High-density pails with reinforced wire bail handles,",
    descLine2: "built for paints, coatings, and chemical stability.",
    image: "/images/hero/home-hero-3.webp",
    imageAlt: "Industrial white plastic pails with heavy duty wire bail handles on podium",
    thumbnail: "/images/hero/home-hero-3.webp",
    thumbTitle: "Paint & Coating",
    primary: { label: "Explore Products", href: "/products?application=paint" },
    colors: {
      eyebrow: "text-[#2e6244]",
      title1: "text-[#0f172a]",
      title2: "text-[#1e6f47]",
      btnBg: "bg-[#1e6f47] hover:bg-[#165536] shadow-[#1e6f47]/25 hover:shadow-[#1e6f47]/35",
      accentText: "text-[#1e6f47]",
    },
  },
  {
    id: "lubricants",
    eyebrow: "SPOUT CLOSURE LUBRICANT PAILS",
    titleLine1: "Engineered for",
    titleLine2: "Industrial Fluids.",
    descLine1: "High-impact rigid pails with integrated pouring spouts,",
    descLine2: "ensuring smooth dispensing and zero-leak transport.",
    image: "/images/hero/home-hero-4.webp",
    imageAlt: "Lubricant and chemical plastic pails equipped with pour-spout dispensing lids",
    thumbnail: "/images/hero/home-hero-4.webp",
    thumbTitle: "Lubricant Range",
    primary: { label: "Explore Products", href: "/products?application=lubricant" },
    colors: {
      eyebrow: "text-[#025a70]",
      title1: "text-[#002b49]",
      title2: "text-[#0284c7]",
      btnBg: "bg-[#0284c7] hover:bg-[#0369a1] shadow-[#0284c7]/25 hover:shadow-[#0284c7]/35",
      accentText: "text-[#0284c7]",
    },
  },
];

export function HeroSlider() {
  const slides = heroSlidesData;
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);

  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback(
    (nextIndex: number, direction: 1 | -1 = 1) => {
      const total = slides.length;
      const target = (nextIndex + total) % total;
      if (target === index || animating) return;

      const currentImage = imageRefs.current[index];
      const currentContent = contentRefs.current[index];
      const nextImage = imageRefs.current[target];
      const nextContent = contentRefs.current[target];
      const nextTitle = titleRefs.current[target];
      if (!currentImage || !currentContent || !nextImage || !nextContent) return;

      setAnimating(true);
      setIndex(target);

      if (reduceMotion()) {
        gsap.set([currentImage, currentContent], { autoAlpha: 0 });
        gsap.set([nextImage, nextContent], { autoAlpha: 1 });
        setAnimating(false);
        return;
      }

      const currentElements = currentContent.querySelectorAll("[data-anim-dir]");
      const eyebrow = nextContent.querySelector("[data-anim-dir='top']");
      const title1 = nextContent.querySelector("[data-anim-dir='left']");
      const title2 = nextContent.querySelector("[data-anim-dir='right']");
      const desc1 = nextContent.querySelector("[data-anim-dir='desc1']");
      const desc2 = nextContent.querySelector("[data-anim-dir='desc2']");
      const ctaBtn = nextContent.querySelector("[data-anim-dir='btn']");

      const timeline = gsap.timeline({
        onComplete: () => {
          setAnimating(false);
          gsap.set(currentImage, { autoAlpha: 0, clearProps: "clipPath,transform" });
          gsap.set(currentContent, { autoAlpha: 0 });
        },
      });

      // 1. Right-side image reveal: overlays from right using clip-path wipe & soft scale
      gsap.set(nextImage, { autoAlpha: 1, zIndex: 10 });
      gsap.set(currentImage, { zIndex: 1 });

      const imageDuration = 1.15; // Time taken for image to wipe in fully

      timeline
        .fromTo(
          nextImage,
          { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", scale: 1.05 },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scale: 1,
            duration: imageDuration,
            ease: "power3.inOut",
          },
          0,
        )
        // Previous image softly fades out underneath
        .to(currentImage, { autoAlpha: 0, duration: 0.8, ease: "power2.out" }, 0.3)
        // Previous text lines fade/slide out immediately
        .to(currentElements, { y: -14 * direction, autoAlpha: 0, duration: 0.3, stagger: 0.03, ease: "power2.in" }, 0);

      // Time point when the text animation begins (0.3 seconds after the image finishes revealing!)
      const textStartTime = imageDuration + 0.3;

      // Make next content visible right before text animation starts
      timeline.set(nextContent, { autoAlpha: 1 }, textStartTime - 0.05);

      // 2. Left side animated reveals: each line comes from different directions!
      // - Eyebrow drops in from TOP
      if (eyebrow) {
        timeline.fromTo(
          eyebrow,
          { y: -26, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.65, ease: "back.out(1.4)" },
          textStartTime,
        );
      }

      // - Title Line 1 slides in from LEFT
      if (title1) {
        timeline.fromTo(
          title1,
          { x: -60, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
          textStartTime + 0.1,
        );
      }

      // - Title Line 2 slides in from RIGHT
      if (title2) {
        timeline.fromTo(
          title2,
          { x: 60, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out" },
          textStartTime + 0.2,
        );
      }

      // - Description Line 1 slides in from LEFT
      if (desc1) {
        timeline.fromTo(
          desc1,
          { x: -40, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
          textStartTime + 0.3,
        );
      }

      // - Description Line 2 slides in from RIGHT
      if (desc2) {
        timeline.fromTo(
          desc2,
          { x: 40, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.65, ease: "power3.out" },
          textStartTime + 0.4,
        );
      }

      // - Button pops up from BOTTOM with spring
      if (ctaBtn) {
        timeline.fromTo(
          ctaBtn,
          { y: 30, scale: 0.94, autoAlpha: 0 },
          { y: 0, scale: 1, autoAlpha: 1, duration: 0.65, ease: "back.out(1.5)" },
          textStartTime + 0.5,
        );
      }
    },
    [index, animating, slides.length],
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      goTo(index + 1, 1);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [index, paused, goTo]);

  const onPointerDown = (event: React.PointerEvent) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (!pointerStart.current) return;
    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    pointerStart.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : prev();
    }
  };

  return (
    <section
      aria-label="ASIR Containers Hero Showcase"
      className="relative w-full overflow-hidden bg-[#FBF8F3] min-h-[720px] sm:min-h-[760px] lg:h-[100svh] lg:max-h-[1080px] lg:min-h-[780px] flex flex-col justify-between"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      {/* ----------------- Background Images Slide Layer (Full Bleed View with Reduced Scrim) ----------------- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, slideIndex) => {
          const isActive = slideIndex === index;
          return (
            <div
              key={slide.id}
              ref={(node) => {
                imageRefs.current[slideIndex] = node;
              }}
              className={`absolute inset-0 transition-opacity duration-700 ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Full-bleed photography filling entire hero area */}
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={slideIndex === 0}
                className="object-cover object-[78%_center] lg:object-[82%_center]"
              />

              {/* Left scrim: slightly increased for optimal readability while keeping product photography open */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FBF8F3] via-[#FBF8F3]/80 sm:via-[#FBF8F3]/55 to-transparent w-full lg:w-[54%]" />
            </div>
          );
        })}
      </div>

      {/* ----------------- Left Foreground Editorial Content (Pauses autoplay when hovered here alone) ----------------- */}
      <div className="relative z-20 w-full pt-28 sm:pt-36 lg:pt-[8vw] pb-12 flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-[5.5vw]">
        <div
          className="w-full max-w-[560px] lg:max-w-[40vw]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {slides.map((slide, slideIndex) => {
            const isActive = slideIndex === index;
            return (
              <div
                key={slide.id}
                ref={(node) => {
                  contentRefs.current[slideIndex] = node;
                }}
                className={`${isActive ? "block" : "hidden"}`}
              >
                {/* 1. Eyebrow Text Line (Drops from TOP) */}
                <div className="overflow-hidden">
                  <p
                    data-anim-dir="top"
                    className={`font-mono text-xs sm:text-[13px] lg:text-[0.9vw] font-bold uppercase tracking-[0.24em] mb-3 sm:mb-4 lg:mb-[1.1vw] ${slide.colors.eyebrow}`}
                  >
                    {slide.eyebrow}
                  </p>
                </div>

                {/* 2. Title Text: Line 1 from LEFT & Line 2 from RIGHT */}
                <h1
                  ref={(node) => {
                    titleRefs.current[slideIndex] = node;
                  }}
                  className="font-display text-[2.85rem] sm:text-[3.8rem] lg:text-[4.5vw] font-black tracking-tight leading-[1.02]"
                >
                  <span className="block overflow-hidden">
                    <span data-anim-dir="left" className={`block ${slide.colors.title1}`}>
                      {slide.titleLine1}
                    </span>
                  </span>
                  <span className="block overflow-hidden">
                    <span data-anim-dir="right" className={`block ${slide.colors.title2}`}>
                      {slide.titleLine2}
                    </span>
                  </span>
                </h1>

                {/* 3. Description: Line 1 from LEFT & Line 2 from RIGHT */}
                <div className="mt-4 sm:mt-5 lg:mt-[1.3vw] text-[15px] sm:text-[16.5px] lg:text-[1.15vw] leading-[1.55] text-slate-700 font-normal space-y-1">
                  <div className="overflow-hidden">
                    <p data-anim-dir="desc1">{slide.descLine1}</p>
                  </div>
                  <div className="overflow-hidden">
                    <p data-anim-dir="desc2">{slide.descLine2}</p>
                  </div>
                </div>

                {/* 4. Button (Slides up from BOTTOM with spring) */}
                <div className="mt-7 sm:mt-8 lg:mt-[1.8vw] overflow-hidden">
                  <div data-anim-dir="btn">
                    <Link
                      href={slide.primary.href}
                      className={`group inline-flex items-center gap-3 lg:gap-[0.7vw] rounded-lg px-6 sm:px-7 lg:px-[1.8vw] py-3.5 lg:py-[0.85vw] text-[14.5px] sm:text-[15.5px] lg:text-[1.05vw] font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${slide.colors.btnBg}`}
                    >
                      <span>{slide.primary.label}</span>
                      <ArrowRight className="h-4 w-4 lg:h-[1vw] lg:w-[1vw] transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ----------------- Right Side Vertical Product Cards Sidebar ----------------- */}
      <div className="absolute right-4 sm:right-6 lg:right-10 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`group relative flex flex-col items-center w-[92px] overflow-hidden rounded-xl border transition-all duration-300 ${active
                  ? "border-slate-900 bg-white shadow-lg ring-1 ring-slate-900/40 scale-[1.04]"
                  : "border-slate-200/90 bg-white/90 backdrop-blur-sm hover:border-slate-300 hover:bg-white shadow-xs"
                }`}
            >
              {/* Image flush at the top with zero top padding */}
              <div className="relative w-full h-[48px] overflow-hidden">
                <Image
                  src={s.thumbnail}
                  alt={s.thumbTitle}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Text only below image with dedicated padding */}
              <div className="w-full px-1.5 py-2 text-center bg-inherit">
                <span className={`text-[10.5px] font-bold leading-tight block ${active ? s.colors.accentText : "text-slate-700"}`}>
                  {s.thumbTitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ----------------- Bottom Right Navigation Controls ----------------- */}
      <div className="relative z-30 pb-6 sm:pb-8 pt-2">
        <div className="shell flex items-center justify-end">
          <div className="flex items-center gap-3 rounded-full bg-white/80 p-1.5 shadow-sm backdrop-blur-sm border border-slate-200/60">
            {/* Prev button */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition-all duration-200 hover:border-[#002b49] hover:text-[#002b49] active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            {/* Counter */}
            <span className="px-2 font-mono text-xs font-bold text-slate-800 tracking-wider">
              <span className="text-slate-950 font-black">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-slate-400 font-normal"> / {String(slides.length).padStart(2, "0")}</span>
            </span>

            {/* Next button */}
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-800 transition-all duration-200 hover:border-[#002b49] hover:text-[#002b49] active:scale-95"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
