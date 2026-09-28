import type { Metadata } from "next";
import { PageHeader } from "@/components/page/PageHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { CashIcon, ParcelCheckIcon, TruckIcon } from "@/components/ui/icons";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { siteConfig } from "@/config/site";
import { sampleProducts } from "@/data/sample-products";

export const metadata: Metadata = {
  title: "Boutique",
  description: "Tous les produits KONOUZ MARKET, livrés partout au Maroc avec paiement à la réception.",
};

const badgeIcons = { delivery: TruckIcon, cod: CashIcon, check: ParcelCheckIcon } as const;

/**
 * Catalogue page. SAMPLE data until WooCommerce is connected.
 * Masonry columns: each card keeps its product ratio, no forced square crops.
 */
export default function BoutiquePage() {
  const count = sampleProducts.length;

  return (
    <>
      <PageHeader
        eyebrow="Boutique"
        title={
          <>
            Tous les <span className="text-gold">produits</span>
          </>
        }
        intro="Commandez en quelques secondes, payez à la réception."
      />

      <div className="container-site pb-section lg:pb-section-lg">
        {/* Toolbar */}
        <div className="card flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-bold">{count} produits</span>
            <PlaceholderTag>Données d&apos;exemple — catalogue WooCommerce à venir</PlaceholderTag>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-muted">
            {siteConfig.reassurance.slice(0, 2).map((b) => {
              const Icon = badgeIcons[b.id];
              return (
                <li key={b.id} className="inline-flex items-center gap-2">
                  <Icon className="size-4 text-accent" />
                  {b.label}
                </li>
              );
            })}
          </ul>
        </div>

        <Reveal className="mt-6 columns-2 gap-3 sm:gap-5 lg:mt-10 lg:columns-3 lg:gap-8 [&>article]:mb-8 sm:[&>article]:mb-10 lg:[&>article]:mb-12">
          {sampleProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              layout="grid"
              sizes="(min-width: 1024px) 30vw, 48vw"
            />
          ))}
        </Reveal>
      </div>
    </>
  );
}
