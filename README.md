# Storefront Backend Project

## How to setup

1. Install dependencies with `npm install`
2. Install globally the db-migrate package `npm install -g db-migrate`
3. Create a .env file and set for the following variables your database configurations,
   your enviroment settings, your pepper and token secret:

    - ENV -> [ Set this variable to dev ]
    - POSTGRES_DB -> [ Set your dev database name ]
    - POSTGRES_DB_TEST -> [ Set your test database name ]
    - POSTGRES_USER -> [ Set your postgres user ]
    - POSTGRES_PASSWORD -> [ Set your postgres password ]
    - POSTGRES_HOST -> [ Set your postgres host ]
    - BCRYPT_PEPPER -> [ Set your bcrypt pepper text ]
    - TOKEN_SECRET -> [ Set your token secret text ]

**_Keep in mind that database.json will read the variables from the .env via the db-migrate package!_**

## NPM scripts

1. Start project: `npm run start`
2. Create a built project in dist folder: `npm run build`
3. Listen on changes while being on development: `npm run watch`
4. Run tests: `npm run test`
5. Run linting: `npm run lint`
6. Run prettier: `npm run prettier`

The first 4 scripts (start, build, watch test) are running migrations, so they first drop tables and then create them. Also they insert data to products table.

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
