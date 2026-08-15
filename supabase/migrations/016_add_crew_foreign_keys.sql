alter table public.crews
add constraint crews_lead_id_fkey
foreign key (lead_id)
references public.employees(id)
on delete restrict;


alter table public.vehicle_operations
add constraint vehicle_operations_crew_id_fkey
foreign key (crew_id)
references public.crews(id)
on delete set null;