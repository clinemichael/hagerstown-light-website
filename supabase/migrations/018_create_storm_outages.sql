create table public.storm_calls (
  id uuid primary key default gen_random_uuid(),
  call_num integer generated always as identity,

  received timestamptz not null default now(),
  call_taker text not null,

  customer_name text,
  phone text,
  house_num text,
  street text,
  unit text,

  incident_type text not null,
  special_condition text,
  comments text,

  xfmr text,
  xfmr_pole text,
  device text,
  device_type text,
  device_pole text,
  feeder text,

  status text not null default 'UNASSIGNED',
  crew text not null default 'UNASSIGNED',
  notes text,

  complete boolean not null default false,
  completed_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint storm_calls_incident_type_check
    check (
      incident_type in (
        'No Power',
        'Partial Power',
        'Other'
      )
    )
);

create table public.storm_meta (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
