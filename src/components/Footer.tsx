import Image from "next/image";
import { ContactLinks } from "@/components/ContactLinks";

export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo-secuvic.png"
              alt="SecuVIC"
              width={44}
              height={44}
              className="w-11 h-11 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl tracking-widest uppercase font-semibold text-white">Secu<span className="text-gold-500">VIC</span></span>
              <span className="text-[0.6rem] tracking-[0.25em] uppercase text-gold-500/80 mt-1">Sécurité &amp; Prestige</span>
            </div>
          </div>

          <ContactLinks variant="compact" />

          <div className="flex gap-8 text-sm text-gray-400">
            <a href="/client" className="hover:text-gold-500 transition-colors">Espace Client</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Politique de Confidentialité</a>
          </div>
        </div>

        <div className="text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} SecuVIC. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
