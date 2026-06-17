"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Accueil", href: "#" },
    { name: "La Flotte", href: "#fleet" },
    { name: "Destinations", href: "#destinations" },
    { name: "Service VIC", href: "#services" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <Image
            src="/images/logo-secuvic.png"
            alt="SecuVIC"
            width={44}
            height={44}
            className="w-11 h-11 object-contain"
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-xl tracking-widest uppercase font-semibold text-white">Secu<span className="text-gold-500">VIC</span></span>
            <span className="text-[0.6rem] tracking-[0.25em] uppercase text-gold-500/80 mt-1">Sécurité &amp; Prestige</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm tracking-wide text-gray-300 hover:text-gold-500 transition-colors uppercase"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#booking"
            className="px-5 py-2.5 bg-gold-500 text-black text-sm uppercase tracking-wide font-medium hover:bg-gold-400 transition-colors rounded-sm"
          >
            Réserver
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg tracking-wide text-gray-300 hover:text-gold-500 transition-colors uppercase"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-5 py-3 bg-gold-500 text-black text-sm uppercase tracking-wide font-medium hover:bg-gold-400 transition-colors rounded-sm mt-4"
              >
                Réserver un chauffeur
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
