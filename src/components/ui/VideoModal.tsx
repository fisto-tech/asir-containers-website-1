"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap, reduceMotion } from "@/lib/animations";

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  videoSrc?: string;
  poster?: string;
  /** Shown when no video has been supplied yet. */
  fallback?: React.ReactNode;
};

export function VideoModal({ open, onClose, title, videoSrc, poster, fallback }: VideoModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], video, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    if (!reduceMotion() && panelRef.current) {
      gsap.fromTo(panelRef.current, { opacity: 0, y: 24, scale: 0.98 }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.55,
        ease: "expo.out",
      });
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm sm:p-8"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-3xl border border-white/10 bg-charcoal text-white"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <p className="text-[13px] text-white/85">
            {title}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close video"
            className="flex h-9 w-9 items-center justify-center border border-white/20 transition-colors hover:border-white hover:bg-white hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-ink">
          {videoSrc ? (
            <video
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={poster}
              className="h-full w-full object-cover"
            >
              <source src={videoSrc} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
              <span aria-hidden className="flex h-12 w-12 items-center justify-center border border-white/20">
                <span className="h-2 w-2 bg-brand" />
              </span>
              <div className="max-w-sm">{fallback}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
