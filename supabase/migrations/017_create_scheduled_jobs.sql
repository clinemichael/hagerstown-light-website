create table public.scheduled_jobs (
  id uuid primary key default gen_random_uuid(),

  work_order text not null,
  job_name text not null,

  scheduled_date date not null,
  start_time time not null,
  end_time time not null,

  crew_id text not null,
  crew_name text not null,

  employee_ids text[] not null default '{}',
  vehicle_ids text[] not null default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint scheduled_jobs_time_check
    check (end_time > start_time)
);