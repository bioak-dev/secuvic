"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SERVICE_NAME } from "@/lib/company";

const navLinks = [
  { name: "La Maison", href: "#services" },
  { name: "Le Véhicule", href: "#fleet" },
  { name: "Destinations", href: "#destinations" },
  { name: "FAQ", href: "#faq" },
  { name: "Espace Client", href: "/client" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = isScrolled || isMobileMenuOpen;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        solid
          ? "bg-ivory/95 backdrop-blur-md border-b border-line py-4 text-ink"
          : "bg-transparent py-7 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        <div className="flex items-center gap-9">
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="link-underline text-[0.72rem] tracking-[0.18em] uppercase font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#booking"
            className={`hidden lg:inline px-6 py-2.5 text-[0.7rem] tracking-[0.18em] uppercase font-medium transition-colors ${
              solid
                ? "bg-ink text-ivory hover:bg-champagne"
                : "bg-white text-ink hover:bg-champagne hover:text-white"
            }`}
          >
            Réserver
          </a>
          <a href="#" className="leading-none" aria-label={`${SERVICE_NAME} — accueil`}>
            <span className="wordmark text-3xl md:text-4xl lg:text-[2.6rem] font-medium">{SERVICE_NAME}</span>
          </a>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-ivory border-t border-line overflow-hidden text-ink"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-xl"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center px-5 py-4 bg-ink text-ivory text-xs uppercase tracking-[0.2em]"
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
