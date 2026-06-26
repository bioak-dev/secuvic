"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useCallback } from "react";
import { MapPin, User, Car, Clock, LogOut, RefreshCw } from "lucide-react";
import type { Trip, VehicleLocation } from "@/types/tracking";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { getDemoTrip } from "@/lib/demo-tracking";
import { useRouter } from "next/navigation";

const TrackingMap = dynamic(
  () => import("@/components/client/TrackingMap").then((m) => m.TrackingMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] flex items-center justify-center bg-zinc-900 text-gray-500 text-sm rounded-sm border border-white/10">
        Chargement de la carte…
      </div>
    ),
  }
);

interface TripWithLocation extends Trip {
  location: VehicleLocation | null;
}

interface ClientDashboardProps {
  isDemo: boolean;
}

export function ClientDashboard({ isDemo }: ClientDashboardProps) {
  const router = useRouter();
  const [trips, setTrips] = useState<TripWithLocation[]>([]);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const loadProductionTrips = useCallback(async () => {
    const res = await fetch("/api/trips");
    if (!res.ok) return;
    const data = await res.json();
    setTrips(data.trips || []);
    setSelectedTripId((prev) => prev ?? data.trips?.[0]?.id ?? null);
    setLastUpdate(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!isDemo) return;

    const tick = () => {
      const trip = getDemoTrip();
      setTrips([trip]);
      setSelectedTripId((prev) => prev ?? trip.id);
      setLastUpdate(new Date());
      setLoading(false);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isDemo]);

  useEffect(() => {
    if (isDemo) return;

    const timeout = setTimeout(() => loadProductionTrips(), 0);
    const interval = setInterval(loadProductionTrips, 5000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isDemo, loadProductionTrips]);

  useEffect(() => {
    if (isDemo || !isSupabaseConfigured() || !selectedTripId) return;

    const supabase = createClient();
    const channel = supabase
      .channel(`location-${selectedTripId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "vehicle_locations",
          filter: `trip_id=eq.${selectedTripId}`,
        },
        (payload) => {
          const loc = payload.new as VehicleLocation;
          setTrips((prev) =>
            prev.map((t) =>
              t.id === selectedTripId ? { ...t, location: loc } : t
            )
          );
          setLastUpdate(new Date());
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isDemo, selectedTripId]);

  const handleLogout = async () => {
    if (!isDemo) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    document.cookie = "secuvic_demo=; path=/; max-age=0";
    router.push("/client/login");
  };

  const selectedTrip = trips.find((t) => t.id === selectedTripId);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <header className="border-b border-white/10 bg-zinc-950 px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="font-serif text-xl tracking-widest uppercase">
            <span className="tracking-[0.3em]">VICD</span>
            <span className="text-gray-500 text-sm normal-case tracking-normal ml-3">Espace Client</span>
          </h1>
          {isDemo && (
            <p className="text-xs text-gold-500/70 mt-1">Mode démo — Autoroute A8 · Cannes → Monaco</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {lastUpdate && (
            <span className="text-xs text-gray-500 hidden sm:block">
              MAJ {lastUpdate.toLocaleTimeString("fr-FR")}
            </span>
          )}
          {!isDemo && (
            <button
              onClick={loadProductionTrips}
              className="p-2 text-gray-400 hover:text-gold-500 transition-colors"
              aria-label="Actualiser les positions"
            >
              <RefreshCw size={18} />
            </button>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <aside className="lg:w-96 border-b lg:border-b-0 lg:border-r border-white/10 bg-zinc-950 p-6 overflow-y-auto shrink-0">
          <h2 className="text-xs uppercase tracking-[0.2em] text-gold-500 mb-4">VIC en cours</h2>

          {loading ? (
            <p className="text-gray-500 text-sm">Chargement…</p>
          ) : trips.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucun transfert actif.</p>
          ) : (
            <div className="space-y-3">
              {trips.map((trip) => (
                <button
                  key={trip.id}
                  onClick={() => setSelectedTripId(trip.id)}
                  className={`w-full text-left p-4 border rounded-sm transition-colors ${
                    selectedTripId === trip.id
                      ? "border-gold-500/50 bg-gold-500/5"
                      : "border-white/10 bg-black/50 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <User size={14} className="text-gold-500" />
                    <span className="font-medium text-white">{trip.vic_name}</span>
                    <span className={`ml-auto text-[0.6rem] uppercase tracking-wider px-2 py-0.5 rounded ${
                      trip.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {trip.status === "active" ? "En route" : "En attente"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-400 mb-1">
                    <MapPin size={12} className="mt-0.5 shrink-0" />
                    <span>{trip.pickup_address}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-400 mb-2">
                    <MapPin size={12} className="mt-0.5 shrink-0 text-gold-500" />
                    <span>{trip.dropoff_address}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Car size={12} /> {trip.vehicle}
                    </span>
                    {trip.driver_name && <span>{trip.driver_name}</span>}
                  </div>
                  {trip.location?.speed != null && (
                    <div className="flex items-center gap-1 text-xs text-gold-500/80 mt-2">
                      <Clock size={12} />
                      {Math.round(trip.location.speed)} km/h
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </aside>

        <main className="flex-1 p-4 lg:p-6 flex flex-col min-h-[500px] lg:min-h-0">
          {selectedTrip ? (
            <>
              <div className="flex items-center justify-between mb-4 shrink-0">
                <h2 className="font-serif text-lg">
                  Suivi en direct — <span className="text-gold-500">{selectedTrip.vic_name}</span>
                </h2>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live
                </span>
              </div>
              <div className="flex-1 min-h-[450px] lg:min-h-[500px]">
                <TrackingMap
                  key={selectedTrip.id}
                  trip={selectedTrip}
                  location={selectedTrip.location}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Sélectionnez un VIC pour afficher sa position
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
