import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

type LogoProps = {
  /** "dark" renders for light backgrounds, "light" for dark backgrounds. */
  tone?: "dark" | "light";
  className?: string;
  imageClassName?: string;
  /** Hide the wordmark (icon only) — used in tight spaces. */
  compact?: boolean;
};

/**
 * Official ASIR Containers brand logo.
 */
export function Logo({ tone = "dark", className = "", imageClassName = "", compact = false }: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`group inline-flex items-center transition-opacity hover:opacity-90 ${className}`}
    >
      {/* 
        The official SVG logo has viewBox 0 0 53 16 (aspect ratio 53:16 ~ 3.31:1).
        When tone is light (over hero dark background or dark footer), we invert the dark letters to crisp white
        while preserving the red flame icon mark cleanly.
      */}
      <div
        className={`relative flex items-center transition-all ${
          isLight ? "brightness-0 invert drop-shadow-xs" : ""
        }`}
      >
        <Image
          src="/images/asir-containers-logo.svg"
          alt={site.name}
          width={232}
          height={90}
          priority
          className={`h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] ${imageClassName}`}
        />
      </div>
    </Link>
  );
}
