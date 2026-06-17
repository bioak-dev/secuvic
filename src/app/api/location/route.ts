import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getDemoTrip } from "@/lib/demo-tracking";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tripId = searchParams.get("trip_id");
  const isDemo = searchParams.get("demo") === "true";

  if (isDemo || tripId === "demo-cannes-monaco") {
    const trip = getDemoTrip();
    return NextResponse.json({ location: trip.location });
  }

  if (!tripId) {
    return NextResponse.json({ error: "trip_id requis" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Base de données non configurée" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

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
  if (!apiKey || apiKey !== process.env.DRIVER_API_KEY) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = await request.json();
  const { trip_id, lat, lng, heading, speed } = body;

  if (!trip_id || lat == null || lng == null) {
    return NextResponse.json({ error: "Données invalides" }, { status: 400 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Base de données non configurée" }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

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
