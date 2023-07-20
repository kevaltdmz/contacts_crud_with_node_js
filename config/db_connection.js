// Imported the mongoose library
const mongoose = require('mongoose');

// Connect the local server with the backend server
const connectDB = async () => {
    try {
        // Connect with the mongodb server
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            'Database connected : ',
            connect.connection.host,
            connect.connection.name,
        );
    } catch (e) {
        console.log('Something went wrong while connecting to the database -- ', e);
        process.exit(1);
    }
};

// Exports the connected database
module.exports = connectDB;
