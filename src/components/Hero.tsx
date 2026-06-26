import Image from "next/image";
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25" />
      </div>

      {/* Bloc éditorial façon LVMH : bandeau givré centré en bas */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-10 pb-14 md:pb-16">
        <div className="bg-white/70 backdrop-blur-md text-center px-8 py-10 md:px-16 md:py-12">
          <span className="text-[0.62rem] md:text-[0.68rem] tracking-[0.32em] uppercase text-champagne">
            Chauffeur Privé · Service Premium
          </span>

          <h1 className="font-serif mt-5 text-[1.6rem] md:text-3xl lg:text-[2.6rem] uppercase tracking-[0.04em] leading-[1.2] text-ink">
            L&apos;art du voyage{" "}
            <span className="italic lowercase">sur mesure</span>
          </h1>

          <a
            href="#booking"
            className="link-underline inline-block mt-7 text-[0.72rem] tracking-[0.28em] uppercase font-medium text-ink"
          >
            Réserver un chauffeur
          </a>
        </div>
      </div>

      <div className="fade-in delay-5 absolute bottom-7 right-8 z-10 hidden md:flex flex-col items-center gap-2">
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/60">Défiler</span>
        <div className="w-[1px] h-10 bg-white/25 relative overflow-hidden">
          <span className="scroll-indicator block w-full h-1/2 bg-champagne-soft absolute top-0" />
        </div>
      </div>
    </section>
  );
}
