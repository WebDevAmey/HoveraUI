alter table drops add column if not exists remix_count int not null default 0;

create or replace function bump_remix_count()
returns trigger as $$
begin
  update drops set remix_count = remix_count + 1 where id = new.parent_drop_id;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_remix_created on remixes;
create trigger on_remix_created
  after insert on remixes
  for each row execute procedure bump_remix_count();
