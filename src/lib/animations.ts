"use client";

/**
 * Shared GSAP setup + reusable animation patterns.
 *
 * Every component animates through these helpers so timing, easing and
 * reduced-motion behaviour stay consistent across the site.
 */

import { useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register once, and never during server rendering.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;

export const motionQuery = {
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
  all: "(prefers-reduced-motion: no-preference)",
};

export const reduceMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Animates any `[data-reveal]` descendant of `scope` as it enters the viewport.
 * Elements play in on scroll down and play back out when scrolled up again
 * (`toggleActions: play none none reverse`), so motion is always reversible.
 * Optional `data-reveal-delay="0.15"` staggers individual elements.
 */
export const useScrollReveal = (scope: RefObject<HTMLElement | null>) => {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const letters = gsap.utils.toArray<HTMLElement>('[data-reveal="letters"]', root);
      letters.forEach((element) => revealLines(element));

      const targets = gsap.utils
        .toArray<HTMLElement>("[data-reveal]", root)
        .filter((element) => element.dataset.reveal !== "letters");
      const masks = gsap.utils.toArray<HTMLElement>("[data-reveal-mask]", root);

      if (!targets.length && !masks.length) return;

      if (reduceMotion()) {
        gsap.set([...targets, ...masks], { opacity: 1, y: 0, clearProps: "clipPath" });
        return;
      }

      targets.forEach((element) => {
        const delay = Number(element.dataset.revealDelay ?? 0);
        const fromX = element.dataset.revealAxis === "x";
        gsap.set(element, { opacity: 0, y: fromX ? 0 : 16, x: fromX ? 16 : 0 });

        ScrollTrigger.create({
          trigger: element,
          start: "top 96%",
          end: "top 25%",
          invalidateOnRefresh: true,
          onEnter: () => gsap.to(element, { opacity: 1, y: 0, x: 0, duration: 0.95, delay, ease: EASE.out, overwrite: "auto" }),
          onEnterBack: () => gsap.to(element, { opacity: 1, y: 0, x: 0, duration: 0.7, ease: EASE.out, overwrite: "auto" }),
          onLeaveBack: () =>
            gsap.to(element, { opacity: 0, y: fromX ? 0 : 16, x: fromX ? 16 : 0, duration: 0.45, ease: "power2.in", overwrite: "auto" }),
        });
      });

      masks.forEach((element) => {
        gsap.set(element, { clipPath: "inset(0% 0% 100% 0%)" });

        ScrollTrigger.create({
          trigger: element,
          start: "top 96%",
          end: "top 25%",
          invalidateOnRefresh: true,
          onEnter: () =>
            gsap.to(element, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "expo.out", overwrite: "auto" }),
          onEnterBack: () =>
            gsap.to(element, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.out", overwrite: "auto" }),
          onLeaveBack: () =>
            gsap.to(element, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.5, ease: "power2.in", overwrite: "auto" }),
        });
      });
    },
    { scope },
  );
};

/** Wrapper hook for components that need a reveal scope ref. */
export const useRevealScope = () => {
  const ref = useRef<HTMLElement | null>(null);
  useScrollReveal(ref);
  return ref;
};

/**
 * Splits a heading into characters and lifts each one out of a masked line — a
 * per-letter rise from below. Words stay whole so line breaking still behaves.
 *
 * Where the heading also carries a `sheen-*` class, the CSS gradient is dropped
 * and a GSAP colour wave takes over instead: red travels letter by letter, then
 * rests for several seconds before the next pass. Per-letter boxes cannot share
 * one clipped gradient, so the highlight is animated on `color` here.
 */
