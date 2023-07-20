// Imported constants 
const { constants } = require('../constants');
// Managed the errors
// That will asks for the error, request, response and next
const errorHandler = (error, req, res, next) => {
    // Get the status code from the response
    const statusCode = res.statusCode ?? 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json(
                {
                    title: 'Validation Failed',
                    message: error.message,
                    stackTrace: error.stack,
                }
            );
            break;
        case constants.NOT_FOUND:
            res.json(
                {
                    title: 'Not Found',
                    message: error.message,
                    stackTrace: error.stack,
                }
            );
            break;
        case constants.UNAUTHORIZED:
            res.json(
                {
                    title: 'Un Authorized',
                    message: error.message,
                    stackTrace: error.stack,
                }
            );
            break;
        case constants.FORBIDDEN:
            res.json(
                {
                    title: 'Forbidden',
                    message: error.message,
                    stackTrace: error.stack,
                }
            );
            break;
        case constants.SERVER_ERROR:
            res.json(
                {
                    title: 'Internal server error',
                    message: error.message,
                    stackTrace: error.stack,
                }
            );
            break;
        default:
            console.log('No error, All good :)');
            break;
    }


}

// Exports the error handler
module.exports = errorHandler;
