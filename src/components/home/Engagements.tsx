import { Reveal } from "@/components/motion/Reveal";
import { CashIcon, ChatIcon, ShieldCheckIcon, TruckIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";

const icons = { quality: ShieldCheckIcon, cod: CashIcon, delivery: TruckIcon, support: ChatIcon } as const;

/** Official client commitments (`siteConfig.engagements`) as four feature cards. */
export function Engagements({ title = "Nos engagements" }: { title?: string }) {
  return (
    <section id="engagements" aria-labelledby="engagements-title" className="py-12 lg:py-16">
      <Reveal className="container-site">
        <h2 id="engagements-title" data-reveal className="eyebrow">
          {title}
        </h2>
        <ul className="mt-6 grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {siteConfig.engagements.map((item, i) => {
            const Icon = icons[item.id];
            return (
              <li
                key={item.id}
                data-reveal
                className="card group relative flex items-start gap-5 overflow-hidden p-5 transition-colors duration-300 hover:border-accent-line md:flex-col md:items-start md:gap-10 md:p-7"
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
                  <h3 className="mt-1 text-h3 font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
