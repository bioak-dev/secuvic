import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getDemoTrips } from "@/lib/demo-tracking";
import { isDemoAllowed } from "@/lib/validation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isDemo = searchParams.get("demo") === "true";

  if (isDemo) {
    if (!isDemoAllowed()) {
      return NextResponse.json({ error: "Mode démo désactivé" }, { status: 403 });
    }
    return NextResponse.json({ trips: getDemoTrips() });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Service non configuré" }, { status: 503 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const { data: trips, error } = await supabase
    .from("trips")
    .select("*")
    .eq("client_id", user.id)
    .in("status", ["active", "pending"])
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Erreur de chargement" }, { status: 500 });
  }

  const tripsWithLocations = await Promise.all(
    (trips || []).map(async (trip) => {
      const { data: location } = await supabase
        .from("vehicle_locations")
        .select("*")
        .eq("trip_id", trip.id)
        .order("updated_at", { ascending: false })
        .limit(1)
        .single();

      return { ...trip, location: location || null };
    })
  );

  return NextResponse.json({ trips: tripsWithLocations });
}
