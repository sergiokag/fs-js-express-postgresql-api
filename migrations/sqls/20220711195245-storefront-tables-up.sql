/* Create Tables */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR(100)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL,
    status VARCHAR(10),
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id)
);

-- Insert section --

INSERT INTO products(name, price, category) VALUES ('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 100, 'clothing'); 
INSERT INTO products(name, price, category) VALUES ('Casual Premium Slim Fit T-Shirts', 22.3, 'clothing'); 

