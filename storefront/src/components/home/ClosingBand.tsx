import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon, CashIcon, ParcelCheckIcon, TruckIcon } from "@/components/ui/icons";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { siteConfig } from "@/config/site";

const badgeIcons = { delivery: TruckIcon, cod: CashIcon, check: ParcelCheckIcon } as const;

/** Closing call-to-action panel. PLACEHOLDER headline/sentence — final wording from the client. */
export function ClosingBand() {
  return (
    <section aria-labelledby="closing-title" className="pb-section lg:pb-section-lg">
      <Reveal className="container-site">
        <div data-reveal className="card relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-10 lg:rounded-[2.5rem] lg:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="bg-motif absolute inset-0" />
            <div className="absolute -bottom-1/2 left-1/2 size-[60rem] max-w-none -translate-x-1/2 bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <PlaceholderTag />
            <h2 id="closing-title" className="mt-6 text-h1">
              Titre de clôture <span className="text-gold">à définir</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-muted">Phrase d&apos;appel à l&apos;action provisoire, fournie par le client.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/boutique" className={buttonClasses("primary", "w-full sm:w-auto")}>
                {siteConfig.orderCtaLabel}
                <ArrowRightIcon />
              </Link>
              <Link href="/boutique" className={buttonClasses("secondary", "w-full sm:w-auto")}>
                Voir la boutique
              </Link>
            </div>
            <ul className="mt-10 flex flex-wrap justify-center gap-2">
              {siteConfig.reassurance.map((b) => {
                const Icon = badgeIcons[b.id];
                return (
                  <li key={b.id} className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium">
                    <Icon className="size-4 text-accent" />
                    {b.label}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
