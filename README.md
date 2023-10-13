# Northcoders News API


Welcome to my Northcoders News API! This project provides you with a robust API built using Node.js, allowing interaction with a PostgreSQL (PSQL) database. It follows RESTful principles and adheres to the Model-View-Controller (MVC) pattern. The API offers Create, Read, Update, and Delete (CRUD) operations through various endpoints. During the development, Test Driven Development (TDD) was rigorously applied to ensure the code met expected outcomes. You can use this API to retrieve articles based on specific queries, post new comments on articles, and delete comments, all related to the nc_news database.

Hosted Version
You can access the hosted version of the API here.

Getting Started 📋
These instructions will help you set up and run the project on your local machine for development purposes.

Prerequisites 🚪
To get started, you need to have the following prerequisites:

Node.js 0.10.x or later
PostgreSQL 14.9 or later
Installation 🔧
Clone the repository to your local machine.
Create a .env.test file with PGDATABASE=nc_news_test and a .env.development file with PGDATABASE=nc_news. These files are essential for connecting to the correct databases.
Install the required dependencies by running the following commands:
bash
Copy code
npm install dotenv --save
npm install express
npm install pg-format
To seed the local database, run:
bash
Copy code
npm run seed








