/**
 * Shared button / link classes. Gold is reserved for the single primary action
 * per screen. Put an <ArrowRightIcon /> inside to get the arrow nudge on hover.
 */
const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full text-center font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-premium disabled:pointer-events-none disabled:opacity-50 [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-premium hover:[&_svg]:translate-x-0.5";

const sizes = {
  md: "min-h-12 px-6 py-3 text-cta sm:min-h-13 sm:px-7",
  sm: "min-h-10 px-4.5 py-2 text-[0.8125rem] whitespace-nowrap",
} as const;

const variants = {
  /* Gold with a soft top highlight; lifts on hover. */
  primary:
    "bg-accent text-on-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.28)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgb(255_255_255/0.16),transparent_55%)] hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-gold active:translate-y-0",
  secondary:
    "border border-line-strong bg-surface/60 text-text backdrop-blur-md hover:border-accent-line hover:bg-accent-soft",
  ghost: "text-text hover:bg-text/[0.06]",
  /** Text link with a growing underline — no box. */
  link: "min-h-0! rounded-none! px-0! py-0! link-sweep pb-0.5 text-text hover:text-accent",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClasses(variant: ButtonVariant = "primary", extra = "", size: ButtonSize = "md") {
  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`.trim();
}
