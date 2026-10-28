import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { ProductMedia } from "@/components/products/ProductMedia";
import { ProductCard } from "@/components/products/ProductCard";
import { InspectionSection } from "@/components/product/InspectionSection";
import { ProcessSection } from "@/components/product/ProcessSection";
import { MachinerySection } from "@/components/product/MachinerySection";
import { Reveal } from "@/components/motion/Reveal";
import { AnimatedIcon, applicationIcons, type IconMotion } from "@/components/ui/AnimatedIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  applicationsFor,
  capacityDisplay,
  codesFor,
  colorsFor,
  getProduct,
  getRelatedProducts,
  lidsFor,
  products,
  typeName,
} from "@/data/products";
import { site } from "@/data/site";
import { swatches } from "@/lib/colors";

type PageProps = { params: Promise<{ slug: string }> };

const motionByApplication: Record<string, IconMotion> = {
  paint: "swing",
  agro: "float",
  food: "pulse",
  lube: "float",
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return { title: "Container not found" };

  const codes = codesFor(product).join(" / ");
  const title = `${product.name} — ${capacityDisplay(product)} (${codes})`;
  const description = `${product.summary} Product codes: ${codes}. Available colours: ${colorsFor(product).join(", ")}.`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `${site.url}/products/${product.slug}`,
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const productApplications = applicationsFor(product);
  const applicationNames = productApplications.map((application) => application.name);
  const colors = colorsFor(product);
  const lids = lidsFor(product);
  const related = getRelatedProducts(product, 3);
  const index = products.findIndex((item) => item.slug === product.slug);
  const previous = products[(index - 1 + products.length) % products.length];
  const next = products[(index + 1) % products.length];

  const specRows: { label: string; value: string }[] = [
    { label: "Capacity", value: capacityDisplay(product) },
    { label: "Brimful volume", value: product.specs.brimful },
    { label: "Product height", value: product.specs.height },
    { label: "GSL / OFC", value: product.specs.gslOfc },
    { label: "Application", value: applicationNames.join(" · ") },
    { label: "Product family", value: typeName(product.type) },
    { label: "Product codes", value: codesFor(product).join(" · ") },
    {
      label: "Lid options",
      value: lids.length === 2 ? "Flat Lid · Tind Lid (Tin/Sp.)" : "Flat Lid only",
    },
    {
      label: "Lock type",
      value: product.locks.length > 0 ? product.locks.join(" · ") : "Not applicable",
    },
   
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: `${site.url}${product.image}`,
    sku: product.codes.plain,
    mpn: product.codes.plain,
    category: applicationNames.join(", "),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.name, url: site.url },
    url: `${site.url}/products/${product.slug}`,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Capacity", value: capacityDisplay(product) },
      { "@type": "PropertyValue", name: "Product codes", value: codesFor(product).join(", ") },
      { "@type": "PropertyValue", name: "Brimful volume", value: product.specs.brimful },
      { "@type": "PropertyValue", name: "Product height", value: product.specs.height },
      { "@type": "PropertyValue", name: "GSL / OFC", value: product.specs.gslOfc },
      ...(product.codes.tin
        ? [{ "@type": "PropertyValue", name: "Tinned code", value: product.codes.tin }]
        : []),
    ],
    // Prices, GTINs, dimensions and material grades are intentionally omitted
    // until ASIR Containers supplies verified commercial data.
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${site.url}/products/${product.slug}`,
      },
    ],
  };

  return (
    <>
      <div className="border-b border-line bg-white pt-28 lg:pt-36">
        <div className="shell">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2.5 text-[15px] font-medium text-mid sm:text-[15.5px]"
          >
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <span aria-hidden className="text-mid/40">
              /
            </span>
            <Link href="/products" className="transition-colors hover:text-ink">
              Products
            </Link>
            <span aria-hidden className="text-mid/40">
              /
            </span>
            <span className="font-semibold text-ink">{product.codes.plain}</span>
          </nav>

          <div className="mt-8 grid gap-10 pb-14 lg:grid-cols-12 lg:gap-14 lg:pb-20">
            <div className="lg:col-span-6">
              <div className="lg:sticky lg:top-28">
                <ProductMedia
                  src={product.image}
                  alt={product.imageAlt}
                  capacity={capacityDisplay(product)}
                  category={applicationNames.join(" · ")}
                />
              </div>
            </div>

            <Reveal className="lg:col-span-6">          

              <h1 className="display-lg sheen-ink text-ink" data-reveal="letters">
                {product.name}
              </h1>

              <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-mid" data-reveal>
                {product.summary}
              </p>

              {/* Product codes — set as type, not tiles */}
              <div className="mt-9 grid gap-8 border-t border-line pt-7 sm:grid-cols-2" data-reveal>
                <div>
                  <p className="text-[14px] text-mid">
                    Plain code
                  </p>
                  <p className="mt-1.5 flex items-baseline gap-2 font-display text-[28px] font-semibold tabular leading-none text-ink">
                    {product.codes.plain}
                    <AnimatedIcon name="pack" motion="float" className="h-3.5 w-3.5 text-brand" />
                  </p>
                  <p className="mt-1.5 text-[13px] text-mid">Flat lid</p>
                </div>
                <div>
                  <p className="text-[14px] text-mid">
                    Tin/Sp. code
                  </p>
                  {product.codes.tin ? (
                    <>
                      <p className="mt-1.5 flex items-baseline gap-2 font-display text-[28px] font-semibold tabular leading-none text-ink">
                        {product.codes.tin}
                        <AnimatedIcon name="finish" motion="swing" className="h-3.5 w-3.5 text-brand" />
                      </p>
                      <p className="mt-1.5 text-[13px] text-mid">Tind lid</p>
                    </>
                  ) : (
                    <>
                      <p className="mt-1.5 font-display text-2xl font-semibold text-mid">—</p>
                      <p className="mt-1.5 text-[13px] text-mid">Plain only for this container</p>
                    </>
                  )}
                </div>
              </div>

              {/* Specification table */}
              <dl className="mt-8 border-t border-line" data-reveal>
                {specRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1 border-b border-line py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <dt className="text-[14px] text-mid">
                      {row.label}
                    </dt>
                    <dd className="text-[15px] text-ink sm:max-w-[60%] sm:text-right">{row.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Colours */}
              <div className="mt-8" data-reveal>
                <p className="text-[14px] text-mid">
                  Colour availability
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                  {colors.map((color) => (
                    <li key={color} className="inline-flex items-center gap-2 text-[14px] text-ink">
                      <span
                        aria-hidden
                        className={`h-3.5 w-3.5 rounded-full border ${swatches[color].ring}`}
                        style={{ backgroundColor: swatches[color].hex }}
                      />
                      {color}
                    </li>
                  ))}
                </ul>
                
              </div>

              {/* CTAs */}
              <div className="mt-9 flex flex-wrap items-center gap-3" data-reveal>
                <Link
                  href={`/contact?product=${product.slug}`}
                  className="group inline-flex h-13 items-center gap-2 bg-brand px-6 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                >
                  Enquire about {product.codes.plain}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex h-13 items-center gap-2 border border-ink/20 px-6 text-sm font-medium text-ink transition-colors hover:border-ink"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to products
                </Link>
              </div>

              
            </Reveal>
          </div>
        </div>
      </div>

      {/* Applications + detail editorial */}
      <Reveal className="bg-soft py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <h2 className="display-md text-ink" data-reveal="letters">
              Where this
              <br />
              container is used.
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mid" data-reveal>
              {productApplications.length} application
              {productApplications.length === 1 ? "" : "s"} on record for this container.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {productApplications.map((application) => (
                <li key={application.slug} className="border-t border-line pt-4" data-reveal>
                  <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                    <AnimatedIcon
                      name={applicationIcons[application.slug]}
                      motion={motionByApplication[application.slug]}
                      className="h-5 w-5 text-brand"
                    />
                    {application.name}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-mid">
                    {application.blurb}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <div className="border-t border-line pt-4">
                <p className="text-[14px] text-mid">
                  Capacity system
                </p>
                <p className="mt-2 text-sm text-ink">
                  Recorded in{" "}
                  {product.capacity.unit === "ml"
                    ? "millilitres"
                    : product.capacity.unit === "L"
                      ? "litres"
                      : "kilograms"}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-mid">
                  ml, L and KG stay separate — never converted.
                </p>
              </div>
              <div className="border-t border-line pt-4">
                <p className="text-[14px] text-mid">
                  Closure
                </p>
                <p className="mt-2 text-sm text-ink">
                  {product.locks.length > 0 ? product.locks.join(" · ") : "Flat lid"}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-mid">
                  {product.locks.length > 0
                    ? "A distinct container from other configurations at this capacity."
                    : "Plain carries the flat lid; Tin/Sp. adds the tinned lid."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Quality statement + inspection gates */}
      <InspectionSection />

      {/* In-process activities: moulding + the three printing routes */}
      <ProcessSection productSlug={product.slug} />

      {/* Machine ledger */}
      <MachinerySection />

      {/* Related */}
      <section className="bg-white py-16 lg:py-20">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              <SectionLabel index={undefined}>Related containers</SectionLabel>
              <h2 className="display-md mt-4 text-ink">Same applications, other pack sizes.</h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand"
            >
              View all containers
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, relatedIndex) => (
              <li key={item.slug}>
                <ProductCard product={item} index={relatedIndex} />
              </li>
            ))}
          </ul>

          <nav aria-label="Product navigation" className="mt-12 grid gap-8 border-t border-line pt-6 sm:grid-cols-2">
            <Link
              href={`/products/${previous.slug}`}
              className="group flex items-center gap-4"
            >
              <ArrowLeft className="h-4 w-4 shrink-0 text-mid transition-transform duration-300 group-hover:-translate-x-1" />
              <span>
                <span className="block text-[12px] text-mid">
                  Previous container
                </span>
                <span className="mt-1 block text-[15px] font-medium text-ink">{previous.name}</span>
              </span>
            </Link>
            <Link
              href={`/products/${next.slug}`}
              className="group flex items-center justify-end gap-4 text-right"
            >
              <span>
                <span className="block text-[12px] text-mid">
                  Next container
                </span>
                <span className="mt-1 block text-[15px] font-medium text-ink">{next.name}</span>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-mid transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </nav>
        </div>
      </section>

      {/* Enquiry band — matches homepage ContactCTA design */}
      <section className="bg-white pt-2 pb-14 lg:pb-18">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[24px] bg-charcoal shadow-xl">
            {/* Backdrop with plant photograph */}
            <div className="absolute inset-0">
              <Image
                src="/images/facility/dispatch.jpg"
                alt="Dispatch bay and factory floor packaging line"
                fill
                sizes="100vw"
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/80 to-charcoal/40" />
            </div>

            <div className="relative z-10 flex flex-col justify-between gap-6 px-7 py-8 sm:px-10 sm:py-10 lg:flex-row lg:items-center lg:px-12 lg:py-11">
              <div className="max-w-xl">
                <SectionLabel index="08" tone="light">
                  Next Step
                </SectionLabel>

                <h2 className="display-md mt-2.5 font-display font-semibold text-white">
                  Need this container in a specific colour or closure?
                </h2>

                <p className="mt-2.5 max-w-lg text-[14.5px] leading-relaxed text-white/80">
                  Send us the code ({codesFor(product).join(" or ")}), required colours and batch volume. We will confirm lead times and mould allocation directly.
                </p>
              </div>

              {/* Clean Enquiry Action */}
              <div className="shrink-0">
                <Link
                  href={`/contact?product=${product.slug}`}
                  className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-brand px-7 text-[14.5px] font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/35 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start an enquiry
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  );
}
