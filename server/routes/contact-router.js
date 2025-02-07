const express = require('express');
const router = express.Router();
const { createContact, getAllContacts, deleteContact} = require('../controllers/contact-controller')
router.post('/contact/post', createContact);
router.get('/contact', getAllContacts);
router.delete('/contact/:id', deleteContact);
module.exports = router;