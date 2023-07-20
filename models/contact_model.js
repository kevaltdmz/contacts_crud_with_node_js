// Imported mongoose
const mongoose = require('mongoose');

// Created the model class for the contacts
const ContactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User',
        },
        name: {
            type: String,
            require: [true, 'Contact name is required']
        },
        age: {
            type: Number,
            require: [true, 'Age is required']
        },
        email: {
            type: String,
            require: [true, 'Email is required']
        },
    },
    {
        timestamps: true,
    },
);

// Exported the model class
const Contact =  mongoose.model('Contact', ContactSchema);

module.exports = { Contact }