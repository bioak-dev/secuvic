import Image from "next/image";

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
    <section id="destinations" className="bg-ivory py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <span className="eyebrow">Destinations</span>
          <h2 className="font-serif text-3xl md:text-5xl mt-6 leading-tight">
            Le Triangle d&apos;Or <span className="italic">du Luxe</span>
          </h2>
          <p className="mt-6 text-ink-soft font-light text-lg leading-relaxed">
            Présents sur les places les plus prestigieuses, nous accompagnons vos invités VIC lors
            des plus grands événements internationaux.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {destinations.map((dest) => (
            <article key={dest.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={dest.image}
                  alt={`Chauffeur privé ${dest.name} — ${dest.tagline}`}
                  fill
                  loading="lazy"
                  className="object-cover img-zoom"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="pt-6">
                <span className="eyebrow">{dest.tagline}</span>
                <h3 className="font-serif text-3xl mt-3 mb-3">{dest.name}</h3>
                <p className="text-ink-soft text-sm font-light leading-relaxed">
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
