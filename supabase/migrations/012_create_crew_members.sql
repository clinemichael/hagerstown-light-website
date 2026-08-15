create table public.crew_members (
  crew_id text not null
    references public.crews(id)
    on delete cascade,

  employee_id text not null
    references public.employees(id)
    on delete restrict,

  created_at timestamptz not null default now(),

  primary key (crew_id, employee_id)
);