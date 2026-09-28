/**
 * Legal page content (CDC §6, D-10).
 *
 * SOURCE DISCIPLINE: only facts confirmed by the CDC / decisions are written as
 * text (COD only, 24/48h delivery all over Morocco, parcel check before payment,
 * 3-field order form, confirmation call, strikethrough promo price).
 * Everything else is a `todo` block, rendered as a visible "À compléter" marker,
 * until the client supplies the wording (Q-04, Q-10, Q-11). Do not invent policies.
 */
export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "link"; text: string; label: string; href: string }
  | { type: "todo"; label: string; question?: string };

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

export type LegalPageContent = {
  slug: string;
  title: string;
  /** Title split: the accent part is highlighted in gold. */
  titleLead: string;
  titleAccent: string;
  intro: string;
  sections: LegalSection[];
};

export const shippingPolicy: LegalPageContent = {
  slug: "politique-de-livraison",
  title: "Politique de livraison",
  titleLead: "Politique de",
  titleAccent: "livraison",
  intro: "Comment votre commande est confirmée, livrée et payée.",
  sections: [
    {
      id: "zone",
      title: "Zone de livraison",
      blocks: [{ type: "p", text: "Nous livrons partout au Maroc." }],
    },
    {
      id: "delais",
      title: "Délais de livraison",
      blocks: [
        { type: "p", text: "Les commandes sont livrées sous 24 à 48 heures, partout au Maroc." },
        { type: "todo", label: "Point de départ du délai, jours ouvrés, exceptions éventuelles.", question: "Q-11" },
      ],
    },
    {
      id: "confirmation",
      title: "Confirmation de la commande",
      blocks: [
        {
          type: "p",
          text: "Après l'envoi du formulaire de commande, notre équipe vous appelle pour confirmer votre commande.",
        },
      ],
    },
    {
      id: "paiement",
      title: "Paiement à la réception",
      blocks: [
        { type: "p", text: "Le paiement s'effectue à la réception de votre colis. Aucun paiement en ligne n'est demandé." },
      ],
    },
    {
      id: "verification",
      title: "Vérification du colis",
      blocks: [{ type: "p", text: "Vous avez le droit de vérifier votre colis avant de le payer." }],
    },
    {
      id: "frais",
      title: "Frais de livraison",
      blocks: [{ type: "todo", label: "Montant des frais de livraison ou gratuité, selon la ville.", question: "Q-04" }],
    },
    {
      id: "transporteurs",
      title: "Transporteurs",
      blocks: [{ type: "todo", label: "Transporteur(s) utilisé(s).", question: "Q-10" }],
    },
    {
      id: "incidents",
      title: "Absence, refus ou adresse incorrecte",
      blocks: [
        { type: "todo", label: "Procédure en cas d'absence, de colis refusé ou d'adresse erronée.", question: "Q-11" },
      ],
    },
  ],
};

export const termsOfSale: LegalPageContent = {
  slug: "conditions-generales",
  title: "Conditions générales",
  titleLead: "Conditions",
  titleAccent: "générales",
  intro: "Les règles qui s'appliquent aux commandes passées sur konouzmarket.com.",
  sections: [
    {
      id: "objet",
      title: "Objet",
      blocks: [
        {
          type: "p",
          text: "Les présentes conditions générales encadrent les commandes passées sur le site konouzmarket.com.",
        },
      ],
    },
    {
      id: "vendeur",
      title: "Identification du vendeur",
      blocks: [
        {
          type: "todo",
          label: "Raison sociale, forme juridique, ICE, RC, adresse du siège et contact officiel.",
          question: "Q-11",
        },
      ],
    },
    {
      id: "commande",
      title: "Commande",
      blocks: [
        {
          type: "p",
          text: "La commande se passe directement depuis la fiche produit, sans panier ni création de compte. Le formulaire demande uniquement :",
        },
        {
          type: "list",
          items: ["Nom et prénom", "Numéro de téléphone (WhatsApp)", "Ville et adresse de livraison"],
        },
        { type: "p", text: "Notre équipe vous appelle ensuite pour confirmer la commande." },
      ],
    },
    {
      id: "prix",
      title: "Prix",
      blocks: [
        {
          type: "p",
          text: "Les prix sont indiqués en dirhams marocains sur chaque fiche produit. En cas de promotion, l'ancien prix est affiché barré.",
        },
        { type: "todo", label: "Frais de livraison inclus ou non dans le prix affiché.", question: "Q-04" },
      ],
    },
    {
      id: "paiement",
      title: "Paiement",
      blocks: [
        {
          type: "p",
          text: "Le paiement s'effectue exclusivement à la livraison, à la réception du colis. Aucun paiement en ligne n'est proposé.",
        },
      ],
    },
    {
      id: "livraison",
      title: "Livraison",
      blocks: [
        {
          type: "link",
          text: "Les modalités de livraison sont détaillées dans la",
          label: "politique de livraison",
          href: "/politique-de-livraison",
        },
      ],
    },
    {
      id: "retours",
      title: "Retours et échanges",
      blocks: [
        {
          type: "link",
          text: "Les conditions de retour et d'échange sont détaillées dans la",
          label: "politique de retour et d'échange",
          href: "/politique-de-retour",
        },
      ],
    },
    {
      id: "donnees",
      title: "Données personnelles",
      blocks: [
        {
          type: "p",
          text: "Les informations saisies dans le formulaire (nom, téléphone, ville et adresse) servent à traiter et livrer votre commande.",
        },
        {
          type: "todo",
          label: "Politique de confidentialité, déclaration CNDP, durée de conservation des données.",
          question: "Q-11",
        },
      ],
    },
    {
      id: "droit",
      title: "Droit applicable et litiges",
      blocks: [{ type: "todo", label: "Droit applicable et juridiction compétente.", question: "Q-11" }],
    },
  ],
};

export const returnPolicy: LegalPageContent = {
  slug: "politique-de-retour",
  title: "Politique de retour et d'échange",
  titleLead: "Retour",
  titleAccent: "et échange",
  intro: "Ce qu'il faut savoir avant, pendant et après la réception de votre colis.",
  sections: [
    {
      id: "verification",
      title: "Vérification avant paiement",
      blocks: [{ type: "p", text: "Vous pouvez vérifier le contenu de votre colis avant de le payer." }],
    },
    {
      id: "conditions",
      title: "Conditions de retour",
      blocks: [{ type: "todo", label: "Produits concernés et état exigé (emballage, produit non utilisé…).", question: "Q-11" }],
    },
    {
      id: "delai",
      title: "Délai",
      blocks: [{ type: "todo", label: "Délai pour demander un retour ou un échange.", question: "Q-11" }],
    },
    {
      id: "echange",
      title: "Échange ou remboursement",
      blocks: [{ type: "todo", label: "Échange uniquement, remboursement, ou les deux ; modalités.", question: "Q-11" }],
    },
    {
      id: "frais",
      title: "Frais de retour",
      blocks: [{ type: "todo", label: "Qui prend en charge les frais de retour.", question: "Q-11" }],
    },
    {
      id: "demande",
      title: "Faire une demande",
      blocks: [
        { type: "link", text: "Pour toute question, contactez-nous depuis la", label: "page contact", href: "/contact" },
        { type: "todo", label: "Procédure de retour étape par étape.", question: "Q-11" },
      ],
    },
  ],
};
