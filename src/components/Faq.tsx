import Link from "next/link";
import { faqItems } from "@/lib/faq";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_LINK } from "@/lib/contact";

export function Faq() {
  return (
    <section id="faq" className="py-24 bg-zinc-950 border-t border-white/5">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-12 bg-gold-500"></div>
            <span className="text-gold-500 tracking-[0.2em] uppercase text-xs font-medium">Questions fréquentes</span>
            <div className="h-[1px] w-12 bg-gold-500"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            FAQ — Chauffeur Privé <span className="text-gold-500 italic">VIP &amp; VIC</span>
          </h2>
          <p className="text-gray-400 font-light">
            Tout savoir sur SecuVIC : zones d&apos;intervention, réservation, confidentialité et services premium.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group border border-white/10 bg-black/40 rounded-sm open:border-gold-500/30 transition-colors"
            >
              <summary className="cursor-pointer list-none px-6 py-5 flex items-center justify-between gap-4 text-white font-serif text-lg marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="text-gold-500 text-2xl font-light shrink-0 group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                {item.answer}
              </div>
            </details>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          Une autre question ?{" "}
          <Link href="#booking" className="text-gold-500 hover:underline">
            Contactez-nous
          </Link>{" "}
          ou appelez le{" "}
          <a href={CONTACT_PHONE_LINK} className="text-gold-500 hover:underline">
            {CONTACT_PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
