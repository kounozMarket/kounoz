import Image from "next/image";
import type { ProductMedia } from "@/types/product";

/** Small square product thumbnail (cart, summaries). Neutral tile when there is no photo. */
export function ProductThumb({ media, className = "size-16", sizes = "64px" }: { media: ProductMedia; className?: string; sizes?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line bg-surface-2/50 ${className}`}>
      {media.src ? (
        <Image src={media.src} alt={media.alt} fill sizes={sizes} className="object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center text-[0.5rem] font-semibold tracking-wider text-muted uppercase">
          Visuel
        </span>
      )}
    </div>
  );
}
