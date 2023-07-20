// Imported express from the library
const express = require('express');

// Imported ErrorHandler from the middleware file
const errorHandler = require('./middleware/error_handler');

// DB connection imported
const connectDB = require('./config/db_connection');

// Configure the environment
const dotenv = require('dotenv').config();

// Make call for the database connection
connectDB();

// Created object for the express
const app = express();

// Assigned the port for local run
const port = process.env.PORT || 5000;

// Converts teh objects to the json format
app.use(express.json());

// Configures the contacts regarding API
app.use('/api/contacts', require('./routes/contact_routes'));

// Configures the user authentication regarding API
app.use('/api/user', require('./routes/user_routes'));

// Configures the error handlers
app.use(errorHandler);

// Listens for the port
app.listen(port, () => {
    console.log(`The sever is running on the port ${port}`);
});
