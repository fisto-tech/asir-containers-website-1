import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  applicationsFor,
  productDisplayName,
  codesFor,
  lidsFor,
  type Product,
} from "@/data/products";

type ProductCardProps = {
  product: Product;
  index?: number;
  priority?: boolean;
  aspect?: "square" | "video" | "wide" | "compact";
};

/**
 * Open product card: image plate, then a single hairline before the metadata so
 * the record reads as one column instead of a stack of loose lines.
 */
export function ProductCard({
  product,
  index = 0,
  priority = false,
  aspect = "square",
}: ProductCardProps) {
  const productApplications = applicationsFor(product);
  const lids = lidsFor(product);

  const aspectClass =
    aspect === "compact"
      ? "aspect-[4/3.2]"
      : aspect === "wide"
        ? "aspect-[16/10]"
        : aspect === "video"
          ? "aspect-[4/3]"
          : "aspect-square";

  return (
    <article className="group relative" data-card>
      <Link
        href={`/products/${product.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`View ${productDisplayName(product)}`}
      />

      <div className={`zoom-plate relative ${aspectClass} overflow-hidden rounded-[20px] bg-light`}>
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 30vw"
          className="object-cover"
        />
      </div>

      <div className="pt-3 pb-0.5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[16px] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-brand">
            {product.name}{" "}
            <span className="font-mono text-[13.5px] font-semibold text-brand">
              ({product.codes.plain})
            </span>
          </h3>
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 shrink-0 text-mid/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
          />
        </div>

        <div className="mt-2.5 border-t border-line/80 pt-2.5">
          <p className="truncate text-[13.5px] font-normal leading-relaxed text-mid">
            {lids.join(", ")}
            {product.locks.length > 0 ? ` · ${product.locks.join(", ")}` : ""}
            {" · "}
            {productApplications.map((application) => application.name).join(" · ")}
          </p>
        </div>
      </div>
    </article>
  );
}
