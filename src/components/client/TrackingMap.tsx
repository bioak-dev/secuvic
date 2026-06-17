"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Trip, VehicleLocation } from "@/types/tracking";

const vehicleIcon = L.divIcon({
  className: "vehicle-marker",
  html: `<div style="
    width: 36px; height: 36px;
    background: #d4af37;
    border: 3px solid #000;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(212,175,55,0.6);
    display: flex; align-items: center; justify-content: center;
  "><div style="width: 8px; height: 8px; background: #000; border-radius: 50%;"></div></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const pickupIcon = L.divIcon({
  className: "pickup-marker",
  html: `<div style="width:14px;height:14px;background:#22c55e;border:2px solid #fff;border-radius:50%;box-shadow:0 0 8px rgba(34,197,94,0.5);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const dropoffIcon = L.divIcon({
  className: "dropoff-marker",
  html: `<div style="width:14px;height:14px;background:#ef4444;border:2px solid #fff;border-radius:50%;box-shadow:0 0 8px rgba(239,68,68,0.5);"></div>`,
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  const prev = useRef(center);

  useEffect(() => {
    const [lat, lng] = center;
    const [prevLat, prevLng] = prev.current;
    if (Math.abs(lat - prevLat) > 0.00005 || Math.abs(lng - prevLng) > 0.00005) {
      map.panTo(center, { animate: true, duration: 0.8 });
      prev.current = center;
    }
  }, [center, map]);

  return null;
}

function MapResizer() {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 100);
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [map]);

  return null;
}

function VehicleMarker({
  position,
  trip,
  location,
}: {
  position: [number, number];
  trip: Trip;
  location: VehicleLocation;
}) {
  const markerRef = useRef<L.Marker>(null);

  useEffect(() => {
    markerRef.current?.setLatLng(position);
  }, [position]);

  return (
    <Marker ref={markerRef} position={position} icon={vehicleIcon}>
      <Popup>
        <strong>{trip.vehicle}</strong>
        <br />
        VIC : {trip.vic_name}
        {location.speed != null && (
          <>
            <br />
            {Math.round(location.speed)} km/h
          </>
        )}
      </Popup>
    </Marker>
  );
}

interface TrackingMapProps {
  trip: Trip;
  location: VehicleLocation | null;
}

export function TrackingMap({ trip, location }: TrackingMapProps) {
  const vehiclePos: [number, number] | null = location
    ? [location.lat, location.lng]
    : null;

  const center: [number, number] = vehiclePos || [
    (trip.pickup_lat + trip.dropoff_lat) / 2,
    (trip.pickup_lng + trip.dropoff_lng) / 2,
  ];

  const route: [number, number][] = trip.route_path
    ? trip.route_path.map((p) => [p.lat, p.lng] as [number, number])
    : [
        [trip.pickup_lat, trip.pickup_lng],
        ...(vehiclePos ? [vehiclePos] : []),
        [trip.dropoff_lat, trip.dropoff_lng],
      ];

  return (
    <div className="w-full h-full min-h-[450px] rounded-sm overflow-hidden border border-white/10">
      <MapContainer
        center={center}
        zoom={10}
        className="w-full h-full min-h-[450px]"
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <MapResizer />
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {vehiclePos && <MapUpdater center={vehiclePos} />}

        <Marker position={[trip.pickup_lat, trip.pickup_lng]} icon={pickupIcon}>
          <Popup>
            <strong>Départ</strong>
            <br />
            {trip.pickup_address}
          </Popup>
        </Marker>

        <Marker position={[trip.dropoff_lat, trip.dropoff_lng]} icon={dropoffIcon}>
          <Popup>
            <strong>Arrivée</strong>
            <br />
            {trip.dropoff_address}
          </Popup>
        </Marker>

        {vehiclePos && location && (
          <VehicleMarker position={vehiclePos} trip={trip} location={location} />
        )}

        <Polyline
          positions={route}
          pathOptions={{
            color: "#d4af37",
            weight: trip.route_path ? 4 : 3,
            opacity: 0.8,
            dashArray: trip.route_path ? undefined : "10 10",
          }}
        />
      </MapContainer>
    </div>
  );
}
