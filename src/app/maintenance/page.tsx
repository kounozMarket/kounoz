import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Logo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/button";
import { siteConfig, whatsappHref } from "@/config/site";

export const metadata: Metadata = {
  title: "Site en maintenance",
  robots: { index: false, follow: false },
};

/**
 * Maintenance page (D-26), served by src/proxy.ts with HTTP 503.
 * `data-maintenance` hides the store header/footer (see globals.css).
 * Neutral copy only — no launch date or commercial promise.
 */
export default function MaintenancePage() {
  const whatsapp = whatsappHref(siteConfig.whatsappNumber);

  return (
    <section data-maintenance className="relative -mt-header flex min-h-svh items-center overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-motif absolute inset-0 opacity-60" />
        <div className="absolute top-1/2 left-1/2 size-[56rem] max-w-none -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      </div>

      <div className="container-site relative flex flex-col items-center py-16 text-center">
        <Logo variant="full" preload className="intro-fade h-24 w-auto sm:h-28 lg:h-32" />

        <p className="intro-fade eyebrow mt-10" style={{ "--d": 120 } as CSSProperties}>
          Site en maintenance
        </p>
        <h1 className="intro-fade mt-6 max-w-2xl text-h1" style={{ "--d": 200 } as CSSProperties}>
          Nous revenons <span className="text-gold">très bientôt</span>
        </h1>
        <p className="intro-fade mx-auto mt-5 max-w-md text-lead text-muted" style={{ "--d": 300 } as CSSProperties}>
          Le site est en cours de préparation. Merci de votre patience.
        </p>

        {whatsapp ? (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("primary", "intro-fade mt-10 w-full sm:w-auto")}
            style={{ "--d": 400 } as CSSProperties}
          >
            Nous écrire sur WhatsApp
          </a>
        ) : null}

        <p className="mt-16 text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </section>
  );
}
