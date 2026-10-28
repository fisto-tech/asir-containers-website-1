"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [complete, setComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only show the preloader on initial page load / session
    const hasLoaded = sessionStorage.getItem("asir_preloaded");
    if (hasLoaded) {
      setComplete(true);
      return;
    }

    const start = performance.now();
    const duration = 900; // ms

    const frame = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => {
          setComplete(true);
          sessionStorage.setItem("asir_preloaded", "1");
        }, 300);
      }
    };

    const id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, []);

  if (complete) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-charcoal text-white transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Animated Brand Emblem */}
        <div className="relative mb-6 flex h-14 w-14 items-center justify-center bg-brand shadow-2xl transition-transform duration-500">
          <span className="font-display text-2xl font-bold leading-none tracking-tight text-white">
            A
          </span>
          <span className="absolute inset-x-2.5 bottom-2.5 h-[2px] bg-white/70" />
        </div>

        {/* Wordmark */}
        <div className="text-center">
          <span className="block font-display text-[22px] font-semibold uppercase tracking-[0.2em] text-white">
            Asir
          </span>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.4em] text-white/50">
            Containers
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="mt-8 flex w-48 flex-col items-center gap-2">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-brand transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="tabular text-[12px] font-medium tracking-widest text-white/40">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
