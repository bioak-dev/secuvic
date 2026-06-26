import Link from "next/link";
import { SERVICE_NAME } from "@/lib/company";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ivory text-ink flex items-center justify-center px-6">
      <div className="text-center">
        <span className="wordmark text-sm text-champagne">{SERVICE_NAME}</span>
        <h1 className="font-serif text-7xl mt-6 mb-4">404</h1>
        <p className="text-ink-soft font-light mb-10">Cette page est introuvable.</p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-ink text-ivory uppercase tracking-[0.2em] text-[0.72rem] font-medium hover:bg-champagne transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
