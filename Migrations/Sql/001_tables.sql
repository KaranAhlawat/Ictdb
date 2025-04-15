CREATE TYPE user_origin AS ENUM ('form', 'google');

CREATE TABLE IF NOT EXISTS users
(
    id            uuid not null default gen_random_uuid() primary key,
    provider_id   text not null,
    username      text not null,
    user_email    text not null,
    user_password text,
    provider      user_origin not null,
    created_at    timestamptz not null default now(),
    updated_at    timestamptz not null default now()
);

ALTER TABLE IF EXISTS users
    ADD CONSTRAINT unique_provider_id_provider UNIQUE (provider_id, provider);
ALTER TABLE IF EXISTS users
    ADD CONSTRAINT unique_user_email_provider UNIQUE (user_email, provider);

CREATE TABLE IF NOT EXISTS talks
(
    id          uuid not null default gen_random_uuid() primary key,
    user_id     uuid NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    name        text   NOT NULL,
    link        text   NOT NULL,
    description text,
    speaker     text,
    organizer   text,
    tags        text[] DEFAULT ARRAY [] ::text[],
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

CREATE TABLE IF NOT EXISTS favorites
(
    id         uuid not null default gen_random_uuid() primary key,
    user_id    uuid NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    talk_id    uuid NOT NULL REFERENCES talks (id) ON DELETE RESTRICT,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    UNIQUE (user_id, talk_id)
);
