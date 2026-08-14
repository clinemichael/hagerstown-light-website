create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  employee_id text unique,
  full_name text not null,
  role text not null default 'Employee',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint profiles_role_check
    check (
      role in (
        'Administrator',
        'Operations Manager',
        'Supervisor',
        'Employee',
        'Read Only'
      )
    )
);