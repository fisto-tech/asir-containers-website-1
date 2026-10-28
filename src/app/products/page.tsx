import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductsBrowser } from "@/components/products/ProductsBrowser";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/data/site";
import { PageMasthead } from "@/components/ui/PageMasthead";

export const metadata: Metadata = {
  title: "Products — Plastic Pails & Containers",
  description:
    "Browse the ASIR Containers range: paint pails, weight-marked storage pails, the 5 litre round pail and square interlock pails for paint, agro, food and lube applications. Filter by application, capacity, finish, lock and colour, or search by product code.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products — ASIR Containers",
    description:
      "Filter 17 rigid plastic containers by application, capacity, finish, lock type and available colour — or search by product code.",
    url: `${site.url}/products`,
  },
};

export default function ProductsPage() {
  return (
    <>
      <Reveal>
        <PageMasthead
          compact
          title="Product Range"
          intro="Explore our industrial plastic containers, pails, and closures."
        />
      </Reveal>

      <div id="range" className="scroll-mt-24">
        <Suspense fallback={<div className="shell py-12 text-sm text-mid">Loading products…</div>}>
          <ProductsBrowser />
        </Suspense>
      </div>
    </>
  );
}
