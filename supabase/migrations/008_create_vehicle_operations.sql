create table public.vehicle_operations (
  vehicle_id text primary key
    references public.vehicles(id)
    on delete cascade,

  status text not null default 'Available',

  crew_id text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint vehicle_operations_status_check
    check (
      status in (
        'Available',
        'Assigned',
        'Maintenance',
        'Out of Service'
      )
    )
);