export const revealLines = (
  element: HTMLElement,
  options: {
    delay?: number;
    scrollTrigger?: boolean;
    stagger?: number;
    mode?: "letters" | "words";
  } = {},
) => {
  if (reduceMotion()) {
    gsap.set(element, { opacity: 1 });
    return () => {};
  }

  const label = element.textContent?.trim() ?? "";
  const mode = options.mode ?? "letters";

  /* Continuous title wave, if this heading asked for it. */
  const sheenClass = Array.from(element.classList).find((name) => name.startsWith("sheen-"));
  /* Drop the gradient first — while it is live the element computes to a
     transparent fill, so the resting colour has to be read afterwards. */
  if (sheenClass) element.classList.remove(sheenClass);
  let baseColor = getComputedStyle(element).color;
  if (/rgba?\(\s*0,\s*0,\s*0,\s*0\s*\)/.test(baseColor)) {
    baseColor = sheenClass === "sheen-light" ? "#ffffff" : "#111111";
  }
  const accentColor = sheenClass === "sheen-brand" ? "#111111" : "#e51827";
  if (sheenClass) element.style.color = baseColor;

  const split = SplitText.create(element, {
    type: mode === "words" ? "lines,words" : "lines,words,chars",
    mask: "lines",
    linesClass: "split-line",
    wordsClass: "split-word",
    charsClass: "split-char",
    aria: "auto",
  });

  const pieces =
    mode === "words"
      ? split.words?.length
        ? split.words
        : split.lines
      : split.chars?.length
        ? split.chars
        : split.lines;

  const play = (from: "down" | "up") =>
    gsap.fromTo(
      pieces,
      { yPercent: 120, opacity: 0, rotate: mode === "letters" ? 2 : 0 },
      {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        duration: from === "down" ? 0.8 : 0.55,
        stagger: options.stagger ?? (mode === "letters" ? 0.016 : 0.035),
        delay: options.delay ?? 0,
        ease: "power3.out",
        overwrite: "auto",
      },
    );

  gsap.set(pieces, { yPercent: 120, opacity: 0 });
  /* The heading itself carries [data-reveal], which CSS hides once JS boots —
     the per-letter children animate, so the box must be lifted here. */
  gsap.set(element, { opacity: 1 });

  element.setAttribute("aria-label", label);

  /* Colour wave: one slow pass, then a long rest. */
  let wave: gsap.core.Timeline | null = null;
  if (sheenClass && mode === "letters" && pieces.length > 3) {
    wave = gsap.timeline({ repeat: -1, repeatDelay: 7.5, delay: 1.6 });
    wave
      .to(pieces, {
        color: accentColor,
        duration: 1.4,
        stagger: { each: 0.035, from: "start" },
        ease: "sine.inOut",
      })
      .to(
        pieces,
        {
          color: baseColor,
          duration: 1.9,
          stagger: { each: 0.028, from: "start" },
          ease: "sine.inOut",
        },
        "-=0.5",
      );
  }
  void wave;

  const trigger =
    options.scrollTrigger === false
      ? null
      : ScrollTrigger.create({
          trigger: element,
          start: "top 95%",
          end: "top 20%",
          invalidateOnRefresh: true,
          onEnter: () => play("down"),
          onEnterBack: () => play("up"),
          onLeaveBack: () =>
            gsap.to(pieces, { yPercent: 120, opacity: 0, duration: 0.35, ease: "power2.in", overwrite: "auto" }),
        });

  if (!trigger) play("down");

  return () => {
    wave?.kill();
    trigger?.kill();
    split.revert();
  };
};

/**
 * Reveals every `[data-reveal-mask]` element inside `scope` with a clip-path
 * wipe. Used by components that drive their own ScrollTrigger timelines
 * instead of wrapping their markup in <Reveal>.
 */
export const revealMasks = (scope: HTMLElement | null) => {
  if (!scope) return;
  const masks = gsap.utils.toArray<HTMLElement>("[data-reveal-mask]", scope);
  if (!masks.length) return;

  if (reduceMotion()) {
    gsap.set(masks, { clearProps: "clipPath" });
    return;
  }

  masks.forEach((element) => {
    gsap.set(element, { clipPath: "inset(0% 0% 100% 0%)" });

    ScrollTrigger.create({
      trigger: element,
      start: "top 96%",
      end: "top 25%",
      invalidateOnRefresh: true,
      onEnter: () =>
        gsap.to(element, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "expo.out", overwrite: "auto" }),
      onEnterBack: () =>
        gsap.to(element, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "expo.out", overwrite: "auto" }),
      onLeaveBack: () =>
        gsap.to(element, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.5, ease: "power2.in", overwrite: "auto" }),
    });
  });
};

/** Simple fade/rise entrance used for page loads (no ScrollTrigger). */
export const entrance = (targets: gsap.TweenTarget, options: { delay?: number; y?: number } = {}) => {
  if (reduceMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return;
  }
  gsap.fromTo(
    targets,
    { opacity: 0, y: options.y ?? 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: options.delay ?? 0,
      stagger: 0.08,
      ease: EASE.out,
    },
  );
};

/** Parallax a media element against scroll; desktop only. */
export const parallax = (target: HTMLElement, distance = 90) => {
  if (reduceMotion()) return;
  gsap.matchMedia().add(motionQuery.desktop, () => {
    const tween = gsap.fromTo(
      target,
      { yPercent: -distance / 10 },
      {
        yPercent: distance / 10,
        ease: "none",
        scrollTrigger: {
          trigger: target.parentElement ?? target,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
    return () => tween.kill();
  });
};

/** Magnetic-ish hover for primary buttons (skipped on touch / reduced motion). */
export const attachMagnetic = (element: HTMLElement, strength = 0.18) => {
  if (reduceMotion() || !window.matchMedia("(hover: hover)").matches) return () => {};
  const xTo = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
  const yTo = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });

  const move = (event: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
    yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const leave = () => {
    xTo(0);
    yTo(0);
  };

  element.addEventListener("mousemove", move);
  element.addEventListener("mouseleave", leave);
  return () => {
    element.removeEventListener("mousemove", move);
    element.removeEventListener("mouseleave", leave);
  };
};
