create table public.crews (
  id text primary key,

  name text not null,

  lead_id text,

  status text not null default 'Available',

  assignment text not null default 'No current assignment',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint crews_status_check
    check (
      status in (
        'Available',
        'Assigned',
        'Unavailable',
        'On Leave',
        'Training'
      )
    )
);