import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-serif text-6xl text-gold-500 mb-4">404</h1>
        <p className="text-gray-400 mb-8">Page introuvable</p>
        <Link
          href="/"
          className="px-6 py-3 bg-gold-500 text-black uppercase tracking-wider text-sm font-medium hover:bg-gold-400 transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
