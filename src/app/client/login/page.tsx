"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Brand } from "@/components/Brand";
import { Navigation, Eye } from "lucide-react";

const DEMO_ENABLED = process.env.NEXT_PUBLIC_ALLOW_DEMO_MODE === "true";
const SUPABASE_CONFIGURED = isSupabaseConfigured();

export default function ClientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!SUPABASE_CONFIGURED) {
      setError("Connexion indisponible. Utilisez la démo ci-dessous ou contactez VICD.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Identifiants incorrects.");
      setLoading(false);
      return;
    }

    router.push("/client/dashboard");
  };

  const handleDemo = () => {
    if (!DEMO_ENABLED) {
      setError("Le mode démo n'est pas disponible.");
      return;
    }
    document.cookie = `secuvic_demo=true; path=/; max-age=3600; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
    router.push("/client/dashboard");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Image
            src="/images/logo-vicd.png"
            alt="VICD"
            width={64}
            height={64}
            className="w-16 h-16 mx-auto mb-4 bg-white rounded-sm p-1"
          />
          <h1 className="font-serif text-3xl tracking-[0.3em] uppercase mb-2">VICD</h1>
          <p className="text-gray-400 text-sm">Espace Client — Suivi VIC en temps réel</p>
        </div>

        <div className="bg-zinc-950 border border-white/10 p-8 rounded-sm">
          <div className="flex items-center gap-3 mb-6">
            <Navigation className="w-5 h-5 text-gold-500" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold-500">Application de suivi</span>
          </div>

          {!SUPABASE_CONFIGURED && DEMO_ENABLED && (
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              La connexion client sera activée pour les comptes enregistrés. En attendant, découvrez le suivi GPS en direct via la démo.
            </p>
          )}

          {!SUPABASE_CONFIGURED && !DEMO_ENABLED && (
            <p className="text-amber-400/90 text-sm mb-6 leading-relaxed">
              Espace client en cours d&apos;activation. Contactez <Brand /> pour accéder au suivi de vos invités VIC.
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="client-email" className="text-xs uppercase tracking-wider text-gray-400">Email</label>
              <input
                id="client-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                placeholder="client@entreprise.com"
              />
            </div>
            <div>
              <label htmlFor="client-password" className="text-xs uppercase tracking-wider text-gray-400">Mot de passe</label>
              <input
                id="client-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 bg-black border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading || !SUPABASE_CONFIGURED}
              className="w-full bg-gold-500 text-black uppercase tracking-widest font-medium py-3 hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Connexion…" : "Se connecter"}
            </button>
          </form>

          {DEMO_ENABLED && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider">
                  <span className="bg-zinc-950 px-3 text-gray-500">ou</span>
                </div>
              </div>

              <button
                onClick={handleDemo}
                className="w-full flex items-center justify-center gap-2 border border-white/20 text-gray-300 uppercase tracking-wider text-sm py-3 hover:border-gold-500/50 hover:text-gold-500 transition-colors"
              >
                <Eye size={16} />
                Voir la démo (A8 · Cannes → Monaco)
              </button>
            </>
          )}
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          <Link href="/" className="hover:text-gold-500 transition-colors">← Retour au site</Link>
        </p>
      </div>
    </div>
  );
}
