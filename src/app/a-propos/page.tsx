import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Engagements } from "@/components/home/Engagements";
import { OrderSteps } from "@/components/page/OrderSteps";
import { PageHeader } from "@/components/page/PageHeader";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Konouz Market : une sélection rigoureuse de produits innovants et pratiques, livrés partout au Maroc avec paiement à la livraison.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title={
          <>
            KONOUZ <span className="text-gold">MARKET</span>
          </>
        }
        intro="Bienvenue sur Konouz Market, votre boutique en ligne de référence dédiée à une sélection rigoureuse de produits innovants et pratiques, alliant qualité supérieure, utilité quotidienne et prix compétitifs."
      />

      <section aria-label="Présentation de la marque" className="container-site grid gap-4 lg:grid-cols-12 lg:gap-6">
        <div className="card relative flex min-h-72 items-center justify-center overflow-hidden rounded-[2rem] p-10 lg:col-span-5 lg:min-h-96">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
          <Logo variant="full" className="relative h-28 w-auto lg:h-36" />
        </div>
        <div className="card flex flex-col justify-center gap-5 rounded-[2rem] p-6 sm:p-10 lg:col-span-7">
          <p className="eyebrow self-start">Notre mission</p>
          <h2 className="text-h2">
            À propos de <span className="text-gold">Konouz Market</span>
          </h2>
          <div className="space-y-4 leading-relaxed text-text/85">
            <p>
              Notre mission est de simplifier votre expérience d&apos;achat en ligne en vous proposant des solutions fiables,
              livrées directement à votre porte en toute sécurité et rapidité.
            </p>
            <p>
              Nous croyons fermement que la confiance est la base d&apos;une relation durable ; c&apos;est pourquoi nous
              privilégions une transparence totale et un contrôle rigoureux de la qualité de chaque article avant son expédition.
            </p>
          </div>
        </div>
      </section>

      <Engagements title="Pourquoi choisir Konouz Market ?" />
      <OrderSteps />

      <section className="container-site pb-section lg:pb-section-lg">
        <div className="card flex flex-col items-start gap-6 rounded-[2rem] p-6 sm:p-10 md:flex-row md:items-center md:justify-between">
          <h2 className="text-h2">
            Prêt à <span className="text-gold">découvrir</span> ?
          </h2>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/boutique" className={buttonClasses("primary", "w-full sm:w-auto")}>
              Voir la boutique
              <ArrowRightIcon />
            </Link>
            <Link href="/contact" className={buttonClasses("secondary", "w-full sm:w-auto")}>
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
