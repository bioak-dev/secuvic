import Image from "next/image";
import { Users, Briefcase, Wifi, Coffee } from "lucide-react";

const specs = [
  { icon: Users, label: "Jusqu'à 7 passagers" },
  { icon: Briefcase, label: "Large espace bagages" },
  { icon: Wifi, label: "Wi-Fi haut débit" },
  { icon: Coffee, label: "Rafraîchissements" },
];

export function Fleet() {
  return (
    <section id="fleet" className="bg-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative h-[60vh] lg:h-auto min-h-[420px] overflow-hidden group">
          <Image
            src="/images/exterior-v-class.jpg"
            alt="Mercedes Classe V noir — chauffeur privé VICD"
            fill
            loading="lazy"
            className="object-cover img-zoom"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="flex items-center px-6 lg:px-16 py-20 lg:py-28">
          <div className="max-w-md">
            <span className="eyebrow">Le Véhicule</span>
            <h2 className="font-serif text-4xl md:text-5xl mt-6 leading-tight">
              Mercedes <span className="italic">Classe V Noir</span>
            </h2>
            <p className="mt-7 text-ink-soft font-light text-lg leading-relaxed">
              L&apos;excellence de l&apos;espace et du raffinement. Un salon mobile pensé pour le
              transport de petits groupes VIC, offrant un confort sans équivalent.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-x-8">
              {specs.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.label} className="flex items-center gap-3 border-t border-line py-4">
                    <Icon className="w-4 h-4 text-champagne shrink-0" strokeWidth={1.25} />
                    <span className="text-ink-soft text-sm font-light">{spec.label}</span>
                  </div>
                );
              })}
            </div>

            <a
              href="#booking"
              className="link-underline inline-block mt-10 text-[0.72rem] tracking-[0.2em] uppercase text-ink"
            >
              Demander ce véhicule
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
