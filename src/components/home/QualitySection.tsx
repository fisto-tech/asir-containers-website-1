import Link from "next/link";
import { ArrowUpRight, FileCheck2, FileText, ShieldCheck } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";

/**
 * Certifications — deliberately spare: one line of copy on the left, three
 * document rows on the right, no card treatment. Rows fill from
 * `site.certifications` the moment verified documents exist; nothing is
 * asserted before that.
 */
export function QualitySection() {
  const certificates = site.certifications;

  const slots =
    certificates.length > 0
      ? certificates.slice(0, 3).map((certificate, index) => ({
          key: certificate.name,
          title: certificate.name,
          meta: [certificate.issuer, certificate.reference].filter(Boolean).join(" · "),
          status: certificate.validUntil ? `Valid to ${certificate.validUntil}` : "Document",
          published: true,
          icon: index % 2 === 0 ? FileCheck2 : ShieldCheck,
        }))
      : [
          { key: "quality", title: "Quality management", meta: "Awaiting document", status: "Slot reserved", published: false, icon: ShieldCheck },
          { key: "material", title: "Food-contact declaration", meta: "Awaiting document", status: "Slot reserved", published: false, icon: FileText },
          { key: "reports", title: "Test reports per code", meta: "On request", status: "Slot reserved", published: false, icon: FileCheck2 },
        ];

  return (
    <section className="bg-white py-20 lg:py-24">
      <Reveal className="shell">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="06">Certifications</SectionLabel>
            <h2 className="display-lg sheen-ink mt-5 text-ink" data-reveal="letters">
              Documents on request.
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-mid">
              Published only once ASIR Containers confirms them.
            </p>
            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-2 border-b border-ink pb-1 text-[15px] font-medium text-ink transition-colors hover:border-brand hover:text-brand"
              data-reveal
            >
              Request quality documents
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <ul className="lg:col-span-7">
            {slots.map((slot, index) => {
              const Icon = slot.icon;
              return (
                <li
                  key={slot.key}
                  data-reveal
                  data-reveal-delay={String(index * 0.08)}
                  className="group relative border-t border-line last:border-b"
                >
                  <div className="flex items-center gap-5 py-6 transition-transform duration-500 group-hover:translate-x-1">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ${
                        slot.published
                          ? "bg-brand/10 text-brand"
                          : "border border-line text-brand group-hover:border-brand group-hover:bg-brand group-hover:text-white"
                      }`}
                    >
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[19px] font-semibold leading-snug text-ink">
                        {slot.title}
                      </p>
                      <p className="mt-1 text-[13px] text-mid">{slot.meta}</p>
                    </div>

                    <span className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-mid sm:flex">
                      {!slot.published && (
                        <span aria-hidden className="h-1 w-1 rounded-full bg-brand" />
                      )}
                      {slot.status}
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
