import type { Metadata } from "next";
import { COMPANY_LEGAL_NAME, COMPANY_NAME, SERVICE_NAME } from "./company";
import { CONTACT_PHONE_DISPLAY } from "./contact";
import { buildFaqJsonLd } from "./faq";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vicd.fr";

export const siteDescription =
  `${SERVICE_NAME} — chauffeur privé Mercedes Classe V par ${COMPANY_NAME}. Transport VIC à Cannes, Monaco et Paris avec application de suivi en temps réel. Mise à disposition, transferts et discrétion absolue.`;

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
  "VICD",
  "VICD chauffeur",
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
    description: `Prestige & Suivi en temps réel — Chauffeur privé VIC à Cannes, Monaco et Paris. Un service ${COMPANY_NAME}.`,
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
    icon: "/images/logo-vicd.png",
    apple: "/images/logo-vicd.png",
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
        logo: `${siteUrl}/images/logo-vicd.png`,
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
                description: "Accompagnement et suivi en temps réel pour festivals, salons et grands événements.",
                areaServed: "Cannes, Monaco, Paris",
              },
            },
          ],
        },
      },
      buildFaqJsonLd(),
    ],
  };
}
