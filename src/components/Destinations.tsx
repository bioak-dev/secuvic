import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const destinations = [
  {
    name: "Cannes",
    image: "/images/real-cannes.jpg",
    tagline: "Festival & Croisette",
    description:
      "Transferts et mises à disposition pour le Festival du Film, les soirées privées et les palaces de La Croisette.",
  },
  {
    name: "Monaco",
    image: "/images/real-monaco.jpg",
    tagline: "Grand Prix & Monte-Carlo",
    description:
      "Un service d'exception pour le Grand Prix, les galas du Casino et les événements les plus exclusifs de la Principauté.",
  },
  {
    name: "Paris",
    image: "/images/real-paris.jpg",
    tagline: "Fashion Week & Affaires",
    description:
      "Discrétion absolue pour la Fashion Week, les rendez-vous d'affaires et les soirées dans la capitale.",
  },
];

export function Destinations() {
  return (
    <section id="destinations" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-gold-500"></div>
            <span className="text-gold-500 tracking-[0.2em] uppercase text-xs font-medium">Nos Destinations</span>
            <div className="h-[1px] w-12 bg-gold-500"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Le Triangle d&apos;Or du <span className="text-gold-500 italic">Luxe</span>
          </h2>
          <p className="text-gray-400 font-light text-lg">
            Présents sur les places les plus prestigieuses, nous accompagnons vos invités VIC lors des plus grands événements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <article
              key={dest.name}
              className="group relative h-[460px] overflow-hidden rounded-sm border border-white/10"
            >
              <Image
                src={dest.image}
                alt={`Chauffeur privé ${dest.name} — ${dest.tagline}`}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-2 block">{dest.tagline}</span>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-3xl font-serif text-white">{dest.name}</h3>
                  <ArrowUpRight className="w-6 h-6 text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 transition-all duration-500 overflow-hidden">
                  {dest.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
