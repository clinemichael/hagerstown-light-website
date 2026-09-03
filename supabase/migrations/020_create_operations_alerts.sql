create table public.operations_alerts (
  id uuid primary key default gen_random_uuid(),

  title text not null,
  description text not null,
  priority text not null default 'info',
  active boolean not null default true,

  created_by text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint operations_alerts_priority_check
    check (priority in ('info', 'warning', 'critical'))
);
