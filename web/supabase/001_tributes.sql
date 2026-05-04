-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New query)
-- Creates the tributes table for the Peris Basweti memorial guestbook

create table if not exists public.tributes (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  relationship text not null default '',
  country      text not null default '',
  type         text not null check (type in ('Condolence', 'Memory', 'Prayer', 'Testimony')),
  message      text not null,
  consent      boolean not null default false,
  status       text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at   timestamptz not null default now()
);

-- Index for fetching approved tributes newest-first
create index if not exists idx_tributes_status_created
  on public.tributes (status, created_at desc);

-- Row-level security: anyone can insert (submit), only the service role can update status
alter table public.tributes enable row level security;

-- Allow anonymous users to insert (submit a tribute)
create policy "Anyone can submit a tribute"
  on public.tributes
  for insert
  to anon
  with check (consent = true);

-- Allow anyone to read approved tributes
create policy "Anyone can read approved tributes"
  on public.tributes
  for select
  to anon
  using (status = 'approved');

-- Service role (your admin backend / Supabase dashboard) can do everything
-- No explicit policy needed — service_role bypasses RLS by default
