import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToComplete } from "@/components/page/ToComplete";
import { Reveal } from "@/components/motion/Reveal";
import { Price } from "@/components/product/Price";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPurchase } from "@/components/product/ProductPurchase";
import { CashIcon, ParcelCheckIcon, TruckIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { getProductBySlug, getProducts } from "@/lib/catalog";

const badgeIcons = { delivery: TruckIcon, cod: CashIcon, check: ParcelCheckIcon } as const;

// Products come from WooCommerce (D-27): prebuilt at build time, new ones rendered
// on first visit, all refreshed every 5 minutes (ISR).
export const revalidate = 300;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produit/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return product ? { title: product.name } : {};
}

/** Single product page (sample data until WooCommerce). */
export default async function ProductPage({ params }: PageProps<"/produit/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = (await getProducts()).filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="container-site pt-4 pb-section lg:pt-8 lg:pb-section-lg">
        <nav aria-label="Fil d'Ariane" className="text-xs font-medium text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-text">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/boutique" className="hover:text-text">
                Boutique
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="truncate text-text">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-5 grid gap-8 lg:mt-8 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
              <ProductGallery product={product} />
            </div>
          </div>

          <div className="lg:col-span-5">
            {product.category.name ? <span className="eyebrow">{product.category.name}</span> : null}
            <h1 className="mt-4 text-[clamp(1.875rem,1.4rem+2vw,2.75rem)] leading-[1.08] font-extrabold tracking-[-0.03em]">
              {product.name}
            </h1>
            <Price price={product.price} compareAtPrice={product.compareAtPrice} className="mt-4" />

            <ul className="mt-6 grid gap-2">
              {siteConfig.reassurance.map((b) => {
                const Icon = badgeIcons[b.id];
                return (
                  <li key={b.id} className="flex items-center gap-3 text-sm font-medium text-text/85">
                    <span className="inline-flex size-8 flex-none items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon className="size-4" />
                    </span>
                    {b.label}
                  </li>
                );
              })}
            </ul>

            <ProductPurchase product={product} />

            <section aria-labelledby="description-title" className="mt-10">
              <h2 id="description-title" className="text-h3">
                Description
              </h2>
              <div className="mt-4">
                {product.descriptionHtml ? (
                  <div
                    className="space-y-3 leading-relaxed text-text/85 [&_a]:text-accent [&_a]:underline [&_h3]:mt-5 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-text [&_li]:ml-5 [&_ol]:list-decimal [&_strong]:text-text [&_ul]:list-disc"
                    // Sanitised server-side (src/lib/html.ts).
                    dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                  />
                ) : (
                  <ToComplete label="Description, caractéristiques et contenu du produit." question="Q-12" />
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {related.length ? (
        <section aria-labelledby="related-title" className="border-t border-line py-section lg:py-section-lg">
          <Reveal className="container-site">
            <div className="flex items-end justify-between gap-4">
              <h2 id="related-title" data-reveal className="text-h2">
                Vous aimerez <span className="text-muted">aussi</span>
              </h2>
              <Link href="/boutique" data-reveal className="text-sm font-semibold whitespace-nowrap text-accent hover:underline">
                Tout voir
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 items-end gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} layout="grid" sizes="(min-width: 1024px) 22vw, 48vw" />
              ))}
            </div>
          </Reveal>
        </section>
      ) : null}
    </>
  );
}
