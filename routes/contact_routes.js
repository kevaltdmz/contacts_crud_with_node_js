// Imported express
const express = require('express');

// Initialized the routers
const router = express.Router();

// Get the middle ware for the valudation 
const validateToken = require('../middleware/validate_token_handler');

// Get the methods from the contact controller
const {
    getContacts,
    getContactById,
    createNewContact,
    updateContact,
    deleteContact,
} = require('../controllers/contact_controller');

// This is get api to get the app the contacts,
// This will not ask for any parameter
router.get('/', validateToken, getContacts);

// This is get get api to get perticular one contact
// This will ask for the 'id' as a parameter
router.get('/:id', validateToken, getContactById);

// This is post api to create new contact
// This will not ask for any parameters as of now
router.post('/', validateToken, createNewContact);

// This is put api to edit the contact
// This will ask for the 'id' as a parameter
router.put('/:id', validateToken, updateContact);

// This is delete api to remove the contac
// This will ask for the 'id' as a parameter
router.delete('/:id', validateToken, deleteContact);

// Exports the router
module.exports = router;
