"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ContactLinks } from "@/components/ContactLinks";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  location: string;
  details: string;
  consent: boolean;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  service: "mise-a-disposition",
  date: "",
  location: "",
  details: "",
  consent: false,
};

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
    <section id="booking" className="py-24 bg-zinc-950 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Réserver votre <span className="text-gold-500 italic">Chauffeur</span></h2>
          <p className="text-gray-400 font-light mb-6">
            Veuillez remplir ce formulaire pour toute demande de mise à disposition ou de transfert. Notre équipe vous contactera dans les plus brefs délais.
          </p>
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-500/80">Besoin immédiat ?</p>
            <ContactLinks />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-black border border-white/10 p-8 md:p-10 rounded-sm"
        >
          {isSuccess ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gold-500/20 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-2">Demande Envoyée</h3>
              <p className="text-gray-400">Nous avons bien reçu votre demande de réservation. Un conseiller VIC vous contactera sous peu.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="booking-name" className="text-xs uppercase tracking-wider text-gray-400">Prénom & Nom</label>
                  <input
                    id="booking-name"
                    required
                    type="text"
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="booking-email" className="text-xs uppercase tracking-wider text-gray-400">Email</label>
                  <input
                    id="booking-email"
                    required
                    type="email"
                    maxLength={254}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="jean@exemple.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="booking-phone" className="text-xs uppercase tracking-wider text-gray-400">Téléphone</label>
                  <input
                    id="booking-phone"
                    required
                    type="tel"
                    maxLength={20}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="+33 6 00 00 00 00"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="booking-service" className="text-xs uppercase tracking-wider text-gray-400">Type de Service</label>
                  <select
                    id="booking-service"
                    required
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors appearance-none"
                  >
                    <option value="mise-a-disposition">Mise à disposition (Heure/Jour)</option>
                    <option value="transfert">Transfert Aéroport/Hôtel</option>
                    <option value="evenement">Événement spécial (Festival, etc.)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="booking-date" className="text-xs uppercase tracking-wider text-gray-400">Date souhaitée</label>
                  <input
                    id="booking-date"
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="booking-location" className="text-xs uppercase tracking-wider text-gray-400">Lieu (Cannes, Monaco, Paris...)</label>
                  <input
                    id="booking-location"
                    required
                    type="text"
                    maxLength={200}
                    value={form.location}
                    onChange={(e) => update("location", e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="Ville ou adresse"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="booking-details" className="text-xs uppercase tracking-wider text-gray-400">Détails de la demande</label>
                <textarea
                  id="booking-details"
                  required
                  rows={4}
                  maxLength={2000}
                  value={form.details}
                  onChange={(e) => update("details", e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors resize-none"
                  placeholder="Passagers, bagages, besoins VIC..."
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  className="mt-1 accent-gold-500"
                  required
                />
                <span className="text-xs text-gray-400 leading-relaxed">
                  J&apos;accepte que mes données soient traitées conformément à la{" "}
                  <Link href="/politique-confidentialite" className="text-gold-500 hover:underline">
                    politique de confidentialité
                  </Link>.
                </span>
              </label>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold-500 text-black uppercase tracking-widest font-medium py-4 hover:bg-gold-400 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></span>
                ) : "Envoyer la demande"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
