"use client";

import { motion } from "framer-motion";
import { MapPin, Star, Shield, Clock, ShieldCheck, UserCheck, Eye, Route, ScanSearch } from "lucide-react";

export function Services() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-500" />,
      title: "Coordination Sécurité",
      description: "Sur demande, nous coordonnons vos déplacements avec des agents de protection agréés (CNAPS), partenaires de confiance, pour un dispositif sécurisé sur-mesure."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-gold-500" />,
      title: "Chauffeurs de Sécurité Formés",
      description: "Nos chauffeurs sont formés à la conduite de sécurité et d'évitement et à la gestion des situations sensibles, pour des déplacements maîtrisés en toute circonstance."
    },
    {
      icon: <ScanSearch className="w-6 h-6 text-gold-500" />,
      title: "Confidentialité de l'Habitacle",
      description: "Chaque véhicule est systématiquement inspecté à l'aide d'outils professionnels (détection de micros, caméras et traceurs GPS) afin de garantir un environnement totalement confidentiel avant chaque mission."
    },
    {
      icon: <Eye className="w-6 h-6 text-gold-500" />,
      title: "Discrétion Absolue",
      description: "Confidentialité totale sur vos déplacements et vos identités. Accords de non-divulgation (NDA) signés sur demande."
    },
    {
      icon: <Star className="w-6 h-6 text-gold-500" />,
      title: "Service VIC Spécialisé",
      description: "Un accueil et un accompagnement sur-mesure pour vos invités Very Important Clients. Professionnalisme et élégance garantis."
    },
    {
      icon: <MapPin className="w-6 h-6 text-gold-500" />,
      title: "Cannes, Monaco, Paris",
      description: "Présents sur les pôles les plus prestigieux. Idéal pour le Festival de Cannes, le Grand Prix de Monaco ou la Fashion Week de Paris."
    },
    {
      icon: <Clock className="w-6 h-6 text-gold-500" />,
      title: "Mise à Disposition",
      description: "Un service flexible à l'heure, à la demi-journée ou à la journée complète selon les exigences de votre emploi du temps."
    }
  ];

  const securityPoints = [
    "Détection de micros espions, caméras cachées et traceurs GPS",
    "Véhicules débogués avec des outils professionnels avant chaque mission",
    "Chauffeurs formés à la conduite de sécurité et d'évitement",
    "Itinéraires sécurisés et repérages préalables",
    "Coordination avec des agents de protection agréés (CNAPS)",
    "Confidentialité totale, NDA et anonymat des déplacements",
  ];

  return (
    <section id="services" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-gold-500"></div>
            <span className="text-gold-500 tracking-[0.2em] uppercase text-xs font-medium">Sécurité &amp; Prestige</span>
            <div className="h-[1px] w-12 bg-gold-500"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Sécurité &amp; <span className="text-gold-500 italic">Prestige</span></h2>
          <p className="text-gray-400 font-light text-lg">
            SecuVIC allie le raffinement du transport de luxe à une exigence de sécurité sans compromis.
            Notre flotte de Mercedes Classe V noir est pilotée par des chauffeurs formés à la conduite de sécurité,
            en coordination avec des agents de protection agréés.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 border border-white/5 bg-black/50 hover:border-gold-500/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif mb-3">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bloc Sécurité dédié */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-sm border border-gold-500/20 bg-gradient-to-br from-black via-zinc-950 to-black p-10 md:p-14"
        >
          <div className="absolute -top-10 -right-10 opacity-5">
            <Shield className="w-64 h-64 text-gold-500" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <Route className="w-5 h-5 text-gold-500" />
                <span className="text-gold-500 tracking-[0.2em] uppercase text-xs font-medium">Notre engagement sécurité</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-serif mb-4 leading-tight">
                Vos invités VIC entre les mains <span className="text-gold-500 italic">d&apos;experts</span>
              </h3>
              <p className="text-gray-400 font-light leading-relaxed mb-6">
                Au-delà du confort, SecuVIC place la sécurité au centre de chaque mission.
                De la planification de l&apos;itinéraire à la prise en charge, chaque détail est anticipé
                pour garantir la tranquillité et la protection de vos passagers.
              </p>
              <a
                href="#booking"
                className="inline-block border-b border-gold-500 text-gold-500 pb-1 uppercase tracking-wider text-sm font-medium hover:text-white hover:border-white transition-colors"
              >
                Demander un dispositif sur-mesure
              </a>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {securityPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300 text-sm leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
