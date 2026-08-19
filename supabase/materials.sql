create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  category text not null default 'Geral',
  language text not null default 'pt-br' check (language in ('pt-br', 'en', 'both')),
  file_name text not null,
  file_type text not null,
  file_size_bytes bigint check (file_size_bytes is null or file_size_bytes >= 0),
  download_url text not null,
  video_url text,
  thumbnail_url text,
  published_at timestamptz not null default now(),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists materials_published_at_idx
  on public.materials (published_at desc)
  where is_published = true;

alter table public.materials enable row level security;

drop policy if exists "Public can read published materials" on public.materials;
create policy "Public can read published materials"
  on public.materials
  for select
  to anon, authenticated
  using (is_published = true);

grant select on table public.materials to anon, authenticated;
revoke insert, update, delete on table public.materials from anon, authenticated;

comment on table public.materials is
  'Public catalog of downloadable materials referenced by Brognoli BI videos.';
