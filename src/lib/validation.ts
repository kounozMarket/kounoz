/**
 * COD order form validation (CDC §3 fields). Messages in French.
 * Phone: Moroccan mobile/fixed numbers — 0[5-7]XXXXXXXX, or +212 / 00212 / 212
 * followed by [5-7]XXXXXXXX. Spaces, dots and dashes are ignored.
 */
export type OrderFields = { name: string; phone: string; city: string; address: string };
export type OrderErrors = Partial<Record<keyof OrderFields, string>>;

export function normalizePhone(value: string): string | null {
  const digits = value.replace(/[\s.\-()]/g, "");
  const m = digits.match(/^(?:\+212|00212|212|0)([5-7]\d{8})$/);
  return m ? `+212${m[1]}` : null;
}

export function validateOrder(f: OrderFields): OrderErrors {
  const errors: OrderErrors = {};
  if (f.name.trim().length < 2) errors.name = "Veuillez indiquer votre nom complet.";
  if (!normalizePhone(f.phone)) errors.phone = "Numéro invalide. Exemple : 06 12 34 56 78 ou +212 6 12 34 56 78.";
  if (f.city.trim().length < 2) errors.city = "Veuillez indiquer votre ville.";
  if (f.address.trim().length < 5) errors.address = "Veuillez indiquer votre adresse de livraison.";
  return errors;
}
