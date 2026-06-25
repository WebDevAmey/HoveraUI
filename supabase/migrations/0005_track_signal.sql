create or replace function increment_drop_signal(drop_id uuid, signal text)
returns void as $$
begin
  if signal = 'copy' then
    update drops set copies_count = copies_count + 1 where id = drop_id;
  elsif signal = 'use' then
    update drops set used_count = used_count + 1 where id = drop_id;
  end if;
end;
$$ language plpgsql security definer;

grant execute on function increment_drop_signal(uuid, text) to anon, authenticated;
