#!/usr/bin/env bash
set -e

PGHOST=${DB_HOST:-postgres}
PGUSER=${DB_USER:-postgres}
PGPASSWORD=${DB_PASSWORD:-postgres}
PGDATABASE=${DB_NAME:-carfleet}
PGPORT=${DB_PORT:-5432}

export PGPASSWORD

psql -h "$PGHOST" -U "$PGUSER" -p "$PGPORT" -d "$PGDATABASE" <<'SQL'
CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  brand VARCHAR(100),
  model VARCHAR(100),
  year INT,
  price NUMERIC,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS reports (
  id SERIAL PRIMARY KEY,
  car_id INT REFERENCES cars(id) ON DELETE CASCADE,
  data JSONB,
  created_at TIMESTAMP DEFAULT now()
);
SQL

echo "✅ Database initialized successfully!"
