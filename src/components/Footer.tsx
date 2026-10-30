import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
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

/** Clean outline application icons */
function PaintBrushIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 11-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11Z" />
      <path d="m5 2 5 5" />
      <path d="M2 13h15" />
      <path d="M22 20a2 2 0 1 1-4 0c0-1.6 1.7-2.6 2-4 .3 1.4 2 2.4 2 4Z" />
    </svg>
  );
}

function SeedlingIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22v-9" />
      <path d="M9 13a4.5 4.5 0 0 1 3-4.24 4.5 4.5 0 0 1 8 2.24c0 3-4 4-8 4" />
      <path d="M12 17c-4 0-8-1-8-4 0-2.5 3-4 5.5-3.5" />
    </svg>
  );
}

function CutleryIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2v20" />
      <path d="M18 2a4 4 0 0 1 4 4v4h-4" />
      <path d="M6 2v7a3 3 0 0 0 6 0V2" />
      <path d="M9 12v10" />
    </svg>
  );
}

function DropIcon({ className = "h-4 w-4" }: { className?: string }) {
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
    <footer className="relative bg-[#07090e] text-white overflow-hidden">
      {/* Background Graphic Image (public/images/footer-bg.png) - spans full height through copyright */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/footer-bg.png"
          alt="ASIR Industrial Packaging"
          fill
          priority={false}
          className="object-contain object-right"
        />
      </div>

      {/* Main Footer Content — fluid responsive vw scaling on desktop to scale proportionally with the background image */}
      <div className="relative z-10 w-full pt-14 pb-10 lg:pt-[4.5vw] lg:pb-[3.5vw] px-6 sm:px-10 lg:pl-[4.5vw] lg:pr-[2vw] lg:max-w-[70vw]">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-[2.5vw] items-stretch">
          
          {/* Column 1: Brand & About (3.8 cols) */}
          <div className="lg:col-span-4 pr-0 lg:pr-[0.5vw] flex flex-col justify-between">
            <div>
              <div className="flex items-center -mt-1 lg:-mt-[0.25vw]">
                <Logo tone="light" imageClassName="!h-11 sm:!h-12 lg:!h-[2.6vw]" />
              </div>

              <p className="mt-4 lg:mt-[1.1vw] text-[13.5px] lg:text-[0.82vw] leading-relaxed text-[#94a3b8] max-w-sm lg:max-w-[21vw] font-normal">
                ASIR Containers manufactures rigid plastic pails and containers for the paint, agro, food and lubricant industries — in round and square formats, with multiple closure options and industry-specific colour availability.
              </p>
            </div>

            {/* Social Icons aligned towards bottom */}
            <div className="mt-6 lg:mt-[1.6vw] flex items-center gap-3 lg:gap-[0.65vw]">
              <a
                href={site.social.find((s) => s.icon === "linkedin")?.href || "https://linkedin.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 lg:h-[2vw] lg:w-[2vw] items-center justify-center rounded-full border border-white/20 text-slate-300 transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                <LinkedinIcon className="h-4 w-4 lg:h-[0.9vw] lg:w-[0.9vw]" />
              </a>
              <a
                href={site.social.find((s) => s.icon === "instagram")?.href || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 lg:h-[2vw] lg:w-[2vw] items-center justify-center rounded-full border border-white/20 text-slate-300 transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                <InstagramIcon className="h-4 w-4 lg:h-[0.9vw] lg:w-[0.9vw]" />
              </a>
              <a
                href={site.social.find((s) => s.icon === "facebook")?.href || "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 lg:h-[2vw] lg:w-[2vw] items-center justify-center rounded-full border border-white/20 text-slate-300 transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                <FacebookIcon className="h-4 w-4 lg:h-[0.9vw] lg:w-[0.9vw]" />
              </a>
              <a
                href={site.social.find((s) => s.icon === "youtube")?.href || "https://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 lg:h-[2vw] lg:w-[2vw] items-center justify-center rounded-full border border-white/20 text-slate-300 transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
              >
                <YoutubeIcon className="h-4 w-4 lg:h-[0.9vw] lg:w-[0.9vw]" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact (2.8 cols) */}
          <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-[2.2vw]">
            <h3 className="font-display text-[15.5px] lg:text-[0.98vw] font-bold text-white tracking-wide">
              Contact
            </h3>
            <div className="mt-2.5 lg:mt-[0.55vw] flex h-[2px] w-full max-w-[120px] lg:max-w-[12vw]">
              <div className="h-full w-8 lg:w-[2.5vw] bg-brand shrink-0" />
              <div className="h-full w-full bg-white/15" />
            </div>

            <div className="mt-6 lg:mt-[1.3vw] space-y-4 lg:space-y-[0.85vw] text-[13.5px] lg:text-[0.82vw]">
              {/* Address */}
              <div className="flex items-start gap-3 lg:gap-[0.55vw]">
                <MapPin className="h-4.5 w-4.5 lg:h-[1vw] lg:w-[1vw] text-brand shrink-0 mt-0.5" />
                <p className="text-[#94a3b8] leading-relaxed text-[13px] lg:text-[0.8vw]">
                  1734-c1, Pallapatti Rd,<br />
                  near Central Excise Office<br />
                  Thiruthangal, Sivakasi,<br />
                  Tamil Nadu 626130
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 lg:gap-[0.55vw] pt-1 lg:pt-[0.2vw]">
                <Phone className="h-4.5 w-4.5 lg:h-[1vw] lg:w-[1vw] text-brand shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-[#94a3b8] hover:text-white transition-colors text-[13px] lg:text-[0.8vw]"
                >
                  +91 98765 43210
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 lg:gap-[0.55vw] pt-1 lg:pt-[0.2vw]">
                <Mail className="h-4.5 w-4.5 lg:h-[1vw] lg:w-[1vw] text-brand shrink-0" />
                <a
                  href="mailto:sales@asircontainers.com"
                  className="text-[#94a3b8] hover:text-white transition-colors text-[13px] lg:text-[0.8vw]"
                >
                  sales@asircontainers.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Navigate (2.2 cols) */}
          <div className="lg:col-span-2 lg:border-l lg:border-white/10 lg:pl-[2.2vw]">
            <h3 className="font-display text-[15.5px] lg:text-[0.98vw] font-bold text-white tracking-wide">
              Navigate
            </h3>
            <div className="mt-2.5 lg:mt-[0.55vw] flex h-[2px] w-full max-w-[120px] lg:max-w-[10vw]">
              <div className="h-full w-8 lg:w-[2.5vw] bg-brand shrink-0" />
              <div className="h-full w-full bg-white/15" />
            </div>

            <ul className="mt-6 lg:mt-[1.3vw] space-y-3.5 lg:space-y-[0.8vw]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block text-[13.5px] lg:text-[0.82vw] text-[#94a3b8] transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Applications (3 cols) */}
          <div className="lg:col-span-3 lg:border-l lg:border-white/10 lg:pl-[2.2vw]">
            <h3 className="font-display text-[15.5px] lg:text-[0.98vw] font-bold text-white tracking-wide">
              Applications
            </h3>
            <div className="mt-2.5 lg:mt-[0.55vw] flex h-[2px] w-full max-w-[120px] lg:max-w-[14vw]">
              <div className="h-full w-8 lg:w-[2.5vw] bg-brand shrink-0" />
              <div className="h-full w-full bg-white/15" />
            </div>

            <ul className="mt-6 lg:mt-[1.3vw] space-y-4 lg:space-y-[0.85vw]">
              {applicationsList.map((app) => {
                const Icon = app.icon;
                return (
                  <li key={app.label}>
                    <Link
                      href={app.href}
                      className="group flex items-center justify-between text-[13.5px] lg:text-[0.82vw] text-[#94a3b8] transition-colors hover:text-white max-w-[170px] lg:max-w-[14vw]"
                    >
                      <span className="flex items-center gap-2.5 lg:gap-[0.55vw]">
                        <Icon className="h-4 w-4 lg:h-[0.95vw] lg:w-[0.95vw] text-slate-400 transition-colors group-hover:text-white shrink-0" />
                        <span>{app.label}</span>
                      </span>
                      <span className="flex items-center gap-1.5 lg:gap-[0.3vw] tabular text-[12.5px] lg:text-[0.78vw] text-slate-400 group-hover:text-white">
                        <span>{app.count}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 lg:h-[0.82vw] lg:w-[0.82vw] text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar — transparent so the right side image expands down completely */}
      <div className="relative z-10 border-t border-white/10 py-5 lg:py-[1.2vw]">
        <div className="text-center">
          <p className="text-[13px] lg:text-[0.82vw] text-slate-400 font-normal">
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
