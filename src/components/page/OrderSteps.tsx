import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * How ordering works — every step is confirmed by the CDC:
 * direct order form (3 fields, §3), confirmation call (§4), 24/48h delivery,
 * parcel check and payment on receipt (§3).
 */
const steps = [
  { title: "Choisissez votre produit", text: "Depuis la boutique, ouvrez la fiche du produit qui vous intéresse." },
  {
    title: "Remplissez le formulaire",
    text: "Nom et prénom, numéro de téléphone (WhatsApp), ville et adresse de livraison. Rien de plus.",
  },
  { title: "Confirmation par téléphone", text: "Notre équipe vous appelle pour confirmer votre commande." },
  {
    title: "Livraison et paiement",
    text: "Livraison 24/48h partout au Maroc. Vérifiez votre colis, puis payez à la réception.",
  },
];

export function OrderSteps() {
  return (
    <section aria-labelledby="steps-title" className="py-section lg:py-section-lg">
      <Reveal className="container-site">
        <SectionHeading
          id="steps-title"
          align="center"
          eyebrow="Comment commander"
          title={
            <>
              Quatre étapes, <span className="text-gold">sans paiement en ligne</span>
            </>
          }
        />
        <ol className="relative mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-4">
          {/* Connector line behind the step numbers (desktop) */}
          <div aria-hidden="true" className="absolute top-12 right-[12%] left-[12%] hidden border-t border-dashed border-accent-line lg:block" />
          {steps.map((step, i) => (
            <li key={step.title} data-reveal className="card relative p-6 lg:p-7">
              <span className="relative inline-flex size-12 items-center justify-center rounded-full bg-gold text-lg font-extrabold text-on-accent shadow-gold">
                {i + 1}
              </span>
              <h3 className="mt-6 text-h3">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
