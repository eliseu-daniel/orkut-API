const express = require('express');
const router = express.Router();
const { linkPublicationToAction } = require('../controllers/actionPublicationController');

router.post('/', linkPublicationToAction);

module.exports = router;