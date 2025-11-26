const express = require('express');
const router = express.Router();
const { addContact, getContacts } = require('../controllers/contactController');

router.post('/', addContact);
router.get('/:id', getContacts);

module.exports = router;