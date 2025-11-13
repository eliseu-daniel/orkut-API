const express = require('express');
const router = express.Router();
const { sendMessage, getMessage } = require('../controllers/messageController');

router.post('/', sendMessage);
router.get('/:usuId/:contatoId', getMessage);

module.exports = router;