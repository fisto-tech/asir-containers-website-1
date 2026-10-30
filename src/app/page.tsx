import type { Metadata } from "next";
import { HeroSlider } from "@/components/home/HeroSlider";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { AdvantagesSection } from "@/components/home/AdvantagesSection";
import { ManufacturingSection } from "@/components/home/ManufacturingSection";
import { VisionMissionSection } from "@/components/home/VisionMissionSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { site } from "@/data/site";
import { rangeStats } from "@/data/products";

export const metadata: Metadata = {
  title: "Plastic Containers & Industrial Packaging Manufacturer",
  description:
    "ASIR Containers manufactures rigid plastic pails and containers for paint, agro, food and lubricant applications — 17 containers and 26 product codes, from 500 ml to 20 L and 1 KG to 20 KG.",
  alternates: { canonical: "/" },
};

/**
 * Final home page containing exactly:
 * 1. Hero section slider
 * 2. Features (mostly icon based)
 * 3. About us
 * 4. Why choose us
 * 5. Machinaries
 * 6. Vision mission
 * 7. Our clients
 * 8. Testimonial video section
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
      {/* 1. Hero section slider */}
      <HeroSlider />

      {/* 2. Features (mostly icon based) */}
      <FeaturesSection index="02" />

      {/* 3. About us */}
      <AboutSection />

      {/* 4. Why choose us */}
      <AdvantagesSection />

      {/* 5. Machinaries */}
      <ManufacturingSection />

      {/* 6. Vision mission */}
      <VisionMissionSection index="06" />

      {/* 7. Our clients */}
      <ClientsSection />

      {/* 8. Testimonial video section */}
      <TestimonialsSection />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
