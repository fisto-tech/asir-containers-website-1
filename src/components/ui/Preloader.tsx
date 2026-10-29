"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";

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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-charcoal transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Brand Logo - Enlarged on clean white background */}
        <div className="relative mb-6 flex items-center justify-center transition-transform duration-500">
          <Logo tone="dark" imageClassName="!h-14 sm:!h-16 md:!h-20" />
        </div>

        {/* Minimal Progress Bar - Tailored for white theme */}
        <div className="mt-4 flex w-56 flex-col items-center gap-2.5">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
            <div
              className="h-full bg-brand transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="tabular text-[12px] font-semibold tracking-widest text-charcoal/40">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
