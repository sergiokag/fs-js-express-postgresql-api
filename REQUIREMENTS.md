## Restful Routes and HTTP verbs

HTTP methods supported

#### App routes

Index route: '/sign-up' [POST]
Show route: '/login' [POST]

#### Products routes

Index route: '/products' [GET]
Show route: '/products/:id' [GET]
Create route: '/products/create' [GET][token required]

#### Users routes

Index route: '/users' [GET][token required]
Show route: '/users/:id' [GET][token required]
Create route: '/users/create' [POST][token required]

#### Orders routes

Show route: '/orders/user/:id' [GET][token required]
Add product route: '/orders/add-product' [POST][token required]

## Database Tables

    Table: users (id:serial primary key, firstname:varchar(100) not null, lastname:varchar(100) not null, username:varchar(100) not null, password:varchar(100) not null)

    Table: products (id:serial primary key, name:varchar(100) not null, price:integer not null, category:varchar(100))

    Table: orders_users_products (id:serial primary key, quantity:integer not null, status: in 'active' and 'complete', user_id:integer[foreign key to users table], product_id:integer[foreign key to products table])

### Sign up & Login

Visit the `/sign-up` route if you want to create a user and get a token.
The token expires after 5 minutes. If your token has expired and you wish to visit routes
that are restricted visit route `/login`.
