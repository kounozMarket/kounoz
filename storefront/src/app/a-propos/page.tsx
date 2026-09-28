import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Engagements } from "@/components/home/Engagements";
import { OrderSteps } from "@/components/page/OrderSteps";
import { PageHeader } from "@/components/page/PageHeader";
import { ToComplete } from "@/components/page/ToComplete";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "À propos",
  description: "KONOUZ MARKET : boutique en ligne marocaine, livraison partout au Maroc et paiement à la réception.",
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
        intro="Boutique en ligne marocaine. Vous commandez en quelques secondes, nous livrons partout au Maroc, vous payez à la réception."
      />

      <section aria-label="Présentation de la marque" className="container-site grid gap-4 lg:grid-cols-12 lg:gap-6">
        <div className="card relative flex min-h-72 items-center justify-center overflow-hidden rounded-[2rem] p-10 lg:col-span-5 lg:min-h-96">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
          <Logo variant="full" className="relative h-28 w-auto lg:h-36" />
        </div>
        <div className="card flex flex-col justify-center gap-5 rounded-[2rem] p-6 sm:p-10 lg:col-span-7">
          <p className="eyebrow self-start">Notre histoire</p>
          <h2 className="text-h2">
            La marque, <span className="text-muted">en quelques mots</span>
          </h2>
          <ToComplete label="Présentation de la marque : histoire, mission, valeurs, univers produits." question="Q-17" />
        </div>
      </section>

      <Engagements />
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
