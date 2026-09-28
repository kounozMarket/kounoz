"use client";

import { useState, type FormEvent } from "react";
import { validateOrder, type OrderErrors, type OrderFields } from "@/lib/validation";

const EMPTY: OrderFields = { name: "", phone: "", city: "", address: "" };

/**
 * Form state for the COD order. Submission is NOT connected yet (WooCommerce +
 * Google Sheets + Purchase event come in a later batch): a valid submit moves to
 * the "pending-backend" state and nothing is sent.
 */
export function useCodForm() {
  const [values, setValues] = useState<OrderFields>(EMPTY);
  const [errors, setErrors] = useState<OrderErrors>({});
  const [status, setStatus] = useState<"idle" | "pending-backend">("idle");

  function onChange(field: keyof OrderFields, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    if (status !== "idle") setStatus("idle");
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validateOrder(values);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      e.currentTarget.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("pending-backend");
  }

  return { values, errors, status, onChange, onSubmit };
}
