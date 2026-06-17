import Image from "next/image";
import Link from "next/link";
import { ContactLinks } from "@/components/ContactLinks";
import {
  COMPANY_EVTC,
  COMPANY_LEGAL_NAME,
  COMPANY_NAME,
  COMPANY_SIRET,
  SERVICE_NAME,
} from "@/lib/company";

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

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <Link href="/client" className="hover:text-gold-500 transition-colors">Espace Client</Link>
            <Link href="/mentions-legales" className="hover:text-gold-500 transition-colors">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-gold-500 transition-colors">Confidentialité</Link>
          </div>
        </div>

        <p className="text-xs text-gray-600 text-center">
          {SERVICE_NAME} — service premium de {COMPANY_NAME} · Transport privé (VTC) — Cannes, Monaco, Paris
        </p>

        <p className="text-[0.65rem] text-gray-700 text-center">
          {COMPANY_LEGAL_NAME} — SIRET {COMPANY_SIRET} — {COMPANY_EVTC}
        </p>

        <div className="text-sm text-gray-500 text-center">
          &copy; {new Date().getFullYear()} {COMPANY_LEGAL_NAME}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
