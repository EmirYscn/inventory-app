
CREATE TABLE manufacturers(
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
);

INSERT INTO manufacturers (name) VALUES('Blackriver'),('Flatface'),('Berlinwood'),('Bollie');

CREATE TABLE categories(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  category TEXT NOT NULL
);

INSERT INTO categories (category) VALUES ('Fingerboards'), ('Trucks'), ('Wheels'), ('Tapes');

CREATE TABLE items (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  image TEXT DEFAULT NULL,
  title TEXT NOT NULL,
  price NUMERIC(6, 2) NOT NULL,
  plies TEXT[] DEFAULT NULL,
  concave TEXT[] DEFAULT NULL,
  width TEXT[] DEFAULT NULL,
  base TEXT[] DEFAULT NULL,
  hanger TEXT[] DEFAULT NULL,
  wheel_colors TEXT[] DEFAULT NULL,
  product_number TEXT NOT NULL,
  description TEXT NOT NULL,
  manufacturer_id INTEGER REFERENCES manufacturers (id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES categories (id) ON DELETE SET NULL
);

INSERT INTO items (
  image, title, price, plies, concave, width, product_number, description, manufacturer_id, category_id
) VALUES (
  '/images/fingerboard_item_1.jpg','Blackriver X Raviollie Pro Fingerboard - BR Hand', 39.95, ARRAY['5ply', '7ply'], 
  ARRAY['low', 'medium'], ARRAY['29mm', '32mm', '33.3mm', '36mm'], 'BR8003088.6', 
  'Professional wooden fingerboard, Designed by Rocco Pezzella aka Raviollie.', 13, 5
), (
  '/images/fingerboard_item_2.jpg','Blackriver X Raviollie Pro Fingerboard - Smiling River', 39.95, ARRAY['5ply', '7ply'], 
  ARRAY['low', 'medium'], ARRAY['29mm', '32mm', '33.3mm', '36mm'], 'BR8003089.6', 
  'Professional wooden fingerboard, Designed by Rocco Pezzella aka Raviollie.', 13, 5
), (
  '/images/fingerboard_item_3.jpg','Blackriver X Raviollie Pro Complete Fingerboard - Flipping Hand', 114.95, ARRAY['5ply', '7ply'], 
  ARRAY['low', 'medium'], ARRAY['29mm', '32mm', '33.3mm', '36mm'], 'BR8103052.6', 
  'Professional wooden fingerboard, Designed by Rocco Pezzella aka Raviollie.', 13, 5
), (
  '/images/fingerboard_item_4.jpg','Blackriver X Raviollie Complete Pro Fingerboard - BR Hand', 114.95, ARRAY['5ply', '7ply'], 
  ARRAY['low', 'medium'], ARRAY['29mm', '32mm', '33.3mm', '36mm'], 'BR8103053.1', 
  'Professional wooden fingerboard, Designed by Rocco Pezzella aka Raviollie.', 13, 5
), (
  '/images/fingerboard_item_5.jpg','Blackriver X Raviollie Pro Fingerboard - Flipping Hand', 39.95, ARRAY['5ply', '7ply'], 
  ARRAY['low', 'medium'], ARRAY['29mm', '32mm', '33.3mm', '36mm'], 'BR8003086.6', 
  'Professional wooden fingerboard, Designed by Rocco Pezzella aka Raviollie.', 13, 5
);

INSERT INTO items (
  image, title, price, base, hanger, product_number, description, manufacturer_id, category_id
) VALUES (
  '/images/truck_item_1.jpg','Blackriver Pro Fingerboard Trucks - BRTs 3.0 34mm', 54.95, ARRAY['Silver', 'Gold', 'Black'], ARRAY['Silver', 'Gold', 'Black'], 'BR3000114', 'Professional fingerboard trucks', 13, 6
);

INSERT INTO items (
  title, price, wheel_colors, product_number, description, manufacturer_id, category_id
) VALUES (
  'Blackriver Wheels', 19.95, ARRAY['red', 'blue'], 
  'BRWHEEL456', 'Durable and stylish wheels for your fingerboard.', 13, 7
);

CREATE TABLE fingerboards (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC(6, 2) NOT NULL,
  plies TEXT[] NOT NULL,
  concave TEXT[] NOT NULL,
  width TEXT[] NOT NULL,
  product_number TEXT NOT NULL,
  description TEXT NOT NULL,
  manufacturer INTEGER REFERENCES manufacturers (id) ON DELETE SET NULL
);

INSERT INTO fingerboards (title, price, plies, concave, width, product_number, description, manufacturer) 
VALUES ('Blackriver X Raviollie Pro Fingerboard - BR Hand', 39.95, ARRAY['5ply', '7ply'], ARRAY['low', 'medium'], ARRAY['29mm', '32mm', '33.3mm', '36mm'], 'BR8003088.6', 'Professional wooden fingerboard, Designed by Rocco Pezzella aka Raviollie.', 13);

CREATE TABLE trucks(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC(6, 2) NOT NULL,
  base TEXT[] NOT NULL,
  hanger TEXT[] NOT NULL,
  product_number TEXT NOT NULL,
  description TEXT NOT NULL,
  manufacturer INTEGER REFERENCES manufacturers (id) ON DELETE SET NULL
);

INSERT INTO trucks (title, price, base, hanger, product_number, description, manufacturer)
VALUES ('Blackriver Pro Fingerboard Trucks - BRTs 3.0 34mm', 54.95, ARRAY['Silver', 'Gold', 'Black'], ARRAY['Silver', 'Gold', 'Black'], 'BR3000114', 'Professional fingerboard trucks', 13);

CREATE TABLE wheels(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC(6, 2) NOT NULL,
  wheel_colors TEXT[] NOT NULL,
  product_number TEXT NOT NULL,
  description TEXT NOT NULL,
  manufacturer INTEGER REFERENCES manufacturers (id) ON DELETE SET NULL
);

INSERT INTO wheels (title, price, wheel_colors, product_number, description, manufacturer)
VALUES ('Blackriver Pro Fingerboard Wheels - Blank Street', 34.95, ARRAY['White', 'Blue', 'Black'], 'BR4001000M.1', 'Professional fingerboard wheels', 13);

CREATE TABLE tape(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC(6, 2) NOT NULL,
  product_number TEXT NOT NULL,
  description TEXT NOT NULL,
  manufacturer INTEGER REFERENCES manufacturers (id) ON DELETE SET NULL
);

INSERT INTO tapes (title, price, product_number, description, manufacturer)
VALUES ('Riptape Pro Fingerboard Tape - Slim & Catchy Uncut', 6.95, 'RT1001009.1', 'Fingerboard tape', 17);