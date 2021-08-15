-- psql –f feedback.sql –d projects
-- psql -U gwp -d gwp -c "TRUNCATE public.posts RESTART IDENTITY CASCADE;" 
CREATE TABLE IF NOT EXISTS feedback (
    id SERIAL PRIMARY KEY,
    user_uuid VARCHAR(64) NOT NULL,
    uuid VARCHAR(64) NOT NULL UNIQUE,
    body TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL
);
