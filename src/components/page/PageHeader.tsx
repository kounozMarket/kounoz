import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/**
 * Header for inner pages: breadcrumb, bold title, intro, optional extras.
 * Entrance uses the same CSS intro classes as the homepage hero (no JS wait).
 */
type PageHeaderProps = {
  /** Current page name — used in the breadcrumb. */
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
};

const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <header className="relative -mt-header overflow-hidden pt-header">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]">
        <div className="bg-motif absolute inset-0 opacity-55 lg:opacity-80" />
        <div className="absolute -top-1/3 left-1/2 size-[56rem] max-w-none -translate-x-1/2 bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      </div>

      <div className="container-site relative pt-10 pb-12 text-center lg:pt-16 lg:pb-16">
        <nav aria-label="Fil d'Ariane" className="intro-fade" style={d(0)}>
          <ol className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-xs font-medium text-muted backdrop-blur-md">
            <li>
              <Link href="/" className="transition-colors hover:text-text">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true" className="text-line-strong">
              /
            </li>
            <li aria-current="page" className="text-text">
              {eyebrow}
            </li>
          </ol>
        </nav>

        <h1 className="mx-auto mt-6 max-w-3xl text-h1 lg:mt-8">
          <span className="intro-line">
            <span style={d(60)}>{title}</span>
          </span>
        </h1>
        {intro ? (
          <div className="intro-fade mx-auto mt-5 max-w-xl text-lead text-muted lg:mt-6" style={d(200)}>
            {intro}
          </div>
        ) : null}
        {children ? (
          <div className="intro-fade mx-auto mt-8 flex max-w-xl justify-center" style={d(300)}>
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
