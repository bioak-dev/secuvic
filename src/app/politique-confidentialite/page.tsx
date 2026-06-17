import type { Metadata } from "next";
import Link from "next/link";
import {
  COMPANY_ADDRESS,
  COMPANY_EVTC,
  COMPANY_LEGAL_NAME,
  COMPANY_SIRET,
  SERVICE_NAME,
} from "@/lib/company";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles — SecuVIC, service DRIVE&YOU. RGPD, cookies et droits des utilisateurs.",
  alternates: { canonical: `${siteUrl}/politique-confidentialite` },
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gold-500 text-sm hover:underline mb-8 inline-block">
          ← Retour au site
        </Link>
        <h1 className="font-serif text-3xl mb-8">Politique de confidentialité</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed text-sm">
          <section>
            <h2 className="text-gold-500 uppercase tracking-wider text-xs mb-3">Responsable du traitement</h2>
            <p>
              {COMPANY_LEGAL_NAME} — {SERVICE_NAME}<br />
              {COMPANY_ADDRESS}<br />
              SIRET : {COMPANY_SIRET} — N° EVTC : {COMPANY_EVTC}<br />
              contact@secuvic.com
            </p>
          </section>

          <section>
            <h2 className="text-gold-500 uppercase tracking-wider text-xs mb-3">Données collectées</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Formulaire de réservation : nom, email, téléphone, date, lieu, détails de la demande</li>
              <li>Espace client : identifiants de connexion, données de trajets et géolocalisation des VIC</li>
              <li>Cookies techniques nécessaires au fonctionnement du site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-gold-500 uppercase tracking-wider text-xs mb-3">Finalités</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Traitement des demandes de réservation</li>
              <li>Suivi en temps réel des transferts pour les clients autorisés</li>
              <li>Communication relative à la prestation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-gold-500 uppercase tracking-wider text-xs mb-3">Base légale</h2>
            <p>
              Exécution du contrat (réservation), intérêt légitime (sécurité des transferts),
              consentement (formulaire de contact).
            </p>
          </section>

          <section>
            <h2 className="text-gold-500 uppercase tracking-wider text-xs mb-3">Durée de conservation</h2>
            <p>
              Données de réservation : 3 ans. Données de géolocalisation : durée du trajet + 30 jours.
              Comptes clients : durée de la relation contractuelle + 1 an.
            </p>
          </section>

          <section>
            <h2 className="text-gold-500 uppercase tracking-wider text-xs mb-3">Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
              de suppression, de limitation et d&apos;opposition. Contact : contact@secuvic.com.
              Réclamation possible auprès de la CNIL (cnil.fr).
            </p>
          </section>

          <section>
            <h2 className="text-gold-500 uppercase tracking-wider text-xs mb-3">Sous-traitants</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Vercel (hébergement)</li>
              <li>Resend (envoi d&apos;emails)</li>
              <li>Supabase (authentification et données espace client)</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
