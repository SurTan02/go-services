CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT gen_random_uuid() not null,
  name varchar(255) not null,
  email varchar(255) not null unique,
  password varchar(255) not null,
  phone_number varchar(25) not null unique,
  primary key (id)
)