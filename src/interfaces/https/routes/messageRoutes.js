const express = require('express');
const { sendMessage, getMessage, getAllMessages } = require('../controllers/messageController');

module.exports = (realtime) => {
    const router = express.Router();

    router.post('/', sendMessage(realtime));

    router.get('/:usuId/:contatoId', getMessage);
    router.get('/', getAllMessages);

    return router;
};
