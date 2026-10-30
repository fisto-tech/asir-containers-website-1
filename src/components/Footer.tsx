import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { AnimatedIcon, applicationIcons } from "@/components/ui/AnimatedIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site, navigation } from "@/data/site";
import { applications, applicationCount, rangeStats } from "@/data/products";

const year = new Date().getFullYear();

/** Authentic filled brand icons (LinkedIn, Instagram, Facebook, YouTube) */
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.39 9.74v-8.37H5.07v8.37h2.78Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
};

export function Footer() {
  const { contact } = site;

  return (
    <footer className="relative bg-charcoal text-white">
      <div className="h-1 w-full bg-brand" />

      <div className="shell py-12 lg:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-12">
          {/* Col 1: Brand & Bio */}
          <div className="flex flex-col">
            <div className="flex items-center pb-3 border-b border-white/10 lg:border-transparent lg:pb-0">
              <Logo tone="light" imageClassName="!h-14 sm:!h-16" />
            </div>
            <p className="mt-5 text-[13.5px] leading-relaxed text-white/70 max-w-sm">
              {site.description}
            </p>
          </div>

          {/* Col 2: Contact Details + Socials */}
          <div className="flex flex-col">
            <div className="border-b border-white/15 pb-2">
              <h3 className="font-display text-[15.5px] font-semibold tracking-tight text-white">
                Contact
              </h3>
            </div>
            <div className="mt-4 space-y-3 text-[13.5px]">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  [contact.addressLines.join(", "), contact.country].filter(Boolean).join(", ")
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group/addr flex items-start gap-2.5 text-white/65 transition-colors hover:text-white"
              >
                <AnimatedIcon
                  name="pin"
                  motion="pulse"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                />
                <span className="leading-relaxed">
                  {contact.addressLines.length > 0 ? (
                    contact.addressLines.map((line) => (
                      <span key={line} className="block group-hover/addr:underline decoration-white/30 underline-offset-2">
                        {line}
                      </span>
                    ))
                  ) : (
                    <span>Registered address to be supplied</span>
                  )}
                </span>
              </a>

              {contact.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="group/phone flex items-center gap-2.5 text-white/65 transition-colors hover:text-white"
                >
                  <AnimatedIcon name="phone" motion="swing" className="h-4 w-4 shrink-0 text-brand" />
                  <span className="group-hover/phone:underline decoration-white/30 underline-offset-2 tabular">
                    {contact.phone}
                  </span>
                </a>
              )}

              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="group/mail flex items-center gap-2.5 text-white/65 transition-colors hover:text-white"
                >
                  <AnimatedIcon name="mail" motion="float" className="h-4 w-4 shrink-0 text-brand" />
                  <span className="group-hover/mail:underline decoration-white/30 underline-offset-2">
                    {contact.email}
                  </span>
                </a>
              )}
            </div>

            {/* Social media below contact */}
            {site.social.length > 0 && (
              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                {site.social.map((link) => {
                  const Icon = socialIcons[link.icon];
                  if (!Icon) return null;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${site.name} on ${link.label}`}
                      title={link.label}
                      className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.05] text-white/80 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_6px_16px_rgba(229,24,39,0.45)]"
                    >
                      <Icon
                        aria-hidden
                        className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                      />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Col 3: Navigation links */}
          <nav aria-label="Footer" className="flex flex-col">
            <div className="border-b border-white/15 pb-2">
              <h3 className="font-display text-[15.5px] font-semibold tracking-tight text-white">
                Navigate
              </h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-[13.5px] text-white/65 transition-all duration-200 hover:translate-x-1 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 4: Applications */}
          <div className="flex flex-col">
            <div className="border-b border-white/15 pb-2">
              <h3 className="font-display text-[15.5px] font-semibold tracking-tight text-white">
                Applications
              </h3>
            </div>
            <ul className="mt-4 space-y-2.5">
              {applications.map((application) => (
                <li key={application.slug}>
                  <Link
                    href={`/products?application=${application.slug}`}
                    className="group flex items-center justify-between text-[13.5px] text-white/65 transition-colors hover:text-white"
                  >
                    <span className="flex items-center gap-2.5">
                      <AnimatedIcon
                        name={applicationIcons[application.slug]}
                        motion="none"
                        className="h-3.5 w-3.5 text-white/50 transition-colors group-hover:text-brand"
                      />
                      {application.name}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="tabular text-[12px] text-white/45 group-hover:text-white">
                        {String(applicationCount(application.slug)).padStart(2, "0")}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="h-3.5 w-3.5 text-white/35 transition-colors group-hover:text-brand"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar — centered */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-[12.5px] text-white/60">
          <p>© {year} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
