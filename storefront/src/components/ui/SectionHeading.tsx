import type { ReactNode } from "react";

/**
 * Section intro: pill eyebrow + bold title + optional aside (text or action).
 * Highlight one part of the title with <span className="text-muted"> or "text-gold".
 * Each part carries `data-reveal` so a surrounding <Reveal> animates it.
 */
type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  aside?: ReactNode;
  id?: string;
  align?: "start" | "center";
};

export function SectionHeading({ eyebrow, title, aside, id, align = "start" }: SectionHeadingProps) {
  if (align === "center") {
    return (
      <div className="mx-auto max-w-2xl text-center">
        <p data-reveal className="eyebrow">
          {eyebrow}
        </p>
        <h2 id={id} data-reveal className="mt-5 text-h2">
          {title}
        </h2>
        {aside ? (
          <div data-reveal className="mt-4 text-muted">
            {aside}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
      <div className="max-w-2xl">
        <p data-reveal className="eyebrow">
          {eyebrow}
        </p>
        <h2 id={id} data-reveal className="mt-5 text-h2">
          {title}
        </h2>
      </div>
      {aside ? (
        <div data-reveal className="text-sm text-muted md:max-w-xs md:pb-1 md:text-right">
          {aside}
        </div>
      ) : null}
    </div>
  );
}
