import { Reveal } from "@/components/motion/Reveal";
import { CashIcon, ParcelCheckIcon, TruckIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";

const icons = { delivery: TruckIcon, cod: CashIcon, check: ParcelCheckIcon } as const;

/** Confirmed reassurance badges (CDC §3) as three feature cards. */
export function Engagements() {
  return (
    <section id="engagements" aria-labelledby="engagements-title" className="py-12 lg:py-16">
      <Reveal className="container-site">
        <h2 id="engagements-title" data-reveal className="eyebrow">
          Nos engagements
        </h2>
        <ul className="mt-6 grid gap-3 sm:gap-4 md:grid-cols-3">
          {siteConfig.reassurance.map((item, i) => {
            const Icon = icons[item.id];
            return (
              <li
                key={item.id}
                data-reveal
                className="card group relative flex items-center gap-5 overflow-hidden p-5 transition-colors duration-300 hover:border-accent-line md:flex-col md:items-start md:gap-10 md:p-7"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="relative inline-flex size-12 flex-none items-center justify-center rounded-2xl bg-accent-soft text-accent md:size-14">
                  <Icon className="size-6" />
                </span>
                <div className="relative">
                  <span className="text-xs font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-1 text-h3 font-bold">{item.label}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
