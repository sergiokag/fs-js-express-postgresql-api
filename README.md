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
    - POSTGRES_PORT -> [ Set your postgres port ]
    - BCRYPT_PEPPER -> [ Set your bcrypt pepper text ]
    - TOKEN_SECRET -> [ Set your token secret text ]

**_Keep in mind that database.json will read the corresponding variables from the .env via the db-migrate package in order to connect to db!_**

## NPM scripts

1. Start project: `npm run start` (The app is running in port 3000)
2. Create a built project in dist folder: `npm run build`
3. Listen on changes while being on development: `npm run watch`
4. Run tests: `npm run test`
5. Run linting: `npm run lint`
6. Run prettier: `npm run prettier`

The first 4 scripts (start, build, watch test) are running migrations, so they first drop tables and then create them. Also they insert data to products table.

**Read Requirements in order to get more info about routes and database schema**
