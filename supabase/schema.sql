-- Schéma Supabase pour l'espace client SecuVIC
-- Exécuter dans Supabase → SQL Editor

create table if not exists trips (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references auth.users(id) on delete cascade not null,
  vic_name text not null,
  driver_name text,
  vehicle text default 'Mercedes Classe V Noir',
  status text default 'active' check (status in ('pending', 'active', 'completed')),
  pickup_address text not null,
  pickup_lat double precision not null,
  pickup_lng double precision not null,
  dropoff_address text not null,
  dropoff_lat double precision not null,
  dropoff_lng double precision not null,
  created_at timestamptz default now()
);

create table if not exists vehicle_locations (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references trips(id) on delete cascade not null,
  lat double precision not null,
  lng double precision not null,
  heading double precision,
  speed double precision,
  updated_at timestamptz default now()
);

create index if not exists idx_trips_client_id on trips(client_id);
create index if not exists idx_vehicle_locations_trip_id on vehicle_locations(trip_id);
create index if not exists idx_vehicle_locations_updated_at on vehicle_locations(updated_at desc);

alter table trips enable row level security;
alter table vehicle_locations enable row level security;

create policy "Clients voient leurs trajets"
  on trips for select
  using (auth.uid() = client_id);

create policy "Clients voient les positions de leurs trajets"
  on vehicle_locations for select
  using (
    trip_id in (select id from trips where client_id = auth.uid())
  );

-- Insertion positions via service role (API chauffeur)
create policy "Service insère les positions"
  on vehicle_locations for insert
  with check (true);

-- Activer Realtime sur vehicle_locations
alter publication supabase_realtime add table vehicle_locations;
