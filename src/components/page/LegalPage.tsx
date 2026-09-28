import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/page/PageHeader";
import { ToComplete } from "@/components/page/ToComplete";
import type { LegalBlock, LegalPageContent } from "@/content/legal";
import { siteConfig } from "@/config/site";

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "p":
      return <p className="text-text/85">{block.text}</p>;
    case "list":
      return (
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex items-center gap-3 text-text/85">
              <span className="size-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "link":
      return (
        <p className="text-text/85">
          {block.text}{" "}
          <Link href={block.href} className="font-semibold text-accent underline decoration-accent-line underline-offset-4 hover:decoration-accent">
            {block.label}
          </Link>
          .
        </p>
      );
    case "todo":
      return <ToComplete label={block.label} question={block.question} />;
  }
}

/**
 * Long-form legal template: sticky table of contents + other legal pages (desktop),
 * numbered section cards with a comfortable reading width.
 */
export function LegalPage({ page }: { page: LegalPageContent }) {
  const others = siteConfig.legalPages.filter((p) => p.href !== `/${page.slug}`);

  return (
    <>
      <PageHeader
        eyebrow={page.title}
        title={
          <>
            {page.titleLead} <span className="text-gold">{page.titleAccent}</span>
          </>
        }
        intro={page.intro}
      >
        <ToComplete label="Date de dernière mise à jour et validation juridique du texte." question="Q-11" />
      </PageHeader>

      <div className="container-site grid gap-8 pb-section lg:grid-cols-12 lg:gap-10 lg:pb-section-lg">
        <aside className="hidden lg:col-span-4 lg:block xl:col-span-3">
          <div className="sticky top-[calc(var(--header-h)+1.5rem)] space-y-4">
            <nav aria-label="Sommaire" className="card p-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Sommaire</p>
              <ol className="mt-4 space-y-1 text-sm">
                {page.sections.map((section, i) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex gap-3 rounded-xl px-3 py-2 text-text/75 transition-colors hover:bg-text/[0.05] hover:text-text"
                    >
                      <span className="text-xs font-semibold tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <nav aria-label="Autres informations" className="card p-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">À lire aussi</p>
              <ul className="mt-3 space-y-1 text-sm">
                {others.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="block rounded-xl px-3 py-2 font-semibold transition-colors hover:bg-text/[0.05] hover:text-accent">
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <Reveal className="space-y-3 sm:space-y-4 lg:col-span-8 xl:col-span-8 xl:col-start-5">
          {page.sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
              data-reveal
              className="card scroll-mt-[calc(var(--header-h)+1rem)] p-5 sm:p-7 lg:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-8 flex-none items-center justify-center rounded-full bg-accent-soft text-xs font-bold tabular-nums text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 id={`${section.id}-title`} className="text-h3">
                  {section.title}
                </h2>
              </div>
              <div className="mt-4 max-w-[65ch] space-y-4 leading-relaxed sm:pl-11">
                {section.blocks.map((block, j) => (
                  <Block key={j} block={block} />
                ))}
              </div>
            </section>
          ))}
        </Reveal>
      </div>
    </>
  );
}
