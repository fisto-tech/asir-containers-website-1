import type { Metadata } from "next";
import { ProductsBrowser } from "@/components/products/ProductsBrowser";
import { Reveal } from "@/components/motion/Reveal";
import { rangeStats } from "@/data/products";
import { site } from "@/data/site";
import { PageMasthead } from "@/components/ui/PageMasthead";
import { Counter } from "@/components/ui/Counter";

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
          index="00"
          label="Products"
          title={
            <>
              Every container,
              <br />
              one range.
            </>
          }
          intro="Filter by application, capacity, finish or colour — or search a code. Open any container for its full record."
          meta={[
            { label: "Containers", value: <Counter value={rangeStats.products} suffix="+" loop /> },
            { label: "Codes", value: <Counter value={rangeStats.codes} suffix="+" loop /> },
            { label: "Applications", value: <Counter value={rangeStats.applications} loop /> },
            { label: "Capacities", value: <Counter value={rangeStats.capacities} suffix="+" loop /> },
          ]}
          action={{ href: "/contact", label: "Send an enquiry" }}
        />
      </Reveal>

      <div id="range" className="scroll-mt-24">
        <ProductsBrowser />
      </div>
    </>
  );
}
