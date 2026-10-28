import type { Metadata } from "next";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PageMasthead } from "@/components/ui/PageMasthead";
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
      <Reveal>
        <PageMasthead
          compact
          title="Contact Us"
          intro="Get in touch for product specifications, bulk orders, and custom packaging requirements."
        />
      </Reveal>

      <section className="bg-white py-10 lg:py-16">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14 lg:items-stretch">
          {/* Enquiry form */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <ContactForm />
          </div>

          {/* Contact details + map */}
          <aside className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-line pt-8 lg:pt-0 lg:pl-10">
            <div>
              <div className="border-b border-ink pb-5">
                <h2 className="font-display text-[26px] font-semibold leading-tight text-ink">
                  Contact details
                </h2>
              </div>

              <ul className="mt-2">
                <ContactRow
                  icon={<Phone aria-hidden className="h-5 w-5" />}
                  label="Mobile"
                  value={contact.phone}
                  href={contact.phone ? `tel:${contact.phone.replace(/\s/g, "")}` : undefined}
                />
                <ContactRow
                  icon={<Mail aria-hidden className="h-5 w-5" />}
                  label="Email"
                  value={contact.email}
                  href={contact.email ? `mailto:${contact.email}` : undefined}
                />
                <ContactRow
                  icon={<MapPin aria-hidden className="h-5 w-5" />}
                  label="Location"
                  value={address}
                />
                <ContactRow
                  icon={<Clock aria-hidden className="h-5 w-5" />}
                  label="Business hours"
                  value={
                    contact.businessHours.length > 0 ? contact.businessHours.join(" · ") : null
                  }
                />
              </ul>
            </div>

            {/* Map */}
            <div className="mt-8 pt-4 flex-1 flex flex-col justify-end">
              <h3 className="text-[12px] font-semibold uppercase tracking-wider text-mid">Find us</h3>
              {contact.mapEmbedUrl ? (
                <iframe
                  src={contact.mapEmbedUrl}
                  title={`Map showing ${site.name}`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="mt-3 h-[240px] w-full rounded-[16px] border border-line shadow-xs"
                />
              ) : (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 flex h-[240px] w-full flex-col justify-end rounded-[18px] bg-[linear-gradient(140deg,#151515_0%,#242424_100%)] p-6 text-white transition-transform duration-500 hover:-translate-y-1"
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  href?: string;
}) {
  const content = value ? (
    <span className="mt-1 block text-[16px] text-ink transition-colors group-hover:text-brand">
      {value}
    </span>
  ) : (
    <span className="mt-1 block text-[16px] text-mid">To be supplied</span>
  );

  return (
    <li className="flex items-start gap-3.5 border-b border-line py-4">
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
