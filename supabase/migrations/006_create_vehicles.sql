create table public.vehicles (
  id text primary key,
  name text not null,
  type text not null,
  mileage integer not null default 0,
  maintenance date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint vehicles_mileage_check
    check (mileage >= 0)
);