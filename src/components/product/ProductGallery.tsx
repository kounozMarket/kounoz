"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { ProductMediaFrame } from "@/components/product/ProductMediaFrame";
import { discountPercent } from "@/components/product/Price";
import type { ProductSummary } from "@/types/product";

/**
 * Product gallery: main view keeps the product's own ratio (height capped to the
 * viewport), thumbnails below. Works for 1…n views; thumbnails hidden for 1.
 */
export function ProductGallery({ product }: { product: ProductSummary }) {
  const views = [product.media, ...(product.gallery ?? [])];
  const [active, setActive] = useState(0);
  const media = views[active];
  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <div>
      {/* Height capped to the viewport: ~46% on phones so name, price and CTAs stay near the fold. */}
      <div
        className="mx-auto w-[min(100%,calc(46svh*var(--r)))] lg:w-[min(100%,calc(72svh*var(--r)))]"
        style={{ "--r": media.ratio } as CSSProperties}
      >
        <ProductMediaFrame
          media={media}
          presentation={product.category.presentation}
          sizes="(min-width: 1024px) 55vw, 100vw"
          badge={discount ? `−${discount} %` : undefined}
          className="rounded-[1.75rem]"
        />
      </div>

      {views.length > 1 ? (
        <ul className="mt-3 flex gap-2 overflow-x-auto no-scrollbar sm:gap-3 lg:justify-center" aria-label="Vues du produit">
          {views.map((view, i) => (
            <li key={i} className="flex-none">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Vue ${i + 1}`}
                aria-pressed={i === active}
                className={`relative flex h-20 items-center justify-center overflow-hidden rounded-2xl border bg-surface text-[0.5rem] font-semibold tracking-wider text-muted uppercase transition-colors sm:h-24 ${
                  i === active ? "border-accent" : "border-line hover:border-line-strong"
                }`}
                style={{ aspectRatio: view.ratio }}
              >
                {view.src ? <Image src={view.src} alt="" fill sizes="96px" className="object-cover" /> : i + 1}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
