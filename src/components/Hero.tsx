import Image from "next/image";
import { SERVICE_NAME } from "@/lib/company";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full flex items-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-v-class.jpg"
          alt={`Chauffeur privé ${SERVICE_NAME} — Mercedes Classe V à Cannes, Monaco et Paris`}
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-24 md:pb-28 text-white">
        <div className="fade-up delay-1 mb-7 flex items-center gap-4">
          <span className="h-[1px] w-12 bg-champagne-soft" />
          <span className="text-[0.7rem] tracking-[0.32em] uppercase text-white/80">
            Chauffeur Privé · Service Premium
          </span>
        </div>

        <h1 className="fade-up delay-2 font-serif text-[2.6rem] leading-[1.05] md:text-7xl lg:text-[5.2rem] max-w-4xl">
          L&apos;art du voyage
          <br />
          <span className="italic text-white/90">pour invités VIP &amp; VIC</span>
        </h1>

        <p className="fade-up delay-3 mt-8 max-w-xl text-base md:text-lg font-light text-white/75 leading-relaxed">
          Mise à disposition, transferts et sécurité sur mesure à Cannes, Monaco et Paris.
          Une Maison de chauffeurs privés au service de l&apos;exception.
        </p>

        <div className="fade-up delay-4 mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="#booking"
            className="px-9 py-4 bg-white text-ink text-[0.72rem] tracking-[0.22em] uppercase font-medium hover:bg-champagne hover:text-white transition-colors text-center"
          >
            Réserver un chauffeur
          </a>
          <a
            href="#services"
            className="px-9 py-4 border border-white/40 text-white text-[0.72rem] tracking-[0.22em] uppercase font-medium hover:bg-white/10 transition-colors text-center"
          >
            Découvrir la Maison
          </a>
        </div>
      </div>

      <div className="fade-in delay-5 absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/50">Défiler</span>
        <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden">
          <span className="scroll-indicator block w-full h-1/2 bg-champagne-soft absolute top-0" />
        </div>
      </div>
    </section>
  );
}
