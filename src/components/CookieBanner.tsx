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
      className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950 border-t border-white/10 p-4 md:p-6"
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-gray-400 leading-relaxed">
          Ce site utilise des cookies techniques nécessaires à son fonctionnement.
          En continuant, vous acceptez notre{" "}
          <Link href="/politique-confidentialite" className="text-gold-500 hover:underline">
            politique de confidentialité
          </Link>.
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-6 py-2.5 bg-gold-500 text-black text-sm uppercase tracking-wider font-medium hover:bg-gold-400 transition-colors"
        >
          J&apos;accepte
        </button>
      </div>
    </div>
  );
}
