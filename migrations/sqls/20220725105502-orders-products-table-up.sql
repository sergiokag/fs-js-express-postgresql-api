CREATE TABLE IF NOT EXISTS orders_products (
    id SERIAL PRIMARY KEY,
    quantity INTEGER NOT NULL CHECK(quantity > 0),
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id)
);
