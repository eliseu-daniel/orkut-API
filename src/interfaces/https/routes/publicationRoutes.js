const express = require('express');
const router = express.Router();
const { createPublication, getPublications, getPublicationsByUser } = require('../controllers/publicationController');

router.post('/', createPublication);
router.get('/', getPublications);
router.get('/:id', getPublicationsByUser);

module.exports = router;