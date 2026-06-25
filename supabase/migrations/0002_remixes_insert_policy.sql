-- 0001_init.sql only gave remixes a select policy. RLS denies inserts by
-- default with no matching policy, which would silently break remix
-- submission. Allow inserting a lineage row when the caller is the author of
-- the new (child) drop being recorded.

create policy "Authors can record remix lineage for their own drop" on remixes
  for insert with check (
    exists (
      select 1 from drops d
      where d.id = remixes.drop_id
        and d.author_id = auth.uid()
    )
  );
