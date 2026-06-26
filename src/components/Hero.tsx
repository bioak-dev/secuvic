import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SERVICE_NAME } from "@/lib/company";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] w-full flex items-end overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pb-16 md:pb-20">
        {/* Bloc éditorial façon LVMH */}
        <div className="fade-up delay-2 bg-ivory text-ink max-w-xl p-9 md:p-12 lg:p-14 shadow-2xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-[1px] w-10 bg-champagne" />
            <span className="text-[0.68rem] tracking-[0.3em] uppercase text-champagne">
              Chauffeur Privé · Service Premium
            </span>
          </div>

          <h1 className="font-serif text-[2.4rem] leading-[1.05] md:text-5xl lg:text-[3.4rem]">
            L&apos;art du voyage
            <br />
            <span className="italic text-ink-soft">sur mesure</span>
          </h1>

          <p className="mt-6 text-ink-soft text-sm md:text-base font-light leading-relaxed">
            Mise à disposition, transferts et suivi en temps réel à Cannes, Monaco et Paris.
            Une Maison de chauffeurs privés au service de l&apos;exception.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <a
              href="#booking"
              className="px-8 py-4 bg-ink text-ivory text-[0.72rem] tracking-[0.22em] uppercase font-medium hover:bg-champagne transition-colors text-center"
            >
              Réserver un chauffeur
            </a>
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-3 text-[0.72rem] tracking-[0.22em] uppercase font-medium text-ink"
            >
              Découvrir la Maison
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 text-champagne"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="fade-in delay-5 absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/60">Défiler</span>
        <div className="w-[1px] h-10 bg-white/25 relative overflow-hidden">
          <span className="scroll-indicator block w-full h-1/2 bg-champagne-soft absolute top-0" />
        </div>
      </div>
    </section>
  );
}
