import { MapPin, Star, Smartphone, UserCheck, Navigation, Route, Clock } from "lucide-react";
import { Brand } from "@/components/Brand";

const features = [
  {
    icon: Navigation,
    title: "Suivi en Temps Réel",
    description:
      "Suivez la position de votre chauffeur en direct sur une carte, à chaque instant de votre transfert.",
  },
  {
    icon: Smartphone,
    title: "Espace Client Dédié",
    description:
      "Une application de suivi accessible depuis votre espace personnel, sur mobile comme sur ordinateur.",
  },
  {
    icon: Route,
    title: "Itinéraire & Arrivée",
    description:
      "Visualisez l'itinéraire emprunté et l'heure d'arrivée estimée de votre véhicule, en direct.",
  },
  {
    icon: UserCheck,
    title: "Chauffeurs d'Exception",
    description:
      "Des chauffeurs privés expérimentés, ponctuels et discrets, au service de votre confort.",
  },
  {
    icon: Star,
    title: "Service VIC Spécialisé",
    description:
      "Un accueil et un accompagnement sur-mesure pour vos invités Very Important Clients, avec élégance.",
  },
  {
    icon: MapPin,
    title: "Cannes · Monaco · Paris",
    description:
      "Présents sur les pôles les plus prestigieux : Festival de Cannes, Grand Prix de Monaco, Fashion Week.",
  },
  {
    icon: Clock,
    title: "Mise à Disposition",
    description:
      "Un service flexible à l'heure, à la demi-journée ou à la journée complète, selon votre emploi du temps.",
  },
];

const trackingPoints = [
  "Position du véhicule en direct sur la carte",
  "Itinéraire et heure d'arrivée estimée",
  "Vitesse et progression du trajet en temps réel",
  "Accès depuis votre mobile et votre ordinateur",
  "Espace client personnel et privé",
  "Historique de vos transferts",
];

export function Services() {
  return (
    <section id="services" className="bg-ivory">
      {/* Manifeste */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 border-b border-line">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-3">
            <span className="eyebrow">La Maison</span>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.15] max-w-3xl">
              <Brand /> allie le raffinement du transport de luxe à une
              application de suivi en temps réel.
            </h2>
            <p className="mt-8 max-w-2xl text-ink-soft font-light text-lg leading-relaxed">
              Notre flotte de Mercedes Classe V noir est pilotée par des chauffeurs d&apos;exception.
              Et grâce à notre application de suivi, vous visualisez en direct la position de
              votre véhicule, du départ jusqu&apos;à l&apos;arrivée.
            </p>
          </div>
        </div>
      </div>

      {/* Prestations */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group p-9 lg:p-11 border-line transition-colors hover:bg-white ${
                  i % 3 !== 2 ? "lg:border-r" : ""
                } ${i % 2 === 0 ? "sm:border-r lg:border-r" : ""} ${
                  i < features.length - 1 ? "border-b" : ""
                }`}
              >
                <Icon className="w-6 h-6 text-champagne mb-7" strokeWidth={1.25} />
                <h3 className="font-serif text-xl mb-3">{feature.title}</h3>
                <p className="text-ink-soft text-sm font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Application de suivi */}
      <div className="bg-ink text-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="eyebrow">L&apos;application</span>
            <h3 className="font-serif text-3xl md:text-4xl mt-6 leading-tight">
              Suivez votre transfert{" "}
              <span className="italic text-champagne-soft">en direct</span>
            </h3>
            <p className="mt-7 text-white/60 font-light leading-relaxed max-w-md">
              Au-delà du confort, <Brand />{" "}
              met la technologie au service de votre sérénité. Depuis votre espace client,
              suivez la position de votre chauffeur en temps réel et anticipez chaque étape
              de votre trajet.
            </p>
            <a
              href="/client/login"
              className="link-underline inline-block mt-9 text-[0.72rem] tracking-[0.2em] uppercase text-champagne-soft"
            >
              Accéder à l&apos;espace client
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 lg:pt-4">
            {trackingPoints.map((point) => (
              <div key={point} className="border-t border-white/15 pt-5">
                <span className="text-white/80 text-sm font-light leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
