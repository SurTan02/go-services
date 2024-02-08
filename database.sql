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
  image varchar(255),
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
CREATE TYPE payment_method AS ENUM ('cash', 'gopay');
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

INSERT INTO users (id, name, email, password, role, phone_number) VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',  'Admin', 'admin@gmail.com', '$2b$10$foPgkziFwT0QDPlDAFbiYezJDhmcbkpVvVsHQAYVPpnNwJzox7vZm', 'admin', '1234567890'),
('8d6496f0-226e-4131-97b6-a0bf96f10e47', 'User 1', 'user1@example.com', '$2b$10$foPgkziFwT0QDPlDAFbiYezJDhmcbkpVvVsHQAYVPpnNwJzox7vZm', 'basic', '0987654321'),
('ce222cad-e27e-41e6-b8ff-9e575597845f', 'User 2', 'user2@example.com', '$2b$10$foPgkziFwT0QDPlDAFbiYezJDhmcbkpVvVsHQAYVPpnNwJzox7vZm', 'basic', '9876543210');

INSERT INTO restaurants (id, name, address, phone_number, rating, open_time, close_time) VALUES
('ebb91ffb-5ae5-47dd-89c0-a79baad041a5', 'Pizza Palace', '123 Main St, Cityville', '555-1234', 4.5, '09:00:00', '21:00:00'),
('0c45b51b-0d5f-4d7b-8f38-663ac978bb26', 'Burger Palace', '456 Elm St, Townsville', '555-5678', 4.2, '10:00:00', '22:00:00'),
('eccbc87e4b5ce2fe28308fd9f2a7baf3', 'Sushi Palace', '789 Oak St, Villagetown', '555-9012', 4.8, '11:00:00', '20:00:00'),
('a87ff679a2f3e71d9181a67b7542122c', 'Pasta Palace', '012 Pine St, Hamletville', '555-3456', 4.0, '08:00:00', '23:00:00'),
('e4da3b7fbbce2345d7772b0674a318d5', 'BBQ Palace', '789 Cedar St, Countryside', '555-6789', 4.7, '12:00:00', '22:00:00');

INSERT INTO foods (id, name, description, price, image, restaurant_id) VALUES
('41a65cf0-60d4-44f9-a09d-00ecdc63a1ce', 'Pepperoni Pizza', 'Delicious pepperoni pizza', 10.99, 'pizza.jpg', 'ebb91ffb-5ae5-47dd-89c0-a79baad041a5'),
('49db46d1-550d-4b28-9b5c-4a0bc9745549', 'Mushroom Pizza', 'Delicious Mushroom pizza', 30.99, 'pizza.jpg', 'ebb91ffb-5ae5-47dd-89c0-a79baad041a5'),
(gen_random_uuid(), 'Mexican Pizza', 'Delicious Mexican pizza', 20.99, 'pizza.jpg', 'ebb91ffb-5ae5-47dd-89c0-a79baad041a5'),
(gen_random_uuid(), 'Pineapple Pizza', 'Delicious pineapple pizza', 40.99, 'pizza.jpg', 'ebb91ffb-5ae5-47dd-89c0-a79baad041a5'),
(gen_random_uuid(), 'Meat Pizza', 'Delicious meat pizza', 50, 'pizza.jpg', 'ebb91ffb-5ae5-47dd-89c0-a79baad041a5'),
(gen_random_uuid(), 'Burger A', 'Delicious Burger A', 10.99, 'Burger.jpg', '0c45b51b-0d5f-4d7b-8f38-663ac978bb26'),
(gen_random_uuid(), 'Burger B', 'Delicious Burger B', 30.99, 'Burger.jpg', '0c45b51b-0d5f-4d7b-8f38-663ac978bb26'),
(gen_random_uuid(), 'Burger C', 'Delicious Burger C', 30.99, 'Burger.jpg', '0c45b51b-0d5f-4d7b-8f38-663ac978bb26'),
(gen_random_uuid(), 'Burger D', 'Delicious Burger D', 30.99, 'Burger.jpg', '0c45b51b-0d5f-4d7b-8f38-663ac978bb26'),
(gen_random_uuid(), 'Burger E', 'Delicious Burger E', 30.99, 'Burger.jpg', '0c45b51b-0d5f-4d7b-8f38-663ac978bb26');

INSERT INTO orders (id, user_id, food_id, amount, order_date) VALUES
('e08a086d-0e41-4988-84d5-f2aa5fee26af', '8d6496f0-226e-4131-97b6-a0bf96f10e47', '41a65cf0-60d4-44f9-a09d-00ecdc63a1ce', 10.99, CURRENT_TIMESTAMP),
('2e40b2c2-0aea-490e-8e69-785818680062', '8d6496f0-226e-4131-97b6-a0bf96f10e47', '49db46d1-550d-4b28-9b5c-4a0bc9745549', 30.99, CURRENT_TIMESTAMP),
('fc2f602a-cf42-4096-a139-0479c331d4a0', 'ce222cad-e27e-41e6-b8ff-9e575597845f', '41a65cf0-60d4-44f9-a09d-00ecdc63a1ce', 10.99, CURRENT_TIMESTAMP),
('79a31315-6cfc-4527-93ed-57f696524579', 'ce222cad-e27e-41e6-b8ff-9e575597845f', '49db46d1-550d-4b28-9b5c-4a0bc9745549', 30.99, CURRENT_TIMESTAMP);

INSERT INTO payments (user_id, order_id, method, status, amount, payment_date) VALUES
('8d6496f0-226e-4131-97b6-a0bf96f10e47', 'e08a086d-0e41-4988-84d5-f2aa5fee26af', 'cash', 'pending', 10.99, NULL),
('8d6496f0-226e-4131-97b6-a0bf96f10e47', '2e40b2c2-0aea-490e-8e69-785818680062', 'gopay', 'pending', 30.99, NULL),
('ce222cad-e27e-41e6-b8ff-9e575597845f', 'fc2f602a-cf42-4096-a139-0479c331d4a0', 'cash', 'pending', 10.99, NULL),
('ce222cad-e27e-41e6-b8ff-9e575597845f', '79a31315-6cfc-4527-93ed-57f696524579', 'gopay', 'pending', 30.99, NULL);

 
 

 
 