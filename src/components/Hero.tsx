import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { ContactLinks } from "@/components/ContactLinks";
import { COMPANY_NAME, SERVICE_NAME } from "@/lib/company";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-v-class.jpg"
          alt={`Chauffeur privé Mercedes Classe V — ${SERVICE_NAME} à Cannes, Monaco et Paris`}
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center pt-20">
        <div className="hero-fade-up hero-delay-1 flex items-center gap-3 mb-6">
          <div className="h-[1px] w-12 bg-gold-500"></div>
          <span className="text-gold-500 tracking-[0.2em] uppercase text-xs md:text-sm font-medium">
            Un service {COMPANY_NAME}
          </span>
          <div className="h-[1px] w-12 bg-gold-500"></div>
        </div>

        <h1 className="hero-fade-up hero-delay-2 text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-4 leading-tight">
          Chauffeur Privé <br />
          <span className="italic text-gray-300">Mercedes Classe V</span>
        </h1>

        <p className="hero-fade-up hero-delay-3 max-w-2xl text-gray-300 text-lg md:text-xl font-light mb-10">
          Mise à disposition spécialisée pour vos événements et invités VIC à Cannes, Monaco et Paris.
        </p>

        <div className="hero-fade-up hero-delay-4 flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#booking"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 text-black uppercase tracking-wider font-medium hover:bg-gold-400 transition-colors rounded-sm"
            >
              Réserver maintenant <ChevronRight size={18} />
            </a>
            <a
              href="#services"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-white/30 text-white uppercase tracking-wider font-medium hover:bg-white/10 transition-colors rounded-sm"
            >
              Découvrir nos services
            </a>
          </div>
          <ContactLinks />
        </div>
      </div>

      <div className="hero-fade-in hero-delay-5 absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-xs uppercase tracking-widest text-gray-400">Défiler</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <div className="scroll-indicator w-full h-1/2 bg-gold-500 absolute top-0" />
        </div>
      </div>
    </section>
  );
}
