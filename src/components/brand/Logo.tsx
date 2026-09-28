import Image from "next/image";
import logoFull from "@/assets/brand/logo-full.png";
import logoMonogram from "@/assets/brand/logo-monogram.png";

/**
 * Official KONOUZ MARKET logos (trimmed copies of /logos/*.png — originals untouched).
 * - "monogram": KM only — header, compact placements.
 * - "full": KM + "KONOUZ MARKET" subtitle — footer, brand blocks.
 * Height drives the size; width follows the intrinsic ratio.
 */
type LogoProps = {
  variant: "monogram" | "full";
  className?: string;
  preload?: boolean;
};

export function Logo({ variant, className, preload = false }: LogoProps) {
  const src = variant === "full" ? logoFull : logoMonogram;
  return (
    <Image
      src={src}
      alt="KONOUZ MARKET"
      preload={preload}
      sizes="(min-width: 1024px) 200px, 140px"
      className={className}
    />
  );
}
