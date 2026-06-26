"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      if (!localStorage.getItem("secuvic_cookie_consent")) {
        setVisible(true);
      }
    });
  }, []);

  const accept = () => {
    localStorage.setItem("secuvic_cookie_consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-ink text-ivory p-4 md:p-6"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-white/60 leading-relaxed font-light">
          Ce site utilise des cookies techniques nécessaires à son fonctionnement.
          En continuant, vous acceptez notre{" "}
          <Link href="/politique-confidentialite" className="link-underline text-champagne-soft">
            politique de confidentialité
          </Link>.
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-7 py-3 bg-ivory text-ink text-[0.7rem] uppercase tracking-[0.2em] font-medium hover:bg-champagne hover:text-white transition-colors"
        >
          J&apos;accepte
        </button>
      </div>
    </div>
  );
}
