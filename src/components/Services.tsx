import { MapPin, Star, ShieldCheck, UserCheck, Eye, ScanSearch, Clock } from "lucide-react";
import { Brand } from "@/components/Brand";

const features = [
  {
    icon: ShieldCheck,
    title: "Coordination Sécurité",
    description:
      "Sur demande, nous coordonnons vos déplacements avec des agents de protection agréés (CNAPS), pour un dispositif sur-mesure.",
  },
  {
    icon: UserCheck,
    title: "Chauffeurs Formés",
    description:
      "Une conduite de sécurité et d'évitement maîtrisée, et la gestion sereine des situations les plus sensibles.",
  },
  {
    icon: ScanSearch,
    title: "Confidentialité de l'Habitacle",
    description:
      "Chaque véhicule est inspecté avec des outils professionnels (micros, caméras, traceurs) avant chaque mission.",
  },
  {
    icon: Eye,
    title: "Discrétion Absolue",
    description:
      "Confidentialité totale sur vos déplacements et vos identités. Accords de non-divulgation signés sur demande.",
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

const securityPoints = [
  "Détection de micros, caméras cachées et traceurs GPS",
  "Véhicules inspectés avec des outils professionnels",
  "Chauffeurs formés à la conduite de sécurité",
  "Itinéraires sécurisés et repérages préalables",
  "Coordination avec des agents de protection (CNAPS)",
  "Confidentialité totale, NDA et anonymat",
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
              <Brand /> allie le raffinement du transport de luxe à une exigence de
              sécurité sans compromis.
            </h2>
            <p className="mt-8 max-w-2xl text-ink-soft font-light text-lg leading-relaxed">
              Notre flotte de Mercedes Classe V noir est pilotée par des chauffeurs formés à la
              conduite de sécurité, en coordination avec des agents de protection agréés. Une
              signature : la sérénité absolue de vos passagers.
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

      {/* Engagement sécurité */}
      <div className="bg-ink text-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24 md:py-32 grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="eyebrow">Notre engagement</span>
            <h3 className="font-serif text-3xl md:text-4xl mt-6 leading-tight">
              Vos invités VIC entre les mains{" "}
              <span className="italic text-champagne-soft">d&apos;experts</span>
            </h3>
            <p className="mt-7 text-white/60 font-light leading-relaxed max-w-md">
              Au-delà du confort, <Brand /> place la sécurité au centre de chaque mission.
              De la planification de l&apos;itinéraire à la prise en charge, chaque détail est
              anticipé pour la tranquillité de vos passagers.
            </p>
            <a
              href="#booking"
              className="link-underline inline-block mt-9 text-[0.72rem] tracking-[0.2em] uppercase text-champagne-soft"
            >
              Demander un dispositif sur-mesure
            </a>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6 lg:pt-4">
            {securityPoints.map((point) => (
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
