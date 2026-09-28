import Link from "next/link";
import { ClosingBand } from "@/components/home/ClosingBand";
import { Engagements } from "@/components/home/Engagements";
import { Hero } from "@/components/home/Hero";
import { Reveal } from "@/components/motion/Reveal";
import { ProductShowcase } from "@/components/product/ProductShowcase";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sampleProducts } from "@/data/sample-products";

/**
 * Homepage visual FRAME. All copy is placeholder and products come from local
 * SAMPLE data; the final homepage is built later from client / WooCommerce content.
 */
export default function HomePage() {
  return (
    <>
      <Hero featured={sampleProducts[0]} />

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
                <PlaceholderTag>Données d&apos;exemple</PlaceholderTag>
                <Link href="/boutique" className={buttonClasses("link")}>
                  Voir toute la boutique
                  <ArrowRightIcon />
                </Link>
              </div>
            }
          />

          <div className="mt-10 lg:mt-16">
            <ProductShowcase products={sampleProducts} />
          </div>

          <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted lg:hidden">
            Faites glisser pour voir plus
            <ArrowRightIcon className="size-3.5" />
          </p>
        </Reveal>
      </section>

      <ClosingBand />
    </>
  );
}
