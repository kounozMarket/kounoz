import Link from "next/link";
import type { CSSProperties } from "react";
import { HeroVisual } from "@/components/home/HeroVisual";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon, CashIcon, ParcelCheckIcon, TruckIcon } from "@/components/ui/icons";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { siteConfig } from "@/config/site";
import type { ProductSummary } from "@/types/product";

const d = (ms: number) => ({ "--d": ms }) as CSSProperties;
const badgeIcons = { delivery: TruckIcon, cod: CashIcon, check: ParcelCheckIcon } as const;

/**
 * Homepage hero FRAME. Text + CTAs + confirmed trust badges on the left,
 * product stage on the right (stacked on mobile). PLACEHOLDER copy — final
 * wording comes from the client. Entrance is CSS (.intro-*), depth is GSAP.
 */
export function Hero({ featured }: { featured?: ProductSummary }) {
  return (
    <section aria-labelledby="hero-title" className="relative -mt-header overflow-hidden pt-header">
      {/* Atmosphere: faint grid + warm glow behind the stage */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
        <div className="bg-motif absolute inset-0 opacity-45 lg:opacity-70" />
        <div className="absolute top-[10%] right-[-20%] size-[70rem] max-w-none bg-[radial-gradient(closest-side,var(--glow),transparent)] lg:right-[-10%]" />
      </div>

      <div className="container-site relative grid items-center gap-12 pt-8 pb-16 sm:pt-12 lg:min-h-[min(calc(100svh-var(--header-h)),54rem)] lg:grid-cols-12 lg:gap-10 lg:pt-10 lg:pb-24">
        <div className="relative z-10 lg:col-span-6">
          <div className="intro-fade flex flex-wrap items-center gap-3" style={d(0)}>
            <span className="eyebrow">{siteConfig.name}</span>
            <PlaceholderTag />
          </div>

          <h1 id="hero-title" className="mt-6 text-display font-extrabold uppercase lg:mt-8">
            <span className="intro-line">
              <span style={d(60)}>Titre</span>
            </span>
            <span className="intro-line">
              <span style={d(130)}>
                <span className="text-gold">éditorial</span>
              </span>
            </span>
            <span className="intro-line">
              <span className="text-muted" style={d(200)}>
                à définir<span className="ml-1 align-super text-[0.35em] text-accent">*</span>
              </span>
            </span>
          </h1>

          <p className="intro-fade mt-6 max-w-lg text-lead text-muted lg:mt-8" style={d(340)}>
            Texte d&apos;introduction provisoire — une à deux phrases fournies par le client. Aucune promesse
            commerciale n&apos;est rédigée ici.
          </p>

          <div className="intro-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" style={d(440)}>
            <Link href={featured ? `${featured.href}#commander` : "/boutique"} className={buttonClasses("primary", "w-full sm:w-auto")}>
              {siteConfig.orderCtaLabel}
              <ArrowRightIcon />
            </Link>
            <Link href="/boutique" className={buttonClasses("secondary", "w-full sm:w-auto")}>
              Voir la boutique
            </Link>
          </div>

          {/* Confirmed reassurance (CDC §3) */}
          <ul className="intro-fade mt-10 grid gap-3 sm:grid-cols-3 lg:mt-12" style={d(560)}>
            {siteConfig.reassurance.map((b) => {
              const Icon = badgeIcons[b.id];
              return (
                <li key={b.id} className="flex items-center gap-3 text-[0.8125rem] leading-snug font-medium text-text/85">
                  <span className="inline-flex size-9 flex-none items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon className="size-[18px]" />
                  </span>
                  {b.label}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="relative lg:col-span-6">
          <HeroVisual product={featured} />
        </div>
      </div>
    </section>
  );
}
