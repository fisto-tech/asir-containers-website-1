import type { Metadata } from "next";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHero } from "@/components/contact/ContactHero";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us — Packaging Enquiries",
  description:
    "Contact ASIR Containers about plastic pails and industrial packaging: product enquiries, bulk and distributor orders, custom colours and technical specifications.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact ASIR Containers", url: `${site.url}/contact` },
};

/** Single-line address used for the map link. */
const mapQuery = encodeURIComponent(
  [site.contact.addressLines.join(", "), site.contact.country].filter(Boolean).join(", "),
);

export default function ContactPage() {
  const { contact } = site;
  const address =
    contact.addressLines.length > 0 ? contact.addressLines.join(", ") : null;

  return (
    <>
      <ContactHero
        title="Contact Us"
        intro="Get in touch for product specifications, bulk orders, and custom packaging requirements."
      />

      <section className="bg-white py-10 lg:py-16 overflow-hidden">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-stretch">
          {/* Enquiry form */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <ContactForm />
          </div>

          {/* Contact details + map */}
          <aside className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-line pt-8 lg:pt-0 lg:pl-10">
            <Reveal>
              <div data-reveal data-reveal-delay="0.1">
                <div className="border-b border-ink pb-5">
                  <h2 className="font-display text-[26px] font-semibold leading-tight text-ink">
                    Contact details
                  </h2>
                </div>

                <ul className="mt-2 divide-y divide-line/60">
                  <ContactRow
                    icon={<Phone aria-hidden className="h-5 w-5" />}
                    label="Mobile"
                    value={contact.phone}
                    href={contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : undefined}
                    delay="0.15"
                  />
                  <ContactRow
                    icon={<Mail aria-hidden className="h-5 w-5" />}
                    label="Email"
                    value={contact.email}
                    href={contact.email ? `mailto:${contact.email}` : undefined}
                    delay="0.2"
                  />
                  <ContactRow
                    icon={<MapPin aria-hidden className="h-5 w-5" />}
                    label="Location"
                    value={address}
                    delay="0.25"
                  />
                  <ContactRow
                    icon={<Clock aria-hidden className="h-5 w-5" />}
                    label="Business hours"
                    value={
                      contact.businessHours.length > 0 ? contact.businessHours.join(" · ") : null
                    }
                    delay="0.3"
                  />
                </ul>
              </div>

              {/* Map */}
              <div
                data-reveal
                data-reveal-delay="0.35"
                className="mt-8 pt-4 flex-1 flex flex-col justify-end"
              >
                <h3 className="text-[12px] font-semibold uppercase tracking-wider text-mid">Find us</h3>
                {contact.mapEmbedUrl ? (
                  <div className="group mt-3 relative overflow-hidden rounded-[16px] border border-line shadow-xs transition-transform duration-300 hover:shadow-md hover:border-slate-300">
                    <iframe
                      src={contact.mapEmbedUrl}
                      title={`Map showing ${site.name}`}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="h-[240px] w-full"
                    />
                  </div>
                ) : (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-3 flex h-[240px] w-full flex-col justify-end rounded-[18px] bg-[linear-gradient(140deg,#151515_0%,#242424_100%)] p-6 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <span
                      aria-hidden
                      className="ambient-breathe mb-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-colors duration-300 group-hover:border-brand group-hover:bg-brand"
                    >
                      <Navigation className="h-5 w-5" />
                    </span>
                    <span className="font-display text-xl font-semibold">
                      Open in Google Maps
                    </span>
                    <span className="mt-1.5 text-[13px] text-white/85">{address}</span>
                  </a>
                )}
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  delay = "0.1",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  href?: string;
  delay?: string;
}) {
  const content = value ? (
    <span className="mt-1 block text-[16px] font-medium text-ink transition-colors group-hover:text-brand">
      {value}
    </span>
  ) : (
    <span className="mt-1 block text-[16px] text-mid">To be supplied</span>
  );

  return (
    <li
      data-reveal
      data-reveal-delay={delay}
      className="flex items-start gap-3.5 border-b border-line py-4 transition-all duration-200 hover:bg-slate-50/60 px-2 rounded-lg"
    >
      <span className="mt-0.5 shrink-0 text-brand">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[13px] text-mid">{label}</span>
        {href ? (
          <a href={href} className="group block">
            {content}
          </a>
        ) : (
          content
        )}
      </span>
    </li>
  );
}
