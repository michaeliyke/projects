/* 
    psql –f setup.sql –d chitchat
    psql -U gwp -d gwp -c "TRUNCATE public.posts RESTART IDENTITY CASCADE;" 
 */
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS threads;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(64) NOT NULL UNIQUE,
    name VARCHAR(255),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(64) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS threads (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(64) NOT NULL UNIQUE,
    topic TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(64) NOT NULL UNIQUE,
    body TEXT,
    user_id INTEGER REFERENCES users(id),
    thread_id INTEGER REFERENCES threads(id),
    created_at TIMESTAMP NOT NULL
);