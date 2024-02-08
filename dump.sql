--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: payment_method; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.payment_method AS ENUM (
    'cash',
    'gopay'
);


ALTER TYPE public.payment_method OWNER TO postgres;

--
-- Name: payment_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.payment_status AS ENUM (
    'pending',
    'completed',
    'failed'
);


ALTER TYPE public.payment_status OWNER TO postgres;

--
-- Name: user_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_role AS ENUM (
    'basic',
    'admin'
);


ALTER TYPE public.user_role OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: foods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foods (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    price numeric(10,2) NOT NULL,
    image character varying(255),
    restaurant_id uuid NOT NULL
);


ALTER TABLE public.foods OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    food_id uuid NOT NULL,
    amount numeric(10,2) NOT NULL,
    order_date timestamp without time zone NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payments (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    order_id uuid NOT NULL,
    method public.payment_method DEFAULT 'cash'::public.payment_method NOT NULL,
    status public.payment_status DEFAULT 'pending'::public.payment_status NOT NULL,
    amount numeric(10,2) NOT NULL,
    payment_date timestamp without time zone
);


ALTER TABLE public.payments OWNER TO postgres;

--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurants (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone_number character varying(255) NOT NULL,
    rating numeric(2,1) NOT NULL,
    open_time time without time zone NOT NULL,
    close_time time without time zone NOT NULL
);


ALTER TABLE public.restaurants OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public.user_role DEFAULT 'basic'::public.user_role NOT NULL,
    phone_number character varying(25) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: foods; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foods (id, name, description, price, image, restaurant_id) FROM stdin;
