const express = require('express');
const router = express.Router();
const { linkMessageToAction } = require('../controllers/actionMessageController');

router.post('/', linkMessageToAction);

module.exports = router;