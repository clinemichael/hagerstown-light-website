create table public.employees (
  id text primary key,
  name text not null,
  title text not null,
  status text not null default 'Active',
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint employees_status_check
    check (status in ('Active', 'Inactive'))
);