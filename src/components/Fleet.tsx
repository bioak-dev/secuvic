"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Briefcase, Wifi, Coffee } from "lucide-react";

export function Fleet() {
  return (
    <section id="fleet" className="py-24 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-900/20 skew-x-12 translate-x-32 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-gold-500"></div>
              <span className="text-gold-500 tracking-[0.2em] uppercase text-xs font-medium">La Flotte</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
              Mercedes <br /><span className="italic text-gray-300">Classe V Noir</span>
            </h2>
            <p className="text-gray-400 font-light text-lg mb-8">
              L&apos;excellence de l&apos;espace et du raffinement. Le Mercedes Classe V est le choix par excellence pour le transport de petits groupes VIC, offrant un confort inégalé digne d&apos;un salon VIP mobile.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gold-500" />
                <span className="text-gray-300 text-sm">Jusqu&apos;à 7 passagers</span>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gold-500" />
                <span className="text-gray-300 text-sm">Large espace bagages</span>
              </div>
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-gold-500" />
                <span className="text-gray-300 text-sm">Wi-Fi haut débit</span>
              </div>
              <div className="flex items-center gap-3">
                <Coffee className="w-5 h-5 text-gold-500" />
                <span className="text-gray-300 text-sm">Rafraîchissements</span>
              </div>
            </div>
            
            <a href="#booking" className="inline-block border-b border-gold-500 text-gold-500 pb-1 uppercase tracking-wider text-sm font-medium hover:text-white hover:border-white transition-colors">
              Demander ce véhicule
            </a>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[4/3] rounded-sm overflow-hidden relative border border-white/10">
              <Image
                src="/images/exterior-v-class.png"
                alt="Mercedes Classe V Noir — vue extérieure"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
