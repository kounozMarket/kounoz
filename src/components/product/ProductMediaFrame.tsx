import Image from "next/image";
import type { Presentation, ProductMedia } from "@/types/product";

/**
 * Product image area. The frame takes the product's own aspect ratio; the
 * lighting treatment comes from the category's presentation variant.
 * Without an image it renders a neutral, labelled placeholder (no fake product).
 */
type Props = {
  media: ProductMedia;
  presentation: Presentation;
  sizes: string;
  badge?: string;
  className?: string;
};

function Lighting({ presentation }: { presentation: Presentation }) {
  if (presentation === "stage") {
    // Spotlight + pedestal glow: bottle / package categories only.
    return (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_0%,var(--glow),transparent_70%)]" />
        <div className="absolute bottom-[14%] left-1/2 h-[8%] w-[58%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(212_163_89/0.28),transparent)]" />
      </>
    );
  }
  // Studio: soft, even light for any other product shape.
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(75%_65%_at_50%_45%,color-mix(in_oklab,var(--color-text)_6%,transparent),transparent_70%)]" />
      <div className="absolute bottom-[16%] left-1/2 h-[6%] w-[46%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(0_0_0/0.35),transparent)]" />
    </>
  );
}

export function ProductMediaFrame({ media, presentation, sizes, badge, className = "" }: Props) {
  return (
    <div
      data-reveal="media"
      className={`relative overflow-hidden rounded-3xl border border-line bg-surface transition-colors duration-500 group-hover:border-accent-line ${className}`}
      style={{ aspectRatio: media.ratio }}
    >
      <div data-reveal-inner className="absolute inset-0">
        <div className="absolute inset-0 transition-transform duration-[1.1s] ease-premium group-hover:scale-[1.05]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--color-surface-2)_-60%,var(--color-surface)_60%)]" />
          <Lighting presentation={presentation} />
          {media.src ? (
            <Image src={media.src} alt={media.alt} fill sizes={sizes} className="object-contain p-[8%]" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-4 text-center" data-placeholder="product-image">
              <span className="text-[0.5625rem] font-semibold tracking-[0.12em] text-muted/80 uppercase sm:text-[0.6875rem]">{media.alt}</span>
            </div>
          )}
        </div>
      </div>

      {badge ? (
        <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-1 text-[0.6875rem] font-bold tabular-nums text-on-accent shadow-gold">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
