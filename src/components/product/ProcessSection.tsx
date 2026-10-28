import Image from "next/image";
import { Boxes, Printer } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { inProcess, type ClientLogo } from "@/data/manufacturing";

type ProcessSectionProps = {
  productSlug?: string;
};

/**
 * Deterministically pick/rotate client logos based on product slug so each product
 * shows varied client brand examples under each printing route.
 */
function getLogosForProduct(logos: ClientLogo[], slug?: string): ClientLogo[] {
  if (!slug || logos.length <= 1) return logos;
  // Simple deterministic hash from slug
  const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const offset = hash % logos.length;
  // Return rotated list
  return [...logos.slice(offset), ...logos.slice(0, offset)];
}

/**
 * In-process activities: moulding first, then the three printing routes, each
 * displaying client logos that run on it, customized per product.
 */
export function ProcessSection({ productSlug }: ProcessSectionProps) {
  return (
    <Reveal className="bg-soft py-16 lg:py-20">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 border-b border-line pb-8 lg:flex-row lg:items-end">
          <div>
            <SectionLabel index={undefined}>{inProcess.eyebrow}</SectionLabel>
            <h2 className="display-md mt-4 max-w-xl text-ink" data-reveal="letters">
              Moulded, printed and packed on one floor.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed text-mid" data-reveal>
            {inProcess.intro}
          </p>
        </div>

        {/* Injection moulding */}
        <div className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-14" data-reveal>
          <div className="flex items-start gap-4 lg:col-span-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink text-white">
              <Boxes aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mid">
                Step 01
              </p>
              <h3 className="mt-1.5 font-display text-[20px] font-semibold text-ink">
                {inProcess.moulding.title}
              </h3>
            </div>
          </div>
          <p className="max-w-xl text-[14px] leading-relaxed text-mid lg:col-span-8 lg:pt-3">
            {inProcess.moulding.detail}
          </p>
        </div>

        {/* Printing */}
        <div className="border-t border-ink/15 pt-10" data-reveal>
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">
              <Printer aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-mid">
                Step 02
              </p>
              <h3 className="mt-1.5 font-display text-[20px] font-semibold text-ink">
                {inProcess.printing.title}
              </h3>
              <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-mid">
                {inProcess.printing.detail}
              </p>
            </div>
          </div>

          <ul className="mt-8 grid gap-px overflow-hidden rounded-[18px] bg-line sm:grid-cols-3">
            {inProcess.printing.routes.map((route, index) => {
              const logos = getLogosForProduct(route.logos, productSlug);
              return (
                <li
                  key={route.name}
                  className="group flex flex-col justify-between bg-white p-6 transition-colors duration-500 hover:bg-white"
                  data-reveal
                  data-reveal-delay={String(index * 0.08)}
                >
                  <div>
                    <span className="tabular text-[11px] font-semibold uppercase tracking-[0.16em] text-mid">
                      {route.code}
                    </span>

                    <h4 className="mt-3 font-display text-[17px] font-semibold leading-snug text-ink">
                      {route.name}
                    </h4>
                    <p className="mt-2 text-[13px] leading-relaxed text-mid">{route.detail}</p>
                  </div>

                  {/* Multiple Client Marks Under Each Category */}
                  <div className="mt-6 border-t border-line/60 pt-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-mid/90">
                      Client Brands
                    </span>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      {logos.map((client) => (
                        <div
                          key={client.name}
                          title={client.name}
                          className="flex h-14 min-w-[120px] flex-1 items-center justify-center rounded-xl border border-line bg-soft/60 px-4 py-2 shadow-2xs transition-all duration-300 hover:border-brand/40 hover:bg-white hover:shadow-xs"
                        >
                          <Image
                            src={client.logo}
                            alt={client.alt}
                            width={160}
                            height={42}
                            className="h-8 w-auto max-w-[130px] object-contain transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}
