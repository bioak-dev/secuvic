import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Fleet } from "@/components/Fleet";
import { Destinations } from "@/components/Destinations";
import { EventsMarquee } from "@/components/EventsMarquee";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";
import {
  COMPANY_EVTC,
  COMPANY_LEGAL_NAME,
  COMPANY_NAME,
  COMPANY_SIRET,
  SERVICE_NAME,
} from "@/lib/company";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_LINK } from "@/lib/contact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://secuvic.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SERVICE_NAME,
  description:
    `Chauffeur privé Mercedes Classe V — service ${SERVICE_NAME} par ${COMPANY_NAME} à Cannes, Monaco et Paris.`,
  url: siteUrl,
  telephone: CONTACT_PHONE_DISPLAY,
  image: `${siteUrl}/images/logo-secuvic.png`,
  areaServed: ["Cannes", "Monaco", "Paris"],
  priceRange: "€€€",
  parentOrganization: {
    "@type": "Organization",
    name: COMPANY_LEGAL_NAME,
    taxID: COMPANY_SIRET.replace(/\s/g, ""),
    identifier: COMPANY_EVTC,
    address: {
      "@type": "PostalAddress",
      streetAddress: "6 avenue du Président Kennedy",
      postalCode: "11100",
      addressLocality: "Narbonne",
      addressCountry: "FR",
    },
  },
  sameAs: [CONTACT_PHONE_LINK],
};

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <Services />
      <Fleet />
      <Destinations />
      <EventsMarquee />
      <BookingForm />
      <Footer />
    </main>
  );
}
