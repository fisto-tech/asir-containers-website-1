import Link from "next/link";
import { site } from "@/data/site";

type LogoProps = {
  /** "dark" renders for light backgrounds, "light" for dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
  /** Hide the wordmark (icon only) — used in tight spaces. */
  compact?: boolean;
};

/**
 * PLACEHOLDER LOGOTYPE
 * No official ASIR Containers logo file was supplied, so this is a typographic
 * stand-in built from the brand palette — not an invented logo mark.
 * Replace with the supplied logo: set `site.logo.src` in src/data/site.ts.
 */
export function Logo({ tone = "dark", className = "", compact = false }: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span
        aria-hidden
        className="relative flex h-9 w-9 shrink-0 items-center justify-center bg-brand transition-transform duration-500 group-hover:scale-95"
      >
        <span className="font-display text-[15px] font-bold leading-none tracking-tight text-white">
          A
        </span>
        <span className="absolute inset-x-[7px] bottom-[7px] h-[2px] bg-white/70" />
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[19px] font-semibold uppercase tracking-[0.14em] ${
              isLight ? "text-white" : "text-ink"
            }`}
          >
            Asir
          </span>
          <span
            className={`mt-[5px] text-[9px] font-semibold uppercase tracking-[0.34em] ${
              isLight ? "text-white/85" : "text-mid"
            }`}
          >
            Containers
          </span>
        </span>
      )}
    </Link>
  );
}
