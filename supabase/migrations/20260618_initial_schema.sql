create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  state_code text not null default 'OUTRO',
  income numeric(12,2) not null default 0,
  installments numeric(12,2) not null default 0,
  essentials numeric(12,2) not null default 0,
  contracts_count integer not null default 0,
  debt_types text[] not null default '{}',
  negative_status text not null default 'nao',
  renegotiations_status text not null default 'nao',
  payroll_status text not null default 'nao',
  admin_attempt_status text not null default 'nao',
  consent boolean not null default false,
  main_concern text,
  source text not null default 'landing-page',
  classification text not null,
  urgency text not null,
  status text not null default 'novo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists leads_status_idx on public.leads(status);
create index if not exists leads_urgency_idx on public.leads(urgency);
create index if not exists leads_state_idx on public.leads(state_code);
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists lead_events_lead_id_idx on public.lead_events(lead_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_leads_updated_at on public.leads;
create trigger trg_leads_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();
