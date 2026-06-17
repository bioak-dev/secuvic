import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Fleet } from "@/components/Fleet";
import { Destinations } from "@/components/Destinations";
import { EventsMarquee } from "@/components/EventsMarquee";
import { BookingForm } from "@/components/BookingForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
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
