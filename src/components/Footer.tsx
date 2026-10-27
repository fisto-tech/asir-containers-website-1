import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Link2, Linkedin, Youtube } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { AnimatedIcon, applicationIcons } from "@/components/ui/AnimatedIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site, navigation } from "@/data/site";
import { applications, applicationCount, rangeStats } from "@/data/products";

const year = new Date().getFullYear();

const socialIcons: Record<string, typeof Linkedin> = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

export function Footer() {
  const { contact } = site;

  return (
    <footer className="relative bg-charcoal text-white">
      <div className="h-1 w-full bg-brand" />

      <div className="shell py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Logo tone="light" />
            <p className="mt-8 max-w-sm text-[15px] leading-relaxed text-white/85">
              {site.description}
            </p>

            <div className="mt-10 space-y-4 border-t border-white/15 pt-8 text-[15px]">
              <p className="flex items-start gap-3 text-white/85">
                <AnimatedIcon
                  name="pin"
                  motion="pulse"
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                />
                <span>
                  {contact.addressLines.length > 0 ? (
                    contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))
                  ) : (
                    <span className="text-white/85">Registered address to be supplied</span>
                  )}
                </span>
              </p>
              <p className="flex items-center gap-3 text-white/85">
                <AnimatedIcon name="phone" motion="swing" className="h-4 w-4 shrink-0 text-brand" />
                <span>
                  {contact.phone ?? <span className="text-white/85">Phone number to be supplied</span>}
                </span>
              </p>
              <p className="flex items-center gap-3 text-white/85">
                <AnimatedIcon name="mail" motion="float" className="h-4 w-4 shrink-0 text-brand" />
                <span>
                  {contact.email ?? <span className="text-white/85">Email address to be supplied</span>}
                </span>
              </p>
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <SectionLabel index={undefined} tone="light">
              Navigate
            </SectionLabel>
            <ul className="mt-5">
              {navigation.map((item) => (
                <li key={item.href} className="border-b border-white/10">
                  <Link
                    href={item.href}
                    className="block py-3 text-[15px] text-white/85 transition-all duration-300 hover:translate-x-1 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[13px] text-white/85">
              {rangeStats.products} containers · {rangeStats.codes} codes ·{" "}
              {rangeStats.capacities} capacities
            </p>
          </nav>

          <div className="lg:col-span-4">
            <SectionLabel index={undefined} tone="light">
              Applications
            </SectionLabel>
            <ul className="mt-5">
              {applications.map((application) => (
                <li key={application.slug} className="border-b border-white/10">
                  <Link
                    href={`/products?application=${application.slug}`}
                    className="group flex items-center justify-between py-3 text-[15px] text-white/85 transition-colors hover:text-white"
                  >
                    <span className="flex items-center gap-3">
                      <AnimatedIcon
                        name={applicationIcons[application.slug]}
                        motion="none"
                        className="h-4 w-4 text-white/85 transition-colors group-hover:text-brand"
                      />
                      {application.name}
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="tabular text-[12px] text-white">
                        {String(applicationCount(application.slug)).padStart(2, "0")}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="h-4 w-4 text-white/85 transition-colors group-hover:text-brand"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {site.social.length > 0 && (
              <ul className="mt-8 grid grid-cols-2 gap-2">
                {site.social.map((link) => {
                  const Icon = socialIcons[link.icon] ?? Link2;
                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${site.name} on ${link.label}`}
                        className="group flex items-center gap-2.5 rounded-xl border border-white/12 px-3 py-2.5 text-[13px] text-white/85 transition-colors duration-300 hover:border-brand/60 hover:bg-brand/10 hover:text-white"
                      >
                        <Icon
                          aria-hidden
                          className="h-4 w-4 shrink-0 text-white/70 transition-colors duration-300 group-hover:text-brand"
                        />
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/15 pt-7 text-[13px] text-white/85 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Rigid plastic packaging · Paint · Agro · Food · Lube</p>
        </div>
      </div>
    </footer>
  );
}
