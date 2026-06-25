-- Registry JSON is generated on approval and stored here rather than written
-- to the filesystem, since serverless deploy targets (e.g. Vercel) have an
-- ephemeral, read-only filesystem at runtime: a write to public/registry/
-- would not persist or be served as a static file in production.
alter table drops add column if not exists registry_json jsonb;
