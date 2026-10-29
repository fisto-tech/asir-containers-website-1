import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Application } from "@/data/products";
import { SectionLabel } from "@/components/ui/SectionLabel";

type ProductApplicationsShowcaseProps = {
  applications: Application[];
  productName: string;
};

export function ProductApplicationsShowcase({
  applications,
  productName,
}: ProductApplicationsShowcaseProps) {
  if (!applications.length) return null;

  // Determine grid column layout based on number of items (usually 1, 2, 3, or 4)
  const gridColsClass =
    applications.length === 1
      ? "grid-cols-1 max-w-xl"
      : applications.length === 2
      ? "grid-cols-1 md:grid-cols-2"
      : applications.length === 3
      ? "grid-cols-1 md:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section className="border-t border-line/70 bg-light/50 py-14 lg:py-20">
      <div className="shell">
        {/* Section Header - Clean, no numbers */}
        <div className="flex flex-col justify-between gap-4 border-b border-line pb-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Applications</SectionLabel>
            <h2 className="display-md mt-2 font-display font-semibold tracking-tight text-ink">
              Where this container is used.
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-relaxed text-mid">
            Engineered and tested for demanding industrial duty cycles across primary packaging categories.
          </p>
        </div>

        {/* Human-like Editorial Grid: Refined Image Dimensions + Typography */}
        <div className={`mt-8 grid gap-6 lg:gap-8 ${gridColsClass}`}>
          {applications.map((app) => (
            <article key={app.slug} className="group flex flex-col">
              {/* Image Frame - Restrained compact proportions */}
              <Link
                href={`/products?application=${app.slug}`}
                className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-soft border border-line/60 transition-all duration-300 hover:border-brand/40 hover:shadow-md"
              >
                <Image
                  src={app.image}
                  alt={app.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                />
              </Link>

              {/* Editorial Content without numbers */}
              <div className="mt-4 flex flex-col">
                <h3 className="font-display text-[18px] font-semibold tracking-tight text-ink">
                  <Link
                    href={`/products?application=${app.slug}`}
                    className="transition-colors hover:text-brand"
                  >
                    {app.name} Industry
                  </Link>
                </h3>

                <p className="mt-1.5 text-[13.5px] leading-relaxed text-mid">
                  {app.blurb}
                </p>

                <div className="mt-3.5 pt-0.5">
                  <Link
                    href={`/products?application=${app.slug}`}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors hover:text-brand"
                  >
                    <span>Explore {app.name.toLowerCase()} containers</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
