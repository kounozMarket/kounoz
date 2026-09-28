import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Branded 404 — replaces Next's default "This page could not be found." */
export default function NotFound() {
  return (
    <section className="relative -mt-header overflow-hidden pt-header">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
        <div className="bg-motif absolute inset-0" />
        <div className="absolute top-1/4 left-1/2 size-[50rem] max-w-none -translate-x-1/2 bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      </div>
      <div className="container-site relative flex min-h-[75svh] flex-col items-center justify-center py-section text-center">
        <p className="intro-fade text-gold text-[clamp(6rem,4rem+12vw,12rem)] leading-none font-extrabold tracking-tighter">404</p>
        <h1 className="intro-fade mt-4 text-h2">Page introuvable</h1>
        <p className="intro-fade mt-4 max-w-md text-muted">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
        <div className="intro-fade mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link href="/" className={buttonClasses("primary", "w-full sm:w-auto")}>
            Retour à l&apos;accueil
            <ArrowRightIcon />
          </Link>
          <Link href="/boutique" className={buttonClasses("secondary", "w-full sm:w-auto")}>
            Voir la boutique
          </Link>
        </div>
      </div>
    </section>
  );
}
