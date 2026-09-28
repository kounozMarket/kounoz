import Link from "next/link";
import type { CSSProperties } from "react";
import { Price, discountPercent } from "@/components/product/Price";
import { ProductMediaFrame } from "@/components/product/ProductMediaFrame";
import { ArrowRightIcon } from "@/components/ui/icons";
import type { ProductSummary } from "@/types/product";

/**
 * Product card. Media keeps the product's own ratio (rounded frame, category
 * lighting, sale badge); name, price and a round CTA sit underneath.
 * Works in the homepage rail (`layout="rail"`) and on listing pages (`"grid"`).
 */
type ProductCardProps = {
  product: ProductSummary;
  index: number;
  featured?: boolean;
  /** "rail" = homepage showcase (ratio-driven width on mobile); "grid" = listing pages. */
  layout?: "rail" | "grid";
  sizes: string;
  className?: string;
  style?: CSSProperties;
};

export function ProductCard({
  product,
  featured = false,
  layout = "rail",
  sizes,
  className = "",
  style,
}: ProductCardProps) {
  const { name, href, category, price, compareAtPrice, media } = product;
  const discount = discountPercent(price, compareAtPrice);

  return (
    <article
      className={`relative ${layout === "rail" ? "rail-item" : "break-inside-avoid"} ${className}`}
      style={{ "--ratio": media.ratio, ...style } as CSSProperties}
    >
      <Link href={href} className="group block rounded-3xl">
        <ProductMediaFrame
          media={media}
          presentation={category.presentation}
          sizes={sizes}
          badge={discount ? `−${discount} %` : undefined}
        />

        <div data-reveal className="mt-3 flex items-start justify-between gap-3 px-1 sm:mt-4 sm:gap-4">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-muted">{category.name}</p>
            <h3
              className={`mt-1 font-bold tracking-tight transition-colors duration-300 group-hover:text-accent ${
                featured ? "text-lg lg:text-2xl" : "text-sm sm:text-base lg:text-lg"
              }`}
            >
              {name}
            </h3>
            <Price price={price} compareAtPrice={compareAtPrice} size={featured ? "md" : "sm"} showDiscount={false} className="mt-2" />
          </div>

          <span
            aria-hidden="true"
            className={`mt-1 size-11 flex-none items-center ${layout === "grid" ? "hidden sm:inline-flex" : "inline-flex"} justify-center rounded-full border border-line-strong text-text transition-[border-color,background-color,color,transform] duration-300 ease-premium group-hover:-rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-on-accent`}
          >
            <ArrowRightIcon />
          </span>
        </div>
        <span className="sr-only">Voir le produit</span>
      </Link>
    </article>
  );
}
