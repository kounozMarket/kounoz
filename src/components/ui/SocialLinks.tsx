import { siteConfig } from "@/config/site";

type SocialId = (typeof siteConfig.social)[number]["id"];

/** Official brand glyphs (filled, currentColor). Decorative: the link carries the label. */
const glyphs: Record<SocialId, string> = {
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  facebook:
    "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z",
  tiktok:
    "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03a10.7 10.7 0 0 1-4.2-.97 12.4 12.4 0 0 1-1.62-.93c-.01 2.92.01 5.84-.02 8.75a7.64 7.64 0 0 1-1.35 3.94 7.45 7.45 0 0 1-5.92 3.21 7.29 7.29 0 0 1-4.08-1.03A7.54 7.54 0 0 1 1.6 17.2a10.6 10.6 0 0 1-.01-1.49 7.49 7.49 0 0 1 8.69-6.65c.02 1.48-.04 2.96-.04 4.44a3.4 3.4 0 0 0-4.35 2.1c-.21.51-.15 1.07-.14 1.61a3.4 3.4 0 0 0 3.5 2.87 3.36 3.36 0 0 0 2.77-1.6c.2-.28.38-.57.39-.9.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z",
};

export function SocialGlyph({ id, className = "size-5" }: { id: SocialId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d={glyphs[id]} />
    </svg>
  );
}

/**
 * Official social accounts (`siteConfig.social`).
 * `icons` = round icon buttons (footer); `cards` = labelled tiles (contact, à propos).
 */
export function SocialLinks({ variant = "icons", className = "" }: { variant?: "icons" | "cards"; className?: string }) {
  if (variant === "cards") {
    return (
      <ul className={`grid gap-3 sm:grid-cols-3 ${className}`}>
        {siteConfig.social.map((s) => (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent-line"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold text-on-accent shadow-gold transition-transform duration-300 group-hover:scale-105">
                <SocialGlyph id={s.id} />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold transition-colors group-hover:text-accent">{s.label}</span>
                <span className="block truncate text-xs text-muted">{handle(s.href)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {siteConfig.social.map((s) => (
        <li key={s.id}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${siteConfig.name} sur ${s.label}`}
            className="inline-flex size-9 items-center justify-center rounded-full border border-line-strong text-text transition-colors hover:border-accent-line hover:bg-accent-soft hover:text-accent"
          >
            <SocialGlyph id={s.id} className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** "@handle" from a profile URL; share links (Facebook) fall back to the company name. */
function handle(href: string): string {
  const first = new URL(href).pathname.split("/").filter(Boolean)[0];
  if (!first || first === "share") return siteConfig.contact.company;
  return `@${first.replace(/^@/, "")}`;
}
