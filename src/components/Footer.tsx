import Link from "next/link";
import {
  COMPANY_EVTC,
  COMPANY_LEGAL_NAME,
  COMPANY_NAME,
  COMPANY_SIRET,
  SERVICE_FULL_NAME,
  SERVICE_NAME,
} from "@/lib/company";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_LINK, CONTACT_WHATSAPP_LINK } from "@/lib/contact";

const exploreLinks = [
  { name: "La Maison", href: "#services" },
  { name: "Le Véhicule", href: "#fleet" },
  { name: "Destinations", href: "#destinations" },
  { name: "FAQ", href: "#faq" },
  { name: "Réserver", href: "#booking" },
];

const legalLinks = [
  { name: "Espace Client", href: "/client" },
  { name: "Mentions légales", href: "/mentions-legales" },
  { name: "Confidentialité", href: "/politique-confidentialite" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="wordmark text-3xl font-medium">{SERVICE_NAME}</span>
            <p className="mt-3 text-[0.6rem] tracking-[0.3em] uppercase text-white/40">
              {SERVICE_FULL_NAME}
            </p>
            <p className="mt-6 max-w-sm text-white/55 font-light text-sm leading-relaxed">
              Maison de chauffeurs privés au service des invités VIP &amp; VIC à Cannes, Monaco et Paris.
              Un service {COMPANY_NAME}.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/40 mb-5">Explorer</p>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="link-underline text-sm text-white/75 font-light">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/40 mb-5">Informations</p>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="link-underline text-sm text-white/75 font-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-white/40 mb-5">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href={CONTACT_PHONE_LINK} className="link-underline text-sm text-white/75 font-light">
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm text-white/75 font-light"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-[0.7rem] text-white/35 font-light">
          <p>
            &copy; {new Date().getFullYear()} {COMPANY_LEGAL_NAME} — Tous droits réservés.
          </p>
          <p>
            {COMPANY_LEGAL_NAME} · SIRET {COMPANY_SIRET} · {COMPANY_EVTC}
          </p>
        </div>
      </div>
    </footer>
  );
}
