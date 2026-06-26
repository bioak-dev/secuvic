import Link from "next/link";
import { faqItems } from "@/lib/faq";
import { Brand, withBrand } from "@/components/Brand";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_LINK } from "@/lib/contact";

export function Faq() {
  return (
    <section id="faq" className="bg-white py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">Questions fréquentes</span>
            <h2 className="font-serif text-3xl md:text-4xl mt-6 leading-tight">
              Tout savoir sur <Brand />
            </h2>
            <p className="mt-6 text-ink-soft font-light leading-relaxed">
              Zones d&apos;intervention, réservation, confidentialité et services premium.
            </p>
            <p className="mt-8 text-sm text-ink-soft font-light">
              Une autre question ?{" "}
              <a href={CONTACT_PHONE_LINK} className="link-underline text-ink">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-line">
              {faqItems.map((item) => (
                <details key={item.question} className="group border-b border-line">
                  <summary className="cursor-pointer list-none py-6 flex items-start justify-between gap-6 marker:content-none [&::-webkit-details-marker]:hidden">
                    <span className="text-lg md:text-xl pr-4">{withBrand(item.question)}</span>
                    <span className="text-champagne text-xl font-light shrink-0 mt-1 group-open:rotate-45 transition-transform duration-300">
                      +
                    </span>
                  </summary>
                  <p className="pb-7 -mt-1 text-ink-soft text-sm font-light leading-relaxed max-w-2xl">
                    {withBrand(item.answer)}
                  </p>
                </details>
              ))}
            </div>
            <p className="mt-8 text-sm text-ink-soft font-light">
              Besoin d&apos;un devis ?{" "}
              <Link href="#booking" className="link-underline text-ink">
                Contactez-nous
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
