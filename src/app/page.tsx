import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Fleet } from "@/components/Fleet";
import { Destinations } from "@/components/Destinations";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { buildLocalBusinessJsonLd, siteUrl } from "@/lib/seo";

const EventsMarquee = dynamic(() =>
  import("@/components/EventsMarquee").then((mod) => ({ default: mod.EventsMarquee }))
);

const BookingForm = dynamic(() =>
  import("@/components/BookingForm").then((mod) => ({ default: mod.BookingForm }))
);

export const metadata: Metadata = {
  alternates: { canonical: siteUrl },
};

export default function Home() {
  const jsonLd = buildLocalBusinessJsonLd();

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
      <Faq />
      <BookingForm />
      <Footer />
    </main>
  );
}
