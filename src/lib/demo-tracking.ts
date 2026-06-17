import type { DemoTrip, VehicleLocation } from "@/types/tracking";
import { DEMO_ROUTE } from "@/lib/demo-route";

const ROUTE_METRICS = buildRouteMetrics(DEMO_ROUTE);

const DEMO_TRIP_BASE: Omit<DemoTrip, "location"> = {
  id: "demo-cannes-monaco",
  vic_name: "M. Dupont (VIC)",
  driver_name: "Jean-Marc D.",
  vehicle: "Mercedes Classe V Noir",
  status: "active",
  pickup_address: "Hôtel Martinez, Cannes",
  pickup_lat: DEMO_ROUTE[0].lat,
  pickup_lng: DEMO_ROUTE[0].lng,
  dropoff_address: "Hôtel de Paris, Monte-Carlo",
  dropoff_lat: DEMO_ROUTE[DEMO_ROUTE.length - 1].lat,
  dropoff_lng: DEMO_ROUTE[DEMO_ROUTE.length - 1].lng,
  created_at: new Date().toISOString(),
  route_path: DEMO_ROUTE,
};

function buildRouteMetrics(route: { lat: number; lng: number }[]) {
  const distances = [0];
  let total = 0;
  for (let i = 1; i < route.length; i++) {
    total += haversine(route[i - 1], route[i]);
    distances.push(total);
  }
  return { distances, total };
}

function haversine(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function bearing(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) {
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const y = Math.sin(dLng) * Math.cos(la2);
  const x =
    Math.cos(la1) * Math.sin(la2) -
    Math.sin(la1) * Math.cos(la2) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

function getPositionOnRoute(progress: number) {
  const { distances, total } = ROUTE_METRICS;
  const targetDist = Math.min(Math.max(progress, 0), 1) * total;

  for (let i = 1; i < distances.length; i++) {
    if (distances[i] >= targetDist) {
      const segStart = distances[i - 1];
      const segLen = distances[i] - segStart;
      const t = segLen === 0 ? 0 : (targetDist - segStart) / segLen;
      const a = DEMO_ROUTE[i - 1];
      const b = DEMO_ROUTE[i];
      return {
        lat: a.lat + (b.lat - a.lat) * t,
        lng: a.lng + (b.lng - a.lng) * t,
        heading: bearing(a, b),
      };
    }
  }

  const last = DEMO_ROUTE[DEMO_ROUTE.length - 1];
  const prev = DEMO_ROUTE[DEMO_ROUTE.length - 2];
  return { lat: last.lat, lng: last.lng, heading: bearing(prev, last) };
}

export function getDemoRoute() {
  return DEMO_ROUTE;
}

export function getDemoTrip(): DemoTrip {
  const cycleMs = 120000;
  const elapsed = Date.now() % cycleMs;
  const t = elapsed / cycleMs;
  const progress = t < 0.5 ? t * 2 : 2 - t * 2;

  const pos = getPositionOnRoute(progress);

  const location: VehicleLocation = {
    trip_id: DEMO_TRIP_BASE.id,
    lat: pos.lat,
    lng: pos.lng,
    heading: pos.heading,
    speed: 55 + Math.sin(Date.now() / 3000) * 15,
    updated_at: new Date().toISOString(),
  };

  return { ...DEMO_TRIP_BASE, location };
}

export function getDemoTrips(): DemoTrip[] {
  return [getDemoTrip()];
}
