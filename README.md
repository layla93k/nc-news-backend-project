# Northcoders News API

Hello and welcome to my API!

Please find a link to the hosted version below:
https://nc-news-back-end-project.onrender.com/api

In this project, I have built an API using Node.js that can interact with a PSQL database. Whilst building my API, I ensured that it had a RESTful structure and implemented the Model-View-Controller pattern. I used Create, Read, Update and Delete (CRUD) methods to build my endpoints.
Throughout the project I implemented Test Drive Development (TDD) to ensure that the code I was writing met the outcome I was expecting. In this app, some of things you can do include; retrieving articles depending on specific queries, posting new comments on articles and deleting comments - all relating to the nc_news database.

If you wish to clone this project and run it locally please add your own:

.env.test file with PGDATABASE= nc_news_test
.env.development file with PGDATABASE= nc_news

this will enable you to connect to the correct databases.

You will also need to install the dotenv, express and pg dependencies to access these libraries and they will be needed to run the API properly. You can do this by running:

npm install dotenv --save 
npm install express
npm install pg-format

To enable you to interact with the database, you will need to seed the local database by running:
npm run seed

If you would like to run the tests to see my Test Driven Development in action run:
npm run test app

To run, this project requires:
Node.js 0.10.x or later 
PostgreSQL 14.9 or later







