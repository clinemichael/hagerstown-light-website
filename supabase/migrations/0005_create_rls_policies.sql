-- Employees
create policy "Authenticated users can view employees"
on public.employees
for select
to authenticated
using (true);


create policy "Authenticated users can add employees"
on public.employees
for insert
to authenticated
with check (true);


create policy "Authenticated users can update employees"
on public.employees
for update
to authenticated
using (true)
with check (true);



-- Profiles
create policy "Users can view profiles"
on public.profiles
for select
to authenticated
using (true);


create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);