CREATE TYPE user_role AS ENUM ('basic', 'admin');

CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT gen_random_uuid() not null,
  name varchar(255) not null,
  email varchar(255) not null unique,
  password varchar(255) not null,
  role user_role DEFAULT 'basic' not null,
  phone_number varchar(25) not null unique,
  primary key (id)
);

CREATE TABLE IF NOT EXISTS restaurants (
  id uuid DEFAULT gen_random_uuid() not null,
  name varchar(255) not null,
  address varchar(255) not null,
  phone_number varchar(255) not null,
  rating decimal(2,1) not null,
  open_time time not null,
  close_time time not null,
  primary key (id)
);

CREATE TABLE IF NOT EXISTS foods (
  id uuid DEFAULT gen_random_uuid() not null,
  name varchar(255) not null,
  description text not null,
  price decimal(10,2) not null,
  image varchar(255) not null,
  restaurant_id uuid not null,
  primary key (id),
  foreign key (restaurant_id) references restaurants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() not null,
  user_id uuid not null,
  food_id uuid not null,
  amount decimal(10,2) not null,
  order_date TIMESTAMP not null,
  primary key (id),
  foreign key (user_id) references users(id) ON DELETE CASCADE, 
  foreign key (food_id) references foods(id) ON DELETE CASCADE
);

CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed');
CREATE TYPE payment_method AS ENUM ('cash', 'gopay', 'bank');
CREATE TABLE IF NOT EXISTS payments (
  id uuid DEFAULT gen_random_uuid() not null,
  user_id uuid not null,
  order_id uuid not null,
  method payment_method DEFAULT 'cash' not null,
  status payment_status DEFAULT 'pending' not null,
  amount decimal(10,2) not null,
  payment_date TIMESTAMP,
  primary key (id),
  foreign key (user_id) references users(id) ON DELETE CASCADE, 
  foreign key (order_id) references orders(id) ON DELETE CASCADE
);
