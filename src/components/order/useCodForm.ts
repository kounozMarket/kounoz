"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { validateOrder, type OrderErrors, type OrderFields } from "@/lib/validation";

const EMPTY: OrderFields = { name: "", phone: "", city: "", address: "" };

export type OrderItem = { id: string; qty: number };

/**
 * COD order form state + submission to /api/commande (D-28).
 * On success the browser goes to /merci/[id]?cle=<order_key>.
 */
export function useCodForm({ getItems, onSuccess }: { getItems: () => OrderItem[]; onSuccess?: () => void }) {
  const router = useRouter();
  const [values, setValues] = useState<OrderFields>(EMPTY);
  const [errors, setErrors] = useState<OrderErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const startedAt = useRef<number | null>(null);
  const requestId = useRef<string | null>(null);

  function onChange(field: keyof OrderFields, value: string) {
    startedAt.current ??= Date.now();
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    if (message) setMessage(null);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    const form = e.currentTarget;

    const next = validateOrder(values);
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("submitting");
    setMessage(null);
    requestId.current ??= crypto.randomUUID();
    try {
      const res = await fetch("/api/commande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: values,
          items: getItems(),
          website: (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "",
          startedAt: startedAt.current,
          requestId: requestId.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.orderId) {
        if (data.fields) setErrors(data.fields);
        setMessage(data.error ?? "La commande n'a pas pu être envoyée. Réessayez.");
        setStatus("idle");
        requestId.current = null;
        return;
      }
      setStatus("success");
      onSuccess?.();
      router.push(`/merci/${data.orderId}?cle=${encodeURIComponent(data.orderKey)}`);
    } catch {
      setMessage("Connexion impossible. Vérifiez votre réseau et réessayez.");
      setStatus("idle");
    }
  }

  return { values, errors, status, message, onChange, onSubmit };
}
