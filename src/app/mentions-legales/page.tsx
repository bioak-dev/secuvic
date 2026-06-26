import type { Metadata } from "next";
import Link from "next/link";
import {
  COMPANY_ADDRESS,
  COMPANY_APE,
  COMPANY_ACTIVE_SINCE,
  COMPANY_EVTC,
  COMPANY_LEGAL_FORM,
  COMPANY_LEGAL_NAME,
  COMPANY_NAME,
  COMPANY_SIREN,
  COMPANY_SIRET,
} from "@/lib/company";
import { Brand } from "@/components/Brand";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site VICD — service chauffeur privé de DRIVE&YOU. SIRET, EVTC, adresse et informations juridiques.",
  alternates: { canonical: `${siteUrl}/mentions-legales` },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-ivory text-ink pt-32 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="link-underline text-champagne text-sm mb-8 inline-block">
          ← Retour au site
        </Link>
        <h1 className="font-serif text-4xl mb-10">Mentions légales</h1>

        <div className="space-y-8 text-ink-soft leading-relaxed text-sm font-light">
          <section>
            <h2 className="text-champagne uppercase tracking-[0.2em] text-[0.7rem] mb-3">Éditeur du site</h2>
            <p>
              {COMPANY_LEGAL_NAME} — {COMPANY_LEGAL_FORM}<br />
              Entreprise active depuis le {COMPANY_ACTIVE_SINCE}<br />
              {COMPANY_ADDRESS}<br />
              SIREN : {COMPANY_SIREN}<br />
              SIRET (siège) : {COMPANY_SIRET}<br />
              N° EVTC : {COMPANY_EVTC}<br />
              APE : {COMPANY_APE}
            </p>
            <p className="mt-3">
              <Brand /> est un service de {COMPANY_NAME} ({COMPANY_LEGAL_NAME}).<br />
              Site : secuvic.com<br />
              Email : contact@secuvic.com<br />
              Téléphone : 07 65 78 30 65
            </p>
          </section>

          <section>
            <h2 className="text-champagne uppercase tracking-[0.2em] text-[0.7rem] mb-3">Activité</h2>
            <p>
              Transport de personnes à titre onéreux (VTC). <Brand />, service de {COMPANY_NAME},
              propose des prestations de mise à disposition et de transfert en Mercedes Classe V, avec
              une application de suivi en temps réel mise à disposition des clients depuis leur espace personnel.
            </p>
          </section>

          <section>
            <h2 className="text-champagne uppercase tracking-[0.2em] text-[0.7rem] mb-3">Hébergement</h2>
            <p>
              Vercel Inc. — 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            </p>
          </section>

          <section>
            <h2 className="text-champagne uppercase tracking-[0.2em] text-[0.7rem] mb-3">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, visuels, logo) est protégé par le droit
              d&apos;auteur. Toute reproduction est interdite sans autorisation écrite.
            </p>
          </section>

          <section>
            <h2 className="text-champagne uppercase tracking-[0.2em] text-[0.7rem] mb-3">Marques tierces</h2>
            <p>
              Les noms d&apos;événements mentionnés (Festival de Cannes, Grand Prix de Monaco, etc.)
              appartiennent à leurs propriétaires respectifs. <Brand /> et {COMPANY_NAME} ne sont pas affiliés à ces
              événements sauf mention contraire.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
