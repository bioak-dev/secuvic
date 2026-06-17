import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { getDemoTrip } from "@/lib/demo-tracking";
import { isDemoAllowed } from "@/lib/validation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tripId = searchParams.get("trip_id");
  const isDemo = searchParams.get("demo") === "true";

  if (isDemo || tripId === "demo-cannes-monaco") {
    if (!isDemoAllowed()) {
      return NextResponse.json({ error: "Mode démo désactivé" }, { status: 403 });
    }
    const trip = getDemoTrip();
    return NextResponse.json({ location: trip.location });
  }

  if (!tripId) {
    return NextResponse.json({ error: "trip_id requis" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Base de données non configurée" }, { status: 500 });
  }

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { data: trip } = await supabase
    .from("trips")
    .select("id")
    .eq("id", tripId)
    .eq("client_id", user.id)
    .single();

  if (!trip) {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  const { data, error } = await supabase
    .from("vehicle_locations")
    .select("*")
    .eq("trip_id", tripId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Position introuvable" }, { status: 404 });
  }

  return NextResponse.json({ location: data });
}

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key");
  if (!apiKey || !process.env.DRIVER_API_KEY || apiKey !== process.env.DRIVER_API_KEY) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { trip_id, lat, lng, heading, speed } = body;

  if (!trip_id || lat == null || lng == null) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  if (typeof lat !== "number" || typeof lng !== "number" || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
    return NextResponse.json({ error: "Coordonnées invalides" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Base de données non configurée" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: trip } = await supabase
    .from("trips")
    .select("id, status")
    .eq("id", trip_id)
    .single();

  if (!trip || trip.status === "completed") {
    return NextResponse.json({ error: "Trajet introuvable ou terminé" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("vehicle_locations")
    .insert({
      trip_id,
      lat,
      lng,
      heading: heading ?? null,
      speed: speed ?? null,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Erreur d'enregistrement" }, { status: 500 });
  }

  return NextResponse.json({ location: data });
}
