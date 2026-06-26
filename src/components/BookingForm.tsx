"use client";

import { useState } from "react";
import Link from "next/link";
import { ContactLinks } from "@/components/ContactLinks";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  dateStart: string;
  dateEnd: string;
  timeStart: string;
  timeEnd: string;
  pickup: string;
  dropoff: string;
  passengers: string;
  details: string;
  consent: boolean;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "mise-a-disposition",
  dateStart: "",
  dateEnd: "",
  timeStart: "",
  timeEnd: "",
  pickup: "",
  dropoff: "",
  passengers: "",
  details: "",
  consent: false,
};

const fieldClass =
  "w-full bg-transparent border-b border-line px-0 py-3 text-ink placeholder:text-mute/60 focus:outline-none focus:border-ink transition-colors";

const labelClass = "text-[0.65rem] uppercase tracking-[0.2em] text-mute";

export function BookingForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      setError("Veuillez accepter la politique de confidentialité.");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, consent: true }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l'envoi.");
      }

      setIsSuccess(true);
      setForm(initialForm);
      setTimeout(() => setIsSuccess(false), 8000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="bg-ivory py-24 md:py-32 border-t border-line">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="eyebrow">Réservation</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-6 leading-tight">
              Réserver votre <span className="italic">Chauffeur</span>
            </h2>
            <p className="mt-6 text-ink-soft font-light leading-relaxed">
              Renseignez votre demande de mise à disposition ou de transfert. Notre équipe vous
              répond dans les plus brefs délais.
            </p>
            <div className="mt-10">
              <p className="text-[0.65rem] uppercase tracking-[0.2em] text-mute mb-4">
                Besoin immédiat ?
              </p>
              <ContactLinks />
            </div>
          </div>

          <div className="lg:col-span-8">
            {isSuccess ? (
              <div className="border border-line bg-white p-12 text-center">
                <div className="w-14 h-14 border border-champagne text-champagne rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl mb-3">Demande envoyée</h3>
                <p className="text-ink-soft font-light">
                  Nous avons bien reçu votre demande. Un conseiller VIC vous contactera sous peu.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="booking-name" className={labelClass}>Prénom &amp; Nom</label>
                    <input id="booking-name" required type="text" maxLength={100} value={form.name}
                      onChange={(e) => update("name", e.target.value)} className={fieldClass} placeholder="Jean Dupont" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="booking-email" className={labelClass}>Email</label>
                    <input id="booking-email" required type="email" maxLength={254} value={form.email}
                      onChange={(e) => update("email", e.target.value)} className={fieldClass} placeholder="jean@exemple.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="booking-phone" className={labelClass}>Téléphone</label>
                    <input id="booking-phone" required type="tel" maxLength={20} value={form.phone}
                      onChange={(e) => update("phone", e.target.value)} className={fieldClass} placeholder="+33 6 00 00 00 00" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="booking-service" className={labelClass}>Type de service</label>
                    <select id="booking-service" required value={form.service}
                      onChange={(e) => update("service", e.target.value)}
                      className={`${fieldClass} appearance-none cursor-pointer`}>
                      <option value="mise-a-disposition">Mise à disposition (Heure/Jour)</option>
                      <option value="transfert">Transfert Aéroport/Hôtel</option>
                      <option value="evenement">Événement spécial (Festival, etc.)</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="booking-date-start" className={labelClass}>Date de début</label>
                    <input id="booking-date-start" required type="date" value={form.dateStart}
                      onChange={(e) => update("dateStart", e.target.value)} className={fieldClass} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="booking-date-end" className={labelClass}>Date de fin <span className="text-mute/60 normal-case tracking-normal">(optionnel)</span></label>
                    <input id="booking-date-end" type="date" value={form.dateEnd} min={form.dateStart || undefined}
                      onChange={(e) => update("dateEnd", e.target.value)} className={fieldClass} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="booking-time-start" className={labelClass}>Heure de prise en charge</label>
                    <input id="booking-time-start" required type="time" value={form.timeStart}
                      onChange={(e) => update("timeStart", e.target.value)} className={fieldClass} />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="booking-time-end" className={labelClass}>Heure de fin <span className="text-mute/60 normal-case tracking-normal">(optionnel)</span></label>
                    <input id="booking-time-end" type="time" value={form.timeEnd}
                      onChange={(e) => update("timeEnd", e.target.value)} className={fieldClass} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="booking-pickup" className={labelClass}>Lieu de prise en charge</label>
                    <input id="booking-pickup" required type="text" maxLength={200} value={form.pickup}
                      onChange={(e) => update("pickup", e.target.value)} className={fieldClass} placeholder="Adresse, hôtel, aéroport…" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="booking-dropoff" className={labelClass}>Destination <span className="text-mute/60 normal-case tracking-normal">(optionnel)</span></label>
                    <input id="booking-dropoff" type="text" maxLength={200} value={form.dropoff}
                      onChange={(e) => update("dropoff", e.target.value)} className={fieldClass} placeholder="Adresse d'arrivée" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="booking-passengers" className={labelClass}>Nombre de passagers <span className="text-mute/60 normal-case tracking-normal">(optionnel)</span></label>
                    <input id="booking-passengers" type="number" min={1} max={50} value={form.passengers}
                      onChange={(e) => update("passengers", e.target.value)} className={fieldClass} placeholder="2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="booking-details" className={labelClass}>Détails de la demande <span className="text-mute/60 normal-case tracking-normal">(optionnel)</span></label>
                  <textarea id="booking-details" rows={4} maxLength={2000} value={form.details}
                    onChange={(e) => update("details", e.target.value)}
                    className={`${fieldClass} resize-none`} placeholder="Bagages, besoins particuliers, vol n°…" />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    className="mt-1 accent-ink" required />
                  <span className="text-xs text-ink-soft leading-relaxed font-light">
                    J&apos;accepte que mes données soient traitées conformément à la{" "}
                    <Link href="/politique-confidentialite" className="link-underline text-ink">
                      politique de confidentialité
                    </Link>.
                  </span>
                </label>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button type="submit" disabled={isSubmitting}
                  className="w-full bg-ink text-ivory uppercase tracking-[0.22em] text-[0.72rem] font-medium py-5 hover:bg-champagne transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin" />
                  ) : "Envoyer la demande"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
