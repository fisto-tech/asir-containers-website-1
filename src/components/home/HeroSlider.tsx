"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play, Pause } from "lucide-react";
import { gsap, SplitText, reduceMotion, EASE } from "@/lib/animations";
import { heroSlides } from "@/data/home";
import { AnimatedIcon, type IconName } from "@/components/ui/AnimatedIcon";

const SLIDE_DURATION = 7500;

const slideIcons: Record<string, IconName> = {
  paint: "paint",
  square: "lock",
  codes: "codes",
};

/**
 * Full-bleed hero carousel.
 * - GSAP crossfades the imagery and masked SplitText headline per slide
 * - Autoplay pauses on hover, focus, touch and after any manual navigation
 * - Swipeable, keyboard operable, and fully static without JavaScript
 */
export function HeroSlider() {
  const slides = heroSlides;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const animating = useRef(false);
  const splits = useRef<SplitText[]>([]);

  const trackSplit = (split: SplitText) => {
    splits.current.push(split);
  };

  /* ------------------------------------------------------------- first slide */
  useEffect(() => {
    const image = imageRefs.current[0];
    const content = contentRefs.current[0];
    const title = titleRefs.current[0];
    if (!image || !content || !title) return;

    if (reduceMotion()) {
      gsap.set([image, content], { autoAlpha: 1 });
      return;
    }

    const split = SplitText.create(title, {
      type: "lines",
      mask: "lines",
      linesClass: "split-line",
      aria: "auto",
    });
    trackSplit(split);

    const timeline = gsap.timeline();
    timeline
      .fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 0)
      .fromTo(
        image,
        { autoAlpha: 0, scale: 1.08 },
        { autoAlpha: 1, scale: 1, duration: 1.9, ease: "expo.out" },
        0,
      )
      .from(
        split.lines,
        { yPercent: 115, duration: 1.35, stagger: 0.11, ease: "expo.out" },
        0.25,
      )
      .fromTo(
        content.querySelectorAll<HTMLElement>("[data-hero-fade]"),
        { autoAlpha: 0, y: 18 },
        { autoAlpha: 1, y: 0, duration: 1.05, stagger: 0.12, ease: EASE.out },
        0.5,
      );

    return () => {
      timeline.kill();
      split.revert();
    };
  }, []);

  useEffect(() => {
    const allSplits = splits.current;
    return () => allSplits.forEach((split) => split.revert());
  }, []);

  /* --------------------------------------------------------------- navigation */
  const goTo = useCallback(
    (nextIndex: number, direction: 1 | -1 = 1, byUser = true) => {
      const total = slides.length;
      const target = (nextIndex + total) % total;
      if (target === index || animating.current) return;

      const currentImage = imageRefs.current[index];
      const currentContent = contentRefs.current[index];
      const nextImage = imageRefs.current[target];
      const nextContent = contentRefs.current[target];
      const nextTitle = titleRefs.current[target];
      if (!currentImage || !currentContent || !nextImage || !nextContent) return;

      animating.current = true;
      setIndex(target);
      setProgressKey((key) => key + 1);
      if (byUser) {
        setPaused(true);
        setUserPaused(true);
      }

      if (reduceMotion()) {
        gsap.set([currentImage, currentContent], { autoAlpha: 0 });
        gsap.set([nextImage, nextContent], { autoAlpha: 1 });
        animating.current = false;
        return;
      }

      const split = nextTitle
        ? SplitText.create(nextTitle, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            aria: "auto",
          })
        : null;
      if (split) trackSplit(split);

      const timeline = gsap.timeline({
        onComplete: () => {
          animating.current = false;
          if (split) {
            splits.current = splits.current.filter((item) => item !== split);
            split.revert();
          }
        },
      });

      timeline
        .to(currentContent, { autoAlpha: 0, y: -18 * direction, duration: 0.5, ease: "power2.in" }, 0)
        .to(currentImage, { autoAlpha: 0, scale: 1.04, duration: 1.1, ease: "power2.inOut" }, 0)
        .fromTo(
          nextImage,
          { autoAlpha: 0, scale: 1.07 },
          { autoAlpha: 1, scale: 1, duration: 1.55, ease: "expo.out" },
          0.15,
        )
        .fromTo(nextContent, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, 0.3)
        .from(
          split ? split.lines : [],
          { yPercent: 115, duration: 1.25, stagger: 0.09, ease: "expo.out" },
          0.45,
        )
        .fromTo(
          nextContent.querySelectorAll<HTMLElement>("[data-hero-fade]"),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.95, stagger: 0.1, ease: EASE.out },
          0.55,
        );
    },
    [index, slides.length],
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  /* ----------------------------------------------------------------- autoplay */
  useEffect(() => {
    if (paused || userPaused || reduceMotion()) return;
    const timer = window.setTimeout(() => goTo(index + 1, 1, false), SLIDE_DURATION);
    return () => window.clearTimeout(timer);
  }, [index, paused, userPaused, goTo]);

  /* ------------------------------------------------------- touch / pointer swipe */
  const onPointerDown = (event: React.PointerEvent) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent) => {
    if (!pointerStart.current) return;
    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    pointerStart.current = null;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? next() : previous();
    }
  };

  const toggleAutoplay = () => {
    setUserPaused((value) => !value);
    setPaused(false);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="ASIR Containers highlights"
      className="relative isolate flex min-h-[660px] w-full flex-col justify-end overflow-hidden bg-charcoal text-white lg:h-[100svh] lg:max-h-[1080px] lg:min-h-[720px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setPaused(false);
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onTouchStart={() => setPaused(true)}
    >
      {slides.map((slide, slideIndex) => {
        const isActive = slideIndex === index;
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${slideIndex + 1} of ${slides.length}: ${slide.label}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 ${isActive ? "" : "pointer-events-none"}`}
          >
            <div
              ref={(node) => {
                imageRefs.current[slideIndex] = node;
              }}
              className="absolute inset-0 [.js_&]:opacity-0"
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={slideIndex === 0}
                sizes="100vw"
                className="ambient-media-slow object-cover"
              />
            </div>

            {/* Legibility scrims — a dark industrial base with a red hint */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/35" />
            <div className="absolute inset-0 bg-[radial-gradient(120%_95%_at_0%_95%,rgba(17,17,17,0.92)_0%,rgba(17,17,17,0.15)_55%,transparent_85%)]" />

            <div
              ref={(node) => {
                contentRefs.current[slideIndex] = node;
              }}
              className={`relative z-10 flex h-full flex-col justify-end pb-28 pt-32 [.js_&]:opacity-0 lg:pb-32 ${
                isActive ? "" : "invisible"
              }`}
            >
              <div className="shell">
                <div className="max-w-3xl">
                  <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85" data-hero-fade>
                    <AnimatedIcon
                      name={slideIcons[slide.id] ?? "boxes"}
                      motion="pulse"
                      className="h-4 w-4 text-brand"
                    />
                    {slide.eyebrow}
                  </p>

                  <h1
                    ref={(node) => {
                      titleRefs.current[slideIndex] = node;
                    }}
                    className="display-xl mt-6 whitespace-pre-line sheen-light"
                  >
                    {slide.title}
                  </h1>

                  <p
                    data-hero-fade
                    className="mt-7 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base"
                  >
                    {slide.copy}
                  </p>

                  <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
                    <Link
                      href={slide.primary.href}
                      className="group/cta inline-flex h-13 items-center gap-2 bg-brand px-6 text-sm font-medium transition-colors hover:bg-brand-dark"
                    >
                      {slide.primary.label}
                      <ArrowRight
                        aria-hidden
                        className="h-4 w-4 transition-transform group-hover/cta:translate-x-1"
                      />
                    </Link>
                    <Link
                      href={slide.secondary.href}
                      className="inline-flex h-13 items-center border border-white/30 px-6 text-sm font-medium transition-colors hover:border-white hover:bg-white hover:text-ink"
                    >
                      {slide.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Control bar */}
      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/15 bg-ink/30 backdrop-blur-[2px]">
        <div className="shell flex h-20 items-stretch justify-between gap-4">
          <div className="flex flex-1 items-stretch">
            {slides.map((slide, slideIndex) => {
              const active = slideIndex === index;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goTo(slideIndex, slideIndex > index ? 1 : -1)}
                  aria-label={`Show slide ${slideIndex + 1}: ${slide.label}`}
                  aria-current={active ? "true" : undefined}
                  className="group relative flex flex-1 flex-col justify-center gap-2.5 pr-4 text-left"
                >
                  <span className="flex items-baseline gap-2.5">
                    <span
                      className={`tabular text-[10px] font-semibold transition-colors ${
                        active ? "text-brand" : "text-white/85 group-hover:text-white/85"
                      }`}
                    >
                      {String(slideIndex + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`hidden truncate text-[11px] font-medium uppercase tracking-[0.16em] transition-colors sm:block ${
                        active ? "text-white" : "text-white/85 group-hover:text-white/85"
                      }`}
                    >
                      {slide.label}
                    </span>
                  </span>
                  <span className="relative h-[2px] w-full overflow-hidden bg-white/20">
                    {active && (
                      <span
                        key={`${slideIndex}-${progressKey}`}
                        className="absolute inset-y-0 left-0 w-full origin-left bg-brand"
                        style={{
                          animation: reduceMotion()
                            ? undefined
                            : `hero-progress ${SLIDE_DURATION}ms linear forwards`,
                          animationPlayState: paused || userPaused ? "paused" : "running",
                          transform: reduceMotion() ? "scaleX(1)" : undefined,
                        }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="mr-2 hidden items-baseline gap-1 tabular text-xs text-white/85 sm:flex">
              <span className="text-sm text-white">{String(index + 1).padStart(2, "0")}</span>
              / {String(slides.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={toggleAutoplay}
              aria-label={userPaused ? "Resume slideshow" : "Pause slideshow"}
              className="hidden h-11 w-11 items-center justify-center border border-white/25 transition-colors hover:border-white hover:bg-white hover:text-ink sm:flex"
            >
              {userPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={previous}
              aria-label="Previous slide"
              className="flex h-11 w-11 items-center justify-center border border-white/25 transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="flex h-11 w-11 items-center justify-center border border-white/25 transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <Link
        href="/products"
        aria-label="Browse the ASIR Containers range"
        className="group absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/85 transition-colors hover:text-white 2xl:flex"
      >
        <span className="[writing-mode:vertical-rl]">Range · 17 containers</span>
        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 text-brand transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </Link>

      <style>{`@keyframes hero-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>
    </section>
  );
}