41a65cf0-60d4-44f9-a09d-00ecdc63a1ce	Pepperoni Pizza	Delicious pepperoni pizza	10.99	pizza.jpg	ebb91ffb-5ae5-47dd-89c0-a79baad041a5
49db46d1-550d-4b28-9b5c-4a0bc9745549	Mushroom Pizza	Delicious Mushroom pizza	30.99	pizza.jpg	ebb91ffb-5ae5-47dd-89c0-a79baad041a5
87e2e552-2aae-455e-9f1e-7bbba0c558c2	Mexican Pizza	Delicious Mexican pizza	20.99	pizza.jpg	ebb91ffb-5ae5-47dd-89c0-a79baad041a5
d86e6734-9371-4be1-805e-0e85de22f7c7	Pineapple Pizza	Delicious pineapple pizza	40.99	pizza.jpg	ebb91ffb-5ae5-47dd-89c0-a79baad041a5
ccdb7639-f785-42a6-b511-462ae9713502	Meat Pizza	Delicious meat pizza	50.00	pizza.jpg	ebb91ffb-5ae5-47dd-89c0-a79baad041a5
ce1b0aa5-bec1-4ac3-825d-fc6d4d1a7592	Burger A	Delicious Burger A	10.99	Burger.jpg	0c45b51b-0d5f-4d7b-8f38-663ac978bb26
32ec115d-8c1b-4ce2-921c-396e89b3c3b5	Burger B	Delicious Burger B	30.99	Burger.jpg	0c45b51b-0d5f-4d7b-8f38-663ac978bb26
6d3436ca-c758-4a7f-aaef-6879c00312d3	Burger C	Delicious Burger C	30.99	Burger.jpg	0c45b51b-0d5f-4d7b-8f38-663ac978bb26
9b5c50c1-b001-4334-b518-ca6417410b1e	Burger D	Delicious Burger D	30.99	Burger.jpg	0c45b51b-0d5f-4d7b-8f38-663ac978bb26
b734e837-5e4c-4dc6-a116-1a523377deb8	Burger E	Delicious Burger E	30.99	Burger.jpg	0c45b51b-0d5f-4d7b-8f38-663ac978bb26
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, food_id, amount, order_date) FROM stdin;
e08a086d-0e41-4988-84d5-f2aa5fee26af	8d6496f0-226e-4131-97b6-a0bf96f10e47	41a65cf0-60d4-44f9-a09d-00ecdc63a1ce	10.99	2024-02-09 05:29:01.007958
2e40b2c2-0aea-490e-8e69-785818680062	8d6496f0-226e-4131-97b6-a0bf96f10e47	49db46d1-550d-4b28-9b5c-4a0bc9745549	30.99	2024-02-09 05:29:01.007958
fc2f602a-cf42-4096-a139-0479c331d4a0	ce222cad-e27e-41e6-b8ff-9e575597845f	41a65cf0-60d4-44f9-a09d-00ecdc63a1ce	10.99	2024-02-09 05:29:01.007958
79a31315-6cfc-4527-93ed-57f696524579	ce222cad-e27e-41e6-b8ff-9e575597845f	49db46d1-550d-4b28-9b5c-4a0bc9745549	30.99	2024-02-09 05:29:01.007958
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payments (id, user_id, order_id, method, status, amount, payment_date) FROM stdin;
709e7fc6-6dac-4f8f-a27f-21ca175ca057	8d6496f0-226e-4131-97b6-a0bf96f10e47	e08a086d-0e41-4988-84d5-f2aa5fee26af	cash	pending	10.99	\N
d4eb932f-ec4f-4bd1-92c2-b43c64c15b80	8d6496f0-226e-4131-97b6-a0bf96f10e47	2e40b2c2-0aea-490e-8e69-785818680062	gopay	pending	30.99	\N
9ee91748-0e59-4fcc-a593-2155311afc05	ce222cad-e27e-41e6-b8ff-9e575597845f	fc2f602a-cf42-4096-a139-0479c331d4a0	cash	pending	10.99	\N
c8c8e4b6-1821-4434-b428-4c5ed32de958	ce222cad-e27e-41e6-b8ff-9e575597845f	79a31315-6cfc-4527-93ed-57f696524579	gopay	pending	30.99	\N
\.


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restaurants (id, name, address, phone_number, rating, open_time, close_time) FROM stdin;
ebb91ffb-5ae5-47dd-89c0-a79baad041a5	Pizza Palace	123 Main St, Cityville	555-1234	4.5	09:00:00	21:00:00
0c45b51b-0d5f-4d7b-8f38-663ac978bb26	Burger Palace	456 Elm St, Townsville	555-5678	4.2	10:00:00	22:00:00
eccbc87e-4b5c-e2fe-2830-8fd9f2a7baf3	Sushi Palace	789 Oak St, Villagetown	555-9012	4.8	11:00:00	20:00:00
a87ff679-a2f3-e71d-9181-a67b7542122c	Pasta Palace	012 Pine St, Hamletville	555-3456	4.0	08:00:00	23:00:00
e4da3b7f-bbce-2345-d777-2b0674a318d5	BBQ Palace	789 Cedar St, Countryside	555-6789	4.7	12:00:00	22:00:00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role, phone_number) FROM stdin;
a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11	Admin	admin@gmail.com	$2b$10$foPgkziFwT0QDPlDAFbiYezJDhmcbkpVvVsHQAYVPpnNwJzox7vZm	admin	1234567890
8d6496f0-226e-4131-97b6-a0bf96f10e47	User 1	user1@example.com	$2b$10$foPgkziFwT0QDPlDAFbiYezJDhmcbkpVvVsHQAYVPpnNwJzox7vZm	basic	0987654321
ce222cad-e27e-41e6-b8ff-9e575597845f	User 2	user2@example.com	$2b$10$foPgkziFwT0QDPlDAFbiYezJDhmcbkpVvVsHQAYVPpnNwJzox7vZm	basic	9876543210
\.


--
-- Name: foods foods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_phone_number_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_phone_number_key UNIQUE (phone_number);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: foods foods_restaurant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_restaurant_id_fkey FOREIGN KEY (restaurant_id) REFERENCES public.restaurants(id) ON DELETE CASCADE;


--
-- Name: orders orders_food_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_food_id_fkey FOREIGN KEY (food_id) REFERENCES public.foods(id) ON DELETE CASCADE;


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payments payments_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;


--
-- Name: payments payments_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

