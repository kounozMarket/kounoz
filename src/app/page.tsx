import Link from "next/link";
import { ClosingBand } from "@/components/home/ClosingBand";
import { Engagements } from "@/components/home/Engagements";
import { Hero } from "@/components/home/Hero";
import { Reveal } from "@/components/motion/Reveal";
import { ProductShowcase } from "@/components/product/ProductShowcase";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyCatalog } from "@/components/product/EmptyCatalog";
import { getProducts } from "@/lib/catalog";

/**
 * Homepage. Products come from WooCommerce (D-27, refreshed every 5 min);
 * hero / section copy is still placeholder until the client supplies it.
 */
export const revalidate = 300;

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Hero featured={products[0]} />

      <Engagements />

      <section id="selection" aria-labelledby="selection-title" className="py-section lg:py-section-lg">
        <Reveal className="container-site">
          <SectionHeading
            id="selection-title"
            eyebrow="La sélection"
            title={
              <>
                Titre de section <span className="text-muted">à définir</span>
              </>
            }
            aside={
              <div className="flex flex-col items-start gap-4 md:items-end">
                <Link href="/boutique" className={buttonClasses("link")}>
                  Voir toute la boutique
                  <ArrowRightIcon />
                </Link>
              </div>
            }
          />

          <div className="mt-10 lg:mt-16">
            {products.length ? <ProductShowcase products={products} /> : <EmptyCatalog />}
          </div>

          {products.length > 1 ? (
            <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted lg:hidden">
              Faites glisser pour voir plus
              <ArrowRightIcon className="size-3.5" />
            </p>
          ) : null}
        </Reveal>
      </section>

      <ClosingBand />
    </>
  );
}
