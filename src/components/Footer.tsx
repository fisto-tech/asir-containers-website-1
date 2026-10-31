"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/data/site";

const year = new Date().getFullYear();

/** Social icons with rounded circular border */
function LinkedinIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.39 9.74v-8.37H5.07v8.37h2.78Z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/** Clean outline application icons matching reference mockup */
function PaintBrushIcon({ className = "h-4.5 w-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
      <path d="m5 2 5 5" />
      <path d="M2 13h15" />
      <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.6 2-4 .3 1.4 2 2.4 2 4Z" />
    </svg>
  );
}

function SeedlingIcon({ className = "h-4.5 w-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-9" />
      <path d="M9 13a4.5 4.5 0 0 1 3-4.24 4.5 4.5 0 0 1 8 2.24c0 3-4 4-8 4" />
      <path d="M12 17c-4 0-8-1-8-4 0-2.5 3-4 5.5-3.5" />
    </svg>
  );
}

function CutleryIcon({ className = "h-4.5 w-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2v20" />
      <path d="M18 2a4 4 0 0 1 4 4v4h-4" />
      <path d="M6 2v7a3 3 0 0 0 6 0V2" />
      <path d="M9 12v10" />
    </svg>
  );
}

function DropIcon({ className = "h-4.5 w-4.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-6-1.5-1.6-3-3.9-4-7-1 3.1-2.5 5.4-4 7-2 2.1-3 4-3 6a7 7 0 0 0 7 7Z" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Process", href: "/process" },
  { label: "Technologies", href: "/technologies" },
  { label: "Contact", href: "/contact" },
];

const applicationsList = [
  { label: "Paint", count: "12", href: "/products?application=paint", icon: PaintBrushIcon },
  { label: "Agro", count: "10", href: "/products?application=agro", icon: SeedlingIcon },
  { label: "Food", count: "10", href: "/products?application=food", icon: CutleryIcon },
  { label: "Lube", count: "04", href: "/products?application=lube", icon: DropIcon },
];

export function Footer() {
  return (
    <footer className="relative bg-white text-slate-900 overflow-hidden border-t border-slate-200/80">
      {/* Background Graphic Image (public/images/footer-bg.webp) - spans full width with pails on right */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/footer-bg.webp"
          alt="ASIR Industrial Packaging"
          fill
          priority={false}
          className="object-cover object-right"
        />
      </div>

      {/* Main Footer Content — clean flex layout so columns have rock-solid widths */}
      <div className="relative z-10 w-full pt-12 pb-12 lg:pt-16 lg:pb-16 px-6 sm:px-10 lg:pl-[4.5vw]">
        <div className="flex flex-col sm:flex-row flex-wrap lg:flex-nowrap items-start gap-8 lg:gap-8 xl:gap-10">
          
          {/* Column 1: Brand & About */}
          <div className="w-full sm:w-[300px] lg:w-[320px] xl:w-[340px] shrink-0 flex flex-col justify-between">
            <div>
              <div className="flex items-center -mt-1">
                <Logo tone="dark" imageClassName="!h-11 sm:!h-12" />
              </div>

              <p className="mt-5 text-[14.5px] sm:text-[15px] leading-relaxed text-slate-600 font-normal">
                ASIR Containers manufactures rigid plastic pails and containers for the paint, agro, food and lubricant industries — in round and square formats, with multiple closure options and industry-specific colour availability.
              </p>
            </div>

            {/* Social Icons */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href={site.social.find((s) => s.icon === "linkedin")?.href || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-slate-100 hover:bg-brand hover:text-white text-slate-800 transition-colors shadow-xs"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a
                href={site.social.find((s) => s.icon === "instagram")?.href || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-slate-100 hover:bg-brand hover:text-white text-slate-800 transition-colors shadow-xs"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={site.social.find((s) => s.icon === "facebook")?.href || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-slate-100 hover:bg-brand hover:text-white text-slate-800 transition-colors shadow-xs"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={site.social.find((s) => s.icon === "youtube")?.href || "https://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-slate-100 hover:bg-brand hover:text-white text-slate-800 transition-colors shadow-xs"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
            </div>

            {/* Red accent line indicator */}
            <div className="mt-7 flex items-center">
              <div className="h-[2.5px] w-12 bg-brand" />
              <div className="h-[1px] w-28 bg-slate-200" />
            </div>
          </div>

          {/* Column 2: Contact Card */}
          <div className="w-full sm:w-[275px] lg:w-[275px] shrink-0 rounded-2xl bg-[#FFF6F6] border border-[#FEE1E1] p-5 shadow-xs">
            <h3 className="font-display text-[17.5px] font-bold text-ink tracking-tight leading-none">
              Contact
            </h3>
            <div className="mt-2.5 mb-5 h-[2px] w-6 bg-brand" />

            <div className="space-y-3.5">
              {/* Address */}
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FEECEB] text-brand mt-0.5">
                  <MapPin className="h-4 w-4" />
                </span>
                <p className="text-slate-700 text-[13.5px] sm:text-[14px] leading-relaxed font-normal">
                  1734-c1, Pallapatti Rd,<br />
                  near Central Excise Office<br />
                  Thiruthangal, Sivakasi,<br />
                  Tamil Nadu 626130
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 pt-0.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FEECEB] text-brand">
                  <Phone className="h-4 w-4" />
                </span>
                <a
                  href="tel:+919876543210"
                  className="text-slate-800 text-[14px] sm:text-[14.5px] font-medium hover:text-brand transition-colors"
                >
                  +91 98765 43210
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 pt-0.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FEECEB] text-brand">
                  <Mail className="h-4 w-4" />
                </span>
                <a
                  href="mailto:sales@asircontainers.com"
                  className="text-slate-800 text-[14px] sm:text-[14.5px] font-medium hover:text-brand transition-colors"
                >
                  sales@asircontainers.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Navigate — pt-5 on desktop so header aligns with Contact */}
          <div className="w-full sm:w-[145px] lg:w-[145px] shrink-0 pt-0 sm:pt-5">
            <h3 className="font-display text-[17.5px] font-bold text-ink tracking-tight leading-none">
              Navigate
            </h3>
            <div className="mt-2.5 mb-5 h-[2px] w-6 bg-brand" />

            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between text-[14.5px] sm:text-[15px] font-medium text-slate-700 hover:text-brand py-2 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Applications — pt-5 on desktop so header aligns with Contact */}
          <div className="w-full sm:w-[175px] lg:w-[175px] shrink-0 pt-0 sm:pt-5">
            <h3 className="font-display text-[17.5px] font-bold text-ink tracking-tight leading-none">
              Applications
            </h3>
            <div className="mt-2.5 mb-5 h-[2px] w-6 bg-brand" />

            <ul className="space-y-1">
              {applicationsList.map((app) => {
                const Icon = app.icon;
                return (
                  <li key={app.label}>
                    <Link
                      href={app.href}
                      className="group flex items-center justify-between text-[14.5px] sm:text-[15px] font-medium text-slate-700 hover:text-brand py-2 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="h-4.5 w-4.5 text-brand shrink-0" />
                        <span>{app.label}</span>
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[13px] text-slate-400 group-hover:text-brand transition-colors">
                        <span>{app.count}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar with Slogan */}
      <div className="relative z-10 border-t border-slate-200/80 py-5 px-6 sm:px-10 lg:px-[5vw]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Tagline marker */}
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-8 bg-brand shrink-0" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
              BUILT FOR A BRIGHTER TOMORROW
            </span>
          </div>

          {/* Right: Copyright Text */}
          <div className="text-center sm:text-right pr-0 sm:pr-16">
            <p className="text-[13px] text-slate-500 font-normal">
              © {year} {site.name}. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
