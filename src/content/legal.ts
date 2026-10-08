/**
 * Legal page content (CDC §6, D-10).
 *
 * SOURCE DISCIPLINE: only facts confirmed by the CDC / decisions or by the client's
 * official texts (2026-10-04: exchange policy, privacy policy, contact details,
 * delivery through partner carriers) are written as text.
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
  intro: "Livraison rapide et fiable, partout au Maroc.",
  sections: [
    {
      id: "zone",
      title: "Zone de livraison",
      blocks: [
        {
          type: "p",
          text: "Nous livrons partout au Maroc, avec une large couverture des villes du Royaume.",
        },
      ],
    },
    {
      id: "delais",
      title: "Délais de livraison",
      blocks: [
        {
          type: "p",
          text: "Une livraison rapide et fiable : les commandes sont livrées sous 24 à 48 heures, pour une réception dans les meilleures conditions.",
        },
        { type: "todo", label: "Point de départ du délai, jours ouvrés, exceptions éventuelles.", question: "Q-11" },
      ],
    },
    {
      id: "confirmation",
      title: "Confirmation de la commande",
      blocks: [
        {
          type: "p",
          text: "Après l'envoi du formulaire de commande, notre équipe vous contacte par téléphone ou WhatsApp pour valider votre commande.",
        },
      ],
    },
    {
      id: "transporteurs",
      title: "Sociétés de livraison",
      blocks: [
        { type: "p", text: "L'expédition et la livraison sont assurées par nos sociétés de livraison partenaires." },
        {
          type: "p",
          text: "Vos coordonnées de livraison sont partagées uniquement avec la société de livraison chargée d'acheminer votre commande.",
        },
      ],
    },
    {
      id: "paiement",
      title: "Paiement à la livraison",
      blocks: [
        {
          type: "p",
          text: "Vous ne payez qu'une fois votre colis reçu et vérifié en main propre. Aucun paiement en ligne n'est demandé.",
        },
      ],
    },
    {
      id: "frais",
      title: "Frais de livraison",
      blocks: [{ type: "todo", label: "Montant des frais de livraison ou gratuité, selon la ville.", question: "Q-04" }],
    },
    {
      id: "contact",
      title: "Suivi et questions",
      blocks: [
        {
          type: "link",
          text: "Pour toute question sur votre livraison, contactez notre support WhatsApp depuis la",
          label: "page contact",
          href: "/contact",
        },
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
          text: "Les présentes conditions générales encadrent les commandes passées sur le site konouzmarket.com, boutique en ligne avec livraison partout au Maroc.",
        },
      ],
    },
    {
      id: "vendeur",
      title: "Identification du vendeur",
      blocks: [
        {
          type: "list",
          items: [
            "Konouz Market — boutique en ligne, livraison partout au Maroc",
            "Siège administratif : Hay Riad, Rabat — Maroc, 10100",
            "E-mail : contact@konouzmarket.com",
            "Service client : WhatsApp",
          ],
        },
        { type: "todo", label: "Raison sociale, forme juridique, ICE et RC.", question: "Q-11" },
      ],
    },
    {
      id: "commande",
      title: "Commande",
      blocks: [
        {
          type: "p",
          text: "La commande se passe depuis la fiche produit ou le panier, sans création de compte. Seules les informations nécessaires au traitement et à la livraison de la commande sont demandées :",
        },
        {
          type: "list",
          items: ["Nom et prénom", "Numéro de téléphone (WhatsApp)", "Ville et adresse de livraison"],
        },
        { type: "p", text: "Notre équipe vous contacte ensuite par téléphone ou WhatsApp pour valider la commande." },
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
      title: "Paiement à la livraison",
      blocks: [
        {
          type: "p",
          text: "Le paiement s'effectue exclusivement à la livraison : vous ne payez qu'une fois votre colis reçu et vérifié en main propre. Aucun paiement en ligne n'est proposé.",
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
      title: "Échange et remboursement",
      blocks: [
        {
          type: "link",
          text: "Les conditions d'échange sont détaillées dans la",
          label: "politique d'échange et de remboursement",
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
          text: "Les informations saisies dans le formulaire servent uniquement à traiter et livrer votre commande.",
        },
        {
          type: "link",
          text: "Le traitement de vos données est détaillé dans la",
          label: "politique de confidentialité",
          href: "/politique-de-confidentialite",
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
  title: "Politique d'échange et de remboursement",
  titleLead: "Échange",
  titleAccent: "et remboursement",
  intro: "La satisfaction de nos clients est au cœur de nos engagements.",
  sections: [
    {
      id: "droit",
      title: "Droit d'échange",
      blocks: [
        {
          type: "p",
          text: "Vous avez le droit de demander l'échange d'un article en cas de défaut de fabrication, de dommage survenu lors du transport, ou d'inconformité par rapport au produit commandé.",
        },
      ],
    },
    {
      id: "delai",
      title: "Délai",
      blocks: [
        {
          type: "p",
          text: "Veuillez nous signaler tout problème via notre support WhatsApp dans un délai de 48 heures suivant la réception de votre colis.",
        },
      ],
    },
    {
      id: "conditions",
      title: "Conditions",
      blocks: [
        { type: "p", text: "Le produit doit être retourné dans son emballage d'origine, complet et non utilisé." },
      ],
    },
    {
      id: "frais",
      title: "Frais de retour",
      blocks: [
        {
          type: "p",
          text: "En cas de défaut avéré ou d'erreur de notre part, l'ensemble des frais de réexpédition est entièrement pris en charge par Konouz Market.",
        },
      ],
    },
  ],
};

export const privacyPolicy: LegalPageContent = {
  slug: "politique-de-confidentialite",
  title: "Politique de confidentialité",
  titleLead: "Politique de",
  titleAccent: "confidentialité",
  intro: "Quelles données nous collectons, pourquoi, et comment nous les protégeons.",
  sections: [
    {
      id: "donnees",
      title: "Données collectées",
      blocks: [
        {
          type: "p",
          text: "Lors de la validation d'une commande, nous collectons uniquement les informations indispensables au traitement et à la livraison de vos colis :",
        },
        {
          type: "list",
          items: [
            "Nom et prénom.",
            "Numéro de téléphone (pour la confirmation et le suivi de livraison).",
            "Ville et adresse de livraison.",
          ],
        },
      ],
    },
    {
      id: "utilisation",
      title: "Utilisation de vos informations",
      blocks: [
        { type: "p", text: "Vos données personnelles sont exclusivement utilisées pour :" },
        {
          type: "list",
          items: [
            "Valider et traiter vos commandes par téléphone ou WhatsApp.",
            "Assurer l'expédition et la livraison par nos transporteurs partenaires.",
            "Assurer le service après-vente et le support client.",
          ],
        },
      ],
    },
    {
      id: "protection",
      title: "Protection et partage des données",
      blocks: [
        {
          type: "p",
          text: "Nous nous engageons à préserver la stricte confidentialité de vos données. En aucun cas, vos informations ne sont vendues, louées ou cédées à des tiers à des fins publicitaires.",
        },
        {
          type: "p",
          text: "Vos coordonnées de livraison sont partagées uniquement avec la société de livraison chargée d'acheminer votre commande.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        {
          type: "p",
          text: "Notre site utilise des cookies essentiels et des outils d'analyse standards afin d'optimiser les performances de navigation, la fluidité de l'expérience utilisateur et la sécurité de notre plateforme.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      blocks: [
        {
          type: "link",
          text: "Pour toute question concernant notre politique de confidentialité ou vos données, contactez-nous directement sur notre support WhatsApp depuis la",
          label: "page contact",
          href: "/contact",
        },
      ],
    },
  ],
};
