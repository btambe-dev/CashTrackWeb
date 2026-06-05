create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  amount numeric(12, 2) not null check (amount >= 0),
  category text not null check (category in ('Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Travel', 'Other')),
  spent_at date not null default current_date,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.paychecks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  month_key text not null check (month_key ~ '^[0-9]{4}-[0-9]{2}$'),
  amount numeric(12, 2) not null check (amount >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, month_key)
);

alter table public.expenses enable row level security;
alter table public.paychecks enable row level security;

create policy "Users can read their own expenses"
on public.expenses for select
using (auth.uid() = user_id);

create policy "Users can insert their own expenses"
on public.expenses for insert
with check (auth.uid() = user_id);

create policy "Users can update their own expenses"
on public.expenses for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own expenses"
on public.expenses for delete
using (auth.uid() = user_id);

create policy "Users can read their own paychecks"
on public.paychecks for select
using (auth.uid() = user_id);

create policy "Users can insert their own paychecks"
on public.paychecks for insert
with check (auth.uid() = user_id);

create policy "Users can update their own paychecks"
on public.paychecks for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
