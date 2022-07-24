## Restful Routes and HTTP verbs

HTTP methods supported

#### Products routes

Index route: '/products' [GET]
Show route: '/products/:id' [GET]
Create route: '/products/create' [GET][token required]

#### Users routes

Index route: '/users' [GET][token required]
Show route: '/users/:id' [GET][token required]
Create route: '/users/create' [POST]

#### Orders routes

Show route: '/orders/user/:id' [GET][token required]
Add product route: '/orders/add-product' [POST][token required]

## Database Tables

    Table: users (id:serial primary key, firstname:varchar(100) not null, lastname:varchar(100) not null, username:varchar(100) not null, password:varchar(100) not null)

    Table: products (id:serial primary key, name:varchar(100) not null, price:integer not null, category:varchar(100))

    Table: orders (id:serial primary key, status: in 'active' and 'complete', user_id:integer[foreign key to users table])

    Table: orders_producs (id:serial primary key, quantity:integer not null - greater than zero,  order_id:integer [foreign key to orders table], product_id:integer[foreign key to products table])
