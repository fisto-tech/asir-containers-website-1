import Image from "next/image";
import { Boxes, Printer, Sparkles, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { inProcess, type ClientLogo } from "@/data/manufacturing";

type ProcessSectionProps = {
  productSlug?: string;
  index?: string;
};

// Curated high quality industrial and printing imagery
const stepImages = {
  moulding: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
  printing: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
  routes: {
    screenPrinting: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    htl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    iml: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
};

/**
 * Deterministically pick/rotate client logos based on product slug so each product
 * shows varied client brand examples under each printing route.
 */
function getLogosForProduct(logos: ClientLogo[], slug?: string): ClientLogo[] {
  if (!slug || logos.length <= 1) return logos;
  const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const offset = hash % logos.length;
  return [...logos.slice(offset), ...logos.slice(0, offset)];
}

/**
 * In-process activities: moulding first, then the three printing routes, each
 * displaying client logos that run on it, customized per product.
 */
export function ProcessSection({ productSlug, index = "04" }: ProcessSectionProps) {
  return (
    <section className="bg-soft py-10 lg:py-14">
      <div className="shell">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 lg:flex-row lg:items-end">
            <div>
              <SectionLabel index={index}>{inProcess.eyebrow}</SectionLabel>
              <h2 className="display-md mt-3 max-w-xl text-ink">
                Moulded, printed and packed on one floor.
              </h2>
            </div>
            <p className="max-w-sm text-[14px] leading-relaxed text-mid">
              {inProcess.intro}
            </p>
          </div>
        </Reveal>

        {/* Injection Moulding Feature Card */}
        <Reveal className="mt-6">
          <div className="group overflow-hidden rounded-2xl border border-line bg-white shadow-2xs transition-shadow duration-500 hover:shadow-md">
            <div className="grid items-stretch lg:grid-cols-12">
              {/* Photo plate */}
              <div className="relative min-h-[220px] overflow-hidden lg:col-span-5 lg:min-h-[280px]">
                <Image
                  src={stepImages.moulding}
                  alt="Precision industrial plastic injection moulding machinery"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-ink/30" />
                <div className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold tracking-wider text-ink backdrop-blur-md">
                  In-House Moulding Cell
                </div>
              </div>

              {/* Text content */}
              <div className="flex flex-col justify-between p-6 sm:p-7 lg:col-span-7">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-white">
                      <Boxes className="h-3.5 w-3.5 text-white" />
                    </span>
                    <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                      {inProcess.moulding.title}
                    </h3>
                  </div>

                  <p className="mt-2.5 max-w-xl text-[14px] leading-relaxed text-mid">
                    {inProcess.moulding.detail}
                  </p>

                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    <li className="flex items-center gap-2 text-[13px] text-ink">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                      Body, lid and handle matched tooling
                    </li>
                    <li className="flex items-center gap-2 text-[13px] text-ink">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                      Zero external transit defect risk
                    </li>
                    <li className="flex items-center gap-2 text-[13px] text-ink">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                      Controlled wall thickness tolerances
                    </li>
                    <li className="flex items-center gap-2 text-[13px] text-ink">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brand" />
                      Food & industrial-grade resins
                    </li>
                  </ul>
                </div>

                <div className="mt-5 flex items-center gap-2.5 border-t border-line/80 pt-3 text-[12.5px] text-mid">
                  <span className="font-semibold text-ink">Capacity Envelope:</span>
                  <span>80 – 650 Tonne precision clamp systems</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* In-House Printing Header */}
        <Reveal className="mt-8">
          <div className="flex flex-col justify-between gap-3 border-b border-line pb-4 sm:flex-row sm:items-end">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white">
                <Printer className="h-3.5 w-3.5" />
              </span>
              <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                {inProcess.printing.title}
              </h3>
            </div>
            <p className="max-w-md text-[13.5px] leading-relaxed text-mid">
              {inProcess.printing.detail}
            </p>
          </div>
        </Reveal>

        {/* 3 Printing Routes Grid with Visual Cards */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {inProcess.printing.routes.map((route, index) => {
            const logos = getLogosForProduct(route.logos, productSlug);
            const routeImage =
              stepImages.routes[route.id as keyof typeof stepImages.routes] || stepImages.printing;

            return (
              <Reveal
                key={route.name}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white shadow-2xs transition-all duration-500 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
              >
                <div>
                  {/* Visual Header Image for Route */}
                  <div className="relative h-44 w-full overflow-hidden bg-light">
                    <Image
                      src={routeImage}
                      alt={`${route.name} printing process showcase`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" />
                    <h4 className="absolute bottom-3.5 left-4 right-4 font-display text-lg font-semibold text-white drop-shadow-sm">
                      {route.name}
                    </h4>
                  </div>

                  {/* Route Copy & Highlights */}
                  <div className="p-5">
                    <p className="min-h-[42px] text-[13.5px] leading-relaxed text-mid">
                      {route.detail}
                    </p>
                  </div>
                </div>

                {/* Client Brands Showcase */}
                <div className="border-t border-line/70 bg-soft/30 p-5 pt-4">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-mid">
                    <span>Client Brands</span>
                    <span className="inline-flex items-center gap-1 text-brand">
                      <Sparkles className="h-3 w-3" /> Tested
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2.5">
                    {logos.map((client) => (
                      <div
                        key={client.name}
                        title={client.name}
                        className="flex h-13 items-center justify-center rounded-xl border border-line/80 bg-white px-3 py-1.5 shadow-2xs transition-all duration-300 hover:border-brand hover:shadow-xs"
                      >
                        <Image
                          src={client.logo}
                          alt={client.alt}
                          width={140}
                          height={36}
                          className="h-7 w-auto max-w-[105px] object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
