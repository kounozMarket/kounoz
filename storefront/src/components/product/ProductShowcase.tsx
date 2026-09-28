import { ProductCard } from "@/components/product/ProductCard";
import type { ProductSummary } from "@/types/product";

/**
 * Product presentation for any number of products.
 * - < lg: horizontal snap rail. All media share one height; each width follows
 *   the product's ratio, so a bottle, a box and a wide accessory all look intended.
 * - ≥ lg: two offset editorial columns (7/5) with alternating widths — no uniform
 *   4-up grid. Distribution is by index, never by product id (D-12).
 */
const leftWidths = ["", "lg:ml-auto lg:w-[78%]"];
const rightWidths = ["lg:w-[86%]", ""];

export function ProductShowcase({ products }: { products: ProductSummary[] }) {
  const columns = [
    products.map((p, i) => ({ p, i })).filter(({ i }) => i % 2 === 0),
    products.map((p, i) => ({ p, i })).filter(({ i }) => i % 2 === 1),
  ];

  return (
    <div className="relative -mx-gutter flex snap-x snap-mandatory scroll-px-gutter items-start gap-4 overflow-x-auto px-gutter pb-2 no-scrollbar md:gap-6 lg:mx-0 lg:grid lg:grid-cols-12 lg:gap-x-10 lg:overflow-visible lg:px-0 xl:gap-x-16">
      {columns.map((column, c) => (
        <div
          key={c}
          className={`contents lg:flex lg:flex-col lg:gap-20 ${c === 0 ? "lg:col-span-7" : "lg:col-span-5 lg:pt-32"}`}
        >
          {column.map(({ p, i }, pos) => (
            <ProductCard
              key={p.id}
              product={p}
              index={i}
              featured={i === 0}
              sizes="(min-width: 1024px) 50vw, 84vw"
              className={(c === 0 ? leftWidths : rightWidths)[pos % 2]}
              style={{ order: i }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
