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
          index="00"
          label="Contact"
          title={
            <>
              Tell us what
              <br />
              you need to fill.
            </>
          }
          intro="Send the pack size, format and quantity — we reply with the matching container."
        >
          <div
            className="mt-10 flex flex-col gap-5 border-t border-ink/15 pt-6 sm:flex-row sm:items-center sm:justify-between"
            data-reveal
          >
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {contact.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="group inline-flex items-center gap-2.5 text-[14px] font-medium text-ink transition-colors hover:text-brand"
                >
                  <Phone aria-hidden className="h-4 w-4 text-brand" />
                  Call the sales desk
                  <span aria-hidden className="text-mid">·</span>
                  <span className="tabular text-mid">{contact.phone}</span>
                </a>
              )}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="group inline-flex items-center gap-2.5 text-[14px] font-medium text-ink transition-colors hover:text-brand"
                >
                  <Mail aria-hidden className="h-4 w-4 text-brand" />
                  Email an enquiry
                </a>
              )}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 text-[14px] font-medium text-ink transition-colors hover:text-brand"
              >
                <Navigation aria-hidden className="h-4 w-4 text-brand" />
                Directions
              </a>
            </div>
            {contact.businessHours.length > 0 && (
              <p className="text-[13px] text-mid">{contact.businessHours.join(" · ")}</p>
            )}
          </div>
        </PageMasthead>
      </Reveal>

      <section className="bg-white py-14 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Enquiry form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          {/* Contact details + map */}
          <aside className="lg:col-span-5">
            <SectionLabel index="01">Contact details</SectionLabel>
            <ul className="mt-5 border-t border-line">
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

            {/* Map — embeds when a key exists, otherwise links to the address */}
            <div className="mt-9">
              <SectionLabel index="02">Find us</SectionLabel>
              {contact.mapEmbedUrl ? (
                <iframe
                  src={contact.mapEmbedUrl}
                  title={`Map showing ${site.name}`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="mt-4 aspect-4/3 w-full rounded-[18px] border border-line"
                />
              ) : (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 flex aspect-4/3 w-full flex-col justify-end rounded-[18px] bg-[linear-gradient(140deg,#151515_0%,#242424_100%)] p-6 text-white transition-transform duration-500 hover:-translate-y-1"
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
