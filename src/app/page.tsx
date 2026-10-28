import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";
import { AboutSection } from "@/components/home/AboutSection";
import { CountersBand } from "@/components/home/CountersBand";
import { ApplicationShowcase } from "@/components/home/ApplicationShowcase";
import { AdvantagesSection } from "@/components/home/AdvantagesSection";
import { ManufacturingSection } from "@/components/home/ManufacturingSection";
import { QualitySection } from "@/components/home/QualitySection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { site } from "@/data/site";
import { rangeStats } from "@/data/products";

export const metadata: Metadata = {
  title: "Plastic Containers & Industrial Packaging Manufacturer",
  description:
    "ASIR Containers manufactures rigid plastic pails and containers for paint, agro, food and lubricant applications — 17 containers and 26 product codes, from 500 ml to 20 L and 1 KG to 20 KG.",
  alternates: { canonical: "/" },
};

/**
 * Static home page. Server-rendered content with targeted client islands for
 * the slider, counters and scroll animation.
 */
export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    logo: `${site.url}/icon.svg`,
    areaServed: "IN",
    knowsAbout: [
      "Plastic pails",
      "Injection moulded containers",
      "Paint packaging",
      "Agro chemical packaging",
      "Food packaging",
      "Lubricant packaging",
    ],
    makesOffer: {
      "@type": "OfferCatalog",
      name: "Plastic container range",
      numberOfItems: rangeStats.products,
    },
  };

  return (
    <>
      <HeroSlider />
      <AboutSection />
      <CountersBand />
      <ApplicationShowcase />
      <AdvantagesSection />
      <ManufacturingSection />
      <QualitySection />
      <ClientsSection />
      <TestimonialsSection />
      <ContactCTA />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
