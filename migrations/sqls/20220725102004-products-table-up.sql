CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(100)
);

-- Insert product section --

INSERT INTO products(name, price, category) VALUES ('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 100, 'clothing'); 
INSERT INTO products(name, price, category) VALUES ('Casual Premium Slim Fit T-Shirts', 22.3, 'clothing'); 
INSERT INTO products(name, price, category) VALUES ('Mens Cotton Jacket', 55.99, 'clothing'); 
INSERT INTO products(name, price, category) VALUES ('John Hardy Womens Legends Naga Gold & Silver Dragon Station Chain Bracelet', 695, 'jewelery'); 
INSERT INTO products(name, price, category) VALUES ('Solid Gold Petite Micropave', 168, 'jewelery'); 
INSERT INTO products(name, price, category) VALUES ('White Gold Plated Princess', 9.99, 'jewelery'); 
INSERT INTO products(name, price, category) VALUES ('Pierced Owl Rose Gold Plated Stainless Steel Double', 10.99, 'jewelery'); 
INSERT INTO products(name, price, category) VALUES ('WD 2TB Elements Portable External Hard Drive - USB 3.0', 64, 'electronics'); 
INSERT INTO products(name, price, category) VALUES ('Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5', 109, 'electronics'); 
INSERT INTO products(name, price, category) VALUES ('WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive', 114, 'electronics'); 

