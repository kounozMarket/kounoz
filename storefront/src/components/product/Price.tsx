import { siteConfig } from "@/config/site";

// French grouping ("1 047"); fr-MA would give "1.047" in some browsers.
const numberFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

/** "1 299 DH" — for totals and summaries. */
export function formatPrice(value: number) {
  return `${numberFormat.format(value)} ${siteConfig.currencyLabel}`;
}

/**
 * Price with sale treatment: current price leads, regular price crossed out,
 * discount derived from the data (never typed by hand).
 */
type PriceProps = {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md";
  /** Hide the % chip (e.g. when the card already shows it on the image). */
  showDiscount?: boolean;
  className?: string;
};

export function discountPercent(price: number, compareAtPrice?: number) {
  return compareAtPrice !== undefined && compareAtPrice > price ? Math.round((1 - price / compareAtPrice) * 100) : 0;
}

export function Price({ price, compareAtPrice, size = "md", showDiscount = true, className = "" }: PriceProps) {
  const discount = discountPercent(price, compareAtPrice);
  const unit = siteConfig.currencyLabel;

  return (
    <p className={`flex flex-wrap items-baseline gap-x-2.5 gap-y-1 ${className}`}>
      <span className={`font-bold tabular-nums ${discount ? "text-accent" : "text-text"} ${size === "md" ? "text-price" : "text-base"}`}>
        <span className="sr-only">Prix : </span>
        {numberFormat.format(price)}
        <span className="ml-1 text-[0.7em] font-semibold">{unit}</span>
      </span>
      {discount ? (
        <>
          <s className="text-sm tabular-nums text-muted decoration-muted/60">
            <span className="sr-only">au lieu de </span>
            {numberFormat.format(compareAtPrice!)} {unit}
          </s>
          {showDiscount ? (
            <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[0.6875rem] font-bold tabular-nums text-accent">
              −{discount}&nbsp;%
            </span>
          ) : null}
        </>
      ) : null}
    </p>
  );
}
