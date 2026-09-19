-- Pegá este SQL en Supabase: SQL Editor → Run
-- Después, en Vercel, configurá:
--   VITE_SUPABASE_URL
--   VITE_SUPABASE_PUBLISHABLE_KEY  (o VITE_SUPABASE_ANON_KEY)

create table if not exists public.cms_documents (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.cms_documents enable row level security;

drop policy if exists "cms_documents_select_public" on public.cms_documents;
create policy "cms_documents_select_public"
on public.cms_documents
for select
to anon, authenticated
using (true);

drop policy if exists "cms_documents_insert_auth" on public.cms_documents;
create policy "cms_documents_insert_auth"
on public.cms_documents
for insert
to authenticated
with check (true);

drop policy if exists "cms_documents_update_auth" on public.cms_documents;
create policy "cms_documents_update_auth"
on public.cms_documents
for update
to authenticated
using (true)
with check (true);

drop policy if exists "cms_documents_delete_auth" on public.cms_documents;
create policy "cms_documents_delete_auth"
on public.cms_documents
for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public)
values ('site-media', 'site-media', true)
on conflict (id) do update
set public = true;

drop policy if exists "site_media_public_read" on storage.objects;
create policy "site_media_public_read"
on storage.objects
for select
to public
using (bucket_id = 'site-media');

drop policy if exists "site_media_auth_insert" on storage.objects;
create policy "site_media_auth_insert"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-media');

drop policy if exists "site_media_auth_update" on storage.objects;
create policy "site_media_auth_update"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-media')
with check (bucket_id = 'site-media');

drop policy if exists "site_media_auth_delete" on storage.objects;
create policy "site_media_auth_delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-media');
