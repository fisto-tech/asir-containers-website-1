import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  applicationsFor,
  productDisplayName,
  codesFor,
  colorsFor,
  lidsFor,
  type Product,
} from "@/data/products";
import { swatches } from "@/lib/colors";

type ProductCardProps = {
  product: Product;
  index?: number;
  priority?: boolean;
};

/**
 * Open product card: image plate, then a single hairline before the metadata so
 * the record reads as one column instead of a stack of loose lines.
 */
export function ProductCard({ product, index = 0, priority = false }: ProductCardProps) {
  const productApplications = applicationsFor(product);
  const colors = colorsFor(product);
  const lids = lidsFor(product);

  return (
    <article className="group relative" data-card>
      <Link
        href={`/products/${product.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`View ${productDisplayName(product)}`}
      />

      <div className="zoom-plate relative aspect-square overflow-hidden rounded-[20px] bg-light">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 30vw"
          className="object-cover"
        />
      </div>

      <div className="pt-3.5 pb-0.5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-[12.5px] font-semibold tracking-wide tabular text-brand">
            {codesFor(product).join("  /  ")}
          </p>
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 shrink-0 text-mid/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
          />
        </div>

        <h3 className="mt-1 font-display text-[16px] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand">
          {productDisplayName(product)}
        </h3>

        <div className="mt-2.5 flex items-center justify-between gap-3 border-t border-line/80 pt-2.5">
          <p className="min-w-0 truncate text-[13.5px] font-normal leading-relaxed text-mid">
            {lids.length === 2 ? "Plain & Tin/Sp." : "Plain"}
            {product.locks.length > 0 ? ` · ${product.locks.join(", ")}` : ""}
            {" · "}
            {productApplications.map((application) => application.name).join(" · ")}
          </p>

          <p className="flex shrink-0 items-center gap-1.5" aria-label={`Colours: ${colors.join(", ")}`}>
            {colors.map((color) => (
              <span
                key={color}
                title={swatches[color].label}
                className={`h-3 w-3 rounded-full border ${swatches[color].ring}`}
                style={{ backgroundColor: swatches[color].hex }}
              />
            ))}
          </p>
        </div>
      </div>
    </article>
  );
}
