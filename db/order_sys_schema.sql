

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id INT PRIMARY KEY NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL
);

CREATE TABLE restaurant (
  id INT PRIMARY KEY NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE menu_items (
  item_id INT PRIMARY KEY NOT NULL,
  restaurant_id INT NOT NULL REFERENCES restaurant(id),
  name VARCHAR(50) NOT NULL,
  description VARCHAR() NOT NULL,
  price INT NOT NULL,
);
