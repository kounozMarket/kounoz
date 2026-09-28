"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import type { OrderErrors, OrderFields } from "@/lib/validation";

/**
 * The only fields of the COD order form (CDC §3, D-05/D-22):
 * full name, phone (WhatsApp), city, delivery address.
 */
type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

function Field({ label, hint, error, id: customId, ...input }: FieldProps) {
  const autoId = useId();
  const id = customId ?? autoId;
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3 text-sm font-semibold">
        {label}
        {hint ? <span className="text-xs font-medium text-muted">{hint}</span> : null}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 block h-13 w-full rounded-2xl border bg-bg/60 px-4 text-base text-text transition-[border-color,box-shadow] outline-none placeholder:text-muted/70 focus:border-accent focus:shadow-[0_0_0_4px_var(--color-accent-soft)] ${
          error ? "border-red-400/70" : "border-line-strong"
        }`}
        {...input}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Group({ step, title, children }: { step: number; title: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.14em] uppercase">
        <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent-soft text-[0.6875rem] text-accent">
          {step}
        </span>
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

type CodFieldsProps = {
  values: OrderFields;
  errors: OrderErrors;
  onChange: (field: keyof OrderFields, value: string) => void;
  /** Focus target for "Commander maintenant". */
  nameInputId?: string;
};

export function CodFields({ values, errors, onChange, nameInputId }: CodFieldsProps) {
  return (
    <div className="space-y-8">
      <Group step={1} title="Informations de contact">
        <Field
          label="Nom complet"
          name="name"
          id={nameInputId}
          autoComplete="name"
          placeholder="Entrez votre nom complet"
          value={values.name}
          error={errors.name}
          onChange={(e) => onChange("name", e.target.value)}
        />
        <Field
          label="Numéro de téléphone"
          hint="WhatsApp"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+212 6XX XXX XXX"
          value={values.phone}
          error={errors.phone}
          onChange={(e) => onChange("phone", e.target.value)}
        />
      </Group>
      <Group step={2} title="Informations de livraison">
        <Field
          label="Ville"
          name="city"
          autoComplete="address-level2"
          placeholder="Entrez votre ville"
          value={values.city}
          error={errors.city}
          onChange={(e) => onChange("city", e.target.value)}
        />
        <Field
          label="Adresse de livraison"
          name="address"
          autoComplete="street-address"
          placeholder="123 Rue Exemple, Appt 4"
          value={values.address}
          error={errors.address}
          onChange={(e) => onChange("address", e.target.value)}
        />
      </Group>
    </div>
  );
}
