import {
  COMPANY_ADDRESS,
  COMPANY_EVTC,
  COMPANY_LEGAL_NAME,
  COMPANY_NAME,
  SERVICE_NAME,
} from "./company";
import { CONTACT_PHONE_DISPLAY } from "./contact";

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    question: "Qu'est-ce que SecuVIC ?",
    answer: `${SERVICE_NAME} est le service premium de chauffeur privé VIP et VIC proposé par ${COMPANY_NAME} (${COMPANY_LEGAL_NAME}). Il combine transport haut de gamme, discrétion et sécurité pour les déplacements d'exception à Cannes, Monaco et Paris.`,
  },
  {
    question: "Dans quelles villes SecuVIC opère-t-il ?",
    answer: `${SERVICE_NAME} intervient principalement à Cannes, Monaco et Paris : transferts, mises à disposition à l'heure ou à la journée, et accompagnement lors d'événements prestigieux (Festival de Cannes, Grand Prix de Monaco, Fashion Week, salons professionnels, etc.).`,
  },
  {
    question: "SecuVIC est-il un service VTC ?",
    answer: `Oui. ${SERVICE_NAME} est exploité par ${COMPANY_LEGAL_NAME}, société VTC immatriculée (n° ${COMPANY_EVTC}). Les prestations sont réalisées dans le cadre du transport de personnes à titre onéreux, avec des standards premium adaptés aux clients VIP et VIC.`,
  },
  {
    question: "Quels services propose SecuVIC ?",
    answer: "Mise à disposition chauffeur (à l'heure, demi-journée ou journée), transferts aéroport et hôtel (Nice Côte d'Azur, Cannes, Monaco, Paris), transport événementiel et accompagnement sécurisé sur demande avec coordination d'agents de protection agréés (CNAPS).",
  },
  {
    question: "SecuVIC est-il réservé aux clients VIP et VIC ?",
    answer: `${SERVICE_NAME} est spécialisé dans l'accueil et le transport de Very Important Clients (VIC) et de personnalités VIP : discrétion absolue, confidentialité de l'habitacle, itinéraires sécurisés et service sur mesure selon vos exigences.`,
  },
  {
    question: "Comment réserver un chauffeur privé SecuVIC ?",
    answer: `Vous pouvez réserver via le formulaire en ligne sur secuvic.com, par téléphone au ${CONTACT_PHONE_DISPLAY} ou par WhatsApp. Indiquez la date, le lieu, le type de prestation et vos besoins spécifiques pour recevoir une proposition personnalisée.`,
  },
  {
    question: "SecuVIC garantit-il la confidentialité des déplacements ?",
    answer: "Oui. Chaque mission est traitée avec discrétion absolue : inspection préalable des véhicules, chauffeurs formés à la conduite de sécurité, itinéraires anticipés et possibilité de signer un accord de confidentialité (NDA) sur demande.",
  },
  {
    question: "Qui est l'éditeur et l'exploitant de SecuVIC ?",
    answer: `${SERVICE_NAME} est un service de ${COMPANY_LEGAL_NAME}, SAS basée à ${COMPANY_ADDRESS}. Société active depuis le 05/12/2023, SIRET 982 344 152 00011, licence VTC ${COMPANY_EVTC}.`,
  },
];

export function buildFaqJsonLd() {
  return {
    "@type": "FAQPage",
    "@id": "#faq",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildFaqSectionJsonLd() {
  return {
    "@context": "https://schema.org",
    ...buildFaqJsonLd(),
  };
}
