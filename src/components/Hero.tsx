"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { ContactLinks } from "@/components/ContactLinks";
import { COMPANY_NAME } from "@/lib/company";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-v-class.png"
          alt="Mercedes Classe V noir — SecuVIC"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="h-[1px] w-12 bg-gold-500"></div>
          <span className="text-gold-500 tracking-[0.2em] uppercase text-xs md:text-sm font-medium">Un service {COMPANY_NAME}</span>
          <div className="h-[1px] w-12 bg-gold-500"></div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight"
        >
          L&apos;Excellence du <br />
          <span className="italic text-gray-300">Transport Privé</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-gray-300 text-lg md:text-xl font-light mb-10"
        >
          Mise à disposition spécialisée pour vos événements et invités VIC à Cannes, Monaco et Paris.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
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
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs uppercase tracking-widest text-gray-400">Défiler</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-1/2 bg-gold-500 absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
