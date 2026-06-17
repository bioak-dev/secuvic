export interface Trip {
  id: string;
  vic_name: string;
  driver_name: string | null;
  vehicle: string;
  status: "pending" | "active" | "completed";
  pickup_address: string;
  pickup_lat: number;
  pickup_lng: number;
  dropoff_address: string;
  dropoff_lat: number;
  dropoff_lng: number;
  created_at: string;
  route_path?: { lat: number; lng: number }[];
}

export interface VehicleLocation {
  trip_id: string;
  lat: number;
  lng: number;
  heading: number | null;
  speed: number | null;
  updated_at: string;
}

export interface DemoTrip extends Trip {
  location: VehicleLocation;
}
