// Imported express
const express = require('express');

// Initialized the routers
const router = express.Router();

// Imported middleware for token validation
const validateToken = require('../middleware/validate_token_handler');

// Get the methods from the user controller
const {
    userLoginRequested,
    registerUserRequested,
    getRegisteredUserRequested,
} = require('../controllers/user_controller');

// This api is used for login 
router.post('/login', userLoginRequested);

// This api is used for register user
router.post('/register', registerUserRequested);

// This api is used for get registered user
router.get('/getUser', validateToken, getRegisteredUserRequested);

// Export router
module.exports = router;
