"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, reduceMotion } from "@/lib/animations";

type CounterProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  /** Seconds. Slightly long on purpose so the count reads. */
  duration?: number;
  /** Keep counting: run up, hold, reset, run again. */
  loop?: boolean;
  className?: string;
};

/** Counts up from 0 when scrolled into view. Renders the final value if
 *  JavaScript or motion is unavailable. */
export function Counter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.6,
  loop = false,
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node) return;

      if (reduceMotion()) {
        node.textContent = `${prefix}${value}${suffix}`;
        return;
      }

      const state = { current: 0 };
      const write = () => {
        node.textContent = `${prefix}${Math.round(state.current)}${suffix}`;
      };
      const run = () => {
        gsap.killTweensOf(state);
        if (loop) {
          gsap.fromTo(
            state,
            { current: 0 },
            {
              current: value,
              duration,
              ease: "power2.out",
              snap: { current: 1 },
              repeat: -1,
              repeatDelay: 4.2,
              onRepeat: () => {
                state.current = 0;
                write();
              },
              onUpdate: write,
            },
          );
          return;
        }
        gsap.to(state, {
          current: value,
          duration,
          ease: "power2.out",
          snap: { current: 1 },
          overwrite: "auto",
          onUpdate: write,
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: node,
        start: "top 94%",
        end: "top 25%",
        invalidateOnRefresh: true,
        onEnter: run,
        onEnterBack: run,
        onLeaveBack: () => {
          state.current = 0;
          write();
        },
      });

      return () => {
        trigger.kill();
        gsap.killTweensOf(state);
        write();
      };
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`tabular ${className}`} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
