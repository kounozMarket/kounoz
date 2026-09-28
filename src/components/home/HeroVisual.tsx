import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ProductThumb } from "@/components/product/ProductThumb";
import { Parallax } from "@/components/motion/Parallax";
import { Price } from "@/components/product/Price";
import { ArrowRightIcon, CashIcon, TruckIcon } from "@/components/ui/icons";
import type { ProductSummary } from "@/types/product";

/**
 * Hero product stage. A neutral lit "studio" card — no product silhouette, so any
 * category fits. Shows the featured product's photo (its own ratio, contained);
 * without a photo the stage stays labelled "Visuel produit à venir".
 * Floating glass chips drift at different speeds on desktop (Parallax).
 */
export function HeroVisual({ product }: { product?: ProductSummary }) {
  return (
    <div className="intro-frame relative mx-auto w-full max-w-[34rem] lg:max-w-none" style={{ "--d": 160 } as CSSProperties}>
      <Parallax speed={-5}>
        <div
          data-placeholder="hero-visual"
          className="card relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-float sm:aspect-square lg:aspect-[5/6] lg:rounded-[2.5rem]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_30%,var(--glow),transparent_70%)]" />
          {/* Concentric rings */}
          <div className="absolute top-[42%] left-1/2 aspect-square w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" />
          <div className="absolute top-[42%] left-1/2 aspect-square w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line" />
          <div className="absolute top-[42%] left-1/2 aspect-square w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-line/60 bg-accent-soft/40" />
          {/* Floor */}
          <div className="absolute inset-x-[18%] bottom-[24%] h-[7%] rounded-[50%] bg-[radial-gradient(closest-side,rgb(212_163_89/0.3),transparent)]" />
          {product?.media.src ? (
            <div className="absolute inset-x-[14%] top-[22%] bottom-[30%] flex items-center justify-center sm:top-[16%] lg:top-[12%] lg:bottom-[26%]">
              <Image
                src={product.media.src}
                alt={product.media.alt}
                width={900}
                height={Math.round(900 / product.media.ratio)}
                preload
                sizes="(min-width: 1024px) 30vw, 70vw"
                className="h-full w-auto max-w-full rounded-3xl object-contain shadow-float"
              />
            </div>
          ) : (
            <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="block text-[0.6875rem] font-semibold tracking-[0.14em] text-muted uppercase">Visuel produit</span>
              <span className="mt-1 block text-[0.6875rem] text-muted/70">À venir · tout format</span>
            </div>
          )}

          {/* Chip inside the card (all sizes) */}
          <div className="glass absolute top-4 left-4 flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold sm:top-6 sm:left-6">
            <CashIcon className="size-4 text-accent" />
            Paiement à la réception
          </div>
          <div className="glass absolute top-15 left-4 flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold sm:top-[4.5rem] sm:left-6 xl:hidden">
            <TruckIcon className="size-4 text-accent" />
            Livraison 24/48h
          </div>
        </div>
      </Parallax>

      {/* Delivery chip, floating over the right edge (desktop) */}
      <Parallax speed={-18} className="absolute top-[18%] -right-4 hidden xl:block">
        <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-float">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
            <TruckIcon className="size-[18px]" />
          </span>
          <span className="text-xs leading-tight font-semibold">
            Livraison 24/48h
            <span className="block font-normal text-muted">partout au Maroc</span>
          </span>
        </div>
      </Parallax>

      {/* Featured product mini card (sample data) */}
      {product ? (
        <Parallax speed={-12} className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-6 lg:inset-x-auto lg:-left-8 lg:bottom-10 lg:w-[20rem]">
          <Link href={product.href} className="glass group flex items-center gap-4 rounded-2xl p-3 pr-4 shadow-float">
            <ProductThumb media={product.media} className="size-16 flex-none" />
            <div className="min-w-0 flex-1">
              <p className="text-[0.625rem] font-semibold tracking-[0.14em] text-muted uppercase">Mise en avant</p>
              <p className="mt-1 truncate text-sm font-bold">{product.name}</p>
              <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" showDiscount={false} className="mt-1" />
            </div>
            <span aria-hidden="true" className="inline-flex size-10 flex-none items-center justify-center rounded-full bg-accent text-on-accent transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRightIcon />
            </span>
          </Link>
        </Parallax>
      ) : null}
    </div>
  );
}
