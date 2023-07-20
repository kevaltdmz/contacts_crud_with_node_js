// Imported mongoose
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            require: [
                true,
                'User name can\'t be empty'
            ],
        },
        email: {
            type: String,
            require: [
                true,
                'Email address can\'t be empty'
            ],
            unique: [
                true,
                'Email addres is already taken'
            ]
        },
        password: {
            type: String,
            require: [
                true,
                'Password can\'t be empty'
            ],
        }
    },
    {
        timestamps: true,
    },
);

// Exports the user model
module.exports = mongoose.model('User', userSchema)
