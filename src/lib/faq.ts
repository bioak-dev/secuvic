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
    question: "Qu'est-ce que VICD ?",
    answer: `${SERVICE_NAME} est le service premium de chauffeur privé VIP et VIC proposé par ${COMPANY_NAME} (${COMPANY_LEGAL_NAME}). Il combine transport haut de gamme, discrétion et une application de suivi en temps réel pour les déplacements d'exception à Cannes, Monaco et Paris.`,
  },
  {
    question: "Dans quelles villes VICD opère-t-il ?",
    answer: `${SERVICE_NAME} intervient principalement à Cannes, Monaco et Paris : transferts, mises à disposition à l'heure ou à la journée, et accompagnement lors d'événements prestigieux (Festival de Cannes, Grand Prix de Monaco, Fashion Week, salons professionnels, etc.).`,
  },
  {
    question: "VICD est-il un service VTC ?",
    answer: `Oui. ${SERVICE_NAME} est exploité par ${COMPANY_LEGAL_NAME}, société VTC immatriculée (n° ${COMPANY_EVTC}). Les prestations sont réalisées dans le cadre du transport de personnes à titre onéreux, avec des standards premium adaptés aux clients VIP et VIC.`,
  },
  {
    question: "Quels services propose VICD ?",
    answer: "Mise à disposition chauffeur (à l'heure, demi-journée ou journée), transferts aéroport et hôtel (Nice Côte d'Azur, Cannes, Monaco, Paris) et transport événementiel. Chaque transfert est suivi en temps réel par le client depuis son espace personnel.",
  },
  {
    question: "VICD est-il réservé aux clients VIP et VIC ?",
    answer: `${SERVICE_NAME} est spécialisé dans l'accueil et le transport de Very Important Clients (VIC) et de personnalités VIP : discrétion absolue, suivi du véhicule en temps réel et service sur mesure selon vos exigences.`,
  },
  {
    question: "Comment réserver un chauffeur privé VICD ?",
    answer: `Vous pouvez réserver via le formulaire en ligne sur vicd.fr, par téléphone au ${CONTACT_PHONE_DISPLAY} ou par WhatsApp. Indiquez la date, le lieu, le type de prestation et vos besoins spécifiques pour recevoir une proposition personnalisée.`,
  },
  {
    question: "Comment suivre mon transfert en temps réel ?",
    answer: "Depuis votre espace client, vous accédez à une application de suivi qui affiche en direct la position de votre véhicule sur une carte, l'itinéraire emprunté et l'heure d'arrivée estimée, sur mobile comme sur ordinateur.",
  },
  {
    question: "Qui est l'éditeur et l'exploitant de VICD ?",
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
