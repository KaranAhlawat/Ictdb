CREATE TYPE account_type AS ENUM ('form', 'google');

CREATE TABLE IF NOT EXISTS account
(
    id            uuid not null default gen_random_uuid() primary key,
    provider_id   text not null,
    username      text not null,
    user_email    text not null,
    user_password text,
    provider      account_type not null,
    created_at    timestamptz not null default now(),
    updated_at    timestamptz not null default now()
);

ALTER TABLE IF EXISTS account
    ADD CONSTRAINT unique_provider_id_provider UNIQUE (provider_id, provider);
ALTER TABLE IF EXISTS account
    ADD CONSTRAINT unique_user_email_provider UNIQUE (user_email, provider);

CREATE TABLE IF NOT EXISTS talk
(
    id          uuid not null default gen_random_uuid() primary key,
    account_id     uuid NOT NULL REFERENCES account (id) ON DELETE RESTRICT,
    name        text   NOT NULL,
    link        text   NOT NULL,
    description text,
    speaker     text,
    organizer   text,
    tags        text[] DEFAULT ARRAY [] ::text[],
    created_at  timestamptz not null default now(),
    updated_at  timestamptz not null default now()
);

CREATE TABLE IF NOT EXISTS favorite
(
    id         uuid not null default gen_random_uuid() primary key,
    account_id    uuid NOT NULL REFERENCES account (id) ON DELETE RESTRICT,
    talk_id    uuid NOT NULL REFERENCES talk (id) ON DELETE RESTRICT,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    UNIQUE (account_id, talk_id)
);
