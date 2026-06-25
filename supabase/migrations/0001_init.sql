-- Hovera Live: profiles, drops, remixes, saves, follows, reports.
-- Run via `supabase db push` or paste into the Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  github_username text,
  avatar_url text,
  role text not null default 'member' check (role in ('member', 'maintainer')),
  created_at timestamptz not null default now()
);

create table if not exists drops (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references profiles (id) on delete cascade,
  name text not null,
  slug text not null unique,
  category text not null,
  tags text[] not null default '{}',
  source_code text not null,
  maker_note text not null,
  behavior_note text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  remixed_from uuid references drops (id) on delete set null,
  copies_count int not null default 0,
  used_count int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists remixes (
  id uuid primary key default gen_random_uuid(),
  drop_id uuid not null references drops (id) on delete cascade,
  parent_drop_id uuid not null references drops (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists saves (
  user_id uuid not null references profiles (id) on delete cascade,
  drop_id uuid not null references drops (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, drop_id)
);

create table if not exists follows (
  follower_id uuid not null references profiles (id) on delete cascade,
  followee_id uuid not null references profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, followee_id)
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  drop_id uuid not null references drops (id) on delete cascade,
  reporter_id uuid not null references profiles (id) on delete cascade,
  reason text not null,
  created_at timestamptz not null default now()
);

-- Mirror new auth.users rows into profiles automatically.
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, github_username, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'user_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

alter table profiles enable row level security;
alter table drops enable row level security;
alter table remixes enable row level security;
alter table saves enable row level security;
alter table follows enable row level security;
alter table reports enable row level security;

create policy "Profiles are publicly readable" on profiles
  for select using (true);

create policy "Approved drops are publicly readable" on drops
  for select using (status = 'approved');

create policy "Authors can read their own pending or rejected drops" on drops
  for select using (auth.uid() = author_id);

create policy "Authenticated users can submit drops" on drops
  for insert with check (auth.uid() = author_id and status = 'pending');

create policy "Remix lineage for approved drops is publicly readable" on remixes
  for select using (
    exists (select 1 from drops d where d.id = remixes.drop_id and d.status = 'approved')
  );

create policy "Users can read their own saves" on saves
  for select using (auth.uid() = user_id);

create policy "Users can save/unsave for themselves" on saves
  for insert with check (auth.uid() = user_id);

create policy "Users can remove their own saves" on saves
  for delete using (auth.uid() = user_id);

create policy "Follows are publicly readable" on follows
  for select using (true);

create policy "Users can follow as themselves" on follows
  for insert with check (auth.uid() = follower_id);

create policy "Users can unfollow as themselves" on follows
  for delete using (auth.uid() = follower_id);

create policy "Authenticated users can file reports" on reports
  for insert with check (auth.uid() = reporter_id);

-- Moderation (status updates, rejected-drop visibility, report reads) goes
-- through the service-role client in API routes, which bypasses RLS, so no
-- maintainer-specific policies are defined here for v1.
