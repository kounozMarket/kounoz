"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { QTY_MAX, QTY_MIN } from "@/lib/cart";

/** − / value / + control. Large touch targets on mobile. */
type QtyStepperProps = {
  value: number;
  onChange: (qty: number) => void;
  size?: "md" | "sm";
  label?: string;
};

export function QtyStepper({ value, onChange, size = "md", label = "Quantité" }: QtyStepperProps) {
  const btn = size === "md" ? "size-12" : "size-9";
  return (
    <div
      role="group"
      aria-label={label}
      className={`inline-flex items-center rounded-full border border-line-strong bg-surface/60 ${size === "md" ? "p-1" : "p-0.5"}`}
    >
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= QTY_MIN}
        aria-label="Diminuer la quantité"
        className={`${btn} inline-flex items-center justify-center rounded-full transition-colors hover:bg-text/[0.06] disabled:opacity-35`}
      >
        <MinusIcon />
      </button>
      <output aria-live="polite" className={`text-center font-bold tabular-nums ${size === "md" ? "w-10 text-base" : "w-7 text-sm"}`}>
        {value}
      </output>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= QTY_MAX}
        aria-label="Augmenter la quantité"
        className={`${btn} inline-flex items-center justify-center rounded-full transition-colors hover:bg-text/[0.06] disabled:opacity-35`}
      >
        <PlusIcon />
      </button>
    </div>
  );
}
