-- psql –f setup.sql –d projects
-- psql -U gwp -d gwp -c "TRUNCATE public.posts RESTART IDENTITY CASCADE;" 
CREATE TABLE IF NOT EXISTS help (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    user_uuid VARCHAR(64) NULL,
    uuid VARCHAR(64) NOT NULL UNIQUE,
    body TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);
