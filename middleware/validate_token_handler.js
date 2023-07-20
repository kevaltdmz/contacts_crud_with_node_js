// Imported async handler
const asyncHandler = require('express-async-handler');

// Imported JWT library
const jwt = require('jsonwebtoken');

// Validate token
const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    // Get the auth headers from the request
    let authHeader = req.headers.Authorization || req.headers.authorization;
    // Check if auth headers is present and auth headers should starts with 'Bearer'
    if (authHeader && authHeader.startsWith('Bearer')) {
        // Get the token after 'Bearer'
        token = authHeader.split(' ')[1];
        // Verify the token with the received token and the environment's access token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            // If it contains the error then return the error
            if (err) {
                res.status(401);
                throw new Error('User is not authorized');
            }
            console.log('Decoded ---- ', decoded);
            // Return the decoded user
            req.user = decoded.user;
            next();
        });
        if (!token) {
            res.status(401);
            throw new Error('User is not authorized or token is missing');
        }
    }
});

module.exports = validateToken;
