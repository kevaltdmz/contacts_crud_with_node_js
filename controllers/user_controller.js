// Import async handler
const asyncHandler = require('express-async-handler');

// Import bcrypt for encryption
const bcrypt = require('bcrypt');

// Import JWT(Json web token) library for the token
const jwt = require('jsonwebtoken');

// Import user model
const User = require('../models/user_model');

// This is the POST type API which is used to login
//@desc Login user
//@route POST /api/user/login
//@access public
const userLoginRequested = asyncHandler(async (req, res) => {
    console.log('In login user API');
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Email and password is requried');
    }
    const user = await User.findOne({ email });
    console.log('User Found :)', user);
    // compare password of user with received
    if (user && (await bcrypt.compare(password, user.password))) {
        console.log('Valid user --- :)))');
        const accessToken = jwt.sign({
            user: {
                id: user._id,
                username: user.userName,
                email: user.email,

            }
        },
            // Getting the access token secret from the '.env' file
            process.env.ACCESS_TOKEN_SECRET,
            // Setting the expiration time for the token
            { expiresIn: '1h' }
        );
        console.log('Created JWT ---- ', accessToken);
        res.status(200).json(
            {
                'success': true,
                'token': accessToken,
            }
        );
    }
    else {
        res.status(401);
        throw new Error('In valid email and password');
    }
});

// This is POST type API which is used to register user
//@desc Register user
//@route POST /api/user/register
//@access public
const registerUserRequested = asyncHandler(async (req, res) => {
    console.log('In register user API');
    const { userName, email, password } = req.body;
    console.log('Value receided from the body is ---- ', userName, email, password);
    if (!userName || !email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }
    else {
        const userAvailable = await User.findOne({ email });
        console.log('User available --- ', userAvailable);
        if (userAvailable) {
            res.status(400);
            throw new Error('Email address is already taken');
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        console.log('Encrypted password --- ', encryptedPassword);
        const user = await User.create({ userName, email, password: encryptedPassword });
        console.log('User created successfully :)\n', user);
        if (user) {
            res.status(201).json({
                'success': true,
                'user': {
                    _id: user._id,
                    email: user.email,
                }
            });
        }
        else {
            res.status(400);
            throw new Error('User data is not valid');
        }
    }
});

// This is GET type API which will return the registered user
//@desc Get current user
//@router GET /api/user/getUser
//@access protected
const getRegisteredUserRequested = asyncHandler(async (req, res) => {
    console.log('In get registered user API');
    res.status(200).json({
        'success': true,
        'message': req.user,
    });
});

module.exports = {
    userLoginRequested,
    registerUserRequested,
    getRegisteredUserRequested,
}
