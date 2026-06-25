-- Two fixes to handle_new_user(), the trigger that mirrors new auth.users
-- rows into profiles, which is what threw "Database error saving new user"
-- on GitHub sign-in:
--
-- 1. The unqualified `profiles` reference can fail to resolve depending on
--    the search_path of the role that fires the trigger (this function runs
--    as security definer, not as the calling session), so it's schema
--    qualified to public.profiles now.
-- 2. The insert wasn't idempotent: a retried sign-in for a user whose
--    auth.users row already exists would hit a duplicate primary key.
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, github_username, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data ->> 'user_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do update set
    github_username = excluded.github_username,
    avatar_url = excluded.avatar_url;
  return new;
end;
$$ language plpgsql security definer set search_path = public;
