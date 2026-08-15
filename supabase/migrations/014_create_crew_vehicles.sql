create table public.crew_vehicles (
  crew_id text not null
    references public.crews(id)
    on delete cascade,

  vehicle_id text not null
    references public.vehicles(id)
    on delete restrict,

  created_at timestamptz not null default now(),

  primary key (crew_id, vehicle_id)
);