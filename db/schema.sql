create table if not exists patients (
  id serial primary key,
  first_name text not null,
  last_name text not null,
  date_of_birth date not null,
  gender text not null default 'Female',
  phone text,
  email text,
  address text,
  condition text not null,
  status text not null default 'Active',
  last_visit date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
