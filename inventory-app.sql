
CREATE TABLE manufacturers(
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
);

INSERT INTO manufacturers (name) VALUES('Blackriver'),('Flatface'),('Berlinwood'),('Bollie');

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