import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/data/site";

/**
 * Static sitemap — generated at build time from the same product dataset, so a
 * new product is picked up automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/products", "/process", "/technologies", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productRoutes = products.map((product) => ({
    url: `${site.url}/products/${product.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}
