"use client";

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
    <div className="flex flex-col items-center justify-center gap-2 px-10 shrink-0 group">
      <div className="h-14 w-52 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <Image
          src={event.logo}
          alt={event.name}
          width={208}
          height={56}
          className="max-h-12 w-full object-contain"
        />
      </div>
      <span className="text-[0.55rem] tracking-[0.2em] uppercase text-gray-600 group-hover:text-gold-500/70 transition-colors">
        {event.city}
      </span>
    </div>
  );
}

export function EventsMarquee() {
  return (
    <section className="py-16 bg-black border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-gold-500"></div>
            <span className="text-gold-500 tracking-[0.2em] uppercase text-xs font-medium">Événements d&apos;Exception</span>
            <div className="h-[1px] w-12 bg-gold-500"></div>
          </div>
          <p className="text-gray-500 text-sm font-light">
            Cannes &middot; Monaco &middot; Paris — Les plus grands salons, festivals et rendez-vous internationaux
          </p>
          <p className="text-gray-600 text-xs mt-3">
            Marques citées appartiennent à leurs propriétaires. {SERVICE_NAME} et {COMPANY_NAME} n&apos;y sont pas affiliés.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

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
    </section>
  );
}
