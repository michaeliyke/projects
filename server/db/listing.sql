-- psql -d projects -U iyke -f listing.sql
-- psql -U gwp -d gwp -c "TRUNCATE public.posts RESTART IDENTITY CASCADE;" 
CREATE TABLE IF NOT EXISTS listings (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rows TEXT NOT NULL,
    collections VARCHAR[],
    uuid VARCHAR(64) NOT NULL UNIQUE,
    -- user_uuid VARCHAR(64) REFERENCES users(uuid),
    created_at TIMESTAMP NOT NULL
);

-- SQL READ from the bottom/end of table