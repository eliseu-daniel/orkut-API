const express = require('express');
const router = express.Router();
const { createPublication } = require('../controllers/publicationController');

router.post('/', createPublication);

module.exports = router;