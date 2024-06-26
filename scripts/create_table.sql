CREATE TABLE IF NOT EXISTS devices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position FLOAT8 [] NOT NULL,
    versions JSONB,
    config JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);