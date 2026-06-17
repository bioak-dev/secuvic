import type { Metadata } from "next";
import { COMPANY_ADDRESS, COMPANY_LEGAL_NAME, COMPANY_NAME, SERVICE_NAME } from "./company";
import { CONTACT_PHONE_DISPLAY } from "./contact";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://secuvic.vercel.app";

export const siteDescription =
  `${SERVICE_NAME} — chauffeur privé Mercedes Classe V par ${COMPANY_NAME}. Transport VIC sécurisé à Cannes, Monaco et Paris. Mise à disposition, transferts et discrétion absolue.`;

export const siteKeywords = [
  "chauffeur privé",
  "VTC Cannes",
  "VTC Monaco",
  "VTC Paris",
  "Mercedes Classe V",
  "transport VIC",
  "mise à disposition chauffeur",
  "transfert aéroport Nice",
  "chauffeur Festival Cannes",
  "Grand Prix Monaco chauffeur",
  "SecuVIC",
  "Drive&You",
  COMPANY_LEGAL_NAME,
];

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SERVICE_NAME} | Chauffeur Privé Mercedes Classe V | Cannes, Monaco, Paris`,
    template: `%s | ${SERVICE_NAME}`,
  },
  description: siteDescription,
  keywords: siteKeywords,
  authors: [{ name: COMPANY_LEGAL_NAME }],
  creator: COMPANY_LEGAL_NAME,
  publisher: COMPANY_LEGAL_NAME,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${SERVICE_NAME} | Chauffeur Privé Mercedes Classe V`,
    description: `Sécurité & Prestige — Chauffeur privé VIC à Cannes, Monaco et Paris. Un service ${COMPANY_NAME}.`,
    url: siteUrl,
    siteName: SERVICE_NAME,
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${SERVICE_NAME} — chauffeur privé Mercedes Classe V`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SERVICE_NAME} | Chauffeur Privé VIC`,
    description: `Mercedes Classe V — Cannes, Monaco, Paris · ${CONTACT_PHONE_DISPLAY}`,
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/logo-secuvic.png",
    apple: "/images/logo-secuvic.png",
  },
  category: "transport",
};

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: SERVICE_NAME,
        description: siteDescription,
        inLanguage: "fr-FR",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: COMPANY_LEGAL_NAME,
        alternateName: COMPANY_NAME,
        url: siteUrl,
        logo: `${siteUrl}/images/logo-secuvic.png`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "6 avenue du Président Kennedy",
          postalCode: "11100",
          addressLocality: "Narbonne",
          addressCountry: "FR",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#business`,
        name: SERVICE_NAME,
        description: siteDescription,
        url: siteUrl,
        telephone: CONTACT_PHONE_DISPLAY,
        image: `${siteUrl}/images/og-image.jpg`,
        priceRange: "€€€",
        address: {
          "@type": "PostalAddress",
          streetAddress: "6 avenue du Président Kennedy",
          postalCode: "11100",
          addressLocality: "Narbonne",
          addressCountry: "FR",
        },
        areaServed: [
          { "@type": "City", name: "Cannes" },
          { "@type": "City", name: "Monaco" },
          { "@type": "City", name: "Paris" },
        ],
        parentOrganization: { "@id": `${siteUrl}/#organization` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services chauffeur privé",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Mise à disposition chauffeur privé",
                description: "Chauffeur et Mercedes Classe V à l'heure ou à la journée.",
                areaServed: "Cannes, Monaco, Paris",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Transfert aéroport et hôtel",
                description: "Transferts discrets vers Nice Côte d'Azur, hôtels et événements.",
                areaServed: "Côte d'Azur",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Transport événementiel VIC",
                description: "Accompagnement sécurisé pour festivals, salons et grands événements.",
                areaServed: "Cannes, Monaco, Paris",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Quelles villes sont couvertes par SecuVIC ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "SecuVIC opère principalement à Cannes, Monaco et Paris, pour les transferts, mises à disposition et événements VIC.",
            },
          },
          {
            "@type": "Question",
            name: "Quel véhicule est proposé ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Un Mercedes Classe V noir, configuré pour le confort et la confidentialité de 1 à 7 passagers.",
            },
          },
          {
            "@type": "Question",
            name: "SecuVIC est-il un service indépendant ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `SecuVIC est le service premium de ${COMPANY_NAME} (${COMPANY_LEGAL_NAME}), société VTC basée à ${COMPANY_ADDRESS}.`,
            },
          },
        ],
      },
    ],
  };
}
