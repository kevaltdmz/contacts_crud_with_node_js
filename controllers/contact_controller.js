// Imported asyncHandler library 
const asyncHandler = require('express-async-handler');
const { Contact } = require('../models/contact_model');

// Imported contact model
// const Contact = require('../models/contact_model'); 

/// This is the GET type method which will return the list of contacts[All Contacts]
//@desc Get all contacts
//@route GET /api/contacts
//@access Protected
const getContacts = asyncHandler(async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id });
    res.status(200).json(
        {
            'success': true,
            contact,
        }
    );
});

/// This is the GET type method which will return the contact[Only one contact]
//@desc Get contact from the given id
//@route GET /api/contacts/:id
//@access Protected
const getContactById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Received id -- ', id);
        const contact = await Contact.findById(id);
        console.log(contact, "contact");
        res.status(200).json(
            {
                'success': true,
                'data': contact,
            },
        );
    } catch (error) {
        res.status(404).json(
            {
                'success': false,
                'message': "No contact found."
            },
        )
    }
});

/// This is the POST mehod that will create the new contact in the server
//@desc Create new contact
//@route POST /api/contacts
//@access Protected
const createNewContact = asyncHandler(async (req, res) => {
    console.log('Received data for the create contact : ', req.body);
    const { name, age, email } = req.body;
    console.log(`name:${name},age:${age},email:${email}`,);
    if (!name || !age || !email) {
        res.status(400);
        throw new Error('All fields are required');
    } else {
        const contact = await Contact.create({
            name, age, email, user_id: req.user.id
        });
        res.status(201).json({
            'success': true,
            'data': contact,
        });
    }
});


/// This is the POST method that will find and update the contact if present
//@desc Update contact
//@route PUT /api/contacts/:id
//@access Protected
const updateContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        console.log(contact, "contact");
        if (!contact) {
            res.status(404);
            throw new Error('Contact not found');
        }

        if (contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error('User do not have permission to change other user\'s contact');
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true }
        );

        res.status(200).json(
            {
                'success': true,
                'message': updatedContact,
            },
        );

    } catch (e) {
        res.status(404).json(
            {
                'success': false,
                'message': "No contact found."
            },
        );
    }
});

/// This is DELETE method that will find and delete the conact if present
//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access Protected
const deleteContact = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Recieved id -- ', id);
        const contact = await Contact.findByIdAndDelete(id);
        res.status(200).json(
            {
                'success': true,
                'message': 'Contact deleted successfully'
            }
        );
    }
    catch (e) {
        res.status(404);
        throw new Error('Contact not found');
    }
});

/// Exports the methods
module.exports = {
    getContacts,
    getContactById,
    createNewContact,
    updateContact,
    deleteContact,
};
