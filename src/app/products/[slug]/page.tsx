import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { ProductMedia } from "@/components/products/ProductMedia";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductApplicationsShowcase } from "@/components/products/ProductApplicationsShowcase";
import { InspectionSection } from "@/components/product/InspectionSection";
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
    { label: "Material", value: "Polypropylene (PP)" },
    { label: "Capacity", value: capacityDisplay(product) },
    { label: "Brimful volume", value: product.specs.brimful },
    { label: "Product height", value: product.specs.height },
    { label: "Product weight", value: product.specs.weight ?? "Available on enquiry" },
    { label: "GSL / OFC", value: product.specs.gslOfc },
    { label: "Application", value: applicationNames.join(" · ") },
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
      { "@type": "PropertyValue", name: "Material", value: "Polypropylene (PP)" },
      { "@type": "PropertyValue", name: "Capacity", value: capacityDisplay(product) },
      { "@type": "PropertyValue", name: "Product codes", value: codesFor(product).join(", ") },
      { "@type": "PropertyValue", name: "Brimful volume", value: product.specs.brimful },
      { "@type": "PropertyValue", name: "Product height", value: product.specs.height },
      { "@type": "PropertyValue", name: "GSL / OFC", value: product.specs.gslOfc },
      ...(product.specs.weight
        ? [{ "@type": "PropertyValue", name: "Product weight", value: product.specs.weight }]
        : []),
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
      <div className="border-b border-line bg-white pt-20 lg:pt-24">
        <div className="shell">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[14px] font-medium text-mid sm:text-[14.5px]"
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

          <div className="mt-5 grid items-stretch gap-8 pb-10 lg:grid-cols-12 lg:gap-10 lg:pb-12">
            <div className="flex flex-col lg:col-span-5">
              <div className="flex flex-1 flex-col lg:sticky lg:top-24">
                <ProductMedia
                  src={product.image}
                  alt={product.imageAlt}
                  capacity={capacityDisplay(product)}
                  category={applicationNames.join(" · ")}
                />
              </div>
            </div>

            <Reveal className="lg:col-span-7">          
              <div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <h1 className="sheen-ink font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-[46px] lg:leading-[1.12]">
                    {product.name}
                  </h1>

                  {/* Product codes badge — clean single card without outer wrapper */}
                  <div className="flex shrink-0 items-center gap-2.5 self-start sm:mt-1">
                    <div className="rounded-xl border border-line bg-white px-3.5 py-1.5 text-center shadow-2xs">
                      <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-mid">
                        Plain Code
                      </span>
                      <span className="flex items-center justify-center gap-1.5 font-mono text-[18px] font-extrabold tracking-tight text-ink sm:text-[20px]">
                        {product.codes.plain}
                        <AnimatedIcon name="pack" motion="float" className="h-4 w-4 text-brand" />
                      </span>
                    </div>

                    {product.codes.tin && (
                      <div className="rounded-xl border border-brand/25 bg-white px-3.5 py-1.5 text-center shadow-2xs">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                          Tin/Sp. Code
                        </span>
                        <span className="flex items-center justify-center gap-1.5 font-mono text-[18px] font-extrabold tracking-tight text-brand sm:text-[20px]">
                          {product.codes.tin}
                          <AnimatedIcon name="finish" motion="swing" className="h-4 w-4 text-brand" />
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-3.5 max-w-xl text-[15px] leading-relaxed text-mid sm:text-[15.5px]" data-reveal>
                  {product.summary}
                </p>

                {/* Specification table — enhanced readability & typography */}
                <dl className="mt-7 border-t border-line" data-reveal>
                  {specRows.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-1 border-b border-line py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <dt className="text-[14.5px] font-medium text-mid sm:text-[15px]">
                        {row.label}
                      </dt>
                      <dd className="text-[15px] font-semibold text-ink sm:max-w-[65%] sm:text-right sm:text-[15.5px]">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* CTAs */}
                <div className="mt-6 flex flex-wrap items-center gap-3" data-reveal>
                  <Link
                    href={`/contact?product=${product.slug}`}
                    className="group inline-flex h-11 items-center gap-2 bg-brand px-5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
                  >
                    Enquire about {product.codes.plain}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex h-11 items-center gap-2 border border-ink/20 px-5 text-sm font-medium text-ink transition-colors hover:border-ink"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to products
                  </Link>
                </div>
              </div>

            </Reveal>
          </div>
        </div>
      </div>

      {/* Applications (auto-updating & interactive hover image showcase) */}
      <Reveal>
        <ProductApplicationsShowcase
          applications={productApplications}
          productName={product.name}
        />
      </Reveal>

      {/* Quality statement + inspection gates */}
      <InspectionSection />


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
                <ProductCard product={item} index={relatedIndex} aspect="compact" />
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
                <SectionLabel tone="light">
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
