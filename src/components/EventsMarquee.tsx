import Image from "next/image";
import { COMPANY_NAME, SERVICE_NAME } from "@/lib/company";

const events = [
  { name: "Festival de Cannes", logo: "/logos/events/festival-cannes.svg", city: "Cannes" },
  { name: "MIPIM", logo: "/logos/events/mipim.svg", city: "Cannes" },
  { name: "Cannes Lions", logo: "/logos/events/cannes-lions.svg", city: "Cannes" },
  { name: "MIPCOM", logo: "/logos/events/mipcom.svg", city: "Cannes" },
  { name: "Grand Prix de Monaco", logo: "/logos/events/grand-prix-monaco.svg", city: "Monaco" },
  { name: "Monaco Yacht Show", logo: "/logos/events/monaco-yacht-show.svg", city: "Monaco" },
  { name: "Monte-Carlo Rolex Masters", logo: "/logos/events/rolex-masters.svg", city: "Monaco" },
  { name: "Paris Fashion Week", logo: "/logos/events/paris-fashion-week.svg", city: "Paris" },
  { name: "Roland-Garros", logo: "/logos/events/roland-garros.svg", city: "Paris" },
  { name: "Mondial de l'Auto", logo: "/logos/events/mondial-auto.svg", city: "Paris" },
  { name: "Paris Photo", logo: "/logos/events/paris-photo.svg", city: "Paris" },
  { name: "SIAL Paris", logo: "/logos/events/sial.svg", city: "Paris" },
];

function LogoItem({ event }: { event: (typeof events)[0] }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-12 shrink-0 group">
      <div className="h-14 w-48 flex items-center justify-center opacity-55 group-hover:opacity-100 transition-opacity duration-500">
        <Image
          src={event.logo}
          alt={event.name}
          width={192}
          height={56}
          className="max-h-12 w-full object-contain"
        />
      </div>
      <span className="text-[0.55rem] tracking-[0.3em] uppercase text-white/30 group-hover:text-champagne-soft transition-colors">
        {event.city}
      </span>
    </div>
  );
}

export function EventsMarquee() {
  return (
    <section className="py-20 bg-ink overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12 text-center">
        <span className="eyebrow">Événements d&apos;Exception</span>
        <p className="mt-5 text-white/60 text-base font-light">
          Cannes · Monaco · Paris — Les plus grands salons, festivals et rendez-vous internationaux
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />

        <div className="marquee-track hover:[animation-play-state:paused]">
          <div className="marquee-content">
            {events.map((event) => (
              <LogoItem key={event.name} event={event} />
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {events.map((event) => (
              <LogoItem key={`dup-${event.name}`} event={event} />
            ))}
          </div>
        </div>
      </div>

      <p className="text-white/25 text-[0.7rem] text-center mt-12 px-6">
        Marques citées appartiennent à leurs propriétaires. {SERVICE_NAME} et {COMPANY_NAME} n&apos;y sont pas affiliés.
      </p>
    </section>
  );
}
